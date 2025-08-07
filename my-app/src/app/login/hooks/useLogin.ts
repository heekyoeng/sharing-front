// 로그인 API 호출
// 입력 값 검증
// // 로그인 성공 시 쿠키 저장 및 페이지 이동
// hooks/useLogin.ts
//복잡한 로직을 컴포넌트 바깥으로 분리할 수 있어


// app/login/useLogin.ts
'use client';
import { loginApi } from 'app/api/loginApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginRequest } from 'types/auth';


export const useLogin = () => { //use로 시작하는 함수는 리액트 훅의 규칙을 따름
  const router = useRouter(); // 페이지 이동을 제어합니다. (로그인 성공 후 router.push()로 다른 경로로 이동할 수 있게 합니다.)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const login = async (payload: LoginRequest) => {
  setLoading(true);
  setError('');
  try {
    console.log('📡 요청 전송');
    const res = await loginApi(payload);
    console.log('✅ 성공 응답', res);
    router.push(res.role === 'admin' ? '/admin/dashboard' : '/');
  } catch (err) {
    console.log('❌ 에러 발생', err);
    setError('로그인 실패');
    throw err;
  } finally {
    setLoading(false);
  }
};

  return { login, loading, error };
};
