'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const MohrCircle = dynamic(() => import('@/components/interactive/MohrCircle'), { ssr: false })
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2, X, FileText,
  BookOpen
} from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle?: string
  note?: string
  content: React.ReactNode
}

interface Props {
  chapterId: number
}

export default function SlidesPage({ chapterId }: Props) {
  const [current, setCurrent] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [revealed, setRevealed] = useState(0)

  const slides = CAP03_SLIDES

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(0, c - 1))
    setRevealed(0)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => Math.min(slides.length - 1, c + 1))
    setRevealed(0)
  }, [slides.length])

  const revealNext = useCallback(() => {
    setRevealed((r) => r + 1)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === ' ') { e.preventDefault(); revealNext() }
      if (e.key === 'n' || e.key === 'N') setShowNotes((s) => !s)
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next, revealNext])

  const slide = slides[current]
  const progress = ((current + 1) / slides.length) * 100

  return (
    <div
      style={{
        background: 'var(--bg-0)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: fullscreen ? 'fixed' : 'relative',
        inset: fullscreen ? 0 : 'auto',
        zIndex: fullscreen ? 100 : 'auto',
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--bg-3)',
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--accent)',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Slide content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 960,
            opacity: 1,
            transition: 'opacity 0.3s',
          }}
        >
          <SlideRenderer slide={slide} revealed={revealed} />
        </div>
      </div>

      {/* Notes panel */}
      {showNotes && slide.note && (
        <div
          style={{
            position: 'fixed',
            bottom: 70,
            left: 0,
            right: 0,
            padding: '16px 40px',
            background: 'color-mix(in oklab, var(--bg-1) 95%, transparent)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--border)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--warning)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 6,
              }}
            >
              Nota del docente
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
              {slide.note}
            </p>
          </div>
        </div>
      )}

      {/* Control bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: 'color-mix(in oklab, var(--bg-0) 90%, transparent)',
          backdropFilter: 'blur(14px)',
          borderTop: '1px solid var(--border-soft)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 12,
          zIndex: 50,
        }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 'var(--radius-sm)',
            fontSize: 13, fontFamily: 'var(--font-mono)',
            color: current === 0 ? 'var(--text-3)' : 'var(--text-1)',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            cursor: current === 0 ? 'default' : 'pointer',
          }}
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--text-2)',
            padding: '6px 14px',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          {current + 1} / {slides.length}
        </span>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 'var(--radius-sm)',
            fontSize: 13, fontFamily: 'var(--font-mono)',
            color: current === slides.length - 1 ? 'var(--text-3)' : 'var(--accent)',
            background: current === slides.length - 1 ? 'var(--bg-2)' : 'var(--accent-soft)',
            border: `1px solid ${current === slides.length - 1 ? 'var(--border)' : 'var(--accent)'}`,
            cursor: current === slides.length - 1 ? 'default' : 'pointer',
          }}
        >
          Siguiente <ChevronRight size={14} />
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setShowNotes((s) => !s)}
            title="Notas del docente (N)"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              fontSize: 12, fontFamily: 'var(--font-mono)',
              color: showNotes ? 'var(--warning)' : 'var(--text-2)',
              background: showNotes ? 'var(--warning-soft)' : 'var(--bg-2)',
              border: `1px solid ${showNotes ? 'var(--warning)' : 'var(--border)'}`,
              cursor: 'pointer',
            }}
          >
            <FileText size={13} /> Notas
          </button>

          <button
            onClick={() => setFullscreen((f) => !f)}
            title="Pantalla completa (F)"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              color: 'var(--text-2)',
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
            }}
          >
            {fullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <Link
            href={`/capitulo/${chapterId}`}
            title="Salir"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              color: 'var(--text-2)',
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              textDecoration: 'none',
            }}
          >
            <BookOpen size={13} /> Lectura
          </Link>

          <Link
            href="/"
            title="Salir"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              color: 'var(--danger)',
              background: 'var(--danger-soft)',
              border: '1px solid var(--danger)',
              textDecoration: 'none',
            }}
          >
            <X size={13} /> Salir
          </Link>
        </div>

        {/* Keyboard hints */}
        <div
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-3)',
            display: 'flex',
            gap: 10,
          }}
        >
          <span>← → navegar</span>
          <span>Espacio revelar</span>
          <span>N notas</span>
        </div>
      </div>
    </div>
  )
}

function SlideRenderer({ slide, revealed }: { slide: Slide; revealed: number }) {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {slide.content}
    </div>
  )
}

