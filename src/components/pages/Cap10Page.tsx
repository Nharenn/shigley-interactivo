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
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.65 }}>{children}</div>
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

function FigWireStress() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-1/2 — Distribución de τ en la sección del alambre</div>
      <svg viewBox="0 0 360 150" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
        <circle cx="80" cy="75" r="50" fill="none" stroke="var(--text-2)" strokeWidth="2" />
        <circle cx="80" cy="75" r="36" fill="none" stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="3,2" />
        <circle cx="80" cy="40" r="4" fill="var(--text-2)" />
        <text x="80" y="35" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">centro</text>
        <line x1="80" y1="75" x2="130" y2="75" stroke="var(--accent)" strokeWidth="1" />
        <text x="115" y="68" fill="var(--accent)" fontSize="8" fontFamily="var(--font-mono)">r</text>
        <text x="60" y="130" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">d = diámetro alambre</text>
        {[0, 1, 2].map(i => {
          const angle = -30 + i * 15
          const rad = angle * Math.PI / 180
          const len = 30 + 8 * i
          return (
            <line key={i} x1={80 + 36 * Math.cos(rad)} y1={75 + 36 * Math.sin(rad)}
              x2={80 + (36 + len) * Math.cos(rad)} y2={75 + (36 + len) * Math.sin(rad)}
              stroke={i === 2 ? 'var(--danger)' : 'var(--accent)'} strokeWidth="1" opacity={0.6} />
          )
        })}
        <text x="138" y="30" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)">τ max (interior)</text>
        <text x="138" y="45" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">τ menor (exterior)</text>
        <g transform="translate(200, 15)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Factor de curvatura:</text>
          <text x="0" y="18" fill="var(--text-2)" fontSize="12" fontFamily="var(--font-mono)">K<sub>B</sub> = (4C+2)/(4C-3)</text>
          <text x="0" y="38" fill="var(--text-2)" fontSize="12" fontFamily="var(--font-mono)">τ = K<sub>B</sub> · 8FD / πd³</text>
          <text x="0" y="58" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">C = D/d = índice del resorte</text>
          <text x="0" y="75" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">C ↑ → KB ↓ → τ uniforme</text>
          <text x="0" y="92" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">C ↓ → KB ↑ → τ pico interno</text>
        </g>
      </svg>
    </div>
  )
}
function FigSpringEnds() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-3 — Tipos de extremos en resortes de compresión</div>
      <svg viewBox="0 0 400 130" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
        {[
          { x: 10, label: 'Plano', desc: 'Ne = 0' },
          { x: 110, label: 'Plano+esm.', desc: 'Ne = 1' },
          { x: 220, label: 'A escuadra', desc: 'Ne = 2' },
          { x: 330, label: 'A esc.+esm.', desc: 'Ne = 2, Ls = d·Nt' },
        ].map((cfg, idx) => (
          <g key={idx} transform={`translate(${cfg.x}, 20)`}>
            <text x="0" y="0" fill={C} fontSize="8" fontFamily="var(--font-mono)">{cfg.label}</text>
            {[0, 1, 2, 3].map(i => (
              <ellipse key={i} cx={20} cy={25 + i * 16} rx={14} ry={4} fill="none" stroke="var(--text-2)" strokeWidth="1.2" />
            ))}
            {idx >= 2 && <ellipse cx={20} cy={25} rx={14} ry={4} fill="var(--text-2)" opacity="0.3" />}
            {idx === 1 && <line x1={6} y1={25} x2={34} y2={25} stroke="var(--accent)" strokeWidth="0.8" />}
            <text x="10" y="96" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)">{cfg.desc}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
function FigBuckling() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-4 — Pandeo de resorte de compresión: inestable vs estable</div>
      <svg viewBox="0 0 340 140" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto' }}>
        <g transform="translate(30, 15)">
          <text x="0" y="0" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)">Pandea (inestable)</text>
          <path d="M30,20 Q80,80 50,110" fill="none" stroke="var(--danger)" strokeWidth="2" />
          <path d="M50,20 Q70,80 70,110" fill="none" stroke="var(--border-soft)" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x="30" y="122" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">L₀ grande</text>
        </g>
        <g transform="translate(170, 15)">
          <text x="0" y="0" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">Estable (no pandea)</text>
          <path d="M60,110 Q50,70 60,20" fill="none" stroke="var(--success)" strokeWidth="2" />
          <path d="M60,110 Q70,70 60,20" fill="none" stroke="var(--success)" strokeWidth="1" opacity="0.5" />
          <text x="60" y="122" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">L₀ &lt; 5.26D</text>
        </g>
        <line x1="10" y1="132" x2="330" y2="132" stroke="var(--border)" strokeWidth="1" />
        <text x="170" y="138" fill={C} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Condición: L₀ &lt; 2.63·D/α (α = 0.5 extremos fijos)</text>
      </svg>
    </div>
  )
}
function FigBelleville() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-10 — Resortes Belleville: perfil y curvas carga-deflexión</div>
      <svg viewBox="0 0 380 150" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
        <g transform="translate(10, 15)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Perfil cónico</text>
          <line x1="100" y1="40" x2="30" y2="40" stroke="var(--text-2)" strokeWidth="1.5" />
          <line x1="30" y1="40" x2="70" y2="10" stroke="var(--text-2)" strokeWidth="1.5" />
          <line x1="70" y1="10" x2="100" y2="40" stroke="var(--text-2)" strokeWidth="1.5" strokeDasharray="2,2" />
          <path d="M 30,40 Q 65,25 100,40" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <text x="50" y="53" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">D<sub>i</sub></text>
          <text x="85" y="53" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">D<sub>o</sub></text>
          <line x1="70" y1="10" x2="70" y2="0" stroke="var(--text-3)" strokeWidth="0.5" />
          <text x="70" y="-2" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">h</text>
        </g>
        <rect x="140" y="15" width="230" height="120" fill="var(--bg-1)" rx="4" stroke="var(--border-soft)" strokeWidth="0.5" />
        <text x="150" y="30" fill={C} fontSize="8" fontFamily="var(--font-mono)">Curvas F-δ según h/t:</text>
        <line x1="155" y1="85" x2="355" y2="85" stroke="var(--border-soft)" strokeWidth="0.5" />
        <line x1="155" y1="35" x2="155" y2="125" stroke="var(--border-soft)" strokeWidth="0.5" />
        <text x="145" y="88" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">δ</text>
        <text x="357" y="90" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)">F</text>
        {[
          { path: 'M155,118 L355,118', color: 'var(--accent)', label: 'h/t=0 (lineal)' },
          { path: 'M155,118 Q255,80 355,118', color: 'var(--success)', label: 'h/t=√2 (constante)' },
          { path: 'M155,118 Q230,90 255,118 Q280,130 355,118', color: 'var(--danger)', label: 'h/t=2.8 (S)' },
        ].map(({ path, color, label }) => (
          <g key={label}>
            <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
            <text x="320" y={color === 'var(--accent)' ? 115 : color === 'var(--success)' ? 105 : 127} fill={color} fontSize="6" fontFamily="var(--font-mono)">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function SpringCalc() {
  const [F, setF] = useState(50)
  const [d, setD] = useState(3)
  const [Csp, setCsp] = useState(8)
  const [Na, setNa] = useState(10)
  const [material, setMaterial] = useState('piano')

  const D = Csp * d
  const KB = (4 * Csp + 2) / (4 * Csp - 3)
  const G = 80000
  const tau = KB * 8 * F * D / (Math.PI * d ** 3)

  const materials: Record<string, { A: number; m: number; Ssy_frac: number; name: string }> = {
    piano:  { A: 2211, m: 0.145, Ssy_frac: 0.45, name: 'Alambre de piano A228' },
    hard:   { A: 1783, m: 0.190, Ssy_frac: 0.45, name: 'Estirado duro A227' },
    oil:    { A: 1855, m: 0.187, Ssy_frac: 0.50, name: 'Templado aceite A229' },
    crva:   { A: 2005, m: 0.168, Ssy_frac: 0.50, name: 'Cromo-Vanadio A232' },
  }
  const mat = materials[material]
  const Sut = mat.A / (d ** mat.m)
  const Ssy = mat.Ssy_frac * Sut
  const n = Ssy / tau
  const k = (d ** 4 * G) / (8 * D ** 3 * Na)
  const y = F / k
  const Nt = Na + 2
  const Ls = d * Nt
  const L0 = y + Ls + 0.15 * y
  const bucklingLimit = 2.63 * D / 0.5

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid ${C}`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Calculadora — Resorte Helicoidal de Compresión</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>F – Carga (N)</label>
          <input type="range" min={1} max={500} step={1} value={F} onChange={e => setF(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{F} N</span>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>d – Diámetro alambre (mm)</label>
          <input type="range" min={0.5} max={20} step={0.5} value={d} onChange={e => setD(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{d} mm</span>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>Csp – Índice del resorte</label>
          <input type="range" min={4} max={16} step={0.5} value={Csp} onChange={e => setCsp(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{Csp} → D = {D.toFixed(1)} mm</span>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>Na – Espiras activas</label>
          <input type="range" min={3} max={20} step={1} value={Na} onChange={e => setNa(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{Na}</span>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>Material</label>
          <select value={material} onChange={e => setMaterial(e.target.value)}
            style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '4px 8px', fontSize: 12, color: 'var(--text-1)' }}>
            {Object.entries(materials).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginTop: 14 }}>
        {[
          { label: 'KB', value: KB.toFixed(3), clr: 'var(--text-2)' },
          { label: 'τ (esfuerzo)', value: `${tau.toFixed(1)} MPa`, clr: 'var(--warning)' },
          { label: 'Sut', value: `${Sut.toFixed(0)} MPa`, clr: 'var(--text-2)' },
          { label: 'Ssy', value: `${Ssy.toFixed(0)} MPa`, clr: C },
          { label: 'n (seguridad)', value: n.toFixed(2), clr: n >= 1.2 ? 'var(--success)' : 'var(--danger)' },
          { label: 'k (rigidez)', value: `${k.toFixed(1)} N/mm`, clr: 'var(--accent)' },
          { label: 'y (deflexión)', value: `${y.toFixed(2)} mm`, clr: 'var(--warning)' },
          { label: 'L sólida', value: `${Ls.toFixed(1)} mm`, clr: 'var(--text-2)' },
          { label: 'L libre aprox.', value: `${L0.toFixed(1)} mm`, clr: 'var(--text-2)' },
          { label: 'Lím. pandeo', value: `${bucklingLimit.toFixed(1)} mm`, clr: L0 < bucklingLimit ? 'var(--success)' : 'var(--danger)' },
          { label: 'Pandeo', value: L0 < bucklingLimit ? 'No ✓' : 'Sí ✗', clr: L0 < bucklingLimit ? 'var(--success)' : 'var(--danger)' },
          { label: 'Csp (4–12)', value: Csp >= 4 && Csp <= 12 ? 'OK ✓' : 'No ✗', clr: Csp >= 4 && Csp <= 12 ? 'var(--success)' : 'var(--warning)' },
        ].map(({ label, value, clr }) => (
          <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 6, textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: 'var(--text-3)', marginBottom: 1 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: clr }}>{value}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>KB = (4Csp+2)/(4Csp-3) | τ = KB·8FD/πd³ | k = d⁴G/(8D³Na)</p>
    </div>
  )
}

function PracticaContent() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(open === i ? null : i)
  const probs = [
    {
      q: 'P10-1 — Esfuerzo y seguridad. Resorte con d=3 mm, Csp=8, Na=10, F=50 N, alambre de piano A228 (A=2211, m=0.145, Ssy/Sut=0.45). Calcular KB, τ y n.',
      a: <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p><strong>D = Csp·d = 8 × 3 = 24 mm</strong></p>
        <p>KB = (4·8+2)/(4·8−3) = 34/29 = <strong>1.172</strong></p>
        <p>τ = 1.172 · 8 · 50 · 24 / (π · 27) ≈ <strong>132.7 MPa</strong></p>
        <p>Sut = 2211 / 3^0.145 ≈ <strong>1884 MPa</strong> · Ssy = 0.45 · 1884 = <strong>848 MPa</strong></p>
        <p>n = 848 / 132.7 ≈ <strong>6.4 ✓</strong> (amplio margen)</p>
      </div>,
    },
    {
      q: 'P10-2 — Rigidez y deflexión. Mismo resorte (d=3 mm, D=24 mm, Na=10, G=80 000 MPa). Calcular k y la deflexión y bajo F=50 N.',
      a: <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p>k = d⁴·G / (8·D³·Na) = 81 · 80000 / (8 · 13824 · 10)</p>
        <p>k = 6480000 / 1105920 ≈ <strong>5.86 N/mm</strong></p>
        <p>y = F/k = 50 / 5.86 ≈ <strong>8.53 mm</strong></p>
      </div>,
    },
    {
      q: 'P10-3 — Verificación de pandeo. Resorte con D=24 mm, L₀=60 mm, extremos a escuadra y esmerilados fijos (α=0.5). ¿Pandea?',
      a: <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p>Límite de pandeo: L₀ &lt; 2.63·D/α = 2.63 · 24 / 0.5 = <strong>126.2 mm</strong></p>
        <p>L₀ = 60 mm &lt; 126.2 mm → <strong>No pandea ✓</strong></p>
        <p>El resorte es estable. Sería preocupante si L₀ superara ~126 mm.</p>
      </div>,
    },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Práctica — Capítulo 10</h2>
      {probs.map((p, i) => (
        <div key={i} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          <button onClick={() => toggle(i)} style={{ width: '100%', textAlign: 'left', padding: '14px 16px', background: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, border: 'none', color: 'var(--text-1)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{p.q}</span>
            <span style={{ color: C, fontSize: 18, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7 }}>
              {p.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const sections = [
  { id: 's10-1', label: '10-1 Esfuerzos en resortes' },
  { id: 's10-2', label: '10-2 Factor de curvatura' },
  { id: 's10-3', label: '10-3 Deflexión y rigidez' },
  { id: 's10-4', label: '10-4 Tipos de extremos' },
  { id: 's10-5', label: '10-5 Estabilidad (pandeo)' },
  { id: 's10-6', label: '10-6 Materiales' },
  { id: 's10-7', label: '10-7 Diseño estático' },
  { id: 's10-8', label: '10-8 Frecuencia crítica' },
  { id: 's10-9', label: '10-9 Carga por fatiga' },
  { id: 's10-10', label: '10-10 Resortes de extensión' },
  { id: 's10-11', label: '10-11 Resortes de torsión' },
  { id: 's10-12', label: '10-12 Resortes de hoja' },
  { id: 's10-13', label: '10-13 Resortes Belleville' },
  { id: 's10-14', label: '10-14 Resortes diversos' },
]

export default function Cap10Page() {
  return (
    <ChapterShell
      chapterId={10}
      chapterNum="10"
      title="Resortes mecánicos"
      subtitle="Análisis y diseño de resortes helicoidales de compresión y extensión, resortes de torsión, Belleville y de hoja bajo cargas estáticas y de fatiga."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="s10-1">10-1 Esfuerzos en resortes helicoidales</SectionTitle>
      <PreguntaBlock text="¿Dónde se rompe un resorte: en la parte de adentro o de afuera del alambre? La curvatura interna del alambre hace que el esfuerzo sea mayor en la fibra interior." />
      {p('Un <strong>resorte helicoidal</strong> es un alambre enrollado en hélice. Al aplicar una carga axial F, el alambre se torsiona. El <strong>índice del resorte</strong> C = D/d (diámetro medio / diámetro del alambre) determina la intensidad del efecto de curvatura. El rango recomendado es 4 ≤ C ≤ 12.')}
      <ConceptBlock title="Geometría básica del resorte">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 4, fontSize: 12 }}>
          <div><strong>C</strong> = D/d (índice)</div>
          <div><strong>D</strong> = diám. medio</div>
          <div><strong>d</strong> = diám. alambre</div>
          <div><strong>Na</strong> = espiras activas</div>
          <div><strong>Nt</strong> = espiras totales</div>
          <div><strong>L₀</strong> = long. libre</div>
          <div><strong>Ls</strong> = long. sólida</div>
          <div><strong>p</strong> = paso</div>
        </div>
      </ConceptBlock>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>El esfuerzo cortante máximo incluye un factor de corrección por curvatura. El factor de Bergsträsser (KB) es el más usado hoy en día:</p>
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>K<sub>B</sub> = (4C + 2) / (4C − 3) &emsp; (factor de Bergsträsser)</div>
          <div>τ = K<sub>B</sub> · 8FD / (πd³)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Factor de Wahl (alternativo): K<sub>W</sub> = (4C−1)/(4C−4) + 0.615/C</div>
        </div>
      </FormulaBox>
      <FigWireStress />
      <OjoBlock text="En carga estática, los efectos de curvatura se pueden despreciar si el resorte ha sido predeformado (prestressed). Pero en fatiga, ¡siempre usa KB! La predeformación no es confiable bajo carga cíclica." />

      <SectionTitle id="s10-2">10-2 Factor de curvatura</SectionTitle>
      {p('Como vimos, el factor KB captura dos efectos: el <strong>esfuerzo cortante directo</strong> y el <strong>efecto de curvatura</strong>. El esfuerzo cortante directo Ks = (2C+1)/(2C) corrige solo por la componente directa; KB incluye además la curvatura que aumenta el esfuerzo en la fibra interior del alambre.')}
      <FormulaBox>
        K<sub>s</sub> = (2C+1)/(2C) &emsp; K<sub>c</sub> = K<sub>B</sub>/K<sub>s</sub> (solo curvatura)
      </FormulaBox>

      <SectionTitle id="s10-3">10-3 Deflexión y constante de resorte</SectionTitle>
      <PreguntaBlock text="¿Más espiras = más suave o más duro? Más espiras = más suave (menor k). Más diámetro = más suave. Alambre más grueso = más duro." />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>y = 8FD³N<sub>a</sub> / (d⁴G) &emsp; (deflexión)</div>
          <div>k = d⁴G / (8D³N<sub>a</sub>) &emsp; (constante de resorte = F/y)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>G ≈ 80 GPa (aceros para resorte a temperatura ambiente)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s10-4">10-4 Tipos de extremos y longitudes</SectionTitle>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>La forma de los extremos afecta el número de espiras activas y la longitud sólida:</p>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th style={{ padding: '6px 8px' }}>Tipo de extremo</th><th style={{ padding: '6px 8px' }}>Ne</th>
              <th style={{ padding: '6px 8px' }}>Nt</th><th style={{ padding: '6px 8px' }}>Ls</th>
            </tr>
          </thead>
          <tbody>
            {[['Plano','0','Na','d(Nt+1)'],['Plano y esmerilado','1','Na+1','d·Nt'],
              ['A escuadra','2','Na+2','d(Nt+1)'],['A escuadra y esmerilado','2','Na+2','d·Nt']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FigSpringEnds />
      <p style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 12 }}>Los extremos <strong>a escuadra y esmerilados</strong> son los recomendados para aplicaciones importantes, ya que aseguran mejor transferencia de carga.</p>

      <SectionTitle id="s10-5">10-5 Estabilidad (pandeo)</SectionTitle>
      <PreguntaBlock text="¿Un resorte se puede pandear como una columna? ¡Sí! Un resorte de compresión muy largo en relación a su diámetro puede pandearse lateralmente." />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>L₀ &lt; 2.63·D / α &emsp; (condición de estabilidad absoluta)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>α = 0.5 (extremos fijos), α = 1.0 (articulados), α = 2.0 (un extremo libre)</div>
        </div>
      </FormulaBox>
      <FigBuckling />

      <SectionTitle id="s10-6">10-6 Materiales para fabricar resortes</SectionTitle>
      <PreguntaBlock text="¿El alambre de piano es para resortes de piano? No exactamente — es el mejor acero para resortes pequeños de alta resistencia." />
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>La resistencia a la tensión varía con el diámetro del alambre. Se modela con Sut = A / d^m, donde A y m son constantes del material:</p>
      <FormulaBox>
        S<sub>ut</sub> = A / d<sup>m</sup> &emsp; (d en mm → A en MPa·mm<sup>m</sup>)
      </FormulaBox>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead><tr style={{ backgroundColor: C, color: 'white' }}>
            <th style={{ padding: '6px 8px' }}>Material</th><th style={{ padding: '6px 8px' }}>A (MPa·mm^m)</th>
            <th style={{ padding: '6px 8px' }}>m</th><th style={{ padding: '6px 8px' }}>Ssy/Sut</th><th style={{ padding: '6px 8px' }}>T_max (°C)</th>
          </tr></thead>
          <tbody>
            {[['Piano A228','2211','0.145','0.45','120'],['Duro A227','1783','0.190','0.45','120'],
              ['Aceite A229','1855','0.187','0.50','180'],['Cr-Va A232','2005','0.168','0.50','220'],
              ['Cr-Si A401','1974','0.108','0.50','250']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="s10-7">10-7 Diseño para servicio estático</SectionTitle>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>El procedimiento de diseño para resortes de compresión bajo carga estática sigue estos pasos:</p>
      <ConceptBlock title="Guías de diseño">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li>4 ≤ C ≤ 12 (índice del resorte)</li>
          <li>3 ≤ Na ≤ 15 (espiras activas)</li>
          <li>ξ ≥ 0.15 (rebase fraccional al cierre: Fs = (1+ξ)·Fmax)</li>
          <li>ns ≥ 1.2 (factor de seguridad a la altura sólida)</li>
          <li>Fmax ≤ 7/8 · Fs (límite de operación lineal)</li>
        </ul>
      </ConceptBlock>
      <SpringCalc />

      <SectionTitle id="s10-8">10-8 Frecuencia crítica de resortes</SectionTitle>
      <PreguntaBlock text="¿Puede un resorte entrar en resonancia como un puente? Sí, y la consecuencia es la surgencia — el resorte vibra violentamente y puede fallar." />
      {p('Los resortes tienen una frecuencia natural de vibración. Si la frecuencia de excitación (por ejemplo, la velocidad de un motor) coincide con la frecuencia natural del resorte, se produce <strong>surgencia</strong> (spring surge): vibraciones violentas que pueden causar falla rápida.')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700 }}>Frecuencia natural del resorte:</div>
          <div>f = (1/2) · √(k · g / W) &emsp; [Hz]</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>k = constante del resorte, W = peso del resorte, g = gravedad</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Criterio de diseño:</div>
          <div>f<sub>naturaleza</sub> &gt; 15 · f<sub>operación</sub> &emsp; (para evitar resonancia)</div>
        </div>
      </FormulaBox>
      <OjoBlock text="La surgencia no es teórica — es una causa real de falla en resortes de válvulas de motores. Si la frecuencia de operación se acerca a la natural del resorte, considera usar materiales con mayor amortiguamiento o cambiar la geometría para desplazar la frecuencia natural." />

      <SectionTitle id="s10-9">10-9 Carga por fatiga en resortes</SectionTitle>
      <PreguntaBlock text="¿Puede fallar un resorte por fatiga? Sí, y el criterio de Goodman para cortante nos da el factor de seguridad." />
      {p('Para resortes bajo carga cíclica (compresión F<sub>min</sub> a F<sub>max</sub>), usamos esfuerzos medio y alternante con el criterio de Goodman para cortante. Los datos de Zimmerli son la referencia más usada para Se en resortes:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>τ<sub>a</sub> = K<sub>B</sub> · 8·F<sub>a</sub>·D / πd³ &emsp; (F<sub>a</sub> = (F<sub>max</sub>−F<sub>min</sub>)/2)</div>
          <div>τ<sub>m</sub> = K<sub>B</sub> · 8·F<sub>m</sub>·D / πd³ &emsp; (F<sub>m</sub> = (F<sub>max</sub>+F<sub>min</sub>)/2)</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>Goodman para resortes (cortante):</div>
          <div>τ<sub>a</sub>/S<sub>se</sub> + τ<sub>m</sub>/S<sub>su</sub> = 1/n<sub>f</sub></div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>S<sub>su</sub> ≈ 0.67·S<sub>ut</sub> &emsp; S<sub>se</sub> (Zimmerli): 241 MPa (alambre &lt; 10 mm, sin predeformación)</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Procedimiento de diseño a fatiga">
        <ol style={{ paddingLeft: 20, margin: 0, lineHeight: 1.7 }}>
          <li>Seleccionar material y calcular S<sub>ut</sub> = A/d<sup>m</sup></li>
          <li>Definir d y D (índice C = D/d entre 4 y 12)</li>
          <li>Calcular τ<sub>a</sub> y τ<sub>m</sub> con KB</li>
          <li>Verificar n<sub>f</sub> = 1/(τ<sub>a</sub>/S<sub>se</sub> + τ<sub>m</sub>/S<sub>su</sub>) ≥ n<sub>d</sub></li>
          <li>Verificar pandeo y C<sub>sp</sub></li>
          <li>Si no cumple, iterar con d o D diferentes</li>
        </ol>
      </ConceptBlock>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-7 — Diagrama de Goodman para resortes (cortante)</div>
        <svg viewBox="0 0 360 280" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
          {(() => {
            const w = 360, h = 280, m = 40
            const Sse = 241, Ssu = 0.67 * 1884
            const sx = (w - 2 * m) / Ssu, sy = (h - 2 * m) / (Sse * 1.1)
            return (
              <>
                <line x1={m} y1={h - m} x2={w - m} y2={h - m} stroke="var(--border)" strokeWidth="1" />
                <line x1={m} y1={m} x2={m} y2={h - m} stroke="var(--border)" strokeWidth="1" />
                <text x={m - 4} y={m - 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">τa</text>
                <text x={w - m + 4} y={h - m + 14} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">τm</text>
                <circle cx={m} cy={h - m - Sse * sy} r="3" fill="var(--text-3)" />
                <text x={m + 12} y={h - m - Sse * sy + 3} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">(0, Sse)</text>
                <circle cx={m + Ssu * sx} cy={h - m} r="3" fill="var(--text-3)" />
                <text x={m + Ssu * sx - 10} y={h - m + 14} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">(Ssu, 0)</text>
                <line x1={m} y1={h - m - Sse * sy} x2={m + Ssu * sx} y2={h - m} stroke={C} strokeWidth="2" />
                <text x={m + 120} y={h - m - Sse * sy + 50} fill={C} fontSize="9" fontFamily="var(--font-mono)" transform={`rotate(33, ${m + 120}, ${h - m - Sse * sy + 50})`}>Goodman (cortante)</text>
                <circle cx={m + 300 * sx} cy={h - m - 120 * sy} r="4" fill="var(--warning)" />
                <text x={m + 300 * sx + 10} y={h - m - 120 * sy + 3} fill="var(--warning)" fontSize="8" fontFamily="var(--font-mono)">Punto op.</text>
              </>
            )
          })()}
        </svg>
      </div>

      <SectionTitle id="s10-10">10-10 Resortes helicoidales de extensión</SectionTitle>
      {p('Los resortes de extensión se fabrican con espiras cerradas y pretensados. Las garras (ganchos) introducen concentraciones de esfuerzo adicionales que suelen ser el punto crítico de falla.')}
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 10-9 — Tipos de gancho en resortes de extensión</div>
        <svg viewBox="0 0 380 140" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          <g transform="translate(10, 10)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Gancho completo</text>
            <path d="M20,25 L20,90 Q20,105 35,105 Q50,105 50,90 L50,70" fill="none" stroke="var(--accent)" strokeWidth="3" />
            {[0,1,2,3,4,5].map(i => <ellipse key={i} cx={20} cy={55+i*8} rx={10} ry={3} fill="none" stroke="var(--text-2)" strokeWidth="1" />)}
            <text x="35" y="120" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">R₁/d &gt; 2</text>
          </g>
          <g transform="translate(130, 10)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Gancho medio</text>
            <path d="M20,25 L20,70 Q20,85 30,85 Q40,85 40,70 L40,55" fill="none" stroke="var(--success)" strokeWidth="3" />
            {[0,1,2,3,4].map(i => <ellipse key={i} cx={20} cy={50+i*8} rx={10} ry={3} fill="none" stroke="var(--text-2)" strokeWidth="1" />)}
            <text x="30" y="100" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">C₁ = 2R₁/d</text>
          </g>
          <g transform="translate(260, 10)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Gancho corto</text>
            <path d="M15,25 L15,50 L35,50 L35,30" fill="none" stroke="var(--danger)" strokeWidth="3" />
            {[0,1,2,3].map(i => <ellipse key={i} cx={15} cy={35+i*8} rx={10} ry={3} fill="none" stroke="var(--text-2)" strokeWidth="1" />)}
            <text x="25" y="70" fill="var(--danger)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">KA alto</text>
            <text x="25" y="80" fill="var(--danger)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">(punto crítico)</text>
          </g>
        </svg>
      </div>
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>τ = K<sub>B</sub> · 8FD/πd³ (en espiras, igual que compresión)</div>
          <div>σ = K<sub>A</sub> · 32FR<sub>1</sub>/πd³ (flexión en gancho)</div>
          <div>K<sub>A</sub> = (4C₁² − C₁ − 1) / (4C₁(C₁−1)) &emsp; C₁ = 2R₁/d</div>
        </div>
      </FormulaBox>
      <OjoBlock text="Los ganchos de resortes de extensión son el punto débil. Siempre verifica el esfuerzo en el gancho: concentración de flexión + torsión = falla asegurada si no se revisa." />
      {p('Los resortes de extensión tienen una <strong>precarga inicial F<sub>i</sub></strong> (tensión de fabricación) que debe superarse antes de que el resorte empiece a deflectar. Esta precarga se debe al cierre de las espiras durante la fabricación:')}
      <FormulaBox>
        F<sub>i</sub> = τ<sub>i</sub> · π · d³ / (8 · D) &emsp; (precarga inicial, donde τ<sub>i</sub> = esfuerzo de cierre residual)
      </FormulaBox>

      <SectionTitle id="s10-11">10-11 Resortes de torsión</SectionTitle>
      {p('A pesar de su nombre, trabajan en <strong>flexión</strong>, no torsión. El esfuerzo principal es de flexión en el alambre. <strong>Diferencia fundamental:</strong> a diferencia de los resortes de compresión, los resortes de torsión debemos enrollarlos de modo que se <em>cierran</em> al aplicar la carga — si se abren, el esfuerzo aumenta dramáticamente en el radio interior.')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>σ = K<sub>B</sub>\' · 32Fr / πd³ &emsp; (esfuerzo de flexión)</div>
          <div>K<sub>B</sub>\' = (4C²−C−1) / (4C(C−1)) &emsp; (curvatura interna)</div>
          <div>k<sub>θ</sub> = d⁴E / (10.8·D·N<sub>a</sub>) &emsp; [N·mm/vuelta]</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s10-12">10-12 Resortes de hoja</SectionTitle>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>Los resortes de hoja semielípticos se modelan como vigas de sección variable:</p>
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>k = Enbt³ / (6L³) &emsp; (n = número de hojas, b = ancho, t = espesor)</div>
          <div>σ = 3FL / (nbt²)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s10-13">10-13 Resortes Belleville (de disco)</SectionTitle>
      <PreguntaBlock text="¿Un resorte con forma de plato que puede dar fuerza constante? Los Belleville son únicos por su curva carga-deflexión no lineal ajustable." />
      {p('Los resortes Belleville (arandelas de disco cónico) soportan cargas muy grandes en espacio axial reducido. La relación h/t (altura de cono/espesor) determina la forma de la curva: lineal (h/t=0), fuerza constante (h/t=√2), o curva en S (h/t=2.83).')}
      <FigBelleville />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>F = (4Eδ/((1−ν²)·C₁·D<sub>o</sub>²)) · [(h−δ/2)(h−δ)t + t³]</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>C₁ = 6/π · (α−1)²/α², α = D<sub>o</sub>/D<sub>i</sub></div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Aplicaciones de Belleville">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li>Sujeción de herramientas y matrices</li>
          <li>Embragues y mecanismos de fuerza constante</li>
          <li>Válvulas de alivio de presión</li>
          <li>Apilamiento en serie (↑ deflexión) o paralelo (↑ fuerza)</li>
        </ul>
      </ConceptBlock>

      <SectionTitle id="s10-14">10-14 Resortes diversos</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 16 }}>
        {[
          { tipo: 'Resorte de voluta', desc: 'Espira plana rectangular en forma cónica. Alta relación carga-desplazamiento.' },
          { tipo: 'Resorte de banda (flat)', desc: 'Tira plana de acero en espiral. Almacena energía de rotación.' },
          { tipo: 'Resorte de caucho', desc: 'Alta amortiguación, aislamiento de vibraciones. K no lineal.' },
          { tipo: 'Resorte neumático', desc: 'Amortiguadores de vehículos. K ajustable con presión.' },
        ].map(({ tipo, desc }) => (
          <div key={tipo} style={{ padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: 12, marginBottom: 4 }}>{tipo}</div>
            <div style={{ color: 'var(--text-3)', fontSize: 11, lineHeight: 1.4 }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Resumen — Fórmulas clave</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, fontSize: 12 }}>
          {[
            ['Índice', 'C = D/d (rango 4–12)'],
            ['KB Bergsträsser', 'KB = (4C+2)/(4C-3)'],
            ['Esfuerzo cortante', 'τ = KB·8FD/(πd³)'],
            ['Constante k', 'k = d⁴G/(8D³Na)'],
            ['Sut material', 'Sut = A/d^m'],
            ['Estabilidad', 'L₀ < 2.63D/α'],
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
