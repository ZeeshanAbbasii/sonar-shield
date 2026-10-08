import os, time, uuid, numpy as np, pandas as pd, soundfile as sf, torch, librosa
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from models import (build_classifier, UNetDenoiser,
                    AutoencoderDenoiser, WaveNetStyleDenoiser)
from pipeline import classify_noise, denoise_audio

# Paths are resolved relative to this file so the app is location-independent.
# Layout:  apps/denoise/{backend/main.py, models/, artifacts/}
APP_DIR       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR     = os.path.join(APP_DIR, 'models')
ARTIFACTS_DIR = os.path.join(APP_DIR, 'artifacts')
FIGURES_DIR   = ARTIFACTS_DIR
TEMP_DIR      = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp_audio')
os.makedirs(TEMP_DIR, exist_ok=True)

SUPPORTED = {'.wav', '.mp3', '.m4a', '.flac', '.ogg', '.aiff', '.aac'}

app = FastAPI(title="SONAR Shield API", version="2.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"],
    allow_methods=["*"], allow_headers=["*"]
)

models = {}
device = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')


@app.on_event("startup")
async def load_models():
    print(f"Loading 4 models on {device}...")

    # Urban Classifier — 10 classes
    urban = build_classifier(10)
    urban.load_state_dict(torch.load(
        f'{MODEL_DIR}/best_classifier.pth', map_location=device))
    urban.eval().to(device)
    models['urban_clf'] = urban

    # Denoiser 1 — Traffic (U-Net)
    traffic = UNetDenoiser()
    traffic.load_state_dict(torch.load(
        f'{MODEL_DIR}/best_unet_traffic.pth', map_location=device))
    traffic.eval().to(device)
    models['traffic'] = traffic

    # Denoiser 2 — Machinery (Autoencoder)
    machinery = AutoencoderDenoiser()
    machinery.load_state_dict(torch.load(
        f'{MODEL_DIR}/best_autoencoder_machinery.pth', map_location=device))
    machinery.eval().to(device)
    models['machinery'] = machinery

    # Denoiser 3 — Crowd (WaveNet)
    crowd = WaveNetStyleDenoiser()
    crowd.load_state_dict(torch.load(
        f'{MODEL_DIR}/best_wavenet_crowd.pth', map_location=device))
    crowd.eval().to(device)
    models['crowd'] = crowd

    print("4 models loaded: 1 urban classifier + 3 denoisers")
    print("  Urban classifier → 10 classes (UrbanSound8K)")
    print("  Denoisers: Traffic U-Net | Machinery AE | Crowd WaveNet")


@app.post("/denoise")
async def denoise_endpoint(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in SUPPORTED:
        raise HTTPException(415, f"Unsupported format '{ext}'. "
                            f"Accepted: {', '.join(SUPPORTED)}")

    contents = await file.read()
    if len(contents) > 50 * 1024 * 1024:
        raise HTTPException(413, "File too large. Max 50 MB.")

    uid        = str(uuid.uuid4())[:8]
    input_path = os.path.join(TEMP_DIR, f"{uid}_input{ext}")
    orig_wav   = os.path.join(TEMP_DIR, f"{uid}_original.wav")
    enh_wav    = os.path.join(TEMP_DIR, f"{uid}_enhanced.wav")

    with open(input_path, 'wb') as f:
        f.write(contents)

    print(f"[{uid}] {file.filename} ({len(contents)/1024:.1f} KB)")

    try:
        t0 = time.time()

        # Step 1 — classify
        clf   = classify_noise(input_path, models['urban_clf'], device)
        dkey  = clf['category'].lower()
        print(f"[{uid}] → {clf['predicted_class']} "
              f"({clf['category']}) {clf['confidence']}% "
              f"→ {clf['denoiser_used']}")

        # Step 2 — denoise
        enhanced = denoise_audio(input_path, models[dkey], device)
        original, _ = librosa.load(input_path, sr=16000, mono=True)

        sf.write(orig_wav, original, 16000)
        sf.write(enh_wav,  enhanced, 16000)

        elapsed  = round(time.time() - t0, 2)
        rms_orig = float(np.sqrt(np.mean(original ** 2)))
        rms_enh  = float(np.sqrt(np.mean(enhanced  ** 2)))
        noise_db = round(20 * np.log10(rms_orig / (rms_enh + 1e-8)), 2)

        return JSONResponse({
            **clf,
            "rms_original":        round(rms_orig, 5),
            "rms_enhanced":        round(rms_enh,  5),
            "noise_reduction_db":  noise_db,
            "enhanced_audio_url":  f"http://localhost:8001/audio/{uid}_enhanced.wav",
            "original_audio_url":  f"http://localhost:8001/audio/{uid}_original.wav",
            "processing_time_sec": elapsed,
        })

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(500, str(e))
    finally:
        if os.path.exists(input_path):
            os.remove(input_path)


@app.get("/audio/{filename}")
async def serve_audio(filename: str):
    path = os.path.join(TEMP_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(404, "Audio file not found.")
    return FileResponse(path, media_type="audio/wav",
                        headers={"Cache-Control": "no-cache"})


@app.get("/results")
async def get_results():
    csv = os.path.join(ARTIFACTS_DIR, 'denoising_results.csv')
    if not os.path.exists(csv):
        raise HTTPException(404, "Results not found.")
    return JSONResponse(pd.read_csv(csv).to_dict(orient='records'))


@app.get("/figures/{filename}")
async def serve_figure(filename: str):
    allowed = {
        'confusion_matrix.png', 'evaluation_bar_chart.png',
        'training_curves.png',  'improvement_over_baseline.png',
        'water_confusion_matrix.png',
    }
    if filename not in allowed:
        raise HTTPException(403, "Not available.")
    path = os.path.join(FIGURES_DIR, filename)
    if not os.path.exists(path):
        raise HTTPException(404, f"{filename} not found.")
    return FileResponse(path, media_type="image/png")


@app.get("/health")
async def health():
    return {
        "status":        "ok",
        "version":       "2.0.0",
        "models_loaded": list(models.keys()),
        "device":        str(device),
        "classifiers":   1,
        "denoisers":     3,
        "total_classes": 10,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=False)
