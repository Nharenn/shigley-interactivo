'use client'

import { useState } from 'react'

export default function GoodmanDiagram() {
  const [Se, setSe] = useState(250)
  const [Sut, setSut] = useState(700)
  const [Sy, setSy] = useState(500)
  const [sigma_a, setSigma_a] = useState(100)
  const [sigma_m, setSigma_m] = useState(150)

  const w = 460, h = 280
  const padL = 45, padB = 36, padT = 16, padR = 20
  const chartW = w - padL - padR
  const chartH = h - padB - padT
  const maxVal = Math.max(Sut, Sy) * 1.1

  const xp = (v: number) => padL + (v / maxVal) * chartW
  const yp = (v: number) => padT + chartH - (v / maxVal) * chartH

  const n_goodman = 1 / (sigma_a / Se + sigma_m / Sut)
  const safeGoodman = sigma_a / Se + sigma_m / Sut <= 1

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Diagrama de Goodman modificado</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Se (MPa)', val: Se, set: setSe, min: 50, max: 500, color: 'var(--success)' },
          { label: 'Sut (MPa)', val: Sut, set: setSut, min: 200, max: 1400, color: 'var(--danger)' },
          { label: 'σa (MPa)', val: sigma_a, set: setSigma_a, min: 0, max: 500, color: 'var(--accent)' },
          { label: 'σm (MPa)', val: sigma_m, set: setSigma_m, min: 0, max: 700, color: 'var(--warning)' },
        ].map(f => (
          <div key={f.label}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: f.color, display: 'block', marginBottom: 5 }}>{f.label}: {f.val}</label>
            <input type="range" min={f.min} max={f.max} value={f.val} onChange={e => f.set(+e.target.value)} />
          </div>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="var(--border)" strokeWidth="1" />
        <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="var(--border)" strokeWidth="1" />
        {[0, 100, 200, 300, 400, 500, 600].filter(v => v <= maxVal).map(v => (
          <g key={v}>
            <line x1={xp(v)} y1={padT} x2={xp(v)} y2={padT + chartH} stroke="var(--border-soft)" strokeWidth="0.5" />
            <line x1={padL} y1={yp(v)} x2={padL + chartW} y2={yp(v)} stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x={xp(v)} y={padT + chartH + 14} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">{v}</text>
            <text x={padL - 4} y={yp(v) + 3} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">{v}</text>
          </g>
        ))}
        <text x={padL + chartW / 2} y={h - 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">σm (MPa)</text>
        <text x={10} y={padT + chartH / 2} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" transform={`rotate(-90 10 ${padT + chartH / 2})`}>σa (MPa)</text>
        <line x1={xp(0)} y1={yp(Se)} x2={xp(Sut)} y2={yp(0)} stroke="var(--accent)" strokeWidth="2" />
        <line x1={xp(0)} y1={yp(Sy)} x2={xp(Sy)} y2={yp(0)} stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4,3" />
        <circle cx={xp(sigma_m)} cy={yp(sigma_a)} r="6" fill={safeGoodman ? 'var(--success)' : 'var(--danger)'} />
        <text x={xp(Sut) - 4} y={yp(0) - 4} fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">Sut</text>
        <text x={xp(0) + 4} y={yp(Se) - 4} fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">Se</text>
        <text x={xp(0) + 4} y={yp(Sy) - 4} fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)">Sy</text>
      </svg>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' as const }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
          Criterio Goodman: σa/Se + σm/Sut = {(sigma_a / Se + sigma_m / Sut).toFixed(3)}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: safeGoodman ? 'var(--success)' : 'var(--danger)' }}>
          n = {n_goodman.toFixed(2)} {safeGoodman ? '✓ Seguro' : '✗ Falla'}
        </div>
      </div>
    </div>
  )
}
