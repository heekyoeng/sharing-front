// app/login/page.tsx
'use client'

import { Box, Button, Flex, Input, Link, Text ,useToast} from '@chakra-ui/react'
import { useState } from 'react'
import { useLogin } from './hooks/useLogin';

export default function LoginPage() {
  const { login, loading, error } = useLogin();
  const toast = useToast();
  
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

 // ✅ 입력값 검증
  if (!id.trim() || !password.trim()) { //입력 된 id 값의 앞뒤 공백 제외했는 것이 없다면 입력오류 토스트 출력
    toast({
      title: '입력 오류',
      description: '아이디 또는 비밀번호를 입력하세요.',
      status: 'warning', // ✅ 경고용 알림
      duration: 1500,
      isClosable: true,
    });
    return; // 더 이상 진행하지 않음
  }

  try {
    await login({ id, password });
    toast({
      title: '로그인 성공',
      description: '메인페이지로 이동합니다.',
      status: 'success',
      duration: 1300,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: '로그인 실패',
      description: '아이디 또는 비밀번호가 틀렸습니다.',
      status: 'error',
      duration: 1300,
      isClosable: true,
    });
  }
};
   
  return (
    <Flex>
    <Box style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      minWidth: '320px'
    }}>
      <Text fontSize="xl" fontWeight="bold" mb="1rem">
        로그인</Text>
      <Input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <Button onClick={handleSubmit} style={{ width: '100%', padding: '0.5rem' }}>
        로그인
      </Button>
      <Link href="/register">
        <Button style={{ width: '100%', padding: '0.5rem' }}>
          회원가입
        </Button>
      </Link>
    </Box>
    </Flex>
  )
}
