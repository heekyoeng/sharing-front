'use client';
/** 목적: 지연율(%) 시계열 라인 */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler
} from 'chart.js';
import type { ECommerceShippingChartProps } from 'types/logistics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function DelayRateLineChart({ dataset }: Pick<ECommerceShippingChartProps, 'dataset'>) {
  const labels = dataset.map(d => d.date);
  const values = dataset.map(d => Math.round((d.delayed / Math.max(1, d.total)) * 1000) / 10); // 소수1
  const data = {
    labels,
    datasets: [{ label: 'Delay Rate (%)', data: values, fill: false, tension: 0.25 }]
  };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => `${ctx.parsed.y}%` } } },
    scales: { y: { ticks: { callback: (v: number) => `${v}%` } } }
  };
  return <Line data={data}  />;
}
