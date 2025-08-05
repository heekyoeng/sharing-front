'use client';

import Image from 'next/image';
import { Box, Text, Flex, Icon, IconButton, AspectRatio } from '@chakra-ui/react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef } from 'react';

const dummyItems = [
  { id: 1, title: '무선 청소기', location: '서울 강남구', price: '₩5,000/일', rating: 4.9, src: "/청소기.png" },
  { id: 2, title: '캠핑 의자 세트', location: '서울 서초구', price: '₩3,000/일', rating: 4.8, src: "/캠핑의자.png" },
  { id: 3, title: '폴딩 자전거', location: '서울 송파구', price: '₩7,000/일', rating: 4.7, src: "/자전거.png" },
  { id: 4, title: '프로젝터', location: '서울 마포구', price: '₩6,000/일', rating: 4.95, src: "/빔프로젝트.png" },
  { id: 5, title: '노트북', location: '서울 관악구', price: '₩6,000/일', rating: 4.95, src: "/노트북.png" },
  { id: 6, title: '공구세트', location: '서울 강서구', price: '₩8,000/일', rating: 4.95, src: "/공구세트.png" },
  { id: 7, title: '휠체어', location: '서울 관악구', price: '₩6,000/일', rating: 4.95, src: "/휠체어.png" },
  { id: 8, title: '드릴', location: '서울 관악구', price: '₩6,000/일', rating: 4.95, src: "/드릴.png" },
];

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
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">우리지역 추천 상품</Text>
          <Flex gap={2}>
            <IconButton aria-label="이전" size="sm" variant="ghost" onClick={() => scroll('left')}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton aria-label="다음" size="sm" variant="ghost" onClick={() => scroll('right')}>
              <ChevronRightIcon />
            </IconButton>
          </Flex>
        </Flex>

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
            {dummyItems.map((item) => (
              <Box
                key={item.id}
                minW="180px"
                maxW="180px"
                flexShrink={0}
                bg="gray.50"
                rounded="xl"
                overflow="hidden"
                onClick={() => window.location.href = `/product/${item.id}`}
                _hover={{ cursor: 'pointer', shadow: 'md' }}
              >
                <AspectRatio ratio={4 / 3} width="100%">
                  <Image src={item.src} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </AspectRatio>
                <Box p={3}>
                  <Text fontWeight="bold">{item.title}</Text>
                  <Text fontSize="sm" color="gray.500">{item.location}</Text>
                  <Text fontWeight="bold">{item.price}</Text>
                  <Flex align="center" mt={1}>
                    <Icon as={StarIcon} color="yellow.400" boxSize={4} />
                    <Text fontSize="sm" ml={1} color="gray.600">{item.rating}</Text>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
