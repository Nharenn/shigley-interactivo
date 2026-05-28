'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, Menu, X, ChevronLeft, ChevronRight, Home } from 'lucide-react'
import MohrCircle from '@/components/interactive/MohrCircle'

const SECTIONS = [
  { id: '3-1', title: 'Equilibrio y diagramas de cuerpo libre' },
  { id: '3-2', title: 'Fuerza cortante y momentos flectores' },
  { id: '3-3', title: 'Funciones de singularidad' },
  { id: '3-4', title: 'Esfuerzo' },
  { id: '3-5', title: 'Componentes cartesianos del esfuerzo' },
  { id: '3-6', title: 'Círculo de Mohr del esfuerzo plano' },
  { id: '3-7', title: 'Esfuerzo tridimensional general' },
  { id: '3-8', title: 'Deformación unitaria elástica' },
  { id: '3-9', title: 'Esfuerzos uniformemente distribuidos' },
  { id: '3-10', title: 'Esfuerzos normales en vigas en flexión' },
  { id: '3-11', title: 'Esfuerzos cortantes en vigas en flexión' },
  { id: '3-12', title: 'Torsión' },
  { id: '3-13', title: 'Concentración del esfuerzo' },
  { id: '3-14', title: 'Esfuerzos en cilindros presurizados' },
  { id: '3-15', title: 'Esfuerzos en anillos rotatorios' },
  { id: '3-16', title: 'Ajustes a presión y por contracción' },
  { id: '3-17', title: 'Efectos de la temperatura' },
  { id: '3-18', title: 'Vigas curvas en flexión' },
  { id: '3-19', title: 'Esfuerzos de contacto' },
  { id: '3-20', title: 'Resumen' },
]

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 14, marginTop: 48, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 12, scrollMarginTop: 72 }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 13 }}>{id}</span>
      {title}
    </h2>
  )
}

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.5 }}>{children}</div>
    </div>
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

