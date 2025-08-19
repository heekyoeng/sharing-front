// src/lib/api/logistics.ts
import type { WeightBinPoint } from 'types/logistics';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:5000';

export async function fetchWeightBins(): Promise<WeightBinPoint[]> {
  const url = `${API_BASE.replace(/\/+$/,'')}/api/logistics/weight-bins`;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) {
    const text = await r.text().catch(()=>'');
    throw new Error(`HTTP ${r.status} ${r.statusText} - ${text}`);
  }
  return r.json();
}
