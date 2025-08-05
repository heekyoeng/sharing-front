'use client';

import Link from 'next/link';
import { Flex, Box, Button, Image, Text } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Flex
      as="nav"
      w="100%"
      h="60px"
      px={6}
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      bg="white"
      backdropFilter="blur(8px)"
      boxShadow="sm"
      zIndex={999}
    >
      {/* 로고 */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="공유의궁 로고"
          height="36px"
          objectFit="contain"
          cursor="pointer"
        />
      </Link>
      {/* 검색창 */}
      <Box flex="1" mx={4}>
        <input
          type="text"
          placeholder="상품검색"
          style={{
        width: '65%',
        padding: '8px',
        borderRadius: '16px', // 둥글게 변경
        border: '1px solid #ccc',
        fontSize: '14px',
          }}
        />
      </Box>
      {/* 로그인 버튼 */}
      <Link href="/login">
        <Button
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
          color="white"
          px={4}
          py={2}
          fontWeight="semibold"
          size="sm"
          borderRadius="md"
        >
          <Text
           color={ 'black'}>
          로그인
          </Text>
        </Button>
        
    
      </Link>
            {/* 고객센터 버튼 */}
            <Link href="/customer-service">
            <Button
              bg="transparent"
              _hover={{ bg: 'gray.100' }}
              color="white"
              px={4}
              py={2}
              fontWeight="semibold"
              size="sm"
              borderRadius="md"
            >
              <Text color="black">고객센터</Text>
            </Button>
            </Link>
          </Flex>
  );
}
