'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 10 · Parte 3 — Elementos mecánicos
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Resortes<br /><span style={{ color: C }}>Mecánicos</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Factor de Wahl · Índice C · k = Gd⁴/8D³Na · Pandeo
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Kw', 'C = D/d', 'k', 'τ', 'Lf', 'pandeo'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Geometría del resorte ── */
function S2({ revealed }: { revealed: number }) {
  const params = [
    { sym: 'd', name: 'Diámetro del alambre', desc: 'Variable principal de diseño. Valor estándar de alambre comercial.' },
    { sym: 'D', name: 'Diámetro medio de bobina', desc: 'D = Do − d = Di + d. Controla la flexibilidad.' },
    { sym: 'Na', name: 'Número de espiras activas', desc: 'Espiras que contribuyen a la deflexión. Extremos cerrados: Na = Nt − 2.' },
    { sym: 'C = D/d', name: 'Índice de resorte', desc: 'Típico: C = 4–12. C < 3 → difícil fabricar. C > 12 → pandeo probable.' },
    { sym: 'Lf', name: 'Longitud libre', desc: 'Longitud sin carga aplicada. Lf = d(Na + 2) para extremos cerrados.' },
    { sym: 'G', name: 'Módulo de corte', desc: 'Acero: G = 79 GPa. No confundir con E (módulo de Young).' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Geometría del resorte helicoidal de compresión</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Parámetros que definen el comportamiento</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {params.map((p, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-2)', border: `1px solid ${C}20`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: C, marginBottom: 4 }}>{p.sym}</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-1)', marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.4 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 3 — Esfuerzo y Wahl ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Esfuerzo de torsión y factor de Wahl</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>El alambre está bajo torsión — más curvatura = más esfuerzo</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Esfuerzo de torsión corregido" eq="τ = Kw · 8FD / πd³" color={C} />
          <FormulaBox label="Factor de corrección de Wahl" eq="Kw = (4C−1)/(4C−4) + 0.615/C" color="var(--accent)" />
          <FormulaBox label="Factor de Wahl simplificado (KB)" eq="KB = (4C+2)/(4C−3)" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Kw vs KB:</strong><br />
            • Kw (Wahl): incluye curvatura y esfuerzo directo<br />
            • KB (Bergsträsser): más simple, similar resultado<br />
            • Para C = 8: Kw ≈ 1.18, KB ≈ 1.17
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Kw vs índice C</div>
            <svg viewBox="0 0 240 180" width="100%">
              <line x1="30" y1="10" x2="30" y2="160" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="30" y1="160" x2="230" y2="160" stroke="var(--text-3)" strokeWidth="1" />
              <text x="18" y="14" fontSize="8" fill="var(--text-2)" fontFamily="monospace">Kw</text>
              <text x="120" y="174" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">C (índice)</text>
              {/* Kw curve: decreasing from C=3 */}
              <polyline
                points={[
                  [3, 1.58], [4, 1.40], [5, 1.31], [6, 1.25], [7, 1.21], [8, 1.18], [9, 1.16], [10, 1.14], [12, 1.11], [15, 1.09]
                ].map(([c, k]) => `${30 + (c - 2) * 15},${160 - (k - 1.05) * 900}`).join(' ')}
                fill="none" stroke={C} strokeWidth="2.5"
              />
              {/* Labels */}
              <text x="36" y="42" fontSize="9" fill={C} fontFamily="monospace">1.6</text>
              <text x="36" y="88" fontSize="9" fill={C} fontFamily="monospace">1.3</text>
              <text x="36" y="130" fontSize="9" fill={C} fontFamily="monospace">1.1</text>
              {/* C axis labels */}
              {[3, 6, 9, 12, 15].map(c => (
                <text key={c} x={30 + (c - 2) * 15} y="170" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">{c}</text>
              ))}
              {/* Sweet spot */}
              <circle cx={30 + (8 - 2) * 15} cy={160 - (1.18 - 1.05) * 900} r="4" fill="var(--warning)" />
              <text x={30 + (8 - 2) * 15 + 6} y={160 - (1.18 - 1.05) * 900 - 4} fontSize="9" fill="var(--warning)" fontFamily="monospace">C=8</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Constante k ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Constante de resorte y longitudes características</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>k = Gd⁴ / (8D³Na) — la rigidez depende fuertemente de D</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Constante de resorte" eq="k = G·d⁴ / (8·D³·Na)" color={C} />
          <FormulaBox label="Longitud sólida" eq="Ls = d · Nt" color="var(--warning)" />
          <FormulaBox label="Deflexión máxima segura" eq="δmax = (Lf − Ls) / 1.15" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Longitudes típicas:</strong><br />
            Lf = longitud libre sin carga<br />
            L1 = Lf − δ1 (carga mínima)<br />
            L2 = Lf − δ2 (carga máxima)<br />
            Ls = solidez completa — evitar alcanzar
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Diagrama de longitudes</div>
            <svg viewBox="0 0 200 220" width="100%">
              {/* Springs at different lengths */}
              {/* Free state */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <ellipse key={i} cx="40" cy={20 + i * 18} rx="20" ry="6" fill="none" stroke={C} strokeWidth="2" opacity="0.8" />
              ))}
              <text x="70" y="25" fontSize="9" fill={C} fontFamily="monospace">Lf (libre)</text>
              <line x1="62" y1="20" x2="62" y2="162" stroke={C} strokeWidth="1" strokeDasharray="2 2" />
              <text x="70" y="165" fontSize="9" fill={C} fontFamily="monospace">{'{'}↑ Lf</text>

              {/* Working state */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <ellipse key={i} cx="140" cy={70 + i * 18} rx="20" ry="6" fill="none" stroke="var(--warning)" strokeWidth="2" opacity="0.8" />
              ))}
              <text x="165" y="75" fontSize="9" fill="var(--warning)" fontFamily="monospace">L2</text>

              {/* Solid */}
              {[0, 1, 2, 3].map(i => (
                <ellipse key={i} cx="140" cy={135 + i * 10} rx="20" ry="5" fill={`${C}20`} stroke="var(--danger)" strokeWidth="2" opacity="0.8" />
              ))}
              <text x="165" y="140" fontSize="9" fill="var(--danger)" fontFamily="monospace">Ls</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora resorte ── */
function S5({ revealed }: { revealed: number }) {
  const [d, setD] = useState(4)
  const [D, setD2] = useState(32)
  const [Na, setNa] = useState(8)
  const [F, setF] = useState(200)
  const G = 79000  /* acero */

  const C_val = D / d
  const Kw = (4 * C_val - 1) / (4 * C_val - 4) + 0.615 / C_val
  const k = G * d ** 4 / (8 * D ** 3 * Na)
  const delta = F / k
  const tau = Kw * 8 * F * D / (Math.PI * d ** 3)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora — resorte helicoidal de compresión</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>k, τ y deflexión en tiempo real</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="d — Diámetro de alambre" unit="mm" value={d} min={1} max={20} onChange={setD} color={C} />
          <Slider label="D — Diámetro medio bobina" unit="mm" value={D} min={10} max={120} onChange={setD2} color="var(--accent)" />
          <Slider label="Na — Espiras activas" unit="" value={Na} min={2} max={25} onChange={setNa} color="var(--warning)" />
          <Slider label="F — Fuerza aplicada" unit="N" value={F} min={10} max={5000} step={10} onChange={setF} color="var(--danger)" />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
            G acero = 79 000 MPa (constante)
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: '14px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>k (N/mm)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: C }}>{k.toFixed(2)}</div>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>C = D/d</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--accent)' }}>{C_val.toFixed(1)}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--warning)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>δ (mm)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: 'var(--warning)' }}>{delta.toFixed(2)}</div>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${tau > 600 ? 'var(--danger)' : 'var(--success)'}`, borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>τ (MPa)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 700, color: tau > 600 ? 'var(--danger)' : 'var(--success)' }}>{tau.toFixed(0)}</div>
            </div>
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            Kw = {Kw.toFixed(3)}<br />
            {C_val < 3 ? '⚠ C < 3: difícil fabricar' : C_val > 12 ? '⚠ C > 12: riesgo de pandeo' : `✓ C = ${C_val.toFixed(1)}: rango óptimo`}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Pandeo ── */
function S6({ revealed }: { revealed: number }) {
  const [Lf, setLf] = useState(120)
  const [D2, setD2] = useState(30)

  const ratio = Lf / D2
  const pandeaFixed = ratio > 5.26
  const pandeaFree = ratio > 2.63

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Estabilidad y pandeo del resorte</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Pandeo cuando Lf/D excede el límite</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Criterio de pandeo (Shigley §10-6)" eq="Lf/D > límite → pandea" color={C} />
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text-1)' }}>Límites Lf/D:</strong><br />
            • Extremos fijos: &gt; 5.26 → pandea<br />
            • Un extremo libre: &gt; 2.63 → pandea<br />
            <br />
            <strong style={{ color: 'var(--text-1)' }}>Soluciones al pandeo:</strong><br />
            • Usar guía interior o exterior<br />
            • Dividir en 2 resortes en paralelo<br />
            • Reducir Na (pero aumenta k)
          </div>
          <Slider label="Lf — Longitud libre" unit="mm" value={Lf} min={30} max={400} onChange={setLf} color={C} />
          <Slider label="D — Diámetro medio" unit="mm" value={D2} min={10} max={100} onChange={setD2} color="var(--warning)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Lf / D</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 700, color: C }}>{ratio.toFixed(2)}</div>
          </div>
          <div style={{ padding: '14px', background: pandeaFixed ? 'var(--danger-soft)' : 'rgba(16,185,129,0.08)', border: `1px solid ${pandeaFixed ? 'var(--danger)' : 'var(--success)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Extremos fijos (límite 5.26)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: pandeaFixed ? 'var(--danger)' : 'var(--success)' }}>
              {pandeaFixed ? '⚠ PANDEA' : '✓ Estable'}
            </div>
          </div>
          <div style={{ padding: '14px', background: pandeaFree ? 'var(--danger-soft)' : 'rgba(16,185,129,0.08)', border: `1px solid ${pandeaFree ? 'var(--danger)' : 'var(--success)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Un extremo libre (límite 2.63)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: pandeaFree ? 'var(--danger)' : 'var(--success)' }}>
              {pandeaFree ? '⚠ PANDEA' : '✓ Estable'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo de diseño ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Especificaciones', text: 'Resorte de compresión: F1 = 50N (L1 = 45mm), F2 = 150N (L2 = 35mm). Material: alambre de música. τ_max ≤ 690 MPa.' },
    { label: 'Paso 1: elegir d y C', text: 'Suponer C = 8 → Kw = 1.184. k = (F2-F1)/(L1-L2) = 100/10 = 10 N/mm.' },
    { label: 'Paso 2: diámetro d', text: 'De τ = Kw·8FC/(πd²) = 690: d = √(Kw·8·150·8/(π·690)) = 2.03 mm → usar d = 2.1mm estándar.' },
    { label: 'Paso 3: Na y Lf', text: 'D = C·d = 16.8mm. Na = Gd⁴/(8D³k) = 79000·2.1⁴/(8·16.8³·10) = 7.2 → Na = 8. Lf = L2 + δ2 = 35 + 150/10 = 50mm. Verificar pandeo.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Ejemplo de diseño — resorte de válvula</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Diseño desde las especificaciones de carga</h2>
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
  'k = Gd⁴/(8D³Na) — el diámetro de bobina D domina la rigidez al cubo; doblar D divide k por 8',
  'Factor de Wahl Kw = (4C-1)/(4C-4) + 0.615/C — corrige esfuerzo por curvatura del alambre',
  'Índice óptimo C = D/d entre 4 y 12: menor → difícil de fabricar, mayor → riesgo de pandeo',
  'Pandeo: Lf/D > 5.26 (extremos fijos) o > 2.63 (un extremo libre) → usar guía o dividir resorte',
  'Longitud sólida Ls = d·Nt — el resorte nunca debe comprimirse hasta Ls en operación normal',
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
  { id: 1, title: 'Título', note: 'Los resortes almacenan energía elástica. Un resorte mal diseñado falla por fatiga (carga cíclica) o por pandeo (Lf/D alto). Son de los pocos elementos que se diseñan desde cero.', Content: S1 },
  { id: 2, title: 'Geometría', revealCount: 6, note: 'El índice C = D/d es el parámetro de diseño central. C bajo → enrollar alambre grueso en diámetro pequeño → difícil. C alto → mucho espacio libre → pandeo.', Content: S2 },
  { id: 3, title: 'Esfuerzo y Wahl', note: 'Mostrar la gráfica: Kw cae rápidamente de C=3 a C=8, luego se aplana. El diseño óptimo en C=8-10 equilibra esfuerzo y fabricabilidad.', Content: S3 },
  { id: 4, title: 'Constante k y longitudes', note: 'Demostrar: doblar D (manteniendo d y Na) divide k por 8. El diámetro de bobina es la palanca de ajuste más potente.', Content: S4 },
  { id: 5, title: 'Calculadora resorte', note: 'Mostrar: aumentar Na reduce k y τ proporcionalmente. La calculadora hace evidente el trade-off.', Content: S5 },
  { id: 6, title: 'Pandeo', note: 'Un resorte de automóvil (Lf ≈ 350mm, D ≈ 100mm → Lf/D = 3.5) normalmente se guía en el amortiguador para prevenir pandeo.', Content: S6 },
  { id: 7, title: 'Ejemplo de diseño', revealCount: 4, note: 'El proceso iterativo es normal: elegir C, calcular d, verificar τ, calcular Na y Lf, verificar pandeo. Iterar si alguno falla.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 10-1 a 10-15. Próxima clase: rodamientos — vida L10 y selección de catálogo.', Content: S8 },
]

export default function Cap10SlidesPage() {
  return <PresentationShell chapterId={10} partColor={C} slides={SLIDES} />
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
