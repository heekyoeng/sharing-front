// 목적: /dashboards 하위 공통 404 화면
import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box px={{ base:4, md:8 }} py={{ base:6, md:10 }}>
      <Box p={{ base:6, md:8 }} rounded="2xl" border="1px solid" borderColor="gray.200" bg="white">
        <Text fontSize="xl" fontWeight="bold" mb={2}>대시보드를 찾을 수 없습니다</Text>
        <Text color="gray.600" mb={4}>요청하신 카테고리 또는 소주제가 존재하지 않습니다.</Text>
        <Link href="/dashboards"><Button colorScheme="teal">대시보드 목록으로</Button></Link>
      </Box>
    </Box>
  );
}