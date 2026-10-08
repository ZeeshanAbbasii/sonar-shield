import numpy as np
import torch
import librosa

CLF_CONFIG = {
    'sample_rate': 22050, 'duration': 4, 'n_mels': 128,
    'n_fft': 1024, 'hop_length': 512, 'img_size': 128
}
DENOISE_CONFIG = {
    'sample_rate': 16000, 'duration': 3,
    'n_fft': 512, 'hop_length': 128
}
CLASS_NAMES = [
    'air_conditioner', 'car_horn', 'children_playing', 'dog_bark', 'drilling',
    'engine_idling', 'gun_shot', 'jackhammer', 'siren', 'street_music'
]
NOISE_CATEGORY_MAP = {
    'car_horn':          ('traffic',   'U-Net'),
    'siren':             ('traffic',   'U-Net'),
    'engine_idling':     ('traffic',   'U-Net'),
    'jackhammer':        ('traffic',   'U-Net'),
    'drilling':          ('machinery', 'Autoencoder'),
    'air_conditioner':   ('machinery', 'Autoencoder'),
    'gun_shot':          ('machinery', 'Autoencoder'),
    'children_playing':  ('crowd',     'WaveNet'),
    'dog_bark':          ('crowd',     'WaveNet'),
    'street_music':      ('crowd',     'WaveNet'),
}


def fit(y: np.ndarray, n: int) -> np.ndarray:
    if len(y) < n:
        y = np.tile(y, int(np.ceil(n / len(y))))
    return y[:n]


def classify_noise(audio_path: str, clf_model, device) -> dict:
    y, orig_sr = librosa.load(audio_path, sr=CLF_CONFIG['sample_rate'], mono=True)
    target_len = CLF_CONFIG['sample_rate'] * CLF_CONFIG['duration']
    if len(y) < target_len:
        y = np.pad(y, (0, target_len - len(y)))
    else:
        y = y[:target_len]

    mel = librosa.feature.melspectrogram(
        y=y, sr=CLF_CONFIG['sample_rate'],
        n_mels=CLF_CONFIG['n_mels'],
        n_fft=CLF_CONFIG['n_fft'],
        hop_length=CLF_CONFIG['hop_length']
    )
    mel_db = librosa.power_to_db(mel, ref=np.max)
    mel_db = (mel_db - mel_db.min()) / (mel_db.max() - mel_db.min() + 1e-8)
    mel_t  = torch.tensor(mel_db, dtype=torch.float32).unsqueeze(0)
    mel_t  = torch.nn.functional.interpolate(
        mel_t.unsqueeze(0),
        size=(CLF_CONFIG['img_size'], CLF_CONFIG['img_size']),
        mode='bilinear', align_corners=False
    ).squeeze(0).repeat(3, 1, 1).unsqueeze(0).to(device)

    clf_model.eval()
    with torch.no_grad():
        probs = torch.softmax(clf_model(mel_t), dim=1)[0]
    confidence, pred_idx = probs.max(0)
    confidence = confidence.item()

    if confidence < 0.6:
        pred_class = 'unknown'
        category, denoiser_name = 'traffic', 'U-Net'
    else:
        pred_class = CLASS_NAMES[pred_idx.item()]
        category, denoiser_name = NOISE_CATEGORY_MAP.get(pred_class, ('traffic', 'U-Net'))

    top5_idx = probs.argsort(descending=True)[:5]
    top5 = [{"class": CLASS_NAMES[i] if i < len(CLASS_NAMES) else 'unknown', 
              "confidence": round(float(probs[i]) * 100, 2)}
            for i in top5_idx]

    return {
        "predicted_class": pred_class,
        "category":        category,
        "denoiser_used":   denoiser_name,
        "confidence":      round(confidence * 100, 2),
        "top5":            top5,
    }


def denoise_audio(audio_path: str, denoiser_model, device) -> np.ndarray:
    TARGET_SR    = DENOISE_CONFIG['sample_rate']
    target_chunk = TARGET_SR * DENOISE_CONFIG['duration']

    y, orig_sr = librosa.load(audio_path, sr=TARGET_SR, mono=True)
    total_len  = len(y)

    n_chunks   = max(1, int(np.ceil(total_len / target_chunk)))
    padded     = np.pad(y, (0, n_chunks * target_chunk - total_len))
    chunks_out = []

    denoiser_model.eval()
    with torch.no_grad():
        for c in range(n_chunks):
            chunk = padded[c * target_chunk: (c + 1) * target_chunk]
            S     = librosa.stft(chunk, n_fft=DENOISE_CONFIG['n_fft'],
                                 hop_length=DENOISE_CONFIG['hop_length'])
            mag   = np.log1p(np.abs(S)).astype(np.float32)
            phase = np.angle(S)
            mag_t = torch.tensor(mag).unsqueeze(0).unsqueeze(0).to(device)
            pred  = denoiser_model(mag_t)
            if pred.shape != mag_t.shape:
                pred = torch.nn.functional.interpolate(pred, size=mag_t.shape[2:])
            pred_np   = pred.squeeze().cpu().numpy()
            enh_chunk = librosa.istft(
                np.expm1(pred_np) * np.exp(1j * phase),
                hop_length=DENOISE_CONFIG['hop_length'],
                n_fft=DENOISE_CONFIG['n_fft']
            ).astype(np.float32)
            chunks_out.append(enh_chunk)

    return np.concatenate(chunks_out)[:total_len]
