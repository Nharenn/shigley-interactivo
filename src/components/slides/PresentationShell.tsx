'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText, X, BookOpen, Ellipsis } from 'lucide-react'
import { ALL_CHAPTERS } from '@/data/chapters'

export interface SlideData {
  id: number
  title: string
  note?: string
  revealCount?: number
  Content: React.ComponentType<{ revealed: number }>
}

interface Props {
  chapterId: number
  partColor: string
  slides: SlideData[]
}

export default function PresentationShell({ chapterId, partColor, slides }: Props) {
  const router = useRouter()
  const touchRef = useRef({ startX: 0, startY: 0 })
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [isFs, setIsFs] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()
  const [showMenu, setShowMenu] = useState(false)

  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX
    touchRef.current.startY = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX
    const dy = e.changedTouches[0].clientY - touchRef.current.startY
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
    if (dx > 0) goPrev()
    else goNext()
  }

  const slide = slides[current]
  const slideMaxR = slide.revealCount ?? 0

  const { prevChapter, nextChapter } = useMemo(() => {
    const idx = ALL_CHAPTERS.findIndex((c) => c.id === chapterId)
    const prev = idx > 0 ? ALL_CHAPTERS[idx - 1] : null
    const next = idx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[idx + 1] : null
    return { prevChapter: prev?.ready ? prev : null, nextChapter: next?.ready ? next : null }
  }, [chapterId])

  const goNext = useCallback(() => {
    if (revealed < slideMaxR) {
      setRevealed(r => r + 1)
    } else if (current < slides.length - 1) {
      setCurrent(c => c + 1)
      setRevealed(0)
    } else if (nextChapter) {
      router.push(`/capitulo/${nextChapter.id}/slides`)
    }
  }, [revealed, slideMaxR, current, slides.length, nextChapter, router])

  const goPrev = useCallback(() => {
    if (revealed > 0) {
      setRevealed(r => r - 1)
    } else if (current > 0) {
      const prev = current - 1
      setCurrent(prev)
      setRevealed(slides[prev].revealCount ?? 0)
    } else if (prevChapter) {
      router.push(`/capitulo/${prevChapter.id}/slides`)
    }
  }, [revealed, current, slides, prevChapter, router])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s)
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {})
        else document.exitFullscreen()
      }
      if (e.key === 'Escape') {
        if (document.fullscreenElement) document.exitFullscreen()
        else setIsFs(false)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [goNext, goPrev])

  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', h)
    return () => document.removeEventListener('fullscreenchange', h)
  }, [])

  const progress = ((current + 1) / slides.length) * 100
  const { Content } = slide
  const isFirst = current === 0 && revealed === 0
  const isLast = current === slides.length - 1 && revealed >= slideMaxR

  return (
    <div style={{
      background: 'var(--bg-0)', minHeight: '100vh',
      position: isFs ? 'fixed' : 'relative', inset: isFs ? 0 : 'auto',
      zIndex: isFs ? 999 : 'auto', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 1400px 800px at 50% 110%, ${partColor}0A, transparent 72%)`,
      }} />

      {/* Top progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'var(--bg-3)', zIndex: 60 }}>
        <div style={{ height: '100%', background: partColor, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Slide area */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '40px 20px 72px' : isTablet ? '48px 32px 72px' : '64px 48px 80px', position: 'relative',
          cursor: (isMobile || isTablet) ? 'default' : 'pointer',
        }}
        onClick={(e) => {
          if ((isMobile || isTablet) || showMenu) return
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          if (x < rect.width * 0.3) goPrev()
          else goNext()
        }}
      >
        {/* Ghost slide number */}
        <div style={{
          position: 'fixed', top: '10%', left: '5%',
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(120px, 20vw, 240px)',
          fontWeight: 700, color: `${partColor}07`, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em',
        }}>
          {String(current + 1).padStart(2, '0')}
        </div>

        <div style={{ width: '100%', maxWidth: 1020, position: 'relative', zIndex: 1 }}>
          <Content key={`${current}-${slide.id}`} revealed={revealed} />
        </div>
      </div>

      {/* Notes panel */}
      <div style={{
        position: 'fixed', bottom: 56, left: 0, right: 0,
        padding: showNotes ? '16px 48px 18px' : '0 48px',
        maxHeight: showNotes ? 160 : 0,
        overflow: 'hidden',
        background: 'color-mix(in oklab, var(--bg-1) 96%, transparent)',
        backdropFilter: 'blur(16px)',
        borderTop: showNotes ? '1px solid var(--border)' : 'none',
        transition: 'max-height 0.3s ease, padding 0.3s ease',
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1020, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
            Nota del docente
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6 }}>
            {slide.note ?? '—'}
          </p>
        </div>
      </div>

      {/* Control bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: (isMobile || isTablet) ? 48 : 56,
        background: 'color-mix(in oklab, var(--bg-0) 92%, transparent)',
        backdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--border-soft)',
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, zIndex: 51,
      }}>
        <Btn onClick={goPrev} disabled={isFirst && !prevChapter} accent={prevChapter && isFirst ? partColor : undefined} compact={isMobile || isTablet}>
          <ChevronLeft size={13} />
          {prevChapter && isFirst && !isMobile && !isTablet
            ? <>Cap. {prevChapter.id} Anterior</>
            : (isMobile || isTablet) ? '' : 'Anterior'}
        </Btn>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: (isMobile || isTablet) ? 11 : 12, color: 'var(--text-2)', padding: '5px 8px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap' }}>
          {current + 1} / {slides.length}
          {slideMaxR > 0 && <span style={{ color: `${partColor}80` }}> · {revealed}/{slideMaxR}</span>}
        </span>

        <Btn onClick={goNext} disabled={isLast && !nextChapter} accent={nextChapter || !isLast ? (nextChapter && isLast ? partColor : partColor) : undefined} compact={isMobile || isTablet}>
          {nextChapter && isLast && !isMobile && !isTablet
            ? <>Siguiente Cap. {nextChapter.id} <ChevronRight size={13} /></>
            : (isMobile || isTablet)
              ? <ChevronRight size={13} />
              : <>Siguiente <ChevronRight size={13} /></>}
        </Btn>

        {/* Mobile/Tablet: compact extras */}
        {(isMobile || isTablet) ? (
          <div style={{ marginLeft: 'auto' }}>
            <IconBtn onClick={() => setShowMenu(s => !s)} active={showMenu} title="Más opciones">
              <Ellipsis size={15} />
            </IconBtn>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
            <IconBtn onClick={() => setShowNotes(s => !s)} active={showNotes} activeColor="var(--warning)" title="Notas (N)">
              <FileText size={13} /> Notas
            </IconBtn>
            <IconBtn onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else document.exitFullscreen() }} title="Pantalla completa (F)">
              {isFs ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </IconBtn>
            <Link href={`/capitulo/${chapterId}`} style={linkStyle}>
              <BookOpen size={13} /> Lectura
            </Link>
            <Link href="/" style={{ ...linkStyle, color: 'var(--danger)', background: 'var(--danger-soft)', borderColor: 'var(--danger)' }}>
              <X size={13} /> Salir
            </Link>
          </div>
        )}

        {!isMobile && !isTablet && (
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'flex', gap: 10, flexShrink: 0 }}>
            <span>← → navegar</span>
            <span>N notas</span>
            <span>F pantalla</span>
          </div>
        )}
      </div>

      {/* Mobile/Tablet actions menu */}
      {(isMobile || isTablet) && showMenu && (
        <div
          style={{
            position: 'fixed', bottom: 48, right: 12,
            background: 'var(--bg-1)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)',
            padding: 8, zIndex: 52, display: 'flex', flexDirection: 'column', gap: 4,
          }}
        >
          <button onClick={() => { setShowNotes(s => !s); setShowMenu(false) }} style={{ ...menuItem, color: showNotes ? 'var(--warning)' : 'var(--text-2)' }}>
            <FileText size={14} /> Notas
          </button>
          <button onClick={() => { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else document.exitFullscreen(); setShowMenu(false) }} style={menuItem}>
            {isFs ? <Minimize2 size={14} /> : <Maximize2 size={14} />} Pantalla completa
          </button>
          <Link href={`/capitulo/${chapterId}`} style={{ ...menuItem, textDecoration: 'none' }} onClick={() => setShowMenu(false)}>
            <BookOpen size={14} /> Modo lectura
          </Link>
          <Link href="/" style={{ ...menuItem, textDecoration: 'none', color: 'var(--danger)' }} onClick={() => setShowMenu(false)}>
            <X size={14} /> Salir
          </Link>
        </div>
      )}
    </div>
  )
}

/* ─── Mini helpers ─── */

const baseBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  padding: '5px 12px', borderRadius: 'var(--radius-sm)',
  fontSize: 12, fontFamily: 'var(--font-mono)',
  border: '1px solid var(--border)', cursor: 'pointer',
  transition: 'all 0.15s',
}

function Btn({ children, onClick, disabled, accent, compact }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; accent?: string; compact?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...baseBtn,
      padding: compact ? '5px 8px' : '5px 12px',
      fontSize: compact ? 11 : 12,
      background: !disabled && accent ? `${accent}18` : 'var(--bg-2)',
      borderColor: !disabled && accent ? accent : 'var(--border)',
      color: disabled ? 'var(--text-3)' : accent ?? 'var(--text-1)',
      cursor: disabled ? 'default' : 'pointer',
    }}>
      {children}
    </button>
  )
}

const menuItem: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '10px 14px', borderRadius: 'var(--radius-sm)',
  fontSize: 13, fontFamily: 'var(--font-mono)',
  color: 'var(--text-2)', background: 'none', border: 'none',
  cursor: 'pointer', whiteSpace: 'nowrap', width: '100%',
}

function IconBtn({ children, onClick, active, activeColor, title }: {
  children: React.ReactNode; onClick: () => void; active?: boolean; activeColor?: string; title?: string
}) {
  return (
    <button onClick={onClick} title={title} style={{
      ...baseBtn,
      background: active && activeColor ? `${activeColor}18` : 'var(--bg-2)',
      borderColor: active && activeColor ? activeColor : 'var(--border)',
      color: active && activeColor ? activeColor : 'var(--text-2)',
    }}>
      {children}
    </button>
  )
}

const linkStyle: React.CSSProperties = {
  ...baseBtn, textDecoration: 'none', color: 'var(--text-2)',
  background: 'var(--bg-2)', borderColor: 'var(--border)',
}
