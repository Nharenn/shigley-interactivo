'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, Menu, X, ChevronLeft, ChevronRight, Home } from 'lucide-react'

const SECTIONS = [
  { id: '2-1', title: 'Resistencia y rigidez del material' },
  { id: '2-2', title: 'Significancia estadística de propiedades' },
  { id: '2-3', title: 'Resistencia y trabajo en frío' },
  { id: '2-4', title: 'Dureza' },
  { id: '2-5', title: 'Propiedades de impacto' },
  { id: '2-6', title: 'Efectos de la temperatura' },
  { id: '2-7', title: 'Sistemas de numeración' },
  { id: '2-8', title: 'Fundición en arena' },
  { id: '2-9', title: 'Moldeo en cascarón' },
  { id: '2-10', title: 'Fundición de revestimiento' },
  { id: '2-11', title: 'Metalurgia de polvos' },
  { id: '2-12', title: 'Procesos de trabajo en caliente' },
  { id: '2-13', title: 'Procesos de trabajo en frío' },
  { id: '2-14', title: 'Tratamiento térmico del acero' },
  { id: '2-15', title: 'Aceros aleados' },
  { id: '2-16', title: 'Aceros resistentes a la corrosión' },
  { id: '2-17', title: 'Materiales para fundición' },
  { id: '2-18', title: 'Metales no ferrosos' },
  { id: '2-19', title: 'Plásticos' },
  { id: '2-20', title: 'Materiales compuestos' },
  { id: '2-21', title: 'Selección de materiales' },
]

function ConceptBlock({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16, margin: '20px 0', background: 'var(--bg-1)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '14px 18px 14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  )
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 13 }}>{id}</span>
      {title}
    </h2>
  )
}

