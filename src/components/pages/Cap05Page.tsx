'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, Menu, X, ChevronLeft, ChevronRight, Home } from 'lucide-react'

const SECTIONS = [
  { id: '5-1', title: 'Resistencia estática' },
  { id: '5-2', title: 'Concentración del esfuerzo' },
  { id: '5-3', title: 'Teorías de falla' },
  { id: '5-4', title: 'Esfuerzo cortante máximo (ECM / Tresca)' },
  { id: '5-5', title: 'Energía de distorsión (ED / von Mises)' },
  { id: '5-6', title: 'Mohr-Coulomb para dúctiles (CMD)' },
  { id: '5-7', title: 'Resumen: materiales dúctiles' },
  { id: '5-8', title: 'Esfuerzo normal máximo (ENM)' },
  { id: '5-9', title: 'Modificaciones Mohr para frágiles' },
  { id: '5-10', title: 'Resumen: materiales frágiles' },
  { id: '5-11', title: 'Selección de criterios de falla' },
  { id: '5-12', title: 'Mecánica de fractura' },
  { id: '5-13', title: 'Análisis estocástico' },
  { id: '5-14', title: 'Ecuaciones de diseño importantes' },
]

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 13 }}>{id}</span>
      {title}
    </h2>
  )
}

function ConceptBlock({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, margin: '20px 0', background: 'var(--bg-1)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '14px 18px 14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  )
}

function FailureTheoryPlot() {
  const [theory, setTheory] = useState<'MSS' | 'DE' | 'both'>('both')
  const size = 260
  const center = size / 2
  const scale = center / 1.5

  const mssBoundary = [
    [1, 0], [1, 1], [0, 1], [-1, 0], [-1, -1], [0, -1], [1, 0],
  ]
  const vonMisesPoints = Array.from({ length: 100 }, (_, i) => {
    const t = (i / 99) * 2 * Math.PI
    return [Math.cos(t), Math.sin(t) + Math.cos(t) * 0.5]
  })

  const toSvg = (x: number, y: number) => [center + x * scale, center - y * scale] as [number, number]

  const mssPath = mssBoundary.map((p, i) => {
    const [sx, sy] = toSvg(p[0], p[1])
    return `${i === 0 ? 'M' : 'L'} ${sx} ${sy}`
  }).join(' ') + ' Z'

  // DE ellipse: σ1² - σ1σ2 + σ2² = Sy² in normalized coords
  const dePoints: string[] = []
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * 2 * Math.PI
    const s1 = Math.cos(t) + Math.sin(t) / Math.sqrt(3)
    const s2 = -Math.cos(t) + Math.sin(t) / Math.sqrt(3)
    const [sx, sy] = toSvg(s1, s2)
    dePoints.push(`${i === 0 ? 'M' : 'L'} ${sx} ${sy}`)
  }
  const dePath = dePoints.join(' ') + ' Z'

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Diagrama de teorías de falla (esfuerzo plano, Sy=1)</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['MSS', 'DE', 'both'] as const).map(t => (
            <button key={t} onClick={() => setTheory(t)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: theory === t ? 'var(--accent)' : 'var(--bg-3)', color: theory === t ? 'white' : 'var(--text-2)' }}>
              {t === 'both' ? 'Ambas' : t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ overflow: 'visible' }}>
          <line x1={0} y1={center} x2={size} y2={center} stroke="var(--border)" strokeWidth="1" />
          <line x1={center} y1={0} x2={center} y2={size} stroke="var(--border)" strokeWidth="1" />
          <text x={size - 4} y={center - 4} fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">σ₁/Sy</text>
          <text x={center + 4} y={10} fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)">σ₂/Sy</text>
          {/* Sy markers */}
          {[-1, 1].map(v => (
            <>
              <circle key={`h${v}`} cx={center + v * scale} cy={center} r="3" fill="var(--text-3)" />
              <circle key={`v${v}`} cx={center} cy={center - v * scale} r="3" fill="var(--text-3)" />
            </>
          ))}
          <text x={center + scale + 4} y={center + 3} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">1</text>
          <text x={center - scale - 4} y={center + 3} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">-1</text>
          <text x={center + 4} y={center - scale - 2} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">1</text>
          <text x={center + 4} y={center + scale + 10} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">-1</text>

          {(theory === 'MSS' || theory === 'both') && (
            <path d={mssPath} fill="rgba(59,130,246,0.08)" stroke="var(--accent)" strokeWidth="2" strokeDasharray={theory === 'both' ? '5,3' : 'none'} />
          )}
          {(theory === 'DE' || theory === 'both') && (
            <path d={dePath} fill="rgba(16,185,129,0.08)" stroke="var(--success)" strokeWidth="2" />
          )}

          {theory === 'both' && (
            <>
              <text x={40} y={20} fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">-- MSS (Tresca)</text>
              <text x={40} y={32} fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">— DE (von Mises)</text>
            </>
          )}
        </svg>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 12, textAlign: 'center' as const }}>La zona de seguridad está dentro de cada curva. DE es menos conservadora (~15% más resistente que MSS).</p>
    </div>
  )
}

