'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend
} from 'chart.js';
import type { WeightBinPoint } from 'types/logistics';
import { fetchWeightBins } from 'app/lib/logistics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function WeightVsOnTimeLine() {
  const [rows, setRows] = useState<WeightBinPoint[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchWeightBins().then(setRows).catch((e) => setErr(e.message));
  }, []);

  if (err) return <div style={{ color: 'crimson' }}>에러: {err}</div>;
  if (!rows.length) return <div>로딩 또는 데이터 없음</div>;

  const labels = rows.map(r => `${Math.round(r.binMin)}–${Math.round(r.binMax)}`);
  const values = rows.map(r => Math.round(r.onTimeRate * 1000) / 10); // % 소수1

  return (
    <div style={{ height: 200 }}>
      <Line
        data={{
          labels,
          datasets: [{ label: 'On-Time Rate (%)', data: values, tension: 0.25, fill: false }],
        }}
        options={{
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { callback: (v) => `${v}%` } } }
        }}
      />
    </div>
  );
}
