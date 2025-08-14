// app/dashboards/[category]/[slug]/page.tsx
'use client';

/**
 * 목적
 * - 클라이언트 컴포넌트에서 useParams()로 [category]/[slug] 읽기
 * - 더미데이터는 이 파일 내부에만 보관
 * - 타입/가드/에러메시지 명확화
 */

import React, { JSX } from 'react';
import { useParams } from 'next/navigation';
import {
  Box, SimpleGrid, Text,
  Stat, StatLabel, StatNumber, StatHelpText,
  Table, Thead, Tr, Th, Tbody, Td
} from '@chakra-ui/react';
import type { Category, DashboardItem, KpiItem, TableRow } from 'types/dashboard';

// ===== 타입: 상세 페이지 데이터 컨테이너 (로컬 선언)
interface DashboardPageData {
  meta: DashboardItem;
  kpis: KpiItem[];
  table: { columns: string[]; rows: TableRow[] };
}

// ===== 카테고리 정규화(가드)
const ALLOWED: ReadonlyArray<Category> = [
  'finance','logistics','education','defense','healthcare','tech','retail','energy',
];

function asCategory(input: unknown): Category | null {
  if (typeof input !== 'string') return null;
  const low = input.toLowerCase() as Category;
  return (ALLOWED as readonly string[]).includes(low) ? low : null;
}

// ===== 더미 메타 (카탈로그의 모든 slug 포함)
const META_BY_SLUG: Record<string, DashboardItem> = {
  'e-commerce-shipping': {
    id: 'ds1', category: 'logistics', slug: 'e-commerce-shipping',
    title: 'E-Commerce Shipping Delay', desc: '배송 지연 분류(EDA/모델)',
    metricLabel: 'F1', metricValue: '0.84',
  },
  'credit-churn': {
    id: 'ds2', category: 'finance', slug: 'credit-churn',
    title: 'Credit Card Churn', desc: '신용카드 이탈 예측',
    metricLabel: 'AUC', metricValue: '0.89',
  },
  'student-performance': {
    id: 'ds3', category: 'education', slug: 'student-performance',
    title: 'Student Performance', desc: '성적 회귀 예측',
    metricLabel: 'R²', metricValue: '0.78',
  },
  'energy-demand': {
    id: 'ds4', category: 'energy', slug: 'energy-demand',
    title: 'Energy Demand Forecast', desc: '수요 시계열 예측',
    metricLabel: 'sMAPE', metricValue: '12.3%',
  },
  'patient-readmission': {
    id: 'ds5', category: 'healthcare', slug: 'patient-readmission',
    title: 'Patient Readmission', desc: '환자 재입원 예측',
    metricLabel: 'AUC', metricValue: '0.85',
  },
  'ai-chatbot': {
    id: 'ds6', category: 'tech', slug: 'ai-chatbot',
    title: 'AI Chatbot Development', desc: 'AI 챗봇 개발',
    metricLabel: 'F1', metricValue: '0.90',
  },
  'customer-segmentation': {
    id: 'ds7', category: 'retail', slug: 'customer-segmentation',
    title: 'Customer Segmentation', desc: '고객 세분화 분석',
    metricLabel: 'F1', metricValue: '0.92',
  },
  'renewable-energy': {
    id: 'ds8', category: 'energy', slug: 'renewable-energy',
    title: 'Renewable Energy Forecasting', desc: '재생 가능 에너지 예측',
    metricLabel:'AUC', metricValue:'0.88',
  },
};

