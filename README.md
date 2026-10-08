# Final King — ML Web Apps Monorepo

A monorepo bundling three independent full-stack machine-learning applications
behind a single portal, launched together by one orchestrator script.

| App | What it does | Frontend | Backend |
|-----|--------------|----------|---------|
| **denoise** (SONAR Shield) | Classifies urban noise (ResNet-18) and denoises audio with specialised models (U-Net / Autoencoder / WaveNet) | React + Parcel · `:3001` | FastAPI · `:8001` |
| **sat** (SatError AI) | AI forward-error-correction for satellite links using a bidirectional-LSTM decoder | React + TypeScript (CRA) · `:3002` | FastAPI · `:8002` |
| **portal** | Dashboard hub that embeds the two apps; JWT auth | React (CRA) · `:3000` | Express + MongoDB · `:5001` |

## Repository layout

```
final-king/
├── package.json            # orchestrator — `npm start` runs all 5 services via concurrently
├── apps/
│   ├── denoise/
│   │   ├── backend/        # FastAPI app (main.py, models.py, pipeline.py) + tests/
│   │   ├── frontend/       # React + Parcel
│   │   ├── models/         # active .pth weights (+ archive/ for unused)
│   │   └── artifacts/      # figures, demo audio, results csv
│   ├── sat/
│   │   ├── backend/        # FastAPI app (main.py)
│   │   ├── frontend/       # React + TypeScript (CRA)
│   │   ├── models/         # active .pt weights (+ archive/)
│   │   └── artifacts/      # benchmark charts + results
│   └── portal/
│       ├── backend/        # Express + MongoDB + JWT auth
│       ├── src/ public/    # React dashboard
│       └── backend/.env.example
├── data/                   # datasets — NOT versioned (see "Data & models")
└── notebooks/              # archived training/experiment notebooks
```

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+ (PyTorch, FastAPI — see each backend's `requirements.txt`)
- **MongoDB** running locally on `:27017` (for the portal auth backend)

## Setup

```bash
# 1. Root orchestrator
npm install

# 2. Each app's dependencies
npm install --prefix apps/denoise/frontend
npm install --prefix apps/sat/frontend
npm install --prefix apps/portal

# 3. Python backends
pip install -r apps/denoise/backend/requirements.txt
pip install -r apps/sat/backend/requirements.txt

# 4. Environment files (copy the examples and fill in real values)
cp apps/portal/backend/.env.example apps/portal/backend/.env
cp apps/sat/frontend/.env.example  apps/sat/frontend/.env
```

## Run

Everything at once (3 frontends + 2 backends in parallel):

```bash
npm start
```

Or a single service:

```bash
python3 apps/denoise/backend/main.py          # denoise API  :8001
python3 apps/sat/backend/main.py              # sat API      :8002
npm start --prefix apps/denoise/frontend      # denoise UI   :3001
npm start --prefix apps/sat/frontend          # sat UI       :3002
npm start --prefix apps/portal                # portal       :3000
```

Open the portal at **http://localhost:3000**.

## Data & models

Datasets (~20 GB: UrbanSound8K, ESC-50-augmented, denoising_data, clean_train)
live under `data/` and model weights under `apps/*/models/`. Both are **git-ignored**
— they are kept locally, not committed. To share them, either enable
[git-lfs](https://git-lfs.com) for `*.pth`/`*.pt` or publish them to external
storage and add a download script. See `notebooks/` for how the models were trained.

The denoise API loads 4 active models (`best_classifier`, `best_unet_traffic`,
`best_autoencoder_machinery`, `best_wavenet_crowd`); the sat API loads
`lstm_decoder_v2_best.pt`. Other weights are kept in `models/archive/`.
