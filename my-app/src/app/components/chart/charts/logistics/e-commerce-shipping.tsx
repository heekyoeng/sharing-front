'use client';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { ECommerceShippingChartProps } from 'types/logistics';
import DelayRateLineChart from './DelayRateLineChart';
import DelayedBarChart from './DelayedBarChart';
import TotalAreaChart from './TotalAreaChart';
import DoDHeatmap from './DoDHeatmap';



function Slot({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box p={3} border="1px dashed" borderColor="gray.300" rounded="md" bg="gray.50" h="200px" display="flex" flexDir="column">
      <Text fontSize="sm" fontWeight="semibold" mb={2}>{title}</Text>
      <Box flex="1" position="relative" w="100%" h="100%">
        {children}
      </Box>
    </Box>
  );
}

function ChartQuadGrid({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      {items.map(({ title, content }) => (
        <Slot key={title} title={title}>{content}</Slot>
      ))}
    </SimpleGrid>
  );
}

export default function ECommerceShippingChart({ dataset, metric = 'delayRate' }: ECommerceShippingChartProps) {
  const hasData = Array.isArray(dataset) && dataset.length > 0;

  const slots = hasData ? [
    { title: '① Delay Rate (Line)',      content: <DelayRateLineChart dataset={dataset} /> },
    { title: '② Delayed Count (Bar)',    content: <DelayedBarChart dataset={dataset} /> },
    { title: '③ Total Volume (Area)',    content: <TotalAreaChart dataset={dataset} /> },
    { title: '④ DoD Change (Heat/Tile)', content: <DoDHeatmap dataset={dataset} /> },
  ] : [];

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" rounded="md" bg="white">
      <Text fontWeight="bold" mb={2}>{metric} Charts</Text>
   
        <ChartQuadGrid items={slots} />
   
    </Box>
  );
}
