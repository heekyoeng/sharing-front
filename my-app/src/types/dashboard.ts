// ---- 카테고리: 허용값 고정으로 오타/불일치 사전 차단
export type Category =
  | 'finance' | 'logistics' | 'education' | 'defense'
  | 'healthcare' | 'tech' | 'retail' | 'energy';

// ---- 카드/목록 공통 지표 요약 (중복 제거)
export interface MetricSummary {
  // 예: AUC, F1, sMAPE 등
  metricLabel: string;
  // 예: 0.87, 0.84, 12.3% 등 문자열로 표준화(표기 일관성)
  metricValue: string;
}

// ---- 메인/추천 카드 전용
export interface FeaturedItem extends MetricSummary {
  id: string;
  title: string;
  desc: string;
  href: string; // 추천 카드는 자체적으로 링크 렌더 필요
}

// ---- 대시보드 목록(카드) 메타 데이터
export interface DashboardItem extends MetricSummary {
  id: string;
  category: Category;
  slug: string;  // URL 세그먼트
  title: string; // 카드/상세 타이틀
  desc: string;  // 한 줄 설명
}

// ---- 상세 KPI
export interface KpiItem {
  label: string;
  value: number | string;
  unit?: string;
  deltaPct?: number; // 전일/전주 대비 증감(%)
}

// ---- 범용 테이블 행 (컬럼명→값)
export interface TableRow {
  [key: string]: string | number;
}

// ---- 상세 페이지 전체 데이터 컨테이너 (권장)
export interface DashboardPageData {
  meta: DashboardItem;
  kpis: KpiItem[];
  table: {
    columns: string[];
    rows: TableRow[];
  };
}
