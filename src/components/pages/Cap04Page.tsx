'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, Menu, X, ChevronLeft, ChevronRight, Home } from 'lucide-react'

const SECTIONS = [
  { id: '4-1', title: 'Constantes de resorte' },
  { id: '4-2', title: 'Tensión, compresión y torsión' },
  { id: '4-3', title: 'Deformación debida a flexión' },
  { id: '4-4', title: 'Métodos para calcular deflexión' },
  { id: '4-5', title: 'Deflexión por superposición' },
  { id: '4-6', title: 'Deflexión por funciones de singularidad' },
  { id: '4-7', title: 'Energía de deformación' },
  { id: '4-8', title: 'Teorema de Castigliano' },
  { id: '4-9', title: 'Deflexión de elementos curvos' },
  { id: '4-10', title: 'Problemas estáticamente indeterminados' },
  { id: '4-11', title: 'Elementos a compresión: general' },
  { id: '4-12', title: 'Columnas largas — carga centrada' },
  { id: '4-13', title: 'Columnas de longitud intermedia' },
  { id: '4-14', title: 'Columnas con carga excéntrica' },
  { id: '4-15', title: 'Puntales o elementos cortos' },
  { id: '4-16', title: 'Estabilidad elástica' },
  { id: '4-17', title: 'Choque e impacto' },
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

function BeamDeflectionCalc() {
  const [beamType, setBeamType] = useState<'SS' | 'cantilever' | 'fixed'>('SS')
  const [w, setW] = useState(100)    // kN/m
  const [P, setP] = useState(10)     // kN (point load)
  const [L, setL] = useState(3)      // m
  const [E, setE] = useState(207)    // GPa
  const [I, setI] = useState(40)     // cm⁴

  const EI = E * 1e9 * I * 1e-8  // N·m²

  let ymax = 0
  let Mmax = 0
  let Vmax = 0
  let label = ''

  if (beamType === 'SS') {
    ymax = (5 * w * 1e3 * Math.pow(L, 4)) / (384 * EI) * 1000  // mm
    Mmax = (w * 1e3 * L * L) / 8 / 1000  // kN·m
    Vmax = (w * 1e3 * L) / 2 / 1000  // kN
    label = 'Viga simplemente apoyada, carga distribuida uniforme w'
  } else if (beamType === 'cantilever') {
    ymax = (P * 1e3 * Math.pow(L, 3)) / (3 * EI) * 1000  // mm
    Mmax = P * L  // kN·m
    Vmax = P  // kN
    label = 'Viga en voladizo, carga puntual P en extremo libre'
  } else {
    ymax = (w * 1e3 * Math.pow(L, 4)) / (384 * EI) * 1000  // mm
    Mmax = (w * 1e3 * L * L) / 24 / 1000
    Vmax = (w * 1e3 * L) / 2 / 1000
    label = 'Viga empotrada en ambos extremos, carga distribuida w'
  }

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Simulador interactivo de deflexión en vigas</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['SS', 'cantilever', 'fixed'] as const).map(t => (
          <button key={t} onClick={() => setBeamType(t)} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '4px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', background: beamType === t ? 'var(--accent)' : 'var(--bg-3)', color: beamType === t ? 'white' : 'var(--text-2)' }}>
            {t === 'SS' ? 'Simple apoyada' : t === 'cantilever' ? 'Voladizo' : 'Empotrada'}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 16 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        {beamType !== 'cantilever' ? (
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)', display: 'block', marginBottom: 8 }}>w (kN/m): {w}</label>
            <input type="range" min={1} max={500} value={w} onChange={e => setW(+e.target.value)} />
          </div>
        ) : (
          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)', display: 'block', marginBottom: 8 }}>P (kN): {P}</label>
            <input type="range" min={1} max={200} value={P} onChange={e => setP(+e.target.value)} />
          </div>
        )}
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>L (m): {L}</label>
          <input type="range" min={0.5} max={10} step={0.1} value={L} onChange={e => setL(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 8 }}>E (GPa): {E}</label>
          <input type="range" min={10} max={400} value={E} onChange={e => setE(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 8 }}>I (cm⁴): {I}</label>
          <input type="range" min={1} max={10000} value={I} onChange={e => setI(+e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'y_máx', val: ymax.toFixed(2), unit: 'mm', color: 'var(--accent)', note: 'Deflexión máxima' },
          { label: 'M_máx', val: Mmax.toFixed(2), unit: 'kN·m', color: 'var(--warning)', note: 'Momento máximo' },
          { label: 'V_máx', val: Vmax.toFixed(2), unit: 'kN', color: 'var(--success)', note: 'Cortante máxima' },
        ].map(r => (
          <div key={r.label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' as const }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: r.color }}>{r.val}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{r.unit} — {r.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EulerBucklingCalc() {
  const [L, setL] = useState(2)      // m
  const [E, setE] = useState(207)    // GPa
  const [I, setI] = useState(40)     // cm⁴
  const [K, setK] = useState(1)      // end condition

  const Pcr = (Math.PI ** 2 * E * 1e9 * I * 1e-8) / ((K * L) ** 2) / 1000  // kN

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Calculadora: Carga crítica de pandeo (Euler)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>L (m): {L}</label>
          <input type="range" min={0.5} max={10} step={0.1} value={L} onChange={e => setL(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 8 }}>I (cm⁴): {I}</label>
          <input type="range" min={1} max={2000} value={I} onChange={e => setI(+e.target.value)} />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)', marginBottom: 8 }}>Factor K (condición de extremos):</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          {[
            { k: 0.5, label: 'K=0.5 (emp-emp)' },
            { k: 0.7, label: 'K=0.7 (emp-art)' },
            { k: 1.0, label: 'K=1.0 (art-art)' },
            { k: 2.0, label: 'K=2.0 (emp-libre)' },
          ].map(opt => (
            <button key={opt.k} onClick={() => setK(opt.k)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: K === opt.k ? 'var(--warning)' : 'var(--bg-3)', color: K === opt.k ? 'white' : 'var(--text-2)' }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: 'var(--danger)' }}>{Pcr.toFixed(1)}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)' }}>P<sub>cr</sub> = π²EI / (KL)² = {Pcr.toFixed(1)} kN</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Longitud efectiva: K·L = {(K * L).toFixed(2)} m</div>
        </div>
      </div>
    </div>
  )
}

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const C = 'var(--part-1)'

  const problems = [
    {
      title: 'Problema 1 — Constante de resorte (k)',
      text: 'Un resorte helicoidal tiene d=5 mm, D=40 mm, N=10 espiras activas, G=80 GPa. Calcular la constante de resorte k usando k=Gd⁴/(8D³N).',
      answer: 'k = 80e9 × (0.005)⁴ / (8 × 0.04³ × 10) = 80e9 × 6.25e-10 / (8 × 6.4e-5 × 10) = 50 / 5.12e-3 = 9765.6 N/m ≈ 9.77 N/mm',
    },
    {
      title: 'Problema 2 — Deflexión por superposición',
      text: 'Una viga en voladizo de 2 m recibe una carga P=8 kN en el extremo y una carga distribuida w=3 kN/m en toda su longitud. Calcular la deflexión máxima usando superposición (E=200 GPa, I=20×10⁻⁶ m⁴).',
      answer: 'δ_P = PL³/(3EI) = 8000×8/(3×200e9×20e-6) = 64000/1.2e7 = 0.00533 m = 5.33 mm; δ_w = wL⁴/(8EI) = 3000×16/(8×200e9×20e-6) = 48000/3.2e7 = 0.0015 m = 1.5 mm; δ_total = 5.33 + 1.5 = 6.83 mm',
    },
    {
      title: 'Problema 3 — Pandeo de Euler',
      text: 'Una columna de acero (E=207 GPa) de 3 m de altura, sección cuadrada 50×50 mm, con extremos articulados (K=1). Calcular la carga crítica de Euler P_cr = π²EI/(KL)².',
      answer: 'I = bh³/12 = 0.05⁴/12 = 5.208×10⁻⁷ m⁴; P_cr = π² × 207e9 × 5.208e-7 / (1×3)² = π² × 107.8 / 9 = 118.1 kN',
    },
    {
      title: 'Problema 4 — Castigliano',
      text: 'Un marco en L con brazo horizontal de 0.4 m y vertical de 0.3 m recibe F=2 kN en el extremo horizontal. Usar Castigliano (despreciando energía cortante) para hallar la deflexión horizontal en el punto de carga. E=200 GPa, I=4×10⁻⁶ m⁴.',
      answer: 'Brazo horiz: δ₁ = FL³/(3EI) = 2000×0.064/(3×200e9×4e-6) = 128/2.4e6 = 5.33e-5 m. Brazo vert: δ₂ = F·0.16·L/(EI) = 2000×0.16×0.3/(200e9×4e-6) = 96/8e5 = 1.2e-4 m. δ_total = 0.173 mm',
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

type Mode = 'lectura' | 'diapositivas' | 'practica'

export default function Cap04Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<Mode>('lectura')
  const [activeSection, setActiveSection] = useState('4-1')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 56, background: 'color-mix(in oklab, var(--bg-0) 90%, transparent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-soft)' }}>
        <Link href="/" aria-label="Ir al inicio" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, color: 'var(--text-1)', textDecoration: 'none', flexShrink: 0 }}>
          <Home size={18} />
        </Link>
        {(isMobile || isTablet) ? (
          <>
            <button onClick={() => setSidebarOpen(v => !v)} aria-label="Abrir índice" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--text-1)', flexShrink: 0 }}>
              {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              <span style={{ color: 'var(--part-1)', marginRight: 4 }}>4</span>Deflexión y rigidez
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 1</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 4</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--part-1)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/4/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
            <Monitor size={12} />
            {!isMobile && !isTablet && 'Diapositivas'}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'practica' ? 'white' : 'var(--text-2)', background: mode === 'practica' ? 'var(--part-1)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--part-1)', lineHeight: 1, letterSpacing: '-0.03em' }}>04</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Deflexión<br />y rigidez</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={closeSidebar} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}>
                <span style={{ color: activeSection === s.id ? 'var(--part-1)' : 'var(--text-3)', marginRight: 6 }}>{s.id}</span>
                {s.title}
              </a>
            ))}
          </nav>
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
              <span style={{ color: 'var(--part-1)', marginRight: 12 }}>4</span>
              Deflexión y rigidez
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              La deflexión excesiva puede causar mal funcionamiento de máquinas: engranes que no acoplan, rodamientos que fallan, o vibraciones indeseadas. Este capítulo desarrolla los métodos para calcular deflexiones en barras, vigas y elementos curvos, y analiza el pandeo de columnas.
            </p>

