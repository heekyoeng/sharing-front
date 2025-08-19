'use client';
/**
 * 목적: slug별 차트 콘텐츠 제공 (동적 import로 번들 최적화)
 * 사용: <ChartContent slug="credit-churn" />
 */
import dynamic from 'next/dynamic';
import { Text } from '@chakra-ui/react';

import ChartSkeleton from './ChartSkeleton';
import { ChartSlug } from 'types/dashboard';
import ECommerceShippingChart from './charts/logistics/main/e-commerce-shipping';

// 예시: 실제 파일 경로에 맞춰 조정   


export function ChartContent({ slug }: { slug: ChartSlug }) {
  switch (slug) {
    case 'e-commerce-shipping':     return <ECommerceShippingChart dataset={[]}/>;
    default:
      return <Text>📌 {slug} 차트가 준비되었습니다.</Text>;
  }
}
