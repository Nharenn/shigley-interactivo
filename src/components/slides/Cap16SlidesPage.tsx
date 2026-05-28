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
        Embragues, Frenos<br />y Volantes
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 16 — Fricción, energía y control de velocidad</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['Freno de banda', 'Disco UW', 'Cónico', 'Energía ΔE', 'Volante I'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  void revealed
  const [fPhi, setFPhi] = useState(1.2)
  const [f2, setF2] = useState(200)
  const [r, setR] = useState(0.15)
  const f1 = f2 * Math.exp(fPhi)
  const T = (f1 - f2) * r
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Freno de banda</Eyebrow>
      <h2 style={H2}>P₁ / P₂ = e^(f·φ)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>La tensión del lado tenso crece exponencialmente con el ángulo de contacto — el freno de banda capitaliza este efecto.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="f·φ (adim.)" unit="" value={fPhi} min={0.1} max={4.0} step={0.05} onChange={setFPhi} color={C} />
          <Slider label="F₂ lado flojo" unit="N" value={f2} min={50} max={1000} step={10} onChange={setF2} color={C} />
          <Slider label="r radio tambor" unit="m" value={r} min={0.05} max={0.40} step={0.01} onChange={setR} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>φ típico: 180°–270° (π a 3π/2 rad)</div>
            <div style={{ marginTop: 4 }}>f típico acero/hierro: 0.30–0.35</div>
            <div style={{ marginTop: 4 }}>f típico forro/hierro: 0.40–0.50</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="e^(f·φ)" eq={`${Math.exp(fPhi).toFixed(3)}`} color={C} />
          <FormulaBox label="F₁ lado tenso" eq={`${f1.toFixed(1)} N`} color={C} />
          <FormulaBox label="T = (F₁−F₂)·r" eq={`${T.toFixed(1)} N·m`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [D, setD] = useState(0.20)
  const [d, setDd] = useState(0.10)
  const [fric, setFric] = useState(0.35)
  const [pa, setPa] = useState(700000)
  const T_uw = (Math.PI * fric * pa * (D ** 3 - d ** 3)) / 12
  const T_us = (fric * pa * Math.PI * (D ** 2 - d ** 2) / 4) * ((D + d) / 4)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Embrague de disco — desgaste uniforme</Eyebrow>
      <h2 style={H2}>T = (π·f·pa·(D³−d³)) / 12</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>Hipótesis de desgaste uniforme (p·r = cte) — más realista que presión uniforme para discos usados</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="D diám. ext." unit="m" value={D} min={0.05} max={0.50} step={0.01} onChange={setD} color={C} />
          <Slider label="d diám. int." unit="m" value={d} min={0.02} max={Math.max(0.02, D - 0.02)} step={0.01} onChange={setDd} color={C} />
          <Slider label="f coef. fricción" unit="" value={fric} min={0.10} max={0.60} step={0.01} onChange={setFric} color={C} />
          <Slider label="pa pres. máx." unit="Pa" value={pa} min={100000} max={2000000} step={50000} onChange={setPa} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="T desgaste unif." eq={`${T_uw.toFixed(1)} N·m`} color={C} />
          <FormulaBox label="T presión unif." eq={`${T_us.toFixed(1)} N·m`} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>Desgaste uniforme → conservador (T menor)</div>
            <div style={{ marginTop: 4 }}>Para N discos: multiplicar T por N</div>
            <div style={{ marginTop: 4 }}>Materiales: metal sinterizado, Kevlar, cerámica</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [D, setD] = useState(0.20)
  const [d, setDd] = useState(0.10)
  const [fric, setFric] = useState(0.35)
  const [pa, setPa] = useState(700000)
  const [alpha, setAlpha] = useState(15)
  const alphaR = (alpha * Math.PI) / 180
  const T = (Math.PI * fric * pa * (D ** 3 - d ** 3)) / (12 * Math.sin(alphaR))
  const F = (Math.PI * pa * (D ** 2 - d ** 2)) / (4 * Math.sin(alphaR))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Embrague cónico</Eyebrow>
      <h2 style={H2}>T = f·F·(D+d) / (4·sinα)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>El ángulo de semicono α amplifica el par: menor α → mayor T — pero riesgo de autobloqueo si α es muy pequeño</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="D diám. ext." unit="m" value={D} min={0.05} max={0.50} step={0.01} onChange={setD} color={C} />
          <Slider label="d diám. int." unit="m" value={d} min={0.02} max={Math.max(0.02, D - 0.02)} step={0.01} onChange={setDd} color={C} />
          <Slider label="f coef. fricción" unit="" value={fric} min={0.10} max={0.60} step={0.01} onChange={setFric} color={C} />
          <Slider label="pa pres. máx." unit="Pa" value={pa} min={100000} max={2000000} step={50000} onChange={setPa} color={C} />
          <Slider label="α semicono" unit="°" value={alpha} min={6} max={45} step={1} onChange={setAlpha} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="T cónico" eq={`${T.toFixed(1)} N·m`} color={C} />
          <FormulaBox label="F axial requerida" eq={`${F.toFixed(0)} N`} color={C} />
          <div style={{ background: alpha < 8 ? '#F59E0B22' : 'var(--bg-1)', border: `1px solid ${alpha < 8 ? '#F59E0B' : 'transparent'}`, borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            {alpha < 8 ? <div style={{ color: '#F59E0B', fontWeight: 600 }}>⚠ α muy pequeño: riesgo de autobloqueo</div> : null}
            <div style={{ marginTop: 4 }}>α recomendado: 12°–15°</div>
            <div>Autobloqueo si tanα &lt; f → {Math.tan(alphaR).toFixed(3)} vs {fric}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  const items = [
    { label: 'Energía cinética', eq: 'E = ½·I·ω²', note: 'I = momento de inercia (kg·m²), ω rad/s' },
    { label: 'Variación de energía', eq: 'ΔE = ½·I·(ω₁²−ω₂²)', note: 'Absorbida por el freno o entregada por el volante' },
    { label: 'Calentamiento', eq: 'ΔT = ΔE / (m·cp)', note: 'm masa del rotor, cp calor específico del material' },
    { label: 'Límite temperatura', eq: 'ΔT ≤ 180°C (metálico)', note: 'Para materiales orgánicos usar ΔT ≤ 100°C' },
    { label: 'Presión media', eq: 'pm = ΔE / (f·r·A·N_ciclos)', note: 'Verificar pm contra especificaciones del material' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Energía y calentamiento</Eyebrow>
      <h2 style={H2}>ΔE, ΔT y vida útil del forro</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', borderLeft: `3px solid ${C}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <code style={{ fontSize: 14, color: C }}>{it.eq}</code>
              <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{it.note}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  void revealed
  const [dE, setDE] = useState(5000)
  const [cs, setCs] = useState(0.05)
  const [omega, setOmega] = useState(100)
  const I = dE / (cs * omega ** 2)
  const m_steel_r = 0.5
  const r_est = Math.sqrt(I / m_steel_r)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Volante de inercia</Eyebrow>
      <h2 style={H2}>I = ΔE / (Cs · ω²)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>Cs = coeficiente de variación de velocidad (típico 0.01–0.10). El volante almacena energía para suavizar la variación.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="ΔE energía" unit="J" value={dE} min={100} max={50000} step={100} onChange={setDE} color={C} />
          <Slider label="Cs coef. variación" unit="" value={cs} min={0.01} max={0.15} step={0.005} onChange={setCs} color={C} />
          <Slider label="ω velocidad" unit="rad/s" value={omega} min={10} max={300} step={5} onChange={setOmega} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div>Cs típicos: prensas 0.01–0.02, bombas 0.03–0.05</div>
            <div style={{ marginTop: 4 }}>Para disco sólido: I = ½·m·r²</div>
            <div style={{ marginTop: 4 }}>Para anillo: I ≈ m·((R²+r²)/2)</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="I requerida" eq={`${I.toFixed(3)} kg·m²`} color={C} />
          <FormulaBox label="r estimado (m=0.5kg)" eq={`${r_est.toFixed(3)} m`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  const materials = [
    { name: 'Fierro fund./hierro', pm: '170–350 kPa', f: '0.30–0.45', temp: '260°C' },
    { name: 'Acero/fierro fund.', pm: '170–280 kPa', f: '0.15–0.25', temp: '260°C' },
    { name: 'Bronce/acero', pm: '35–70 kPa', f: '0.15–0.25', temp: '150°C' },
    { name: 'Forro orgánico/fierro', pm: '350–700 kPa', f: '0.40–0.50', temp: '200°C' },
    { name: 'Cerámica/acero', pm: '700–2100 kPa', f: '0.20–0.35', temp: '500°C' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Materiales de fricción</Eyebrow>
      <h2 style={H2}>Tabla de referencia</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 8, background: `${C}22`, borderRadius: 8, padding: '8px 12px' }}>
          {['Par', 'pm', 'f', 'T_max'].map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {materials.map((m, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 8, background: 'var(--bg-1)', borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ fontSize: 12, color: 'var(--fg-1)' }}>{m.name}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{m.pm}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{m.f}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{m.temp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'Freno de banda: P₁/P₂ = e^(f·φ) — mayor ángulo de contacto → mayor amplificación de fuerza',
    'Disco de fricción (desgaste uniforme): T = π·f·pa·(D³−d³)/12 — hipótesis más conservadora',
    'Embrague cónico: factor 1/sinα amplifica el par — ángulo α entre 12°–15° es típico',
    'Calentamiento ΔT = ΔE/(m·cp) — límite térmico del material fija la vida útil',
    'Volante: I = ΔE/(Cs·ω²) — Cs pequeño significa control de velocidad más estricto → I mayor',
    'Autobloqueo: ocurre cuando tanα < f en cónicos, o tanλ < f en sinfín',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 16</Eyebrow>
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
  { id: 1, title: 'Título', note: 'Cap 16: control de movimiento — embragar, frenar, almacenar energía.', Content: S1 },
  { id: 2, title: 'Freno de banda', note: 'La ecuación P₁/P₂ = e^(fφ) es la misma que para correas — misma física.', Content: S2 },
  { id: 3, title: 'Disco UW', note: 'Desgaste uniforme es el escenario de diseño — la presión uniforme solo aplica en discos nuevos.', Content: S3 },
  { id: 4, title: 'Embrague cónico', note: 'Comparar α=8° vs α=20° — demostrar el trade-off amplificación/autobloqueo.', Content: S4 },
  { id: 5, title: 'Energía y calor', note: 'El límite no es el par que puede trasmitir sino el calor que puede disipar.', revealCount: 5, Content: S5 },
  { id: 6, title: 'Volante', note: 'Cs es la variable de diseño que especifica el cliente (suavidad de operación).', Content: S6 },
  { id: 7, title: 'Materiales', note: 'La cerámica es costosa pero permite frenos de alto rendimiento (ferroviario, aeronáutico).', revealCount: 5, Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Enfatizar que todos estos sistemas son limitados por la energía disipada como calor.', revealCount: 6, Content: S8 },
]

export default function Cap16SlidesPage() {
  return <PresentationShell chapterId={16} partColor={C} slides={SLIDES} />
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
