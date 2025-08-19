'use client';

import Link from 'next/link';
import { Box, Text, Flex, IconButton, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Tag, TagLabel, VStack, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import {  useCallback } from 'react';
import type React from 'react';
import { FeaturedItem } from 'types/dashboard';
import { Kpi } from 'types/kpi';
/** ===== Types & Data ===== */

const KPIS: Kpi[] = [
  { label: '등록 데이터셋', value: '38', help: 'Kaggle 기반' },
  { label: '운영 모델', value: '12', help: '분류·회귀·시계열' },
  { label: '평균 성능', value: 'AUC 0.87', help: '최근 실험' },
];

const FEATURED: FeaturedItem[] = [
  { id: 'ds1', title: 'E-Commerce Shipping Delay', desc: '배송 지연 EDA/분류', metricLabel: 'F1', metricValue: '0.84', href: '/dashboards/logistics/e-commerce-shipping' },
  { id: 'ds2', title: 'Credit Card Churn', desc: '신용카드 이탈 예측', metricLabel: 'AUC', metricValue: '0.89', href: '/dashboards/finance/credit-churn' },
  { id: 'ds3', title: 'Student Performance', desc: '성적 회귀 예측', metricLabel: 'R²', metricValue: '0.78', href: '/dashboards/education/student-performance' },
  { id: 'ds4', title: 'Energy Demand', desc: '수요 시계열', metricLabel: 'sMAPE', metricValue: '12.3%', href: '/dashboards/energy/energy-demand' },
];

/** ===== Small Components ===== */
function HeroIntro() {
  return (

    <Box bg="gray.50" rounded="2xl" p={{ base: 6, md: 8 }} mb={6} border="1px solid" borderColor="gray.200">
      <HStack gap={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">데이터로 의사결정을 가속합니다.</Text>
          <Text mt={2} color="gray.600">카테고리별 EDA와 예측모델 결과를 한 화면에서 확인하십시오.</Text>
        </Box>
        <Box>
          <Link href="/dashboards">
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="teal.500">GO TO DASHBOARDS</Text>
          </Link>
        </Box>
      </HStack>
    </Box>



  );
}

function KPIHighlights() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
      {KPIS.map((k) => (
        <Box key={k.label} p={5} rounded="xl" border="1px solid" borderColor="gray.200" bg="white">
          <Stat>
            <StatLabel>{k.label}</StatLabel>
            <StatNumber>{k.value}</StatNumber>
            {k.help && <StatHelpText>{k.help}</StatHelpText>}
          </Stat>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <Link href={item.href}>
      <VStack align="start" minW="280px" p={4} rounded="xl" bg="white" border="1px solid" borderColor="gray.200"
        _hover={{ shadow: 'md', transform: 'translateY(-2px)' }} spacing={2} transition="all .2s">
        <Text fontWeight="semibold" noOfLines={1}>{item.title}</Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>{item.desc}</Text>
        <Tag size="sm" colorScheme="teal"><TagLabel>{item.metricLabel}: {item.metricValue}</TagLabel></Tag>
      </VStack>
    </Link>
  );
}

/** ===== Page ===== */
export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const c = scrollRef.current; if (!c) return;
    const amt = 250, max = c.scrollWidth - c.clientWidth;
    if (direction === 'left') c.scrollLeft <= 0 ? c.scrollLeft = max : c.scrollBy({ left: -amt, behavior: 'smooth' });
    else c.scrollLeft >= max ? c.scrollLeft = 0 : c.scrollBy({ left: amt, behavior: 'smooth' });
  };

  return (
    <Box minH="100vh" bg="white" px={{ base: 4, md: 10 }} py={{ base: 12, md: 20 }} overflowX="hidden">
      
      <Box maxW="5xl" mx="auto" bg="white" p={6} rounded="xl">
        <HeroIntro /> 
        <Text 
  fontSize="lg" 
  fontWeight="bold" 
  color="gray.700" 
  mb={3} 
 
  borderColor="blue.400"
  display="inline-block"
  pb={1}
>
   데이터 정보
</Text>
        <KPIHighlights />

        {/* 가로 스크롤 추천 영역(빈칸 채움) */}
        <Text 
  fontSize="lg" 
  fontWeight="bold" 
  color="gray.700" 
  mb={0} 
 
  borderColor="blue.400"
  display="inline-block"
  pb={0}
>
   조회수 랭킹
</Text>
        <Box>
          <Flex align="center" gap={2}>
            <IconButton aria-label="left" icon={<ChevronLeftIcon />} variant="ghost" onClick={() => scroll('left')} />
            <Flex
              ref={scrollRef}
              width="100%"
              overflowX="auto"
              scrollBehavior="smooth"
              px={2}
              py={4}
              gap={4}
              css={{ '&::-webkit-scrollbar': { display: 'none' } }}
            >
              {FEATURED.map((d) => (<FeaturedCard key={d.id} item={d} />))}
            </Flex>
            <IconButton aria-label="right" icon={<ChevronRightIcon />} variant="ghost" onClick={() => scroll('right')} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
