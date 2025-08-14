'use client';
/**
 * 목적: 8개 타일 그리드(반응형) 렌더링
 * 사용: <ChartGrid specs={[...]} />
 */
import { SimpleGrid } from '@chakra-ui/react';

import ChartTile from './ChartTile';
import { ChartTileSpec } from 'types/dashboard';
import { ChartContent } from './ChartContest';

export default function ChartGrid({ specs }: { specs: ChartTileSpec[] }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
      {specs.map(({ slug, title, desc }) => (
        <ChartTile key={slug} title={title} desc={desc} slug={'$'}>
          <ChartContent slug={slug} />
        </ChartTile>
      ))}
    </SimpleGrid>
  );
}