// ===== 더미 상세 (KPI + 테이블)
const DETAIL_BY_SLUG: Record<string, DashboardPageData> = {
  'e-commerce-shipping': {
    meta: META_BY_SLUG['e-commerce-shipping'],
    kpis: [
      { label: '지연율', value: 7.8, unit: '%', deltaPct: -1.2 },
      { label: '평균 배송일', value: 2.9, unit: '일', deltaPct: 0.3 },
      { label: '클레임 건수', value: 124, unit: '건', deltaPct: -8.4 },
    ],
    table: {
      columns: ['주문ID','지역','배송사','예상일','실제일','지연여부'],
      rows: [
        { 주문ID:'A1023', 지역:'서울', 배송사:'CJ', 예상일:2, 실제일:4, 지연여부:'Y' },
        { 주문ID:'A1024', 지역:'부산', 배송사:'한진', 예상일:3, 실제일:3, 지연여부:'N' },
        { 주문ID:'A1025', 지역:'대구', 배송사:'로젠', 예상일:2, 실제일:2, 지연여부:'N' },
      ],
    },
  },
  'credit-churn': {
    meta: META_BY_SLUG['credit-churn'],
    kpis: [
      { label: '총 이탈률', value: 16.0, unit:'%', deltaPct: -0.8 },
      { label: '평균 잔존가치', value: 182_000, unit:'원' },
      { label: '고위험 고객 수', value: 1_245, unit:'명', deltaPct: 2.3 },
    ],
    table: {
      columns: ['고객ID','등급','월평균결제액','연회비','연령대','이탈예측(%)'],
      rows: [
        { 고객ID:'C10231', 등급:'Silver', 월평균결제액:320_000, 연회비:30_000, 연령대:'30대', '이탈예측(%)':71.2 },
        { 고객ID:'C10492', 등급:'Gold',   월평균결제액:540_000, 연회비:60_000, 연령대:'40대', '이탈예측(%)':68.7 },
        { 고객ID:'C10877', 등급:'Basic',  월평균결제액:210_000, 연회비:0,      연령대:'20대', '이탈예측(%)':66.4 },
      ],
    },
  },
  'student-performance': {
    meta: META_BY_SLUG['student-performance'],
    kpis: [
      { label: 'R²', value: 0.78 },
      { label: 'MAE', value: 3.2, unit:'점' },
      { label: '상위 리스크 과목 수', value: 2, unit:'개' },
    ],
    table: {
      columns: ['학생ID','과목','중간','기말','과제','예측점수'],
      rows: [
        { 학생ID:'S-011', 과목:'수학', 중간:74, 기말:81, 과제:88, 예측점수:80.5 },
        { 학생ID:'S-027', 과목:'영어', 중간:82, 기말:78, 과제:90, 예측점수:83.1 },
        { 학생ID:'S-045', 과목:'물리', 중간:65, 기말:70, 과제:72, 예측점수:69.4 },
      ],
    },
  },
  'energy-demand': {
    meta: META_BY_SLUG['energy-demand'],
    kpis: [
      { label: 'sMAPE', value: '12.3%' },
      { label: 'MAE', value: 1_920, unit:'MWh' },
      { label: '피크수요', value: 28_400, unit:'MWh' },
    ],
    table: {
      columns: ['일자','예측수요(MWh)','실제수요(MWh)','오차(MWh)'],
      rows: [
        { 일자:'2025-08-10', '예측수요(MWh)': 22100, '실제수요(MWh)': 22640, '오차(MWh)': 540 },
        { 일자:'2025-08-11', '예측수요(MWh)': 22850, '실제수요(MWh)': 22590, '오차(MWh)': -260 },
        { 일자:'2025-08-12', '예측수요(MWh)': 23800, '실제수요(MWh)': 24110, '오차(MWh)': 310 },
      ],
    },
  },
  'patient-readmission': {
    meta: META_BY_SLUG['patient-readmission'],
    kpis: [
      { label: 'AUC', value: 0.85 },
      { label: '재입원율', value: 13.2, unit:'%' },
      { label: '고위험 환자', value: 184, unit:'명' },
    ],
    table: {
      columns: ['환자ID','진단군','재원일수','나이','재입원예측(%)'],
      rows: [
        { 환자ID:'P1001', 진단군:'순환기', 재원일수:6, 나이:67, '재입원예측(%)':61.4 },
        { 환자ID:'P1042', 진단군:'내분비', 재원일수:4, 나이:58, '재입원예측(%)':55.2 },
        { 환자ID:'P1090', 진단군:'호흡기', 재원일수:5, 나이:72, '재입원예측(%)':63.9 },
      ],
    },
  },
  'ai-chatbot': {
    meta: META_BY_SLUG['ai-chatbot'],
    kpis: [
      { label: 'F1', value: 0.90 },
      { label: '응답지연', value: 420, unit:'ms', deltaPct:-7.5 },
      { label: '세션 성공률', value: 92.4, unit:'%' },
    ],
    table: {
      columns: ['세션ID','의도','정확도(%)','응답시간(ms)','성공'],
      rows: [
        { 세션ID:'S001', 의도:'주문상태', '정확도(%)':95.1, '응답시간(ms)':380, 성공:'Y' },
        { 세션ID:'S014', 의도:'환불요청', '정확도(%)':91.7, '응답시간(ms)':410, 성공:'Y' },
        { 세션ID:'S033', 의도:'배송문의', '정확도(%)':89.8, '응답시간(ms)':470, 성공:'Y' },
      ],
    },
  },
  'customer-segmentation': {
    meta: META_BY_SLUG['customer-segmentation'],
    kpis: [
      { label: '세그먼트 수', value: 5, unit:'개' },
      { label: '상위 ARPU', value: 38_000, unit:'원' },
      { label: '이탈 위험군', value: 2, unit:'개' },
    ],
    table: {
      columns: ['세그먼트','인원','평균구매액','재구매율(%)'],
      rows: [
        { 세그먼트:'A(High-Value)', 인원:420, 평균구매액:75_000, '재구매율(%)':62.1 },
        { 세그먼트:'B', 인원:910, 평균구매액:42_000, '재구매율(%)':38.4 },
        { 세그먼트:'C', 인원:1310, 평균구매액:21_000, '재구매율(%)':22.7 },
      ],
    },
  },
  'renewable-energy': {
    meta: META_BY_SLUG['renewable-energy'],
    kpis: [
      { label: 'AUC', value: 0.88 },
      { label: '발전량 평균', value: 12_400, unit:'MWh' },
      { label: '풍속 평균', value: 6.2, unit:'m/s' },
    ],
    table: {
      columns: ['일자','예측발전(MWh)','실제발전(MWh)','풍속(m/s)'],
      rows: [
        { 일자:'2025-08-10', '예측발전(MWh)': 11800, '실제발전(MWh)': 12150, '풍속(m/s)': 5.9 },
        { 일자:'2025-08-11', '예측발전(MWh)': 12350, '실제발전(MWh)': 12410, '풍속(m/s)': 6.3 },
        { 일자:'2025-08-12', '예측발전(MWh)': 12900, '실제발전(MWh)': 12820, '풍속(m/s)': 6.4 },
      ],
    },
  },
};

