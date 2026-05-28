'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const COLOR = 'var(--part-1)'
const C = '#3B82F6'

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 2 · Parte 1 — Fundamentos
      </div>
      <h1 style={{ fontSize: 'clamp(38px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: C }}>Materiales</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Propiedades mecánicas · Diagrama σ-ε · Selección de materiales
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Sut, Sy', 'Módulo E', 'Dureza', 'Ductilidad', 'Fatiga'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Propiedades mecánicas ── */
const MAT_DATA = [
  { name: 'AISI 1020 CD', E: 207, Sy: 380, Sut: 470, eps: 15, HB: 131 },
  { name: 'AISI 4340', E: 207, Sy: 470, Sut: 745, eps: 22, HB: 217 },
  { name: 'Al 6061-T6', E: 68.9, Sy: 276, Sut: 310, eps: 12, HB: 95 },
  { name: 'Ti-6Al-4V', E: 114, Sy: 830, Sut: 900, eps: 14, HB: 334 },
]

function S2({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>Propiedades mecánicas</Eyebrow>
      <h2 style={H2}>Tabla comparativa de materiales comunes</h2>
      <div style={{ overflowX: 'auto', marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
              {['Material', 'E [GPa]', 'Sy [MPa]', 'Sut [MPa]', 'ε_f [%]', 'HB'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MAT_DATA.map((m, i) => (
              <tr key={m.name} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-2)', opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.35s' }}>
                <td style={{ padding: '10px 14px', color: C, fontWeight: 600 }}>{m.name}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-2)' }}>{m.E}</td>
                <td style={{ padding: '10px 14px', color: 'var(--warning)' }}>{m.Sy}</td>
                <td style={{ padding: '10px 14px', color: 'var(--danger)' }}>{m.Sut}</td>
                <td style={{ padding: '10px 14px', color: 'var(--success)' }}>{m.eps}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-2)' }}>{m.HB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
        Sut = resistencia última · Sy = fluencia · E = módulo de Young · ε_f = elongación en fractura
      </div>
    </div>
  )
}

/* ── Slide 3 — Diagrama σ-ε ── */
function S3({ revealed }: { revealed: number }) {
  const W = 580, H = 340
  const cx = 60, cy = H - 40
  const pts = [
    [0, 0], [60, 120], [70, 122], [100, 130], [160, 128], [220, 145], [280, 160], [330, 140]
  ].map(([x, y]) => [cx + x, cy - y])

  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Diagrama esfuerzo-deformación</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>σ vs ε — curva característica del acero</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center' }}>
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%">
            {/* Grid */}
            {[60, 120, 180, 240, 300].map(y => (
              <line key={y} x1={cx} y1={cy - y} x2={W - 20} y2={cy - y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            {/* Axes */}
            <line x1={cx} y1={20} x2={cx} y2={cy} stroke="var(--text-3)" strokeWidth="1.5" />
            <line x1={cx} y1={cy} x2={W - 20} y2={cy} stroke="var(--text-3)" strokeWidth="1.5" />
            <text x={cx - 8} y={16} fill="var(--text-2)" fontSize="12" fontFamily="monospace" textAnchor="middle">σ</text>
            <text x={W - 14} y={cy + 4} fill="var(--text-2)" fontSize="12" fontFamily="monospace" textAnchor="middle">ε</text>

            {/* Curve */}
            <path d={path} fill="none" stroke={C} strokeWidth="2.5" />

            {/* Key points */}
            <circle cx={pts[1][0]} cy={pts[1][1]} r="5" fill="var(--warning)" />
            <text x={pts[1][0] + 8} y={pts[1][1] - 6} fill="var(--warning)" fontSize="11" fontFamily="monospace">Sy</text>
            <circle cx={pts[6][0]} cy={pts[6][1]} r="5" fill="var(--danger)" />
            <text x={pts[6][0] + 8} y={pts[6][1] - 6} fill="var(--danger)" fontSize="11" fontFamily="monospace">Sut</text>
            <circle cx={pts[7][0]} cy={pts[7][1]} r="5" fill="var(--text-3)" />
            <text x={pts[7][0] + 8} y={pts[7][1] + 4} fill="var(--text-3)" fontSize="11" fontFamily="monospace">frac.</text>

            {/* Slope label */}
            <text x={cx + 22} y={cy - 60} fill={C} fontSize="11" fontFamily="monospace">E = σ/ε</text>
            <line x1={cx + 5} y1={cy - 8} x2={cx + 52} y2={cy - 100} stroke={C} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { zone: 'Zona elástica', desc: 'Deformación recuperable. La Ley de Hooke aplica: σ = Eε', color: C },
            { zone: 'Punto de fluencia', desc: 'Sy — el material empieza a deformarse permanentemente', color: 'var(--warning)' },
            { zone: 'Zona plástica', desc: 'Endurecimiento por deformación. No recuperable al retirar carga', color: 'var(--text-2)' },
            { zone: 'Resistencia última', desc: 'Sut — esfuerzo máximo soportable (inicio de estricción)', color: 'var(--danger)' },
          ].map((z, i) => (
            <div key={i} style={{ padding: '10px 14px', background: 'var(--bg-2)', borderLeft: `3px solid ${z.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', animation: 'fadeIn 0.4s ease both', animationDelay: `${i * 0.1}s` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: z.color, marginBottom: 2 }}>{z.zone}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{z.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Ley de Hooke y módulo E ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Comportamiento elástico</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 28 }}>Ley de Hooke y módulo de Young</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Ley de Hooke (axial)" eq="σ = E · ε" color={C} />
          <FormulaBox label="Ley de Hooke (cortante)" eq="τ = G · γ" color="var(--success)" />
          <FormulaBox label="Módulo de corte" eq="G = E / [2(1 + ν)]" color="var(--warning)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '16px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Módulos de Young típicos</div>
            {[['Acero', '207 GPa'], ['Aluminio', '68.9 GPa'], ['Titanio', '114 GPa'], ['Cobre', '119 GPa']].map(([m, e]) => (
              <div key={m} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-1)', padding: '4px 0', borderBottom: '1px solid var(--border-soft)' }}>
                <span style={{ color: 'var(--text-2)' }}>{m}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: C }}>{e}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Razón de Poisson ν:</strong><br />
            ν = −ε_lat / ε_axial<br />
            Acero: ν ≈ 0.29 · Aluminio: ν ≈ 0.33
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Dureza ── */
function S5({ revealed }: { revealed: number }) {
  const [hb, setHb] = useState(200)
  const sut_kpsi = (0.495 * hb).toFixed(1)
  const sut_mpa = (3.41 * hb).toFixed(0)
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Dureza y resistencia</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Correlación HB → Sut (acero)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <FormulaBox label="Relación empírica (HB ≤ 400)" eq="Sut ≈ 0.5·HB [kpsi]" color={C} />
          <FormulaBox label="En unidades SI" eq="Sut ≈ 3.41·HB [MPa]" color="var(--success)" style={{ marginTop: 12 }} />
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase' }}>Escalas de dureza</div>
            {[['Brinell (HB)', 'Esfera de acero o carburo, carga 3000 kg'], ['Rockwell (HRC)', 'Cono diamante, cargas estandarizadas'], ['Vickers (HV)', 'Pirámide diamante, amplio rango']].map(([s, d]) => (
              <div key={s} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 12 }}>
                <strong style={{ color: 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>{s}:</strong>
                <span style={{ color: 'var(--text-2)', marginLeft: 8 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>
              <span>Dureza Brinell (HB)</span>
              <span style={{ color: C }}>{hb}</span>
            </div>
            <input type="range" min={100} max={400} value={hb} onChange={e => setHb(+e.target.value)} style={{ width: '100%', accentColor: C }} />
          </div>
          <ResultCard label="Sut estimado [kpsi]" value={sut_kpsi} color={C} />
          <ResultCard label="Sut estimado [MPa]" value={sut_mpa} color="var(--success)" />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.6 }}>
            Válida para aceros con HB ≤ 400. Error ± 5%. No aplica a aluminio o fundiciones.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Materiales ferrosos y clasificación ── */
const MATS = [
  { cat: 'Aceros al carbono', ex: 'AISI 1020, 1040, 1080', prop: 'Económicos. Alto Sut a costo de ductilidad. Tratables.', color: C },
  { cat: 'Aceros aleados', ex: 'AISI 4140, 4340, 8620', prop: 'Cr, Mo, Ni mejoran templabilidad y resistencia a fatiga.', color: 'var(--success)' },
  { cat: 'Aceros inoxidables', ex: '304, 316, 17-4 PH', prop: 'Resistencia a corrosión. Menor Sy que aleados convencionales.', color: 'var(--warning)' },
  { cat: 'Aluminio', ex: '6061-T6, 7075-T6', prop: 'Alta relación resistencia/peso. Sin límite de fatiga definido.', color: 'var(--danger)' },
  { cat: 'Titanio', ex: 'Ti-6Al-4V', prop: 'E/2 del acero pero Sy similar. Aeroespacial y biomédico.', color: 'var(--part-4)' },
  { cat: 'Fundición gris', ex: 'ASTM A48 Clase 20', prop: 'Buena amortiguación. Frágil a tensión. Bajo costo, fundible.', color: 'var(--text-3)' },
]

function S6({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>Clasificación de materiales</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Materiales metálicos en diseño mecánico</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {MATS.map((m, i) => (
          <div key={m.cat} style={{ padding: '14px 16px', background: 'var(--bg-2)', border: `1px solid var(--border)`, borderTop: `3px solid ${m.color}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.18, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: m.color, marginBottom: 4 }}>{m.cat}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>{m.ex}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{m.prop}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo: selección ── */
const SEL_STEPS = [
  { label: 'Requisito', val: 'Sy ≥ 300 MPa, ductilidad ≥ 10%, menor peso posible' },
  { label: 'Candidatos', val: 'AISI 1040 CD: Sy=490 MPa, ε=12% · Al 6061-T6: Sy=276 MPa ← descartado' },
  { label: 'Criterio rigidez', val: 'Si deflexión limita: E·I debe ser igual ⟹ sección mayor en Al' },
  { label: 'Selección', val: 'AISI 1040 CD: cumple Sy=490 > 300, ε=12 > 10. Razón E/ρ = 26.5' },
]

function S7({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Badge color={C}>Ejemplo 2-1</Badge>
        <Badge color="var(--success)">Selección de material</Badge>
      </div>
      <h2 style={{ ...H2, marginBottom: 16 }}>Eje de transmisión: ¿acero o aluminio?</h2>
      <div style={{ padding: '14px 20px', background: 'var(--bg-2)', borderLeft: `3px solid ${C}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: 20, fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
        Un eje de transmisión debe tener Sy ≥ 300 MPa y ductilidad ≥ 10%. Se desea minimizar el peso. Opciones: AISI 1040 CD y Aluminio 6061-T6.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SEL_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? 'var(--success)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.18, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', minWidth: 80, paddingTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'Sy (fluencia) controla el diseño estático; Sut (fractura) controla la seguridad última',
  'E determina la rigidez — para reducir deflexión, aumentar I (sección), no E',
  'La dureza HB permite estimar Sut sin ensayo de tracción: Sut ≈ 3.41·HB MPa',
  'La ductilidad mínima ≈ 5% es requerimiento básico para diseño con teorías dúctiles',
  'Los aceros aleados (4140, 4340) ofrecen mejor relación Sy/ρ que aceros al carbono',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, animation: 'fadeIn 0.4s ease both', animationDelay: `${i * 0.08}s` }}>
            <span style={{ color: 'var(--success)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.45 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Slides data ─── */
const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Comenzar preguntando: ¿qué diferencia a un material "resistente" de uno "rígido"? Introducir la distinción Sy/Sut vs E.', Content: S1 },
  { id: 2, title: 'Tabla de materiales', revealCount: 4, note: 'Ir revelando fila por fila. Discutir: ¿por qué el titanio, siendo menos rígido que el acero, se usa en aeronáutica? Respuesta: relación resistencia/densidad.', Content: S2 },
  { id: 3, title: 'Diagrama σ-ε', note: 'Hacer que los estudiantes identifiquen en el diagrama: zona elástica, punto de fluencia, Sut, zona de estricción. El diagrama es más informativo que cualquier tabla.', Content: S3 },
  { id: 4, title: 'Ley de Hooke', note: 'Enfatizar: E no cambia con tratamiento térmico para aceros. Lo que cambia es Sy. El temple hace más duro pero no más rígido.', Content: S4 },
  { id: 5, title: 'Dureza HB → Sut', note: 'Demostrar en vivo con el slider. Preguntar: si HB = 300, ¿cuánto vale Sut? Respuesta rápida de cabeza: 300 × 3.41 ≈ 1023 MPa.', Content: S5 },
  { id: 6, title: 'Clasificación de materiales', revealCount: 6, note: 'Mencionar que la fundición gris tiene Sut muy diferente a tensión vs compresión — esto complica las teorías de falla (capítulo 5).', Content: S6 },
  { id: 7, title: 'Ejemplo: selección', revealCount: 4, note: 'Resaltar que "más fuerte" no siempre significa mejor. Si deflexión controla, el Al requiría sección mayor y el peso podría igualar al acero.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 2-1 a 2-6 del libro. Tarea: buscar la ficha técnica de un acero AISI a elección e identificar todas las propiedades mecánicas.', Content: S8 },
]

export default function Cap02SlidesPage() {
  return <PresentationShell chapterId={2} partColor={C} slides={SLIDES} />
}

/* ─── Helpers ─── */
const H2: React.CSSProperties = { fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.025em', fontFamily: 'var(--font-mono)', marginBottom: 0, marginTop: 0, lineHeight: 1.15 }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>// {children}</div>
}

function FormulaBox({ label, eq, color, style }: { label: string; eq: string; color: string; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: '14px 18px', background: 'var(--bg-2)', border: `1px solid ${color}40`, borderRadius: 'var(--radius-sm)', ...style }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color, fontWeight: 600 }}>{eq}</div>
    </div>
  )
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', background: `${color}10`, border: `1px solid ${color}50`, borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color }}>{value}</div>
    </div>
  )
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return <span style={{ padding: '4px 12px', borderRadius: 999, background: `${color}18`, color, fontSize: 12, fontFamily: 'var(--font-mono)', border: `1px solid ${color}40` }}>{children}</span>
}
