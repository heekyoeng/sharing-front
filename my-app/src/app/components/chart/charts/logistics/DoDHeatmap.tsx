'use client';
/** 목적: 전일 대비 지연율 변화(pp) 타일 히트맵 (더미 데이터 포함) */
import type { ECommerceShippingChartProps } from 'types/logistics';
import {
  Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend,
  type ChartOptions
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend);

export default function DoDHeatmap() {
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
  const rates = mockLogisticsDataset.map(d => d.delayed / Math.max(1, d.total));
  const changes = rates.map((r, i) => (i === 0 ? 0 : (r - rates[i - 1]) * 100)); // pp 변화량

  const data = {
    datasets: [{
      label: 'DoD Δ (pp)',
      data: changes.map((v, i) => ({ x: i, y: 0, v })),
      width: ({ chart }: any) => (chart.chartArea.width / Math.max(1, changes.length)) - 4,
      height: () => 30,
      backgroundColor: (ctx: any) => {
        const v = (ctx.raw?.v ?? 0) as number;
        const a = Math.min(1, Math.abs(v) / 5); // 0~5pp 구간 기준 강도
        return v >= 0 ? `rgba(220,38,38,${a})` : `rgba(34,197,94,${a})`; // +빨강 / -초록
      },
      borderColor: 'rgba(0,0,0,0.06)',
      borderWidth: 1,
    }]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { type: 'category', labels },
      y: { type: 'category', labels: ['Δ DoD'] }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const i = ctx.raw?.x ?? 0;
            const v = (ctx.raw?.v ?? 0) as number;
            return `${labels[i]}: ${v.toFixed(2)} pp`;
          }
        }
      }
    }
  };

  return <Chart type="bar" data={data as any} options={options as any} />;
}
