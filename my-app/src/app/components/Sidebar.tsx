'use client';

import { Box, VStack, HStack, Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FiBarChart2, FiTruck, FiBookOpen, FiShield, FiHeart, FiCpu, FiShoppingBag, FiZap } from 'react-icons/fi';

type Category = { label: string; slug: string; icon: IconType };

const CATEGORIES: ReadonlyArray<Category> = [
  { label: '금융', slug: 'finance', icon: FiBarChart2 },
  { label: '운송', slug: 'transport', icon: FiTruck },
  { label: '교육', slug: 'education', icon: FiBookOpen },
  { label: '전쟁·안보', slug: 'security', icon: FiShield },
  { label: '헬스케어', slug: 'healthcare', icon: FiHeart },
  { label: '기술', slug: 'technology', icon: FiCpu },
  { label: '리테일', slug: 'retail', icon: FiShoppingBag },
  { label: '에너지', slug: 'energy', icon: FiZap },
];

// ===== follow-scroll hook =====
const SCROLL_ROOT_SELECTOR = ''; // 별도 스크롤 컨테이너가 있으면 '#id'
const TOP_OFFSET = 70;
const EASE = 0.15;

type AnyRef<T extends HTMLElement> =
  | React.RefObject<T | null>
  | React.MutableRefObject<T | null>;

function useFollowScroll<T extends HTMLElement>(ref: AnyRef<T>) {
  useEffect(() => {
    const root = (SCROLL_ROOT_SELECTOR && document.querySelector(SCROLL_ROOT_SELECTOR)) as unknown as HTMLElement | null;
    const getTop = () => (root ? root.scrollTop : (window.scrollY || document.documentElement.scrollTop));

    let raf = 0, cur = 0, target = getTop();
    const onScroll = () => { target = getTop(); };
    const loop = () => {
      cur += (target - cur) * EASE;
      if (ref.current) ref.current.style.transform = `translateY(${TOP_OFFSET + Math.max(0, cur)}px)`;
      raf = requestAnimationFrame(loop);
    };

    (root || window).addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      (root || window).removeEventListener('scroll', onScroll as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

// ===== UI =====
function SidebarItem({ label, slug, icon: Icon, active }: { label: string; slug: string; icon: IconType; active: boolean }) {
  return (
    <Box
      as={Link}
      href={`/dashboards/${slug}`}
      aria-current={active ? 'page' : undefined}
      _hover={{ bg: 'gray.50' }}
      bg={active ? 'gray.100' : 'transparent'}
      borderRadius="xl"
      px={3}
      py={2}
      display="block"
    >
      <HStack gap={3}>
        <Icon />
        <Text fontSize="sm" fontWeight={active ? 'bold' : 'medium'}>{label}</Text>
      </HStack>
    </Box>
  );
}

export default function GlobalSidebar() {
  const pathname = usePathname();
  const sideRef = useRef<HTMLDivElement | null>(null);
  useFollowScroll(sideRef);

  return (
    // ✅ 바깥 래퍼는 레이아웃을 차지해야 하므로 relative (절대 금지: absolute)
    
      <Box
        w="250px"
        minH="100vh"
        pb={4}
        pt={55} pl={2}
        bg="white"
        borderRight="1px solid #E2E8F0"
        position="relative"
      >
        {/* ✅ 안쪽 follower만 absolute + transform */}
        <Box
          ref={sideRef}
          position="absolute"
          left={0}
          top={0}
          w="100%"
          sx={{ willChange: 'transform', userSelect: 'none', pointerEvents: 'auto' }}
          style={{ transform: `translateY(${TOP_OFFSET}px)` }} // 초기 위치
        >
          <VStack align="stretch" gap={1}>
            {CATEGORIES.map(({ label, slug, icon }) => {
              const active = pathname?.startsWith(`/dashboards/${slug}`) ?? false;
              return <SidebarItem key={slug} label={label} slug={slug} icon={icon} active={active} />;
            })}
          </VStack>
        </Box>
      </Box>

  );
}
