'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#3B82F6'

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 3 · Parte 1 — Fundamentos
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Análisis de<br /><span style={{ color: C }}>Carga y Esfuerzo</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        DCL · Diagramas V-M · Esfuerzos combinados · Círculo de Mohr
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Cortante', 'Momento', 'Kt', 'σ₁, σ₂', 'τmax'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Diagramas de Cuerpo Libre ── */
function S2({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Diagramas de Cuerpo Libre</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Primer paso en cualquier análisis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: '01', text: 'Aislar el cuerpo: dibujar contorno cerrado que separa el elemento del entorno', color: C },
              { n: '02', text: 'Mostrar todas las fuerzas externas: peso, reacciones, cargas aplicadas', color: 'var(--warning)' },
              { n: '03', text: 'Incluir momentos externos y pares de fuerzas', color: 'var(--success)' },
              { n: '04', text: 'Aplicar equilibrio: ΣF = 0, ΣM = 0', color: 'var(--danger)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid var(--border)`, borderLeft: `3px solid ${s.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: s.color, fontSize: 14, minWidth: 28 }}>{s.n}</span>
                <span style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Simple beam SVG */}
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 }}>
          <svg viewBox="0 0 280 200" width="100%">
            {/* Beam */}
            <rect x="30" y="90" width="220" height="14" fill={`${C}30`} stroke={C} strokeWidth="1.5" rx="2" />
            {/* Left support (pin) */}
            <polygon points="30,104 15,130 45,130" fill="var(--bg-3)" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="10" y1="130" x2="50" y2="130" stroke="var(--text-2)" strokeWidth="1.5" />
            {/* Right support (roller) */}
            <circle cx="250" cy="116" r="8" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="235" y1="130" x2="270" y2="130" stroke="var(--text-2)" strokeWidth="1.5" />
            {/* Load P */}
            <line x1="140" y1="60" x2="140" y2="88" stroke="var(--danger)" strokeWidth="2.5" markerEnd="url(#ar)" />
            <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="var(--danger)" /></marker></defs>
            <text x="148" y="76" fill="var(--danger)" fontSize="12" fontFamily="monospace" fontWeight="700">P</text>
            {/* Reactions */}
            <line x1="30" y1="140" x2="30" y2="112" stroke="var(--success)" strokeWidth="2" />
            <text x="16" y="155" fill="var(--success)" fontSize="11" fontFamily="monospace">RA</text>
            <line x1="250" y1="140" x2="250" y2="126" stroke="var(--success)" strokeWidth="2" />
            <text x="236" y="155" fill="var(--success)" fontSize="11" fontFamily="monospace">RB</text>
            {/* Labels */}
            <text x="100" y="80" fill="var(--text-3)" fontSize="10" fontFamily="monospace">L/2</text>
            <text x="176" y="80" fill="var(--text-3)" fontSize="10" fontFamily="monospace">L/2</text>
          </svg>
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
            Viga S.A. · RA = RB = P/2
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3 — Diagramas V-M ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Diagramas de cortante y momento</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Distribución interna de fuerzas y momentos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase' }}>Diagrama de cortante V(x)</div>
          <svg viewBox="0 0 240 120" width="100%">
            <line x1="20" y1="60" x2="220" y2="60" stroke="var(--text-3)" strokeWidth="1" />
            <text x="222" y="64" fontSize="10" fill="var(--text-2)" fontFamily="monospace">x</text>
            <text x="22" y="18" fontSize="10" fill="var(--warning)" fontFamily="monospace">V</text>
            {/* V diagram for central load: +P/2 left, -P/2 right */}
            <line x1="20" y1="60" x2="20" y2="22" stroke="var(--warning)" strokeWidth="2" />
            <line x1="20" y1="22" x2="120" y2="22" stroke="var(--warning)" strokeWidth="2" />
            <line x1="120" y1="22" x2="120" y2="98" stroke="var(--warning)" strokeWidth="2" />
            <line x1="120" y1="98" x2="220" y2="98" stroke="var(--warning)" strokeWidth="2" />
            <line x1="220" y1="98" x2="220" y2="60" stroke="var(--warning)" strokeWidth="2" />
            <text x="60" y="18" fontSize="9" fill="var(--warning)" fontFamily="monospace">+P/2</text>
            <text x="150" y="112" fontSize="9" fill="var(--warning)" fontFamily="monospace">−P/2</text>
          </svg>
        </div>
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase' }}>Diagrama de momento M(x)</div>
          <svg viewBox="0 0 240 120" width="100%">
            <line x1="20" y1="100" x2="220" y2="100" stroke="var(--text-3)" strokeWidth="1" />
            <text x="222" y="104" fontSize="10" fill="var(--text-2)" fontFamily="monospace">x</text>
            <text x="22" y="22" fontSize="10" fill={C} fontFamily="monospace">M</text>
            <line x1="20" y1="100" x2="120" y2="30" stroke={C} strokeWidth="2" />
            <line x1="120" y1="30" x2="220" y2="100" stroke={C} strokeWidth="2" />
            <line x1="120" y1="30" x2="120" y2="100" stroke="var(--text-3)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="108" y="26" fontSize="9" fill={C} fontFamily="monospace">PL/4</text>
          </svg>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)' }}>
          dV/dx = −w(x)
        </div>
        <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: C }}>
          dM/dx = V(x)
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Esfuerzos en sección transversal ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Esfuerzos en sección transversal</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Fórmulas fundamentales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'Esfuerzo normal (flexión)', eq: 'σ = M·c / I', note: 'c = distancia al eje neutro · I = inercia', color: C },
          { label: 'Esfuerzo cortante en viga', eq: 'τ = V·Q / (I·t)', note: 'Q = momento estático · t = ancho', color: 'var(--success)' },
          { label: 'Esfuerzo torsional', eq: 'τ = T·c / J', note: 'J = inercia polar · T = torque', color: 'var(--warning)' },
          { label: 'Esfuerzo axial', eq: 'σ = F / A', note: 'F axial · A = área de sección', color: 'var(--danger)' },
        ].map((f, i) => (
          <div key={i} style={{ padding: '16px 18px', background: 'var(--bg-2)', border: `1px solid ${f.color}40`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{f.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: f.color, fontWeight: 600, marginBottom: 6 }}>{f.eq}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{f.note}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: '10px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)' }}>
        Para sección circular: I = πd⁴/64 · J = πd⁴/32 · c = d/2
      </div>
    </div>
  )
}

