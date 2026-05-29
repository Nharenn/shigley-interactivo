import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getChapter } from '@/data/chapters'

interface Props {
  params: Promise<{ id: string }>
}

const SLIDE_PAGES: Record<number, React.ComponentType> = {
  1:  dynamic(() => import('@/components/slides/Cap01SlidesPage'), { loading: () => null }),
  2:  dynamic(() => import('@/components/slides/Cap02SlidesPage'), { loading: () => null }),
  3:  dynamic(() => import('@/components/slides/Cap03SlidesPage'), { loading: () => null }),
  4:  dynamic(() => import('@/components/slides/Cap04SlidesPage'), { loading: () => null }),
  5:  dynamic(() => import('@/components/slides/Cap05SlidesPage'), { loading: () => null }),
  6:  dynamic(() => import('@/components/slides/Cap06SlidesPage'), { loading: () => null }),
  7:  dynamic(() => import('@/components/slides/Cap07SlidesPage'), { loading: () => null }),
  8:  dynamic(() => import('@/components/slides/Cap08SlidesPage'), { loading: () => null }),
  9:  dynamic(() => import('@/components/slides/Cap09SlidesPage'), { loading: () => null }),
  10: dynamic(() => import('@/components/slides/Cap10SlidesPage'), { loading: () => null }),
  11: dynamic(() => import('@/components/slides/Cap11SlidesPage'), { loading: () => null }),
  12: dynamic(() => import('@/components/slides/Cap12SlidesPage'), { loading: () => null }),
  13: dynamic(() => import('@/components/slides/Cap13SlidesPage'), { loading: () => null }),
  14: dynamic(() => import('@/components/slides/Cap14SlidesPage'), { loading: () => null }),
  15: dynamic(() => import('@/components/slides/Cap15SlidesPage'), { loading: () => null }),
  16: dynamic(() => import('@/components/slides/Cap16SlidesPage'), { loading: () => null }),
  17: dynamic(() => import('@/components/slides/Cap17SlidesPage'), { loading: () => null }),
  18: dynamic(() => import('@/components/slides/Cap18SlidesPage'), { loading: () => null }),
  19: dynamic(() => import('@/components/slides/Cap19SlidesPage'), { loading: () => null }),
  20: dynamic(() => import('@/components/slides/Cap20SlidesPage'), { loading: () => null }),
}

export default async function SlidesRoute({ params }: Props) {
  const { id } = await params
  const chapterId = Number(id)
  const chapter = getChapter(chapterId)

  if (!chapter || !chapter.ready) notFound()

  const Page = SLIDE_PAGES[chapterId]
  if (!Page) notFound()

  return <Page />
}

export async function generateStaticParams() {
  return Object.keys(SLIDE_PAGES).map(id => ({ id }))
}
