# Sat — SatError AI

AI **forward-error-correction (FEC)** for satellite links. A SNR-aware
bidirectional-LSTM decoder (rate-1/2, constraint length 7) recovers data bits
from a noisy BPSK channel, benchmarked against Viterbi, Hamming and Reed-Solomon.

## Structure

```
backend/      FastAPI service (main.py) — model + channel simulation + Viterbi benchmark
frontend/     React + TypeScript (CRA) UI
models/       active weights: lstm_decoder_v2_best.pt
              archive/ — gru/tcn variants + pruned model (not loaded)
artifacts/    benchmark_results.json, benchmark charts, pics/
```

Model paths resolve relative to `backend/main.py` (`…/apps/satellite-fec/models`), so the
app runs from anywhere.

## Run

```bash
pip install -r backend/requirements.txt   # if present; otherwise: fastapi uvicorn torch numpy
python3 backend/main.py            # http://localhost:8002

npm install                        # in frontend/
npm start --prefix frontend        # http://localhost:3002  (PORT set in .env)
```

## API (port 8002)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/transmit` | Encode text → corrupt over AWGN/burst channel → LSTM-decode |
| GET | `/ber-sweep` | BER vs SNR curves |
| GET | `/fec-comparison` | BER comparison across FEC methods |
| GET | `/throughput-latency` | Latency/throughput measurements |
| GET | `/burst-robustness` | Burst-noise robustness |
| GET | `/health` | Model status + architecture |
