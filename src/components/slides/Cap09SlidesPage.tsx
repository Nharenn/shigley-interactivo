'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 9 · Parte 3 — Elementos de unión
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Soldadura y<br /><span style={{ color: C }}>Uniones Permanentes</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Grupos de soldadura · Torsión · Flexión · Resistencia AISC
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['τ', 'σ', 'J_u', 'I_u', 'w', 'throat'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Tipos de soldadura ── */
function S2({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Filete (fillet)', desc: 'La más común. Garganta efectiva: t = 0.707·w. Resistencia AISC: 0.3·Su_electrodo', color: C },
    { name: 'Ranura (groove)', desc: 'Penetración completa o parcial. Resistencia ≈ material base cuando es completa.', color: 'var(--accent)' },
    { name: 'Tapón (plug/slot)', desc: 'Para unir placas paralelas. Resistencia = esfuerzo cortante en área del agujero.', color: 'var(--warning)' },
    { name: 'Por puntos (spot)', desc: 'Soldadura de resistencia eléctrica. Automóviles: 4000–5000 puntos por carrocería.', color: 'var(--danger)' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Tipos de unión soldada</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La geometría determina la garganta efectiva y la resistencia</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {types.map((t, i) => (
          <div key={i} style={{ padding: '16px 18px', background: 'var(--bg-2)', borderLeft: `3px solid ${t.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: t.color, marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <FormulaBox label="Garganta filete de 45°" eq="t = 0.707 · w" color={C} />
        <FormulaBox label="Resistencia admisible (AISC filete)" eq="τ_adm = 0.3 · Su_electrodo" color="var(--accent)" />
      </div>
    </div>
  )
}

/* ── Slide 3 — Carga directa en grupo ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Grupos de soldadura — carga directa y torsión</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Tratar la soldadura como línea — propiedades unitarias</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Esfuerzo cortante directo" eq="τ' = V / A_w   donde A_w = 0.707·w·Σl" color={C} />
          <FormulaBox label="Esfuerzo por torsión" eq="τ'' = T·r_max / J_w" color="var(--accent)" />
          <FormulaBox label="Momento polar unitario" eq="J_u = x̄²·A_u + Iu_x + Iu_y" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Procedimiento:</strong><br />
            1. Calcular centroide del grupo<br />
            2. Obtener Ju unitario (Tabla 9-1 Shigley)<br />
            3. Jw = 0.707·w·Ju<br />
            4. Combinar τ' y τ'' vectorialmente
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Grupo bajo carga excéntrica V</div>
            <svg viewBox="0 0 240 220" width="100%">
              {/* Wall */}
              <rect x="10" y="20" width="20" height="180" fill="var(--bg-3)" stroke="var(--text-3)" strokeWidth="1" />
              {/* Plate */}
              <rect x="30" y="60" width="120" height="100" fill="var(--bg-2)" stroke="var(--border)" strokeWidth="1.5" />
              {/* Weld lines */}
              <line x1="30" y1="60" x2="30" y2="160" stroke={C} strokeWidth="5" opacity="0.8" />
              <text x="36" y="110" fontSize="10" fill={C} fontFamily="monospace">w filete</text>
              {/* Centroid */}
              <circle cx="30" cy="110" r="4" fill="var(--warning)" />
              <text x="38" y="108" fontSize="9" fill="var(--warning)" fontFamily="monospace">G</text>
              {/* Force */}
              <line x1="150" y1="110" x2="210" y2="110" stroke="var(--danger)" strokeWidth="2" markerEnd="url(#a)" />
              <text x="175" y="104" fontSize="10" fill="var(--danger)" fontFamily="monospace">V</text>
              {/* Eccentricity */}
              <line x1="30" y1="140" x2="150" y2="140" stroke="var(--text-3)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="80" y="154" fontSize="9" fill="var(--text-3)" fontFamily="monospace">e (excentricidad)</text>
              {/* τ' arrow at weld */}
              <line x1="30" y1="110" x2="30" y2="88" stroke="var(--accent)" strokeWidth="2" />
              <text x="4" y="86" fontSize="9" fill="var(--accent)" fontFamily="monospace">τ'</text>
              {/* τ'' arrow */}
              <line x1="30" y1="88" x2="45" y2="76" stroke="var(--warning)" strokeWidth="2" />
              <text x="46" y="74" fontSize="9" fill="var(--warning)" fontFamily="monospace">τ''</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Calculadora soldadura torsión ── */
function S4({ revealed }: { revealed: number }) {
  const [V, setV] = useState(15000)
  const [e, setE] = useState(150)
  const [h, setH] = useState(200)
  const [w, setW] = useState(10)

  /* Vertical weld h: centroid at mid-height */
  const Aw = 0.707 * w * h
  const tauP = V / Aw
  const T = V * e
  const Ju = h ** 3 / 12  /* unit polar for vertical line */
  const Jw = 0.707 * w * Ju
  const r = h / 2
  const tauT = T * r / Jw
  const tau_total = Math.sqrt(tauP ** 2 + tauT ** 2)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora — soldadura vertical bajo carga excéntrica</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>τ_total = √(τ'² + τ''²)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="V — Carga cortante" unit="N" value={V} min={1000} max={100000} step={1000} onChange={setV} color={C} />
          <Slider label="e — Excentricidad" unit="mm" value={e} min={20} max={400} onChange={setE} color="var(--accent)" />
          <Slider label="h — Altura soldadura" unit="mm" value={h} min={50} max={500} onChange={setH} color="var(--warning)" />
          <Slider label="w — Tamaño filete" unit="mm" value={w} min={4} max={25} onChange={setW} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '16px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>τ_total</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: C }}>{(tau_total).toFixed(1)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>MPa</div>
          </div>
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.8 }}>
            Aw = {Aw.toFixed(0)} mm²<br />
            τ' (directo) = {tauP.toFixed(1)} MPa<br />
            T = {(T / 1e6).toFixed(3)} kN·m<br />
            τ'' (torsión) = {tauT.toFixed(1)} MPa
          </div>
          <div style={{ padding: '10px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)' }}>
            Admisible E70: τ_adm = 0.3·480 = 144 MPa<br />
            {tau_total < 144 ? `✓ ${(144 / tau_total).toFixed(2)}× de seguridad` : '⚠ Aumentar w o h'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Soldadura a flexión ── */
function S5({ revealed }: { revealed: number }) {
  const [M, setM] = useState(8e6)
  const [b, setB] = useState(100)
  const [d_weld, setD] = useState(150)
  const [w2, setW2] = useState(8)

  /* Two horizontal welds at top and bottom */
  const Iu = b * d_weld ** 2 / 2 + d_weld ** 3 / 6  /* approx for rect pattern */
  const Iw = 0.707 * w2 * Iu
  const c = d_weld / 2
  const sigma = M * c / Iw

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Soldadura bajo carga de flexión</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>σ = M·c / Iw — tratar la soldadura como sección</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Esfuerzo normal en soldadura" eq="σ = M · c / Iw" color={C} />
          <FormulaBox label="Momento de inercia efectivo" eq="Iw = 0.707·w·Iu" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Iu = momento unitario (sin factor 0.707·w)<br />
            c = distancia al centroide más lejano<br />
            Tabla 9-1 de Shigley: Iu para patrones comunes
          </div>
          <Slider label="M — Momento flector" unit="N·mm" value={M / 1e6} min={0.5} max={50} step={0.5} onChange={v => setM(v * 1e6)} color={C} />
          <Slider label="b — Ancho patrón" unit="mm" value={b} min={40} max={300} onChange={setB} color="var(--warning)" />
          <Slider label="d — Altura patrón" unit="mm" value={d_weld} min={60} max={400} onChange={setD} color="var(--accent)" />
          <Slider label="w — Tamaño filete" unit="mm" value={w2} min={4} max={25} onChange={setW2} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>σ normal en soldadura</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: C }}>{sigma.toFixed(1)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>MPa</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.8 }}>
            M = {(M / 1e6).toFixed(1)} kN·m<br />
            Iu = {Iu.toFixed(0)} mm³<br />
            Iw = {Iw.toFixed(0)} mm⁴
          </div>
          <div style={{ padding: '10px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)' }}>
            Admisible E70 (σ normal): 0.6·480 = 288 MPa<br />
            {sigma < 288 ? `✓ Factor: ${(288 / sigma).toFixed(2)}×` : '⚠ Aumentar w o tamaño patrón'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Selección de electrodo ── */
function S6({ revealed }: { revealed: number }) {
  const electrodes = [
    { name: 'E60XX', Su: 430, usage: 'Acero estructural A36. Baja resistencia, muy soldable.' },
    { name: 'E70XX', Su: 480, usage: 'Acero estructural A572. El más usado en diseño mecánico.' },
    { name: 'E80XX', Su: 550, usage: 'Aceros de baja aleación, ASTM A441.' },
    { name: 'E90XX', Su: 620, usage: 'Aceros de alta resistencia, estructuras críticas.' },
    { name: 'E100XX', Su: 690, usage: 'Aceros T-1, quenched & tempered.' },
    { name: 'E120XX', Su: 830, usage: 'Alta resistencia. Susceptible a fragilización por hidrógeno.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Selección de electrodo de soldadura</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Electrodo ≥ resistencia del material base</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {electrodes.map((el, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-2)', border: `1px solid ${C}25`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.25, transition: 'opacity 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: C, marginBottom: 4 }}>{el.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', marginBottom: 6 }}>Su = {el.Su} MPa</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{el.usage}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo resuelto ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Datos', text: 'Soporte soldado: placa 150×10mm, soldadura filete alrededor del perímetro w=6mm, carga V=20kN a e=200mm del centroide de soldadura.' },
    { label: 'Cortante directo τ\'', text: 'Aw = 0.707·6·(2·150+2·10) = 0.707·6·320 = 1357 mm². τ\' = 20000/1357 = 14.7 MPa.' },
    { label: 'Torsión τ\'\'', text: 'T = 20000·200 = 4×10⁶ N·mm. Ju (rectangular) = 2b(3d²+b²)/6 con b=150, d=10 → Ju = ... r_max = √(75²+5²) ≈ 75mm. τ\'\' = T·r/Jw.' },
    { label: 'Combinación y verificación', text: 'τ_total = √(τ\'²+τ\'\'²). Comparar con τ_adm = 0.3·480 = 144 MPa (electrodo E70). Determinar w mínimo.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Ejemplo resuelto — soporte con carga excéntrica</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Soporte soldado con perímetro completo</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? C + '50' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.25, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: C, flexShrink: 0, width: 28 }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: C, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'Garganta efectiva filete: t = 0.707·w — nunca usar el tamaño w directamente como área',
  'Tratar la soldadura como línea (ancho=1): calcular Ju y Iu unitarios, luego ×0.707·w',
  'Carga excéntrica genera torsión T = V·e → combinar τ\' y τ\'\' vectorialmente en punto crítico',
  'Resistencia admisible AISC filete E70: τ_adm = 0.3·480 = 144 MPa (cortante), σ_adm = 0.6·480 = 288 MPa (normal)',
  'Electrodo ≥ resistencia material base — E70 para A36/A572, E80+ para aceros de alta resistencia',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10 }}>
            <span style={{ color: 'var(--success)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.45 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'La soldadura es permanente — errores de diseño son costosos de corregir. Un análisis correcto requiere conocer el patrón y la excentricidad.', Content: S1 },
  { id: 2, title: 'Tipos de soldadura', revealCount: 4, note: 'El filete es el 80% de la soldadura industrial. Profundizar en su análisis es la mayor ganancia práctica de este capítulo.', Content: S2 },
  { id: 3, title: 'Grupos — torsión', note: 'La clave: tablas de Ju y Iu unitarios en Shigley (Tabla 9-1). No hace falta integrar — solo identificar el patrón.', Content: S3 },
  { id: 4, title: 'Calculadora torsión', note: 'Demostrar: con e grande, τ\'\' >> τ\'. La excentricidad es el factor dominante en soportes soldados.', Content: S4 },
  { id: 5, title: 'Soldadura a flexión', note: 'Los brazos de grúa son el ejemplo clásico. M = F·L puede generar σ muy alto si el patrón de soldadura es pequeño.', Content: S5 },
  { id: 6, title: 'Selección de electrodo', revealCount: 6, note: 'Regla: electrodo sobreresistente no es mejor — puede causar fractura frágil en la ZAC (zona afectada por calor).', Content: S6 },
  { id: 7, title: 'Ejemplo resuelto', revealCount: 4, note: 'Resolver en pizarrón con las dimensiones exactas. El error más común: olvidar el factor 0.707 en la garganta.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 9-1 a 9-15. Próxima clase: resortes — diseño desde cero de un resorte helicoidal.', Content: S8 },
]

export default function Cap09SlidesPage() {
  return <PresentationShell chapterId={9} partColor={C} slides={SLIDES} />
}

/* ─── Helpers ─── */
const H2: React.CSSProperties = { fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.025em', fontFamily: 'var(--font-mono)', marginBottom: 0, marginTop: 0, lineHeight: 1.15 }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>// {children}</div>
}

function FormulaBox({ label, eq, color }: { label: string; eq: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', background: 'var(--bg-2)', border: `1px solid ${color}40`, borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color, fontWeight: 600, lineHeight: 1.4 }}>{eq}</div>
    </div>
  )
}

function Slider({ label, unit, value, min, max, step = 1, onChange, color }: {
  label: string; unit: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; color: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 5 }}>
        <span>{label}</span>
        <span style={{ color }}>{value}{unit ? ' ' + unit : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} style={{ width: '100%', accentColor: color }} />
    </div>
  )
}
