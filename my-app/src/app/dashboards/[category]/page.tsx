// app/dashboards/[category]/page.tsx
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { CATEGORY_LABEL, DASHBOARDS, normalizeCategory } from 'app/lib/category';
import Link from 'next/link';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';


export default function CategoryPage({ params }: { params:{category:string} }) {
  const cat = normalizeCategory(params.category);
  if (!cat) return <Text>카테고리를 찾을 수 없습니다.</Text>;

  const items = DASHBOARDS.filter((d: { category: string; }) => d.category === cat);
  return (
    <Box px={{ base:4, md:8 }} py={20} >
      <Text fontSize="xl" fontWeight="bold" mb={3}>{CATEGORY_LABEL[cat]}</Text>
      <SimpleGrid columns={{ base:1, sm:2, md:3 }} spacing={4}>
        {items.map((it: { id: Key | null | undefined; slug: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; desc: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <Link key={it.id} href={`/dashboards/${cat}/${it.slug}`}>
            <Box p={4} rounded="xl" border="1px solid" borderColor="gray.200" _hover={{ shadow:'md' }}>
              <Text fontWeight="semibold" noOfLines={1}>{it.title}</Text>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>{it.desc}</Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
