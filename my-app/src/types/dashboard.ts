export interface FeaturedItem {
    id: string;
    title: string;
    desc: string;
    metricLabel: string;
    metricValue: string;
    href: string;
}
export type Category =
  | 'finance' | 'logistics' | 'education' | 'defense'
  | 'healthcare' | 'tech' | 'retail' | 'energy';

export interface DashboardItem {
  id: string;
  category: Category;
  slug: string;        // URL 세그먼트
  title: string;       // 카드/상세 타이틀
  desc: string;        // 한 줄 설명
  metricLabel: string; // 예: AUC, F1, sMAPE
  metricValue: string; // 예: 0.87, 0.84, 12.3%
}