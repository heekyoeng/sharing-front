import { Category, DashboardItem } from "types/dashboard";


export const CATEGORY_LABEL: Record<Category, string> = {
  finance:'금융', logistics:'운송', education:'교육', defense:'전쟁·안보',
  healthcare:'헬스케어', tech:'기술', retail:'리테일', energy:'에너지',
};

// URL에서 들어온 값 정규화(사이드바/데이터 불일치 방지)
const alias: Record<string, Category> = {
  transport: 'logistics',
  security: 'defense',
  technology: 'tech',
};

export function normalizeCategory(x: string): Category | null {
  const v = (x in alias) ? alias[x] : x;
  const list: Category[] = ['finance','logistics','education','defense','healthcare','tech','retail','energy'];
  return (list as string[]).includes(v) ? (v as Category) : null;
}
export const DASHBOARDS: DashboardItem[] = [
  { id:'ds1', category:'logistics', slug:'e-commerce-shipping', title:'E-Commerce Shipping Delay', desc:'배송 지연 분류(EDA/모델)', metricLabel:'F1', metricValue:'0.84' },
  { id:'ds2', category:'finance',   slug:'credit-churn',        title:'Credit Card Churn',        desc:'신용카드 이탈 예측',     metricLabel:'AUC', metricValue:'0.89' },
  { id:'ds3', category:'education', slug:'student-performance', title:'Student Performance',      desc:'학생 성적 예측',       metricLabel:'R²', metricValue:'0.78' },
  { id:'ds4', category:'energy',    slug:'energy-demand',      title:'Energy Demand',          desc:'에너지 수요 예측',     metricLabel:'sMAPE', metricValue:'12.3%' },
  { id:'ds5', category:'healthcare',slug:'patient-readmission', title:'Patient Readmission',     desc:'환자 재입원 예측',     metricLabel:'AUC', metricValue:'0.85' },
  { id:'ds6', category:'tech',      slug:'ai-chatbot',        title:'AI Chatbot',             desc:'AI 챗봇 개발',        metricLabel:'F1', metricValue:'0.90' },
  { id:'ds7', category:'retail',   slug:'customer-segmentation', title:'Customer Segmentation', desc:'고객 세분화 분석', metricLabel:'F1', metricValue:'0.92' },
  { id:'ds8', category:'energy',   slug:'renewable-energy', title:'Renewable Energy', desc:'재생 가능 에너지 예측', metricLabel:'AUC', metricValue:'0.88' 
    
  }
];