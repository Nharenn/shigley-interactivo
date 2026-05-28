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
        Elementos Mecánicos<br />Flexibles
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 17 — Correas planas, V, sincrónicas y cadenas</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['Correa plana', 'Correa V', 'Sincrónica', 'Cadena', 'Euler e^(fφ)'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Correa plana', props: 'Alta velocidad, baja carga. Eficiencia ≈98%. Resbalamiento inherente.', eq: 'σ = F/A + ρv²/g' },
    { name: 'Correa trapezoidal (V)', props: 'Efecto cuña en ranura — f_eff = f/sin(α/2). Cargas medianas.', eq: 'e^(f·φ/sinα)' },
    { name: 'Correa sincrónica', props: 'Dientes → no hay resbalamiento. Control de posición posible.', eq: 'Relación exacta N₁/N₂' },
    { name: 'Cadena de rodillos', props: 'Alta carga, baja velocidad. Durabilidad superior a correas.', eq: 'V = N·p·n / 12' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Tipos de transmisión flexible</Eyebrow>
      <h2 style={H2}>Cuatro familias</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {types.map((t, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 10, padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', color: C, fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{t.props}</div>
            </div>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, background: `${C}15`, padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap' }}>{t.eq}</code>
          </div>
        ))}
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [D, setD] = useState(0.30)
  const [d, setDd] = useState(0.15)
  const [Cv, setCv] = useState(1.0)
  const arg = Math.max(-1, Math.min(1, (D - d) / (2 * Cv)))
  const phiD = Math.PI - 2 * Math.asin(arg)
  const phid = Math.PI + 2 * Math.asin(arg)
  const L = Math.sqrt(4 * Cv ** 2 - (D - d) ** 2) + (D * phiD + d * phid) / 2
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Geometría de la transmisión</Eyebrow>
      <h2 style={H2}>φD = π − 2arcsin((D−d)/(2C))</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>El ángulo de abrace en la polea pequeña determina la capacidad de transmisión — reducir C disminuye φd</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="D polea motriz" unit="m" value={D} min={0.10} max={0.80} step={0.02} onChange={setD} color={C} />
          <Slider label="d polea conducida" unit="m" value={d} min={0.05} max={Math.max(0.05, D)} step={0.01} onChange={setDd} color={C} />
          <Slider label="C distancia centros" unit="m" value={Cv} min={0.3} max={3.0} step={0.1} onChange={setCv} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="φD (grande)" eq={`${(phiD * 180 / Math.PI).toFixed(1)}°`} color={C} />
          <FormulaBox label="φd (pequeña)" eq={`${(phid * 180 / Math.PI).toFixed(1)}°`} color={C} />
          <FormulaBox label="L longitud" eq={`${L.toFixed(3)} m`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [f, setF] = useState(0.35)
  const [phi, setPhi] = useState(170)
  const [fc, setFc] = useState(50)
  const [f2, setF2] = useState(200)
  const phiR = (phi * Math.PI) / 180
  const ratio = Math.exp(f * phiR)
  const f1 = (f2 - fc) * ratio + fc
  const Fnet = f1 - f2
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Ecuación de Euler — correa plana</Eyebrow>
      <h2 style={H2}>(F₁−Fc) / (F₂−Fc) = e^(f·φ)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>Fc = ρ·v²·A — tensión centrífuga; reduce la capacidad de transmisión a alta velocidad</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="f coef. fricción" unit="" value={f} min={0.10} max={0.60} step={0.01} onChange={setF} color={C} />
          <Slider label="φ ángulo abrace" unit="°" value={phi} min={90} max={270} step={5} onChange={setPhi} color={C} />
          <Slider label="Fc tensión centríf." unit="N" value={fc} min={0} max={500} step={10} onChange={setFc} color={C} />
          <Slider label="F₂ lado flojo" unit="N" value={f2} min={50} max={2000} step={25} onChange={setF2} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="e^(f·φ)" eq={`${ratio.toFixed(3)}`} color={C} />
          <FormulaBox label="F₁ lado tenso" eq={`${f1.toFixed(1)} N`} color={C} />
          <FormulaBox label="Fnet transmisible" eq={`${Fnet.toFixed(1)} N`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  void revealed
  const [f, setF] = useState(0.35)
  const [alpha, setAlpha] = useState(38)
  const [phi, setPhi] = useState(170)
  const [f2, setF2] = useState(300)
  const [fc, setFc] = useState(50)
  const alphaR = (alpha * Math.PI) / 180
  const phiR = (phi * Math.PI) / 180
  const feff = f / Math.sin(alphaR / 2)
  const ratio = Math.exp(feff * phiR)
  const f1 = (f2 - fc) * ratio + fc
  const Fnet = f1 - f2
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Correa trapezoidal (V)</Eyebrow>
      <h2 style={H2}>f_eff = f / sin(α/2)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>La cuña aumenta el coeficiente efectivo de fricción — permite transmitir más par con la misma tensión inicial</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="f coef. base" unit="" value={f} min={0.10} max={0.60} step={0.01} onChange={setF} color={C} />
          <Slider label="α ángulo ranura" unit="°" value={alpha} min={28} max={42} step={1} onChange={setAlpha} color={C} />
          <Slider label="φ ángulo abrace" unit="°" value={phi} min={90} max={270} step={5} onChange={setPhi} color={C} />
          <Slider label="F₂ flojo" unit="N" value={f2} min={50} max={2000} step={25} onChange={setF2} color={C} />
          <Slider label="Fc centríf." unit="N" value={fc} min={0} max={500} step={10} onChange={setFc} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="f_eff" eq={`${feff.toFixed(3)}`} color={C} />
          <FormulaBox label="e^(f_eff·φ)" eq={`${ratio.toFixed(3)}`} color={C} />
          <FormulaBox label="F₁ tenso" eq={`${f1.toFixed(1)} N`} color={C} />
          <FormulaBox label="Fnet" eq={`${Fnet.toFixed(1)} N`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  void revealed
  const [N, setN] = useState(17)
  const [p, setP] = useState(0.0254)
  const [n, setNn] = useState(1200)
  const V = (N * p * n) / 60
  const chordal = 1 - Math.cos(Math.PI / N)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Cadena de rodillos</Eyebrow>
      <h2 style={H2}>V = N·p·n / 60</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>La cadena trabaja con engranes de paso circular — N mínimo ≈ 17 dientes para reducir efecto poligonal</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="N dientes piñón" unit="" value={N} min={11} max={40} step={1} onChange={setN} color={C} />
          <Slider label="p paso cadena" unit="m" value={p} min={0.00952} max={0.0508} step={0.00318} onChange={v => setP(Number(v.toFixed(5)))} color={C} />
          <Slider label="n velocidad" unit="rpm" value={n} min={100} max={3000} step={50} onChange={setNn} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>Paso estándar ANSI 40: 1/2 in (12.7 mm)</div>
            <div style={{ marginTop: 4 }}>Cadena n°: 25, 35, 40, 50, 60, 80</div>
            <div style={{ marginTop: 4 }}>Límite velocidad: V ≤ 30 m/s para cadena estándar</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="V velocidad" eq={`${V.toFixed(2)} m/s`} color={C} />
          <FormulaBox label="Efecto poligonal" eq={`${(chordal * 100).toFixed(2)}%`} color={C} />
          <div style={{ background: N < 17 ? '#F59E0B22' : `${C}15`, border: `1px solid ${N < 17 ? '#F59E0B' : C}40`, borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            {N < 17 && <div style={{ color: '#F59E0B', fontWeight: 600, marginBottom: 4 }}>⚠ N &lt; 17: efecto poligonal significativo</div>}
            <div>N mínimo recomendado: 17 dientes</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const [hp, setHp] = useState(5)
  const [rpm1, setRpm1] = useState(1750)
  const [mG, setMG] = useState(3.0)
  const [D_in, setD] = useState(6)
  const V = Math.PI * (D_in / 12) * rpm1
  const T = (hp * 33000) / (2 * Math.PI * rpm1)
  const Fnet = (hp * 33000) / V
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Ejemplo integrador — selección de correa</Eyebrow>
      <h2 style={H2}>Fuerza neta y potencia transmitida</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="Potencia" unit="hp" value={hp} min={1} max={50} step={1} onChange={setHp} color={C} />
          <Slider label="rpm motriz" unit="rpm" value={rpm1} min={500} max={3600} step={50} onChange={setRpm1} color={C} />
          <Slider label="Relación mG" unit="" value={mG} min={1} max={6} step={0.5} onChange={setMG} color={C} />
          <Slider label="D motriz" unit="in" value={D_in} min={2} max={24} step={1} onChange={setD} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="V superficial" eq={`${V.toFixed(0)} ft/min`} color={C} />
          <FormulaBox label="T par" eq={`${T.toFixed(2)} lb·ft`} color={C} />
          <FormulaBox label="Fnet = HP·33000/V" eq={`${Fnet.toFixed(1)} lb`} color={C} />
          <FormulaBox label="rpm conducida" eq={`${(rpm1 / mG).toFixed(0)} rpm`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'Correa plana: Euler (F₁−Fc)/(F₂−Fc) = e^(fφ) — la tensión centrífuga Fc reduce la capacidad a alta velocidad',
    'Correa V: f_eff = f/sin(α/2) — el efecto cuña amplifica el coeficiente efectivo típicamente 2.5–3×',
    'Ángulo de abrace φ en la polea pequeña es el parámetro geométrico crítico — objetivo: φ ≥ 150°',
    'Correa sincrónica: sin resbalamiento, útil en control de tiempo/posición — no usar Euler aquí',
    'Cadena: V = N·p·n/60; N ≥ 17 dientes para limitar efecto poligonal y vibraciones de choque',
    'Todos los flexibles requieren verificar fatiga de flexión + vida en el catálogo del fabricante',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 17</Eyebrow>
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
  { id: 1, title: 'Título', note: 'Cap 17: transmisión de potencia sin contacto directo de engranaje — cada tipo tiene su nicho.', Content: S1 },
  { id: 2, title: 'Tipos de transmisión', note: 'Elegir entre correa plana/V/sincrónica según: velocidad, precisión, costo.', revealCount: 4, Content: S2 },
  { id: 3, title: 'Geometría', note: 'La longitud L y el ángulo φ determinan si hay que ajustar la distancia entre centros.', Content: S3 },
  { id: 4, title: 'Euler correa plana', note: 'Demostrar: subir Fc (alta velocidad) → Fnet cae aunque el ratio e^(fφ) suba.', Content: S4 },
  { id: 5, title: 'Correa V', note: 'Mostrar que α = 38° típico da f_eff ≈ 3.3× el coeficiente de fricción base.', Content: S5 },
  { id: 6, title: 'Cadena de rodillos', note: 'Variar N: mostrar cómo el efecto poligonal se reduce drásticamente de 13 a 17 dientes.', Content: S6 },
  { id: 7, title: 'Ejemplo selección', note: 'El catálogo del fabricante usa estos valores como entrada para seleccionar perfil y número de correas.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Punto 6 es el más olvidado: todos los cálculos son preliminares — la selección final es del catálogo.', revealCount: 6, Content: S8 },
]

export default function Cap17SlidesPage() {
  return <PresentationShell chapterId={17} partColor={C} slides={SLIDES} />
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
