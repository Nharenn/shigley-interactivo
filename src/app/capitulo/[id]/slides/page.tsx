import { notFound } from 'next/navigation'
import { getChapter } from '@/data/chapters'
import Cap01SlidesPage from '@/components/slides/Cap01SlidesPage'
import Cap02SlidesPage from '@/components/slides/Cap02SlidesPage'
import Cap03SlidesPage from '@/components/slides/Cap03SlidesPage'
import Cap04SlidesPage from '@/components/slides/Cap04SlidesPage'
import Cap05SlidesPage from '@/components/slides/Cap05SlidesPage'
import Cap06SlidesPage from '@/components/slides/Cap06SlidesPage'
import Cap07SlidesPage from '@/components/slides/Cap07SlidesPage'
import Cap08SlidesPage from '@/components/slides/Cap08SlidesPage'
import Cap09SlidesPage from '@/components/slides/Cap09SlidesPage'
import Cap10SlidesPage from '@/components/slides/Cap10SlidesPage'
import Cap11SlidesPage from '@/components/slides/Cap11SlidesPage'
import Cap12SlidesPage from '@/components/slides/Cap12SlidesPage'
import Cap13SlidesPage from '@/components/slides/Cap13SlidesPage'
import Cap14SlidesPage from '@/components/slides/Cap14SlidesPage'
import Cap15SlidesPage from '@/components/slides/Cap15SlidesPage'
import Cap16SlidesPage from '@/components/slides/Cap16SlidesPage'
import Cap17SlidesPage from '@/components/slides/Cap17SlidesPage'
import Cap18SlidesPage from '@/components/slides/Cap18SlidesPage'
import Cap19SlidesPage from '@/components/slides/Cap19SlidesPage'
import Cap20SlidesPage from '@/components/slides/Cap20SlidesPage'

interface Props {
  params: Promise<{ id: string }>
}

const SLIDE_PAGES: Record<number, React.ComponentType> = {
  1: Cap01SlidesPage,
  2: Cap02SlidesPage,
  3: Cap03SlidesPage,
  4: Cap04SlidesPage,
  5: Cap05SlidesPage,
  6: Cap06SlidesPage,
  7: Cap07SlidesPage,
  8: Cap08SlidesPage,
  9: Cap09SlidesPage,
  10: Cap10SlidesPage,
  11: Cap11SlidesPage,
  12: Cap12SlidesPage,
  13: Cap13SlidesPage,
  14: Cap14SlidesPage,
  15: Cap15SlidesPage,
  16: Cap16SlidesPage,
  17: Cap17SlidesPage,
  18: Cap18SlidesPage,
  19: Cap19SlidesPage,
  20: Cap20SlidesPage,
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