/* ─── Slides del Capítulo 3 — Círculo de Mohr ─── */
const CAP03_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Círculo de Mohr del Esfuerzo Plano',
    subtitle: 'Capítulo 3 — Análisis de carga y esfuerzo',
    note: 'Introducir recordando las ecuaciones de transformación de la clase anterior. Preguntar si alguien conoce el Círculo de Mohr antes de empezar.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10vw',
            fontWeight: 700,
            color: 'rgba(59,130,246,0.08)',
            lineHeight: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '15%',
            userSelect: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          3-6
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Capítulo 3 · Parte 1
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
            Círculo de <span style={{ color: 'var(--accent)' }}>Mohr</span>
          </h1>
          <p style={{ fontSize: 20, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px' }}>
            Esfuerzo plano — Análisis de transformaciones
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            {['σ₁ y σ₂', 'τmax', 'θp'].map((item) => (
              <div
                key={item}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--accent)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: '¿Qué es el Círculo de Mohr?',
    note: 'Enfatizar que NO es un método obsoleto, es una herramienta de visualización todavía muy usada en la industria.',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', marginBottom: 32, letterSpacing: '-0.02em' }}>
            ¿Qué es el<br /><span style={{ color: 'var(--accent)' }}>Círculo de Mohr</span>?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'Representación gráfica de las ecuaciones de transformación de esfuerzo',
              'Permite encontrar σ₁, σ₂, τmax y θp de forma visual',
              'Herramienta fundamental para desarrollar intuición sobre estados de esfuerzo',
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  animation: 'fadeIn 0.4s ease both',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ margin: 0, fontSize: 16, color: 'var(--text-1)', lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 260 220" width="260" height="220">
            <line x1="10" y1="110" x2="250" y2="110" stroke="var(--text-3)" strokeWidth="1" />
            <line x1="130" y1="10" x2="130" y2="210" stroke="var(--text-3)" strokeWidth="1" />
            <text x="245" y="105" fill="var(--text-2)" fontSize="12" fontFamily="monospace">σ</text>
            <text x="134" y="14" fill="var(--text-2)" fontSize="12" fontFamily="monospace">τ</text>
            <circle cx="130" cy="110" r="75" fill="rgba(59,130,246,0.06)" stroke="var(--accent)" strokeWidth="2" />
            <circle cx="205" cy="110" r="4" fill="var(--accent)" />
            <circle cx="55" cy="110" r="4" fill="var(--accent)" />
            <circle cx="130" cy="35" r="4" fill="var(--success)" />
            <circle cx="170" cy="75" r="4" fill="var(--danger)" />
            <circle cx="90" cy="145" r="4" fill="#60A5FA" />
            <line x1="170" y1="75" x2="90" y2="145" stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="4 3" />
            <circle cx="130" cy="110" r="3" fill="var(--warning)" />
            <text x="207" y="106" fill="var(--accent)" fontSize="10" fontFamily="monospace">σ₁</text>
            <text x="38" y="106" fill="var(--accent)" fontSize="10" fontFamily="monospace">σ₂</text>
            <text x="134" y="30" fill="var(--success)" fontSize="10" fontFamily="monospace">τmax</text>
            <text x="172" y="72" fill="var(--danger)" fontSize="10" fontFamily="monospace">A</text>
            <text x="75" y="145" fill="#60A5FA" fontSize="10" fontFamily="monospace">B</text>
            <text x="133" y="107" fill="var(--warning)" fontSize="10" fontFamily="monospace">C</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Ecuaciones de transformación',
    note: 'Hacer derivación en el tablero si hay tiempo, si no referenciar sección 3-5 del libro.',
    content: (
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', marginBottom: 40, letterSpacing: '-0.02em' }}>
          Ecuaciones de transformación
        </h2>
        <div
          style={{
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '40px 48px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px, 1.8vw, 22px)', lineHeight: 2.5 }}>
            <div>
              <span className="var-sigma">σ</span>
              <sub>x'</sub> = (<span className="var-sigma">σ</span><sub>x</sub> + <span className="var-sigma">σ</span><sub>y</sub>)/2
              {' '}+{' '}(<span className="var-sigma">σ</span><sub>x</sub> − <span className="var-sigma">σ</span><sub>y</sub>)/2 · cos(2<span className="var-theta">θ</span>)
              {' '}+ <span className="var-tau">τ</span><sub>xy</sub> · sin(2<span className="var-theta">θ</span>)
            </div>
            <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 20, marginTop: 8 }}>
              <span className="var-tau">τ</span>
              <sub>x'y'</sub> = −(<span className="var-sigma">σ</span><sub>x</sub> − <span className="var-sigma">σ</span><sub>y</sub>)/2 · sin(2<span className="var-theta">θ</span>)
              {' '}+ <span className="var-tau">τ</span><sub>xy</sub> · cos(2<span className="var-theta">θ</span>)
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>σ = esfuerzo normal</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--success)' }}>τ = esfuerzo cortante</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--warning)' }}>θ = ángulo del plano</span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Fórmulas del Círculo',
    note: 'Pedir a los estudiantes que deduzcan estas del diagrama antes de mostrarlas.',
    content: (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', marginBottom: 40, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Fórmulas del Círculo de Mohr
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Centro del círculo', eq: 'C = (σx + σy) / 2', color: 'var(--warning)' },
            { label: 'Radio del círculo', eq: 'R = √[ ((σx − σy)/2)² + τxy² ]', color: 'var(--accent)' },
            { label: 'Esfuerzos principales', eq: 'σ₁ = C + R    σ₂ = C − R', color: 'var(--success)' },
            { label: 'Cortante máximo', eq: 'τmax = R', color: 'var(--danger)' },
          ].map((f, i) => (
            <div
              key={f.label}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr',
                gap: 20, alignItems: 'center',
                padding: '18px 22px',
                background: 'var(--bg-2)',
                border: `1px solid var(--border)`,
                borderLeft: `4px solid ${f.color}`,
                borderRadius: '0 var(--radius) var(--radius) 0',
                animation: 'fadeIn 0.4s ease both',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {f.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: f.color, fontWeight: 600 }}>
                {f.eq}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Simulador Interactivo',
    note: 'Jugar con los valores en vivo. Preguntar: ¿qué pasa si σx = σy? ¿Y si τxy = 0? ¿Qué significaría eso físicamente?',
    content: (
      <div>
        <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: 24, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Simulador en <span style={{ color: 'var(--accent)' }}>Vivo</span>
        </h2>
        <MohrCircle />
      </div>
    ),
  },
  {
    id: 6,
    title: 'Ejemplo 3-4',
    note: 'Verificar con el simulador interactivo del slide anterior después de resolver manualmente.',
    content: (
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            Ejemplo 3-4
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--warning-soft)', color: 'var(--warning)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            Intermedio
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Determinación de esfuerzos principales
        </h2>
        <div style={{ background: 'var(--bg-2)', borderLeft: '3px solid var(--accent)', borderRadius: '0 var(--radius) var(--radius) 0', padding: '16px 20px', marginBottom: 20, fontSize: 14, lineHeight: 1.65 }}>
          Dado: <span className="var-sigma" style={{ fontFamily: 'var(--font-mono)' }}>σx = 80 MPa</span>, {' '}
          <span style={{ color: '#60A5FA', fontFamily: 'var(--font-mono)' }}>σy = −40 MPa</span>, {' '}
          <span className="var-tau" style={{ fontFamily: 'var(--font-mono)' }}>τxy = 30 MPa</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { n: 1, eq: 'C = (80 + (−40)) / 2', r: 'C = 20 MPa' },
            { n: 2, eq: 'R = √[(60)² + (30)²] = √4500', r: 'R = 67.08 MPa' },
            { n: 3, eq: 'σ₁ = 20 + 67.08', r: 'σ₁ = 87.08 MPa' },
            { n: 4, eq: 'σ₂ = 20 − 67.08', r: 'σ₂ = −47.08 MPa' },
            { n: 5, eq: 'τmax = R', r: 'τmax = 67.08 MPa' },
            { n: 6, eq: 'θp = ½ · arctan(60/120)', r: 'θp = 13.28°' },
          ].map((s) => (
            <div key={s.n} style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Paso {s.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{s.eq}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)', fontWeight: 600 }}>✓ {s.r}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Puntos Clave',
    note: 'Asignar problemas 3-15 a 3-20 del libro como tarea. Próxima clase: esfuerzo tridimensional.',
    content: (
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 42px)', marginBottom: 40, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Puntos <span style={{ color: 'var(--success)' }}>Clave</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            'El centro siempre está en σprom = (σx + σy)/2',
            'El radio determina τmax directamente',
            'Los esfuerzos principales están donde τ = 0 (eje horizontal)',
            'Los planos de cortante máximo están a 45° de los planos principales',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: 14, alignItems: 'center',
                padding: '16px 20px',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                animation: 'fadeIn 0.4s ease both',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span style={{ color: 'var(--success)', fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 16, color: 'var(--text-1)', lineHeight: 1.45 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link
            href="/capitulo/3"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 'var(--radius-sm)',
              fontSize: 14, fontFamily: 'var(--font-mono)',
              color: 'var(--accent)', background: 'var(--accent-soft)',
              border: '1px solid var(--accent)', textDecoration: 'none',
            }}
          >
            <BookOpen size={15} />
            Ver contenido completo del capítulo
          </Link>
        </div>
      </div>
    ),
  },
]
