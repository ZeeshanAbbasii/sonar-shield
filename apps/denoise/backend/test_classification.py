import os, numpy as np, pandas as pd, librosa, torch, torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision.models import resnet18, ResNet18_Weights
import warnings, soundfile as sf
warnings.filterwarnings('ignore')

device = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')
print(f'Device: {device}')

# ── Configs ──
CONFIG = {
    'sample_rate': 22050, 'duration': 4, 'n_mels': 128,
    'n_fft': 1024, 'hop_length': 512, 'img_size': 128,
    'batch_size': 32, 'num_classes': 10,
}
DENOISE_CONFIG = {
    'sample_rate': 16000, 'duration': 3,
    'n_fft': 512, 'hop_length': 128, 'n_mels': 64, 'batch_size': 16,
}
CLASS_NAMES = [
    'air_conditioner','car_horn','children_playing','dog_bark','drilling',
    'engine_idling','gun_shot','jackhammer','siren','street_music'
]

# ── Classifier ──
def build_model(num_classes):
    m = resnet18(weights=ResNet18_Weights.DEFAULT)
    m.fc = nn.Sequential(nn.Dropout(0.3), nn.Linear(m.fc.in_features, num_classes))
    return m

# ── Load classifier ──
# Model lives in apps/denoise/models/ (this file is apps/denoise/backend/tests/).
BASE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    'models')
clf_model  = build_model(CONFIG['num_classes']).to(device)
clf_model.load_state_dict(torch.load(f'{BASE}/best_classifier.pth', map_location=device))
clf_model.eval()

print('Classifier loaded.')
print(f'  Params: {sum(p.numel() for p in clf_model.parameters()):,}')

# ── Classification function ──
def classify_audio(audio_path):
    y, orig_sr = librosa.load(audio_path, sr=None, mono=True)
    y_clf = librosa.resample(y, orig_sr=orig_sr, target_sr=CONFIG['sample_rate'])
    n = CONFIG['sample_rate'] * CONFIG['duration']
    if len(y_clf) < n:
        y_clf = np.tile(y_clf, int(np.ceil(n / len(y_clf))))
    y_clf = y_clf[:n]
    
    mel = librosa.feature.melspectrogram(
        y=y_clf, sr=CONFIG['sample_rate'],
        n_mels=CONFIG['n_mels'],
        n_fft=CONFIG['n_fft'],
        hop_length=CONFIG['hop_length']
    )
    mel_db = librosa.power_to_db(mel, ref=np.max)
    mel_db = (mel_db - mel_db.min()) / (mel_db.max() - mel_db.min() + 1e-8)
    mel_t  = torch.tensor(mel_db, dtype=torch.float32).unsqueeze(0)
    mel_t  = torch.nn.functional.interpolate(
        mel_t.unsqueeze(0),
        size=(CONFIG['img_size'], CONFIG['img_size']),
        mode='bilinear', align_corners=False
    ).squeeze(0).repeat(3, 1, 1).unsqueeze(0).to(device)
    
    with torch.no_grad():
        probs = torch.softmax(clf_model(mel_t), dim=1)[0].cpu().numpy()
    
    top5_idx = probs.argsort()[::-1][:5]
    pred_class = CLASS_NAMES[top5_idx[0]]
    confidence = float(probs[top5_idx[0]]) * 100
    top5 = [(CLASS_NAMES[i], float(probs[i])*100) for i in top5_idx]
    
    return pred_class, confidence, top5

# ── Test files ──
# NOTE: these are local sample clips used during development; point them at your
# own mixed-noise .wav files to run the sanity check.
test_files = [
    '/Users/macbookpro/Downloads/hehe/air_conditioner_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/car_horn_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/children_playing_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/dog_bark_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/drilling_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/engine_idling_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/gun_shot_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/jackhammer_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/rain_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/sea_waves_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/siren_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/street_music_mixed.wav',
    '/Users/macbookpro/Downloads/hehe/thunderstorm_mixed.wav',
]

print('Testing classification:')
print('-' * 100)
for file in test_files:
    try:
        pred, conf, top5 = classify_audio(file)
        filename = file.split('/')[-1]
        expected = filename.replace('_mixed.wav', '')
        status = '✓' if pred == expected else '✗'
        print(f'{status} {filename:35} → {pred:20} ({conf:5.1f}%) | Expected: {expected}')
        print(f'   Top 5: {top5[:3]}')
    except Exception as e:
        print(f'✗ {file.split("/")[-1]:35} → ERROR: {e}')
