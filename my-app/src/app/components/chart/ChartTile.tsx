'use client';
import { Box, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { ChartTileSpec } from 'types/dashboard';


export default function ChartTile({ title, desc, children }: PropsWithChildren<ChartTileSpec>) {
  return (
    <Box p={4} border="1px solid" borderColor="gray.200" rounded="xl" bg="white">
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
      {desc && <Text color="gray.600" mb={3}>{desc}</Text>}
      {children}
    </Box>
  );
}
