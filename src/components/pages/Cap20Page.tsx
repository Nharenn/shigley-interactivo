'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo, FormulaGlosa } from '@/components/content/ChapterHelpers'
import { BellCurveSVG, StressStrengthSVG, RegressionSVG } from '@/components/content/Chap20Figures'

const accent = 'var(--part-4)'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold mt-10 mb-4 pb-2 border-b-2" style={{ borderColor: accent, color: accent }}>
      {children}
    </h2>
  )
}

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ background: 'var(--bg-2)', borderLeft: `4px solid ${accent}` }}>
      {children}
    </div>
  )
}

function ConceptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
      <div className="font-bold mb-2" style={{ color: accent }}>{title}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function normalCDF(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1 / (1 + p * x)
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1 + sign * y)
}

function NormalDistributionExplorer() {
  const [mu, setMu] = useState(70)
  const [sigma, setSigma] = useState(5)
  const [xVal, setXVal] = useState(65)

  const z = (xVal - mu) / sigma
  const prob = normalCDF(z)

  const w = 400, h = 200
  const cx = w / 2, cy = 150
  const scale = 35
  const pts: [number, number][] = []
  const steps = 100
  const xMin = mu - 4 * sigma
  const xMax = mu + 4 * sigma
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (xMax - xMin) * i / steps
    const zz = (x - mu) / sigma
    const y = Math.exp(-0.5 * zz * zz) / (sigma * Math.sqrt(2 * Math.PI))
    pts.push([cx + (x - mu) * scale / sigma, cy - y * scale * sigma])
  }
  const curveD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')

  const xIdx = Math.round((xVal - xMin) / (xMax - xMin) * steps)
  const fillPts = pts.slice(0, xIdx + 1)
  const fillD = fillPts.length > 0
    ? `M${fillPts[0][0].toFixed(1)},${cy} ${fillPts.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')} L${fillPts[fillPts.length - 1][0].toFixed(1)},${cy} Z`
    : ''

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>NormalDistributionExplorer</h3>
      <p className="text-sm mb-4 opacity-70">Ajusta μ y σ para ver cómo cambia la campana de Gauss. El área sombreada corresponde a P(X &lt; x).</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs mb-1">μ — Media</label>
          <input type="range" min={40} max={100} step={0.5} value={mu} onChange={e => setMu(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{mu.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">σ — Desv. estándar</label>
          <input type="range" min={0.5} max={20} step={0.5} value={sigma} onChange={e => setSigma(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{sigma.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">x — Límite</label>
          <input type="range" min={mu - 4 * sigma} max={mu + 4 * sigma} step={0.5} value={xVal} onChange={e => setXVal(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{xVal.toFixed(1)}</div>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w, margin: '0 auto 12px' }}>
        <line x1="20" y1={cy} x2={w - 10} y2={cy} stroke="var(--text-3)" strokeWidth="1" />
        <line x1={cx} y1="20" x2={cx} y2={cy + 5} stroke="var(--text-3)" strokeWidth="1" />
        <path d={fillD} fill="var(--accent)" opacity={0.2} />
        <path d={curveD} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <line x1={pts[xIdx]?.[0] ?? cx} y1={cy} x2={pts[xIdx]?.[0] ?? cx} y2={pts[xIdx]?.[1] ?? cy} stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={pts[xIdx]?.[0] ?? cx - 15} y={cy + 18} fill="var(--danger)" fontSize="10" fontFamily="var(--font-mono)">x = {xVal.toFixed(1)}</text>
        <text x={cx - 12} y={cy + 18} fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)">μ</text>
      </svg>
      <div className="grid grid-cols-3 gap-4">
        {[
          ['z = (x−μ)/σ', z.toFixed(4)],
          ['Φ(z) = P(X &lt; x)', (prob * 100).toFixed(3) + ' %'],
          ['P(X &gt; x)', ((1 - prob) * 100).toFixed(3) + ' %'],
        ].map(([lbl, val]) => (
          <div key={lbl} className="p-3 rounded-lg text-center" style={{ background: 'var(--bg-2)' }}>
            <div className="text-xs opacity-60">{lbl}</div>
            <div className="text-lg font-mono font-bold" style={{ color: accent }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReliabilityCalculator() {
  const [mu_s, setMu_s] = useState(300)
  const [sigma_s, setSigma_s] = useState(25)
  const [mu_S, setMu_S] = useState(400)
  const [sigma_S, setSigma_S] = useState(30)

  const z = (mu_S - mu_s) / Math.sqrt(sigma_S * sigma_S + sigma_s * sigma_s)
  const R = normalCDF(z)
  const pf = 1 - R

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>ReliabilityCalculator</h3>
      <p className="text-sm mb-4 opacity-70">
        Confiabilidad R = P(resistencia &gt; esfuerzo). Si ambos son normales: z = (μ_S − μ_s) / √(σ_S² + σ_s²).
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'μ_s — Esfuerzo medio (MPa)', val: mu_s, set: setMu_s },
          { label: 'σ_s — Desv. esfuerzo (MPa)', val: sigma_s, set: setSigma_s },
          { label: 'μ_S — Resistencia media (MPa)', val: mu_S, set: setMu_S },
          { label: 'σ_S — Desv. resistencia (MPa)', val: sigma_S, set: setSigma_S },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step={5} value={val} onChange={e => set(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
      </div>
      <StressStrengthSVG />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {[
          ['z = (μ_S − μ_s) / √(σ_S² + σ_s²)', z.toFixed(4)],
          ['R — Confiabilidad', (R * 100).toFixed(4) + ' %'],
          ['P_f = 1 − R — Prob. falla', (pf * 100).toFixed(4) + ' %'],
        ].map(([lbl, val]) => (
          <div key={lbl} className="p-3 rounded-lg" style={{ background: 'var(--bg-2)' }}>
            <div className="text-xs opacity-60">{lbl}</div>
            <div className="text-lg font-mono font-bold" style={{ color: val.includes('100') || parseFloat(val) > 90 ? 'var(--success)' : 'var(--danger)' }}>{val}</div>
          </div>
        ))}
      </div>
      <OjoAqui>
        La confiabilidad R = 99.9% significa que 1 de cada 1000 piezas fallará. Para sistemas en serie, la confiabilidad total es el producto de las confiabilidades individuales. Si un sistema tiene 10 componentes con R = 99% cada uno, la confiabilidad total es solo 0.99¹⁰ = 90.4%.
      </OjoAqui>
    </div>
  )
}

function LinearRegressionTool() {
  const [rawXY, setRawXY] = useState('1,3.2; 2,5.1; 3,6.8; 4,9.0; 5,11.1')
  const [predictX, setPredictX] = useState(6)

  const pairs = rawXY.split(';').map(s => {
    const [x, y] = s.split(',').map(n => Number(n.trim()))
    return { x, y }
  }).filter(p => !isNaN(p.x) && !isNaN(p.y))

  const n = pairs.length
  const sumX = pairs.reduce((s, p) => s + p.x, 0)
  const sumY = pairs.reduce((s, p) => s + p.y, 0)
  const sumXY = pairs.reduce((s, p) => s + p.x * p.y, 0)
  const sumX2 = pairs.reduce((s, p) => s + p.x * p.x, 0)
  const sumY2 = pairs.reduce((s, p) => s + p.y * p.y, 0)
  const xbar = sumX / n
  const ybar = sumY / n
  const sx = Math.sqrt((sumX2 - sumX * sumX / n) / (n - 1))
  const sy = Math.sqrt((sumY2 - sumY * sumY / n) / (n - 1))
  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const a = ybar - b * xbar
  const r = b * sx / sy
  const r2 = r * r
  const yPred = a + b * predictX

  const w = 400, h = 240
  const xMin = Math.min(...pairs.map(p => p.x), 0) * 0.9
  const xMax = Math.max(...pairs.map(p => p.x), predictX) * 1.1
  const yMin = 0
  const yMax = Math.max(...pairs.map(p => p.y), yPred) * 1.15
  const toSvgX = (x: number) => 50 + (x - xMin) / (xMax - xMin) * 320
  const toSvgY = (y: number) => 210 - (y - yMin) / (yMax - yMin) * 170

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>LinearRegressionTool</h3>
      <p className="text-sm mb-4 opacity-70">Ingresa pares (x,y) separados por punto y coma. Ajusta una recta por mínimos cuadrados y predice nuevos valores.</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs mb-1">Datos (x,y; x,y; ...)</label>
          <textarea value={rawXY} onChange={e => setRawXY(e.target.value)} rows={3}
            className="w-full p-2 rounded border text-sm font-mono"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">Predecir para x =</label>
          <input type="number" step={0.5} value={predictX} onChange={e => setPredictX(Number(e.target.value))}
            className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w, margin: '0 auto 12px' }}>
        <line x1="50" y1="210" x2={w - 10} y2="210" stroke="var(--text-2)" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="50" y2="210" stroke="var(--text-2)" strokeWidth="1.5" />
        {pairs.map((p, i) => (
          <g key={i}>
            <line x1={toSvgX(p.x)} y1={toSvgY(p.y)} x2={toSvgX(p.x)} y2={toSvgY(a + b * p.x)} stroke="var(--danger)" strokeWidth="1" opacity={0.5} />
            <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill="var(--accent)" />
          </g>
        ))}
        {n > 1 && (
          <line x1={toSvgX(xMin)} y1={toSvgY(a + b * xMin)} x2={toSvgX(xMax)} y2={toSvgY(a + b * xMax)}
            stroke="var(--accent)" strokeWidth="2" strokeDasharray="5,3" />
        )}
        {n > 1 && (
          <circle cx={toSvgX(predictX)} cy={toSvgY(yPred)} r="5" fill="var(--warning)" stroke="var(--bg-0)" strokeWidth="2" />
        )}
        <text x={w - 120} y="22" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">
          y = {a.toFixed(3)} {b >= 0 ? '+' : '-'} {Math.abs(b).toFixed(3)}x
        </text>
        <text x={w - 120} y="36" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">
          R² = {r2.toFixed(4)}
        </text>
      </svg>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Pendiente b', b.toFixed(4)],
          ['Intercepto a', a.toFixed(4)],
          ['R²', r2.toFixed(4)],
          [`ŷ = ${a.toFixed(2)} + ${b.toFixed(2)}·${predictX}`, yPred.toFixed(3)],
        ].map(([lbl, val]) => (
          <div key={lbl} className="p-3 rounded-lg" style={{ background: 'var(--bg-2)' }}>
            <div className="text-xs opacity-60">{lbl}</div>
            <div className="text-lg font-mono font-bold" style={{ color: accent }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCalc() {
  const [rawData, setRawData] = useState('62.8, 64.4, 65.8, 66.3, 68.1, 69.1, 69.8, 71.5, 74.0')
  const [mu, setMu] = useState(63.625)
  const [sigma, setSigma] = useState(2.594)
  const [xLow, setXLow] = useState(60.0)
  const [xHigh, setXHigh] = useState(70.0)

  const vals = rawData.split(',').map(s => Number(s.trim())).filter(v => !isNaN(v) && v !== 0)
  const N = vals.length
  const xbar = N > 0 ? vals.reduce((a, b) => a + b, 0) / N : 0
  const variance = N > 1 ? vals.reduce((s, v) => s + (v - xbar) ** 2, 0) / (N - 1) : 0
  const sx = Math.sqrt(variance)
  const Cx = xbar > 0 ? sx / xbar : 0

  const zLow = (xLow - mu) / sigma
  const zHigh = (xHigh - mu) / sigma
  const pLow = normalCDF(zLow)
  const pHigh = normalCDF(zHigh)
  const pBetween = pHigh - pLow

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-6" style={{ color: accent }}>Calculadora Estadística</h3>
      <div className="mb-6">
        <h4 className="font-bold mb-2" style={{ color: accent }}>1. Estadística descriptiva de la muestra</h4>
        <label className="block text-xs mb-1">Datos (separados por comas)</label>
        <textarea value={rawData} onChange={e => setRawData(e.target.value)} rows={3}
          className="w-full p-2 rounded border text-sm font-mono"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          {[
            ['N — Tamaño de muestra', N.toString(), ''],
            ['x̄ — Media aritmética', xbar.toFixed(4), 'kpsi'],
            ['sx — Desviación estándar', sx.toFixed(4), 'kpsi'],
            ['Cx — Coeficiente variación', Cx.toFixed(4), ''],
          ].map(([lbl, val, unit]) => (
            <div key={lbl} className="p-3 rounded-lg" style={{ background: 'var(--bg-3)' }}>
              <div className="text-xs opacity-60">{lbl}</div>
              <div className="text-xl font-mono font-bold" style={{ color: accent }}>{val} <span className="text-xs">{unit}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <h4 className="font-bold mb-2" style={{ color: accent }}>2. Probabilidades — Distribución Normal N(μ, σ)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs mb-1">μ — Media de la población</label>
            <input type="number" step="0.1" value={mu} onChange={e => setMu(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1">σ — Desviación estándar</label>
            <input type="number" step="0.1" min="0.01" value={sigma} onChange={e => setSigma(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1">x_low — Límite inferior</label>
            <input type="number" step="0.5" value={xLow} onChange={e => setXLow(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1">x_high — Límite superior</label>
            <input type="number" step="0.5" value={xHigh} onChange={e => setXHigh(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ['z_low', zLow.toFixed(4), `z = (${xLow} − ${mu}) / ${sigma}`],
            ['Φ(z_low) = P(X < x_low)', (pLow * 100).toFixed(3) + ' %', `F(${xLow.toFixed(2)})`],
            ['z_high', zHigh.toFixed(4), `z = (${xHigh} − ${mu}) / ${sigma}`],
            ['Φ(z_high) = P(X < x_high)', (pHigh * 100).toFixed(3) + ' %', `F(${xHigh.toFixed(2)})`],
            ['P(x_low < X < x_high)', (pBetween * 100).toFixed(3) + ' %', 'Φ(z_high) − Φ(z_low)'],
            ['P(X > x_high)', ((1 - pHigh) * 100).toFixed(3) + ' %', '1 − Φ(z_high)'],
          ].map(([lbl, val, sub]) => (
            <div key={lbl} className="p-3 rounded-lg" style={{ background: 'var(--bg-3)' }}>
              <div className="text-xs opacity-60">{lbl}</div>
              <div className="text-xl font-mono font-bold" style={{ color: accent }}>{val}</div>
              <div className="text-xs opacity-60">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WeibullCalc() {
  const [x0, setX0] = useState(0.02)
  const [theta, setTheta] = useState(4.459)
  const [b, setB] = useState(1.483)
  const [R_target, setR_target] = useState(0.9)

  function gamma(n: number): number {
    if (n < 0.5) return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n))
    n -= 1
    const g = 7
    const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
    let x = c[0]
    for (let i = 1; i < g + 2; i++) x += c[i] / (n + i)
    const t = n + g + 0.5
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x
  }

  const thetaMinusX0 = theta - x0
  const mu_x = x0 + thetaMinusX0 * gamma(1 + 1 / b)
  const E_x2 = thetaMinusX0 ** 2 * gamma(1 + 2 / b)
  const sigma_x = Math.sqrt(E_x2 - (thetaMinusX0 * gamma(1 + 1 / b)) ** 2)
  const x_at_R = x0 + thetaMinusX0 * Math.pow(Math.log(1 / R_target), 1 / b)
  const x_median = x0 + thetaMinusX0 * Math.pow(Math.log(2), 1 / b)

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Distribución Weibull</h3>
      <p className="text-sm mb-4 opacity-70">
        Usado en vida de cojinetes: x = L/L₁₀. R(x) = exp[-((x-x₀)/(θ-x₀))^b]
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs mb-1">x₀ — Vida mínima garantizada</label>
          <input type="number" step="0.001" min="0" value={x0} onChange={e => setX0(Number(e.target.value))}
            className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">θ — Parámetro de escala</label>
          <input type="number" step="0.01" min="0.01" value={theta} onChange={e => setTheta(Number(e.target.value))}
            className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">b — Parámetro de forma</label>
          <input type="number" step="0.01" min="0.1" value={b} onChange={e => setB(Number(e.target.value))}
            className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">R — Confiabilidad objetivo</label>
          <input type="range" min="0.01" max="0.999" step="0.01" value={R_target} onChange={e => setR_target(Number(e.target.value))} className="w-full mt-2" />
          <div className="text-sm font-mono text-center">{(R_target * 100).toFixed(0)} %</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ['μ_x — Vida media', mu_x.toFixed(4), 'Γ(1+1/b)'],
          ['σ_x — Desviación estándar', sigma_x.toFixed(4), ''],
          ['Mediana (R=50%)', x_median.toFixed(4), 'x₀+(θ-x₀)·[ln2]^(1/b)'],
          [`x para R=${(R_target*100).toFixed(0)}%`, x_at_R.toFixed(4), `x₀+(θ-x₀)·[ln(1/R)]^(1/b)`],
          ['b = 1 → Exponencial', b === 1 ? '✓' : b.toFixed(2), 'b≈3.4 → ≈Normal'],
          ['R(θ) en θ', '36.8 %', '63.2% < θ (siempre)'],
        ].map(([lbl, val, sub]) => (
          <div key={lbl} className="p-3 rounded-lg" style={{ background: 'var(--bg-3)' }}>
            <div className="text-xs opacity-60">{lbl}</div>
            <div className="text-xl font-mono font-bold" style={{ color: accent }}>{val}</div>
            <div className="text-xs opacity-60">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const problems = [
  { n: '20-1', e: 'Las resistencias tensiles finales de 10 piezas de acero 1040 HR (en kpsi) son: 68, 72, 71, 70, 68, 74, 75, 69, 71, 73. Calcule: (a) media x̄, (b) variancia s², (c) desviación estándar sx, (d) coeficiente de variación Cx.' },
  { n: '20-2', e: 'Suponga que la resistencia tensil del problema anterior sigue una distribución normal. ¿Qué porcentaje de piezas se espera que tenga Sut < 68 kpsi? ¿Cuántas de 1000 piezas serán defectuosas si el límite inferior de especificación es 65 kpsi?' },
  { n: '20-3', e: 'La vida en fatiga de un componente se distribuye lognormalmente con μx = 50 000 ciclos y Cx = 0.08. Calcule: (a) parámetros μy y σy de la distribución secundaria, (b) P(vida < 40 000 ciclos), (c) P(vida > 70 000 ciclos).' },
  { n: '20-4', e: 'Los parámetros Weibull de una familia de cojinetes son: x₀ = 0, θ = 6.84, b = 1.17. Calcule: (a) vida media μx (en múltiplos de L₁₀), (b) vida mediana (L₅₀), (c) vida con R = 99% (L₁).' },
  { n: '20-5', e: 'El par de torsión T = F·r donde F = N(450, 20) lbf y r = N(3.0, 0.05) pulg son independientes. Usando propagación del error: (a) calcule μT y CT, (b) si T está normalmente distribuido, ¿cuál es P(T > 1450 lbf·in)?' },
  { n: '20-6', e: 'Un lote A tiene Sut̄ = 720 MPa, σ = 30 MPa (n=15). Un lote B tiene Sut̄ = 700 MPa, σ = 25 MPa (n=12). Realice una prueba t de dos muestras para determinar si la diferencia es significativa con α = 0.05.' },
  { n: '20-7', e: 'Un ensamble consta de 3 partes en serie con tolerancias ±0.1, ±0.15 y ±0.2 mm. Calcule la tolerancia total por: (a) peor caso (WC), (b) raíz cuadrática (RSS). ¿Qué método usaría para producción en masa?' },
]

function PracticaContent() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <StatCalc />
      <WeibullCalc />
      {problems.map(p => (
        <div key={p.n} className="rounded-xl border" style={{ borderColor: 'var(--border)' }}>
          <button
            className="w-full text-left px-5 py-4 font-bold flex justify-between items-center"
            style={{ color: accent }}
            onClick={() => setOpen(open === p.n ? null : p.n)}
          >
            <span>Problema {p.n}</span>
            <span className="text-lg">{open === p.n ? '▲' : '▼'}</span>
          </button>
          {open === p.n && (
            <div className="px-5 pb-5 text-sm leading-relaxed" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="mt-3">{p.e}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const sections = [
  { id: 'intro', label: 'Introducción' },
  { id: 'variables', label: '20-1 Distribuciones de prob.' },
  { id: 'estadisticas', label: 'Media y desv. estándar' },
  { id: 'distribuciones', label: 'Distribuciones' },
  { id: 'normal', label: 'Dist. normal' },
  { id: 'explorador', label: 'NormalDistributionExplorer' },
  { id: 'lognormal', label: 'Dist. lognormal' },
  { id: 'uniform', label: 'Dist. uniforme' },
  { id: 'weibull', label: 'Dist. Weibull' },
  { id: 'confiabilidad', label: '20-2 Confiabilidad' },
  { id: 'propagacion', label: 'Propagación del error' },
  { id: 'regresion', label: '20-3 Regresión lineal' },
  { id: 'hipotesis', label: '20-4 Pruebas de hipótesis' },
  { id: 'anova', label: '20-5 ANOVA' },
  { id: 'tolerancias', label: '20-6 Tolerancias' },
  { id: 'aplicaciones', label: '20-7 a 20-10 Aplicaciones' },
]

export default function Cap20Page() {
  return (
    <ChapterShell
      chapterId={20}
      chapterNum="20"
      title="Consideraciones estadísticas"
      subtitle="Distribuciones de probabilidad, confiabilidad, regresión lineal, pruebas de hipótesis, ANOVA y análisis de tolerancias en diseño mecánico."
      partNum={4}
      sections={sections}
      practica={<PracticaContent />}
    >
      <section id="intro">
        <SectionTitle id="intro">Introducción</SectionTitle>
        <p className="mb-4">
          En el diseño mecánico, la estadística proporciona un método para tratar con características
          cuyos valores son <strong>variables</strong>: resistencias de materiales, dimensiones fabricadas,
          cargas de operación. Las consistencias en la naturaleza son estables no en magnitud, sino en el
          patrón de variación.
        </p>
        <ConceptBlock title="¿Por qué estadística en diseño mecánico?">
          <ul className="list-disc list-inside space-y-1">
            <li>Los productos fabricados en masa tienen vidas variables</li>
            <li>Los métodos de control de calidad se basan en estadística</li>
            <li>Las resistencias de materiales, cargas y dimensiones tienen distribuciones estadísticas</li>
            <li>La confiabilidad y la vida deben expresarse numéricamente para obtener metas de calidad</li>
          </ul>
        </ConceptBlock>
      </section>

      <section id="variables">
        <SectionTitle id="variables">20-1 Distribuciones de Probabilidad</SectionTitle>
        <PreguntaBox>¿Por qué no todas las piezas fabricadas son idénticas?</PreguntaBox>
        <p className="mb-4">
          La variabilidad es inherente a todo proceso de manufactura: variaciones en materiales,
          tolerancias de maquinado, tratamientos térmicos no uniformes. La <strong>distribución normal</strong>
          es el modelo más común para describir esta variabilidad.
        </p>
        <ConceptBlock title="Variables aleatorias y espacio muestral">
          Una <strong>variable aleatoria</strong> es una cantidad variable (resistencia, dimensión, peso) cuyo valor depende
          del resultado de un experimento aleatorio. Por ejemplo, al lanzar dos dados, la suma x puede valer
          de 2 a 12. La <strong>función de densidad de probabilidad</strong> (FDP) f(x) da la probabilidad de cada valor,
          y la <strong>función de densidad acumulativa</strong> (FDA) F(x) = Σ f(xⱼ) para xⱼ ≤ xᵢ da la probabilidad de
          que la variable sea menor o igual a un valor dado.
        </ConceptBlock>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-center">x (suma)</th>
                {['2','3','4','5','6','7','8','9','10','11','12'].map(v => (
                  <td key={v} className="border p-1 text-center font-mono text-xs">{v}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-xs font-medium">f(x) — FDP</td>
                {['1/36','2/36','3/36','4/36','5/36','6/36','5/36','4/36','3/36','2/36','1/36'].map(v => (
                  <td key={v} className="border p-1 text-center font-mono text-xs">{v}</td>
                ))}
              </tr>
              <tr style={{ background: 'var(--bg-2)' }}>
                <td className="border p-2 text-xs font-medium">F(x) — FDA</td>
                {['1/36','3/36','6/36','10/36','15/36','21/36','26/36','30/36','33/36','35/36','36/36'].map(v => (
                  <td key={v} className="border p-1 text-center font-mono text-xs">{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="text-xs opacity-70 mt-1"><strong>Tabla 20-1 y 20-2</strong> — Ejemplo de dos dados: FDP y FDA de la suma.</p>
        </div>
        <p className="mb-4">
          Para una variable aleatoria <strong>continua</strong>, la FDA se integra: F(x) = ∫₋∞ˣ f(x)dx,
          donde f(x) es la densidad de probabilidad. El área total bajo f(x) es 1 (ec. 20-3).
        </p>
        <FormulaGlosa
          formula="f(x) = 1/(σ√2π) · exp[-½((x-μ)/σ)²]"
          glosa={[
            { sym: 'μ', desc: 'Media de la población (centro de la campana)' },
            { sym: 'σ', desc: 'Desviación estándar (dispersión de los datos)' },
            { sym: 'z = (x-μ)/σ', desc: 'Variable normal estándar ~ N(0,1)' },
          ]}
        />
        <MiniEjemplo>
          <strong>Regla 68-95-99.7:</strong> En una distribución normal, el 68% de los datos están dentro de μ±σ,
          el 95% dentro de μ±2σ, y el 99.7% dentro de μ±3σ. Por ejemplo, si Sut = N(70, 5) kpsi,
          entonces el 95% de las piezas tienen Sut entre 60 y 80 kpsi.
        </MiniEjemplo>
      </section>

      <section id="estadisticas">
        <SectionTitle id="estadisticas">Media, Variancia y Desviación Estándar</SectionTitle>
        <FormulaBox>
          <div>Media aritmética: x̄ = (1/N) Σᵢ xᵢ &nbsp;&nbsp;&nbsp; [ec. (20-5)]</div>
          <div className="mt-2">Variancia: s²x = Σ(xᵢ − x̄)² / (N−1) &nbsp;&nbsp;&nbsp; [ec. (20-6)]</div>
          <div className="mt-2">Desviación estándar: sx = √s²x &nbsp;&nbsp;&nbsp; [ec. (20-7)]</div>
          <div className="mt-2">Forma alternativa: sx = √[Σxᵢ² − (Σxᵢ)²/N] / (N−1) &nbsp;&nbsp;&nbsp; [ec. (20-8)]</div>
          <div className="mt-2">Para datos agrupados: x̄ = (1/N) Σfᵢxᵢ &nbsp;&nbsp;&nbsp; [ec. (20-9)]</div>
          <div className="mt-2">Coeficiente de variación: Cx = sx/x̄ &nbsp;&nbsp;&nbsp; [ec. (20-12)]</div>
        </FormulaBox>
        <ConceptBlock title="Notación de variantes">
          Una variable estocástica se expresa como: x = X(x̄, sx) = x̄·X(1, Cx)<br />
          donde X representa una función de distribución de probabilidad. Las cantidades determinísticas
          x̄, sx y Cx se escriben en fuente cursiva normal. La notaciónLN(μx, σx) indica lognormal; W(x₀, θ, b) indica Weibull.
        </ConceptBlock>
        <MiniEjemplo>
          <strong>Ejemplo 20-1 — Varillas de acero 1030:</strong> Nueve piezas de prueba tensil producen los datos
          (kpsi): 62.8, 64.4, 65.8, 66.3, 68.1, 69.1, 69.8, 71.5, 74.0. Σxᵢ = 611.8, Σxᵢ² = 41 689.24.<br />
          x̄ = 611.8/9 = <strong>67.98 kpsi</strong><br />
          sx = √[(41689.24 − 611.8²/9)/(9−1)] = <strong>3.543 kpsi</strong><br />
          Cx = 3.543/67.98 = <strong>0.0521</strong><br />
          Estos tres valores son estimaciones de los parámetros estadísticos de la población completa
          y son independientes de la distribución.
        </MiniEjemplo>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-right" style={{ borderColor: 'var(--border)' }}>Sut (kpsi)</th>
                <th className="border p-2 text-right" style={{ borderColor: 'var(--border)' }}>x</th>
                <th className="border p-2 text-right" style={{ borderColor: 'var(--border)' }}>x²</th>
              </tr>
            </thead>
            <tbody>
              {[62.8, 64.4, 65.8, 66.3, 68.1, 69.1, 69.8, 71.5, 74.0].map(v => (
                <tr key={v} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="border p-2 text-right font-mono" style={{ borderColor: 'var(--border)' }}>{v}</td>
                  <td className="border p-2 text-right font-mono" style={{ borderColor: 'var(--border)' }}>{v}</td>
                  <td className="border p-2 text-right font-mono" style={{ borderColor: 'var(--border)' }}>{(v * v).toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ background: 'var(--bg-2)', fontWeight: 'bold' }}>
                <td className="border p-2 text-right" style={{ borderColor: 'var(--border)' }}>Σ</td>
                <td className="border p-2 text-right font-mono" style={{ borderColor: 'var(--border)' }}>611.8</td>
                <td className="border p-2 text-right font-mono" style={{ borderColor: 'var(--border)' }}>41 689.24</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm opacity-70 mb-4">
          x̄ = 611.8/9 = 67.98 kpsi; sx = √[(41689.24 − 611.8²/9)/(9−1)] = 3.543 kpsi; Cx = 0.0521
        </p>
      </section>

      <section id="distribuciones">
        <SectionTitle id="distribuciones">Distribuciones de Probabilidad</SectionTitle>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">Distribución</th>
                <th className="border p-2 text-left">Notación</th>
                <th className="border p-2 text-left">Uso típico</th>
                <th className="border p-2 text-left">Parámetros</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Normal (Gaussiana)', 'N(μ, σ)', 'Resistencias de materiales, dimensiones', 'μ (media), σ (desv. estándar)'],
                ['Lognormal', 'LN(μ, σ)', 'Vida en fatiga, desgaste de cojinetes', 'μx, σx (de la variable madre)'],
                ['Uniforme', 'U(a, b)', 'Desgaste de herramienta, tolerancias uniformes', 'a (mín), b (máx)'],
                ['Weibull', 'W(x₀, θ, b)', 'Vida de cojinetes, confiabilidad de sistemas', 'x₀ (mín), θ (escala), b (forma)'],
              ].map(([dist, nota, uso, params]) => (
                <tr key={dist} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="border p-2 font-medium">{dist}</td>
                  <td className="border p-2 font-mono">{nota}</td>
                  <td className="border p-2 text-xs">{uso}</td>
                  <td className="border p-2 text-xs">{params}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="normal">
        <SectionTitle id="normal">Distribución Normal (Gaussiana)</SectionTitle>
        <FormulaBox>
          <div>f(x) = 1/(σ√2π) · exp[-½((x-μ)/σ)²] &nbsp;&nbsp;&nbsp; [ec. (20-14)]</div>
          <div className="mt-2">Variable transformada: z = (x - μx) / σx &nbsp;&nbsp;&nbsp; [ec. (20-16)]</div>
          <div className="mt-2">z ~ N(0, 1) — distribución normal estándar</div>
          <div className="mt-2">Φ(z) = P(X &lt; x) = F(z) — tabulada en Tabla A-10</div>
        </FormulaBox>
        <ConceptBlock title="Ejemplo 20-3: Varillas de conexión">
          250 varillas, Sut promedio = 45 kpsi, σ = 5 kpsi.<br />
          P(X &lt; 39.5) → z = (39.5−45)/5 = −1.10 → Φ(−1.10) = 0.1357 → 34 varillas<br />
          P(X &lt; 59.5) → z = (59.5−45)/5 = 2.90 → Φ(2.90) = 0.9981<br />
          P(39.5 &lt; X &lt; 59.5) = 0.9981 − 0.1357 = 0.8624 → 216 varillas
        </ConceptBlock>
      </section>

      <section id="explorador">
        <SectionTitle id="explorador">Explorador Interactivo — NormalDistributionExplorer</SectionTitle>
        <BellCurveSVG />
        <NormalDistributionExplorer />
      </section>

<section id="lognormal">
        <SectionTitle id="lognormal">Distribución Lognormal</SectionTitle>
        <p className="mb-4">
          Se usa cuando la distribución es <strong>asimétrica</strong> y la variable solo puede
          tomar valores positivos (vida en fatiga, vida de desgaste).
        </p>
        <FormulaGlosa
          formula="Si x ~ LN(μx, σx), entonces y = ln(x) ~ N(μy, σy)"
          glosa={[
            { sym: 'μy', desc: 'Media de la variable transformada: ln(μx) − ½Cx² (aprox.)' },
            { sym: 'σy', desc: 'Desviación estándar transformada: √[ln(1+Cx²)] ≈ Cx' },
            { sym: 'g(x)', desc: 'FDP lognormal: 1/(x·σy·√2π) · exp[−½((ln x − μy)/σy)²]' },
          ]}
        />
        <ConceptBlock title="Ejemplo 20-5: Acero 1020">
          Para 1000 piezas de acero 1020: x̄ = 63.625 kpsi, s = 2.594 kpsi.<br />
          μy = ln(63.625) − ½(0.0408)² = 4.1522, σy = √ln(1+0.0408²) = 0.0408.<br />
          La distribución lognormal da g(63.625) = 0.1537, casi idéntica a la normal f(63.625) = 0.1538.
          <strong>Fig 20-8:</strong> El histograma de 1000 piezas muestra que ambas distribuciones (normal y lognormal)
          se ajustan muy bien a los datos de resistencia tensil — para Cx = 0.04, la diferencia es mínima.
        </ConceptBlock>
      </section>

      <section id="uniform">
        <SectionTitle id="uniform">Distribución Uniforme</SectionTitle>
        <p className="mb-4">
          La distribución <strong>uniforme U(a, b)</strong> modela variables donde cualquier valor entre a y b
          es igualmente probable. Se usa para tolerancias de manufactura y desgaste de herramienta.
        </p>
        <FormulaGlosa
          formula="f(x) = 1/(b−a) para a ≤ x ≤ b; F(x) = (x−a)/(b−a)"
          glosa={[
            { sym: 'a', desc: 'Límite inferior de la distribución' },
            { sym: 'b', desc: 'Límite superior de la distribución' },
            { sym: 'μx', desc: 'Media: (a + b)/2' },
            { sym: 'σx', desc: 'Desviación estándar: (b − a)/(2√3)' },
          ]}
        />
        <MiniEjemplo>
          <strong>Ejemplo:</strong> Un proceso de manufactura produce ejes con diámetro d = U(24.95, 25.05) mm.<br />
          μ_d = (24.95 + 25.05)/2 = 25.00 mm<br />
          σ_d = (25.05 − 24.95)/(2√3) = 0.0289 mm<br />
          C_d = 0.0289/25.00 = 0.00116 (muy bajo — la distribución es plana, no concentrada).
        </MiniEjemplo>
      </section>

      <section id="weibull">
        <SectionTitle id="weibull">Distribución Weibull</SectionTitle>
        <FormulaBox>
          <div>R(x) = exp[-((x−x₀)/(θ−x₀))^b] &nbsp;&nbsp;&nbsp; para x ≥ x₀ ≥ 0 [ec. (20-24)]</div>
          <div className="mt-2">Parámetros: x₀ = valor mínimo garantizado; θ = escala (&gt;x₀); b = forma (&gt;0)</div>
          <div className="mt-2">x para R dada: x = x₀ + (θ−x₀)·[ln(1/R)]^(1/b) &nbsp;&nbsp;&nbsp; [ec. (20-26)]</div>
          <div className="mt-2">μx = x₀ + (θ−x₀)·Γ(1+1/b) &nbsp;&nbsp;&nbsp; [ec. (20-28)]</div>
          <div className="mt-2">R(θ) = e⁻¹ = 36.8% → 63.2% de observaciones &lt; θ siempre</div>
        </FormulaBox>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">b (parámetro de forma)</th>
                <th className="border p-2 text-left">Distribución equivalente</th>
                <th className="border p-2 text-left">Sesgo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['b = 1', 'Exponencial', 'Monotónico decreciente'],
                ['b ≈ 3.3–3.5', '≈ Normal', 'Simétrica'],
                ['b &gt; 1', 'Unimodal', 'Sesgo variable'],
                ['b &lt; 1', 'Cóncava', 'Fallas tempranas (inf. de mortalidad)'],
              ].map(([bv, eq, sesgo]) => (
                <tr key={bv} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <td className="border p-2 font-mono">{bv}</td>
                  <td className="border p-2">{eq}</td>
                  <td className="border p-2 text-xs">{sesgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="confiabilidad">
        <SectionTitle id="confiabilidad">20-2 Confiabilidad</SectionTitle>
        <PreguntaBox>¿Qué probabilidad hay de que un componente no falle?</PreguntaBox>
        <p className="mb-4">
          La <strong>confiabilidad R</strong> se define como la probabilidad de que la resistencia del componente
          supere al esfuerzo aplicado. Si tanto el esfuerzo s como la resistencia S siguen distribuciones normales:
        </p>
        <FormulaGlosa
          formula="R = P(S > s) = Φ(z)  donde z = (μ_S − μ_s) / √(σ_S² + σ_s²)"
          glosa={[
            { sym: 'μ_S', desc: 'Resistencia media del material' },
            { sym: 'μ_s', desc: 'Esfuerzo medio aplicado' },
            { sym: 'σ_S, σ_s', desc: 'Desviaciones estándar de resistencia y esfuerzo' },
            { sym: 'Φ(z)', desc: 'FDA normal estándar (Tabla A-10)' },
          ]}
        />
        <MiniEjemplo>
          <strong>Ejemplo:</strong> Sy = 400 MPa (σ_S = 30), σ_apl = 300 MPa (σ_s = 25).<br />
          z = (400 − 300) / √(30² + 25²) = 100 / 39.05 = 2.56 → R = Φ(2.56) = 0.9948 = 99.48%.<br />
          Esto significa que 52 de cada 10 000 piezas se espera que fallen.
        </MiniEjemplo>
        <ReliabilityCalculator />
      </section>

<section id="propagacion">
        <SectionTitle id="propagacion">20-4 Propagación del Error</SectionTitle>
        <p className="mb-4">
          Cuando una variable z depende de otras variables estocásticas x, y, etc., la media y la desviación estándar
          de z se pueden estimar a partir de las de las variables independientes. La <strong>Tabla 20-6</strong> del libro resume todas las operaciones:
        </p>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">Operación</th>
                <th className="border p-2 text-left">Media μz</th>
                <th className="border p-2 text-left">Desviación estándar σz</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Constante a', 'a', '0'],
                ['Variable x', 'μx', 'σx'],
                ['x + a', 'μx + a', 'σx'],
                ['a·x', 'a·μx', '|a|·σx'],
                ['x + y', 'μx + μy', '√(σx² + σy²)'],
                ['x − y', 'μx − μy', '√(σx² + σy²)'],
                ['x·y', 'μx·μy', 'μx·μy·√(Cx² + Cy²)'],
                ['x/y', 'μx/μy', '(μx/μy)·√(Cx² + Cy²)/(1 + Cy²)'],
                ['xⁿ', 'μxⁿ', '|n|·μxⁿ·Cx'],
                ['1/x', '1/μx', 'Cx/μx'],
                ['1/x²', '1/μx²', '2Cx/μx²'],
                ['1/x³', '1/μx³', '3Cx/μx³'],
                ['1/x⁴', '1/μx⁴', '4Cx/μx⁴'],
                ['√x', '√μx', 'Cx·√μx/2'],
                ['x²', 'μx²(1 + Cx²)', '2μx²·Cx'],
              ].map(([op, mu, sigma]) => (
                <tr key={op} className="border-b">
                  <td className="border p-2 font-mono text-xs">{op}</td>
                  <td className="border p-2 text-xs">{mu}</td>
                  <td className="border p-2 text-xs">{sigma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs opacity-70 mb-4"><strong>Tabla 20-6</strong> — Medias y desviaciones estándar para operaciones algebraicas de variables aleatorias independientes. Cx = σx/μx es el coeficiente de variación.</p>
        <ConceptBlock title="Ejemplo: Propagación en momento de inercia">
          d = LN(2.000, 0.002) pulg → Cd = 0.002/2.000 = 0.001<br />
          I = πd⁴/64 → CI ≈ 4·Cd = 0.004<br />
          μI ≈ π·(2.000)⁴/64 = 0.7854 pulg⁴<br />
          σI ≈ CI·μI = 0.004·0.7854 = 0.00314 pulg⁴
        </ConceptBlock>
      </section>

      <section id="regresion">
        <SectionTitle id="regresion">20-3 Regresión Lineal</SectionTitle>
        <PreguntaBox>¿Cómo obtener una ecuación a partir de datos experimentales?</PreguntaBox>
        <p className="mb-4">
          La regresión por <strong>mínimos cuadrados</strong> encuentra la recta y = a + bx que minimiza
          la suma de los cuadrados de los residuos (diferencias entre datos reales y predichos).
        </p>
        <FormulaGlosa
          formula="b = [NΣxy − (Σx)(Σy)] / [NΣx² − (Σx)²];  a = ȳ − b·x̄"
          glosa={[
            { sym: 'b', desc: 'Pendiente de la recta de regresión' },
            { sym: 'a', desc: 'Intercepto con el eje y' },
            { sym: 'R²', desc: 'Coeficiente de determinación (0=R²=1, calidad del ajuste)' },
            { sym: 'r', desc: 'Coeficiente de correlación (r = +1 → correlación perfecta)' },
          ]}
        />
        <RegressionSVG />
        <LinearRegressionTool />
        <FormulaBox>
          <div className="font-bold mb-2">Ecuaciones adicionales de regresión:</div>
          <div>Desv. estándar residual: s_yx = √[(Σy² − b·Σy − m·Σxy) / (N−2)] &nbsp;&nbsp; [ec. (20-37)]</div>
          <div className="mt-2">Desv. estándar de la pendiente: s_m = s_yx / √Σ(xi − x̄)² &nbsp;&nbsp; [ec. (20-35)]</div>
          <div className="mt-2">Desv. estándar del intercepto: s_b = s_yx·√(1/N + x̄²/Σ(xi − x̄)²) &nbsp;&nbsp; [ec. (20-36)]</div>
        </FormulaBox>
        <MiniEjemplo>
          <strong>Ejemplo 20-8 — Módulo de Young por regresión:</strong> Se miden 5 puntos de esfuerzo-deformación de acero al carbono. La regresión lineal da E = m̂ = 31.03×10⁶ psi (pendiente), b̂ = −254.69 psi (intercepto). El coeficiente de correlación r = 0.998 demuestra un ajuste excelente. La desviación estándar residual s_yx = 811.1 psi, y la desviación estándar de E es s_E = 1.086×10⁶ psi.
        </MiniEjemplo>
        <OjoAqui>
          Una R² alta no significa que el modelo lineal sea correcto, solo que los datos se correlacionan bien.
          Siempre grafica los residuos: si muestran patrón (forma de U, por ejemplo), el modelo lineal no es adecuado
          y necesitas transformación logarítmica o un modelo no lineal.
        </OjoAqui>
      </section>

      <section id="hipotesis">
        <SectionTitle id="hipotesis">20-4 Pruebas de Hipótesis</SectionTitle>
        <PreguntaBox>¿Dos lotes de producción son significativamente diferentes?</PreguntaBox>
        <p className="mb-4">
          Una <strong>prueba de hipótesis</strong> determina si la diferencia entre dos grupos de datos
          es estadísticamente significativa o simplemente debida al azar.
        </p>
        <FormulaGlosa
          formula="t = (x̄₁ − x̄₂) / √(s_p²·(1/n₁ + 1/n₂))"
          glosa={[
            { sym: 'x̄₁, x̄₂', desc: 'Medias de las muestras 1 y 2' },
            { sym: 's_p²', desc: 'Variancia combinada: [(n₁−1)s₁² + (n₂−1)s₂²] / (n₁+n₂−2)' },
            { sym: 'n₁, n₂', desc: 'Tamaños de muestra' },
            { sym: 'p-value', desc: 'Probabilidad de observar la diferencia si H₀ es cierta; si p < α, rechazar H₀' },
          ]}
        />
        <MiniEjemplo>
          <strong>Ejemplo:</strong> Lote A: Sut̄ = 720 MPa, s = 30, n = 15. Lote B: Sut̄ = 700 MPa, s = 25, n = 12.<br />
          s_p² = [(14·30² + 11·25²) / 25] = 779 → t = (720−700) / √(779·(1/15+1/12)) = 20/10.95 = 1.83.<br />
          Con 25 GL y α=0.05 (dos colas), t_crítico = 2.06. Como 1.83 &lt; 2.06, NO podemos concluir que los lotes sean significativamente diferentes.
        </MiniEjemplo>
        <OjoAqui>
          No confundir "significancia estadística" con "significancia práctica". Un resultado puede ser
          estadísticamente significativo (p &lt; 0.05) pero la diferencia puede ser tan pequeña que no importa
          en la práctica. Siempre considera la magnitud del efecto, no solo el p-value.
        </OjoAqui>
      </section>

      <section id="anova">
        <SectionTitle id="anova">20-5 ANOVA (Análisis de Variancia)</SectionTitle>
        <PreguntaBox>¿Cómo comparar más de dos grupos simultáneamente?</PreguntaBox>
        <p className="mb-4">
          El ANOVA de un factor (one-way ANOVA) compara las medias de <strong>tres o más grupos</strong>
          para determinar si al menos uno difiere significativamente de los demás.
        </p>
        <FormulaGlosa
          formula="F = MS_entre / MS_dentro"
          glosa={[
            { sym: 'MS_entre', desc: 'Variancia entre grupos (variación explicada por el factor)' },
            { sym: 'MS_dentro', desc: 'Variancia dentro de grupos (variación residual / error)' },
            { sym: 'p-value', desc: 'Si p < α, al menos un grupo difiere significativamente' },
          ]}
        />
        <ConceptBlock title="Ejemplo: Resistencia a 3 temperaturas de tratamiento">
          <div className="text-sm mb-2">T₁ = 200°C: 410, 420, 415, 418, 412 MPa</div>
          <div className="text-sm mb-2">T₂ = 300°C: 380, 385, 378, 382, 375 MPa</div>
          <div className="text-sm mb-2">T₃ = 400°C: 350, 355, 348, 352, 345 MPa</div>
          <div className="mt-2">Si F &gt; F_crítico y p &lt; 0.05, concluimos que la temperatura afecta significativamente la resistencia. Un análisis post-hoc (Tukey) determinaría qué pares son diferentes.</div>
        </ConceptBlock>
        <OjoAqui>
          El ANOVA solo indica si hay diferencias, no dónde están. Después de un ANOVA significativo,
          se requieren pruebas post-hoc (Tukey, Bonferroni) para identificar qué grupos difieren entre sí.
          No hagas comparaciones múltiples por pares con t-tests (infla el error tipo I).
        </OjoAqui>
      </section>

      <section id="tolerancias">
        <SectionTitle id="tolerancias">20-6 Análisis de Tolerancias</SectionTitle>
        <PreguntaBox>¿Cómo se acumulan las tolerancias en un ensamble?</PreguntaBox>
        <p className="mb-4">
          En un ensamble de múltiples componentes, las tolerancias individuales se acumulan.
          Existen dos métodos principales para calcular la tolerancia total:
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <ConceptBlock title="Peor caso (WC)">
            <div className="font-mono text-sm">T_total = Σ|T_i|</div>
            <div className="text-xs mt-2">Supone que todas las piezas están en el extremo de su tolerancia simultáneamente. Conservador, but costoso (mayor rechazo). Ej: 3 partes ±0.1 → T_total = ±0.3 mm.</div>
          </ConceptBlock>
          <ConceptBlock title="Raíz cuadrática (RSS)">
            <div className="font-mono text-sm">T_total = √(ΣT_i²)</div>
            <div className="text-xs mt-2">Asume independencia estadística. Más realista para producción en masa. Ej: 3 partes ±0.1 → T_total = √(0.01+0.01+0.01) = ±0.173 mm.</div>
          </ConceptBlock>
        </div>
        <MiniEjemplo>
          <strong>Ensamble de 3 partes</strong> con tolerancias: parte A = ±0.1, B = ±0.15, C = ±0.2 mm.<br />
          WC: T_total = 0.1 + 0.15 + 0.2 = ±0.45 mm (si la holgura especificada es ±0.35, hay interferencia garantizada).<br />
          RSS: T_total = √(0.01 + 0.0225 + 0.04) = √0.0725 = ±0.269 mm (dentro de especificación).<br />
          Para producción en masa, RSS es más apropiado porque la probabilidad de que las 3 partes estén en su límite simultáneamente es muy baja (0.27³ = 2%).
        </MiniEjemplo>
      </section>

      <section id="aplicaciones">
        <SectionTitle id="aplicaciones">20-7 a 20-10 Aplicaciones al Diseño</SectionTitle>
        <PreguntaBox>¿Cómo se aplica la estadística al diseño mecánico real?</PreguntaBox>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ConceptBlock title="Factor de seguridad basado en confiabilidad">
            En lugar de usar un factor de seguridad determinista (n = Sy/σ), se puede definir un factor de seguridad
            estadístico: n = μ_S / μ_s, y verificar que la confiabilidad R = Φ(z) sea aceptable (típicamente R ≥ 0.999
            para aplicaciones críticas). Esto permite cuantificar explícitamente el riesgo.
          </ConceptBlock>
          <ConceptBlock title="Selección de materiales con criterios estadísticos">
            Al seleccionar entre dos materiales, no basta comparar resistencias medias. Usa una prueba t para
            determinar si la diferencia es significativa. Considera también el coeficiente de variación Cx:
            un material con Sut mayor pero mayor variabilidad puede tener menor confiabilidad.
          </ConceptBlock>
          <ConceptBlock title="Control de calidad (SQC)">
            <strong>Gráficas de control X̄-R:</strong> monitorean la media y el rango de muestras periódicas.
            Si un punto cae fuera de los límites μ ± 3σ/√n, el proceso está fuera de control.
            <strong>Cp y Cpk:</strong> índices de capacidad de proceso. Cp = (LES − LEI) / 6σ.
            Cpk = min((μ-LEI)/3σ, (LES-μ)/3σ). Un proceso capaz tiene Cpk ≥ 1.33.
          </ConceptBlock>
          <ConceptBlock title="Confiabilidad de sistemas">
            Para un sistema en serie con n componentes independientes: R_total = Π R_i.<br />
            Para redundancia activa (paralelo): R_total = 1 − Π (1−R_i).<br />
            La redundancia mejora drásticamente la confiabilidad: 2 componentes con R=0.9 en paralelo
            dan R_total = 1 − (1−0.9)² = 0.99.
          </ConceptBlock>
        </div>
        <OjoAqui>
          El factor de seguridad determinista n = 2 no garantiza nada sobre la probabilidad de falla.
          Un diseño con n = 2 pero alta variabilidad en materiales o cargas podría tener R &lt; 0.9.
          El diseño basado en confiabilidad (RBD) es el estándar en industrias críticas (aeroespacial, automotriz).
        </OjoAqui>
      </section>

      <section id="calculadoras">
        <SectionTitle id="calculadoras">Calculadoras</SectionTitle>
        <StatCalc />
        <WeibullCalc />
      </section>
    </ChapterShell>
  )
}
