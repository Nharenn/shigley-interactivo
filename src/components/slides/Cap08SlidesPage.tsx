'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 8 · Parte 3 — Elementos de unión
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Tornillos y<br /><span style={{ color: C }}>Uniones No Permanentes</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Rosca · Precarga Fi · Rigidez Kb/Km · Factor de separación C
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Fi', 'Kb', 'Km', 'C', 'Sp', 'At'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Geometría de rosca ── */
function S2({ revealed }: { revealed: number }) {
  const params = [
    { sym: 'p', name: 'Paso', desc: 'Distancia entre filetes (mm)' },
    { sym: 'λ', name: 'Ángulo de avance', desc: 'tan λ = l/(πdm) — eficiencia depende de λ' },
    { sym: 'dm', name: 'Diámetro medio', desc: 'dm = (dmayor + dmenor)/2' },
    { sym: 'At', name: 'Área de esfuerzo a tracción', desc: 'At = π/4·[(dp+dr)/2]² — área efectiva' },
    { sym: 'φ', name: 'Ángulo de fricción', desc: "φ = arctan(μ/cos α') — α' para rosca unificada" },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Geometría de la rosca estándar</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Parámetros que gobiernan la eficiencia y resistencia</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {params.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${C}20`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: C, flexShrink: 0, width: 30 }}>{p.sym}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-1)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Perfil rosca ISO 60°</div>
          <svg viewBox="0 0 160 200" width="100%">
            {/* Tooth profile */}
            {[0, 1, 2, 3].map(i => (
              <g key={i}>
                <line x1="20" y1={20 + i * 45} x2="80" y2={50 + i * 45} stroke={C} strokeWidth="2" />
                <line x1="80" y1={50 + i * 45} x2="140" y2={20 + i * 45} stroke={C} strokeWidth="2" />
                {i < 3 && <line x1="140" y1={20 + i * 45} x2="140" y2={20 + (i + 1) * 45} stroke="var(--text-3)" strokeWidth="1" strokeDasharray="2 2" />}
                {i < 3 && <line x1="20" y1={20 + i * 45} x2="20" y2={20 + (i + 1) * 45} stroke="var(--text-3)" strokeWidth="1" strokeDasharray="2 2" />}
              </g>
            ))}
            {/* Annotations */}
            <text x="70" y="12" fontSize="9" fill={C} fontFamily="monospace" textAnchor="middle">p</text>
            <line x1="20" y1="8" x2="80" y2="8" stroke={C} strokeWidth="1" markerEnd="url(#arrow)" />
            <text x="148" y="36" fontSize="8" fill="var(--text-2)" fontFamily="monospace">dmayor</text>
            <text x="148" y="57" fontSize="8" fill="var(--text-2)" fontFamily="monospace">dmenor</text>
          </svg>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 8 }}>Ángulo de flancos α = 30° (UNC/ISO)</div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3 — Tornillos de potencia ── */
function S3({ revealed }: { revealed: number }) {
  const [F, setF] = useState(5000)
  const [dm, setDm] = useState(30)
  const [l, setL] = useState(8)
  const [mu, setMu] = useState(0.12)

  const lambda = Math.atan(l / (Math.PI * dm)) * 180 / Math.PI
  const phi = Math.atan(mu) * 180 / Math.PI
  const lambda_r = lambda * Math.PI / 180
  const phi_r = phi * Math.PI / 180
  const Tr = (F * dm / 2) * Math.tan(lambda_r + phi_r)
  const eta = (F * l) / (2 * Math.PI * Tr) * 100

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Tornillos de potencia — torque y eficiencia</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Levantar carga F con torque Tr</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Torque para levantar carga" eq="Tr = F·dm/2 · tan(λ+φ)" color={C} />
          <FormulaBox label="Eficiencia del tornillo" eq="η = Fl/(2πTr)" color="var(--accent)" />
          <Slider label="F — Carga axial" unit="N" value={F} min={500} max={50000} step={500} onChange={setF} color={C} />
          <Slider label="dm — Diámetro medio" unit="mm" value={dm} min={10} max={80} onChange={setDm} color="var(--warning)" />
          <Slider label="l — Avance" unit="mm" value={l} min={2} max={30} onChange={setL} color="var(--accent)" />
          <Slider label="μ — Coeficiente de fricción" unit="" value={mu} min={0.05} max={0.3} step={0.01} onChange={setMu} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '16px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Torque requerido</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: C }}>{(Tr / 1000).toFixed(2)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>N·m</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-2)', border: `1px solid ${eta > 50 ? 'var(--success)' : 'var(--warning)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Eficiencia η</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: eta > 50 ? 'var(--success)' : 'var(--warning)' }}>{eta.toFixed(1)}%</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            λ = {lambda.toFixed(2)}° · φ = {phi.toFixed(2)}°<br />
            λ+φ = {(lambda + phi).toFixed(2)}°<br />
            {lambda < phi ? '⚠ Autorretención — no baja solo' : '✓ No autorretención'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Precarga y rigidez ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Precarga y rigidez del conjunto atornillado</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La precarga Fi mantiene el ensamble bajo carga P</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Precarga recomendada (tornillo grado 8)" eq="Fi = 0.75 · At · Sp" color={C} />
          <FormulaBox label="Rigidez del tornillo" eq="kb = Ad·At·E / (Ad·lt + At·ld)" color="var(--accent)" />
          <FormulaBox label="Factor de rigidez C" eq="C = kb / (kb + km)" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Carga sobre el tornillo:</strong><br />
            Fb = Fi + C·P<br />
            <strong style={{ color: 'var(--text-1)' }}>Carga sobre la junta:</strong><br />
            Fm = Fi − (1−C)·P<br />
            Separación cuando Fm = 0 → P = Fi/(1−C)
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Modelo resorte paralelo</div>
            <svg viewBox="0 0 200 180" width="100%">
              {/* Bolt spring */}
              <line x1="80" y1="10" x2="80" y2="30" stroke={C} strokeWidth="2" />
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1={i % 2 === 0 ? 65 : 95} y1={30 + i * 14} x2={i % 2 === 0 ? 95 : 65} y2={30 + (i + 1) * 14} stroke={C} strokeWidth="2" />
              ))}
              <line x1="80" y1="100" x2="80" y2="120" stroke={C} strokeWidth="2" />
              <text x="104" y="70" fontSize="10" fill={C} fontFamily="monospace">kb</text>
              {/* Joint spring */}
              <line x1="130" y1="10" x2="130" y2="30" stroke="var(--warning)" strokeWidth="2" />
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1={i % 2 === 0 ? 115 : 145} y1={30 + i * 14} x2={i % 2 === 0 ? 145 : 115} y2={30 + (i + 1) * 14} stroke="var(--warning)" strokeWidth="2" />
              ))}
              <line x1="130" y1="100" x2="130" y2="120" stroke="var(--warning)" strokeWidth="2" />
              <text x="150" y="70" fontSize="10" fill="var(--warning)" fontFamily="monospace">km</text>
              {/* Common node top and bottom */}
              <line x1="60" y1="10" x2="160" y2="10" stroke="var(--text-2)" strokeWidth="2" />
              <line x1="60" y1="120" x2="160" y2="120" stroke="var(--text-2)" strokeWidth="2" />
              <text x="100" y="155" fontSize="10" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">P (carga externa)</text>
              <line x1="100" y1="120" x2="100" y2="145" stroke="var(--danger)" strokeWidth="2" markerEnd="url(#arr)" />
            </svg>
          </div>
          <div style={{ padding: '10px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
            C típico: 0.15–0.35 (metal-metal)<br />
            Juntas con empaque: C → 0.8 (tornillo absorbe casi toda P)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora precarga ── */
function S5({ revealed }: { revealed: number }) {
  const [At, setAt] = useState(245)
  const [Sp, setSp] = useState(600)
  const [P_ext, setP] = useState(20000)
  const [C_val, setC] = useState(0.25)

  const Fi = 0.75 * At * Sp / 1000  /* kN */
  const Fb = Fi + C_val * P_ext / 1000
  const Fm = Fi - (1 - C_val) * P_ext / 1000
  const P_sep = Fi / (1 - C_val)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora — precarga y cargas en servicio</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Fb = Fi + C·P y Fm = Fi − (1−C)·P</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="At — Área tensil" unit="mm²" value={At} min={20} max={600} onChange={setAt} color={C} />
          <Slider label="Sp — Resistencia a prueba" unit="MPa" value={Sp} min={200} max={1000} onChange={setSp} color="var(--accent)" />
          <Slider label="P — Carga externa" unit="N" value={P_ext} min={0} max={100000} step={1000} onChange={setP} color="var(--warning)" />
          <Slider label="C — Factor de rigidez" unit="" value={C_val} min={0.05} max={0.9} step={0.01} onChange={setC} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Fi — Precarga</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: C }}>{Fi.toFixed(2)} kN</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${Fb > 0 ? 'var(--warning)' : 'var(--success)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Fb — Carga tornillo</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--warning)' }}>{Fb.toFixed(2)} kN</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${Fm > 0 ? 'var(--success)' : 'var(--danger)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Fm — Carga junta {Fm <= 0 ? '⚠ SEPARACIÓN' : '✓'}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: Fm > 0 ? 'var(--success)' : 'var(--danger)' }}>{Fm.toFixed(2)} kN</div>
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
            P_separación = {(P_sep / 1000).toFixed(2)} kN
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Torque de apriete ── */
function S6({ revealed }: { revealed: number }) {
  const [Fi2, setFi2] = useState(30)
  const [K, setK] = useState(0.2)
  const [D, setD] = useState(16)

  const T_Nm = K * Fi2 * 1000 * D / 1000

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Torque de apriete — aplicar la precarga correcta</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>T = K · Fi · D — la fórmula práctica de taller</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Torque de apriete" eq="T = K · Fi · D" color={C} />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text-1)' }}>Factor K (coeficiente de tuerca):</strong><br />
            K ≈ 0.20 (sin lubricante, acero-acero)<br />
            K ≈ 0.15 (lubricado, aceite de corte)<br />
            K ≈ 0.12 (cadmiado, buen lubricante)<br />
            K ≈ 0.10 (PTFE, Teflon)<br />
            <strong style={{ color: 'var(--warning)' }}>±25% incertidumbre sin calibración</strong>
          </div>
          <Slider label="Fi — Precarga objetivo" unit="kN" value={Fi2} min={5} max={200} onChange={setFi2} color={C} />
          <Slider label="K — Factor de tuerca" unit="" value={K} min={0.08} max={0.35} step={0.01} onChange={setK} color="var(--accent)" />
          <Slider label="D — Diámetro nominal tornillo" unit="mm" value={D} min={6} max={48} step={2} onChange={setD} color="var(--warning)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Torque requerido</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 700, color: C }}>{T_Nm.toFixed(0)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>N·m</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            Verificar con llave dinamométrica calibrada.<br />
            ~50% de T se pierde en fricción bajo cabeza.<br />
            ~40% en fricción de rosca, solo ~10% en elongación útil.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Fatiga en tornillos ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Esfuerzo alternante', text: 'σa = C·P / (2·At) — solo fracción C de P va al tornillo; el resto a la junta.' },
    { label: 'Esfuerzo medio', text: 'σm = Fi/At + C·P/(2·At) — la precarga Fi domina el esfuerzo medio.' },
    { label: 'Se para tornillos', text: 'Se ≈ 162 MPa (≤M16, acero laminado en frío) según Shigley Tabla 8-17. Incluye Kf de la rosca.' },
    { label: 'Goodman para tornillo', text: 'n_f = 1 / (σa/Se + σm/Sut). Con Fi alta, σm/Sut ≈ 0.7 → n_f limitado por σa.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Fatiga en tornillos de sujeción</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La precarga alta mejora la resistencia a fatiga</h2>
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
  'La precarga Fi = 0.75·At·Sp es la clave: mantiene la junta cerrada bajo carga cíclica',
  'Factor C = kb/(kb+km): solo una fracción C de la carga externa P va al tornillo',
  'Separación de junta cuando P > Fi/(1−C) — condición de falla catastrófica',
  'Torque de apriete T = K·Fi·D — K depende de lubricación (0.10 a 0.20)',
  'En fatiga: la alta precarga reduce el rango de σa y mejora la vida del tornillo',
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
  { id: 1, title: 'Título', note: 'Los tornillos son la unión más común. Un tornillo mal apretado (sin precarga) fallará por fatiga en pocos ciclos.', Content: S1 },
  { id: 2, title: 'Geometría de rosca', revealCount: 5, note: 'Enfatizar At (no el área nominal). Para M16: At = 157 mm², no π·8² = 201 mm². Error común en cálculos.', Content: S2 },
  { id: 3, title: 'Tornillos de potencia', note: 'Demostrar: λ < φ → el tornillo es autobloqueante (no baja solo bajo carga). Aplicación: gatos, prensas.', Content: S3 },
  { id: 4, title: 'Precarga y rigidez', note: 'El modelo de dos resortes en paralelo es la clave conceptual. km >> kb en juntas metálicas sin empaque.', Content: S4 },
  { id: 5, title: 'Calculadora precarga', note: 'Subir P hasta que Fm → 0: ese es el P_sep. Mostrar que con C=0.25, P_sep = Fi/0.75 = 1.33·Fi.', Content: S5 },
  { id: 6, title: 'Torque de apriete', note: 'El ±25% de incertidumbre en K es la razón por la que llave dinamométrica ≠ garantía de precarga exacta.', Content: S6 },
  { id: 7, title: 'Fatiga en tornillos', revealCount: 4, note: 'Paradoja: más precarga → más σm pero menos σa → mejor vida. Shigley Fig 8-29 lo ilustra.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 8-1 a 8-20. Próxima clase: soldadura — uniones permanentes más simples de analizar.', Content: S8 },
]

export default function Cap08SlidesPage() {
  return <PresentationShell chapterId={8} partColor={C} slides={SLIDES} />
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
