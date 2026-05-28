'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 11 · Parte 3 — Elementos mecánicos
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Rodamientos de<br /><span style={{ color: C }}>Contacto Rodante</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Vida L₁₀ · Carga C y Co · Carga equivalente P · Confiabilidad
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['L10', 'C', 'P', 'a1', 'a2', 'KN'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Tipos de rodamientos ── */
function S2({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Bolas — radial', desc: 'Radial primario, algo de axial. Velocidades altas. El más común.', p: 3, color: C },
    { name: 'Rodillos cilíndricos', desc: 'Solo carga radial. Mayor capacidad que bolas para mismo diámetro.', p: 10 / 3, color: 'var(--accent)' },
    { name: 'Bolas — contacto angular', desc: 'Combina radial y axial. Se monta en pares opuestos.', p: 3, color: 'var(--warning)' },
    { name: 'Rodillos cónicos', desc: 'Radial + axial grandes. Automóviles, cajas reductoras.', p: 10 / 3, color: 'var(--danger)' },
    { name: 'Rodillos esféricos (toroidal)', desc: 'Auto-alineante. Tolera desalineación de eje.', p: 10 / 3, color: C },
    { name: 'Empuje (axial)', desc: 'Solo carga axial. Discos de embrague, tornillos de potencia.', p: 3, color: 'var(--accent)' },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Tipos de rodamientos y sus aplicaciones</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La geometría del rodamiento determina el tipo de carga que soporta</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {types.map((t, i) => (
          <div key={i} style={{ padding: '12px 14px', background: 'var(--bg-2)', borderLeft: `3px solid ${t.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: t.color, marginBottom: 4 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.4, marginBottom: 4 }}>{t.desc}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>p = {t.p.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 3 — Vida L₁₀ ── */
function S3({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Vida nominal L₁₀ — ecuación de Palmgren</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>L₁₀ = (C/P)^p · 10⁶ revoluciones</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Vida nominal L₁₀ (90% sobreviven)" eq="L₁₀ = (C/P)^p · 10⁶ rev" color={C} />
          <FormulaBox label="Vida en horas" eq="Lh = L₁₀ / (60·n)" color="var(--accent)" />
          <FormulaBox label="Carga dinámica para vida deseada" eq="C = P · (Ld/10⁶)^(1/p)" color="var(--warning)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text-1)' }}>Exponente p:</strong><br />
            Bolas: p = 3<br />
            Rodillos: p = 10/3 ≈ 3.33<br />
            <br />
            <strong style={{ color: 'var(--text-1)' }}>C y Co en catálogo:</strong><br />
            C = carga dinámica básica<br />
            Co = carga estática básica (sin velocidad)
          </div>
        </div>
        <div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Curva vida L vs carga P (bolas)</div>
            <svg viewBox="0 0 240 180" width="100%">
              <line x1="30" y1="10" x2="30" y2="160" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="30" y1="160" x2="220" y2="160" stroke="var(--text-3)" strokeWidth="1" />
              <text x="8" y="14" fontSize="8" fill="var(--text-2)" fontFamily="monospace">L₁₀</text>
              <text x="115" y="174" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">Carga P</text>
              <path d={Array.from({ length: 20 }, (_, i) => {
                const P_rel = 0.3 + i * 0.05
                const L_rel = Math.min(Math.pow(1 / P_rel, 3), 8)
                const x = 30 + i * 9.5
                const y = 155 - L_rel * 18
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`
              }).join(' ')} fill="none" stroke={C} strokeWidth="2.5" />
              <line x1="30" y1="137" x2="220" y2="137" stroke="var(--text-3)" strokeWidth="0.5" strokeDasharray="2 3" />
              <text x="32" y="135" fontSize="8" fill="var(--text-3)" fontFamily="monospace">P=C → L=10⁶</text>
              <text x="35" y="28" fontSize="9" fill={C} fontFamily="monospace">P baja</text>
              <text x="35" y="42" fontSize="9" fill={C} fontFamily="monospace">→ vida larga</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Carga equivalente ── */
function S4({ revealed }: { revealed: number }) {
  const [Fr, setFr] = useState(3500)
  const [Fa, setFa] = useState(1200)
  const [V, setV] = useState(1.0)
  const [Co, setCo] = useState(11200)

  const Fa_VFr = Fa / (V * Fr)
  const e_val = Fa_VFr < 0.014 ? 0.19 : Fa_VFr < 0.028 ? 0.22 : Fa_VFr < 0.056 ? 0.26 : Fa_VFr < 0.084 ? 0.28 : 0.34
  const Y_val = Fa_VFr < 0.014 ? 2.30 : Fa_VFr < 0.028 ? 1.99 : Fa_VFr < 0.056 ? 1.71 : Fa_VFr < 0.084 ? 1.55 : 1.31
  const P_comb = Math.max(V * Fr, 0.56 * V * Fr + Y_val * Fa)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Carga equivalente — radial y axial combinadas</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>P = VXFr + YFa — convierte todo a carga radial equivalente</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Carga radial equivalente" eq="P = V·X·Fr + Y·Fa" color={C} />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            V = 1 (anillo interior gira) o 1.2 (exterior)<br />
            X = factor radial, Y = factor axial<br />
            Ambos dependen de Fa/(VFr) y de Co
          </div>
          <Slider label="Fr — Fuerza radial" unit="N" value={Fr} min={500} max={20000} step={100} onChange={setFr} color={C} />
          <Slider label="Fa — Fuerza axial" unit="N" value={Fa} min={0} max={10000} step={100} onChange={setFa} color="var(--accent)" />
          <Slider label="V — Factor de rotación" unit="" value={V} min={1.0} max={1.2} step={0.2} onChange={setV} color="var(--warning)" />
          <Slider label="Co — Carga estática básica" unit="N" value={Co} min={5000} max={50000} step={500} onChange={setCo} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>P — Carga equivalente</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: C }}>{(P_comb / 1000).toFixed(2)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>kN</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.8 }}>
            Fa/(V·Fr) = {Fa_VFr.toFixed(3)}<br />
            e = {e_val.toFixed(2)} · Y = {Y_val.toFixed(2)}<br />
            {Fa_VFr > e_val ? `Usa P = 0.56VFr + YFa` : `Usa P = VFr (axial pequeña)`}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora vida ── */
function S5({ revealed }: { revealed: number }) {
  const [C_cat, setCcat] = useState(25500)
  const [P2, setP2] = useState(4000)
  const [n2, setN2] = useState(1500)
  const [p_exp, setPexp] = useState(3)

  const L10_rev = Math.pow(C_cat / P2, p_exp) * 1e6
  const L10h = L10_rev / (60 * n2)
  const years = L10h / 8000

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Calculadora vida nominal L₁₀</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>¿Cuántas horas durará el rodamiento?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="C — Carga dinámica catálogo" unit="N" value={C_cat} min={5000} max={100000} step={500} onChange={setCcat} color={C} />
          <Slider label="P — Carga equivalente" unit="N" value={P2} min={500} max={50000} step={250} onChange={setP2} color="var(--accent)" />
          <Slider label="n — Velocidad" unit="RPM" value={n2} min={100} max={5000} step={50} onChange={setN2} color="var(--warning)" />
          <div style={{ display: 'flex', gap: 8 }}>
            {[3, 10 / 3].map(v => (
              <button key={v} onClick={() => setPexp(v)} style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)', border: `1px solid ${p_exp === v ? C : 'var(--border)'}`, background: p_exp === v ? `${C}20` : 'var(--bg-2)', color: p_exp === v ? C : 'var(--text-2)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer' }}>
                {v === 3 ? 'Bolas p=3' : 'Rodillos p=10/3'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '16px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>L₁₀ — Vida nominal</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: C }}>{L10h.toFixed(0)}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>horas</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>Equivalencia</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--warning)' }}>{years.toFixed(1)} años</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>(a 8000 h/año)</div>
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            L₁₀ = ({C_cat}/{P2})^{p_exp === 3 ? '3' : '10/3'} · 10⁶<br />
            = {(L10_rev / 1e6).toFixed(2)} × 10⁶ rev
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Factor de confiabilidad ── */
function S6({ revealed }: { revealed: number }) {
  const reliabilities = [
    { R: 90, a1: 1.00, note: 'Definición de L₁₀ — base de catálogo' },
    { R: 95, a1: 0.62, note: 'Aplicaciones importantes' },
    { R: 96, a1: 0.53, note: '' },
    { R: 97, a1: 0.44, note: '' },
    { R: 98, a1: 0.33, note: 'Maquinaria crítica' },
    { R: 99, a1: 0.21, note: 'Aviación, medicina' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Factor de confiabilidad a₁</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Ln = a₁ · a₂ · a₃ · L₁₀ — vida ajustada</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        <div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 0, fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 8 }}>
              <div style={{ color: 'var(--text-3)', padding: '4px 8px' }}>R (%)</div>
              <div style={{ color: 'var(--text-3)', padding: '4px 8px' }}>a₁</div>
              <div style={{ color: 'var(--text-3)', padding: '4px 8px' }}>Uso típico</div>
            </div>
            {reliabilities.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 0, borderTop: '1px solid var(--border)', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.3s' }}>
                <div style={{ padding: '8px 8px', fontFamily: 'var(--font-mono)', fontSize: 13, color: r.R === 90 ? C : 'var(--text-1)', fontWeight: r.R === 90 ? 700 : 400 }}>{r.R}</div>
                <div style={{ padding: '8px 8px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{r.a1.toFixed(2)}</div>
                <div style={{ padding: '8px 8px', fontSize: 11, color: 'var(--text-3)' }}>{r.note || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Vida ajustada por confiabilidad" eq="Ln = a₁ · L₁₀" color={C} />
          <FormulaBox label="Factor condición lubricante a₂₃" eq="a₂₃ = f(κ, contaminación)" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
            κ = υ/υ₁ = viscosidad actual/requerida<br />
            κ ≥ 1: lubricación adecuada → a₂₃ = 1<br />
            κ &lt; 1: film insuficiente → a₂₃ &lt; 1<br />
            Usar ISO VG 32, 46 o 68 según velocidad
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo catálogo ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'Especificaciones', text: 'Rodamiento para eje de 40mm, n = 1450 RPM, P = 6.2 kN (radial pura). Vida deseada: 20 000 h con 95% confiabilidad.' },
    { label: 'Carga de catálogo requerida', text: 'L₁₀ requerida = Ldesign/a₁ = 20000·60·1450 / (0.62·10⁶) = 2810×10⁶ rev. C = P·(L/10⁶)^(1/3) = 6200·(2810)^0.333 = 87.2 kN.' },
    { label: 'Selección del catálogo', text: 'Buscar en SKF/FAG/NSK: rodamiento de bolas 6208 (d=40mm): C = 29.1 kN — insuficiente. 6308: C = 40.5 kN — insuficiente. → Usar rodamiento de rodillos NJ208 con C = 95 kN ✓.' },
    { label: 'Verificación final', text: 'L₁₀ = (95000/6200)^(10/3)·10⁶ = 57×10⁶ rev = 655 kh. Con a₁=0.62: L₉₅ = 0.62·655 = 406 kh >> 20 kh. ✓ Diseño válido.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Ejemplo de selección por catálogo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Encontrar C de catálogo para vida y confiabilidad dadas</h2>
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

/* ── Slide 9 — Cojinetes cónicos ── */
function S9({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Cojinetes cónicos — efecto Timken</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>La carga radial genera una fuerza axial interna: Fa = 0.47·Fr / K</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Fuerza axial inducida" eq="Fai = 0.47 · Fri / K" color={C} />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            K ≈ 1.5 (típico cojinete cónico simple)<br />
            K = Cr / Ca (relación capacidades catálogo)<br />
            La fuerza inducida siempre intenta separar el cono de la copa
          </div>
          <div style={{ padding: '12px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Configuraciones de montaje:</strong><br />
            <strong>Tándem (DT):</strong> empuje en una dirección, Fa_total = Fa₁+Fa₂<br />
            <strong>Espalda-espalda (DB):</strong> mayor rigidez radial. Fai se cancelan parcialmente<br />
            <strong>Cara-a-cara (DF):</strong> menos rígido, tolera desalineación
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Configuraciones de montaje (cónica)</div>
            <svg viewBox="0 0 260 160" width="100%">
              {/* X */}
              <line x1="10" y1="80" x2="60" y2="80" stroke={C} strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Back-to-back (DB) */}
              <g transform="translate(10,10)">
                <polygon points="0,60 20,10 40,60" fill="none" stroke={C} strokeWidth="2" />
                <polygon points="25,60 45,10 65,60" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <text x="2" y="80" fontSize="8" fill="var(--text-3)" fontFamily="monospace">DB</text>
              </g>
              {/* Face-to-face (DF) */}
              <g transform="translate(95,10)">
                <polygon points="0,10 20,60 40,10" fill="none" stroke={C} strokeWidth="2" />
                <polygon points="25,10 45,60 65,10" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <text x="2" y="80" fontSize="8" fill="var(--text-3)" fontFamily="monospace">DF</text>
              </g>
              {/* Tandem (DT) */}
              <g transform="translate(175,10)">
                <polygon points="0,60 20,10 40,60" fill="none" stroke={C} strokeWidth="2" />
                <polygon points="20,60 40,10 60,60" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <text x="2" y="80" fontSize="8" fill="var(--text-3)" fontFamily="monospace">DT</text>
              </g>
              {/* Bottom note */}
              <text x="130" y="150" fontSize="9" textAnchor="middle" fill="var(--text-3)" fontFamily="monospace">Las flechas indican dirección del cono</text>
            </svg>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Procedimiento:</strong><br />
            1. Calcular Fai = 0.47·Fri/K para cada rodamiento<br />
            2. Determinar carga axial neta (inducida + externa)<br />
            3. Usar X, Y de tablas Timken → P equivalente<br />
            4. Seleccionar C₁₀ de catálogo
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 10 — Evaluación ── */
function S10({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Evaluación del diseño de rodamientos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Seleccionar no basta — hay que verificar vida, rigidez, velocidad y lubricación</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'Vida', check: 'L₁₀ ≥ L_diseño', icon: '⏱', detail: 'Si no cumple: aumentar C o cambiar a rodillos' },
          { label: 'Rigidez', check: 'Deflexión aceptable', icon: '📏', detail: 'Usar precarga en aplicaciones de precisión' },
          { label: 'Velocidad', check: 'n_op ≤ 0.8·n_límite', icon: '⚡', detail: 'Exceder límite → sobrecalentamiento' },
          { label: 'Lubricación', check: 'κ = υ/υ₁ ≥ 1', icon: '🛢️', detail: 'ISO VG 32-68 según velocidad y T' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '16px 18px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? C + '40' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'all 0.35s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)' }}>{item.check}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.detail}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '14px 18px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
        <strong style={{ color: 'var(--text-1)' }}>Regla de oro:</strong> usar un factor de seguridad de 1.1–1.5 sobre C₁₀ requerida para absorber incertidumbres en carga, lubricación y montaje.
      </div>
    </div>
  )
}

/* ── Slide 11 — Lubricación ── */
function S11({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Lubricación de rodamientos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Separar superficies, evacuar calor, proteger contra corrosión</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Viscosidad requerida" eq="κ = υ / υ₁ ≥ 1" color={C} />
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: C }}>Grasa</strong><br />
            • 80–90% de las aplicaciones<br />
            • Litio (multipropósito), calcio (agua), poliurea (alta T)<br />
            • No requiere circulación — se empaca y sella<br />
            • Velocidad límite menor que aceite
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--accent)' }}>Aceite</strong><br />
            • Alta velocidad, alta temperatura<br />
            • Baño, circulación o niebla<br />
            • Mejor disipación de calor<br />
            • ISO VG 32–68: espesor adecuado
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Sellos y protectores</div>
            <svg viewBox="0 0 240 120" width="100%">
              {/* Sello contacto */}
              <g transform="translate(0,0)">
                <circle cx="30" cy="60" r="30" fill="none" stroke={C} strokeWidth="1.5" />
                <circle cx="30" cy="60" r="15" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 15 60 Q 22 50 30 45" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <text x="30" y="115" fontSize="8" textAnchor="middle" fill="var(--text-3)" fontFamily="monospace">Contacto</text>
              </g>
              {/* Shield */}
              <g transform="translate(85,0)">
                <circle cx="30" cy="60" r="30" fill="none" stroke={C} strokeWidth="1.5" />
                <circle cx="30" cy="60" r="15" fill="none" stroke="#333" strokeWidth="1.5" />
                <line x1="12" y1="40" x2="48" y2="80" stroke="var(--warning)" strokeWidth="2" />
                <text x="30" y="115" fontSize="8" textAnchor="middle" fill="var(--text-3)" fontFamily="monospace">Shield</text>
              </g>
              {/* Laberinto */}
              <g transform="translate(170,0)">
                <circle cx="30" cy="60" r="30" fill="none" stroke={C} strokeWidth="1.5" />
                <circle cx="30" cy="60" r="15" fill="none" stroke="#333" strokeWidth="1.5" />
                <path d="M 10 45 L 20 45 L 20 55 L 30 55 L 30 65 L 40 65 L 40 75" fill="none" stroke="var(--danger)" strokeWidth="1.5" />
                <text x="30" y="115" fontSize="8" textAnchor="middle" fill="var(--text-3)" fontFamily="monospace">Laberinto</text>
              </g>
            </svg>
          </div>
          <div style={{ padding: '14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Consejo práctico:</strong> la mayoría de fallas prematuras de rodamientos se deben a lubricación deficiente o contaminación. Cambiar la grasa periódicamente según horas de operación y temperatura.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 12 — Montaje ── */
function S12({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Montaje y alojamiento</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Un rodamiento bien seleccionado pero mal montado falla prematuramente</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Ajuste anillo interior giratorio" eq="Interferencia (k5, m5, n5)" color={C} />
          <FormulaBox label="Ajuste anillo exterior fijo" eq="Juego ligero (H7, J7)" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Reglas de oro:</strong><br />
            • Nunca golpear el rodamiento para montarlo<br />
            • Usar prensa hidráulica o calentamiento por inducción<br />
            • El anillo que gira debe tener ajuste de interferencia<br />
            • El anillo fijo puede tener juego ligero (expansión térmica)<br />
            • Un cojinete fijo + un cojinete libre por flecha
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Configuración típica de montaje</div>
            <svg viewBox="0 0 220 140" width="100%">
              {/* Eje */}
              <rect x="10" y="55" width="200" height="12" rx="2" fill="#666" />
              {/* Cojinete izquierdo fijo */}
              <g transform="translate(40,35)">
                <circle cx="20" cy="26" r="22" fill="none" stroke={C} strokeWidth="2" />
                <circle cx="20" cy="26" r="10" fill="none" stroke="#333" strokeWidth="2" />
                <text x="20" y="60" fontSize="8" textAnchor="middle" fill={C} fontFamily="monospace">Fijo</text>
              </g>
              {/* Cojinete derecho libre */}
              <g transform="translate(135,35)">
                <circle cx="20" cy="26" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="20" cy="26" r="10" fill="none" stroke="#333" strokeWidth="2" />
                <text x="20" y="60" fontSize="8" textAnchor="middle" fill="var(--accent)" fontFamily="monospace">Libre</text>
              </g>
              {/* Hombro */}
              <rect x="30" y="52" width="8" height="18" rx="1" fill="#444" />
              {/* Flecha axial */}
              <line x1="30" y1="30" x2="30" y2="95" stroke="var(--danger)" strokeWidth="1.5" markerStart="url(#arrow)" />
              <text x="20" y="108" fontSize="8" fill="var(--danger)" fontFamily="monospace">Empuje</text>
            </svg>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Errores comunes de montaje:</strong><br />
            • Golpear el rodamiento → microgrietas en pistas<br />
            • Montar sin lubricar → desgaste inmediato<br />
            • Apriete excesivo del anillo exterior → reduce juego interno radial<br />
            • Olvidar el cojinete libre → sobrecarga axial por dilatación
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 13 — Puntos clave ── */
const KEY_POINTS = [
  'L₁₀ = (C/P)^p · 10⁶ — el 10% de los rodamientos falla antes de L₁₀ (90% sobreviven)',
  'C de catálogo es la carga para exactamente 10⁶ rev; escalar con p=3 (bolas) o p=10/3 (rodillos)',
  'Carga equivalente P = VXFr + YFa — convierte radial+axial a un único valor radial',
  'Factor a₁ ajusta la confiabilidad: a₁=0.62 para R=95%, a₁=0.21 para R=99%',
  'Para cargas combinadas o alta confiabilidad: seleccionar C requerida antes de buscar catálogo',
  'Cojinetes cónicos: Fa_inducida = 0.47·Fr/K — la radial produce axial',
  'Montaje: anillo giratorio con interferencia, anillo fijo con juego — nunca golpear el rodamiento',
  'Lubricación: grasa (80% aplicaciones) o aceite (alta velocidad). κ = υ/υ₁ ≥ 1.',
]

function S13({ revealed }: { revealed: number }) {
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
  { id: 1, title: 'Título', note: 'Los rodamientos son los únicos elementos que el ingeniero normalmente selecciona de catálogo, no diseña. El objetivo es calcular la carga de catálogo C requerida.', Content: S1 },
  { id: 2, title: 'Tipos de rodamientos', revealCount: 6, note: 'La selección del tipo depende de la dirección de carga. Error frecuente: usar rodamiento de bolas radial donde hay axial dominante.', Content: S2 },
  { id: 3, title: 'Vida L₁₀', note: 'L₁₀ es estadística: en un lote de 100 rodamientos a carga C, 90 superan L₁₀. No es "todos duran L₁₀".', Content: S3 },
  { id: 4, title: 'Carga equivalente', note: 'Los factores X e Y dependen de la relación Fa/Co. Shigley Tabla 11-1 para rodamientos de bolas estándar.', Content: S4 },
  { id: 5, title: 'Calculadora vida', note: 'Demostrar: doblar C aumenta L₁₀ por 8× (bolas). La vida es muy sensible a la relación C/P.', Content: S5 },
  { id: 6, title: 'Factor confiabilidad', revealCount: 6, note: 'Ir de 90% a 99% confiabilidad reduce la vida a solo el 21% — el costo de garantizar que el 1% sobreviva es grande.', Content: S6 },
  { id: 7, title: 'Ejemplo catálogo', revealCount: 4, note: 'Siempre calcular C_req primero, luego buscar el catálogo. El error más común es buscar sin calcular.', Content: S7 },
  { id: 8, title: 'Cojinetes cónicos', note: 'Timken: Fa = 0.47·Fr/K. La axial inducida cambia el cálculo de P. Los pares DB son los más comunes por su rigidez.', Content: S9 },
  { id: 9, title: 'Evaluación diseño', revealCount: 4, note: 'Vida, rigidez, velocidad y lubricación son los 4 pilares de la evaluación. Si uno falla, el diseño no es válido.', Content: S10 },
  { id: 10, title: 'Lubricación', note: 'Grasa de litio es multipropósito. Aceite para alta velocidad. κ = υ/υ₁ ≥ 1 es la regla de viscosidad.', Content: S11 },
  { id: 11, title: 'Montaje', note: 'Anillo giratorio con interferencia, anillo fijo con juego. Nunca golpear. Un cojinete fijo + uno libre por flecha.', Content: S12 },
  { id: 12, title: 'Puntos clave', note: 'Asignar: problemas 11-1 a 11-16. Próxima clase: cojinetes de deslizamiento y lubricación (cap 12).', Content: S13 },
]

export default function Cap11SlidesPage() {
  return <PresentationShell chapterId={11} partColor={C} slides={SLIDES} />
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
