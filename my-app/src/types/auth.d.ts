// src/types/auth.d.ts
// 로그인 받을 때 당연 프론트에서는 id랑 password만 받아오면 됨 굳이 머 다른 거 받을 필요는 없지 
export interface LoginRequest {
    id: string;
    password: string;

}

export interface LoginResponse {
    message: string;
    role: 'admin' | 'user';
}

export interface RegisterRequest {
    name: string;
    id: sting;
    password: string;
    email: string;
}
