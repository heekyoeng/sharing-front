'use client';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function ChartSkeleton() {
  return (
    <Box p={4} border="1px solid" borderColor="gray.200" rounded="xl" bg="white">
      <Skeleton height="20px" mb={3} />
      <SkeletonText noOfLines={1} mb={4} />
      <Skeleton height="200px" />
    </Box>
  );
}