function StressStrainDiagram() {
  const [matType, setMatType] = useState<'ductil' | 'fragil'>('ductil')

  const ductilePoints = 'M 40,220 L 80,160 L 100,150 L 120,140 L 150,135 L 180,125 C 200,118 220,115 235,120 C 250,125 255,130 260,145 L 265,180 L 270,220'
  const brittlePoints = 'M 40,220 L 100,140 L 140,110 L 165,100 L 180,105 L 190,120 L 200,150 L 205,180 L 208,220'

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Diagrama esfuerzo-deformación unitaria</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['ductil', 'fragil'] as const).map(t => (
            <button key={t} onClick={() => setMatType(t)} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '4px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', background: matType === t ? 'var(--accent)' : 'var(--bg-3)', color: matType === t ? 'white' : 'var(--text-2)', transition: 'all 0.2s' }}>
              {t === 'ductil' ? 'Dúctil' : 'Frágil'}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 340 260" style={{ width: '100%', maxWidth: 500, display: 'block', margin: '0 auto' }}>
        <line x1="40" y1="20" x2="40" y2="220" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="40" y1="220" x2="300" y2="220" stroke="var(--border)" strokeWidth="1.5" />
        <text x="22" y="120" fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" transform="rotate(-90 22 120)">σ (Esfuerzo)</text>
        <text x="170" y="238" fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">ε (Deformación)</text>

        {matType === 'ductil' ? (
          <>
            <path d={ductilePoints} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="160" r="4" fill="var(--text-3)" />
            <text x="56" y="155" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">pl</text>
            <circle cx="100" cy="150" r="4" fill="var(--text-3)" />
            <text x="104" y="145" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">el</text>
            <circle cx="120" cy="140" r="4" fill="var(--warning)" />
            <text x="124" y="135" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)">y → Sy</text>
            <circle cx="235" cy="120" r="4" fill="var(--danger)" />
            <text x="238" y="115" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)">u → Su</text>
            <circle cx="270" cy="175" r="4" fill="var(--success)" />
            <text x="255" y="195" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">f → Sf</text>
            <line x1="40" y1="120" x2="235" y2="120" stroke="var(--danger)" strokeWidth="0.5" strokeDasharray="4,3" />
            <text x="42" y="118" fill="var(--danger)" fontSize="8" fontFamily="var(--font-mono)">Su</text>
            <line x1="40" y1="140" x2="120" y2="140" stroke="var(--warning)" strokeWidth="0.5" strokeDasharray="4,3" />
            <text x="42" y="138" fill="var(--warning)" fontSize="8" fontFamily="var(--font-mono)">Sy</text>
          </>
        ) : (
          <>
            <path d={brittlePoints} fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="165" cy="100" r="4" fill="var(--danger)" />
            <text x="168" y="95" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)">u,f → Sut</text>
            <line x1="40" y1="100" x2="165" y2="100" stroke="var(--danger)" strokeWidth="0.5" strokeDasharray="4,3" />
            <text x="42" y="98" fill="var(--danger)" fontSize="8" fontFamily="var(--font-mono)">Su=Sf</text>
            <text x="90" y="240" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Menor deformación — fractura frágil</text>
          </>
        )}
      </svg>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
        {matType === 'ductil' ? (
          <>
            {[
              { c: 'var(--text-3)', l: 'pl = Límite de proporcionalidad' },
              { c: 'var(--warning)', l: 'Sy = Resistencia a la fluencia' },
              { c: 'var(--danger)', l: 'Su = Resistencia última (tensión)' },
              { c: 'var(--success)', l: 'Sf = Resistencia a la fractura' },
            ].map(({ c, l }) => (
              <span key={l} style={{ color: c }}>{l}</span>
            ))}
          </>
        ) : (
          <>
            {[
              { c: 'var(--danger)', l: 'Sut = Resistencia última a tensión' },
              { c: 'var(--text-3)', l: 'Sin punto de fluencia definido' },
            ].map(({ c, l }) => (
              <span key={l} style={{ color: c }}>{l}</span>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function HardnessCalc() {
  const [hb, setHb] = useState(200)
  const su_steel_kpsi = (0.5 * hb).toFixed(0)
  const su_steel_mpa = (3.4 * hb).toFixed(0)
  const hrc = (0.0835 * hb - 1.3).toFixed(1)
  const hv = (1.067 * hb - 2.25).toFixed(0)
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Calculadora: Dureza Brinell → Propiedades</div>
      <div>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>H<sub>B</sub> (Dureza Brinell): {hb}</label>
        <input type="range" min={60} max={700} value={hb} onChange={e => setHb(+e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          { label: 'Su (acero) kpsi', val: su_steel_kpsi, unit: 'kpsi', color: 'var(--danger)', formula: 'Su ≈ 0.5·HB' },
          { label: 'Su (acero) MPa', val: su_steel_mpa, unit: 'MPa', color: 'var(--danger)', formula: 'Su ≈ 3.4·HB' },
          { label: 'Dureza Rockwell C', val: hrc, unit: 'HRC', color: 'var(--warning)', formula: 'HRC ≈ 0.0835·HB - 1.3' },
          { label: 'Dureza Vickers', val: hv, unit: 'HV', color: 'var(--success)', formula: 'HV ≈ 1.067·HB - 2.25' },
        ].map(r => (
          <div key={r.label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 4 }}>{r.formula}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: r.color }}>{r.val} <span style={{ fontSize: 11 }}>{r.unit}</span></div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

type Mode = 'lectura' | 'diapositivas' | 'practica'

const C = 'var(--part-1)'

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const C = 'var(--part-1)'
  const problems = [
    {
      title: 'Problema 1 — Esfuerzo y deformación',
      text: 'Una barra de acero AISI 1020 (E = 207 GPa, S_y = 350 MPa) de 12 mm de diámetro y 300 mm de largo se somete a una carga axial de 30 kN. (a) Calcule el esfuerzo normal σ y la deformación unitaria ε en la zona elástica. (b) Determine si la barra está en el rango elástico o plástico. (c) Calcule el alargamiento total δ.',
      answer: '(a) σ = F/A = 30000 / (π × 0.006²) = 30000 / 1.131×10⁻⁴ = 265 MPa; ε = σ/E = 265×10⁶ / 207×10⁹ = 0.00128. (b) σ = 265 MPa < S_y = 350 MPa → rango elástico. (c) δ = ε·L = 0.00128 × 0.3 = 3.84×10⁻⁴ m = 0.384 mm.',
    },
    {
      title: 'Problema 2 — Dureza y resistencia',
      text: 'Un acero al carbono tiene una dureza Brinell HB = 180. (a) Estime la resistencia última a la tensión Sut usando Sut ≈ 3.45·HB (MPa). (b) Si el límite de fluencia es aproximadamente Sy ≈ 0.75·Sut, estime Sy. (c) Exprese Sut en kpsi (1 kpsi = 6.895 MPa).',
      answer: '(a) Sut = 3.45 × 180 = 621 MPa. (b) Sy = 0.75 × 621 = 466 MPa. (c) Sut = 621 / 6.895 = 90.1 kpsi.',
    },
    {
      title: 'Problema 3 — Esfuerzo térmico',
      text: 'Una barra de aluminio 6061-T6 (α = 23.6×10⁻⁶ /°C, E = 69 GPa, S_y = 275 MPa) de 400 mm de largo a 20°C se coloca entre dos soportes rígidos fijos. (a) Si la temperatura aumenta a 80°C, calcule el esfuerzo térmico. (b) ¿La barra falla? (c) ¿Cuál sería el esfuerzo si fuera de acero (α = 11.7×10⁻⁶ /°C, E = 207 GPa)?',
      answer: '(a) σ = E·α·ΔT = 69×10⁹ × 23.6×10⁻⁶ × 60 = 97.7 MPa. (b) σ = 97.7 MPa < S_y = 275 MPa → la barra no falla. (c) Acero: σ = 207×10⁹ × 11.7×10⁻⁶ × 60 = 145.3 MPa.',
    },
    {
      title: 'Problema 4 — Relación de Poisson',
      text: 'Una placa de acero (E = 207 GPa, ν = 0.30) está sometida a esfuerzos biaxiales: σ_x = 120 MPa y σ_y = 60 MPa. (a) Calcule las deformaciones ε_x y ε_y usando la ley de Hooke generalizada ε_i = (1/E)(σ_i − ν·σ_j). (b) Determine la deformación volumétrica ε_v = ε_x + ε_y + ε_z.',
      answer: '(a) ε_x = (120×10⁶ − 0.3×60×10⁶) / 207×10⁹ = 102×10⁶ / 207×10⁹ = 4.93×10⁻⁴; ε_y = (60×10⁶ − 0.3×120×10⁶) / 207×10⁹ = 24×10⁶ / 207×10⁹ = 1.16×10⁻⁴; ε_z = −0.3(120+60)×10⁶ / 207×10⁹ = −54×10⁶ / 207×10⁹ = −2.61×10⁻⁴. (b) ε_v = 4.93×10⁻⁴ + 1.16×10⁻⁴ − 2.61×10⁻⁴ = 3.48×10⁻⁴.',
    },
  ]
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>P</div>
        <h2 style={{ fontSize: 20, letterSpacing: '-0.02em', color: 'var(--text-1)', margin: 0 }}>Problemas de práctica</h2>
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
        Resuelve estos problemas para aplicar los conceptos del capítulo. Haz clic en cada uno para ver la respuesta.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {problems.map((p, i) => (
          <div key={i} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <button onClick={() => toggle(i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-1)', fontFamily: 'var(--font-mono)', fontSize: 13, textAlign: 'left' as const }}>
              <span>{p.title}</span>
              <span style={{ fontSize: 16, color: 'var(--text-3)', transition: 'transform 0.2s', transform: show.includes(i) ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>
            {show.includes(i) && (
              <div style={{ padding: '0 18px 18px' }}>
                <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>{p.text}</p>
                <div style={{ background: `color-mix(in oklab, ${C} 8%, transparent)`, borderLeft: `3px solid ${C}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '12px 16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, marginBottom: 6 }}>Respuesta:</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', margin: 0, lineHeight: 1.6 }}>{p.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Cap02Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<Mode>('lectura')
  const [activeSection, setActiveSection] = useState('2-1')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', gap: isMobile ? 8 : isTablet ? 12 : 16, padding: '0 16px', height: 56, background: 'color-mix(in oklab, var(--bg-0) 90%, transparent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-soft)' }}>
        {(isMobile || isTablet) ? (
          <>
            <Link href="/" aria-label="Ir al inicio" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, color: 'var(--text-1)', textDecoration: 'none', flexShrink: 0 }}>
              <Home size={18} />
            </Link>
            <button onClick={() => setSidebarOpen(v => !v)} aria-label="Abrir índice" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--text-1)', flexShrink: 0 }}>
              {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              <span style={{ color: 'var(--part-1)', marginRight: 4 }}>2</span>Materiales
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 1</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 2</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--part-1)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/2/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
            <Monitor size={12} />
            {!isMobile && !isTablet && 'Diapositivas'}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'practica' ? 'white' : 'var(--text-2)', background: mode === 'practica' ? 'var(--part-1)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <PenLine size={12} />
            {!isMobile && !isTablet && 'Práctica'}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div style={{ position: 'relative', flex: 1 }}>
        {/* Mobile sidebar overlay */}
        {(isMobile || isTablet) && sidebarOpen && (
          <div onClick={closeSidebar} style={{ position: 'fixed', inset: 0, zIndex: 29, background: 'rgba(0,0,0,0.4)' }} />
        )}
        <aside
          style={{
            position: (isMobile || isTablet) ? 'fixed' : 'absolute',
            top: 0, left: 0, bottom: 0,
            width: (isMobile || isTablet) ? 'min(82vw, 300px)' : 280,
            zIndex: (isMobile || isTablet) ? 30 : 'auto',
            transform: (isMobile || isTablet) ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: (isMobile || isTablet) ? 'transform 0.26s cubic-bezier(0.4,0,0.2,1)' : 'none',
            borderRight: '1px solid var(--border-soft)',
            background: 'var(--bg-0)',
            overflowY: 'auto',
            padding: '22px 18px 22px 22px',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}
        >
          <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-soft)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--part-1)', lineHeight: 1, letterSpacing: '-0.03em' }}>02</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Materiales</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={closeSidebar} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}>
                <span style={{ color: activeSection === s.id ? 'var(--part-1)' : 'var(--text-3)', marginRight: 6 }}>{s.id}</span>
                {s.title}
              </a>
            ))}
          </nav>
          <Link href="/herramientas" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, color: 'white', background: 'var(--part-1)', textDecoration: 'none', marginTop: 'auto' }}>
            🔧 Calculadoras de materiales
          </Link>
        </aside>

        {/* Content */}
        <main style={{
          overflowY: 'auto',
          padding: isMobile ? '24px 16px 100px' : isTablet ? '24px 24px 80px' : '32px 40px 80px',
          paddingBottom: isMobile ? 'calc(100px + var(--safe-bottom, 0px))' : '80px',
          marginLeft: (isMobile || isTablet) ? 0 : 280,
        }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: 'var(--part-1)', borderRadius: '50%', display: 'inline-block' }} />
              Parte 1 · Fundamentos
            </div>
            <h1 style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16, color: 'var(--text-1)' }}>
              <span style={{ color: 'var(--part-1)', marginRight: 12 }}>2</span>
              Materiales
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              La selección del material es una de las decisiones más importantes del diseñador. Este capítulo cubre las propiedades mecánicas, procesos de manufactura, tipos de materiales y métodos de selección para el diseño en ingeniería mecánica.
            </p>

            {mode === 'lectura' ? (
              <>
            {/* 2-1 */}
            <SectionTitle id="2-1" title="Resistencia y rigidez del material" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La probeta de ensayo estándar se usa para obtener las características y resistencias de los materiales. Se carga lentamente en tensión registrando la carga P y la deflexión, y los resultados se grafican como un diagrama de esfuerzo-deformación unitaria.</p>

            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '24px 0' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Ecuaciones fundamentales de la prueba de tensión</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 2.6, textAlign: 'center' as const }}>
                <div><span style={{ color: 'var(--accent)' }}>σ</span> = P / A₀ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 20 }}>(Esfuerzo normal · Ec. 2-1)</span></div>
                <div><span style={{ color: 'var(--success)' }}>ε</span> = (l − l₀) / l₀ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 20 }}>(Deformación unitaria · Ec. 2-2)</span></div>
                <div><span style={{ color: 'var(--accent)' }}>σ</span> = E · <span style={{ color: 'var(--success)' }}>ε</span> <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 20 }}>(Ley de Hooke · Ec. 2-3)</span></div>
                <div><span style={{ color: 'var(--warning)' }}>τ</span><sub>máx</sub> = G · r / l₀ · <span style={{ color: 'var(--warning)' }}>θ</span> <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 20 }}>(Prueba de torsión · Ec. 2-5)</span></div>
              </div>
            </div>

            <StressStrainDiagram />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, margin: '20px 0' }}>
              {[
                { term: 'Límite de proporcionalidad (pl)', def: 'Punto donde la curva σ-ε comienza a desviarse de la línea recta. Por debajo de este punto la ley de Hooke es válida.', color: 'var(--text-3)' },
                { term: 'Límite elástico (el)', def: 'Punto hasta el cual el material es elástico. Más allá del límite elástico la deformación es permanente (plástica).', color: 'var(--text-3)' },
                { term: 'Resistencia a la fluencia (Sy)', def: 'Esfuerzo de fluencia desplazado 0.2% (ε = 0.002). Punto donde la deformación plástica comienza de manera apreciable.', color: 'var(--warning)' },
                { term: 'Resistencia última (Su, Sut)', def: 'Esfuerzo máximo en el diagrama σ-ε. A partir de aquí ocurre el adelgazamiento (necking) en materiales dúctiles.', color: 'var(--danger)' },
                { term: 'Módulo de elasticidad (E)', def: 'Pendiente de la parte lineal del diagrama σ-ε. Medida de la rigidez del material. Acero: E ≈ 207 GPa.', color: 'var(--accent)' },
                { term: 'Módulo de rigidez (G)', def: 'Pendiente de la curva par-giro en prueba de torsión. Acero: G ≈ 79.3 GPa. Relación: G = E / [2(1+ν)].', color: 'var(--success)' },
              ].map((d) => (
                <div key={d.term} style={{ background: 'var(--bg-1)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: d.color, marginBottom: 6 }}>{d.term}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{d.def}</p>
                </div>
              ))}
            </div>

            <ConceptBlock color="var(--accent)" label="Resiliencia y tenacidad" text="La resiliencia (uR = Sy²/2E) es la capacidad de absorber energía dentro del rango elástico sin deformación permanente. La tenacidad (uT ≈ (Sy + Sut)/2 · εf) es la capacidad de absorber energía hasta la fractura — el área total bajo la curva σ-ε." />

            {/* 2-2 */}
            <SectionTitle id="2-2" title="Significancia estadística de las propiedades" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Si se probaran 1,000 piezas nominalmente idénticas, los valores obtenidos para la resistencia estarían distribuidos entre valores máximos y mínimos. La resistencia es de naturaleza estadística. Por esto, las tablas de propiedades reportan el valor mínimo garantizado o el valor promedio con su desviación estándar.</p>

            {/* 2-3 */}
            <SectionTitle id="2-3" title="Resistencia y trabajo en frío" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El trabajo en frío (cold working) endurece el material por deformación, incrementando la resistencia a la fluencia y a la tensión. El factor de trabajo en frío W se define como:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 2.4 }}>
                <div>W = (A₀ − Aᵢ) / A₀ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 2-13)</span></div>
                <div>S'y = σ₀ · εᵢᵐ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Nueva fluencia, si εᵢ ≤ εu)</span></div>
                <div>S'u = Su / (1 − W) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Nueva Sut, si εᵢ ≤ εu)</span></div>
              </div>
            </div>

            {/* 2-4 */}
            <SectionTitle id="2-4" title="Dureza" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La resistencia de un material a la penetración por una herramienta con punta se llama dureza. Las pruebas de dureza son no destructivas y están correlacionadas con las resistencias del material, especialmente la resistencia última a la tensión.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '16px 0' }}>
              {[
                { name: 'Rockwell (HRC, HRB)', desc: 'Más rápida. Se lee directo en carátula. HRC usa diamante, 150 kg. HRB usa bola 1/16", 100 kg.', color: 'var(--accent)' },
                { name: 'Brinell (HB)', desc: 'HB = carga / área esférica huella. Requiere cálculo. Ventaja: correlación directa con Su.', color: 'var(--success)' },
                { name: 'Vickers (HV)', desc: 'Penetrador piramidal de diamante. Escala continua. Aplicable a cualquier dureza.', color: 'var(--warning)' },
              ].map(h => (
                <div key={h.name} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: h.color, marginBottom: 6 }}>{h.name}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{h.desc}</p>
                </div>
              ))}
            </div>
            <HardnessCalc />

            {/* 2-5 */}
            <SectionTitle id="2-5" title="Propiedades de impacto" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Una fuerza externa es de impacto si el tiempo de aplicación es menor que un tercio del período natural de vibración mínimo de la parte. Las pruebas de impacto más comunes son Charpy e Izod, que miden la energía absorbida por una barra con muesca.</p>
            <ConceptBlock color="var(--warning)" label="Temperatura de transición" text="Los materiales acero presentan una transición dúctil-frágil con la temperatura. A baja temperatura la fractura es frágil (astillante), mientras que a alta temperatura la fractura es dúctil (desgarrante). Los diseñadores deben considerar la temperatura de operación al seleccionar materiales estructurales." />

            {/* 2-6 */}
            <SectionTitle id="2-6" title="Efectos de la temperatura" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La resistencia disminuye y la ductilidad aumenta con el incremento de temperatura. A temperaturas elevadas pueden ocurrir fluencia por temperatura (creep) y fatiga térmica. A temperaturas criogénicas los materiales dúctiles pueden volverse frágiles (especialmente los aceros BCC).</p>

            {/* 2-7 */}
            <SectionTitle id="2-7" title="Sistemas de numeración" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
                    {['Sistema', 'Organización', 'Ejemplo', 'Significado'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' as const, fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AISI/SAE', 'Aceros aleados y al carbono', '1045', '10xx=C al carbono; 45=0.45%C'],
                    ['AISI/SAE', 'Acero inoxidable', '304', '304=18%Cr, 8%Ni, austenítico'],
                    ['ASTM', 'Fundición de hierro', 'A48 Grado 20', 'Su mín = 20 kpsi'],
                    ['UNS', 'Metales en general', 'G10450', 'Sistema unificado norteamericano'],
                    ['AA', 'Aleaciones de aluminio', '2024-T4', '2xxx=Al-Cu; T4=solución+env. nat.'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-0)' }}>
                      {row.map((c, j) => <td key={j} style={{ padding: '9px 14px', color: j === 0 ? 'var(--accent)' : j === 3 ? 'var(--text-3)' : 'var(--text-2)' }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2-8 to 2-13 */}
            <SectionTitle id="2-8" title="Procesos de manufactura" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los procesos de manufactura determinan las propiedades finales de la pieza. La selección del proceso está ligada a la selección del material y a las dimensiones requeridas.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, margin: '16px 0' }}>
              {[
                { id: '2-8', proc: 'Fundición en arena', nota: 'Económica. Alta porosidad. Tolerancias amplias. Hierros fundidos, acero.' },
                { id: '2-9', proc: 'Moldeo en cascarón', nota: 'Mejor acabado que arena. Piezas medianas.' },
                { id: '2-10', proc: 'Fundición de revestimiento', nota: 'Alta precisión dimensional. Aleaciones especiales.' },
                { id: '2-11', proc: 'Metalurgia de polvos', nota: 'Poros controlados. Cojinetes autolubricantes.' },
                { id: '2-12', proc: 'Trabajo en caliente', nota: 'Forjado, laminado. Estructura de grano mejorada.' },
                { id: '2-13', proc: 'Trabajo en frío', nota: 'Trefilado, recalcado. Endurecimiento por deformación.' },
              ].map(p => (
                <div key={p.id} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 4 }}>{p.id}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', marginBottom: 6 }}>{p.proc}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0, lineHeight: 1.4 }}>{p.nota}</p>
                </div>
              ))}
            </div>

            {/* 2-14 */}
            <SectionTitle id="2-14" title="Tratamiento térmico del acero" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los tratamientos térmicos modifican la microestructura y propiedades del acero sin cambiar la composición química. Los principales procesos son:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
              {[
                { proc: 'Recocido', desc: 'Calentamiento y enfriamiento lento. Ablanda, elimina tensiones, mejora maquinabilidad.', color: 'var(--text-3)' },
                { proc: 'Normalizado', desc: 'Enfriamiento al aire. Refina grano, alivia tensiones residuales de laminado o forjado.', color: 'var(--text-3)' },
                { proc: 'Temple', desc: 'Enfriamiento rápido (agua, aceite, aire). Produce martensita — muy dura pero frágil.', color: 'var(--warning)' },
                { proc: 'Revenido', desc: 'Recalentamiento post-temple (150-650°C). Reduce fragilidad, ajusta dureza/tenacidad.', color: 'var(--success)' },
                { proc: 'Cementado/Carburizado', desc: 'Difunde carbono en la superficie. Capa superficial dura, núcleo tenaz.', color: 'var(--accent)' },
                { proc: 'Nitrurado', desc: 'Difunde nitrógeno. Capa muy dura, alta resistencia a la fatiga y corrosión.', color: 'var(--accent)' },
              ].map(t => (
                <div key={t.proc} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 12 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.color, marginBottom: 4 }}>{t.proc}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* 2-15 - 2-16 */}
            <SectionTitle id="2-15" title="Aceros aleados y resistentes a la corrosión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los aceros aleados contienen cromo, níquel, molibdeno, vanadio u otros elementos para mejorar hardenabilidad, resistencia mecánica y a la corrosión. Los aceros inoxidables (series 300, 400, 17-4PH) tienen al menos 10.5% Cr, formando una capa pasivante de Cr₂O₃.</p>

            {/* 2-17 - 2-18 */}
            <SectionTitle id="2-17" title="Materiales para fundición y metales no ferrosos" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
                    {['Material', 'E (GPa)', 'G (GPa)', 'ν', 'Su (MPa)', 'Características'].map(h => <th key={h} style={{ padding: '8px 12px', textAlign: 'left' as const, fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Acero al carbono', '207', '79.3', '0.29', '380-700+', 'Económico, versátil, tratable térmicamente'],
                    ['Hierro fundido gris', '100', '41.4', '0.21', '180-250', 'Buena maquinabilidad, amortiguación, frágil'],
                    ['Aluminio (aleac.)', '71.7', '26.9', '0.33', '70-500', 'Ligero, baja densidad (2.7 g/cm³), conductor'],
                    ['Titanio (6Al-4V)', '114', '42.4', '0.34', '900-1200', 'Alta relación S/ρ, resistente a corrosión'],
                    ['Cobre al berilio', '124', '48.3', '0.29', '700-1400', 'Resortes, alta conductividad eléctrica'],
                    ['Magnesio (aleac.)', '44.8', '16.5', '0.35', '140-340', 'Más ligero que aluminio (1.74 g/cm³)'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-0)' }}>
                      {row.map((c, j) => <td key={j} style={{ padding: '8px 12px', color: j === 0 ? 'var(--text-1)' : j === 5 ? 'var(--text-3)' : j <= 3 ? 'var(--accent)' : 'var(--text-2)' }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 2-19 - 2-20 */}
            <SectionTitle id="2-19" title="Plásticos y materiales compuestos" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los plásticos se dividen en termoplásticos (ABS, nylon, UHMWPE — se pueden refundir) y termoestables (epóxicos, poliéster, fenólicos — se curan irreversiblemente). Los compuestos como la fibra de carbono en matriz epóxica ofrecen la mejor relación resistencia/peso disponible.</p>

            {/* 2-21 */}
            <SectionTitle id="2-21" title="Selección de materiales" />
            <ConceptBlock color="var(--success)" label="Método de índices de desempeño (Ashby)" text="El método de Ashby usa mapas de propiedades para seleccionar materiales óptimos para un criterio dado (p. ej. maximizar rigidez por unidad de peso → E^(1/2)/ρ para placas). Las cartas de Ashby grafican dos propiedades en escala log-log mostrando líneas de índice de desempeño constante." />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '20px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Criterios comunes de selección:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { crit: 'Resistencia por peso', indice: 'Sy/ρ' },
                  { crit: 'Rigidez por peso (barra)', indice: 'E/ρ' },
                  { crit: 'Rigidez por peso (viga)', indice: 'E^(1/2)/ρ' },
                  { crit: 'Rigidez por peso (placa)', indice: 'E^(1/3)/ρ' },
                  { crit: 'Conductividad térmica', indice: 'k (W/m·K)' },
                  { crit: 'Resistencia a corrosión', indice: 'Protección superficial' },
                ].map(c => (
                  <div key={c.crit} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-2)' }}>{c.crit}:</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{c.indice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              flexDirection: (isMobile || isTablet) ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: 10,
              marginTop: 48, paddingTop: 28,
              borderTop: '1px solid var(--border-soft)',
            }}>
              <Link href="/capitulo/1" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--bg-2)', color: 'var(--text-1)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
                border: '1px solid var(--border)',
              }}>
                <ChevronLeft size={14} /> Cap. 1: Introducción
              </Link>
              <Link href="/capitulo/3" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--part-1)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Cap. 3: Análisis de carga y esfuerzo <ChevronRight size={14} />
              </Link>
            </div>
          </>
        ) : (
          <PracticaContent />
        )}
          </div>
        </main>
      </div>
    </div>
  )
}
