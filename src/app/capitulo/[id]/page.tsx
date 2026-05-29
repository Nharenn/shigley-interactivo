import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getChapter } from '@/data/chapters'

interface Props {
  params: Promise<{ id: string }>
}

const PAGES: Record<number, React.ComponentType> = {
  1:  dynamic(() => import('@/components/pages/Cap01Page'), { loading: () => null }),
  2:  dynamic(() => import('@/components/pages/Cap02Page'), { loading: () => null }),
  3:  dynamic(() => import('@/components/pages/Cap03Page'), { loading: () => null }),
  4:  dynamic(() => import('@/components/pages/Cap04Page'), { loading: () => null }),
  5:  dynamic(() => import('@/components/pages/Cap05Page'), { loading: () => null }),
  6:  dynamic(() => import('@/components/pages/Cap06Page'), { loading: () => null }),
  7:  dynamic(() => import('@/components/pages/Cap07Page'), { loading: () => null }),
  8:  dynamic(() => import('@/components/pages/Cap08Page'), { loading: () => null }),
  9:  dynamic(() => import('@/components/pages/Cap09Page'), { loading: () => null }),
  10: dynamic(() => import('@/components/pages/Cap10Page'), { loading: () => null }),
  11: dynamic(() => import('@/components/pages/Cap11Page'), { loading: () => null }),
  12: dynamic(() => import('@/components/pages/Cap12Page'), { loading: () => null }),
  13: dynamic(() => import('@/components/pages/Cap13Page'), { loading: () => null }),
  14: dynamic(() => import('@/components/pages/Cap14Page'), { loading: () => null }),
  15: dynamic(() => import('@/components/pages/Cap15Page'), { loading: () => null }),
  16: dynamic(() => import('@/components/pages/Cap16Page'), { loading: () => null }),
  17: dynamic(() => import('@/components/pages/Cap17Page'), { loading: () => null }),
  18: dynamic(() => import('@/components/pages/Cap18Page'), { loading: () => null }),
  19: dynamic(() => import('@/components/pages/Cap19Page'), { loading: () => null }),
  20: dynamic(() => import('@/components/pages/Cap20Page'), { loading: () => null }),
}

export default async function ChapterPage({ params }: Props) {
  const { id } = await params
  const chapterId = Number(id)
  const chapter = getChapter(chapterId)

  if (!chapter || !chapter.ready) notFound()

  const PageComponent = PAGES[chapterId]
  if (!PageComponent) notFound()

  return <PageComponent />
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }))
}
