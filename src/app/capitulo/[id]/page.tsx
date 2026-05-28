import { notFound } from 'next/navigation'
import { getChapter } from '@/data/chapters'
import Cap01Page from '@/components/pages/Cap01Page'
import Cap02Page from '@/components/pages/Cap02Page'
import Cap03Page from '@/components/pages/Cap03Page'
import Cap04Page from '@/components/pages/Cap04Page'
import Cap05Page from '@/components/pages/Cap05Page'
import Cap06Page from '@/components/pages/Cap06Page'
import Cap07Page from '@/components/pages/Cap07Page'
import Cap08Page from '@/components/pages/Cap08Page'
import Cap09Page from '@/components/pages/Cap09Page'
import Cap10Page from '@/components/pages/Cap10Page'
import Cap11Page from '@/components/pages/Cap11Page'
import Cap12Page from '@/components/pages/Cap12Page'
import Cap13Page from '@/components/pages/Cap13Page'
import Cap14Page from '@/components/pages/Cap14Page'
import Cap15Page from '@/components/pages/Cap15Page'
import Cap16Page from '@/components/pages/Cap16Page'
import Cap17Page from '@/components/pages/Cap17Page'
import Cap18Page from '@/components/pages/Cap18Page'
import Cap19Page from '@/components/pages/Cap19Page'
import Cap20Page from '@/components/pages/Cap20Page'

interface Props {
  params: Promise<{ id: string }>
}

const PAGES: Record<number, React.ComponentType> = {
  1: Cap01Page,
  2: Cap02Page,
  3: Cap03Page,
  4: Cap04Page,
  5: Cap05Page,
  6: Cap06Page,
  7: Cap07Page,
  8: Cap08Page,
  9: Cap09Page,
  10: Cap10Page,
  11: Cap11Page,
  12: Cap12Page,
  13: Cap13Page,
  14: Cap14Page,
  15: Cap15Page,
  16: Cap16Page,
  17: Cap17Page,
  18: Cap18Page,
  19: Cap19Page,
  20: Cap20Page,
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
