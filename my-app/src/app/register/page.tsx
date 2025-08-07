'use client';

import {
  Box, Button, FormControl, FormLabel, Input,
  Heading, VStack, Text, useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from 'app/api/registerApi';


export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    if (!emailRegex.test(email)) {
      setError('이메일 형식이 올바르지 않습니다.');
      setLoading(false);
    return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      await registerUser({ id, name, email, password });

      toast({
        title: '회원가입 성공',
        description: '메인페이지로 이동합니다.',
        status: 'success',
        duration: 1300,
        isClosable: true,
      });

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={8} bg="white" rounded="xl" shadow="md">
      <Heading mb={6} size="lg">회원가입</Heading>
      <VStack gap={4}>
        <FormControl isRequired>
          <FormLabel>이름</FormLabel>
          <Input placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>아이디</FormLabel>
          <Input placeholder="username123" value={id} onChange={(e) => setId(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>이메일</FormLabel>
          <Input placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>

        {error && <Text color="red.500" fontSize="sm" alignSelf="start">{error}</Text>}

        <Button colorScheme="teal" width="full" onClick={handleRegister} isLoading={loading}>
          회원가입
        </Button>
      </VStack>
    </Box>
  );
}
