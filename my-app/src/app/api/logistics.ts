import { WeightBinPoint } from "types/logistics";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:5000';

export async function fetchWeightBins(): Promise<WeightBinPoint[]> {
  const r = await fetch(`${API_BASE}/api/logistics/weight-bins`, { cache: 'no-store' });
  if (!r.ok) throw new Error('fetch_weight_bins_failed');
  return r.json();
}