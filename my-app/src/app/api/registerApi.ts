import { RegisterRequest } from "types/auth";



export async function registerUser({
  id,
 name,
  email,
  password,
}: RegisterRequest): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, id, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || '회원가입 실패');
  }
}