function StaticFailureCalc() {
  const [sigma1, setSigma1] = useState(200)
  const [sigma2, setSigma2] = useState(100)
  const [Sy, setSy] = useState(400)

  const sigma_vm = Math.sqrt(sigma1 ** 2 - sigma1 * sigma2 + sigma2 ** 2)
  const sigma_max_shear = (Math.abs(sigma1) + Math.abs(sigma1 - sigma2) + Math.abs(sigma2)) / 2
  const n_DE = Sy / sigma_vm
  const n_MSS = Sy / Math.max(Math.abs(sigma1 - sigma2), Math.abs(sigma1), Math.abs(sigma2))

  const color_de = n_DE >= 2 ? 'var(--success)' : n_DE >= 1 ? 'var(--warning)' : 'var(--danger)'
  const color_mss = n_MSS >= 2 ? 'var(--success)' : n_MSS >= 1 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Calculadora: Factor de seguridad estático (MSS y DE)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>σ₁ (MPa): {sigma1}</label>
          <input type="range" min={-500} max={500} value={sigma1} onChange={e => setSigma1(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>σ₂ (MPa): {sigma2}</label>
          <input type="range" min={-500} max={500} value={sigma2} onChange={e => setSigma2(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 8 }}>Sy (MPa): {Sy}</label>
          <input type="range" min={100} max={1200} value={Sy} onChange={e => setSy(+e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 6 }}>σ' = √(σ₁²−σ₁σ₂+σ₂²) = {sigma_vm.toFixed(1)} MPa</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: color_de }}>n = {n_DE.toFixed(2)}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--success)', marginTop: 4 }}>Energía de Distorsión (von Mises)</div>
        </div>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 6 }}>τ_máx = max(|σ₁-σ₂|,|σ₁|,|σ₂|)/2</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: color_mss }}>n = {n_MSS.toFixed(2)}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginTop: 4 }}>Esfuerzo Cortante Máximo (Tresca)</div>
        </div>
      </div>
    </div>
  )
}

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const C = 'var(--part-2)'
  const problems = [
    {
      num: 1,
      enunciado: 'Un punto tiene σx=150 MPa, σy=50 MPa, τxy=40 MPa. Sy=250 MPa. Calcular el esfuerzo de von Mises σ\'=√(σx²−σxσy+σy²+3τxy²) y el factor de seguridad n.',
      respuesta: 'σ\'=√(150²-150×50+50²+3×40²)=√(22500-7500+2500+4800)=√22300=149.3 MPa; n=250/149.3=1.67.',
    },
    {
      num: 2,
      enunciado: 'Mismos datos del problema 1. Calcular σ₁, σ₂, τ_max y el factor de seguridad por Tresca (n=Sy/(2·τ_max)).',
      respuesta: 'C=(150+50)/2=100; R=√((150-50)/2)²+40²)=√(50²+40²)=64.03; σ₁=164.03, σ₂=35.97; τ_max=R=64.03 MPa; n=Sy/(2τ_max)=250/(2×64.03)=1.95.',
    },
    {
      num: 3,
      enunciado: 'Un hierro fundido tiene Sut=350 MPa y Suc=1000 MPa. Los esfuerzos principales son σ₁=120 MPa (tensión) y σ₃=-300 MPa (compresión). Evaluar si falla según Mohr-Coulomb: σ₁/Sut−σ₃/Suc=1/n.',
      respuesta: '120/350−(-300)/1000=0.343+0.3=0.643; n=1/0.643=1.56 >1 → no falla.',
    },
    {
      num: 4,
      enunciado: 'Una placa de aleación de aluminio 7075-T6 tiene KIC=24 MPa√m y Sy=500 MPa. Sometida a σ=200 MPa con una grieta de borde a=3 mm en una placa ancha (β=1.12). Calcular K_I=β·σ·√(πa) y el factor de seguridad n=KIC/KI.',
      respuesta: 'K_I=1.12×200×√(π×0.003)=1.12×200×0.0971=21.75 MPa√m; n=24/21.75=1.10.',
    },
  ]
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 40, height: 40, background: C, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>P</span>
        </div>
        <div>
          <h2 style={{ fontSize: 22, color: 'var(--text-1)', margin: 0 }}>Problemas de práctica</h2>
          <p style={{ color: 'var(--text-3)', fontSize: 13, margin: '2px 0 0', fontFamily: 'var(--font-mono)' }}>Resuelve y compara con la respuesta</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {problems.map((p, i) => (
          <div key={i} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 10 }}>Problema {p.num}</div>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>{p.enunciado}</p>
            <button onClick={() => toggle(i)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: show.includes(i) ? C : 'transparent', color: show.includes(i) ? 'white' : C, border: `1px solid ${C}`, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer' }}>
              {show.includes(i) ? '▲ Ocultar' : '▼ Ver respuesta'}
            </button>
            {show.includes(i) && (
              <div style={{ marginTop: 14, padding: '14px 18px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${C}`, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.9 }}>
                {p.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

type Mode = 'lectura' | 'diapositivas' | 'practica'

export default function Cap05Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<Mode>('lectura')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)
  const [activeSection, setActiveSection] = useState('5-3')

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
              <span style={{ color: 'var(--part-2)', marginRight: 4 }}>5</span>Fallas resultantes de carga estática
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 2</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 5</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--part-2)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/5/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
            <Monitor size={12} />
            {!isMobile && !isTablet && 'Diapositivas'}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'practica' ? 'white' : 'var(--text-2)', background: mode === 'practica' ? 'var(--part-2)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <PenLine size={12} />
            {!isMobile && !isTablet && 'Práctica'}
          </button>
        </div>
      </div>

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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--part-2)', lineHeight: 1, letterSpacing: '-0.03em' }}>05</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Fallas resultantes<br />de carga estática</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={closeSidebar} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}>
                <span style={{ color: activeSection === s.id ? 'var(--part-2)' : 'var(--text-3)', marginRight: 6 }}>{s.id}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <main style={{
          overflowY: 'auto',
          padding: isMobile ? '24px 16px 100px' : isTablet ? '24px 24px 80px' : '32px 40px 80px',
          paddingBottom: isMobile ? 'calc(100px + var(--safe-bottom, 0px))' : '80px',
          marginLeft: (isMobile || isTablet) ? 0 : 280,
        }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: 'var(--part-2)', borderRadius: '50%', display: 'inline-block' }} />
              Parte 2 · Prevención de fallas
            </div>
            <h1 style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16, color: 'var(--text-1)' }}>
              <span style={{ color: 'var(--part-2)', marginRight: 12 }}>5</span>
              Fallas resultantes de carga estática
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              Las teorías de falla traducen estados de esfuerzo multiaxiales complejos en un único esfuerzo equivalente comparable con la resistencia del material. Este capítulo cubre los criterios para materiales dúctiles (von Mises, Tresca) y frágiles (Mohr, ENM).
            </p>

            {mode === 'lectura' ? (<>
            {/* 5-1 */}
            <SectionTitle id="5-1" title="Resistencia estática" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La resistencia estática de una pieza depende no sólo del material, sino también de la geometría (concentraciones de esfuerzo), el acabado superficial, el tratamiento térmico y la condición de uso. Los datos de resistencia de tablas (Sy, Su) son propiedades del material, no de la pieza en servicio.</p>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Cuatro categorías de diseño determinan cuántas pruebas se justifican: desde componentes críticos con peligro de vida (extensa experimentación) hasta piezas de producción limitada (sólo valores de tablas).</p>

            {/* 5-2 */}
            <SectionTitle id="5-2" title="Concentración del esfuerzo" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para materiales dúctiles con carga estática, el factor de concentración del esfuerzo Kt generalmente se toma como 1.0, porque la plasticidad local en la muesca redistribuye el esfuerzo antes de que ocurra la falla general. Para materiales frágiles, Kt siempre debe aplicarse.</p>
            <ConceptBlock color="var(--warning)" label="Regla para dúctiles bajo carga estática" text="Para materiales dúctiles (εf ≥ 0.05) bajo cargas estáticas, se establece Kt = 1 (el esfuerzo se redistribuye plásticamente). Para materiales frágiles o condiciones de fragilidad (baja temperatura, corrosión), siempre aplicar Kt." />

            {/* 5-3 */}
            <SectionTitle id="5-3" title="Teorías de falla" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>No existe una teoría universal de falla. Para materiales dúctiles (εf ≥ 0.05, Syt = Syc = Sy), se usan criterios de fluencia. Para materiales frágiles (εf &lt; 0.05), se usan criterios de fractura.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '20px 0' }}>
              <div style={{ background: 'var(--bg-1)', border: '2px solid var(--part-1)', borderRadius: 'var(--radius)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--part-1)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 10 }}>Materiales dúctiles (fluencia)</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['ECM — Esfuerzo Cortante Máximo (Tresca)','ED — Energía de Distorsión (von Mises)','CMD — Mohr-Coulomb para dúctiles'].map(t => (
                    <li key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-2)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--part-1)' }}>▸</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--bg-1)', border: '2px solid var(--danger)', borderRadius: 'var(--radius)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--danger)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 10 }}>Materiales frágiles (fractura)</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['ENM — Esfuerzo Normal Máximo','CMF — Mohr-Coulomb para frágiles','MM — Mohr Modificada'].map(t => (
                    <li key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-2)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--danger)' }}>▸</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5-4 */}
            <SectionTitle id="5-4" title="Esfuerzo cortante máximo (ECM / Tresca)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La teoría del ECM estipula que la fluencia comienza cuando el esfuerzo cortante máximo iguala al esfuerzo cortante máximo en la prueba de tensión uniaxial en el punto de fluencia. También conocida como teoría de Tresca o Guest.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div><span style={{ color: 'var(--accent)' }}>σ₁ − σ₃</span> ≥ <span style={{ color: 'var(--success)' }}>Sy</span> <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(falla por fluencia, Ec. 5-1)</span></div>
                <div>S<sub>sy</sub> = 0.5 S<sub>y</sub> <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(resistencia al cortante, Ec. 5-2)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>Factor de seguridad: n = Sy / (σ₁ − σ₃)</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>Para esfuerzo plano, se usa la ordenación σ₁ ≥ σ₂ ≥ 0 (tercer principal = 0). ECM es conservadora — predice falla ~15% antes que la DE.</p>

            {/* 5-5 */}
            <SectionTitle id="5-5" title="Energía de distorsión (ED / von Mises)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La teoría de la Energía de Distorsión predice que la fluencia ocurre cuando la energía de distorsión por unidad de volumen alcanza la energía de distorsión en el punto de fluencia en tensión uniaxial. Es la teoría más precisa para materiales dúctiles.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div><span style={{ color: 'var(--success)' }}>σ'</span> = √[(σ₁−σ₂)² + (σ₂−σ₃)² + (σ₃−σ₁)²] / √2 <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 12 }}>(Ec. 5-12)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Para esfuerzo plano (σ₃=0):</div>
                <div><span style={{ color: 'var(--success)' }}>σ'</span> = √(σ₁² − σ₁σ₂ + σ₂²) <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 12 }}>(Ec. 5-13)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Para σ y τ combinados:</div>
                <div><span style={{ color: 'var(--success)' }}>σ'</span> = √(σ² + 3τ²) <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 12 }}>(muy usado en diseño de ejes)</span></div>
                <div style={{ marginTop: 6 }}>Resistencia al cortante: S<sub>sy</sub> = 0.577 S<sub>y</sub> <span style={{ fontSize: 11, color: 'var(--text-3)' }}>(5-21)</span></div>
              </div>
            </div>

            {/* Interactive */}
            <FailureTheoryPlot />
            <StaticFailureCalc />

            {/* 5-6 */}
            <SectionTitle id="5-6" title="Mohr-Coulomb para materiales dúctiles (CMD)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El criterio de Mohr-Coulomb para dúctiles es una extensión del ECM para materiales con diferentes resistencias a tensión y compresión. La superficie de fluencia en el espacio de esfuerzos principales es un hexágono irregular en lugar del hexágono regular del ECM.</p>

            {/* 5-7 */}
            <SectionTitle id="5-7" title="Resumen: materiales dúctiles" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
                    {['Teoría', 'Criterio de falla', 'Ssy', 'Uso recomendado'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' as const, fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' as const }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ECM / Tresca', 'σ₁-σ₃ = Sy/n', '0.5Sy', 'Conservadora, ingeniería estructural'],
                    ['ED / von Mises', "σ' = Sy/n", '0.577Sy', 'Más precisa, aceros y aleaciones dúctiles'],
                    ['CMD / Mohr-Coulomb', 'σ₁/Syt - σ₃/Syc = 1/n', '~', 'Materiales con Syt ≠ Syc'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-0)' }}>
                      {row.map((c, j) => <td key={j} style={{ padding: '9px 14px', color: j === 0 ? 'var(--accent)' : j === 3 ? 'var(--text-3)' : 'var(--text-2)' }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5-8 */}
            <SectionTitle id="5-8" title="Esfuerzo normal máximo (ENM) — frágiles" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para materiales frágiles, la fractura ocurre cuando el esfuerzo normal principal más grande alcanza la resistencia última a tensión Sut. La teoría del ENM establece:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div>Falla si: σ₁ ≥ <span style={{ color: 'var(--danger)' }}>Sut</span> o σ₃ ≤ −<span style={{ color: 'var(--danger)' }}>Suc</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Factor de seguridad: n = Sut/σ₁ (o Suc/|σ₃|)</div>
              </div>
            </div>

            {/* 5-9 */}
            <SectionTitle id="5-9" title="Mohr modificada para frágiles (MM)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La teoría de Mohr modificada (MM) para materiales frágiles es la más precisa y recomendada. Combina el criterio de esfuerzo normal máximo para el cuadrante de tensión-tensión con una línea diagonal en el cuadrante tensión-compresión, basada en datos experimentales.</p>

            {/* 5-10 */}
            <SectionTitle id="5-10" title="Resumen: materiales frágiles" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
                    {['Teoría', 'Criterio de fractura', 'Uso recomendado'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left' as const, fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' as const }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ENM', 'σ₁ ≥ Sut/n', 'Conservadora. Solo si Sut ≈ Suc.'],
                    ['CMF / Mohr-Coulomb frágil', 'σ₁/Sut − σ₃/Suc = 1/n', 'Materiales con Sut ≪ Suc (hierro gris, hormigón)'],
                    ['MM / Mohr Modificada', 'σ₁ ≥ Sut/n (T-T); diagonal en T-C', 'La más precisa para frágiles. Recomendada.'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-0)' }}>
                      {row.map((c, j) => <td key={j} style={{ padding: '9px 14px', color: j === 0 ? 'var(--danger)' : j === 2 ? 'var(--text-3)' : 'var(--text-2)' }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 5-11 */}
            <SectionTitle id="5-11" title="Selección de criterios de falla" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La selección del criterio adecuado depende del tipo de material y del modo de falla esperado. La siguiente guía ayuda a elegir:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
              {[
                { cond: 'Material dúctil + carga estática', rec: 'Energía de distorsión (von Mises)', color: 'var(--success)', note: 'Más precisa. Usar Kt=1' },
                { cond: 'Diseño preliminar (dúctil)', rec: 'ECM / Tresca', color: 'var(--accent)', note: 'Conservadora ~15%' },
                { cond: 'Material frágil (Sut ≈ Suc)', rec: 'Esfuerzo normal máximo (ENM)', color: 'var(--danger)', note: 'Sencillo pero inexacto' },
                { cond: 'Material frágil general', rec: 'Mohr Modificada (MM)', color: 'var(--warning)', note: 'Más precisa para frágiles. Siempre usar Kt' },
              ].map(c => (
                <div key={c.cond} style={{ background: 'var(--bg-1)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{c.cond}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: c.color, fontWeight: 600 }}>{c.rec}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>{c.note}</div>
                </div>
              ))}
            </div>

            {/* 5-12 */}
            <SectionTitle id="5-12" title="Mecánica de fractura" />
            <ConceptBlock color="var(--danger)" label="Mecánica de fractura lineal elástica (MFLE)" text="La MFLE se basa en el factor de intensidad de esfuerzo K = Yσ√(πa), donde a es el tamaño de grieta y Y es un factor de geometría. La fractura ocurre cuando K ≥ KIc (tenacidad de fractura del material). KIc en acero estructural: ~50 MPa√m; aluminio: ~25 MPa√m." />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div>K = Y · σ · √(π<span style={{ color: 'var(--danger)' }}>a</span>) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Factor de intensidad de esfuerzo)</span></div>
                <div>Falla si: K ≥ K<sub>Ic</sub> <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(tenacidad de fractura)</span></div>
                <div>σ_c = K<sub>Ic</sub> / (Y√πa) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(esfuerzo crítico)</span></div>
              </div>
            </div>

            {/* 5-13 */}
            <SectionTitle id="5-13" title="Análisis estocástico de falla estática" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Cuando la resistencia R y la carga S son variables aleatorias, el factor de seguridad determinista no es suficiente. Se trabaja con la probabilidad de falla P_f y la confiabilidad R = 1 − P_f.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>z = (μ_R − μ_S) / √(σ_R² + σ_S²) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(índice de confiabilidad)</span></div>
                <div>P_f = Φ(−z) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Φ = función de distribución normal estándar)</span></div>
                <div>Coef. variación: C_x = σ_x / μ_x</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, margin: '12px 0' }}>
              {[['z = 1.28','P_f = 10%','R = 90%'],['z = 2.33','P_f = 1%','R = 99%'],['z = 3.09','P_f = 0.1%','R = 99.9%'],['z = 3.72','P_f = 0.01%','R = 99.99%']].map((r,i)=>(
                <div key={i} style={{ background:'var(--bg-2)', borderRadius:'var(--radius-sm)', padding:'8px 10px', fontFamily:'var(--font-mono)', fontSize: 11 }}>
                  <div style={{ color:'var(--accent)', marginBottom:2 }}>{r[0]}</div>
                  <div style={{ color:'var(--danger)' }}>{r[1]}</div>
                  <div style={{ color:'var(--success)' }}>{r[2]}</div>
                </div>
              ))}
            </div>

            {/* 5-14 */}
            <SectionTitle id="5-14" title="Ecuaciones de diseño importantes" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Resumen de ecuaciones de diseño para carga estática:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                {[
                  { eq: 'ED: σ\' = √(σ²+3τ²) ≤ Sy/n', note: 'Más usada en ejes y elementos con torsión + flexión' },
                  { eq: 'ECM: 2τ_máx = σ₁-σ₃ ≤ Sy/n', note: 'Conservadora ~15%. Buena para diseño preliminar' },
                  { eq: 'ENM (frágil): σ₁ ≤ Sut/n', note: 'Solo tensión principal positiva controla' },
                  { eq: 'MM (frágil): √(σ₁²+σ₂²) ≤ Sut/n', note: 'Cuadrante T-T; ajuste en T-C según MM' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)' }}>{r.eq}</code>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{r.note}</span>
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
              <Link href="/capitulo/4" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--bg-2)', color: 'var(--text-1)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
                border: '1px solid var(--border)',
              }}>
                <ChevronLeft size={14} /> Cap. 4: Deflexión
              </Link>
              <Link href="/capitulo/6" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--part-2)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Cap. 6: Fatiga <ChevronRight size={14} />
              </Link>
            </div>
            </>) : <PracticaContent />}
          </div>
        </main>
      </div>
    </div>
  )
}
