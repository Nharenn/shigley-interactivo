'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 7 · Parte 3 — Elementos de transmisión
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Ejes y<br /><span style={{ color: C }}>Componentes de Ejes</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Flexión rotativa · ASME-Elliptic · DE-Goodman · Velocidad crítica
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['ASME-E', 'DE-G', 'σa', 'τm', 'ωc', 'deflexión'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Cargas en ejes ── */
function S2({ revealed }: { revealed: number }) {
  const items = [
    { title: 'Flexión rotativa = fatiga pura', desc: 'Cada vuelta invierte la fibra traccionada/comprimida → σa = Mc/I, σm = 0 (carga constante rotativa).', color: C },
    { title: 'Torsión constante (usualmente)', desc: 'La torsión de transmisión es casi constante → τm = Tc/J, τa ≈ 0 salvo arranques/paros.', color: 'var(--accent)' },
    { title: 'Axial y transversal', desc: 'Peso propio, pretensado, fuerzas de engranaje. Se combinan con flexión para el esfuerzo total.', color: 'var(--warning)' },
    { title: 'Concentradores de esfuerzo', desc: 'Hombros, cuñeros, ranuras circlip, roscas — puntos críticos donde Kf multiplica el esfuerzo.', color: 'var(--danger)' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Cargas que actúan sobre un eje real</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>El eje combina flexión (fatiga) + torsión</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '14px 18px', background: 'var(--bg-2)', borderLeft: `3px solid ${item.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: item.color, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 3 — Criterio ASME-Elliptic ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Criterio ASME-Elliptic para ejes</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Combina fatiga (σa) y fluencia estática (τm)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Ecuación de diseño ASME-Elliptic" eq="(32n/πd³)√[(KfMa/Se)²+¾(KfsTm/Sy)²]=1" color={C} />
          <FormulaBox label="Diámetro mínimo requerido" eq="d = [32n/π · √((KfMa/Se)²+¾(KfsTm/Sy)²)]^⅓" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Términos:</strong><br />
            Ma = momento flector alternante [N·mm]<br />
            Tm = torque medio [N·mm]<br />
            Kf = concentrador flexión · Kfs = concentrador torsión
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Criterio DE-Goodman (alternativa)" eq="(16n/πd³)√[4(KfMa/Se)²+3(KfsTm/Sut)²]=1" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>ASME-E vs DE-G:</strong><br />
            • ASME-E usa Sy para la parte estática → más conservador para ductiles<br />
            • DE-Goodman usa Sut → puede diferir en materiales con Sy/Sut bajo<br />
            • Ambos recomendados en Shigley §7-1
          </div>
          <div style={{ padding: '12px 14px', background: `${C}10`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.6 }}>
            <strong style={{ color: C }}>Proceso de diseño:</strong><br />
            1. Determinar Ma y Tm en cada sección<br />
            2. Estimar Se con factores de Marin<br />
            3. Asumir n → calcular d requerido<br />
            4. Verificar deflexión y velocidad crítica
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Calculadora diámetro ── */
function S4({ revealed }: { revealed: number }) {
  const [Ma, setMa] = useState(150000)
  const [Tm, setTm] = useState(200000)
  const [Se, setSe] = useState(220)
  const [Sy, setSy] = useState(420)
  const [n, setN] = useState(2.0)
  const [Kf, setKf] = useState(1.8)

  const term1 = (Kf * Ma / Se) ** 2
  const term2 = 0.75 * (Kf * Tm / Sy) ** 2
  const d_mm = Math.pow((32 * n / Math.PI) * Math.sqrt(term1 + term2), 1 / 3) / 1000 * 1000
  // d in mm: inputs are N·mm for moments, MPa for stresses
  const d_calc = Math.pow((32 * n / Math.PI) * Math.sqrt(term1 + term2), 1 / 3)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora ASME-Elliptic — diámetro mínimo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Encuentra d para el n deseado</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="Ma — Momento flector alt." unit="N·mm" value={Ma} min={10000} max={500000} step={5000} onChange={setMa} color={C} />
          <Slider label="Tm — Torque medio" unit="N·mm" value={Tm} min={0} max={500000} step={5000} onChange={setTm} color="var(--accent)" />
          <Slider label="Se — Resistencia a fatiga" unit="MPa" value={Se} min={80} max={400} onChange={setSe} color="var(--success)" />
          <Slider label="Sy — Fluencia" unit="MPa" value={Sy} min={200} max={800} onChange={setSy} color="var(--warning)" />
          <Slider label="n — Factor de seguridad" unit="" value={n} min={1.0} max={4.0} step={0.1} onChange={setN} color="var(--danger)" />
          <Slider label="Kf — Concentrador esfuerzo" unit="" value={Kf} min={1.0} max={3.5} step={0.05} onChange={setKf} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>d mínimo requerido</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 700, color: C }}>{d_calc.toFixed(1)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>mm</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.8 }}>
            √[(KfMa/Se)²+¾(KfTm/Sy)²]<br />
            = {Math.sqrt(term1 + term2).toFixed(1)}<br />
            Seleccionar d estándar ≥ {Math.ceil(d_calc / 5) * 5} mm
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Concentradores en ejes ── */
function S5({ revealed }: { revealed: number }) {
  const features = [
    { name: 'Hombro de posicionamiento', Kt_range: '1.5 – 2.5', tip: 'Radio r/d ≥ 0.1 para reducir Kt' },
    { name: 'Cuñero rectangular', Kt_range: '2.0 – 3.0', tip: 'Bordes redondeados reducen a Kt ≈ 1.8' },
    { name: 'Ranura de circlip', Kt_range: '2.5 – 5.0', tip: 'Muy severo — evitar en zonas de alta flexión' },
    { name: 'Rosca UNC/ISO', Kt_range: '2.2 – 3.8', tip: 'q_hilo ≈ 0.5 para metales tratados' },
    { name: 'Agujero pasante transversal', Kt_range: '2.0 – 3.0', tip: 'Concentra torsión y flexión simultáneamente' },
    { name: 'Prensado / interferencia', Kt_range: '1.8 – 3.5', tip: 'Depende de la fuerza de ajuste y acabado' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Concentradores de esfuerzo en ejes</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Kf = 1 + q(Kt − 1) — siempre en el punto crítico</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {features.map((f, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-2)', border: `1px solid ${C}25`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)', marginBottom: 4 }}>{f.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: C, marginBottom: 6 }}>Kt {f.Kt_range}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{f.tip}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 6 — Velocidad crítica ── */
function S6({ revealed }: { revealed: number }) {
  const [L, setL] = useState(600)
  const [d, setD] = useState(40)
  const [E, setE] = useState(207000)

  const I = Math.PI * d ** 4 / 64
  const rho = 7850e-9  /* kg/mm³ */
  const A = Math.PI * d ** 2 / 4
  const m_per_L = rho * A  /* kg/mm */
  /* Rayleigh simple supported uniform shaft: ωc = π²√(EI/ρAL⁴) */
  const ωc = Math.PI ** 2 * Math.sqrt((E * I) / (m_per_L * L ** 4))
  const nc_rpm = ωc * 60 / (2 * Math.PI)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Velocidad crítica de flexión (Rayleigh)</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Resonancia = deflexión → fractura instantánea</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Velocidad crítica (eje uniforme apoyado)" eq="ωc = π²√(EI / ρAL⁴)" color={C} />
          <FormulaBox label="Método de Rayleigh-Ritz (masas discretas)" eq="ωc = √(g·Σwiyi / Σwiy²i)" color="var(--accent)" />
          <Slider label="Longitud L" unit="mm" value={L} min={200} max={2000} step={50} onChange={setL} color={C} />
          <Slider label="Diámetro d" unit="mm" value={d} min={10} max={120} step={2} onChange={setD} color="var(--warning)" />
          <Slider label="E — Módulo elástico" unit="MPa" value={E} min={70000} max={210000} step={1000} onChange={setE} color="var(--accent)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Velocidad crítica</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 700, color: C }}>{nc_rpm.toFixed(0)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>RPM</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            I = πd⁴/64 = {I.toFixed(0)} mm⁴<br />
            ωc = {ωc.toFixed(2)} rad/s<br />
            Operar a N_op ≤ 0.7·{nc_rpm.toFixed(0)} = {(0.7 * nc_rpm).toFixed(0)} RPM
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo resuelto ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Datos', text: 'Eje AISI 1045 HR: Sut=570 MPa, Sy=310 MPa. Soporta polea (V-belt): Fr=2.5 kN, Ft=1.0 kN. Transmite T=180 N·m. Longitud L=400mm, apoyos A y D.' },
    { label: 'Diagramas V-M', text: 'Trazar diagrama de cuerpo libre → reacciones en apoyos. Calcular Ma_max en sección crítica (hombro): Ma = 84 N·m.' },
    { label: 'Se modificado', text: 'Se = 0.5·570=285, ka=0.89, kb=0.85, ke=0.868 → Se = 285·0.89·0.85·0.868 = 187 MPa.' },
    { label: 'Aplicar ASME-E con n=2', text: 'd = [32·2/π · √((1.8·84000/187)² + ¾(1.5·180000/310)²)]^⅓ = 38.4 mm → usar d = 40 mm estándar.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Ejemplo resuelto — diseño de eje de transmisión</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Eje AISI 1045 con polea de correa</h2>
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
  'Los ejes sufren flexión rotativa → estado de fatiga pura (σa = Mc/I, σm ≈ 0)',
  'Torsión de transmisión es usualmente constante → τm = Tc/J (no afecta directamente Se)',
  'ASME-Elliptic: d = [32n/π · √((KfMa/Se)² + ¾(KfsTm/Sy)²)]^⅓ — ecuación de diseño directa',
  'Concentradores Kf son críticos en hombros, cuñeros y ranuras — nunca ignorarlos',
  'Velocidad crítica: N_op ≤ 0.7·Nc — operar por debajo del 70% evita resonancia',
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
  { id: 1, title: 'Título', note: 'Los ejes son los elementos más críticos en transmisiones de potencia — fallan por fatiga rotatoria. Shigley dedica capítulo completo a su diseño.', Content: S1 },
  { id: 2, title: 'Cargas en ejes', revealCount: 4, note: 'Diagrama de cuerpo libre del eje completo es el primer paso. Cada fuerza externa (engranaje, polea, rodamiento) se debe incluir.', Content: S2 },
  { id: 3, title: 'Criterio ASME-Elliptic', note: 'La ecuación ASME-E combina la superficie de falla de la elipse DE (para σa) con fluencia (para τm). Es directa para obtener d.', Content: S3 },
  { id: 4, title: 'Calculadora diámetro', note: 'Demostrar: si n=2, Ma=150kN·mm, Tm=200kN·mm, Se=220MPa → d ≈ 46mm → seleccionar 50mm estándar.', Content: S4 },
  { id: 5, title: 'Concentradores', revealCount: 6, note: 'Pedir a los estudiantes que identifiquen todos los concentradores en un eje real. El cuñero es el más olvidado.', Content: S5 },
  { id: 6, title: 'Velocidad crítica', note: 'L⁴ en el denominador hace que la velocidad crítica caiga dramáticamente con ejes largos. Reducir L dividiendo con rodamientos intermedios.', Content: S6 },
  { id: 7, title: 'Ejemplo resuelto', revealCount: 4, note: 'Resolver completo en pizarrón con este ejemplo. El paso 3 (Se modificado) es donde más errores se cometen.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 7-1 a 7-15. Próxima clase: tornillos — la unión más común en ingeniería mecánica.', Content: S8 },
]

export default function Cap07SlidesPage() {
  return <PresentationShell chapterId={7} partColor={C} slides={SLIDES} />
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, color, fontWeight: 600, lineHeight: 1.4 }}>{eq}</div>
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
