'use client';

import Link from 'next/link';
import { Box, Text, SimpleGrid, Tag, TagLabel, VStack } from '@chakra-ui/react';


import { Category, DashboardItem } from 'types/dashboard';

/** 목적: 카드 하나(소주제) */
function DashboardCard({ item }: { item: DashboardItem }) {
  return (
    <Link href={`/dashboards/${item.category}/${item.slug}`}>
      <VStack align="start" p={4} rounded="xl" bg="white" border="1px solid" borderColor="gray.200"
        _hover={{ shadow: 'md', transform: 'translateY(-2px)' }} transition="all .2s" spacing={2}>
        <Text fontWeight="semibold" noOfLines={1}>{item.title}</Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>{item.desc}</Text>
        <Tag size="sm" colorScheme="teal"><TagLabel>{item.metricLabel}: {item.metricValue}</TagLabel></Tag>
      </VStack>
    </Link>
  );
}

/** 목적: 카테고리별 섹션 */
function CategorySection({ cat, items }: { cat: Category; items: DashboardItem[] }) {
     
const CATEGORY_LABEL: Record<Category, string> = {
  finance: '금융', logistics: '운송', education: '교육', defense: '전쟁·안보',
  healthcare: '헬스케어', tech: '기술', retail: '리테일', energy: '에너지',
};
  return (
    <Box mb={8}>
      <Text fontSize="lg" fontWeight="bold" mb={3}>{CATEGORY_LABEL[cat]}</Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {items.map((it) => <DashboardCard key={it.id} item={it} />)}
      </SimpleGrid>
    </Box>
  );
}

/** 목적: 카탈로그 메인 — 네비/사이드바는 기존 레이아웃 그대로 사용 */
export default function DashboardsCatalog() {
    const DASHBOARDS: DashboardItem[] = [
  { id: 'ds1', category: 'logistics', slug: 'e-commerce-shipping', title: 'E-Commerce Shipping Delay', desc: '배송 지연 분류(EDA/모델)', metricLabel: 'F1', metricValue: '0.84' },
  { id: 'ds2', category: 'finance',   slug: 'credit-churn',        title: 'Credit Card Churn',        desc: '신용카드 이탈 예측',    metricLabel: 'AUC', metricValue: '0.89' },
  { id: 'ds3', category: 'education', slug: 'student-performance', title: 'Student Performance',      desc: '성적 회귀 예측',        metricLabel: 'R²',  metricValue: '0.78' },
  { id: 'ds4', category: 'energy',    slug: 'energy-demand',       title: 'Energy Demand Forecast',   desc: '수요 시계열 예측',      metricLabel: 'sMAPE', metricValue: '12.3%' },
    { id: 'ds5', category: 'healthcare', slug: 'patient-readmission', title: 'Patient Readmission',     desc: '환자 재입원 예측',      metricLabel: 'AUC', metricValue: '0.85' },
    { id: 'ds6', category: 'tech',      slug: 'ai-chatbot',          title: 'AI Chatbot Development',  desc: 'AI 챗봇 개발',          metricLabel: 'F1', metricValue: '0.90' },
    { id: 'ds7', category: 'retail',    slug: 'customer-segmentation', title: 'Customer Segmentation', desc: '고객 세분화 분석',      metricLabel: 'F1', metricValue: '0.92' },
    { id: 'ds8', category: 'energy',    slug: 'renewable-energy',   title: 'Renewable Energy Forecasting', desc: '재생 가능 에너지 예측', metricLabel:'AUC', metricValue:'0.88' }
];
  const cats = Array.from(new Set(DASHBOARDS.map(d => d.category))) as Category[];
  return (
    <Box px={{ base: 4, md: 8 }} py={20}>
      <Box bg="gray.50" border="1px solid" borderColor="gray.200" rounded="2xl" p={{ base: 6, md: 8 }} mb={8}>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">카테고리별 데이터 대시보드</Text>
        <Text mt={2} color="gray.600">소주제를 선택하면 실제 대시보드가 열립니다.</Text>
      </Box>

      {cats.map((c) => (
        <CategorySection key={c} cat={c} items={DASHBOARDS.filter(d => d.category === c)} />
      ))}
    </Box>
  );
}
