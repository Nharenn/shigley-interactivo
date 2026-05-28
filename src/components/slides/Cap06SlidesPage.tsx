'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#F59E0B'  /* part-2 amber */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 6 · Parte 2 — Prevención de fallas
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Fallas por<br /><span style={{ color: C }}>Fatiga</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Curva S-N · Límite de resistencia Se · Goodman · Gerber
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Se', 'Goodman', 'σa', 'σm', 'Kf', 'n_f'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Introducción ── */
function S2({ revealed }: { revealed: number }) {
  const items = [
    { title: '¿Qué es la fatiga?', desc: 'Falla progresiva por cargas cíclicas (variables en el tiempo) que crecen como grietas hasta fractura repentina.', color: 'var(--danger)' },
    { title: 'La carga cíclica importa', desc: 'Una pieza soporta σ = 200 MPa estático, pero puede fallar con σmax = 150 MPa si oscila miles de veces.', color: C },
    { title: 'Etapas: nucleación → propagación → fractura', desc: 'La grieta inicia en concentradores, crece ciclo a ciclo hasta el tamaño crítico.', color: 'var(--accent)' },
    { title: 'Responsable del 90% de fallas mecánicas', desc: 'Ejes, engranajes, resortes, fuselajes — todos diseñados con criterios de fatiga.', color: 'var(--success)' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>La falla que mata sin avisar</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Cargas variables → grietas → fractura frágil</h2>
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

/* ── Slide 3 — Curva S-N ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Curva S-N (Wöhler)</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La resistencia cae con los ciclos — hasta Se</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Curva S-N acero (log-log)</div>
            <svg viewBox="0 0 260 160" width="100%">
              <line x1="30" y1="10" x2="30" y2="140" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="30" y1="140" x2="250" y2="140" stroke="var(--text-3)" strokeWidth="1" />
              <text x="18" y="18" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">Sf</text>
              <text x="130" y="154" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">N (ciclos, escala log)</text>
              {/* Zona de vida corta 10^3 */}
              <text x="42" y="152" fontSize="7" fill="var(--text-3)" fontFamily="monospace">10³</text>
              <text x="115" y="152" fontSize="7" fill="var(--text-3)" fontFamily="monospace">10⁶</text>
              <text x="185" y="152" fontSize="7" fill="var(--text-3)" fontFamily="monospace">10⁸</text>
              {/* Sut marker */}
              <line x1="27" y1="30" x2="33" y2="30" stroke={C} strokeWidth="1.5" />
              <text x="5" y="33" fontSize="7" fill={C} fontFamily="monospace">0.9Sut</text>
              {/* Se marker */}
              <line x1="27" y1="100" x2="33" y2="100" stroke="var(--success)" strokeWidth="1.5" />
              <text x="10" y="103" fontSize="7" fill="var(--success)" fontFamily="monospace">Se</text>
              {/* S-N curve */}
              <polyline points="42,30 115,100 185,100 250,100" fill="none" stroke={C} strokeWidth="2" />
              {/* Horizontal endurance limit */}
              <line x1="115" y1="100" x2="250" y2="100" stroke="var(--success)" strokeWidth="2" strokeDasharray="4 3" />
              {/* Zone labels */}
              <text x="75" y="62" fontSize="8" fill="var(--text-2)" fontFamily="monospace">Zona LCF</text>
              <text x="140" y="92" fontSize="8" fill="var(--success)" fontFamily="monospace">Se (∞)</text>
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Límite de resistencia a fatiga rotativa" eq="S'e ≈ 0.5 Sut (Sut ≤ 200 kpsi)" color={C} />
          <FormulaBox label="Resistencia para vida finita (103 ≤ N ≤ 106)" eq="Sf = σ'f · (2N)^b" color="var(--accent)" />
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Notas clave:</strong><br />
            • Se existe solo en aceros (Sut ≤ 1400 MPa)<br />
            • Aluminio y cobre: no tienen Se definido<br />
            • N = 10⁶ ciclos separa vida finita e infinita
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Factores de modificación ── */
function S4({ revealed }: { revealed: number }) {
  const factors = [
    { sym: 'ka', name: 'Superficie', formula: 'ka = a·Sut^b', desc: 'Maquinado, forjado, laminado, fundido' },
    { sym: 'kb', name: 'Tamaño', formula: 'kb = 1.24·d^-0.107 (2.79≤d≤51mm)', desc: 'Piezas más grandes: menor Se' },
    { sym: 'kc', name: 'Carga', formula: 'kc = 0.85 (flexión) · 0.59 (torsión)', desc: 'Tipo de carga aplicada' },
    { sym: 'kd', name: 'Temperatura', formula: 'kd = 1 (T ≤ 450°C)', desc: 'Se reduce a alta temperatura' },
    { sym: 'ke', name: 'Confiabilidad', formula: 'ke = 1 − 0.08·za', desc: 'za: desviación estándar normal' },
    { sym: 'kf', name: 'Misceláneos', formula: 'residual, corrosión, recubrimiento', desc: 'Cubren efectos no considerados' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Factores de modificación de Marin</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Se = ka·kb·kc·kd·ke·kf · S'e</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {factors.map((f, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-2)', border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.25, transition: 'opacity 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: C, marginBottom: 4 }}>{f.sym}</div>
            <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-1)', marginBottom: 4 }}>{f.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 4 }}>{f.formula}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora Se ── */
function S5({ revealed }: { revealed: number }) {
  const [Sut, setSut] = useState(550)
  const [ka_, setKa] = useState(0.82)
  const [kb_, setKb] = useState(0.85)
  const [ke_, setKe] = useState(0.868)

  const Se_prime = Sut <= 1400 ? 0.5 * Sut : 700
  const Se = ka_ * kb_ * ke_ * Se_prime

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora Se modificada</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Se real de la pieza a partir de S'e</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider label="Sut — Resistencia última" unit="MPa" value={Sut} min={200} max={1400} onChange={setSut} color={C} />
          <Slider label="ka — Factor superficie" unit="" value={ka_} min={0.4} max={1.0} step={0.01} onChange={setKa} color="var(--accent)" />
          <Slider label="kb — Factor tamaño" unit="" value={kb_} min={0.6} max={1.0} step={0.01} onChange={setKb} color="var(--warning)" />
          <Slider label="ke — Factor confiabilidad" unit="" value={ke_} min={0.7} max={1.0} step={0.001} onChange={setKe} color="var(--danger)" />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            S'e = {Se_prime.toFixed(0)} MPa<br />
            kc = 1 (flexión), kd = 1, kf = 1
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 6 }}>Se — Límite real de fatiga</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 700, color: C }}>{Se.toFixed(0)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>MPa</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            Reducción vs S'e: {((1 - Se / Se_prime) * 100).toFixed(0)}%<br />
            ka·kb·ke = {(ka_ * kb_ * ke_).toFixed(3)}<br />
            Se/Sut = {(Se / Sut).toFixed(3)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Goodman ── */
function S6({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Diagrama de Goodman modificado</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Combinación de esfuerzo medio y alternante</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Criterio de Goodman modificado" eq="σa/Se + σm/Sut = 1/n" color={C} />
          <FormulaBox label="Criterio de Gerber (más preciso)" eq="σa/Se + (σm/Sut)² = 1/n" color="var(--accent)" />
          <FormulaBox label="Criterio de Soderberg (conservador)" eq="σa/Se + σm/Sy = 1/n" color="var(--success)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            σa = amplitud alternante<br />
            σm = esfuerzo medio<br />
            Incluir Kf en σa, Kf en σm (carga estática)
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Diagrama σa vs σm</div>
            <svg viewBox="0 0 240 200" width="100%">
              <line x1="20" y1="10" x2="20" y2="180" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="20" y1="180" x2="230" y2="180" stroke="var(--text-3)" strokeWidth="1" />
              <text x="8" y="14" fontSize="8" fill="var(--text-2)" fontFamily="monospace">σa</text>
              <text x="222" y="184" fontSize="8" fill="var(--text-2)" fontFamily="monospace">σm</text>
              {/* Se on y-axis */}
              <line x1="15" y1="50" x2="25" y2="50" stroke="var(--success)" strokeWidth="1.5" />
              <text x="1" y="53" fontSize="7" fill="var(--success)" fontFamily="monospace">Se</text>
              {/* Sy on x-axis */}
              <line x1="160" y1="175" x2="160" y2="185" stroke="var(--warning)" strokeWidth="1.5" />
              <text x="155" y="194" fontSize="7" fill="var(--warning)" fontFamily="monospace">Sy</text>
              {/* Sut on x-axis */}
              <line x1="200" y1="175" x2="200" y2="185" stroke="var(--danger)" strokeWidth="1.5" />
              <text x="195" y="194" fontSize="7" fill="var(--danger)" fontFamily="monospace">Sut</text>
              {/* Goodman line */}
              <line x1="20" y1="50" x2="200" y2="180" stroke={C} strokeWidth="2" />
              <text x="110" y="100" fontSize="9" fill={C} fontFamily="monospace">Goodman</text>
              {/* Gerber parabola approx */}
              <path d="M 20,50 Q 110,50 200,180" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="70" y="68" fontSize="8" fill="var(--accent)" fontFamily="monospace">Gerber</text>
              {/* Soderberg */}
              <line x1="20" y1="50" x2="160" y2="180" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Safe zone point */}
              <circle cx="80" cy="120" r="5" fill={C} opacity="0.8" />
              <text x="86" y="118" fontSize="8" fill="var(--text-2)" fontFamily="monospace">Punto\noperación</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Calculadora Goodman ── */
function S7({ revealed }: { revealed: number }) {
  const [sigmaA, setSigmaA] = useState(80)
  const [sigmaM, setSigmaM] = useState(120)
  const [Se, setSe] = useState(250)
  const [Sut, setSut] = useState(550)

  const n_good = 1 / (sigmaA / Se + sigmaM / Sut)
  const n_gerb = (() => {
    const a = (sigmaA / Se)
    const b = (sigmaM / Sut)
    const disc = Math.sqrt(a * a + 4 * b * b * (1 - b * b))
    return (2 * (1 - b * b) * a > 0) ? (2 * (1 - b * b)) / (2 * a) : 1 / (a + b * b)
  })()
  const safe = n_good >= 1

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora Goodman — factor de seguridad a fatiga</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>n_f = 1 / (σa/Se + σm/Sut)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider label="σa — Esfuerzo alternante" unit="MPa" value={sigmaA} min={0} max={400} onChange={setSigmaA} color={C} />
          <Slider label="σm — Esfuerzo medio" unit="MPa" value={sigmaM} min={0} max={400} onChange={setSigmaM} color="var(--accent)" />
          <Slider label="Se — Resistencia a fatiga" unit="MPa" value={Se} min={100} max={600} onChange={setSe} color="var(--success)" />
          <Slider label="Sut — Resistencia última" unit="MPa" value={Sut} min={200} max={1400} onChange={setSut} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '18px', background: safe ? 'rgba(16,185,129,0.08)' : 'var(--danger-soft)', border: `1px solid ${safe ? 'var(--success)' : 'var(--danger)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>n_f (Goodman)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 40, fontWeight: 700, color: safe ? 'var(--success)' : 'var(--danger)' }}>{n_good.toFixed(2)}</div>
            <div style={{ fontSize: 12, marginTop: 4, color: safe ? 'var(--success)' : 'var(--danger)' }}>{safe ? '✓ Seguro a fatiga' : '✗ Falla por fatiga'}</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${C}40`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Punto de operación</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.8 }}>
              σa/Se = {(sigmaA / Se).toFixed(3)}<br />
              σm/Sut = {(sigmaM / Sut).toFixed(3)}<br />
              Suma = {(sigmaA / Se + sigmaM / Sut).toFixed(3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'La fatiga es la causa del ~90% de fallas mecánicas: grieta que crece ciclo a ciclo hasta fractura',
  'S\'e ≈ 0.5·Sut para aceros con Sut ≤ 1400 MPa; el aluminio no tiene límite de fatiga',
  'Se real = ka·kb·kc·kd·ke·kf · S\'e — siempre menor que S\'e por efectos superficiales y geométricos',
  'Goodman: σa/Se + σm/Sut = 1/n — criterio práctico para diseño con seguridad definida',
  'Kf = 1 + q·(Kt − 1) concentra el esfuerzo en grietas existentes — nunca ignorarlo',
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
  { id: 1, title: 'Título', note: 'Iniciar con una foto de fractura por fatiga — el patrón de playa (beach marks) es característico. Preguntar: ¿a qué nivel de esfuerzo falla esta pieza?', Content: S1 },
  { id: 2, title: 'Introducción', revealCount: 4, note: 'El eje de ferrocarril de Wöhler (1860) fue el primer estudio sistemático. Las líneas de playa revelan el origen de la grieta y su crecimiento.', Content: S2 },
  { id: 3, title: 'Curva S-N', note: 'La curva es log-log. En acero hay una rodilla clara a 10^6 ciclos. El aluminio no tiene rodilla — sigue bajando.', Content: S3 },
  { id: 4, title: 'Factores de Marin', revealCount: 6, note: 'Demostrar con números: una viga de acero maquinada de 30mm diámetro a 90% confiabilidad puede tener Se ≈ 0.45·S\'e. Los factores castigan mucho.', Content: S4 },
  { id: 5, title: 'Calculadora Se', note: 'Ajustar ka = 0.76 (laminado en caliente) y ver cómo cae Se. Comparar con maquinado fino ka = 0.9.', Content: S5 },
  { id: 6, title: 'Diagrama de Goodman', note: 'Cualquier punto debajo de la línea de Goodman es seguro. La intersección con la recta σa/σm = constante da el punto de operación.', Content: S6 },
  { id: 7, title: 'Calculadora Goodman', note: 'Mostrar que subir σm del 0 a Sut hace que n_f caiga de Se/σa a 0. El esfuerzo medio "consume" la vida a fatiga.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 6-1 a 6-20. Próxima clase: ejes — donde la fatiga rotatoria es la norma, no la excepción.', Content: S8 },
]

export default function Cap06SlidesPage() {
  return <PresentationShell chapterId={6} partColor={C} slides={SLIDES} />
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color, fontWeight: 600 }}>{eq}</div>
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
