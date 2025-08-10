'use client'

import { usePathname } from 'next/navigation'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // ❗ 여기만 수정하면 됨: 제외하고 싶은 경로들 / 조건 분기 방식
  const isMinimalPage = ['/login', '/register', '/customer-service'].some(path =>
    pathname.startsWith(path)
  )

  return (
    <html lang="ko">
      <body>
        <Providers>
          {isMinimalPage ? (
            <div
              style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f4f4f4',
              }}
            >
              {children}
            </div>
          ) : (
            <>
              <Navbar />
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flex: 1 }}>{children}</main>
              </div>
            </>
          )}
        </Providers>
      </body>
    </html>
  )
}