{mode === 'lectura' ? (<>
            {/* 4-1 */}
            <SectionTitle id="4-1" title="Constantes de resorte" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La elasticidad es la propiedad de un material que le permite recuperar su configuración original después de ser deformado. Un resorte es un elemento mecánico que ejerce una fuerza cuando se deforma. Para un resorte lineal, la constante del resorte k se define como:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 2.4 }}>
                <div>k = F / y <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 4-2)</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>[N/m] o [lbf/pulg]</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '16px 0' }}>
              {[
                { type: 'Resorte lineal', char: 'k = constante', color: 'var(--success)' },
                { type: 'Resorte rígido', char: 'k aumenta con defl.', color: 'var(--warning)' },
                { type: 'Resorte suave', char: 'k decrece con defl.', color: 'var(--accent)' },
              ].map(r => (
                <div key={r.type} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' as const }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: r.color, marginBottom: 4 }}>{r.type}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{r.char}</div>
                </div>
              ))}
            </div>

            {/* 4-2 */}
            <SectionTitle id="4-2" title="Tensión, compresión y torsión" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Deformaciones y rigideces básicas</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.6 }}>
                <div><span style={{ color: 'var(--accent)' }}>δ</span> = Fl / AE <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>→ k = AE/l (axial, Ec. 4-3, 4-4)</span></div>
                <div><span style={{ color: 'var(--warning)' }}>θ</span> = Tl / GJ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>→ k = GJ/l (torsión, Ec. 4-5, 4-7)</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>J = πd⁴/32 (sección circular sólida)</div>
              </div>
            </div>

            {/* 4-3 */}
            <SectionTitle id="4-3" title="Deformación debida a flexión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La curvatura de una viga sujeta a un momento flector M está dada por la ecuación de la viga elástica. Para deflexiones pequeñas (dy/dx ≪ 1) se tienen las relaciones diferenciales que vinculan carga, cortante, momento, pendiente y deflexión:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.6 }}>
                <div>q/EI = d⁴y/dx⁴ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(intensidad de carga)</span></div>
                <div>V/EI = d³y/dx³ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(fuerza cortante)</span></div>
                <div>M/EI = d²y/dx² <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(momento flector)</span></div>
                <div><span style={{ color: 'var(--warning)' }}>θ</span> = dy/dx <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(pendiente de la viga)</span></div>
                <div><span style={{ color: 'var(--accent)' }}>y</span> = f(x) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(deflexión)</span></div>
              </div>
            </div>

            {/* 4-4 */}
            <SectionTitle id="4-4" title="Métodos para calcular la deflexión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Existen varios métodos para calcular deflexiones en vigas, cada uno con ventajas según la complejidad del problema:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
              {[
                { m: 'Integración doble', desc: 'Integración directa de M/EI = d²y/dx². Exacto pero tedioso para cargas discontinuas. Ver Ejemplo 4-1.' },
                { m: 'Funciones de singularidad', desc: 'Usa funciones de Macaulay ⟨x-a⟩ⁿ para representar cargas discontinuas en una sola ecuación.' },
                { m: 'Superposición', desc: 'Suma algebraica de deflexiones de cargas simples (Tabla A-9). Válido solo para comportamiento lineal.' },
                { m: 'Energía/Castigliano', desc: 'δ = ∂U/∂P. Poderoso para geometrías complejas y estructuras hiperestáticas.' },
              ].map(m => (
                <div key={m.m} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 6 }}>{m.m}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              ))}
            </div>

            {/* 4-5 */}
            <SectionTitle id="4-5" title="Deflexión por superposición" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Fórmulas de deflexión más comunes (Tabla A-9)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.8 }}>
                <div><span style={{ color: 'var(--text-3)' }}>SS, dist. uniforme:</span> <span style={{ color: 'var(--accent)' }}>y_máx = −5wL⁴/384EI</span> <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 12 }}>@x=L/2</span></div>
                <div><span style={{ color: 'var(--text-3)' }}>SS, carga central:</span> <span style={{ color: 'var(--accent)' }}>y_máx = −PL³/48EI</span> <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 12 }}>@x=L/2</span></div>
                <div><span style={{ color: 'var(--text-3)' }}>Voladizo, dist.:</span> <span style={{ color: 'var(--accent)' }}>y_máx = −wL⁴/8EI</span> <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 12 }}>@extremo libre</span></div>
                <div><span style={{ color: 'var(--text-3)' }}>Voladizo, puntual:</span> <span style={{ color: 'var(--accent)' }}>y_máx = −PL³/3EI</span> <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 12 }}>@extremo libre</span></div>
                <div><span style={{ color: 'var(--text-3)' }}>Emp.-Emp., dist.:</span> <span style={{ color: 'var(--accent)' }}>y_máx = −wL⁴/384EI</span> <span style={{ color: 'var(--text-3)', fontSize: 11, marginLeft: 12 }}>@x=L/2</span></div>
              </div>
            </div>

            {/* Interactive simulator */}
            <BeamDeflectionCalc />

            {/* 4-6 */}
            <SectionTitle id="4-6" title="Deflexión por funciones de singularidad" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Las funciones de Macaulay (singularidad) permiten integrar la ecuación de la viga elástica EI·d²y/dx² = M(x) con una sola expresión, sin necesidad de dividir la viga en segmentos. La carga q(x) se expresa con paréntesis angulares {'<x−a>'}ⁿ.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.8 }}>
                <div>q(x) → V(x) = −∫q dx → M(x) = ∫V dx</div>
                <div>EI·d²y/dx² = M(x) &emsp;→ integrar dos veces con condiciones de contorno</div>
                <div>Carga puntual P @a: <span style={{ color: 'var(--accent)' }}>{'q = P<x−a>⁻¹'}</span></div>
                <div>Carga distribuida w @a: <span style={{ color: 'var(--success)' }}>{'q = w<x−a>⁰'}</span></div>
                <div>Las C.C. fijan las constantes de integración C₁ y C₂</div>
              </div>
            </div>
            <ConceptBlock color="var(--success)" label="Ventaja principal" text="Un solo sistema de ecuaciones integra toda la viga — no importa cuántas cargas o apoyos tenga. Ideal para implementar en código. Las condiciones de contorno (y=0 en apoyos, dy/dx=0 en empotramientos) determinan las constantes de integración." />

            {/* 4-7 */}
            <SectionTitle id="4-7" title="Energía de deformación" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La energía de deformación es la energía almacenada en un cuerpo elástico deformado. Para cada tipo de carga se tiene una expresión de la energía de deformación:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.8 }}>
                <div>Axial: U = F²l / 2AE</div>
                <div>Torsión: U = T²l / 2GJ</div>
                <div>Flexión: U = ∫M²dx / 2EI</div>
                <div>Cortante: U = ∫C·V²dx / 2AG</div>
              </div>
            </div>

            {/* 4-8 */}
            <SectionTitle id="4-8" title="Teorema de Castigliano" />
            <ConceptBlock color="var(--accent)" label="Teorema de Castigliano (2°)" text="La deflexión o rotación de cualquier punto en una estructura en la dirección de una carga aplicada es igual a la derivada parcial de la energía de deformación total respecto a esa carga: δᵢ = ∂U/∂Fᵢ. Para encontrar deflexiones donde no actúa una carga real, se aplica una fuerza ficticia Q, se deriva y luego se iguala Q=0." />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 2.4 }}>
                <div><span style={{ color: 'var(--accent)' }}>δᵢ</span> = ∂U/∂Fᵢ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 4-17 — deflexión lineal)</span></div>
                <div><span style={{ color: 'var(--warning)' }}>θᵢ</span> = ∂U/∂Mᵢ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 4-18 — rotación angular)</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8 }}>Para flexión: δ = ∫(M/EI)·(∂M/∂F)dx</div>
              </div>
            </div>

            {/* 4-9 */}
            <SectionTitle id="4-9" title="Deflexión de elementos curvos" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para anillos, ganchos y marcos curvos, la deflexión se calcula con el Teorema de Castigliano aplicando la integral de curvatura. Se considera la contribución de todos los tipos de esfuerzo interno (N, V, M).</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.8 }}>
                <div>δ = ∂U/∂F = ∫(M/EI)(∂M/∂F)ds + ∫(N/AE)(∂N/∂F)ds</div>
                <div>ds = R·dθ <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(arco de longitud diferencial)</span></div>
                <div>Para anillo con carga diametral P: δ = P·R³/EI · (π/2 − 4/π)</div>
              </div>
            </div>
            <ConceptBlock color="var(--accent)" label="Cuándo usar la teoría de vigas curvas" text="La solución exacta de vigas curvas (Winkler-Bach) se usa cuando la curvatura es grande (R/c < 6 aprox.). Para R/c > 10, la fórmula de viga recta es suficientemente exacta. En ganchos de grúa, resortes de hoja y marcos de prensas, la curvatura suele ser grande y debe usarse la teoría curva." />

            {/* 4-10 */}
            <SectionTitle id="4-10" title="Problemas estáticamente indeterminados" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Un problema es estáticamente indeterminado cuando el número de reacciones desconocidas es mayor que el número de ecuaciones de equilibrio disponibles. La solución requiere considerar adicionalmente las condiciones de compatibilidad (deformaciones consistentes) o usar el teorema de Castigliano.</p>

            {/* 4-11 through 4-15 */}
            <SectionTitle id="4-11" title="Elementos a compresión y columnas" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Las columnas son elementos estructurales cargados axialmente a compresión que pueden fallar de manera súbita por pandeo (buckling) a cargas muy inferiores a las que causarían falla por aplastamiento. El pandeo es una falla por inestabilidad, no por resistencia.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Carga crítica de Euler (Columnas largas)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, lineHeight: 2.4 }}>
                <div><span style={{ color: 'var(--danger)' }}>P_cr</span> = π²EI / (KL)² <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 4-43)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 8 }}>Esfuerzo crítico: σ_cr = π²E / (KL/k)²</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>k = radio de giro = √(I/A)</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, margin: '16px 0' }}>
              {[
                { cond: 'Empotrado–Empotrado', K: '0.5' },
                { cond: 'Empotrado–Articulado', K: '0.7' },
                { cond: 'Articulado–Articulado', K: '1.0' },
                { cond: 'Empotrado–Libre', K: '2.0' },
              ].map(c => (
                <div key={c.cond} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 10, textAlign: 'center' as const }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--warning)', marginBottom: 4 }}>K={c.K}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{c.cond}</div>
                </div>
              ))}
            </div>
            <EulerBucklingCalc />

            <ConceptBlock color="var(--warning)" label="Columnas de longitud intermedia (Johnson)" text="Para relaciones de esbeltez KL/k menores que el valor crítico (Cc = √(2π²E/Sy)), la columna de Johnson es más apropiada: σcr = Sy[1 - (KL/k)²/(2Cc²)]. La transición entre Euler y Johnson ocurre en KL/k = Cc." />

            {/* 4-17 */}
            <SectionTitle id="4-17" title="Choque e impacto" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Cuando una masa m cae desde altura h y golpea una viga o un resorte, el principio de conservación de energía relaciona la energía potencial con la energía de deformación elástica. Para una viga con constante k, la deflexión máxima de impacto es:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div>δ_impact = δ_st · [1 + √(1 + 2h/δ_st)]</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>δ_st = deflexión estática bajo W = mg</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Factor de impacto: η = δ_impact / δ_st</div>
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
              <Link href="/capitulo/3" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--bg-2)', color: 'var(--text-1)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
                border: '1px solid var(--border)',
              }}>
                <ChevronLeft size={14} /> Cap. 3: Análisis de carga
              </Link>
              <Link href="/capitulo/5" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--part-2)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Cap. 5: Fallas estáticas <ChevronRight size={14} />
              </Link>
            </div>
            </>) : <PracticaContent />}
          </div>
        </main>
      </div>
    </div>
  )
}
