
'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { Providers } from "./providers";
import Sidebar from './components/Sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>

        <Providers>
          <Navbar />
          <Box display="flex" minH="100vh" mt="60px"> {/* ✅ Navbar 밑으로 전체 Flex 영역 */}

            <Box
              w="250px"
         
              borderRight="1px solid #E2E8F0"
              position="sticky"
              top="60px" // Navbar height에 맞게!
              bg="white"
            >
              <Sidebar />
            </Box>
            <Box flex="1"> {/* ✅ 나머지 모든 공간 차지 */}
              {children}
            </Box>

          </Box>
        </Providers>
      </body>
    </html>
  );
}
