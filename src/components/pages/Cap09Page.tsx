'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'

const C = 'var(--part-3)'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} style={{ fontSize: 22, fontWeight: 700, marginTop: 44, marginBottom: 16, color: C, scrollMarginTop: 80 }}>{children}</h2>
}
function FormulaBox({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderLeft: `3px solid ${C}`, borderRadius: 'var(--radius)', padding: '14px 18px', margin: '16px 0', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2, overflowX: 'auto' }}>{children}</div>
}
function ConceptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 18px', margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}
function PreguntaBlock({ text }: { text: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '12px 16px', margin: '12px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Pregúntate esto:</div>
      <p style={{ color: 'var(--text-1)', fontSize: 14, fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>"{text}"</p>
    </div>
  )
}
function OjoBlock({ text }: { text: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--danger)', borderLeft: '4px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', margin: '12px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>&#9888; Ojo aquí</div>
      <p style={{ color: 'var(--text-2)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  )
}
function p(text: string) {
  return <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>{text}</p>
}

function FigWeldSymbol() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 9-1/2/3 — Símbolos básicos de soldadura AWS</div>
      <svg viewBox="0 0 400 130" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
        <line x1="30" y1="70" x2="370" y2="70" stroke="var(--text-2)" strokeWidth="2" />
        <polygon points="370,70 360,64 360,76" fill="var(--text-2)" />
        <rect x="30" y="60" width="40" height="20" fill="none" stroke="var(--warning)" strokeWidth="1.5" rx="2" />
        <text x="50" y="56" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">símbolo</text>
        <line x1="30" y1="35" x2="30" y2="60" stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="12" y="40" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">acabado</text>
        <line x1="95" y1="28" x2="95" y2="60" stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="80" y="24" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">dim. garganta</text>
        <line x1="150" y1="35" x2="150" y2="60" stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="135" y="24" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">longitud</text>
        <line x1="220" y1="75" x2="220" y2="100" stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="205" y="110" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">cola (especificación)</text>
        <path d="M 220,70 Q 250,55 220,100" fill="none" stroke="var(--border-soft)" strokeWidth="0.5" />
        <rect x="230" y="80" width="40" height="15" fill="none" stroke="var(--border-soft)" strokeWidth="0.5" rx="1" />
        <text x="250" y="92" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">E7018</text>
        <text x="330" y="110" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">→ soldadura lado opuesto</text>
        <path d="M 280,70 L 320,70" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
        <circle cx="280" cy="70" r="6" fill="none" stroke="var(--text-3)" strokeWidth="1" />
        <text x="280" y="73" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">×</text>
        <text x="10" y="20" fill={C} fontSize="9" fontFamily="var(--font-mono)">Línea de referencia</text>
        <text x="280" y="16" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">Flecha → apunta a la junta</text>
      </svg>
    </div>
  )
}
function FigFilletWeld() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 9-4/5 — Garganta teórica vs real en soldadura de filete</div>
      <svg viewBox="0 0 340 150" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto' }}>
        <rect x="20" y="90" width="120" height="8" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="20" y="30" width="8" height="68" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <polygon points="28,90 28,38 80,90" fill="var(--accent)" opacity="0.2" stroke={C} strokeWidth="1.5" />
        <line x1="28" y1="90" x2="54" y2="64" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="28" y1="90" x2="28" y2="38" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2,2" />
        <text x="33" y="65" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)">t = 0.707·h</text>
        <text x="80" y="85" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">h (cateto)</text>
        <line x1="28" y1="38" x2="80" y2="90" stroke={C} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1="28" y1="38" x2="28" y2="90" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="1,2" />
        <line x1="28" y1="90" x2="80" y2="90" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="1,2" />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={50 + i * 3} cy={75 - i * 3} r="0.8" fill="var(--text-3)" />
        ))}
        <g transform="translate(160, 20)">
          <rect x="0" y="90" width="140" height="8" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
          <rect x="0" y="30" width="8" height="68" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
          <polygon points="8,90 8,38 80,90" fill="var(--accent)" opacity="0.2" stroke={C} strokeWidth="1.5" />
          <rect x="0" y="28" width="148" height="4" fill="var(--warning)" opacity="0.3" rx="1" />
          <text x="60" y="26" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">refuerzo (no cuenta)</text>
          <text x="80" y="115" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">t = espesor (soldadura a tope)</text>
        </g>
      </svg>
    </div>
  )
}
function FigWeldTable() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 9-8 — Propiedades geométricas de grupos de soldadura (Tabla 9-1)</div>
      <svg viewBox="0 0 420 180" style={{ width: '100%', maxWidth: 420, display: 'block', margin: '0 auto' }}>
        <g transform="translate(10, 10)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">1. Vertical</text>
          <line x1="10" y1="30" x2="10" y2="80" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="80" x2="40" y2="80" stroke="var(--text-2)" strokeWidth="1" />
          <text x="13" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">d</text>
          <text x="40" y="98" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">A = 0.707·h·d</text>
          <text x="40" y="110" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">Ju = d³/12</text>
        </g>
        <g transform="translate(140, 10)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">2. Dos verticales</text>
          <line x1="10" y1="30" x2="10" y2="80" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="30" x2="60" y2="80" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="80" x2="60" y2="80" stroke="var(--text-2)" strokeWidth="1" />
          <text x="28" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">b</text>
          <text x="13" y="55" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">d</text>
          <text x="72" y="55" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">Ju = d(3b²+d²)/6</text>
        </g>
        <g transform="translate(10, 100)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">4. U (rect. + fondo)</text>
          <line x1="10" y1="20" x2="10" y2="60" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="60" x2="60" y2="60" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="20" x2="60" y2="60" stroke="var(--warning)" strokeWidth="4" strokeLinecap="round" />
          <text x="28" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">b</text>
          <text x="10" y="35" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">d</text>
          <text x="72" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">Ju = (8b³+6bd²+d³)/12 − b⁴/(2b+d)</text>
        </g>
        <g transform="translate(230, 100)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">5. Marco cerrado b×d</text>
          <line x1="70" y1="20" x2="10" y2="20" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="60" x2="10" y2="20" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" />
          <line x1="10" y1="60" x2="70" y2="60" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="20" x2="70" y2="60" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" />
          <text x="28" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">b</text>
          <text x="6" y="35" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">d</text>
          <text x="80" y="42" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">Ju = (b+d)³/6</text>
        </g>
      </svg>
    </div>
  )
}

