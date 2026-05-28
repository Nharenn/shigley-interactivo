'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 13 · Parte 4 — Diseño de sistemas
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Engranes:<br /><span style={{ color: C }}>Descripción General</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Nomenclatura · Involuta · Relación de velocidades · Interferencia · Análisis de fuerzas
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['m', 'P', 'φ', 'mp', 'Wt', 'Wr', 'Wa'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Tipos de engranes ── */
function S2({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Rectos (Spur)', desc: 'Dientes paralelos al eje. Ejes paralelos. Más simples. Ruido moderado. El tipo más común en diseño básico.', color: C },
    { name: 'Helicoidales', desc: 'Dientes inclinados ángulo ψ. Ejes paralelos o cruzados. Más silenciosos. Genera empuje axial Wa = Wt·tanψ.', color: 'var(--accent)' },
    { name: 'Cónicos', desc: 'Dientes en superficie cónica. Ejes que se intersecan (90° típico). Variante espiral Gleason.', color: 'var(--warning)' },
    { name: 'Tornillo sinfín', desc: 'Tornillo + corona. Ejes cruzados 90°. Alta reducción en una etapa. Puede ser autocontenido.', color: 'var(--danger)' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Cuatro tipos principales de engranes</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La geometría determina qué tipo de carga puede transmitir</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {types.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'var(--bg-2)', borderLeft: `3px solid ${t.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: t.color, marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 3 — Nomenclatura ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Nomenclatura — parámetros geométricos fundamentales</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>m = d/N (SI) · P = N/d (inglés) · p = πm</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Módulo (Sistema SI)" eq="m = d/N  [mm]" color={C} />
          <FormulaBox label="Paso diametral (Sistema inglés)" eq="P = N/d  [dientes/pulg]" color="var(--accent)" />
          <FormulaBox label="Paso circular" eq="p = πd/N = πm  |  p·P = π" color="var(--warning)" />
          <FormulaBox label="Addendum, dedendum, claro" eq="a = m  |  b = 1.25m  |  c = 0.25m" color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${C}40`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: C }}>Perfil involuta:</strong><br />
            Curva generada por un punto en una cuerda tensa que se desarrolla del círculo base.<br /><br />
            <strong style={{ color: 'var(--accent)' }}>Ventajas:</strong><br />
            • Radio del círculo base: r_b = (d/2)·cosφ<br />
            • Acción conjugada (relación ω constante)<br />
            • Tolerante a variaciones en distancia entre centros<br />
            • Cremallera con flancos rectos → fácil fabricación
          </div>
          <FormulaBox label="Distancia entre centros" eq="C = (d₁ + d₂)/2 = m(N₁+N₂)/2" color={C} />
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Propiedades de la involuta ── */
function S9({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Propiedades de la involuta</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>La involuta se genera al desenrollar una línea del círculo base</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${C}40`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: C }}>Construcción:</strong><br />
            Enrolla una cuerda alrededor de un círculo. Sujeta un lápiz al extremo y desenrolla la cuerda manteniéndola tensa. La trayectoria del lápiz es la <strong>involuta</strong>.<br /><br />
            <strong style={{ color: 'var(--accent)' }}>Propiedades clave:</strong><br />
            • La normal a la curva en cualquier punto es tangente al círculo base<br />
            • La línea de acción es la recta tangente a ambos círculos base<br />
            • La relación de velocidades es constante aunque varíe C<br />
            • El ángulo de presión φ define la inclinación de la línea de acción
          </div>
          <FormulaBox label="Radio del círculo base" eq="r_b = (d/2)·cosφ" color={C} />
          <FormulaBox label="Ecuación paramétrica de la involuta" eq="r = r_b·√(1 + θ²)  |  tan(α) = θ" color="var(--accent)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <svg viewBox="0 0 220 260" width="100%">
            <circle cx="80" cy="120" r="50" fill="none" stroke={C} strokeWidth="2" />
            <text x="80" y="116" textAnchor="middle" fontSize="9" fill={C} fontFamily="monospace">Círculo base</text>
            <line x1="80" y1="120" x2="80" y2="55" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="80" cy="55" r="3" fill="var(--accent)" />
            <text x="84" y="52" fontSize="8" fill="var(--accent)" fontFamily="monospace">Inicio</text>
            <line x1="80" y1="55" x2="190" y2="55" stroke="var(--warning)" strokeWidth="1.5" />
            <circle cx="150" cy="55" r="3" fill="var(--warning)" />
            <text x="154" y="52" fontSize="8" fill="var(--warning)" fontFamily="monospace">Punto</text>
            <path d="M 80,55 Q 90,68 100,76 Q 115,88 130,93 Q 145,96 158,94 Q 172,90 185,80 Q 195,70 200,58" fill="none" stroke="var(--danger)" strokeWidth="2" />
            <text x="130" y="108" fontSize="8" fill="var(--danger)" fontFamily="monospace">Involuta</text>
            <text x="110" y="254" textAnchor="middle" fontSize="8" fill="var(--text-3)" fontFamily="monospace">Generación de la involuta</text>
          </svg>
          <div style={{ padding: '14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: C }}>¿Por qué es el perfil estándar?</strong><br />
            La involuta es la única curva que garantiza velocidad angular constante aunque los ejes se separen. Los dientes de los engranes siempre tienen este perfil —no es una elección estética, es geometría pura.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Relación velocidades + contacto ── */
function S4({ revealed }: { revealed: number }) {
  const [N1, setN1] = useState(20)
  const [N2, setN2] = useState(60)
  const [m_val, setM] = useState(3)
  const [phi, setPhi] = useState(20)

  const d1 = m_val * N1
  const d2 = m_val * N2
  const ratio = N2 / N1
  const phiRad = phi * Math.PI / 180
  const C_dist = (d1 + d2) / 2
  const rb1 = (d1 / 2) * Math.cos(phiRad)
  const rb2 = (d2 / 2) * Math.cos(phiRad)
  const ra1 = d1 / 2 + m_val
  const ra2 = d2 / 2 + m_val
  const p_circ = Math.PI * m_val
  const Z = Math.sqrt(ra1 ** 2 - rb1 ** 2) + Math.sqrt(ra2 ** 2 - rb2 ** 2) - C_dist * Math.sin(phiRad)
  const mp = Z / (p_circ * Math.cos(phiRad))

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Relación de velocidades y relación de contacto</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>ω₁/ω₂ = N₂/N₁ — mp ≥ 1.2 para transmisión continua</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Relación de velocidades" eq="|ω₁/ω₂| = N₂/N₁ = d₂/d₁" color={C} />
          <FormulaBox label="Relación de contacto" eq="mp = [√(ra1²-rb1²)+√(ra2²-rb2²)-C·sinφ]/(p·cosφ)" color="var(--accent)" />
          <Slider label="N₁ — Dientes piñón" unit="" value={N1} min={12} max={80} step={1} onChange={setN1} color={C} />
          <Slider label="N₂ — Dientes rueda" unit="" value={N2} min={12} max={200} step={1} onChange={setN2} color="var(--accent)" />
          <Slider label="m — Módulo (mm)" unit="" value={m_val} min={1} max={10} step={0.5} onChange={setM} color="var(--warning)" />
          <Slider label="φ — Ángulo presión (°)" unit="" value={phi} min={14.5} max={25} step={0.5} onChange={setPhi} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Relación de transmisión</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: C }}>1 : {ratio.toFixed(2)}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { l: 'd₁', v: `${d1} mm`, c: C },
              { l: 'd₂', v: `${d2} mm`, c: 'var(--accent)' },
              { l: 'C (centros)', v: `${C_dist} mm`, c: 'var(--text-2)' },
              { l: 'p circular', v: `${p_circ.toFixed(2)} mm`, c: 'var(--warning)' },
            ].map(({ l, v, c }) => (
              <div key={l} style={{ padding: '8px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: c }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px', background: mp >= 1.2 ? `${C}10` : '#EF444415', border: `1px solid ${mp >= 1.2 ? C : '#EF4444'}50`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>mp — Relación de contacto</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: mp >= 1.2 ? C : '#EF4444' }}>{mp.toFixed(3)}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{mp >= 1.2 ? '✓ mp ≥ 1.2' : '⚠ mp < 1.2 — puede haber vibración'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Interferencia ── */
function S5({ revealed }: { revealed: number }) {
  const phiOptions = [
    { phi: 20, Nmin: 17, desc: 'Estándar AGMA. Diente más delgado en la raíz.' },
    { phi: 22.5, Nmin: 14, desc: 'Compromiso resistencia-contacto.' },
    { phi: 25, Nmin: 12, desc: 'Más robusto, mayor separación, requiere mayor distancia de centros.' },
    { phi: 14.5, Nmin: 32, desc: 'Histórico. Vulnerable a interferencia — ya no se recomienda.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Interferencia — límite mínimo de dientes</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>N_min = 2k/sin²φ · (m + √(m²+1+2m·sin²φ))</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            La <strong style={{ color: C }}>interferencia</strong> ocurre cuando la parte radial de un diente toca la involuta del otro engrane — desgaste severo y ruido.<br /><br />
            Causas: piñón con muy pocos dientes o ángulo de presión muy pequeño.<br /><br />
            <strong style={{ color: 'var(--accent)' }}>Soluciones:</strong> tallar (undercut) · aumentar N · aumentar φ · usar corrección de perfil x &gt; 0
          </div>
          {phiOptions.map((opt, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 14px', background: 'var(--bg-2)', border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: C, flexShrink: 0, width: 40 }}>{opt.phi}°</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>N_min = {opt.Nmin} dientes</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{opt.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="N mínimo (k=1, addendum estándar)" eq="N_min = 2/sin²φ·(1+√(1+3sin²φ))/3" color={C} />
          <FormulaBox label="Radio del círculo base" eq="r_b = (d/2)·cosφ" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: C }}>Regla práctica:</strong><br />
            φ = 20° → N_min = 17<br />
            φ = 25° → N_min = 12<br />
            Siempre usar N_piñón ≥ N_min
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Formación de dientes ── */
function S10({ revealed }: { revealed: number }) {
  const methods = [
    { name: 'Tallado (Hobbing)', desc: 'Fresa madre que gira sincronizada con el engrane. Genera el perfil involuta por movimiento continuo. Q5–Q9.', color: C },
    { name: 'Fresado (Milling)', desc: 'Cortador de forma para cada espacio interdental. Lento, pero flexible para prototipos. Q3–Q6.', color: 'var(--accent)' },
    { name: 'Brochado (Broaching)', desc: 'Brocha con dientes progresivos — perfil completo en una pasada. Ideal para engranes internos. Q7–Q9.', color: 'var(--warning)' },
    { name: 'Rectificado (Grinding)', desc: 'Acabado tras tratamiento térmico. Corrige distorsión. El más preciso. Q10–Q15.', color: 'var(--danger)' },
  ]
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Métodos de manufactura de engranes</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Precisión AGMA Q: entre más alto, menor tolerancia en el paso</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {methods.map((m, i) => (
          <div key={i} style={{ padding: '14px', background: 'var(--bg-2)', borderLeft: `3px solid ${m.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: m.color, marginBottom: 4 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{m.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
        <strong style={{ color: C }}>Calidad AGMA:</strong> Q3–Q4 (comercial), Q5–Q7 (precisión media), Q8–Q9 (precisión alta), Q10–Q15 (ultraprecisión). Engranes de transmisión automotriz típicamente Q7–Q9. Engranes de aeronave Q10+.
      </div>
    </div>
  )
}

/* ── Slide 8 — Sistemas de dientes ── */
function S11({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Proporciones estándar del diente</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Full depth vs Stub tooth · φ = 20° es el estándar actual AGMA</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${C}40`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C, marginBottom: 6 }}>Profundidad completa</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
              a = 1/P (o a = m)<br />
              b = 1.25/P (o b = 1.25m)<br />
              Máxima relación de contacto<br />
              Mayor riesgo de interferencia<br />
              <strong style={{ color: C }}>Estándar AGMA</strong>
            </div>
          </div>
          <FormulaBox label="Addendum y dedendum estándar" eq="a = m  |  b = 1.25m  |  c = 0.25m" color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid var(--warning)`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--warning)', marginBottom: 6 }}>Diente rebajado (Stub)</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
              a = 0.8/P<br />
              b = 1/P<br />
              Menor relación de contacto<br />
              Mayor resistencia en raíz<br />
              Reduce interferencia
            </div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Ángulos de presión estándar:</strong><br />
            14.5° — histórico, obsoleto (N_min = 32)<br />
            20° — estándar actual AGMA (N_min = 17)<br />
            25° — cargas pesadas (N_min = 12)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 9 — Análisis de fuerzas: engranes rectos ── */
function S6({ revealed }: { revealed: number }) {
  const [Wt, setWt] = useState(1000)
  const [phi2, setPhi2] = useState(20)
  const [psi, setPsi] = useState(0)
  const [T_Nm, setT] = useState(50)
  const [d_mm, setD] = useState(60)

  const phiRad = phi2 * Math.PI / 180
  const psiRad = psi * Math.PI / 180
  const Wr = Wt * Math.tan(phiRad)
  const Wa = psi > 0 ? Wt * Math.tan(psiRad) : 0
  const W_total = Math.sqrt(Wt ** 2 + Wr ** 2 + Wa ** 2)
  const Wt_from_T = (2 * T_Nm * 1000) / d_mm

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Análisis de fuerzas en engranes rectos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Wt = 2T/d · Wr = Wt·tanφ</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Fuerza tangencial (transmite potencia)" eq="Wt = 2T/d  [N, con T en N·m, d en m]" color={C} />
          <FormulaBox label="Fuerza radial (carga en cojinetes)" eq="Wr = Wt·tanφ" color="var(--accent)" />
          <FormulaBox label="Fuerza axial (solo helicoidales y cónicos)" eq="Wa = Wt·tanψ" color="var(--warning)" />
          <Slider label="Wt — Fuerza tangencial" unit=" N" value={Wt} min={100} max={10000} step={100} onChange={setWt} color={C} />
          <Slider label="φ — Ángulo de presión (°)" unit="" value={phi2} min={14.5} max={25} step={0.5} onChange={setPhi2} color="var(--accent)" />
          <Slider label="ψ — Ángulo hélice (°, 0=recto)" unit="" value={psi} min={0} max={35} step={1} onChange={setPsi} color="var(--warning)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Wt', v: `${Wt} N`, c: C },
              { l: 'Wr', v: `${Wr.toFixed(1)} N`, c: 'var(--accent)' },
              { l: 'Wa', v: `${Wa.toFixed(1)} N`, c: 'var(--warning)' },
              { l: 'W total', v: `${W_total.toFixed(1)} N`, c: 'var(--danger)' },
            ].map(({ l, v, c }) => (
              <div key={l} style={{ padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: c }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>Calcular Wt desde par y diámetro</div>
            <Slider label="T — Par torsión (N·m)" unit="" value={T_Nm} min={1} max={500} step={1} onChange={setT} color={C} />
            <Slider label="d — Diámetro paso (mm)" unit="" value={d_mm} min={20} max={400} step={5} onChange={setD} color="var(--accent)" />
            <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>Wt = {Wt_from_T.toFixed(1)} N</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 10 — Fuerzas en engranes cónicos ── */
function S12({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Análisis de fuerzas: engranes cónicos rectos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Wt = 2T/d_m · Wr y Wa dependen del ángulo del cono γ</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Fuerza tangencial" eq="Wt = 2T / d_m  (d_m = diámetro medio)" color={C} />
          <FormulaBox label="Fuerza radial" eq="Wr = Wt·tanφ·cosγ" color="var(--accent)" />
          <FormulaBox label="Fuerza axial (empuje)" eq="Wa = Wt·tanφ·sinγ" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            γ₁ = arctan(N₁/N₂) · γ₂ = 90° − γ₁<br /><br />
            <strong style={{ color: C }}>Dirección de las fuerzas:</strong><br />
            • Wr apunta hacia el centro del engrane<br />
            • Wa apunta hacia el ápice del cono<br />
            • Ambas deben ser consideradas en la selección de cojinetes
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <svg viewBox="0 0 220 220" width="100%">
            <polygon points="20,180 100,20 180,180" fill="none" stroke={C} strokeWidth="1.5" />
            <polygon points="200,180 100,20 180,180" fill="none" stroke={C} strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="var(--text-3)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="104" y="100" fontSize="8" fill="var(--text-3)" fontFamily="monospace">γ</text>
            <line x1="100" y1="20" x2="150" y2="100" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="152" y="64" fontSize="8" fill="var(--accent)" fontFamily="monospace">ω₁</text>
            <line x1="100" y1="20" x2="50" y2="100" stroke="var(--warning)" strokeWidth="1.5" />
            <text x="20" y="64" fontSize="8" fill="var(--warning)" fontFamily="monospace">ω₂</text>
            <text x="110" y="214" textAnchor="middle" fontSize="8" fill="var(--text-3)" fontFamily="monospace">γ₁ + γ₂ = 90°</text>
          </svg>
          <div style={{ padding: '12px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: C }}>Nota:</strong> En engranes cónicos espirales (Gleason) hay una componente adicional por la inclinación del diente. Las ecuaciones mostradas son para cónicos rectos.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 11 — Fuerzas en engranes helicoidales ── */
function S13({ revealed }: { revealed: number }) {
  const [psi_val, setPsi] = useState(20)
  const [phi_n, setPhi_n] = useState(20)

  const psiRad = psi_val * Math.PI / 180
  const Wa_ratio = Math.tan(psiRad)
  const Wr_ratio = Math.tan(phi_n * Math.PI / 180) / Math.cos(psiRad)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Análisis de fuerzas: engranes helicoidales</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Wa = Wt·tanψ — la hélice genera empuje axial</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Fuerza tangencial" eq="Wt = 2T/d" color={C} />
          <FormulaBox label="Fuerza radial" eq="Wr = Wt·tanφ_n / cosψ" color="var(--accent)" />
          <FormulaBox label="Fuerza axial (empuje)" eq="Wa = Wt·tanψ" color="var(--warning)" />
          <Slider label="ψ — Ángulo de hélice (°)" unit="" value={psi_val} min={0} max={40} step={1} onChange={setPsi} color={C} />
          <Slider label="φ_n — Ángulo presión normal (°)" unit="" value={phi_n} min={14.5} max={25} step={0.5} onChange={setPhi_n} color="var(--accent)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ padding: '14px', background: `${C}10`, border: `1px solid ${C}50`, borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Wa / Wt</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: C }}>{Wa_ratio.toFixed(3)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Wa = {Wa_ratio.toFixed(3)} · Wt</div>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid var(--accent)`, borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Wr / Wt</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>{Wr_ratio.toFixed(3)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Wr = {Wr_ratio.toFixed(3)} · Wt</div>
            </div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Impacto del ángulo ψ:</strong><br />
            ψ = 0° → engrane recto (Wa = 0)<br />
            ψ = 15° → Wa ≈ 0.27·Wt<br />
            ψ = 25° → Wa ≈ 0.47·Wt<br />
            ψ = 30° → Wa ≈ 0.58·Wt<br /><br />
            <strong style={{ color: C }}>Solución para Wa alta:</strong> usar doble hélice (chevron) que cancela el empuje axial.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 12 — Fuerzas en tornillo sinfín ── */
function S14({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Análisis de fuerzas: tornillo sinfín</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Wt_w = Wa_g · Wt_g = Wa_w · η depende de λ y f</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Fuerza tangencial del tornillo" eq="Wt_w = W_a_g (axial de la corona)" color={C} />
          <FormulaBox label="Fuerza axial del tornillo" eq="W_a_w = Wt_g (tangencial de la corona)" color="var(--accent)" />
          <FormulaBox label="Fuerza radial (ambos)" eq="Wr = Wt·tanφ" color="var(--warning)" />
          <FormulaBox label="Eficiencia del par sinfín" eq="η = [cosφ_n - f·tanλ] / [cosφ_n + f·cotλ]" color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: C }}>Relaciones clave:</strong><br />
            • λ = arctan(p_ax · N_worm / (π · d_worm)) — ángulo de avance<br />
            • Autobloqueante si f &gt; tanλ<br />
            • Eficiencia típica: 40–90%<br />
            • La corona NO puede hacer girar al tornillo si es autobloqueante<br /><br />
            <strong style={{ color: 'var(--accent)' }}>Aplicación:</strong> cabrestantes, elevadores, mesas rotativas — donde se requiere autobloqueo por seguridad.
          </div>
          <div style={{ padding: '14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            <strong style={{ color: C }}>Error común:</strong><br />
            Wt_w NO es igual a Wt_g. La potencia se transmite con cambio de dirección de 90°. Siempre verifica: la fuerza tangencial de un elemento es la fuerza axial del otro.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 13 — Trenes de engranes ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Tren simple', text: 'Una serie de engranes en contacto. e = ω_sal/ω_ent = N_entrada/N_salida. Los engranajes intermedios no afectan la relación — solo el sentido de giro.' },
    { label: 'Tren compuesto', text: 'Dos o más pares de engranes en ejes separados. e = ΠN_conductores / ΠN_conducidos. Los engranajes del mismo eje comparten ω.' },
    { label: 'Tren inverso compuesto', text: 'Los ejes de entrada y salida están en la misma línea. Se usa en reductores de dos etapas. Para etapas iguales: N₁/N₂ = N₃/N₄ = √e.' },
    { label: 'Tren epicicloidal (planetario)', text: 'Un engranaje central (sol), satélites y corona interna. Muy compacto, alta relación. e = 1 + N_corona/N_sol (portador fijo).' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Trenes de engranes — cuatro configuraciones</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>e = ω_sal/ω_ent = ΠN_conductores / ΠN_conducidos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 18px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? C + '50' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.25, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: C, flexShrink: 0, width: 28 }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: C, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 14 — Puntos clave ── */
const KEY_POINTS_13 = [
  'El perfil involuta garantiza relación de velocidades constante y tolera variaciones de distancia entre centros',
  'Módulo m = d/N (SI) o paso diametral P = N/d (inglés) — no se pueden mezclar sistemas en un par',
  'Relación de contacto mp ≥ 1.2 — asegura que siempre hay al menos un par de dientes en contacto',
  'Interferencia: piñón necesita N ≥ N_min (φ=20°: N_min=17 dientes) para evitar la interferencia',
  'Fuerzas en rectos: Wt = 2T/d transmite potencia · Wr = Wt·tanφ carga radial',
  'Fuerzas en helicoidales: Wa = Wt·tanψ — usar chevron o cojinetes de empuje para Wa alta',
  'Fuerzas en cónicos: Wr = Wt·tanφ·cosγ, Wa = Wt·tanφ·sinγ — dirección hacia centro y ápice',
  'Fuerzas en sinfín: Wt_w = Wa_g · Wt_g = Wa_w — eficiencia η = [cosφ_n - f·tanλ]/[cosφ_n + f·cotλ]',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS_13.map((p, i) => (
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
  { id: 1, title: 'Título', note: 'Los engranes son los elementos de transmisión más precisos y eficientes. Este capítulo establece la base geométrica — los caps. 14 y 15 añaden el análisis de resistencia AGMA.', Content: S1 },
  { id: 2, title: 'Tipos de engranes', revealCount: 4, note: 'La selección del tipo depende de la orientación de los ejes y el tipo de carga. Error frecuente: usar rodamiento radial donde hay carga axial generada por engranes helicoidales.', Content: S2 },
  { id: 3, title: 'Nomenclatura', note: 'Memorizar: m = d/N en SI; P = N/d en inglés; p = πm. La relación universal p·P = π permite convertir entre sistemas. Nunca mezclar módulo y paso diametral en un mismo par.', Content: S3 },
  { id: 4, title: 'Propiedades de la involuta', note: 'La involuta es la única curva que da acción conjugada con distancia variable entre centros. El círculo base es el generador — sin círculo base no hay involuta.', Content: S9 },
  { id: 5, title: 'Velocidades y contacto', note: 'Demostrar: si mp = 1.5, en promedio 1.5 pares de dientes en contacto. Cuando mp = 1: solo 1 par en cada instante → vibraciones. Para engranajes de precisión: mp ≥ 1.6.', Content: S4 },
  { id: 6, title: 'Interferencia', note: 'Tallar (undercut) soluciona la interferencia pero debilita la raíz. La corrección de perfil (x > 0) es la solución profesional — aumenta el módulo efectivo sin cambiar el paso.', Content: S5 },
  { id: 7, title: 'Formación de dientes', revealCount: 4, note: 'Hobbing es el método más común por su precisión y velocidad. El rectificado solo se usa después de tratamiento térmico. AGMA Q define la tolerancia del paso.', Content: S10 },
  { id: 8, title: 'Sistemas de dientes', note: 'El ángulo de presión 20° es el estándar por balance resistencia-contacto. φ=14.5° ya no se usa. Stub tooth para cargas muy altas pero menor mp.', Content: S11 },
  { id: 9, title: 'Análisis de fuerzas rectos', note: 'Wt es la única fuerza que transmite potencia. Wr y Wa solo cargan los cojinetes. Para cojinetes: F = √(Wr² + Wa²) en el plano axial, combinado con Wt.', Content: S6 },
  { id: 10, title: 'Fuerzas en cónicos', note: 'Wr apunta al centro y Wa al ápice del cono. En cónicos espirales hay una cuarta componente por la inclinación del diente — más allá del alcance de este capítulo.', Content: S12 },
  { id: 11, title: 'Fuerzas en helicoidales', note: 'Wa crece con tanψ — a ψ=30°, Wa=0.58Wt (casi 60% de la carga tangencial se vuelve axial). Los cojinetes de empuje son obligatorios. Mostrar relación Wa/Wt en la gráfica.', Content: S13 },
  { id: 12, title: 'Fuerzas en sinfín', note: 'La eficiencia baja con la relación de transmisión. Autobloqueante es útil para seguridad pero ineficiente (η < 50%). No confundir Wt_w con Wt_g — la potencia cambia de dirección.', Content: S14 },
  { id: 13, title: 'Trenes de engranes', revealCount: 4, note: 'En trenes compuestos: asignar nombres consecutivos y trazar el flujo de potencia. El eje intermedio tiene dos engranajes — recibir y transmitir — siempre a la misma velocidad angular.', Content: S7 },
  { id: 14, title: 'Puntos clave', note: 'Asignar: problemas 13-1 a 13-20 de Shigley. Próxima clase: análisis AGMA de esfuerzo y resistencia (cap. 14).', Content: S8 },
]

export default function Cap13SlidesPage() {
  return <PresentationShell chapterId={13} partColor={C} slides={SLIDES} />
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
