'use client';

import Image from 'next/image';
import { Box, Text, Flex, Icon, IconButton, AspectRatio } from '@chakra-ui/react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef } from 'react';


export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 250;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === 'left') {
      if (container.scrollLeft <= 0) {
        container.scrollLeft = maxScroll;
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <Box minH="100vh" bg="white" px={{ base: 4, md: 10 }} py={10} overflowX="hidden">
      <Box maxW="5xl" mx="auto" bg="white" p={6} rounded="xl">
       

        <Box overflowX="hidden"
          >
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
           
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
