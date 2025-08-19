'use client';
/** 목적: 지연율(%) 시계열 라인 차트 - Chart.js (더미 데이터 포함) */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler,
  type ChartOptions, type TooltipItem
} from 'chart.js';
import type { ECommerceShippingChartProps } from 'types/logistics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function DelayRateLineChart() {
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

  /** 라벨/값 생성 */
  const labels = mockLogisticsDataset.map(d => d.date);
  const values = mockLogisticsDataset.map(d =>
    Math.round((d.delayed / Math.max(1, d.total)) * 1000) / 10 // 소수 1자리
  );

  /** 차트 데이터 */
  const data = {
    labels,
    datasets: [
      { label: 'Delay Rate (%)', data: values, fill: false, tension: 0.25 }
    ]
  };

  /** 차트 옵션 */
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => `${ctx.parsed.y}%`,
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (v: number | string) => `${v}%`,
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}
