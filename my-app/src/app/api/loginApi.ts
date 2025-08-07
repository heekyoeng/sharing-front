import { LoginRequest, LoginResponse } from "types/auth";

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '로그인 실패');
  }

  return res.json();
};
