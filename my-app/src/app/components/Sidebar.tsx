'use client';

import { Box,  Text, VStack  } from '@chakra-ui/react';

import { Checkbox } from '@chakra-ui/checkbox';
import { usePathname } from 'next/navigation';
import { Radio, RadioGroup } from '@chakra-ui/radio';



export default function GlobalSidebar() {
  const pathname = usePathname();

  // ❌ 제외할 경로들
  if (['/login', '/customer-service'].includes(pathname)) return null;

  return (
    <Box
      w="250px"
      minH="100vh"
      p={4}
      borderRight="1px solid #E2E8F0"
      position="sticky"
      top={0}
      bg="white"
    >
 

      
    
    </Box>
  );
}
