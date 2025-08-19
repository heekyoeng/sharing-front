
export interface ECommerceShippingChartProps {
  /** 일자별 집계 (예: 배송 지연율 시계열) */
  dataset: Array<{ date: string; total: number; delayed: number }>;
  /** 시각화 대상 지표 선택 */
  metric?: 'delayRate' | 'delayed' | 'total';
  /** 타이틀(옵션) */
  title?: string;
}

export type WeightBinPoint = {
  binMin: number;
  binMax: number;
  binCenter: number;
  total: number;
  onTimeRate: number; // 0..1
  computedAt?: string;
};
