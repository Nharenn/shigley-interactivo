'use client'
import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#A78BFA'

function S1({ revealed }: { revealed: number }) {
  void revealed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      <Eyebrow>Parte 4 — Herramientas de análisis</Eyebrow>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
        Consideraciones<br />Estadísticas
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 20 — Variabilidad, distribuciones y confiabilidad</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['x̄ y sx', 'Normal z', 'Lognormal', 'Weibull', 'Propagación', 'Regresión'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  void revealed
  const rawData = [42, 47, 51, 45, 53, 48, 50, 46, 49, 52]
  const [data] = useState(rawData)
  const n = data.length
  const mean = data.reduce((a, b) => a + b, 0) / n
  const variance = data.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1)
  const sx = Math.sqrt(variance)
  const Cx = sx / mean
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Estadística descriptiva</Eyebrow>
      <h2 style={H2}>x̄, sx y Cx — los tres descriptores clave</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 12, marginBottom: 8 }}>// Muestra de resistencia (kpsi)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {data.map((d, i) => (
                <span key={i} style={{ background: `${C}22`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{d}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '12px 16px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}>x̄ = (1/n)·Σxᵢ</div>
            <div style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}>sx = √(Σ(xᵢ−x̄)² / (n−1))</div>
            <div style={{ fontFamily: 'var(--font-mono)' }}>Cx = sx / x̄ (coef. variación)</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="x̄ media" eq={`${mean.toFixed(2)} kpsi`} color={C} />
          <FormulaBox label="sx desv. est." eq={`${sx.toFixed(3)} kpsi`} color={C} />
          <FormulaBox label="Cx coef. variación" eq={`${(Cx * 100).toFixed(2)}%`} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            Cx típico en Sut: 0.05–0.08 (acero)<br />Cx típico en Sy: 0.07–0.10
          </div>
        </div>
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [mu, setMu] = useState(50)
  const [sigma, setSigma] = useState(5)
  const [x, setX] = useState(42)
  const z = (x - mu) / sigma
  const phi_z = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(z ** 2) / 2)
  const Phi = 0.5 * (1 + erf(z / Math.sqrt(2)))
  const R = 1 - Phi
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Distribución normal</Eyebrow>
      <h2 style={H2}>z = (x − μ) / σ</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>La variable z estandarizada permite usar la tabla Φ(z) para calcular probabilidades</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="μ media" unit="kpsi" value={mu} min={20} max={100} step={1} onChange={setMu} color={C} />
          <Slider label="σ desv. est." unit="kpsi" value={sigma} min={1} max={20} step={0.5} onChange={setSigma} color={C} />
          <Slider label="x valor" unit="kpsi" value={x} min={mu - 4 * sigma} max={mu + 4 * sigma} step={0.5} onChange={setX} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>z = ±1.28 → 80% central</div>
            <div>z = ±1.645 → 90% central</div>
            <div>z = ±1.96 → 95% central</div>
            <div>z = ±2.576 → 99% central</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="z score" eq={`${z.toFixed(3)}`} color={C} />
          <FormulaBox label="φ(z) densidad" eq={`${phi_z.toFixed(4)}`} color={C} />
          <FormulaBox label="Φ(z) prob. acum." eq={`${(Phi * 100).toFixed(2)}%`} color={C} />
          <FormulaBox label="R(x) confiab." eq={`${(R * 100).toFixed(3)}%`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [mu, setMu] = useState(50)
  const [Cx, setCx] = useState(0.08)
  const [x, setX] = useState(35)
  const sigmaY = Math.sqrt(Math.log(1 + Cx ** 2))
  const muY = Math.log(mu) - sigmaY ** 2 / 2
  const z = (Math.log(x) - muY) / sigmaY
  const Phi = 0.5 * (1 + erf(z / Math.sqrt(2)))
  const R = 1 - Phi
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Distribución lognormal</Eyebrow>
      <h2 style={H2}>μy ≈ ln(μx) − ½Cx² | σy ≈ Cx</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>Adecuada para variables positivas como resistencia, vida a fatiga, y cargas aleatorias no negativas</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="μx media" unit="kpsi" value={mu} min={10} max={200} step={1} onChange={setMu} color={C} />
          <Slider label="Cx coef. variación" unit="" value={Cx} min={0.01} max={0.30} step={0.005} onChange={setCx} color={C} />
          <Slider label="x valor consulta" unit="kpsi" value={x} min={1} max={mu * 2} step={1} onChange={setX} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>μy = {muY.toFixed(4)}</div>
            <div>σy = {sigmaY.toFixed(4)}</div>
            <div style={{ marginTop: 4 }}>Sesgo positivo → cola derecha — propiedad útil para modelar vida</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="z lognormal" eq={`${z.toFixed(3)}`} color={C} />
          <FormulaBox label="Φ(z)" eq={`${(Phi * 100).toFixed(2)}%`} color={C} />
          <FormulaBox label="Confiabilidad R" eq={`${(R * 100).toFixed(3)}%`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  void revealed
  const [x0, setX0] = useState(0)
  const [theta, setTheta] = useState(100)
  const [b, setB] = useState(2)
  const [x, setX] = useState(60)
  const arg = (x - x0) / (theta - x0)
  const R = arg > 0 ? Math.exp(-(arg ** b)) : 1
  const pdf = arg > 0 ? (b / (theta - x0)) * arg ** (b - 1) * Math.exp(-(arg ** b)) : 0
  const mean_w = x0 + (theta - x0) * gamma_fn(1 + 1 / b)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Distribución de Weibull</Eyebrow>
      <h2 style={H2}>R(x) = exp[−((x−x₀)/(θ−x₀))^b]</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="x₀ vida mín." unit="" value={x0} min={0} max={50} step={1} onChange={setX0} color={C} />
          <Slider label="θ vida caract." unit="" value={theta} min={10} max={500} step={5} onChange={setTheta} color={C} />
          <Slider label="b parámetro forma" unit="" value={b} min={0.5} max={5} step={0.1} onChange={setB} color={C} />
          <Slider label="x vida consulta" unit="" value={x} min={x0 + 1} max={theta * 2} step={1} onChange={setX} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>b&lt;1: mortalidad infantil</div>
            <div>b=1: tasa constante (exponencial)</div>
            <div>b=3.4: aprox. normal</div>
            <div>b&gt;3.5: desgaste por vejez</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="R(x)" eq={`${(R * 100).toFixed(3)}%`} color={C} />
          <FormulaBox label="f(x) densidad" eq={`${pdf.toFixed(5)}`} color={C} />
          <FormulaBox label="Vida media μW" eq={`${mean_w.toFixed(2)}`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  const items = [
    { label: 'Variables independientes', eq: 'σ²_y = Σ(∂f/∂xᵢ)²·σ²ᵢ', note: 'Propagación lineal de incertidumbre' },
    { label: 'Media del producto', eq: 'μ_y ≈ f(μ₁, μ₂, ...)', note: 'Evaluada en los valores medios' },
    { label: 'Suma X+Y', eq: 'μ=μX+μY, σ²=σX²+σY²', note: 'Independientes' },
    { label: 'Producto X·Y', eq: 'Cy² ≈ CX² + CY²', note: 'Cy = σ/μ coef. variación' },
    { label: 'Factor de seguridad Z=S/σ', eq: 'μZ = μS/μσ, CZ² ≈ CS²+Cσ²', note: 'Lognormal aproximado' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Propagación de incertidumbre</Eyebrow>
      <h2 style={H2}>σ²_y = Σ(∂f/∂xᵢ)²·σ²ᵢ</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', borderLeft: `3px solid ${C}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <code style={{ fontSize: 13, color: C }}>{it.eq}</code>
              <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{it.note}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const pts_raw = [[1, 2.2], [2, 4.1], [3, 5.8], [4, 8.0], [5, 9.9], [6, 12.1], [7, 14.0], [8, 15.8]]
  const n = pts_raw.length
  const sx_sum = pts_raw.reduce((s, [x]) => s + x, 0)
  const sy_sum = pts_raw.reduce((s, [, y]) => s + y, 0)
  const sxy = pts_raw.reduce((s, [x, y]) => s + x * y, 0)
  const sx2 = pts_raw.reduce((s, [x]) => s + x * x, 0)
  const b_slope = (n * sxy - sx_sum * sy_sum) / (n * sx2 - sx_sum ** 2)
  const a_int = (sy_sum - b_slope * sx_sum) / n
  const y_hat = pts_raw.map(([x]) => a_int + b_slope * x)
  const ss_res = pts_raw.reduce((s, [, y], i) => s + (y - y_hat[i]) ** 2, 0)
  const sy_mean = sy_sum / n
  const ss_tot = pts_raw.reduce((s, [, y]) => s + (y - sy_mean) ** 2, 0)
  const R2 = 1 - ss_res / ss_tot
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Regresión lineal</Eyebrow>
      <h2 style={H2}>ŷ = a + b·x → mínimos cuadrados</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 12, marginBottom: 8 }}>// Datos de ejemplo (vida vs carga)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {pts_raw.map(([x, y], i) => (
                <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>x={x} → y={y}</div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>b = (nΣxy − ΣxΣy) / (nΣx² − (Σx)²)</div>
            <div style={{ marginTop: 4 }}>a = (Σy − b·Σx) / n</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="pendiente b" eq={`${b_slope.toFixed(4)}`} color={C} />
          <FormulaBox label="intercepto a" eq={`${a_int.toFixed(4)}`} color={C} />
          <FormulaBox label="R² bondad" eq={`${R2.toFixed(4)}`} color={C} />
          <div style={{ background: R2 > 0.99 ? '#10B98122' : `${C}15`, border: `1px solid ${R2 > 0.99 ? '#10B981' : C}40`, borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 13 }}>
            {R2 > 0.99 ? '✓ R² > 0.99 — ajuste excelente' : R2 > 0.95 ? '✓ Buen ajuste lineal' : '⚠ Considerar modelo no lineal'}
          </div>
        </div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'La variabilidad es real — Sut de acero AISI 1040 varía ±15%; ignorarlo subestima el riesgo de fallo',
    'Normal: z = (x−μ)/σ → tabla Φ(z); aplica cuando la distribución es simétrica y bien centrada',
    'Lognormal: mejor para vida a fatiga y resistencia — siempre positiva, con cola derecha',
    'Weibull: la más flexible — b controla forma; ampliamente usada en rodamientos (ISO 281)',
    'Propagación: σ²_y = Σ(∂f/∂xᵢ)²·σ²ᵢ — permite calcular incertidumbre del factor de seguridad',
    'El diseño probabilístico NO reemplaza al determinístico: lo completa añadiendo nivel de confianza',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 20</Eyebrow>
      <h2 style={H2}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pts.map((p, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 14 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Cap 20: el diseño determinístico asume valores nominales — la estadística cuantifica qué tan probable es el fallo.', Content: S1 },
  { id: 2, title: 'Estadística descriptiva', note: 'Cx es el descriptor más útil: Cx < 0.05 indica variabilidad baja; Cx > 0.15 es preocupante.', Content: S2 },
  { id: 3, title: 'Distribución normal', note: 'Variar μ y σ: mostrar cómo la confiabilidad R cambia drásticamente cerca de z=0.', Content: S3 },
  { id: 4, title: 'Lognormal', note: 'Comparar R a x=35 kpsi con Normal vs Lognormal — resultados distintos, distintas hipótesis.', Content: S4 },
  { id: 5, title: 'Weibull', note: 'Demostrar la curva bañera: b<1 falla temprana, b≈1 aleatoria, b>3 desgaste. ISO 281 usa b=10/3.', Content: S5 },
  { id: 6, title: 'Propagación incertidumbre', note: 'El factor de seguridad Z=S/σ tiene su propia incertidumbre Cz² ≈ CS² + Cσ².', revealCount: 5, Content: S6 },
  { id: 7, title: 'Regresión lineal', note: 'R²=1 significa ajuste perfecto; R²>0.95 es aceptable para interpolación de datos de materiales.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Punto 6: el diseño estadístico complementa, no reemplaza. La mecánica sigue siendo la base.', revealCount: 6, Content: S8 },
]

export default function Cap20SlidesPage() {
  return <PresentationShell chapterId={20} partColor={C} slides={SLIDES} />
}

/* ─── Helpers ─── */
const H2: React.CSSProperties = { fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.025em', fontFamily: 'var(--font-mono)', marginBottom: 0, marginTop: 0, lineHeight: 1.15 }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>// {children}</div>
}

function FormulaBox({ label, eq, color }: { label: string; eq: string; color: string }) {
  return (
    <div style={{ background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 8, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color }}>{eq}</span>
    </div>
  )
}

function Slider({ label, unit, value, min, max, step, onChange, color }: { label: string; unit: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color }}>{value}{unit ? ` ${unit}` : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: color, width: '100%' }} />
    </div>
  )
}

function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x))
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))))
  const res = 1 - poly * Math.exp(-x * x)
  return x >= 0 ? res : -res
}

function gamma_fn(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma_fn(1 - z))
  const g = 7
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  let x = c[0]
  for (let i = 1; i < g + 2; i++) x += c[i] / (z - 1 + i)
  const t = z - 1 + g + 0.5
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z - 0.5) * Math.exp(-t) * x
}
