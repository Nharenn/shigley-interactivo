'use client'
import { ReactNode } from 'react'

export function PreguntaBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 p-4 rounded-xl border-2" style={{ borderColor: 'var(--accent)', background: 'var(--bg-1)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg" role="img" aria-label="question">💡</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Pregúntate esto
        </span>
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-1)', fontStyle: 'italic' }}>
        {children}
      </div>
    </div>
  )
}

export function OjoAqui({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 p-3 rounded-lg border" style={{ borderColor: '#f97316', background: '#f9731615' }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base" role="img" aria-label="warning">⚠️</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.04em' }}>
          OJO AQUÍ
        </span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-1)' }}>
        {children}
      </div>
    </div>
  )
}

export function FormulaGlosa({ formula, glosa }: { formula: string; glosa: { sym: string; desc: string }[] }) {
  return (
    <div className="my-5 p-4 rounded-xl border-l-4" style={{ background: 'var(--bg-2)', borderLeftColor: 'var(--accent)' }}>
      <div className="font-mono text-sm mb-3 overflow-x-auto" style={{ color: 'var(--accent)' }}>
        {formula}
      </div>
      <div className="space-y-1">
        {glosa.map((g, i) => (
          <div key={i} className="flex gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
            <code className="font-mono font-bold shrink-0" style={{ color: 'var(--accent)', minWidth: 40 }}>{g.sym}</code>
            <span>{g.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MiniEjemplo({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm" role="img" aria-label="example">✏️</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
          Mini-ejemplo
        </span>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-1)' }}>
        {children}
      </div>
    </div>
  )
}

export function SVGContainer({ children, caption, width = 400, height = 280 }: { children: ReactNode; caption?: string; width?: number; height?: number }) {
  return (
    <div className="my-5 p-3 rounded-xl border flex flex-col items-center" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" max-width={width} height="auto" style={{ maxWidth: width }}>
        {children}
      </svg>
      {caption && (
        <div className="mt-2 text-xs text-center" style={{ color: 'var(--text-2)' }}>{caption}</div>
      )}
    </div>
  )
}
