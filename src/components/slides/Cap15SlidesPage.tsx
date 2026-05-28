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
        Engranes Cónicos y<br />Tornillo Sinfín
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 15 — Geometría, AGMA 2003, Eficiencia</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['Ángulos γ Γ', 'AGMA 2003-B97', 'Eficiencia eW', 'Autobloqueo', 'Rating térmico'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  const items = [
    { label: 'Ángulo paso piñón', eq: 'γ = arctan(N₁/N₂)', note: 'Engranes cónicos rectos — ejes a 90°' },
    { label: 'Ángulo paso corona', eq: 'Γ = 90° − γ', note: 'Suma de ángulos = 90° para ejes ortogonales' },
    { label: 'Diámetro medio', eq: 'd = N·m / cos(0) → dm = d − b·sinγ', note: 'm módulo en el cono medio' },
    { label: 'Fuerza tangencial', eq: 'Wt = 2T / dm', note: 'T en N·m, dm en metros' },
    { label: 'Fuerza radial', eq: 'Wr = Wt·tanφ·cosγ', note: 'φ = ángulo de presión (20°)' },
    { label: 'Fuerza axial', eq: 'Wa = Wt·tanφ·sinγ', note: 'Wa del piñón = Wr de la corona' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Geometría y fuerzas cónicas</Eyebrow>
      <h2 style={H2}>Engranes Cónicos Rectos</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', borderLeft: `3px solid ${C}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <code style={{ fontSize: 14, color: C, fontFamily: 'var(--font-mono)' }}>{it.eq}</code>
              <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{it.note}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [n1, setN1] = useState(20)
  const [n2, setN2] = useState(60)
  const [t, setT] = useState(50)
  const [phi, setPhi] = useState(20)
  const phiR = (phi * Math.PI) / 180
  const gamma = Math.atan(n1 / n2)
  const Gamma = Math.PI / 2 - gamma
  const mG = n2 / n1
  const dm = 1.0
  const Wt = (2 * t) / dm
  const Wr = Wt * Math.tan(phiR) * Math.cos(gamma)
  const Wa = Wt * Math.tan(phiR) * Math.sin(gamma)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Calculadora cónica</Eyebrow>
      <h2 style={H2}>Fuerzas en engrane cónico</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="N₁ dientes piñón" unit="" value={n1} min={10} max={60} step={1} onChange={setN1} color={C} />
          <Slider label="N₂ dientes corona" unit="" value={n2} min={20} max={120} step={1} onChange={setN2} color={C} />
          <Slider label="T₁ par piñón" unit="N·m" value={t} min={10} max={500} step={5} onChange={setT} color={C} />
          <Slider label="φ ángulo presión" unit="°" value={phi} min={14.5} max={25} step={0.5} onChange={setPhi} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="γ (piñón)" eq={`${(gamma * 180 / Math.PI).toFixed(1)}°`} color={C} />
          <FormulaBox label="Γ (corona)" eq={`${(Gamma * 180 / Math.PI).toFixed(1)}°`} color={C} />
          <FormulaBox label="mG relación" eq={`${mG.toFixed(2)}`} color={C} />
          <FormulaBox label="Wt" eq={`${Wt.toFixed(1)} N`} color={C} />
          <FormulaBox label="Wr" eq={`${Wr.toFixed(1)} N`} color={C} />
          <FormulaBox label="Wa" eq={`${Wa.toFixed(1)} N`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [phiN, setPhiN] = useState(20)
  const [lam, setLam] = useState(15)
  const [fric, setFric] = useState(0.05)
  const phiNr = (phiN * Math.PI) / 180
  const lamR = (lam * Math.PI) / 180
  const cosPhiN = Math.cos(phiNr)
  const tanLam = Math.tan(lamR)
  const eff = (cosPhiN - fric / tanLam) / (cosPhiN + fric * tanLam)
  const selfLocking = Math.tan(lamR) <= fric
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Tornillo sinfín — eficiencia</Eyebrow>
      <h2 style={H2}>eW = (cosφn − f·tanλ) / (cosφn + f/tanλ)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="φn ángulo presión" unit="°" value={phiN} min={14.5} max={25} step={0.5} onChange={setPhiN} color={C} />
          <Slider label="λ ángulo de avance" unit="°" value={lam} min={2} max={45} step={1} onChange={setLam} color={C} />
          <Slider label="f coef. fricción" unit="" value={fric} min={0.01} max={0.15} step={0.005} onChange={setFric} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>λ pequeño → alto f requerido para autobloqueo</div>
            <div style={{ marginTop: 4 }}>Tornillos de 1 hilo: λ ≈ 4–5° (casi siempre autobloqueante)</div>
            <div style={{ marginTop: 4 }}>Tornillos de 4 hilos: λ ≈ 18° (mayor eficiencia)</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="Eficiencia eW" eq={`${(eff * 100).toFixed(1)}%`} color={C} />
          <div style={{ background: selfLocking ? '#10B98122' : '#EF444422', border: `1px solid ${selfLocking ? '#10B981' : '#EF4444'}`, borderRadius: 8, padding: '14px 18px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: selfLocking ? '#10B981' : '#EF4444', fontSize: 16 }}>
              {selfLocking ? 'AUTOBLOQUEANTE' : 'NO autobloqueante'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>
              Condición: tanλ ≤ f → {Math.tan(lamR).toFixed(4)} {selfLocking ? '≤' : '>'} {fric}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  const items = [
    { label: 'Velocidad deslizante', eq: 'Vs = πdn / (60·cosλ)', note: 'n rpm, d en metros; Vs en m/s' },
    { label: 'Velocidad superficial', eq: 'V = πdn / 60', note: 'Sin corrección de ángulo' },
    { label: 'Factor de velocidad Cv', eq: 'Cv = (6.1) / (6.1 + Vs)', note: 'Vs en m/s; reduce capacidad por calor' },
    { label: 'Potencia térmica', eq: 'Ht = hCR·(Ts − Ta)·Ab', note: 'Ts≤93°C; Ab = área caja; hCR≈11.4 W/(m²·°C)' },
    { label: 'Potencia de entrada', eq: 'Hi = Wt·V / 1000', note: 'kW; verificar Hi ≤ Ht (sin enfriamiento forzado)' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Velocidad y rating térmico</Eyebrow>
      <h2 style={H2}>Limitaciones térmicas del sinfín</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>El sinfín genera más calor que otros engranajes — el rating térmico suele gobernar el diseño</p>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
            <div>
              <code style={{ fontSize: 14, color: C, fontFamily: 'var(--font-mono)' }}>{it.eq}</code>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{it.note}</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', textAlign: 'right', maxWidth: 120 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  void revealed
  const rows = [
    { spec: 'AGMA 2003-B97', desc: 'Cónicos rectos, helicoidales y espirales' },
    { spec: 'AGMA 6034', desc: 'Transmisiones de tornillo sinfín (AGMA/ANSI)' },
    { spec: 'ISO 10300', desc: 'Carga de flexión en engranes cónicos' },
    { spec: 'ISO 14521', desc: 'Rating para pares sinfín — equivalente a AGMA 6034' },
  ]
  const steps = [
    '1. Definir mG = N₂/N₁ y seleccionar número de hilos del sinfín',
    '2. Calcular ángulo de avance λ = arctan(p·nW / (π·d₁))',
    '3. Elegir material: sinfín acero, corona bronce fosforoso',
    '4. Verificar resistencia bending y pitting por AGMA 6034',
    '5. Calcular eficiencia eW y temperatura de operación',
    '6. Comparar Hi vs Ht — si Hi > Ht, agregar enfriamiento',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Normas y proceso de diseño</Eyebrow>
      <h2 style={H2}>AGMA 2003 + AGMA 6034</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ background: `${C}15`, border: `1px solid ${C}40`, borderRadius: 8, padding: '8px 12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 12 }}>{r.spec}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', fontSize: 12, color: 'var(--fg-1)', background: 'var(--bg-1)', borderRadius: 6, padding: '6px 10px' }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const [n1, setN1] = useState(2)
  const [n2, setN2] = useState(40)
  const [rpm1, setRpm1] = useState(1750)
  const [t1, setT1] = useState(20)
  const [fric, setFric] = useState(0.05)
  const [lam, setLam] = useState(8)
  const lamR = (lam * Math.PI) / 180
  const mG = n2 / n1
  const rpm2 = rpm1 / mG
  const tanLam = Math.tan(lamR)
  const phi = 20
  const phiNr = (phi * Math.PI) / 180
  const eff = Math.max(0, (Math.cos(phiNr) - fric / tanLam) / (Math.cos(phiNr) + fric * tanLam))
  const t2 = t1 * mG * eff
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Ejemplo integrador</Eyebrow>
      <h2 style={H2}>Transmisión sinfín: par y velocidad</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Hilos sinfín N₁" unit="" value={n1} min={1} max={6} step={1} onChange={setN1} color={C} />
          <Slider label="Dientes corona N₂" unit="" value={n2} min={20} max={100} step={1} onChange={setN2} color={C} />
          <Slider label="rpm₁ entrada" unit="rpm" value={rpm1} min={500} max={3600} step={50} onChange={setRpm1} color={C} />
          <Slider label="T₁ par entrada" unit="N·m" value={t1} min={5} max={200} step={5} onChange={setT1} color={C} />
          <Slider label="f fricción" unit="" value={fric} min={0.01} max={0.15} step={0.005} onChange={setFric} color={C} />
          <Slider label="λ avance" unit="°" value={lam} min={2} max={30} step={1} onChange={setLam} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="Relación mG" eq={`${mG.toFixed(1)}`} color={C} />
          <FormulaBox label="rpm₂ salida" eq={`${rpm2.toFixed(1)} rpm`} color={C} />
          <FormulaBox label="Eficiencia eW" eq={`${(eff * 100).toFixed(1)}%`} color={C} />
          <FormulaBox label="T₂ salida" eq={`${t2.toFixed(1)} N·m`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'Cónicos: ejes a 90° — ángulos γ y Γ definen el cono; Wt, Wr, Wa dependen del ángulo γ',
    'AGMA 2003-B97 adapta la metodología Lewis+AGMA al cono de paso medio (Rmave)',
    'Sinfín: relaciones de reducción altas (10:1 a 100:1) en un solo par — a costa de baja eficiencia',
    'Eficiencia eW cae con λ pequeño — tornillo de 1 hilo puede tener eW < 50%',
    'Autobloqueo si tanλ ≤ f — útil en mecanismos de elevación; evitar en transmisiones de potencia',
    'Rating térmico es crítico en sinfín: si Hi > Ht, se requiere aleta, ventilador o intercambiador',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 15</Eyebrow>
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
  { id: 1, title: 'Título', note: 'Cap 15: dos familias distintas — cónicos (misma potencia, diferente dirección) y sinfín (alta reducción).', Content: S1 },
  { id: 2, title: 'Geometría cónica', note: 'La clave: todas las fuerzas se calculan en el diámetro medio dm, no en el extremo del diente.', revealCount: 6, Content: S2 },
  { id: 3, title: 'Calculadora cónica', note: 'Notar que Wa del piñón = Wr de la corona — carga axial se convierte en radial y viceversa.', Content: S3 },
  { id: 4, title: 'Eficiencia sinfín', note: 'Demostrar en vivo: λ=4° → eficiencia muy baja pero autobloqueante; λ=25° → alta eficiencia.', Content: S4 },
  { id: 5, title: 'Rating térmico', note: 'En aplicaciones reales el rating térmico limita antes que la resistencia del diente.', revealCount: 5, Content: S5 },
  { id: 6, title: 'Normas AGMA', note: 'AGMA 6034 es la norma más usada para diseño de reductores sinfín comerciales.', revealCount: 6, Content: S6 },
  { id: 7, title: 'Ejemplo sinfín', note: 'Mostrar que aumentar hilos mejora eficiencia pero reduce relación de reducción.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Los puntos 4-6 son los que más se olvidan — el diseño térmico es único en sinfín.', revealCount: 6, Content: S8 },
]

export default function Cap15SlidesPage() {
  return <PresentationShell chapterId={15} partColor={C} slides={SLIDES} />
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
