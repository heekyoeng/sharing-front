'use client';
/** 목적: 전일 대비 지연율 변화(pp) 타일 히트맵 */
import type { ECommerceShippingChartProps } from 'types/logistics';
import {
  Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js';
import { Chart } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend);

export default function DoDHeatmap({ dataset }: Pick<ECommerceShippingChartProps, 'dataset'>) {
  const labels = dataset.map(d => d.date);
  const rates = dataset.map(d => d.delayed / Math.max(1, d.total));
  const changes = rates.map((r, i) => (i === 0 ? 0 : (r - rates[i - 1]) * 100)); // pp

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

  const options = {
    responsive: true, maintainAspectRatio: false,
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

  return <Chart  data={data as any} options={options as any} type={'bar'} />;
}
