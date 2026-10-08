# Denoise — SONAR Shield

Audio noise **classification + denoising**. A ResNet-18 classifier predicts the
urban-noise class (10 UrbanSound8K categories), then routes the clip to a
specialised denoiser: U-Net (traffic), Autoencoder (machinery), or
WaveNet-style (crowd).

## Structure

```
backend/      FastAPI service (main.py, models.py, pipeline.py) + tests/
frontend/     React + Parcel UI
models/       active weights: best_classifier.pth, best_unet_traffic.pth,
              best_autoencoder_machinery.pth, best_wavenet_crowd.pth
              archive/ — unused/legacy weights
artifacts/    figures (confusion_matrix, evaluation charts), demo audio,
              denoising_results.csv
```

Model, figure and results paths resolve relative to `backend/main.py`
(`APP_DIR = …/apps/audio-denoiser`), so the app runs from anywhere.

## Run

```bash
pip install -r backend/requirements.txt
python3 backend/main.py            # http://localhost:8001

npm install                        # in frontend/
npm start --prefix frontend        # http://localhost:3001
```

## API (port 8001)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/denoise` | Upload audio → classification + denoised result |
| GET | `/audio/{filename}` | Serve a processed clip (from `backend/temp_audio/`) |
| GET | `/results` | `artifacts/denoising_results.csv` as JSON |
| GET | `/figures/{filename}` | Serve a whitelisted figure from `artifacts/` |
| GET | `/health` | Loaded models + device |

`backend/temp_audio/` is runtime scratch (git-ignored).
