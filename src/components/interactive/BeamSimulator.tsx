'use client'

import { useState } from 'react'

const C = '#3B82F6'

export default function BeamSimulator() {
  const [L, setL] = useState(6)
  const [a, setA] = useState(2.5)
  const [P, setP] = useState(10)

  const b = L - a
  const Ra = P * b / L
  const Rb = P * a / L
  const Mmax = P * a * b / L
  const dmax = P * a * b * (L * L - a * a - b * b) / (3 * 200e6 * 1e-6)
  const xMmax = a
  const xDmax = Math.sqrt((L * L - b * b) / 3)

  const w = 600, h = 420
  const padL = 60, padR = 40, padT = 20, padB = 40
  const chartW = w - padL - padR
  const chartH = 120
  const y0 = padT + chartH

  const xScale = (x: number) => padL + (x / L) * chartW
  const yScale = (v: number, max: number) => (v / max) * chartH

  const sfMax = Math.max(Ra, Rb) * 1.15
  const bmMax = Math.max(Math.abs(Mmax), 1) * 1.15
  const deflMax = Math.max(Math.abs(dmax), 1e-6) * 1.15

  const sfPoints = [
    { x: 0, y: 0 },
    { x: 0, y: Ra },
    { x: a, y: Ra },
    { x: a, y: -Rb },
    { x: L, y: -Rb },
    { x: L, y: 0 },
  ]

  const bmPoints = [
    { x: 0, y: 0 },
    { x: a, y: Mmax },
    { x: L, y: 0 },
  ]

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
        Simulador de Vigas — Viga simplemente apoyada con carga puntual
      </div>

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'L — Luz total (m)', val: L, set: setL, min: 2, max: 12, step: 0.5, color: 'var(--accent)' },
          { label: 'a — Posición carga (m)', val: a, set: setA, min: 0.5, max: L - 0.5, step: 0.1, color: 'var(--warning)' },
          { label: 'P — Carga puntual (kN)', val: P, set: setP, min: 1, max: 100, step: 1, color: 'var(--danger)' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: f.color, display: 'block', marginBottom: 5 }}>{f.label}: {f.val}</label>
            <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(+e.target.value)} />
          </div>
        ))}
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Ra (kN)', val: Ra.toFixed(2), color: 'var(--accent)' },
          { label: 'Rb (kN)', val: Rb.toFixed(2), color: 'var(--accent)' },
          { label: 'Mmax (kN·m)', val: Mmax.toFixed(2), color: 'var(--warning)' },
          { label: 'δmax (mm)', val: (dmax * 1000).toFixed(2), color: 'var(--success)' },
        ].map(r => (
          <div key={r.label} style={{ padding: '8px 12px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{r.label}</div>
            <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', fontWeight: 700, color: r.color }}>{r.val}</div>
          </div>
        ))}
      </div>

      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {/* Beam diagram */}
        <text x={padL - 30} y={y0 + 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">Viga</text>
        <line x1={xScale(0)} y1={y0} x2={xScale(L)} y2={y0} stroke="var(--text-1)" strokeWidth="4" strokeLinecap="round" />
        <line x1={xScale(0)} y1={y0 - 8} x2={xScale(0)} y2={y0 + 8} stroke="var(--text-1)" strokeWidth="2" />
        <polygon points={`${xScale(0) - 6},${y0 + 8} ${xScale(0) + 6},${y0 + 8} ${xScale(0)},${y0 + 16}`} fill="var(--text-1)" />
        <line x1={xScale(L)} y1={y0 - 8} x2={xScale(L)} y2={y0 + 8} stroke="var(--text-1)" strokeWidth="2" />
        <polygon points={`${xScale(L) - 6},${y0 + 8} ${xScale(L) + 6},${y0 + 8} ${xScale(L)},${y0 + 16}`} fill="var(--text-1)" />
        <text x={xScale(L)} y={y0 + 28} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">L = {L}m</text>
        <line x1={xScale(0)} y1={y0 + 18} x2={xScale(L)} y2={y0 + 18} stroke="var(--text-3)" strokeWidth="0.8" markerEnd="url(#ar)" />
        <text x={xScale(0) - 4} y={y0 - 12} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">Ra = {Ra.toFixed(1)}</text>
        <text x={xScale(L) + 4} y={y0 - 12} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="start">Rb = {Rb.toFixed(1)}</text>
        {/* Load arrow */}
        <line x1={xScale(a)} y1={y0 - 4} x2={xScale(a)} y2={y0 - 4 - yScale(P, sfMax * 1.5)} stroke="var(--danger)" strokeWidth="2" markerEnd="url(#arrow-red)" />
        <text x={xScale(a)} y={y0 - 4 - yScale(P, sfMax * 1.5) - 4} fill="var(--danger)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight={700}>P = {P}kN</text>
        <text x={xScale(a)} y={y0 + 28} fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">a = {a}m</text>
        <line x1={xScale(a)} y1={y0 + 18} x2={xScale(a)} y2={y0 + 24} stroke="var(--danger)" strokeWidth="0.8" />

        {/* SFD */}
        <text x={padL - 30} y={y0 + chartH + 60 + 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">SFD</text>
        <text x={padL + chartW / 2} y={y0 + chartH + 50} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">V (kN)</text>
        <line x1={padL} y1={y0 + chartH + 10} x2={padL + chartW} y2={y0 + chartH + 10} stroke="var(--border)" strokeWidth="0.8" />
        {sfPoints.map((p, i) => {
          const x = xScale(p.x)
          const y = y0 + chartH + 10 - yScale(p.y, sfMax)
          return i === 0 ? null : (
            <line key={i} x1={xScale(sfPoints[i - 1].x)} y1={y0 + chartH + 10 - yScale(sfPoints[i - 1].y, sfMax)} x2={x} y2={y0 + chartH + 10 - yScale(p.y, sfMax)} stroke="var(--accent)" strokeWidth="1.5" />
          )
        })}
        {/* Vertical jump at load position */}
        <line x1={xScale(a)} y1={y0 + chartH + 10 - yScale(Ra, sfMax)} x2={xScale(a)} y2={y0 + chartH + 10 + yScale(Rb, sfMax)} stroke="var(--accent)" strokeWidth="1.5" />

        {/* BMD */}
        <text x={padL - 30} y={y0 + chartH * 2 + 50} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">BMD</text>
        <text x={padL + chartW / 2} y={y0 + chartH * 2 + 40} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">M (kN·m)</text>
        <line x1={padL} y1={y0 + chartH * 2} x2={padL + chartW} y2={y0 + chartH * 2} stroke="var(--border)" strokeWidth="0.8" />
        <line x1={xScale(0)} y1={y0 + chartH * 2} x2={xScale(a)} y2={y0 + chartH * 2 - yScale(Mmax, bmMax)} stroke="var(--warning)" strokeWidth="2" />
        <line x1={xScale(a)} y1={y0 + chartH * 2 - yScale(Mmax, bmMax)} x2={xScale(L)} y2={y0 + chartH * 2} stroke="var(--warning)" strokeWidth="2" />
        <circle cx={xScale(a)} cy={y0 + chartH * 2 - yScale(Mmax, bmMax)} r="3" fill="var(--warning)" />
        <text x={xScale(a)} y={y0 + chartH * 2 - yScale(Mmax, bmMax) - 6} fill="var(--warning)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">{Mmax.toFixed(1)}</text>

        {/* Axis labels */}
        <text x={w - padR} y={y0 + chartH * 2 + 10} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">x (m)</text>
      </svg>

      <div style={{ display: 'flex', gap: 16, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginTop: 12, flexWrap: 'wrap' }}>
        <span>Reacciones: Ra = {Ra.toFixed(2)} kN, Rb = {Rb.toFixed(2)} kN</span>
        <span>Momento máximo: {Mmax.toFixed(2)} kN·m</span>
        <span>Deflexión máxima: {(dmax * 1000).toFixed(2)} mm</span>
      </div>
    </div>
  )
}
