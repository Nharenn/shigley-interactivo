'use client'

import { useState, useCallback } from 'react'

interface MohrResult {
  sigma1: number
  sigma2: number
  tauMax: number
  thetaP: number
  center: number
  radius: number
}

function calcMohr(sx: number, sy: number, txy: number): MohrResult {
  const center = (sx + sy) / 2
  const radius = Math.sqrt(((sx - sy) / 2) ** 2 + txy ** 2)
  const sigma1 = center + radius
  const sigma2 = center - radius
  const tauMax = radius
  const thetaP = (Math.atan2(2 * txy, sx - sy) * 180) / Math.PI / 2
  return { sigma1, sigma2, tauMax, thetaP, center, radius }
}

export default function MohrCircle() {
  const [sx, setSx] = useState(80)
  const [sy, setSy] = useState(-40)
  const [txy, setTxy] = useState(30)

  const res = calcMohr(sx, sy, txy)

  const SVG_W = 320
  const SVG_H = 260
  const CX = SVG_W / 2
  const CY = SVG_H / 2

  const maxStress = Math.max(Math.abs(res.sigma1), Math.abs(res.sigma2), Math.abs(res.tauMax), 10)
  const scale = (SVG_H / 2 - 24) / maxStress

  const toSvgX = (s: number) => CX + s * scale
  const toSvgY = (t: number) => CY - t * scale

  const circleR = res.radius * scale
  const circleCX = toSvgX(res.center)

  const ptAx = toSvgX(sx)
  const ptAy = toSvgY(txy)
  const ptBx = toSvgX(sy)
  const ptBy = toSvgY(-txy)

  return (
    <div
      id="mohr"
      style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 28,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Simulador interactivo
        </div>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <div
          style={{
            padding: '2px 10px',
            borderRadius: 999,
            background: 'var(--success-soft)',
            color: 'var(--success)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
          }}
        >
          Tiempo real
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SliderInput label="σx" symbol="σ" value={sx} min={-200} max={200} color="var(--accent)" onChange={setSx} />
          <SliderInput label="σy" symbol="σ" value={sy} min={-200} max={200} color="#60A5FA" onChange={setSy} />
          <SliderInput label="τxy" symbol="τ" value={txy} min={-200} max={200} color="var(--success)" onChange={setTxy} />
        </div>

        {/* SVG Mohr Circle */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          style={{
            width: '100%',
            maxWidth: SVG_W,
            background: 'var(--bg-1)',
            borderRadius: 10,
            border: '1px solid var(--border-soft)',
          }}
        >
          {/* Grid */}
          <defs>
            <pattern id="mohr-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#mohr-grid)" />

          {/* Ejes */}
          <line x1={8} y1={CY} x2={SVG_W - 8} y2={CY} stroke="var(--text-3)" strokeWidth="1" />
          <line x1={CX} y1={8} x2={CX} y2={SVG_H - 8} stroke="var(--text-3)" strokeWidth="1" />
          <text x={SVG_W - 6} y={CY - 5} fill="var(--text-3)" fontSize="9" fontFamily="monospace" textAnchor="end">σ</text>
          <text x={CX + 4} y={14} fill="var(--text-3)" fontSize="9" fontFamily="monospace">τ</text>

          {/* σ1, σ2 labels */}
          {res.radius > 1 && (
            <>
              <text x={toSvgX(res.sigma1) + 4} y={CY - 6} fill="var(--accent)" fontSize="9" fontFamily="monospace">σ₁</text>
              <text x={toSvgX(res.sigma2) - 16} y={CY - 6} fill="var(--accent)" fontSize="9" fontFamily="monospace">σ₂</text>
            </>
          )}

          {/* Círculo */}
          <circle
            cx={circleCX}
            cy={CY}
            r={circleR}
            fill="rgba(59,130,246,0.05)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />

          {/* Puntos extremos del diámetro */}
          <circle cx={toSvgX(res.sigma1)} cy={CY} r="3" fill="var(--accent)" />
          <circle cx={toSvgX(res.sigma2)} cy={CY} r="3" fill="var(--accent)" />

          {/* τmax punto */}
          <circle cx={circleCX} cy={CY - circleR} r="3" fill="var(--success)" />
          <text x={circleCX + 4} y={CY - circleR - 4} fill="var(--success)" fontSize="9" fontFamily="monospace">τmax</text>

          {/* Línea AB (diámetro) */}
          <line x1={ptAx} y1={ptAy} x2={ptBx} y2={ptBy} stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="3 2" />

          {/* Centro C */}
          <circle cx={circleCX} cy={CY} r="3" fill="var(--warning)" />
          <text x={circleCX + 4} y={CY - 5} fill="var(--warning)" fontSize="9" fontFamily="monospace">C</text>

          {/* Punto A */}
          <circle cx={ptAx} cy={ptAy} r="4" fill="var(--danger)" />
          <text x={ptAx + 6} y={ptAy - 2} fill="var(--danger)" fontSize="9" fontFamily="monospace">A</text>

          {/* Punto B */}
          <circle cx={ptBx} cy={ptBy} r="4" fill="#60A5FA" />
          <text x={ptBx + 6} y={ptBy + 10} fill="#60A5FA" fontSize="9" fontFamily="monospace">B</text>
        </svg>
      </div>

      {/* Resultados */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 10,
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid var(--border-soft)',
        }}
      >
        {[
          { label: 'σ₁ (principal máx)', value: res.sigma1.toFixed(2), unit: 'MPa', color: 'var(--accent)' },
          { label: 'σ₂ (principal mín)', value: res.sigma2.toFixed(2), unit: 'MPa', color: '#60A5FA' },
          { label: 'τ_max', value: res.tauMax.toFixed(2), unit: 'MPa', color: 'var(--success)' },
          { label: 'θ_p', value: res.thetaP.toFixed(2), unit: '°', color: 'var(--warning)' },
          { label: 'σ_prom (C)', value: res.center.toFixed(2), unit: 'MPa', color: 'var(--text-2)' },
        ].map((r) => (
          <div
            key={r.label}
            style={{
              padding: '12px 14px',
              background: 'var(--bg-1)',
              borderRadius: 8,
              border: '1px solid var(--border-soft)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              {r.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: r.color }}>
              {r.value}
              <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3)', marginLeft: 3 }}>{r.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SliderProps {
  label: string
  symbol: string
  value: number
  min: number
  max: number
  color: string
  onChange: (v: number) => void
}

function SliderInput({ label, value, min, max, color, onChange }: SliderProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color }}>
          {label}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            style={{
              width: 64,
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 8px',
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-1)',
              textAlign: 'right',
            }}
          />
          <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>MPa</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--accent': color } as React.CSSProperties}
      />
    </div>
  )
}
