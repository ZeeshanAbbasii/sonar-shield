# Audio-denoiser FastAPI backend (CPU PyTorch).
# Build context is apps/audio-denoiser so the model weights can be copied in.
FROM python:3.12-slim

WORKDIR /app

# System libs needed by librosa / soundfile for audio I/O
RUN apt-get update && apt-get install -y --no-install-recommends \
        libsndfile1 ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install CPU-only torch first (keeps the image small, no CUDA), then the rest
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu \
        torch==2.9.0 torchaudio==2.9.0 torchvision==0.24.0 \
    && pip install --no-cache-dir -r backend/requirements.txt

# App code + model weights + served artifacts (paths resolve relative to __file__)
COPY backend/ backend/
COPY models/ models/
COPY artifacts/ artifacts/

WORKDIR /app/backend
EXPOSE 8001
CMD ["python", "main.py"]
