'use client'
import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'

function S1({ revealed }: { revealed: number }) {
  void revealed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      <Eyebrow>Parte 4 — Diseño de sistemas</Eyebrow>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
        Caso de Estudio:<br />Transmisión de Potencia
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 18 — Reductor de 2 etapas: integración de caps. 7–17</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['Proceso 10 pasos', 'Ejes DE-Goodman', 'Rodamientos C₁₀', 'Chaveteros', 'Anillos seeger'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  const steps = [
    'Especificaciones: potencia, rpm, relación i, vida',
    'Esquema cinemático: seleccionar tipo de reductor',
    'Análisis de engranes: módulo, dientes, AGMA',
    'Diseño de ejes: DE-Goodman, diámetros mínimos',
    'Selección de rodamientos: C₁₀, vida L₁₀',
    'Diseño de chaveteros: esfuerzo cortante y aplastamiento',
    'Anillos de retención: selección por catálogo',
    'Diseño de carcasa: rigidez, sello, lubricación',
    'Verificación de interferencias geométricas',
    'Documentación: planos, lista de materiales, costo',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Proceso de diseño</Eyebrow>
      <h2 style={H2}>10 pasos del reductor</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '8px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 12 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [hp, setHp] = useState(20)
  const [rpm1, setRpm1] = useState(1750)
  const n2 = 16
  const n3 = 72
  const n4 = 16
  const n5 = 72
  const i1 = n3 / n2
  const i2 = n5 / n4
  const iTotal = i1 * i2
  const rpm5 = rpm1 / iTotal
  const T1 = (hp * 550 * 12) / (2 * Math.PI * rpm1 / 60)
  const T5 = T1 * iTotal * 0.95
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Reductor de 2 etapas</Eyebrow>
      <h2 style={H2}>N₂=N₄=16, N₃=N₅=72 → ω₅=86.4 rpm</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="Potencia" unit="hp" value={hp} min={5} max={100} step={5} onChange={setHp} color={C} />
          <Slider label="rpm₁ entrada" unit="rpm" value={rpm1} min={900} max={3600} step={50} onChange={setRpm1} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div style={{ color: C, fontWeight: 600, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Dientes fijos del caso</div>
            <div>Etapa 1: N₂=16, N₃=72 → i₁={i1}:1</div>
            <div>Etapa 2: N₄=16, N₅=72 → i₂={i2}:1</div>
            <div style={{ marginTop: 4 }}>i_total = {iTotal}:1</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="rpm₅ salida" eq={`${rpm5.toFixed(1)} rpm`} color={C} />
          <FormulaBox label="T₁ entrada" eq={`${T1.toFixed(1)} lb·in`} color={C} />
          <FormulaBox label="T₅ salida (η=0.95)" eq={`${T5.toFixed(0)} lb·in`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [ma, setMa] = useState(2000)
  const [mm, setMm] = useState(500)
  const [ta, setTa] = useState(0)
  const [tm, setTm] = useState(800)
  const [se, setSe] = useState(30000)
  const [sut, setSut] = useState(80000)
  const goodman = ma / se + mm / sut
  const SF = goodman > 0 ? 1 / goodman : Infinity
  const VM = Math.sqrt(ma ** 2 + 0.75 * ta ** 2) + Math.sqrt(mm ** 2 + 0.75 * tm ** 2) / (sut / se)
  const d_est = ((32 / (Math.PI * se)) * (4 * ma ** 2 + 3 * ta ** 2) ** 0.5) ** (1 / 3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Diseño de eje — DE-Goodman</Eyebrow>
      <h2 style={H2}>1/n = Ma/Se + Mm/Sut</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Ma momento alt." unit="lb·in" value={ma} min={0} max={10000} step={100} onChange={setMa} color={C} />
          <Slider label="Mm momento med." unit="lb·in" value={mm} min={0} max={5000} step={100} onChange={setMm} color={C} />
          <Slider label="Ta torque alt." unit="lb·in" value={ta} min={0} max={5000} step={100} onChange={setTa} color={C} />
          <Slider label="Tm torque med." unit="lb·in" value={tm} min={0} max={5000} step={100} onChange={setTm} color={C} />
          <Slider label="Se endurance" unit="psi" value={se} min={10000} max={60000} step={500} onChange={setSe} color={C} />
          <Slider label="Sut ultimate" unit="psi" value={sut} min={40000} max={150000} step={1000} onChange={setSut} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="1/n Goodman" eq={`${goodman.toFixed(4)}`} color={C} />
          <FormulaBox label="SF = n" eq={`${SF.toFixed(2)}`} color={C} />
          <FormulaBox label="d mín. (aprox.)" eq={`${(d_est * 100).toFixed(3)} cm`} color={C} />
          <div style={{ background: SF < 1.5 ? '#EF444422' : SF > 3 ? `${C}15` : '#10B98122', border: `1px solid ${SF < 1.5 ? '#EF4444' : SF > 3 ? C : '#10B981'}`, borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 13 }}>
            {SF < 1.5 ? '⚠ SF < 1.5 — aumentar diámetro' : SF > 3 ? 'Sobrediseñado — reducir material' : '✓ SF en rango 1.5–3.0'}
          </div>
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  void revealed
  const [c10req, setC10req] = useState(25000)
  const [l10, setL10] = useState(10000)
  const [rpm, setRpm] = useState(500)
  const [a1, setA1] = useState(1.0)
  const Lrev = l10 * rpm * 60
  const Lmrev = Lrev / 1e6
  const C10 = c10req * (Lmrev / 1) ** (1 / 3)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Selección de rodamientos</Eyebrow>
      <h2 style={H2}>C₁₀ = P · (L₁₀/10⁶)^(1/a)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>a=3 bolas, a=10/3 rodillos. L₁₀ en millones de rev. Seleccionar catálogo con C ≥ C₁₀.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="P carga equiv." unit="N" value={c10req} min={1000} max={100000} step={500} onChange={setC10req} color={C} />
          <Slider label="Vida L₁₀" unit="h" value={l10} min={1000} max={50000} step={500} onChange={setL10} color={C} />
          <Slider label="n velocidad" unit="rpm" value={rpm} min={50} max={3000} step={50} onChange={setRpm} color={C} />
          <Slider label="a₁ confiab." unit="" value={a1} min={0.21} max={1.0} step={0.01} onChange={setA1} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="L₁₀ (Mrevoluciones)" eq={`${Lmrev.toFixed(2)} Mrev`} color={C} />
          <FormulaBox label="C₁₀ requerida" eq={`${(C10 / a1).toFixed(0)} N`} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>a₁ = 1.0 → confiabilidad 90%</div>
            <div>a₁ = 0.62 → confiabilidad 95%</div>
            <div>a₁ = 0.21 → confiabilidad 99%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  const items = [
    { comp: 'Chavetero rectangular', check: 'τ = F/(w·l) ≤ Ssy; σ = 2F/(h·l) ≤ Sy', note: 'l = longitud chaveta, w×h sección' },
    { comp: 'Anillo de retención (seeger)', check: 'Selección por catálogo: F_axial ≤ F_perm', note: 'Ranura normalizada — verificar esfuerzo en ranura' },
    { comp: 'Sello de aceite', check: 'Temperatura ≤ 90°C para NBR', note: 'Neopreno/NBR para aceite mineral; PTFE para sintético' },
    { comp: 'Tapones y venteo', check: 'Presión interna ≤ 0.5 bar (venteo)', note: 'Venteo evita presurización y fuga por sellos' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Detalles constructivos</Eyebrow>
      <h2 style={H2}>Chaveteros, anillos y sellos</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${C}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{it.comp}</div>
            <code style={{ fontSize: 13, color: 'var(--fg-1)' }}>{it.check}</code>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>{it.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const lubes = [
    { type: 'Aceite por salpicado', v: 'V ≤ 12 m/s', note: 'Estándar para reductores industriales' },
    { type: 'Aceite circulación forzada', v: 'V > 12 m/s', note: 'Con bomba, filtro y enfriador' },
    { type: 'Grasa', v: 'V ≤ 4 m/s', note: 'Rodamientos de baja velocidad' },
    { type: 'Aceite de niebla', v: 'Alta V, baja carga', note: 'Herramientas neumáticas, turbinas' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Lubricación del reductor</Eyebrow>
      <h2 style={H2}>Selección según velocidad superficial</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {lubes.map((l, i) => (
          <div key={i} style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 16px', display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 12, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13 }}>{l.type}</div>
            <div style={{ background: `${C}22`, borderRadius: 6, padding: '3px 8px', textAlign: 'center', fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{l.v}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{l.note}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${C}15`, border: `1px solid ${C}40`, borderRadius: 8, padding: '12px 16px', fontSize: 13 }}>
        <div style={{ color: C, fontWeight: 600, marginBottom: 6 }}>Nivel de aceite recomendado (salpicado)</div>
        <div style={{ color: 'var(--fg-2)' }}>El engrane más bajo debe sumergirse 1–2 módulos en el aceite. Verificar viscosidad ISO VG46/68/100 según temperatura.</div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'El caso de estudio integra todos los caps. anteriores en un solo objeto de ingeniería real',
    'La secuencia importa: engranes → ejes → rodamientos (los rodamientos se seleccionan DESPUÉS de los ejes)',
    'Reductor 2 etapas i=20.25 con N₂=N₄=16, N₃=N₅=72 — relaciones en cascada multiplican',
    'DE-Goodman para ejes: Ma/Se + Mm/Sut ≤ 1/n — el concentrador Kt entra en Ma',
    'Rodamientos: C₁₀ = a₁·P·(L/10⁶)^(1/3) — mayor confiabilidad → menor a₁ → mayor C₁₀',
    'Los detalles (chaveteros, anillos, sellos) suelen consumir el 40% del tiempo de diseño',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 18</Eyebrow>
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
  { id: 1, title: 'Título', note: 'Cap 18 es la síntesis del libro — aquí todo lo aprendido se aplica a un problema real.', Content: S1 },
  { id: 2, title: 'Proceso 10 pasos', note: 'Enfatizar la secuencia: no se pueden diseñar rodamientos sin saber los diámetros de eje.', revealCount: 10, Content: S2 },
  { id: 3, title: 'Cinemática del reductor', note: 'Con 2 etapas iguales: i=4.5²=20.25. Ajustar número de dientes para i exacta.', Content: S3 },
  { id: 4, title: 'Eje DE-Goodman', note: 'Variación de Se de 20 a 40 kpsi muestra cuánto importa el tratamiento superficial.', Content: S4 },
  { id: 5, title: 'Rodamientos C₁₀', note: 'Mostrar que duplicar la vida exige aumentar C₁₀ solo en ∛2 ≈ 26% — buena noticia.', Content: S5 },
  { id: 6, title: 'Detalles constructivos', note: 'Los chaveteros son el punto débil habitual — verificar siempre por aplastamiento.', revealCount: 4, Content: S6 },
  { id: 7, title: 'Lubricación', note: 'Para el reductor del ejemplo (V < 12 m/s): aceite por salpicado, ISO VG 68.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'El punto 2 (secuencia) es la lección más valiosa del capítulo.', revealCount: 6, Content: S8 },
]

export default function Cap18SlidesPage() {
  return <PresentationShell chapterId={18} partColor={C} slides={SLIDES} />
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
