'use client';
/**
 * 목적: 2x2 차트 프레임(헤더/그리드/카드/로딩/빈데이터)
 * 규칙: SRP, 재사용성, 명확 타입, 20줄 내 함수 유지
 */

import { Box, SimpleGrid, Text, HStack, Spacer, Button, Skeleton } from '@chakra-ui/react';
import { useState, type ReactNode } from 'react';
import type { ECommerceShippingChartProps } from 'types/logistics';
import TotalAreaChart from '../TotalAreaChart';
import DoDHeatmap from '../DoDHeatmap';
import WeightVsOnTimeLine from '../WeightVsOnTimeLine';

/** 카드: 제목 + 콘텐츠 */
function ChartCard({ title, height, children }: { title: string; height: number; children: ReactNode }) {
  return (
    <Box p={3} border="1px dashed" borderColor="gray.300" rounded="lg" bg="gray.50" h={`${height}px`} display="flex" flexDir="column">
      <Text fontSize="sm" fontWeight="semibold" mb={2}>{title}</Text>
      <Box flex="1" position="relative" minH="0">{children}</Box>
    </Box>
  );
}

/** 2x2 그리드 */
function ChartGrid({ items, height }: { items: { title: string; content: ReactNode }[]; height: number }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      {items.map(({ title, content }) => (
        <ChartCard key={title} title={title} height={height}>{content}</ChartCard>
      ))}
    </SimpleGrid>
  );
}

/** 로딩/빈 데이터 */
function Placeholder({ text }: { text: string }) {
  return (
    <Box p={6} border="1px dashed" borderColor="gray.300" rounded="lg" bg="gray.50" textAlign="center">
      <Text fontSize="sm" color="gray.600">{text}</Text>
    </Box>
  );
}

/** 헤더(우측 액션 확장 가능) */
function ChartHeader({ label, onRefresh }: { label: string; onRefresh: () => void }) {
  return (
    <HStack mb={3}>
      <Text fontWeight="bold">{label}</Text>
      <Spacer />
      <HStack>
        <Button size="xs" variant="ghost" onClick={onRefresh}>Refresh</Button>
      </HStack>
    </HStack>
  );
}

/** 메인: 4칸 프레임 */
export default function ECommerceShippingChart({
  dataset,
  metric = 'delayRate',
  height: cardHeight = 240,
}: Partial<ECommerceShippingChartProps> & { height?: number }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const isLoading = typeof dataset === 'undefined';

  const items = [
    { title: '① 무게별 제시간에 도착할 확률 (Line)',      content: <WeightVsOnTimeLine /> },
    // { title: '② Delayed Count (Bar)',    content: <DelayedBarChart /> },
    { title: '③ Total Volume (Area)',    content: <TotalAreaChart /> },
    // { title: '④ DoD Change (Heat/Tile)', content: <DoDHeatmap /> },
  ];

  if (isLoading) {
    return (
      <Box p={4} border="1px solid" borderColor="gray.200" rounded="lg" bg="white">
        <ChartHeader label={`${metric} Charts`} onRefresh={() => setRefreshKey(k => k + 1)} />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
          {[1,2,3,4].map(i => (
            <Skeleton key={i} rounded="lg"><Box h={`${cardHeight}px`} /></Skeleton>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" rounded="lg" bg="white">
      <ChartHeader label={`${metric} Charts`} onRefresh={() => setRefreshKey(k => k + 1)} />
      {/* key 변경으로 내부 차트만 재마운트 → 모달 유지 */}
      {items.length > 0
        ? <ChartGrid key={refreshKey} items={items} height={cardHeight} />
        : <Placeholder text="데이터가 없습니다. 기간/필터를 조정해 보십시오." />}
    </Box>
  );
}
  