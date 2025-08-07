'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flex, Box, Button, Image, Text ,useToast} from '@chakra-ui/react';
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const toast = useToast();


useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/users/me', {
        method: 'GET',
        credentials: 'include', // 쿠키 포함
      });

      if (res.ok) {
        const data = await res.json();
        console.log('사용자 역할:', data.role);
        setIsLoggedIn(true); // 🔥 로그인 상태 업데이트
      } else {
        console.log('로그인 상태가 아님');
        
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
      setIsLoggedIn(false); // 로그인 아닌 경우도 명확히
    }
  };

  checkLoginStatus();
}, []);
  // 🔓 로그아웃 함수
  const handleLogout = async () => {
  await fetch('http://localhost:4000/api/auth/logout', {
  method: 'POST',
  credentials: 'include',
});
toast({
        title: '로그아웃 성공',
       
        status: 'success',
        duration: 1300,
        isClosable: true,
      });

    setIsLoggedIn(false);
    router.push('/');
  };

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
      {/* <Box flex="1" mx={4}>
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
      </Box> */}
      <Box>
      {/* 로그인 버튼 */}
   
            {isLoggedIn ? (
        <Button
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
          color="white"
          px={4}
          py={2}
          fontWeight="semibold"
          size="sm"
          borderRadius="md"
          onClick={handleLogout}
        >
          <Text color="black">로그아웃</Text>
        </Button>
      ) : (
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
            <Text color="black">로그인</Text>
          </Button>
        </Link>
      )}
        
    
  
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
            </Box>
          </Flex>
  );
}
