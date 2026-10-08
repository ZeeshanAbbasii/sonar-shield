# Satellite Error Correction Backend

## Setup
```bash
pip install fastapi uvicorn torch numpy pydantic
```

## Run
```bash
cd backend
uvicorn main:app --reload --port 8002
```

## Model Files (already on Desktop)
- Primary:  /Users/macbookpro/Desktop/project 1/lstm_decoder_v2_best.pt
- Fallback: /Users/macbookpro/Desktop/project 1/lstm_decoder_v2.pt

## Verify Running
Open: http://localhost:8002/health
Expected: `{ "model_loaded": true, "parameters": 8287492 }`

## Endpoints
- GET  /              → API info
- GET  /health        → model status
- POST /transmit      → run inference
- GET  /ber-sweep     → BER chart data
- GET  /fec-comparison → all FEC methods comparison
- GET  /throughput-latency → speed benchmarks
- GET  /burst-robustness   → burst noise results

## Frontend
Start React frontend at http://localhost:3000
It will connect automatically to this backend.

## Verification
Backend is working when:
- ✅ uvicorn starts without errors
- ✅ Console shows "✅ Model loaded"
- ✅ http://localhost:8002/health returns "model_loaded": true
- ✅ POST /transmit with `{"text":"hello","snr_db":4.0,"use_burst":false}` returns recovered_text="hello" and is_perfect=true
- ✅ BER after < BER before always
- ✅ Confidence > 0.95 at snr_db=4.0

Backend is broken when:
- ❌ uvicorn shows model load error
- ❌ /health returns model_loaded: false
- ❌ BER after > BER before
- ❌ recovered_text is garbage at snr_db=4.0
