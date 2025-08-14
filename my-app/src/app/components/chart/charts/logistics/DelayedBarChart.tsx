'use client';
/** 목적: 지연 건수(일별) 바 */
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from 'chart.js';
import type { ECommerceShippingChartProps } from 'types/logistics';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);// src/components/chart/charts/demo/DelayedBarChartDemo.tsx
'use client';

import { Box } from '@chakra-ui/react';
import DelayedBarChart from '../DelayedBarChart';
import type { ECommerceShippingChartProps } from 'types/logistics';

/** 목적: 7일치 더미 배송 데이터 생성 */
function makeDummyShippingData(days: number): ECommerceShippingChartProps['dataset'] {
  const today = new Date();
  return Array.from({ length: days }, (_, idx) => {
    const d = new Date(today);
    // 과거 → 현재 순서로
    d.setDate(today.getDate() - (days - 1 - idx));

    const total = 800 + Math.floor(Math.random() * 700);                 // 800~1500
    const delayed = Math.floor(total * (0.05 + Math.random() * 0.2));    // 5~25%
    return { date: d.toISOString().slice(0, 10), total, delayed };
  });
}

export default function DelayedBarChartDemo(): JSX.Element {
  const dataset = makeDummyShippingData(7); // 7일치 더미

  return (
    // ✅ 차트 컨테이너 높이 필수 (maintainAspectRatio: false 이므로)
    <Box h="260px">
      <DelayedBarChart dataset={dataset} />
    </Box>
  );
}


export default function DelayedBarChart({ dataset }: Pick<ECommerceShippingChartProps, 'dataset'>) {
  const labels = dataset.map(d => d.date);
  const values = dataset.map(d => d.delayed);
  const data = { labels, datasets: [{ label: 'Delayed', data: values, borderWidth: 1 }] };
  const options = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };
  return <Bar data={data} options={options} />;
}