function WeldTorsionCalc() {
  const [F, setF] = useState(25000)
  const [l, setL] = useState(100)
  const [b, setB] = useState(56)
  const [h, setH] = useState(6)
  const [arm, setArm] = useState(110)
  const [Sy, setSy] = useState(250)

  const d = l
  const A = 0.707 * h * (2 * b + d)
  const Ju = (8 * b ** 3 + 6 * b * d ** 2 + d ** 3) / 12 - b ** 4 / (2 * b + d)
  const xbar = b ** 2 / (2 * b + d)
  const M = F * (arm + xbar)
  const r = Math.sqrt((d / 2) ** 2 + (b - xbar) ** 2)
  const J = 0.707 * h * Ju
  const tau_primary = F / A
  const tau_secondary = (M * r) / J
  const tau_total = Math.sqrt(tau_primary ** 2 + tau_secondary ** 2)
  const Ssy = 0.577 * Sy
  const n = Ssy / tau_total

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid ${C}`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Calculadora — Soldadura a Torsión (Voladizo)</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {[
          { label: 'F – Fuerza (N)', val: F, set: setF, min: 1000, max: 100000, step: 1000 },
          { label: 'l = d – Long. vert. (mm)', val: l, set: setL, min: 10, max: 400, step: 10 },
          { label: 'b – Long. horiz. (mm)', val: b, set: setB, min: 10, max: 200, step: 5 },
          { label: 'h – Cateto soldadura (mm)', val: h, set: setH, min: 3, max: 25, step: 1 },
          { label: 'Brazo de palanca (mm)', val: arm, set: setArm, min: 10, max: 500, step: 10 },
          { label: 'Sy – Metal base (MPa)', val: Sy, set: setSy, min: 100, max: 600, step: 10 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>{label}</label>
            <input type="range" min={min} max={max} step={step} value={val}
              onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginTop: 14 }}>
        {[
          { label: 'A garganta', value: `${A.toFixed(0)} mm²`, clr: 'var(--text-2)' },
          { label: "τ' primario", value: `${(tau_primary / 1e6).toFixed(2)} MPa`, clr: 'var(--accent)' },
          { label: "τ'' torsional", value: `${(tau_secondary / 1e6).toFixed(2)} MPa`, clr: 'var(--warning)' },
          { label: 'τ total', value: `${(tau_total / 1e6).toFixed(2)} MPa`, clr: 'var(--accent)' },
          { label: 'Ssy', value: `${Ssy.toFixed(0)} MPa`, clr: C },
          { label: 'n seguridad', value: n.toFixed(2), clr: n >= 2 ? 'var(--success)' : n >= 1 ? 'var(--warning)' : 'var(--danger)' },
        ].map(({ label, value, clr }) => (
          <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: clr }}>{value}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>τ' = V/A | τ'' = M·r/J | J = 0.707·h·Ju | n = 0.577·Sy / τ_total</p>
    </div>
  )
}

const sections = [
  { id: 's9-1', label: '9-1 Símbolos de soldadura' },
  { id: 's9-2', label: '9-2 Soldaduras a tope y filete' },
  { id: 's9-3', label: '9-3 Esfuerzos en torsión' },
  { id: 's9-4', label: '9-4 Esfuerzos en flexión' },
  { id: 's9-5', label: '9-5 Resistencia' },
  { id: 's9-6', label: '9-6 Carga estática' },
  { id: 's9-7', label: '9-7 Fatiga' },
  { id: 's9-8', label: '9-8 Soldadura por resistencia' },
  { id: 's9-9', label: '9-9 Adhesivos' },
]

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const problems = [
    {
      num: 1,
      enunciado: 'Una soldadura de filete de cateto h = 10 mm y longitud l = 150 mm soporta una carga F = 30 kN en cortante directo. El metal base tiene Sy = 250 MPa. Calcular el esfuerzo cortante τ y el factor de seguridad n.',
      respuesta: 'τ = F / (0.707·h·l) = 30000 / (0.707×10×150) = 28.3 MPa\nSsy = 0.577×250 = 144.3 MPa\nn = Ssy / τ = 144.3 / 28.3 = 5.1 → satisfactorio.',
    },
    {
      num: 2,
      enunciado: 'Un voladizo soldado tiene grupo tipo U: b = 50 mm, d = 100 mm, cateto h = 6 mm. Fuerza F = 20 kN a brazo de 120 mm. Metal base Sy = 280 MPa. Usa la calculadora para obtener τ\', τ\'\', τ_total y n.',
      respuesta: 'Configurar: F=20000, l=100, b=50, h=6, arm=120, Sy=280. Resultados: A≈848 mm², τ\'≈23.6 MPa, τ\'\'≈46 MPa, τ_total≈52 MPa, Ssy=161.6 MPa, n≈3.1.',
    },
    {
      num: 3,
      enunciado: 'Para el problema anterior, ¿cuál es el cateto mínimo h para obtener n ≥ 2?',
      respuesta: 'τ_total_req = Ssy/n = 161.6/2 = 80.8 MPa\nτ_total ∝ 1/h, entonces h_req = h_act × (τ_act/τ_req) = 6 × (52/80.8) = 3.86 mm... ¡CUIDADO! A menor h, mayor τ. La relación es inversa: h_req = h_act × (τ_act/τ_req) es correcta SOLO si τ_act < τ_req. En este caso τ_act=52 < τ_req=80.8, entonces h_req = 6 × (52/80.8) = 3.86 mm no tiene sentido (cateto menor da más esfuerzo). La fórmula correcta: τ_total ∝ 1/h, asi que si queremos τ=80.8 y tenemos τ=52 con h=6, necesitamos h = 6 × (52/80.8)^(-1) = 6 × (80.8/52) = 9.32 mm. Usar h = 10 mm.',
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Práctica — Capítulo 9</h2>
      {problems.map(p => (
        <div key={p.num} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, fontWeight: 700 }}>PROBLEMA {p.num}</span>
              <p style={{ marginTop: 6, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{p.enunciado}</p>
            </div>
            <button onClick={() => toggle(p.num)} style={{ flexShrink: 0, padding: '6px 14px', background: show.includes(p.num) ? C : 'var(--bg-2)', color: show.includes(p.num) ? 'white' : 'var(--text-2)', border: `1px solid ${C}`, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {show.includes(p.num) ? 'Ocultar' : 'Ver respuesta'}
            </button>
          </div>
          {show.includes(p.num) && (
            <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.8, borderLeft: `3px solid ${C}`, whiteSpace: 'pre-line' }}>
              {p.respuesta}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Cap09Page() {
  return (
    <ChapterShell chapterId={9} chapterNum="09" title="Soldadura, adhesión y uniones permanentes" subtitle="Análisis de esfuerzos en soldaduras de filete bajo carga directa, torsión y flexión. Resistencia estática y a la fatiga. Uniones con adhesivo." partNum={3} sections={sections} practica={<PracticaContent />}>

      <SectionTitle id="s9-1">9-1 Símbolos de soldadura</SectionTitle>
      <PreguntaBlock text="¿Cómo lee un ingeniero los jeroglíficos de la soldadura? Los símbolos AWS son el lenguaje universal para decirle al soldador qué hacer, dónde y cómo." />
      {p('Los símbolos de soldadura (AWS) especifican el tipo, tamaño, ubicación y acabado de cada soldadura en los planos. La flecha apunta a la unión que se va a soldar. El símbolo se apoya en una línea de referencia horizontal, y la cola (cola de flecha) contiene la especificación del proceso o electrodo.')}
      <FigWeldSymbol />
      <ConceptBlock title="Tipos básicos de soldadura">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 6, fontSize: 12 }}>
          {[['Cordón (bead)','Sin biselamiento'],['Filete (fillet)','Más común en máquinas'],
            ['Tapón (plug)','Ranura circular'],['Cuadrada','Tope delgado'],
            ['En V','Tope mediano'],['En U/J','Tope grueso']].map(([t,d])=>(
            <div key={t} style={{ padding: '6px 8px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontWeight: 600 }}>{t}</span><br/><span style={{ color: 'var(--text-3)', fontSize: 11 }}>{d}</span>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <SectionTitle id="s9-2">9-2 Soldaduras a tope y de filete</SectionTitle>
      <PreguntaBlock text="¿Por qué una soldadura de 10 mm de cateto NO es de 10 mm de garganta? Porque la garganta está a 45° y mide 0.707 × cateto." />
      {p('En soldaduras a tope, la garganta h es el espesor de la pieza más delgada. En soldaduras de filete (las más comunes en maquinaria), la garganta efectiva es 0.707·h para filetes de 45°. Toda la carga se modela como cortante en el área mínima de la garganta.')}
      <FigFilletWeld />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div><strong>Soldadura a tope:</strong> σ = F / (h·l) | τ = F / (h·l)</div>
          <div style={{ marginTop: 4 }}><strong>Soldadura de filete:</strong> τ = F / (0.707·h·l) = 1.414·F / (h·l)</div>
        </div>
      </FormulaBox>
      <OjoBlock text="Error típico: usar el cateto h como área resistente. La garganta mide 0.707·h porque la sección de falla está a 45°. Ignorar esto sobrestima la resistencia en ~41%." />

      <SectionTitle id="s9-3">9-3 Esfuerzos en uniones soldadas sujetas a torsión</SectionTitle>
      <PreguntaBlock text="¿Cómo se calcula un voladizo soldado que recibe una carga excéntrica? Hay dos componentes: cortante directo y cortante torsional." />
      {p('Una conexión en voladizo genera <strong>cortante primario</strong> τ\' (la fuerza cortante V dividida entre el área total de gargantas) y <strong>cortante secundario</strong> τ\'\' (el momento torsor M aplicado al grupo de soldadura). Se combinan vectorialmente:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>τ\' = V / A &emsp; (A = área total de gargantas)</div>
          <div>τ\'\' = M·r / J &emsp; (M = momento, r = distancia al centroide)</div>
          <div>J = 0.707·h·J<sub>u</sub> &emsp; (J<sub>u</sub> = segundo momento polar unitario)</div>
          <div>τ<sub>total</sub> = √(τ\'² + τ\'\'²) &emsp; (combinación vectorial)</div>
        </div>
      </FormulaBox>
      <FigWeldTable />
      <WeldTorsionCalc />

      <SectionTitle id="s9-4">9-4 Esfuerzos en uniones soldadas sujetas a flexión</SectionTitle>
      {p('Cuando el momento flexiona el grupo de soldadura, se genera un cortante secundario por flexión τ\'\' = M·c / I, donde I = 0.707·h·Iu. Se combina con el cortante primario para obtener el esfuerzo máximo:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>I = 0.707·h·I<sub>u</sub> &emsp; (I<sub>u</sub> = segundo momento unitario)</div>
          <div>τ\'\' = M·c / I &emsp; n = S<sub>sy</sub> / τ<sub>max</sub> = 0.577·S<sub>y</sub> / τ<sub>max</sub></div>
        </div>
      </FormulaBox>
      <OjoBlock text="En flexión, el punto crítico suele estar en la fibra extrema más alejada del centroide. No asumas que el máximo está siempre en la esquina; calcula el vector combinado." />

      <SectionTitle id="s9-5">9-5 Resistencia de las uniones soldadas</SectionTitle>
      <PreguntaBlock text="¿El electrodo E7018 es más resistente que el E6010? El número nos dice la resistencia mínima: E70xx = 70 ksi, E60xx = 60 ksi." />
      {p('La resistencia de una soldadura depende del metal de aporte (electrodo) y del metal base. Los dos primeros dígitos del electrodo indican Sut mínimo en ksi. Según AWS:')}
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th style={{ padding: '6px 10px' }}>Electrodo</th><th style={{ padding: '6px 10px' }}>Sut (kpsi)</th>
              <th style={{ padding: '6px 10px' }}>Sy (kpsi)</th><th style={{ padding: '6px 10px' }}>τ<sub>perm</sub> (kpsi)</th>
            </tr>
          </thead>
          <tbody>
            {[['E6010','62','50','18'],['E6013','60','48','18'],['E7014','72','60','21'],['E7018','70','57','21'],['E8018','80','67','24']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormulaBox>
        τ<sub>perm</sub> = 0.3·S<sub>ut</sub> (metal de aporte) | τ<sub>perm</sub> = 0.4·S<sub>y</sub> (metal base)
      </FormulaBox>

      <SectionTitle id="s9-6">9-6 Carga estática</SectionTitle>
      {p('El procedimiento completo para verificar una soldadura bajo carga estática:')}
      <ol style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, marginBottom: 12 }}>
        <li>Determinar el patrón de soldadura y su centroide</li>
        <li>Calcular cargas V (cortante) y M (torsión o flexión)</li>
        <li>Calcular τ\' y τ\'\' usando A, J o I unitarios</li>
        <li>Combinar vectorialmente para τ<sub>max</sub></li>
        <li>Verificar frente al metal de aporte (τ<sub>perm</sub> = 0.3·S<sub>ut</sub>) y metal base (τ<sub>perm</sub> = 0.4·S<sub>y</sub>)</li>
      </ol>
      <FormulaBox>
        n = S<sub>sy</sub> / τ<sub>max</sub> = 0.577·S<sub>y</sub> / τ<sub>max</sub>
      </FormulaBox>

      <SectionTitle id="s9-7">9-7 Carga de fatiga</SectionTitle>
      <PreguntaBlock text="¿La soldadura resiste bien la fatiga? La respuesta corta es NO. Las soldaduras tienen concentradores de esfuerzo geométricos y tensiones residuales. Por eso los factores Kf son altos." />
      {p('Para fatiga en soldaduras aplicamos el enfoque de Marin con factores adicionales. El factor de concentración Kfs para filetes es típicamente 2.7 (carga reversible) o 2.0 (carga repetida). La superficie se asume como forjada (ka bajo).')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>S<sub>se</sub> = k<sub>a</sub>·k<sub>b</sub>·k<sub>c</sub>·0.5·S<sub>ut</sub> &emsp; (k<sub>a</sub> = superficie forjada)</div>
          <div>τ\'<sub>a</sub> = K<sub>fs</sub>·F<sub>a</sub> / A</div>
          <div>n<sub>f</sub> = S<sub>se</sub> / τ\'<sub>a</sub> &emsp; (si solo hay componente alternante)</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Categorías de detalle AWS (A a F) para fatiga en soldaduras">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '4px 8px', textAlign: 'left' }}>Cat.</th>
              <th style={{ padding: '4px 8px', textAlign: 'left' }}>Descripción</th>
              <th style={{ padding: '4px 8px', textAlign: 'left' }}>K<sub>fs</sub></th>
            </tr></thead>
            <tbody>
              {[
                ['A', 'Soldadura a tope mecanizada, sin refuerzo', '1.0'],
                ['B', 'Soldadura a tope con refuerzo ≤ 3 mm', '1.2'],
                ['C', 'Soldadura de filete transversal', '1.5'],
                ['D', 'Soldadura de filete longitudinal, extremo de cordón', '2.0'],
                ['E', 'Soldadura de filete con refuerzo grueso', '2.7'],
                ['F', 'Soldadura en T, raíz no mecanizada', '3.0+'],
              ].map(([cat, desc, kf], i) => (
                <tr key={cat} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                  <td style={{ padding: '3px 8px', fontWeight: 700, color: C }}>{cat}</td>
                  <td style={{ padding: '3px 8px' }}>{desc}</td>
                  <td style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)' }}>{kf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ConceptBlock>

      <SectionTitle id="s9-8">9-8 Soldadura por resistencia</SectionTitle>
      {p('La <strong>soldadura de puntos</strong> y la <strong>soldadura de costura</strong> usan calor eléctrico por resistencia sin metal de aporte. Las uniones deben diseñarse para cortante puro, no tensión. La resistencia se especifica como carga por punto según el espesor de la lámina más delgada.')}
      <ConceptBlock title="Soldadura de punto (spot weld)">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li>Falla típica: cortante del punto o desgarramiento del metal base</li>
          <li>Se recomienda factor de seguridad mayor que en pernos/remaches</li>
          <li>No usar en tensión directa — el punto se desprende</li>
        </ul>
      </ConceptBlock>

      <SectionTitle id="s9-9">9-9 Uniones con adhesivo</SectionTitle>
      <PreguntaBlock text="¿Cómo es posible que el pegamento estructural reemplace remaches en aviones? Los adhesivos modernos distribuyen la carga en toda el área, eliminando concentradores de esfuerzo." />
      {p('Los adhesivos estructurales (epóxicos, acrílicos, poliuretanos) ofrecen ventajas importantes: reducción de peso, distribución uniforme de carga, sellado, y resistencia a la fatiga y corrosión. La preparación superficial es crítica para la adhesión.')}
      <ConceptBlock title="Tipos de adhesivos">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6, fontSize: 12 }}>
          {[
            ['Estructurales (epóxicos)', 'Alta resistencia, aeroespacial'],
            ['Semiestructurales', 'Resistencia moderada'],
            ['Contacto (caucho)', 'Cubrir, secar, unir'],
            ['Sensibles a presión', 'Cintas, módulo bajo'],
            ['Fusión caliente', 'Termoplásticos, en caliente'],
            ['Anaeróbicos', 'Fijación de tornillos (Loctite)'],
          ].map(([t,d])=>(
            <div key={t} style={{ padding: 6, background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: 11 }}>{t}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 11 }}>{d}</div>
            </div>
          ))}
        </div>
      </ConceptBlock>
      <OjoBlock text="Los adhesivos fallan catastróficamente en pelado (peel). Siempre diseñar la junta para que trabaje en cortante o tensión, nunca en pelado. Una buena regla: superposición ≥ 3× el espesor de la pieza más delgada." />

      <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Resumen — Fórmulas clave</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, fontSize: 12 }}>
          {[
            ['Filete (cortante)', 'τ = F/(0.707·h·l)'],
            ["Cortante primario", "τ' = V/A"],
            ["Cortante torsional", "τ'' = M·r/J"],
            ['Polar unitario', 'J = 0.707·h·Ju'],
            ["Combinación", "τ = √(τ'²+τ''²)"],
            ['Factor seg. estático', 'n = 0.577·Sy / τ'],
          ].map(([name, formula]) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{name}</span>
              <code style={{ fontSize: 11, background: 'var(--bg-1)', padding: '4px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{formula}</code>
            </div>
          ))}
        </div>
      </div>

    </ChapterShell>
  )
}
