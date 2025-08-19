'use client';
/** 목적: 총 물량(일별) Area = 라인 + fill (더미 데이터 포함) */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler,
  type ChartOptions
} from 'chart.js';
import type { ECommerceShippingChartProps } from 'types/logistics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function TotalAreaChart() {
  /** ✅ 더미 데이터 (내부 정의) */
  const mockLogisticsDataset: ECommerceShippingChartProps['dataset'] = [
    { date: '2025-07-01', total: 1200, delayed: 180 },
    { date: '2025-07-02', total: 1100, delayed: 150 },
    { date: '2025-07-03', total: 1300, delayed: 170 },
    { date: '2025-07-04', total: 900,  delayed: 120 },
    { date: '2025-07-05', total: 1000, delayed: 90  },
    { date: '2025-07-06', total: 1150, delayed: 150 },
    { date: '2025-07-07', total: 980,  delayed: 110 },
  ];

  const labels = mockLogisticsDataset.map(d => d.date);
  const values = mockLogisticsDataset.map(d => d.total);

  const data = {
    labels,
    datasets: [
      { label: 'Total Volume', data: values, fill: true, tension: 0.25, backgroundColor: 'rgba(49,130,206,0.2)', borderColor: '#3182CE' }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  return <Line data={data} options={options} />;
}
