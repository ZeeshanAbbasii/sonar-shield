# Satellite-FEC FastAPI backend (CPU PyTorch).
# Build context is apps/satellite-fec so the model weights can be copied in.
FROM python:3.12-slim

WORKDIR /app

# CPU-only torch first, then the rest of the (small) requirements
COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu \
        torch==2.9.0 \
    && pip install --no-cache-dir -r backend/requirements.txt

# App code + model weights (path resolves relative to __file__)
COPY backend/ backend/
COPY models/ models/

WORKDIR /app/backend
EXPOSE 8002
CMD ["python", "main.py"]
