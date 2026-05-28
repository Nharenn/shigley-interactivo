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
        Capítulo 1 · Parte 1 — Fundamentos
      </div>
      <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Introducción al<br /><span style={{ color: C }}>Diseño Mecánico</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Proceso iterativo · Factores de seguridad · Normas técnicas
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Proceso de diseño', 'Factor n', 'Normas', 'Ciclo de vida'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — El proceso de diseño ── */
const STEPS = [
  { n: '01', label: 'Identificar la necesidad', desc: 'Reconocer el problema o la oportunidad de mejora' },
  { n: '02', label: 'Definición del problema', desc: 'Establecer especificaciones: funcionales, de rendimiento y restricciones' },
  { n: '03', label: 'Síntesis', desc: 'Proponer soluciones conceptuales y seleccionar la más prometedora' },
  { n: '04', label: 'Análisis y optimización', desc: 'Evaluar la solución con cálculos de esfuerzo, deformación y fatiga' },
  { n: '05', label: 'Evaluación', desc: 'Verificar que cumple todas las especificaciones y normas' },
  { n: '06', label: 'Presentación', desc: 'Documentar y comunicar el diseño final al equipo y clientes' },
]

function S2({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>El proceso de diseño</Eyebrow>
      <h2 style={H2}>6 etapas fundamentales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 28 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            padding: '14px 16px',
            background: i < revealed ? `${C}10` : 'var(--bg-2)',
            border: `1px solid ${i < revealed ? C + '50' : 'var(--border)'}`,
            borderRadius: 'var(--radius-sm)',
            opacity: i <= revealed ? 1 : 0.25,
            transition: 'all 0.4s ease',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: i < revealed ? C : 'var(--text-3)', lineHeight: 1, minWidth: 32, transition: 'color 0.3s' }}>
              {s.n}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.45 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textAlign: 'right' }}>
        Shigley §1-1 · Proceso iterativo — regresar a pasos anteriores es normal
      </div>
    </div>
  )
}

/* ── Slide 3 — Factor de seguridad ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Factores de seguridad</Eyebrow>
      <h2 style={H2}>¿Por qué no diseñar al límite exacto?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 28, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Incertidumbre en cargas', color: 'var(--danger)' },
              { label: 'Variabilidad del material', color: 'var(--warning)' },
              { label: 'Imprecisión en análisis', color: 'var(--accent)' },
              { label: 'Consecuencias de falla', color: 'var(--success)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderLeft: `3px solid ${item.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.3s', fontSize: 14 }}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <FormulaCard label="Factor de seguridad estático" eq="n = Sd / σ" color={C} />
          <FormulaCard label="Resistencia / Esfuerzo aplicado" eq="n = Sut / σmax" color="var(--success)" style={{ marginTop: 12 }} />
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Valores típicos:</strong><br />
            n = 1.25–2 → diseño estático preciso<br />
            n = 2–4 → cargas variables, incertidumbre media<br />
            n &gt; 4 → seguridad crítica (estructuras)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Normas y estándares ── */
const NORMS = [
  { code: 'ASME', full: 'American Society of Mechanical Engineers', area: 'Presión, materiales, calderas' },
  { code: 'AGMA', full: 'American Gear Manufacturers Assoc.', area: 'Engranes y cajas de engranajes' },
  { code: 'AWS', full: 'American Welding Society', area: 'Soldadura y materiales de aporte' },
  { code: 'ASTM', full: 'American Society for Testing Materials', area: 'Propiedades y pruebas de materiales' },
  { code: 'ISO', full: 'International Org. for Standardization', area: 'Normas internacionales, tolerancias' },
  { code: 'ANSI', full: 'American National Standards Institute', area: 'Estándares nacionales EE.UU.' },
]

function S4({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>Normas y códigos técnicos</Eyebrow>
      <h2 style={H2}>El diseñador no trabaja solo</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 28 }}>
        {NORMS.map((n, i) => (
          <div key={n.code} style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.3s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: C, marginBottom: 4 }}>{n.code}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, lineHeight: 1.4 }}>{n.full}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{n.area}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
        Shigley §1-4 · El incumplimiento de normas puede anular seguros y crear responsabilidad legal
      </div>
    </div>
  )
}

