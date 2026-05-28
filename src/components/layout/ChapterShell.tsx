'use client'

import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react'
import { ALL_CHAPTERS } from '@/data/chapters'

const PART_COLORS: Record<number, string> = {
  1: 'var(--part-1)',
  2: 'var(--part-2)',
  3: 'var(--part-3)',
  4: 'var(--part-4)',
}

const PART_NAMES: Record<number, string> = {
  1: 'Fundamentos',
  2: 'Análisis de fallas',
  3: 'Elementos mecánicos',
  4: 'Temas avanzados',
}

interface Section { id: string; label: string }

interface ChapterShellProps {
  chapterId: number
  chapterNum: string
  title: string
  subtitle: string
  partNum: number
  sections: Section[]
  practica: React.ReactNode
  children: React.ReactNode
}

export default function ChapterShell({
  chapterId, chapterNum, title, subtitle, partNum, sections, practica, children,
}: ChapterShellProps) {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<'lectura' | 'practica'>('lectura')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const color = PART_COLORS[partNum] ?? 'var(--accent)'
  const partName = PART_NAMES[partNum] ?? ''

  useEffect(() => {
    if (!sidebarOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [sidebarOpen])

  const closeSidebar = () => setSidebarOpen(false)

  const sideWidth = (isMobile || isTablet) ? 'min(82vw, 300px)' : 270

  const sidebarContent = (
    <>
      <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-soft)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {chapterNum}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, marginTop: 6, lineHeight: 1.4, color: 'var(--text-1)' }}>
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Parte {partNum}</span>
        <div style={{ flex: 1, height: 4, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: color, width: '100%' }} />
        </div>
        <span style={{ whiteSpace: 'nowrap' }}>{partName}</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={closeSidebar}
            style={{
              display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '12px 14px', borderRadius: 'var(--radius-sm)',
              fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)',
              color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s',
              minHeight: (isMobile || isTablet) ? 44 : 'auto',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = color)}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
          >
            {s.label}
          </a>
        ))}
      </nav>

      <Link
        href={`/capitulo/${chapterId}/slides`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, color: 'white', background: color, textDecoration: 'none', marginTop: 'auto', minHeight: 44, justifyContent: 'center' }}
      >
        <Monitor size={14} /> Modo Presentación
      </Link>
    </>
  )

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: (isMobile || isTablet) ? '10px 10px' : '7px 12px',
    fontSize: 12.5, fontFamily: 'var(--font-mono)',
    borderRadius: 999,
    color: active ? 'white' : 'var(--text-2)',
    background: active ? color : 'transparent',
    display: 'inline-flex', alignItems: 'center', gap: 5,
    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
    minHeight: (isMobile || isTablet) ? 44 : 36,
    lineHeight: 1,
  })

  const btn44: React.CSSProperties = {
    width: 44, height: 44,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 8, border: 'none', cursor: 'pointer',
    background: 'transparent', color: 'var(--text-1)',
    flexShrink: 0,
  }

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Topbar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', height: 56,
        paddingLeft: 'calc(16px + var(--safe-left, 0px))',
        background: 'color-mix(in oklab, var(--bg-0) 80%, transparent)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-soft)',
      }}>

        {/* Mobile/Tablet: home + hamburger + title */}
        {(isMobile || isTablet) ? (
          <>
            <Link
              href="/"
              aria-label="Ir al inicio"
              style={{ ...btn44 }}
            >
              <Home size={18} />
            </Link>
            <button
              onClick={() => setSidebarOpen(v => !v)}
              aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir índice'}
              style={{
                ...btn44,
                background: sidebarOpen ? 'var(--bg-2)' : 'transparent',
                border: sidebarOpen ? '1px solid var(--border)' : 'none',
              }}
            >
              {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
            }}>
              <span style={{ color, marginRight: 4 }}>{chapterId}</span>{title}
            </span>
          </>
        ) : (
          /* Desktop: breadcrumb */
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte {partNum}</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. {chapterId}</span>
          </nav>
        )}

        {/* Mode switcher */}
        <div style={{
          display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)',
          borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0,
        }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={tabStyle(mode === 'lectura')}>
            <BookOpen size={13} />
            {!isMobile && !isTablet && <span>Lectura</span>}
          </button>
          <Link
            href={`/capitulo/${chapterId}/slides`}
            title="Diapositivas"
            style={{ ...tabStyle(false), textDecoration: 'none' }}
          >
            <Monitor size={13} />
            {!isMobile && !isTablet && <span>Diapositivas</span>}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={tabStyle(mode === 'practica')}>
            <PenLine size={13} />
            {!isMobile && !isTablet && <span>Práctica</span>}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ position: 'relative', flex: 1 }}>

        {/* Mobile/Tablet backdrop */}
        {(isMobile || isTablet) && sidebarOpen && (
          <div
            onClick={closeSidebar}
            style={{
              position: 'fixed', inset: 0, zIndex: 29,
              background: 'rgba(0,0,0,0.4)',
              animation: 'fadeIn 0.2s ease',
            }}
          />
        )}

        {/* Sidebar */}
        <aside
          style={{
            position: (isMobile || isTablet) ? 'fixed' : 'fixed',
            top: 56, left: 0, bottom: 0,
            width: sideWidth, zIndex: 30,
            transform: (isMobile || isTablet)
              ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
              : 'translateX(0)',
            transition: (isMobile || isTablet) ? 'transform 0.26s cubic-bezier(0.4,0,0.2,1)' : 'none',
            background: 'var(--bg-0)',
            borderRight: '1px solid var(--border-soft)',
            overflowY: 'auto',
            padding: '22px 18px 22px 22px',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}
        >
          {sidebarContent}
        </aside>

        {/* Main content */}
        <main
          style={{
            overflowY: 'auto',
            minHeight: 'calc(100vh - 56px)',
            padding: isMobile ? '24px 16px 100px' : isTablet ? '24px 24px 80px' : '32px 40px 80px',
            paddingBottom: isMobile ? 'calc(100px + var(--safe-bottom, 0px))' : isTablet ? '80px' : '80px',
            lineHeight: 1.7,
            marginLeft: (isMobile || isTablet) ? 0 : 270,
            transition: 'margin-left 0.26s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div className="dark-chapter" style={{ maxWidth: 880, margin: '0 auto' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: color, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
              Parte {partNum} · {partName}
            </div>

            <h1
              style={{
                fontSize: isMobile ? 'clamp(24px, 5vw, 34px)' : 36,
                letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14, color: 'var(--text-1)',
              }}
            >
              <span style={{ color, marginRight: 10 }}>{chapterId}</span>
              {title}
            </h1>

            <p style={{ fontSize: isMobile ? 15 : 16, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              {subtitle}
            </p>

            {mode === 'lectura' ? children : practica}

            {/* Bottom navigation */}
            {(() => {
              const idx = ALL_CHAPTERS.findIndex((c) => c.id === chapterId)
              const prev = idx > 0 ? ALL_CHAPTERS[idx - 1] : null
              const next = idx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[idx + 1] : null
              return (
                <div style={{
                  display: 'flex',
                  flexDirection: (isMobile || isTablet) ? 'column' : 'row',
                  justifyContent: 'space-between',
                  gap: 10, marginTop: 48, paddingTop: 28,
                  borderTop: '1px solid var(--border-soft)',
                }}>
                  {prev ? (
                    <Link
                      href={`/capitulo/${prev.id}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        gap: 6, padding: '12px 18px', minHeight: 44,
                        background: 'var(--bg-2)', color: 'var(--text-1)',
                        borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                        fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 12,
                        border: '1px solid var(--border)',
                      }}
                    >
                      <ChevronLeft size={14} /> Cap. {prev.id}: {prev.shortTitle}
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link
                      href={`/capitulo/${next.id}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        gap: 6, padding: '12px 18px', minHeight: 44,
                        background: color, color: 'white',
                        borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                        fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 12,
                      }}
                    >
                      Cap. {next.id}: {next.shortTitle} <ChevronRight size={14} />
                    </Link>
                  ) : <div />}
                </div>
              )
            })()}
          </div>
        </main>
      </div>
    </div>
  )
}