function Grid2({ items }: { items: { label: string; value: string; note?: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, margin: '16px 0' }}>
      {items.map(it => (
        <div key={it.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' as const, marginBottom: 4 }}>{it.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{it.value}</div>
          {it.note && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{it.note}</div>}
        </div>
      ))}
    </div>
  )
}

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const C = 'var(--accent)'
  const problems = [
    {
      num: 1,
      enunciado: 'Una viga simplemente apoyada de 4 m tiene una carga distribuida w=2 kN/m en toda su longitud y una carga puntual P=5 kN en el centro. Calcular las reacciones y el momento máximo.',
      respuesta: 'R_A=R_B=6.5 kN; M_max ocurre @centro (x=2m): V=0 en x=2m, M=6.5×2−2×2×1=13−4=9 kN·m; si solo P: M=PL/4=5×4/4=5 kN·m; total M_max=9+5=14 kN·m @centro.',
    },
    {
      num: 2,
      enunciado: 'Un punto tiene σx=80 MPa, σy=20 MPa, τxy=30 MPa. Hallar: (a) centro C, (b) radio R, (c) esfuerzos principales σ₁,σ₂, (d) cortante máximo τ_max.',
      respuesta: 'C=(80+20)/2=50 MPa; R=√((80−20)/2)²+30²)=√(30²+30²)=42.43 MPa; σ₁=50+42.43=92.43 MPa; σ₂=50−42.43=7.57 MPa; τ_max=R=42.43 MPa.',
    },
    {
      num: 3,
      enunciado: 'Una viga rectangular de 50 mm×100 mm (b×h) está sometida a un momento flector M=12 kN·m. Calcular el esfuerzo normal máximo σ_max, I y Z.',
      respuesta: 'I=bh³/12=0.05×0.1³/12=4.167×10⁻⁶ m⁴; c=0.05 m; Z=I/c=8.333×10⁻⁵ m³; σ_max=M/Z=12000/8.333e-5=144 MPa.',
    },
    {
      num: 4,
      enunciado: 'Un eje sólido de acero de 40 mm de diámetro transmite T=800 N·m. Calcular: τ_max, J, y el ángulo de torsión φ en 1.5 m (G=80 GPa).',
      respuesta: 'J=πd⁴/32=π×0.04⁴/32=2.513×10⁻⁷ m⁴; τ_max=T·c/J=800×0.02/2.513e-7=63.7 MPa; φ=TL/(GJ)=800×1.5/(80e9×2.513e-7)=0.0597 rad=3.42°.',
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Problema {p.num}</div>
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

export default function Cap03Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<'lectura' | 'practica'>('lectura')
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
              <span style={{ color: 'var(--accent)', marginRight: 4 }}>3</span>Análisis de carga y esfuerzo
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 1</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 3</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/3/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
            <Monitor size={12} />
            {!isMobile && !isTablet && 'Diapositivas'}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'practica' ? 'white' : 'var(--text-2)', background: mode === 'practica' ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
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
            width: (isMobile || isTablet) ? 'min(82vw, 300px)' : 260,
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.03em' }}>03</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Análisis de carga<br />y esfuerzo</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={closeSidebar} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}>
                <span style={{ color: 'var(--text-3)', marginRight: 6 }}>{s.id}</span>
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
          marginLeft: (isMobile || isTablet) ? 0 : 260,
        }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }} />
              Parte 1 · Fundamentos
            </div>
            <h1 style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16, color: 'var(--text-1)' }}>
              <span style={{ color: 'var(--accent)', marginRight: 12 }}>3</span>
              Análisis de carga y esfuerzo
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              Fundamentos del análisis de esfuerzos en elementos mecánicos: equilibrio, cortante, flexión, torsión, círculo de Mohr, concentración de esfuerzo y casos especiales (cilindros, anillos, contacto).
            </p>

            {mode === 'lectura' ? (<>
            {/* 3-1 */}
            <SectionTitle id="3-1" title="Equilibrio y diagramas de cuerpo libre" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              El análisis comienza con el <strong>diagrama de cuerpo libre (DCL)</strong>: se aísla la pieza, se identifican todas las fuerzas y momentos externos (cargas y reacciones), y se aplican las ecuaciones de equilibrio estático.
            </p>
            <FormulaBox>
              <div>2D: ΣFx = 0 &emsp; ΣFy = 0 &emsp; ΣM = 0</div>
              <div>3D: ΣFx = 0, ΣFy = 0, ΣFz = 0 &emsp;|&emsp; ΣMx = 0, ΣMy = 0, ΣMz = 0</div>
            </FormulaBox>
            <ConceptBlock color="var(--accent)" label="Procedimiento DCL" text="1. Definir el sistema (cortar la pieza). 2. Mostrar todas las cargas externas (peso, fuerzas aplicadas). 3. Reemplazar apoyos por sus reacciones (resortes, empotramientos → 3 reacciones en 2D, 6 en 3D). 4. Aplicar las 3 (o 6) ecuaciones de equilibrio para resolver las incógnitas." />

            {/* 3-2 */}
            <SectionTitle id="3-2" title="Fuerza cortante y momentos flectores en vigas" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Los diagramas de fuerza cortante V(x) y momento flector M(x) son esenciales para diseñar vigas. Se construyen a partir del equilibrio de porciones de la viga.
            </p>
            <FormulaBox>
              <div>dV/dx = −q(x) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(q = carga distribuida)</span></div>
              <div>dM/dx = V(x)</div>
              <div>d²M/dx² = −q(x)</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Viga SS, dist. unif.', value: 'V_max = wL/2', note: 'M_max = wL²/8 @centro' },
              { label: 'Viga SS, carga central', value: 'V = P/2', note: 'M_max = PL/4 @centro' },
              { label: 'Voladizo, dist. unif.', value: 'V_max = wL @empotr.', note: 'M_max = wL²/2 @empotr.' },
              { label: 'Voladizo, puntual', value: 'V_max = P @empotr.', note: 'M_max = PL @empotr.' },
            ]} />

            {/* 3-3 */}
            <SectionTitle id="3-3" title="Funciones de singularidad" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Las <strong>funciones de Macaulay</strong> permiten escribir la carga distribuida q(x), la cortante V(x) y el momento M(x) como una sola expresión continua, incluso para cargas discontinuas.
            </p>
            <FormulaBox>
              <div>{'<x − a>ⁿ = 0 si x < a ; (x−a)ⁿ si x ≥ a'}</div>
              <div>Integración: ∫{'<x−a>ⁿ'}dx = {'<x−a>^(n+1) / (n+1)'}</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Carga puntual P @a', value: 'q = P·<x−a>⁻¹' },
              { label: 'Momento puntual M₀', value: 'q = M₀·<x−a>⁻²' },
              { label: 'Carga uniforme w desde a', value: 'q = w·<x−a>⁰' },
              { label: 'Rampas', value: 'q = (w/a)·<x−a>¹' },
            ]} />

            {/* 3-4 */}
            <SectionTitle id="3-4" title="Esfuerzo" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              El <strong>esfuerzo</strong> es la intensidad de fuerza interna por unidad de área. Distinguimos esfuerzo normal σ (perpendicular al plano) y esfuerzo cortante τ (paralelo al plano).
            </p>
            <FormulaBox>
              <div>σ = lim(ΔF_n / ΔA) = dF_n/dA <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>[Pa = N/m²]</span></div>
              <div>τ = lim(ΔF_t / ΔA) = dF_t/dA</div>
              <div>σ_prom = F/A &emsp; (distribución uniforme)</div>
            </FormulaBox>
            <ConceptBlock color="var(--warning)" label="Esfuerzo ingenieril vs. verdadero" text="El esfuerzo ingenieril usa el área original A₀ (σ = F/A₀), suficiente para diseño elástico. El esfuerzo verdadero usa el área instantánea A (σ_v = F/A). En diseño de máquinas siempre se usa esfuerzo ingenieril." />

            {/* 3-5 */}
            <SectionTitle id="3-5" title="Componentes cartesianas del esfuerzo" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              El estado general de esfuerzo en un punto queda definido por el <strong>tensor de esfuerzo</strong> de 9 componentes. Por la ley de esfuerzos complementarios τ_xy = τ_yx, el tensor es simétrico y solo 6 componentes son independientes.
            </p>
            <FormulaBox>
              <div>Tensor: [σ] = |σx τxy τxz|</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>| τyx σy τyz | &emsp; con τxy=τyx, τxz=τzx, τyz=τzy</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>| τzx τzy σz |</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Componentes normales', value: 'σx, σy, σz', note: 'Tensión +, compresión −' },
              { label: 'Componentes cortantes', value: 'τxy, τyz, τzx', note: 'Esfuerzos de corte' },
              { label: 'Esfuerzo hidrost.', value: 'p = −(σx+σy+σz)/3' },
              { label: 'Esfuerzo desviador', value: 'sij = σij − p·δij' },
            ]} />

            {/* 3-6 */}
            <SectionTitle id="3-6" title="Círculo de Mohr del esfuerzo plano" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              El Círculo de Mohr es la representación gráfica de las ecuaciones de transformación de esfuerzo plano. Permite determinar los esfuerzos principales σ₁, σ₂ y el cortante máximo τ_max en cualquier orientación.
            </p>
            <FormulaBox>
              <div>Centro: C = (σx + σy) / 2</div>
              <div>Radio: R = √[((σx−σy)/2)² + τxy²]</div>
              <div>Esfuerzos principales: σ₁,₂ = C ± R</div>
              <div>Cortante máximo: τ_max = R &emsp; (planos a 45° de los principales)</div>
            </FormulaBox>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 12 }}>
              Simulador interactivo
            </div>
            <MohrCircle />

            {/* 3-7 */}
            <SectionTitle id="3-7" title="Esfuerzo tridimensional general" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              En el estado tridimensional general existen 3 esfuerzos principales σ₁ ≥ σ₂ ≥ σ₃ (valores propios del tensor de esfuerzo). El cortante máximo absoluto ocurre en el plano que bisecta los planos de σ₁ y σ₃.
            </p>
            <FormulaBox>
              <div>τ_abs_max = (σ₁ − σ₃) / 2</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>σ₃ = 0 para esfuerzo plano en pieza libre de carga lateral</div>
              <div>Ecuación cúbica: σ³ − I₁σ² + I₂σ − I₃ = 0</div>
            </FormulaBox>
            <Grid2 items={[
              { label: '1er invariante', value: 'I₁ = σx+σy+σz' },
              { label: '2do invariante', value: 'I₂ = σxσy+σyσz+σzσx−τxy²−τyz²−τzx²' },
              { label: '3er invariante', value: 'I₃ = det[σij]' },
              { label: 'Cortante abs. max', value: 'τ = (σ₁−σ₃)/2', note: 'Define zona de fluencia en ECM' },
            ]} />

            {/* 3-8 */}
            <SectionTitle id="3-8" title="Deformación unitaria elástica" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              La ley de Hooke generalizada relaciona las deformaciones unitarias ε con los esfuerzos mediante el módulo de elasticidad E, el módulo de cortante G y el coeficiente de Poisson ν.
            </p>
            <FormulaBox>
              <div>εx = (1/E)[σx − ν(σy + σz)]</div>
              <div>εy = (1/E)[σy − ν(σx + σz)]</div>
              <div>εz = (1/E)[σz − ν(σx + σy)]</div>
              <div>γxy = τxy/G &emsp; γyz = τyz/G &emsp; γzx = τzx/G</div>
              <div style={{ marginTop: 8 }}>G = E / [2(1+ν)] <span style={{ fontSize: 12, color: 'var(--text-3)' }}>(acero: G≈80 GPa, ν≈0.29)</span></div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Acero E', value: '207 GPa (30 Mpsi)' },
              { label: 'Aluminio E', value: '71 GPa (10.4 Mpsi)' },
              { label: 'Acero ν', value: '0.29' },
              { label: 'Acero G', value: '80 GPa (11.5 Mpsi)' },
            ]} />

            {/* 3-9 */}
            <SectionTitle id="3-9" title="Esfuerzos uniformemente distribuidos" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Cuando la distribución de esfuerzo es uniforme sobre el área, se aplican las fórmulas directas de resistencia de materiales. Son aproximaciones válidas lejos de discontinuidades.
            </p>
            <FormulaBox>
              <div>Tensión/Compresión: σ = F / A</div>
              <div>Cortante directo: τ = V / A <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(pasadores, pernos)</span></div>
              <div>Aplastamiento (bearing): σ_b = F / (td) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(t=espesor, d=diámetro)</span></div>
            </FormulaBox>
            <ConceptBlock color="var(--success)" label="Cortante en dos planos" text="Si el pasador tiene doble cizallamiento (dos planos de corte), el área cortante efectiva es 2A. Ejemplo: perno en bifurcación: τ = F/(2A). En cortante simple (soporte único): τ = F/A." />

            {/* 3-10 */}
            <SectionTitle id="3-10" title="Esfuerzos normales en vigas en flexión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              La <strong>fórmula de la flexión</strong> relaciona el momento flector M con el esfuerzo normal σ en una viga de sección recta. El esfuerzo varía linealmente desde el eje neutro.
            </p>
            <FormulaBox>
              <div>σ = M·y / I &emsp; (tensión si y {'>'} 0, compresión si y {'<'} 0)</div>
              <div>σ_max = M·c / I = M / Z <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(c = distancia máx. al eje neutro)</span></div>
              <div>Z = I / c &emsp; (módulo de sección resistente)</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Rectángulo I', value: 'I = bh³/12', note: 'c = h/2, Z = bh²/6' },
              { label: 'Círculo I', value: 'I = πd⁴/64', note: 'c = d/2, Z = πd³/32' },
              { label: 'Tubo circular I', value: 'I = π(do⁴−di⁴)/64' },
              { label: 'Perfil I', value: 'I = I_total − I_huecos' },
            ]} />

            {/* 3-11 */}
            <SectionTitle id="3-11" title="Esfuerzos cortantes en vigas en flexión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              La fuerza cortante V en una viga produce esfuerzo cortante τ que varía sobre la sección transversal. La fórmula de Jourawski relaciona V, el primer momento de área Q y el ancho del corte b.
            </p>
            <FormulaBox>
              <div>τ = VQ / (Ib) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Fórmula de la flexión-cortante)</span></div>
              <div>Q = ∫y·dA <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(primer momento de área de la parte fuera del corte)</span></div>
              <div>Flujo de cortante: q = VQ/I <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>[N/m]</span></div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Rect. τ_max', value: 'τ = 3V/(2A)', note: '@eje neutro (×1.5 respecto al promedio)' },
              { label: 'Circular τ_max', value: 'τ = 4V/(3A)', note: '@eje neutro (×4/3)' },
              { label: 'Perfil I (alma)', value: 'τ ≈ V/A_alma', note: 'Aprox. conservadora' },
              { label: 'Tubo τ_max', value: 'τ = 2V/A', note: '@eje neutro' },
            ]} />

            {/* 3-12 */}
            <SectionTitle id="3-12" title="Torsión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              En un eje circular sometido a par de torsión T, el esfuerzo cortante varía linealmente con el radio. La ecuación de torsión análoga a la de flexión:
            </p>
            <FormulaBox>
              <div>τ = T·r / J &emsp; τ_max = T·c / J <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(c = radio exterior)</span></div>
              <div>J = πd⁴/32 (sólido) &emsp; J = π(do⁴−di⁴)/32 (hueco)</div>
              <div>Ángulo de giro: φ = TL / (GJ) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>[radianes]</span></div>
              <div>Rigidez: k_t = GJ/L <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>[N·m/rad]</span></div>
            </FormulaBox>
            <ConceptBlock color="var(--warning)" label="Secciones no circulares en torsión" text="Para secciones no circulares (cuadrada, rectangular, de perfil abierto), no se aplica τ = Tr/J. Se usan tablas o la teoría de Saint-Venant. Por ejemplo, para una sección rectangular b×h: τ_max = T/(αbh²) donde α depende de b/h. Los perfiles abiertos (ángulos, canales) tienen muy baja rigidez torsional." />
            <Grid2 items={[
              { label: 'Eje sólido J', value: 'J = πd⁴/32' },
              { label: 'Eje hueco J', value: 'J = π(do⁴−di⁴)/32' },
              { label: 'Potencia–Par', value: 'T = P·60/(2πn)', note: 'P en W, n en rpm, T en N·m' },
              { label: 'Pot. en HP', value: 'T = 63025·HP/n', note: 'HP, rpm → T en lbf·in' },
            ]} />

            {/* 3-13 */}
            <SectionTitle id="3-13" title="Concentración del esfuerzo" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Las discontinuidades geométricas (entallas, cambios de sección, agujeros, filetes) amplifican el esfuerzo local. El <strong>factor de concentración de esfuerzo</strong> Kt relaciona el esfuerzo máximo con el nominal.
            </p>
            <FormulaBox>
              <div>σ_max = Kt · σ_nom</div>
              <div>τ_max = Kts · τ_nom</div>
              <div>σ_nom = F/A &emsp; o &emsp; M·c/I &emsp; (calculado sobre la sección reducida)</div>
            </FormulaBox>
            <ConceptBlock color="var(--danger)" label="Obtención de Kt" text="Los factores Kt se obtienen de gráficas (Apéndice A del Shigley) en función de parámetros geométricos adimensionales: razón de filete r/d, razón de diámetros D/d, razón espesor-ancho t/b, etc. Para carga estática en materiales dúctiles, Kt ≈ 1 (plastificación local redistribuye el esfuerzo). Para fatiga, siempre se usa Kf." />
            <Grid2 items={[
              { label: 'Agujero en placa', value: 'Kt ≈ 3 (d/W→0)', note: 'Tensión uniaxial infinita' },
              { label: 'Cambio sección', value: 'Kt = 1.5–3', note: 'Depende de D/d y r/d' },
              { label: 'Filete ext. circunf.', value: 'Kt = 1.5–2.5', note: 'Flexión o torsión' },
              { label: 'Cuña (clavija)', value: 'Kt ≈ 2–3' },
            ]} />

            {/* 3-14 */}
            <SectionTitle id="3-14" title="Esfuerzos en cilindros presurizados" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Para recipientes a presión, las ecuaciones dependen del cociente t/r. Pared delgada: t/r {'<'} 0.1. Pared gruesa (ecuaciones de Lamé): para cualquier espesor.
            </p>
            <FormulaBox>
              <div>Pared delgada: σ_t = pd/(2t) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(circunferencial / hoop)</span></div>
              <div>Pared delgada: σ_l = pd/(4t) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(longitudinal / axial)</span></div>
              <div>Lamé (pared gruesa): σ_t = A + B/r² &emsp; σ_r = A − B/r²</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>A = pi·ri²/(ro²−ri²), B = pi·ri²·ro²/(ro²−ri²)</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Hoop @interior (Lamé)', value: 'σ_t = pi(ri²+ro²)/(ro²−ri²)', note: 'Máximo' },
              { label: 'Radial @interior', value: 'σ_r = −pi', note: 'Compresivo' },
              { label: 'Radial @exterior', value: 'σ_r = 0' },
              { label: 'Esfera pared delgada', value: 'σ = pd/(4t)', note: 'Igual en todas direcciones' },
            ]} />

            {/* 3-15 */}
            <SectionTitle id="3-15" title="Esfuerzos en anillos rotatorios" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Los discos o anillos que giran a alta velocidad experimentan esfuerzos centrífugos. Para un disco plano de espesor constante con densidad ρ y velocidad angular ω:
            </p>
            <FormulaBox>
              <div>σ_t = ρω²(3+ν)/8 · (ri² + ro² + ri²ro²/r² − (1+3ν)r²/(3+ν))</div>
              <div>σ_r = ρω²(3+ν)/8 · (ri² + ro² − ri²ro²/r² − r²)</div>
              <div>Disco sólido (ri=0): σ_t_max = σ_r_max = ρω²(3+ν)ro²/8 @centro</div>
            </FormulaBox>
            <ConceptBlock color="var(--accent)" label="Velocidad crítica en discos" text="La velocidad periférica equivalente al esfuerzo de fluencia: v_crit = √(Sy/ρ). Para acero: v_crit ≈ 470 m/s (Sy=250 MPa, ρ=7800 kg/m³). Los discos de turbina de alta velocidad se diseñan con perfiles de espesor variable para uniformizar el esfuerzo." />

            {/* 3-16 */}
            <SectionTitle id="3-16" title="Ajustes a presión y por contracción" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Cuando un cubo (hub) se ensambla por interferencia sobre un eje, se genera una presión de contacto p en la interfaz. Esta presión produce esfuerzos en el eje y en el cubo que deben verificarse.
            </p>
            <FormulaBox>
              <div>δ = p·d/2 · (1/E_cubo·((do²+d²)/(do²−d²)+ν_c) + 1/E_eje·((d²+di²)/(d²−di²)−ν_s))</div>
              <div>Par máximo transmisible: T = p·π·d²·l·f/2 <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(f = coef. fricción ≈ 0.12)</span></div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>δ = interferencia diametral real (diferencia de diámetros)</div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Esfuerzo en cubo @i.d.', value: 'σ_t = p(do²+d²)/(do²−d²)', note: 'Tensión' },
              { label: 'Eje sólido σ_t', value: 'σ_t = −p', note: 'Compresión uniforme' },
              { label: 'Tolerancias típicas', value: 'FN2: δ ≈ 0.001d', note: 'Fuerza-ajuste normal' },
            ]} />

            {/* 3-17 */}
            <SectionTitle id="3-17" title="Efectos de la temperatura" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Un cambio de temperatura ΔT produce una deformación unitaria térmica ε_T = αΔT. Si el elemento está restringido, aparecen <strong>esfuerzos térmicos</strong>.
            </p>
            <FormulaBox>
              <div>ε_T = α · ΔT <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(libre, sin esfuerzo)</span></div>
              <div>σ_T = −E · α · ΔT <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(restricción total)</span></div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Acero α', value: '11.7×10⁻⁶ /°C' },
              { label: 'Aluminio α', value: '23.6×10⁻⁶ /°C' },
              { label: 'Cobre α', value: '17.0×10⁻⁶ /°C' },
              { label: 'Esfuerzo acero 100°C', value: '≈ 242 MPa', note: 'Si completamente restringido' },
            ]} />
            <ConceptBlock color="var(--warning)" label="Esfuerzos térmicos en materiales compuestos" text="Cuando dos materiales con diferente α están unidos (bimetálicos, uniones acero-aluminio), la diferencia de expansión genera esfuerzos de corte y separación en la interfaz. La compatibilidad de deformaciones y el equilibrio deben resolverse simultáneamente." />

            {/* 3-18 */}
            <SectionTitle id="3-18" title="Vigas curvas en flexión" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              En vigas con gran curvatura inicial (radio de curvatura R comparable con el tamaño de la sección), el eje neutro no coincide con el centroide y el esfuerzo NO es lineal. El esfuerzo es hiperbólico, mayor en la fibra interna.
            </p>
            <FormulaBox>
              <div>r_n = A / ∫(dA/r) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(radio del eje neutro)</span></div>
              <div>e = r_bar − r_n <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(excentricidad; r_bar = radio centroidal)</span></div>
              <div>σ = M(r_n − r) / (A·e·r) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(r = radio del punto evaluado)</span></div>
            </FormulaBox>
            <Grid2 items={[
              { label: 'Rectángulo r_n', value: 'r_n = h / ln(r_o/r_i)', note: 'h = altura sección' },
              { label: 'Círculo r_n', value: 'r_n = r_bar − √(r_bar²−c²)/2', note: 'c = radio sección' },
              { label: 'σ max (fibra int.)', value: 'σ_i = M·(r_n−r_i)/(A·e·r_i)', note: 'Mayor magnitud' },
              { label: 'σ max (fibra ext.)', value: 'σ_o = M·(r_n−r_o)/(A·e·r_o)', note: 'Menor magnitud' },
            ]} />

            {/* 3-19 */}
            <SectionTitle id="3-19" title="Esfuerzos de contacto" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
              Cuando dos cuerpos curvos se presionan entre sí (Teoría de Hertz), el contacto puntual o lineal produce esfuerzos de compresión muy altos en un volumen pequeño. Fundamental en engranes, levas, cojinetes.
            </p>
            <FormulaBox>
              <div>Contacto línea (cilindros): p₀ = √(2F/(πlb)) &emsp; b = √(2Fd·(1−ν₁²)/E₁ + (1−ν₂²)/E₂)/(πl)</div>
              <div>Simplificado: b² = (2F/πl)·(1/E*) · d_eff <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(E* = módulo combinado)</span></div>
              <div>p_max = 2F/(πbl) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(semiancho de contacto b)</span></div>
            </FormulaBox>
            <Grid2 items={[
              { label: '1/E*', value: '(1−ν₁²)/E₁ + (1−ν₂²)/E₂' },
              { label: '1/d_eff', value: '1/d₁ + 1/d₂ (externos)', note: 'Cambiar signo si int.' },
              { label: 'τ_max (sub-sup.)', value: '≈ 0.3·p₀ @z≈0.78b', note: 'Inicio de falla por pitting' },
              { label: 'Contacto puntual', value: 'p₀ = 3F/(2πa²)', note: 'a = radio área contacto' },
            ]} />

            {/* 3-20 */}
            <SectionTitle id="3-20" title="Resumen — Fórmulas clave del capítulo" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, margin: '16px 0' }}>
              {[
                { eq: 'σ = Mc/I = M/Z', label: 'Flexión — fibra extrema' },
                { eq: 'τ = VQ/(Ib)', label: 'Cortante en vigas' },
                { eq: 'τ = Tr/J', label: 'Torsión — eje circular' },
                { eq: 'σ_max = Kt·σ_nom', label: 'Concentración de esfuerzo' },
                { eq: 'σ₁,₂ = C ± R = (σx+σy)/2 ± √[((σx−σy)/2)²+τxy²]', label: 'Esfuerzos principales (Mohr)' },
                { eq: 'σ\' = √(σ²+3τ²)', label: 'Esfuerzo von Mises (plano con torsión)' },
                { eq: 'τ_abs_max = (σ₁−σ₃)/2', label: 'Cortante máximo absoluto 3D' },
                { eq: 'G = E/[2(1+ν)]', label: 'Relación módulos elásticos' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 12, padding: '10px 14px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{r.eq}</code>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', alignSelf: 'center' }}>{r.label}</span>
                </div>
              ))}
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
              <Link href="/capitulo/2" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--bg-2)', color: 'var(--text-1)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
                border: '1px solid var(--border)',
              }}>
                <ChevronLeft size={14} /> Cap. 2: Materiales
              </Link>
              <Link href="/capitulo/4" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--accent)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Cap. 4: Deflexión y rigidez <ChevronRight size={14} />
              </Link>
            </div>
            </>) : <PracticaContent />}
          </div>
        </main>
      </div>
    </div>
  )
}
