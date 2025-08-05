'use client';

import { Box,  Text, VStack  } from '@chakra-ui/react';

import { Checkbox } from '@chakra-ui/checkbox';
import { usePathname } from 'next/navigation';
import { Radio, RadioGroup } from '@chakra-ui/radio';

const locations = ['신당동', '약수동', '황학동', '명동', '중림동', '다산동'];
const categories = [
  '디지털기기', '생활가전', '가구/인테리어', '생활/주방', '유아동',
  '유아도서', '여성의류', '여성잡화', '남성패션/잡화', '뷰티/미용',
  '스포츠/레저', '취미/게임/음반', '도서', '티켓/교환권', '가공식품',
  '건강기능식품', '반려동물용품', '식물', '기타 중고물품', '삽니다'
];

export default function GlobalSidebar() {
  const pathname = usePathname();

  // ❌ 제외할 경로들
  if (['/login', '/customer-service'].includes(pathname)) return null;

  return (
    <Box
      w="250px"
      minH="100vh"
      p={4}
      borderRight="1px solid #E2E8F0"
      position="sticky"
      top={0}
      bg="white"
    >
      <Checkbox mb={4}>거래 가능만 보기</Checkbox>

      <Text fontSize="md" fontWeight="bold" mb={2} mt={4}>
        위치
      </Text>
      <RadioGroup defaultValue="신당동">
        <VStack align="start" gap={1}>
          {locations.map((loc) => (
            <Radio key={loc} value={loc}>{loc}</Radio>
          ))}
        </VStack>
      </RadioGroup>

<Box my={4} borderBottom="1px solid #E2E8F0" />

      <Text fontSize="md" fontWeight="bold" mb={2}>
        카테고리
      </Text>
      <RadioGroup>
        <VStack align="start" gap={1} maxH="calc(100vh - 300px)" overflowY="auto">
          {categories.map((cat) => (
            <Radio key={cat} value={cat}>{cat}</Radio>
          ))}
        </VStack>
      </RadioGroup>
    </Box>
  );
}
