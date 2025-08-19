/**
 * 목적: 로그인 API 호출(쿠키 포함) + 일관된 에러 메시지 반환
 * 전제: NEXT_PUBLIC_API_BASE는 http://localhost:5000
 */
import { LoginRequest, LoginResponse } from 'types/auth';

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as any)?.error ?? '로그인 실패');

    return data as LoginResponse;
  } catch (e) {
    const msg = e instanceof Error ? e.message : '네트워크 오류';
    throw new Error(msg);
  }
};