/* ── Slide 5 — Tipos de carga ── */
const LOADS = [
  { type: 'Estática', symbol: 'F const', desc: 'Carga constante en el tiempo. Análisis con teorías de falla estática.', color: 'var(--success)' },
  { type: 'Dinámica', symbol: 'F(t)', desc: 'Varía con el tiempo de manera determinística. Impacto, vibración.', color: 'var(--warning)' },
  { type: 'Fatiga', symbol: 'σa, σm', desc: 'Ciclos de carga repetida. Causa falla por debajo de Sut. Curva S-N.', color: 'var(--danger)' },
  { type: 'Combinada', symbol: 'M + T + P', desc: 'Flexión + torsión + axial simultáneos. Requiere Von Mises.', color: C },
]

function S5({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>Tipos de carga en diseño</Eyebrow>
      <h2 style={H2}>La naturaleza de la carga define el análisis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }}>
        {LOADS.map((l, i) => (
          <div key={l.type} style={{ padding: '20px 22px', background: 'var(--bg-2)', border: `1px solid var(--border)`, borderLeft: `4px solid ${l.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.18, transition: 'opacity 0.35s, border-color 0.35s', }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-1)' }}>{l.type}</div>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: l.color, background: `${l.color}18`, padding: '2px 8px', borderRadius: 4 }}>{l.symbol}</code>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{l.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 6 — Calculadora factor de seguridad ── */
function S6({ revealed }: { revealed: number }) {
  const [Sy, setSy] = useState(250)
  const [sigma, setSigma] = useState(80)
  const n = Sy / sigma
  const safe = n >= 1.5
  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <Eyebrow>Calculadora en vivo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Factor de seguridad — n = Sy / σ</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Slider label="Sy — Resistencia a la fluencia" unit="MPa" value={Sy} min={100} max={600} onChange={setSy} color={C} />
          <Slider label="σ — Esfuerzo aplicado" unit="MPa" value={sigma} min={10} max={400} onChange={setSigma} color="var(--danger)" />
          <div style={{ padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.7 }}>
            n = {Sy} / {sigma}<br />
            n = <strong style={{ color: safe ? 'var(--success)' : 'var(--danger)', fontSize: 16 }}>{n.toFixed(3)}</strong>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ResultCard label="Factor de seguridad" value={n.toFixed(2)} color={safe ? 'var(--success)' : 'var(--danger)'} />
          <div style={{ padding: '14px 18px', background: safe ? 'var(--success-soft)' : 'var(--danger-soft)', border: `1px solid ${safe ? 'var(--success)' : 'var(--danger)'}`, borderRadius: 'var(--radius-sm)', fontSize: 13, color: safe ? 'var(--success)' : 'var(--danger)' }}>
            {safe ? `✓ SEGURO — Margen de ${((n - 1) * 100).toFixed(0)}% sobre fluencia` : `✗ INSEGURO — El esfuerzo supera la resistencia`}
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong>Interpretación:</strong><br />
            n &lt; 1 → falla inmediata<br />
            1 ≤ n &lt; 1.5 → marginal<br />
            1.5 ≤ n &lt; 3 → diseño normal<br />
            n ≥ 3 → diseño conservador
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo resuelto ── */
const EX_STEPS = [
  { eq: 'Datos: Sut = 420 MPa, Sy = 350 MPa', r: 'Material AISI 1040 HR' },
  { eq: 'Esfuerzo aplicado σ = 4F/(πd²)', r: 'Con F = 12 kN, d = 20 mm → σ = 38.2 MPa' },
  { eq: 'n_Sut = 420 / 38.2', r: 'n_Sut = 11.0' },
  { eq: 'n_Sy = 350 / 38.2', r: 'n_Sy = 9.16 ← controla' },
]

function S7({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Badge color={C}>Ejemplo 1-1</Badge>
        <Badge color="var(--warning)">Carga axial</Badge>
      </div>
      <h2 style={{ ...H2, marginBottom: 16 }}>Barra bajo tensión axial</h2>
      <div style={{ padding: '14px 20px', background: 'var(--bg-2)', borderLeft: `3px solid ${C}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: 20, fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
        Una barra circular de AISI 1040 HR (Sut = 420 MPa, Sy = 350 MPa) con diámetro d = 20 mm soporta una carga axial F = 12 kN. Calcule el factor de seguridad.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {EX_STEPS.map((s, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? 'var(--success)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 4 }}>Paso {i + 1}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{s.eq}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>✓ {s.r}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'El diseño es un proceso iterativo: la primera solución rara vez es la final',
  'El factor de seguridad n cuantifica el margen entre resistencia y esfuerzo',
  'Las normas (ASME, AGMA, ISO) son obligatorias, no opcionales',
  'Identificar el tipo de carga es el primer paso de cualquier análisis',
  'La incertidumbre en cargas y materiales justifica n > 1',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, animation: 'fadeIn 0.4s ease both', animationDelay: `${i * 0.08}s` }}>
            <span style={{ color: 'var(--success)', fontSize: 18, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.45 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Slides data ─── */
const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Comenzar preguntando: ¿qué hace diferente al ingeniero mecánico de un técnico? Respuesta: el proceso sistemático de diseño.', Content: S1 },
  { id: 2, title: 'Proceso de diseño', revealCount: 6, note: 'Ir revelando cada etapa y pedir a los estudiantes que identifiquen dónde están en un proyecto actual o pasado.', Content: S2 },
  { id: 3, title: 'Factor de seguridad', revealCount: 4, note: 'Enfatizar que n no es arbitrario: depende de consecuencias de falla. Ejemplos: puente vs. clip de papel.', Content: S3 },
  { id: 4, title: 'Normas y códigos', revealCount: 6, note: 'Mencionar que el desconocimiento de normas no es defensa legal. En consultoría y fábricas, las normas son ley.', Content: S4 },
  { id: 5, title: 'Tipos de carga', revealCount: 4, note: 'Preguntar: ¿un eje de transmisión qué tipos de carga experimenta? Respuesta: fatiga combinada con torsión y flexión.', Content: S5 },
  { id: 6, title: 'Calculadora n', note: 'Demostrar en vivo cómo un aumento del 20% en carga reduce n significativamente. Intuición: el denominador crece más rápido.', Content: S6 },
  { id: 7, title: 'Ejemplo 1-1', revealCount: 4, note: 'Resolver primero en pizarrón antes de revelar. Verificar unidades: N·m vs kN·mm son equivalentes.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 1-1 a 1-4 del libro. Próxima clase: propiedades de materiales y diagramas σ-ε.', Content: S8 },
]

export default function Cap01SlidesPage() {
  return <PresentationShell chapterId={1} partColor={C} slides={SLIDES} />
}

/* ─── Shared helpers ─── */
const H2: React.CSSProperties = {
  fontSize: 'clamp(22px, 3vw, 38px)',
  letterSpacing: '-0.025em',
  fontFamily: 'var(--font-mono)',
  marginBottom: 0, marginTop: 0, lineHeight: 1.15,
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
      // {children}
    </div>
  )
}

function FormulaCard({ label, eq, color, style }: { label: string; eq: string; color: string; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: '14px 18px', background: 'var(--bg-2)', border: `1px solid ${color}40`, borderRadius: 'var(--radius-sm)', ...style }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color, fontWeight: 600 }}>{eq}</div>
    </div>
  )
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{ padding: '4px 12px', borderRadius: 999, background: `${color}18`, color, fontSize: 12, fontFamily: 'var(--font-mono)', border: `1px solid ${color}40` }}>
      {children}
    </span>
  )
}

function Slider({ label, unit, value, min, max, onChange, color }: {
  label: string; unit: string; value: number; min: number; max: number; onChange: (v: number) => void; color: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>
        <span>{label}</span>
        <span style={{ color }}>{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: color }} />
    </div>
  )
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', background: `${color}10`, border: `1px solid ${color}50`, borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color }}>{value}</div>
    </div>
  )
}
