'use client';
/** 목적: 총 물량(일별) Area = 라인 + fill */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler
} from 'chart.js';
import type { ECommerceShippingChartProps } from 'types/logistics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function TotalAreaChart({ dataset }: Pick<ECommerceShippingChartProps, 'dataset'>) {
  const labels = dataset.map(d => d.date);
  const values = dataset.map(d => d.total);
  const data = { labels, datasets: [{ label: 'Total Volume', data: values, fill: true, tension: 0.25 }] };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };
  return <Line data={data} options={options} />;
}
