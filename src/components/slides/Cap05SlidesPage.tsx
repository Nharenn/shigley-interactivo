'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#F59E0B'  /* part-2 amber */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 5 · Parte 2 — Prevención de fallas
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Fallas por<br /><span style={{ color: C }}>Carga Estática</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Teorías MSS · DE (Von Mises) · BCM · Mecánica de fractura
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['Ductil', 'Frágil', 'σ\'= Sy/n', 'KI', 'Kic'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Introducción ── */
function S2({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>¿Por qué teorías de falla?</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>El esfuerzo es multiaxial; los ensayos son uniaxiales</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Estado uniaxial', desc: 'Ensayo estándar de tracción: σ = F/A. Falla cuando σ = Sy o σ = Sut.', color: 'var(--success)' },
            { title: 'Estado biaxial/triaxial', desc: 'Un eje real: flexión + torsión + axial. ¿Cuándo falla? No hay prueba directa.', color: C },
            { title: 'La teoría responde', desc: 'Convierte el estado multiaxial en un esfuerzo equivalente uniaxial σ\' comparado con Sy.', color: 'var(--accent)' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'var(--bg-2)', borderLeft: `3px solid ${item.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: item.color, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 14 }}>Árbol de teorías de falla</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '10px 14px', background: `${C}15`, border: `1px solid ${C}50`, borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: C }}>
              Material dúctil (ε_f &gt; 5%)
            </div>
            <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ padding: '8px 14px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, color: 'var(--text-1)' }}>→ MSS — Máximo esfuerzo cortante</div>
              <div style={{ padding: '8px 14px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, color: 'var(--text-1)' }}>→ DE — Distorsional Energy (Von Mises)</div>
            </div>
            <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--danger)' }}>
              Material frágil (ε_f &lt; 5%)
            </div>
            <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ padding: '8px 14px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, color: 'var(--text-1)' }}>→ MNS — Máximo esfuerzo normal</div>
              <div style={{ padding: '8px 14px', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12, color: 'var(--text-1)' }}>→ BCM — Brittle Coulomb-Mohr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3 — MSS ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Teoría del Máximo Esfuerzo Cortante — MSS</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La falla ocurre cuando τmax alcanza Sy/2</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Criterio de fluencia (MSS)" eq="σ₁ − σ₂ = Sy/n" color={C} />
          <FormulaBox label="Esfuerzo de Von Mises equivalente" eq="σ' = σ₁ − σ₂" color="var(--warning)" />
          <FormulaBox label="Esfuerzo cortante máximo" eq="τmax = (σ₁ − σ₂)/2 = Sy/(2n)" color="var(--danger)" />
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Aplicación:</strong><br />
            Para estado plano de esfuerzo con σ₃ = 0:<br />
            Si σ₁ y σ₂ mismo signo: σ' = σ_max<br />
            Si σ₁ y σ₂ signos opuestos: σ' = σ₁ − σ₂
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 10 }}>Envolvente MSS en espacio σ₁-σ₂</div>
            <svg viewBox="0 0 240 240" width="100%">
              <line x1="20" y1="120" x2="220" y2="120" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="120" y1="20" x2="120" y2="220" stroke="var(--text-3)" strokeWidth="1" />
              <text x="215" y="116" fontSize="10" fill="var(--text-2)" fontFamily="monospace">σ₁</text>
              <text x="124" y="18" fontSize="10" fill="var(--text-2)" fontFamily="monospace">σ₂</text>
              {/* MSS hexagon */}
              <polygon points="120,40 200,120 200,120 200,120 120,200 40,120 40,120" fill={`${C}08`} stroke={C} strokeWidth="2" strokeDasharray="none" fillRule="evenodd" />
              <line x1="120" y1="40" x2="200" y2="120" stroke={C} strokeWidth="2" />
              <line x1="200" y1="120" x2="120" y2="200" stroke={C} strokeWidth="2" />
              <line x1="120" y1="200" x2="40" y2="120" stroke={C} strokeWidth="2" />
              <line x1="40" y1="120" x2="120" y2="40" stroke={C} strokeWidth="2" />
              <line x1="120" y1="40" x2="40" y2="120" stroke={C} strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
              <line x1="200" y1="120" x2="120" y2="200" stroke={C} strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
              <text x="148" y="72" fontSize="10" fill={C} fontFamily="monospace">σ'=Sy</text>
              <circle cx="120" cy="120" r="3" fill="var(--success)" />
            </svg>
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            MSS es conservador (subestima la capacidad real ~15% respecto a DE). Se usa cuando se requiere mayor margen de seguridad.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — DE / Von Mises ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Teoría de Energía de Distorsión — DE (Von Mises)</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La más precisa para materiales dúctiles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Esfuerzo de Von Mises (principal)" eq="σ' = √(σ₁²−σ₁σ₂+σ₂²)" color={C} />
          <FormulaBox label="Caso general (tensor completo)" eq="σ' = √(σx²−σxσy+σy²+3τxy²)" color="var(--accent)" />
          <FormulaBox label="Criterio de fluencia DE" eq="σ' ≤ Sy/n" color="var(--success)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 10 }}>Comparación MSS vs DE</div>
            <svg viewBox="0 0 240 200" width="100%">
              <line x1="20" y1="100" x2="220" y2="100" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="120" y1="10" x2="120" y2="190" stroke="var(--text-3)" strokeWidth="1" />
              {/* DE ellipse */}
              <ellipse cx="120" cy="100" rx="80" ry="80" fill="rgba(59,130,246,0.06)" stroke="var(--accent)" strokeWidth="2" transform="rotate(-30 120 100)" />
              {/* MSS inscribed */}
              <line x1="120" y1="20" x2="200" y2="100" stroke={C} strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="200" y1="100" x2="120" y2="180" stroke={C} strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="120" y1="180" x2="40" y2="100" stroke={C} strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="40" y1="100" x2="120" y2="20" stroke={C} strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="128" y="34" fontSize="10" fill="var(--accent)" fontFamily="monospace">DE</text>
              <text x="142" y="62" fontSize="10" fill={C} fontFamily="monospace">MSS</text>
            </svg>
          </div>
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Resumen:</strong><br />
            • DE &gt; MSS: DE siempre predice mayor capacidad<br />
            • Error máximo MSS: ~15% conservador<br />
            • Para torsión pura: τ = Sy/√3 (DE) vs Sy/2 (MSS)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora DE vs MSS ── */
function S5({ revealed }: { revealed: number }) {
  const [sx, setSx] = useState(120)
  const [sy, setSy] = useState(60)
  const [txy, setTxy] = useState(40)
  const [Sy, setSy2] = useState(350)

  const sVM = Math.sqrt(sx * sx - sx * sy + sy * sy + 3 * txy * txy)
  const C1 = (sx + sy) / 2
  const R = Math.sqrt(((sx - sy) / 2) ** 2 + txy ** 2)
  const s1 = C1 + R, s2 = C1 - R
  const sMSS = Math.abs(s1 - s2)

  const n_DE = Sy / sVM
  const n_MSS = Sy / sMSS

  const safe_DE = n_DE >= 1
  const safe_MSS = n_MSS >= 1

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora — DE vs MSS</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Comparación en tiempo real</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider label="σx" unit="MPa" value={sx} min={0} max={400} onChange={setSx} color={C} />
          <Slider label="σy" unit="MPa" value={sy} min={0} max={400} onChange={setSy} color="var(--accent)" />
          <Slider label="τxy" unit="MPa" value={txy} min={0} max={200} onChange={setTxy} color="var(--danger)" />
          <Slider label="Sy — Resistencia a fluencia" unit="MPa" value={Sy} min={100} max={700} onChange={setSy2} color="var(--success)" />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            σ' (DE) = {sVM.toFixed(1)} MPa<br />
            σ' (MSS) = {sMSS.toFixed(1)} MPa<br />
            σ₁ = {s1.toFixed(1)}, σ₂ = {s2.toFixed(1)} MPa
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px 16px', background: safe_DE ? 'var(--success-soft)' : 'var(--danger-soft)', border: `1px solid ${safe_DE ? 'var(--success)' : 'var(--danger)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>n (Von Mises / DE)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: safe_DE ? 'var(--success)' : 'var(--danger)' }}>{n_DE.toFixed(2)}</div>
            <div style={{ fontSize: 12, color: safe_DE ? 'var(--success)' : 'var(--danger)', marginTop: 4 }}>{safe_DE ? '✓ Seguro' : '✗ Falla'}</div>
          </div>
          <div style={{ padding: '14px 16px', background: safe_MSS ? 'rgba(245,158,11,0.08)' : 'var(--danger-soft)', border: `1px solid ${safe_MSS ? C + '60' : 'var(--danger)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>n (MSS) — conservador</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: safe_MSS ? C : 'var(--danger)' }}>{n_MSS.toFixed(2)}</div>
            <div style={{ fontSize: 12, color: safe_MSS ? C : 'var(--danger)', marginTop: 4 }}>{safe_MSS ? '✓ Seguro' : '✗ Falla'}</div>
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            Diferencia DE-MSS: {Math.abs(n_DE - n_MSS).toFixed(2)} unidades<br />
            MSS es {((1 - n_MSS / n_DE) * 100).toFixed(0)}% más conservador
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Materiales frágiles ── */
function S6({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Materiales frágiles — teorías especiales</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Sut ≠ Suc — el diagrama no es simétrico</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: `1px solid ${C}40`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, textTransform: 'uppercase', marginBottom: 8 }}>MNS — Máximo esfuerzo normal</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-1)', marginBottom: 4 }}>σ₁ ≤ Sut / n</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-1)' }}>σ₂ ≥ −Suc / n</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Conservador, no predice bien tensión biaxial</div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--danger)40', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--danger)', textTransform: 'uppercase', marginBottom: 8 }}>BCM — Brittle Coulomb-Mohr</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-1)', marginBottom: 4 }}>σ₁/Sut − σ₂/Suc = 1/n</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Aplica cuando σ₁ &gt; 0 y σ₂ &lt; 0 (cuadrante IV)</div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8 }}>MM — Modified Mohr</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>Combina MNS y BCM. Mejor predicción experimental. Recomendada en Shigley §5-4.</div>
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Fundición gris: Sut vs Suc</div>
            <svg viewBox="0 0 240 240" width="100%">
              <line x1="20" y1="120" x2="220" y2="120" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="120" y1="20" x2="120" y2="220" stroke="var(--text-3)" strokeWidth="1" />
              <text x="215" y="116" fontSize="9" fill="var(--text-2)" fontFamily="monospace">σ₁</text>
              <text x="124" y="18" fontSize="9" fill="var(--text-2)" fontFamily="monospace">σ₂</text>
              {/* Sut marker on σ1 axis */}
              <line x1="180" y1="115" x2="180" y2="125" stroke="var(--danger)" strokeWidth="2" />
              <text x="174" y="112" fontSize="9" fill="var(--danger)" fontFamily="monospace">Sut</text>
              {/* Suc marker (bigger) on σ2 negative */}
              <line x1="35" y1="115" x2="35" y2="125" stroke="var(--warning)" strokeWidth="2" />
              <text x="18" y="112" fontSize="9" fill="var(--warning)" fontFamily="monospace">-Suc</text>
              {/* BCM line */}
              <line x1="180" y1="120" x2="120" y2="37" stroke={C} strokeWidth="2" />
              <line x1="120" y1="37" x2="35" y2="120" stroke={C} strokeWidth="2" />
              <line x1="35" y1="120" x2="120" y2="200" stroke={C} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
              <line x1="120" y1="200" x2="180" y2="120" stroke={C} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
              <text x="140" y="72" fontSize="9" fill={C} fontFamily="monospace">BCM</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Mecánica de fractura ── */
function S7({ revealed }: { revealed: number }) {
  const [sigma, setSigma] = useState(200)
  const [a, setA] = useState(5)
  const KI = (sigma * Math.sqrt(Math.PI * a / 1000)).toFixed(2)
  const KIc_steel = 50  // MPa√m típico
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Mecánica de fractura lineal elástica</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Falla por grieta preexistente</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Factor de intensidad de esfuerzo" eq="KI = σ√(πa)·F" color={C} />
          <FormulaBox label="Criterio de fractura" eq="KI = KIc" color="var(--danger)" />
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Parámetros:</strong><br />
            a = longitud de grieta (m)<br />
            F = factor de corrección de geometría<br />
            KIc = tenacidad a la fractura [MPa√m]<br />
            KIc (acero): 20–200 · Aluminio: 20–40<br />
            KIc (cerámica): 1–5 MPa√m
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider label="σ — Esfuerzo nominal" unit="MPa" value={sigma} min={50} max={500} onChange={setSigma} color={C} />
          <Slider label="a — Longitud de grieta" unit="mm" value={a} min={1} max={30} onChange={setA} color="var(--danger)" />
          <div style={{ padding: '14px 18px', background: +KI > KIc_steel ? 'var(--danger-soft)' : 'var(--success-soft)', border: `1px solid ${+KI > KIc_steel ? 'var(--danger)' : 'var(--success)'}`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>KI (F=1)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: +KI > KIc_steel ? 'var(--danger)' : 'var(--success)' }}>
              {KI} MPa√m
            </div>
            <div style={{ fontSize: 12, marginTop: 6, color: +KI > KIc_steel ? 'var(--danger)' : 'var(--success)' }}>
              {+KI > KIc_steel ? `✗ KI > KIc (${KIc_steel}) — FRACTURA` : `✓ KI < KIc (${KIc_steel}) — Seguro`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'Las teorías DE y MSS convierten el estado multiaxial en un esfuerzo equivalente uniaxial',
  'DE es más precisa (+15% capacidad vs MSS) y recomendada para metales dúctiles',
  'MSS es conservadora: úsala cuando el margen de error importa más que la eficiencia',
  'Para materiales frágiles (fundición, cerámica): MNS, BCM o Modified Mohr — no DE ni MSS',
  'Mecánica de fractura aplica cuando existen grietas detectables: KI ≥ KIc → fractura',
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
  { id: 1, title: 'Título', note: 'Preguntar: ¿cuándo falla realmente una pieza metálica? ¿Cuando σ = Sut? No siempre. Las piezas reales tienen estados multiaxiales.', Content: S1 },
  { id: 2, title: 'Introducción', revealCount: 3, note: 'El mapa de teorías es clave para saber qué usar. El error más común: usar DE para fundición gris (frágil). Siempre preguntar: ¿dúctil o frágil?', Content: S2 },
  { id: 3, title: 'Teoría MSS', note: 'MSS sobreestima la seguridad en compresión biaxial del mismo signo. El hexágono inscrito en la elipse DE lo ilustra visualmente.', Content: S3 },
  { id: 4, title: 'Teoría DE (Von Mises)', note: 'La elipse DE está inscrita en el cuadrado de MNS y circunscribe al hexágono MSS. Para torsión pura: τ = 0.577·Sy (DE) vs 0.5·Sy (MSS).', Content: S4 },
  { id: 5, title: 'Calculadora DE vs MSS', note: 'Demostrar: para τ_xy puro (σx=σy=0), DE da n=Sy/(τ√3) y MSS da n=Sy/(2τ). Observar cuál es más conservador.', Content: S5 },
  { id: 6, title: 'Materiales frágiles', note: 'La asimetría Sut << Suc en fundición (Sut ≈ 200 MPa, Suc ≈ 750 MPa) requiere la línea BCM asimétrica. Un gran error es usar DE para fundición.', Content: S6 },
  { id: 7, title: 'Mecánica de fractura', note: 'La paradoja: una pieza puede tener σ << Sy y aun así fracturar por grieta. El diseño moderno incluye inspection intervals basados en crack growth.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 5-1 a 5-12. Próxima clase: fatiga — cuando la carga se repite miles de millones de veces.', Content: S8 },
]

export default function Cap05SlidesPage() {
  return <PresentationShell chapterId={5} partColor={C} slides={SLIDES} />
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