// ===== 조회 함수 (slug→상세)
function getDashboardData(category: Category, slug: string): DashboardPageData | null {
  const data = DETAIL_BY_SLUG[slug];
  if (!data) return null;
  return data.meta.category === category ? data : null;
}

// ===== 프리젠테이션 컴포넌트들 (SRP, 20줄 내)
function KpiStat({ k }: { k: KpiItem }) {
  return (
    <Stat p={4} rounded="xl" border="1px solid" borderColor="gray.200" bg="white">
      <StatLabel>{k.label}</StatLabel>
      <StatNumber>
        {typeof k.value === 'number' ? k.value.toLocaleString() : k.value}
        {k.unit ? ` ${k.unit}` : ''}
      </StatNumber>
      {typeof k.deltaPct === 'number' && (
        <StatHelpText>{k.deltaPct > 0 ? '+' : ''}{k.deltaPct}% vs prev</StatHelpText>
      )}
    </Stat>
  );
}

function KpiGrid({ data }: { data: DashboardPageData }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mb={8}>
      {data.kpis.map(k => <KpiStat key={k.label} k={k} />)}
    </SimpleGrid>
  );
}

function DataTable({ data }: { data: DashboardPageData }) {
  return (
    <Box rounded="xl" border="1px solid" borderColor="gray.200" bg="white" p={4}>
      <Text fontWeight="semibold" mb={3}>상세 데이터</Text>
      <Table size="sm" variant="simple">
        <Thead><Tr>{data.table.columns.map(c => <Th key={c}>{c}</Th>)}</Tr></Thead>
        <Tbody>
          {data.table.rows.map((row, idx) => (
            <Tr key={idx}>
              {data.table.columns.map(col => (
                <Td key={col}>
                  {typeof row[col] === 'number'
                    ? (row[col] as number).toLocaleString()
                    : (row[col] as string)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

// ===== 페이지 엔트리 (기본형: default export 컴포넌트)
export default function Page(): JSX.Element {
  // useParams는 Record<string, string | string[]>
  const params = useParams();

  const categoryRaw = params?.category;
  const slugRaw = params?.slug;

  // 안전 가드: string으로 보정
  const category = typeof categoryRaw === 'string' ? categoryRaw : Array.isArray(categoryRaw) ? categoryRaw[0] : '';
  const slug = typeof slugRaw === 'string' ? slugRaw : Array.isArray(slugRaw) ? slugRaw[0] : '';

  const cat = asCategory(category);
  if (!cat || !slug) return <Text px={6} py={20}>잘못된 경로입니다.</Text>;

  const data = getDashboardData(cat, slug);
  if (!data) return <Text px={6} py={20}>대시보드를 찾을 수 없습니다.</Text>;

  return (
    <Box px={{ base: 4, md: 8 }} py={20}>
      <Text fontSize="2xl" fontWeight="bold" mb={1}>{data.meta.title}</Text>
      <Text color="gray.600" mb={6}>{data.meta.desc}</Text>
      <KpiGrid data={data} />
      <DataTable data={data} />
    </Box>
  );
}