/* ── Slide 5 — Concentración de esfuerzos ── */
function S5({ revealed }: { revealed: number }) {
  const [Kt, setKt] = useState(2.5)
  const [snom, setSnom] = useState(100)
  const smax = (Kt * snom).toFixed(1)
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Factor de concentración de esfuerzos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Discontinuidades amplifican el esfuerzo local</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div>
          <FormulaBox label="Definición" eq="σmax = Kt · σnom" color={C} />
          <div style={{ marginTop: 12, padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Kt depende de:</strong><br />
            • Geometría de la discontinuidad (ranura, agujero, filete)<br />
            • Relación D/d y r/d (radio de entalla)<br />
            • Tipo de carga (axial, flexión, torsión)<br /><br />
            <strong style={{ color: 'var(--text-1)' }}>Valores típicos:</strong><br />
            Agujero circular: Kt ≈ 3.0 · Filete r/d=0.1: Kt ≈ 1.5–2.0
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Slider label="Kt — Factor de concentración" unit="" value={Kt} min={1} max={5} step={0.1} onChange={setKt} color={C} />
          <Slider label="σnom — Esfuerzo nominal" unit="MPa" value={snom} min={20} max={300} onChange={setSnom} color="var(--warning)" />
          <ResultCard label="σmax = Kt · σnom" value={`${smax} MPa`} color="var(--danger)" />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            En diseño estático con materiales dúctiles, Kt puede despreciarse por redistribución plástica. En fatiga, siempre aplica (como Kf).
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Círculo de Mohr ── */
function computeMohr(sx: number, sy: number, txy: number) {
  const C = (sx + sy) / 2
  const R = Math.sqrt(((sx - sy) / 2) ** 2 + txy ** 2)
  const s1 = C + R, s2 = C - R, tmax = R
  const tp = 0.5 * Math.atan2(2 * txy, sx - sy) * 180 / Math.PI
  return { C, R, s1, s2, tmax, tp }
}

function MohrSVG({ sx, sy, txy }: { sx: number; sy: number; txy: number }) {
  const { C: ctr, R, s1, s2, tmax } = computeMohr(sx, sy, txy)
  const W = 300, H = 280, ox = 150, oy = 140
  const maxAbs = Math.max(Math.abs(s1), Math.abs(s2), Math.abs(tmax), 50)
  const rng = Math.ceil(maxAbs / 50) * 50 + 30
  const sc = 110 / rng
  const xP = (v: number) => ox + v * sc
  const yP = (v: number) => oy - v * sc
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%">
      <line x1="20" y1={oy} x2={W - 10} y2={oy} stroke="var(--text-3)" strokeWidth="1" />
      <line x1={ox} y1="10" x2={ox} y2={H - 10} stroke="var(--text-3)" strokeWidth="1" />
      <text x={W - 8} y={oy - 4} fontSize="11" fill="var(--text-2)" fontFamily="monospace">σ</text>
      <text x={ox + 5} y="16" fontSize="11" fill="var(--text-2)" fontFamily="monospace">τ</text>
      <circle cx={xP(ctr)} cy={oy} r={R * sc} fill={`${C}08`} stroke={C} strokeWidth="2" />
      <line x1={xP(sx)} y1={yP(txy)} x2={xP(sy)} y2={yP(-txy)} stroke="var(--text-2)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx={xP(sx)} cy={yP(txy)} r="5" fill="var(--danger)" />
      <circle cx={xP(sy)} cy={yP(-txy)} r="5" fill="#60A5FA" />
      <circle cx={xP(s1)} cy={oy} r="4" fill={C} />
      <circle cx={xP(s2)} cy={oy} r="4" fill={C} />
      <circle cx={xP(ctr)} cy={yP(tmax)} r="4" fill="var(--success)" />
      <text x={xP(s1) + 5} y={oy - 8} fontSize="10" fill={C} fontFamily="monospace">σ₁</text>
      <text x={xP(s2) - 18} y={oy - 8} fontSize="10" fill={C} fontFamily="monospace">σ₂</text>
      <text x={xP(ctr) + 5} y={yP(tmax) - 4} fontSize="10" fill="var(--success)" fontFamily="monospace">τmax</text>
    </svg>
  )
}

function S6({ revealed }: { revealed: number }) {
  const [sx, setSx] = useState(80)
  const [sy, setSy] = useState(-40)
  const [txy, setTxy] = useState(30)
  const { C: ctr, R, s1, s2, tmax, tp } = computeMohr(sx, sy, txy)
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Círculo de Mohr</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Simulador en vivo — esfuerzo plano</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Slider label="σx" unit="MPa" value={sx} min={-200} max={200} onChange={setSx} color="var(--danger)" />
          <Slider label="σy" unit="MPa" value={sy} min={-200} max={200} onChange={setSy} color="#60A5FA" />
          <Slider label="τxy" unit="MPa" value={txy} min={-150} max={150} onChange={setTxy} color="var(--success)" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontFamily: 'var(--font-mono)' }}>
            {[{ l: 'σ₁', v: s1.toFixed(1), c: C }, { l: 'σ₂', v: s2.toFixed(1), c: C }, { l: 'τmax', v: tmax.toFixed(1), c: 'var(--success)' }, { l: 'θp', v: tp.toFixed(1) + '°', c: 'var(--warning)' }].map(r => (
              <div key={r.l} style={{ padding: '8px 10px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase' }}>{r.l}</div>
                <div style={{ fontSize: 16, color: r.c, fontWeight: 600 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 12 }}>
          <MohrSVG sx={sx} sy={sy} txy={txy} />
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Fórmulas clave Círculo de Mohr ── */
function S7({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Fórmulas del Círculo de Mohr</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Esfuerzos principales y cortante máximo</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { label: 'Centro del círculo', eq: 'C = (σx + σy) / 2', color: 'var(--warning)' },
          { label: 'Radio del círculo', eq: 'R = √[((σx−σy)/2)² + τxy²]', color: C },
          { label: 'Esfuerzos principales', eq: 'σ₁ = C + R     σ₂ = C − R', color: 'var(--success)' },
          { label: 'Cortante máximo', eq: 'τmax = R', color: 'var(--danger)' },
          { label: 'Ángulo principal', eq: 'tan(2θp) = 2τxy / (σx − σy)', color: 'var(--part-4)' },
          { label: 'Planos de τmax', eq: 'θs = θp ± 45°', color: 'var(--text-2)' },
        ].map((f, i) => (
          <div key={i} style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderLeft: `4px solid ${f.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', animation: 'fadeIn 0.4s ease both', animationDelay: `${i * 0.08}s` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: f.color, fontWeight: 600 }}>{f.eq}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'El DCL es obligatorio: sin él, no hay análisis correcto',
  'La relación dV/dx = −w y dM/dx = V conecta las tres distribuciones',
  'El factor Kt amplifica el esfuerzo local en entallas — crítico en fatiga',
  'El centro del Círculo de Mohr está en σprom = (σx+σy)/2 siempre',
  'τmax = Radio del círculo · σ₁ y σ₂ están donde τ = 0',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
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

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Conectar con cap 2: ya conocemos los materiales, ahora necesitamos calcular los esfuerzos que experimentan.', Content: S1 },
  { id: 2, title: 'DCL', revealCount: 4, note: 'El error más común en examen: olvidar una reacción o una carga. El DCL previene errores de equilibrio.', Content: S2 },
  { id: 3, title: 'Diagramas V-M', note: 'Enfatizar la relación matemática entre w, V, M — la integral y la derivada. Hacer el diagrama a mano en pizarrón.', Content: S3 },
  { id: 4, title: 'Fórmulas de esfuerzo', revealCount: 4, note: 'La fórmula de flexión σ = Mc/I es la más usada en este libro. Memorizarla. El resto se puede derivar.', Content: S4 },
  { id: 5, title: 'Factor Kt', note: 'Demostrar con el slider cómo Kt = 3 triplica el esfuerzo. Preguntar: ¿por qué los ejes tienen filetes suaves y no aristas vivas?', Content: S5 },
  { id: 6, title: 'Simulador Mohr', note: 'Preguntar: ¿qué pasa si σx = σy? El círculo se reduce a un punto. ¿Y si τxy = 0? Los esfuerzos ya son principales.', Content: S6 },
  { id: 7, title: 'Fórmulas Mohr', note: 'Pedir a los estudiantes que deduzcan C y R del diagrama geométrico antes de mostrar las fórmulas.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 3-15 a 3-22. Próxima clase: deflexión en vigas y columnas.', Content: S8 },
]

export default function Cap03SlidesPage() {
  return <PresentationShell chapterId={3} partColor={C} slides={SLIDES} />
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color, fontWeight: 600 }}>{eq}</div>
    </div>
  )
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', background: `${color}10`, border: `1px solid ${color}50`, borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color }}>{value}</div>
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
        <span style={{ color }}>{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} style={{ width: '100%', accentColor: color }} />
    </div>
  )
}
