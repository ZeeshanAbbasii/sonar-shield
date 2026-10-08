import axios from 'axios'

const BASE = 'http://localhost:8002'

export interface HealthResponse {
  status: string
  model_loaded: boolean
  parameters: number
}

export interface TransmitRequest {
  text: string
  snr_db: number
  use_burst: boolean
  burst_prob: number
  burst_len: number
}

export interface FrameResult {
  frame_index: number
  original_bits: number[]
  encoded_bits: number[]
  corrupted_bits: number[]
  corrected_bits: number[]
  llr_values: number[]
  errors_in: number
  errors_out: number
  ber_before: number
  ber_after: number
  avg_confidence: number
  inference_ms: number
  improvement: string
}

export interface TransmitResponse {
  original_text: string
  corrupted_text: string
  recovered_text: string
  is_perfect: boolean
  frame_results: FrameResult[]
  total_bits: number
  total_errors_in: number
  total_errors_out: number
  avg_ber_before: number
  avg_ber_after: number
  avg_confidence: number
  avg_inference_ms: number
  improvement: string
  snr_db: number
  use_burst: boolean
}

export interface BerSweepResponse {
  snr_range: number[]
  uncoded: number[]
  viterbi: number[]
  lstm: number[]
}

export const api = {
  health: () => axios.get<HealthResponse>(`${BASE}/health`),
  transmit: (body: TransmitRequest) => axios.post<TransmitResponse>(`${BASE}/transmit`, body),
  berSweep: () => axios.get<BerSweepResponse>(`${BASE}/ber-sweep`)
}
