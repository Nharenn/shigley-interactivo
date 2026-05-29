'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { BookOpen, Monitor, PenLine, Key, AlertCircle, CheckCircle, ChevronDown, ChevronRight, Menu, X, ChevronLeft, Home } from 'lucide-react'

const SECTIONS = [
  { id: '1-1', title: 'El diseño' },
  { id: '1-2', title: 'El diseño en ingeniería mecánica' },
  { id: '1-3', title: 'Fases del proceso de diseño' },
  { id: '1-4', title: 'Herramientas y recursos de diseño' },
  { id: '1-5', title: 'Responsabilidades profesionales' },
  { id: '1-6', title: 'Normas y códigos' },
  { id: '1-7', title: 'Aspectos económicos' },
  { id: '1-8', title: 'Seguridad y responsabilidad legal' },
  { id: '1-9', title: 'Esfuerzo y resistencia' },
  { id: '1-10', title: 'Incertidumbre' },
  { id: '1-11', title: 'Factor de diseño y factor de seguridad' },
  { id: '1-12', title: 'Confiabilidad' },
  { id: '1-13', title: 'Dimensiones y tolerancias' },
  { id: '1-14', title: 'Unidades' },
  { id: '1-15', title: 'Cálculos y cifras significativas' },
  { id: '1-16', title: 'Interdependencias entre temas' },
  { id: '1-17', title: 'Caso de estudio: transmisión de potencia' },
]

function ConceptBlock({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16, margin: '20px 0', background: 'var(--bg-1)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '14px 18px 14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
      <p style={{ color: 'var(--text-2)', fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{text}</p>
    </div>
  )
}

function FormulaBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '24px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 17, lineHeight: 2.4 }}>{children}</div>
    </div>
  )
}

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} style={{ fontSize: 24, letterSpacing: '-0.02em', marginBottom: 14, marginTop: 52, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 14 }}>{id}</span>
      {title}
    </h2>
  )
}

function DesignProcessFlow() {
  const steps = [
    { label: 'Reconocimiento\nde la necesidad', color: 'var(--accent)' },
    { label: 'Definición\ndel problema', color: 'var(--accent)' },
    { label: 'Síntesis', color: 'var(--success)' },
    { label: 'Análisis y\noptimización', color: 'var(--success)' },
    { label: 'Evaluación', color: 'var(--warning)' },
    { label: 'Presentación', color: 'var(--warning)' },
  ]
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Fases del proceso de diseño (Figura 1-1)</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start', maxWidth: 360 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ marginLeft: 20, width: 1, height: 18, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)' }}>
        ↺ Proceso iterativo — se puede regresar a cualquier fase previa
      </div>
    </div>
  )
}

function SafetyFactorCalc() {
  const [strength, setStrength] = useState(300)
  const [stress, setStress] = useState(100)
  const n = stress > 0 ? (strength / stress) : 0
  const color = n >= 2 ? 'var(--success)' : n >= 1.5 ? 'var(--warning)' : 'var(--danger)'
  const label = n >= 2 ? 'Diseño seguro' : n >= 1.5 ? 'Margen mínimo' : n >= 1 ? 'Riesgo alto' : 'Falla inminente'
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Calculadora interactiva: Factor de seguridad</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 8 }}>Resistencia S (MPa): {strength}</label>
          <input type="range" min={50} max={1000} value={strength} onChange={e => setStrength(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>Esfuerzo σ (MPa): {stress}</label>
          <input type="range" min={10} max={900} value={stress} onChange={e => setStress(+e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', border: `1px solid ${color}` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color }}>{n.toFixed(2)}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)' }}>n = S / σ = {strength}/{stress}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color, marginTop: 4 }}>{label}</div>
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
      title: 'Problema 1 — Proceso de diseño',
      text: 'Una empresa necesita diseñar un nuevo reductor de velocidad para una máquina industrial. Enumere y describa brevemente las fases del proceso de diseño que deben seguirse, comenzando desde la identificación de la necesidad hasta la presentación de los planes finales.',
      answer: '1. Identificación de la necesidad: reconocer que se requiere un reductor de velocidad. 2. Definición del problema: especificar relación de transmisión, potencia, velocidad de entrada, restricciones de espacio y costo. 3. Búsqueda de soluciones: explorar configuraciones (engranes rectos, helicoidales, planetarios). 4. Análisis y selección: evaluar cada alternativa según eficiencia, costo, mantenimiento. 5. Diseño detallado: cálculos de esfuerzos, selección de materiales, planos. 6. Prototipo y pruebas: fabricar y validar. 7. Presentación de planes finales: documentación para producción.',
    },
    {
      title: 'Problema 2 — Factor de seguridad',
      text: 'Un componente mecánico está sometido a un esfuerzo nominal de 120 MPa. El material tiene un límite de fluencia S_y = 310 MPa. (a) Calcule el factor de seguridad n = S_y / σ. (b) Si la especificación de diseño exige n ≥ 2.2, ¿es aceptable el diseño? (c) ¿Cuál debería ser la resistencia mínima del material para cumplir con n = 2.5?',
      answer: '(a) n = 310 / 120 = 2.58. (b) Como n = 2.58 ≥ 2.2, el diseño es aceptable. (c) S_y_mín = 120 × 2.5 = 300 MPa.',
    },
    {
      title: 'Problema 3 — Confiabilidad',
      text: 'Un lote de 100 pernos tiene resistencias con media μ_S = 220 MPa y desviación σ_S = 18 MPa. Los esfuerzos aplicados tienen media μ_σ = 180 MPa y σ_σ = 14 MPa. Suponiendo distribución normal, calcule z = (μ_S − μ_σ) / √(σ_S² + σ_σ²) y estime la confiabilidad R a partir de la tabla normal estándar.',
      answer: 'z = (220 − 180) / √(18² + 14²) = 40 / √(324 + 196) = 40 / √520 = 40 / 22.80 = 1.75. Buscando en tabla normal estándar: Φ(1.75) ≈ 0.9599. Por lo tanto R ≈ 95.99%.',
    },
    {
      title: 'Problema 4 — Tolerancias e incertidumbre',
      text: 'Un ensamble consiste en un eje de diámetro d_e = 30.00 ± 0.06 mm que debe insertarse en un agujero de diámetro d_a = 30.12 ± 0.06 mm. (a) Calcule el juego máximo y mínimo. (b) Si las tolerancias se definen como ±4σ, estime la probabilidad de interferencia (juego negativo).',
      answer: '(a) Juego máximo = (30.18 − 29.94) = 0.24 mm; Juego mínimo = (30.06 − 30.06) = 0 mm. (b) Con tolerancia = 4σ, σ_e = 0.06/4 = 0.015 mm, σ_a = 0.015 mm. Media del juego = 30.12 − 30.00 = 0.12 mm. σ_juego = √(0.015² + 0.015²) = 0.0212 mm. z = (0 − 0.12) / 0.0212 = −5.66. Φ(−5.66) ≈ 7.6×10⁻⁹ → probabilidad de interferencia ≈ 7.6×10⁻⁷% — prácticamente cero.',
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

export default function Cap01Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<Mode>('lectura')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const closeSidebar = () => setSidebarOpen(false)
  const [activeSection, setActiveSection] = useState('1-1')

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 56, background: 'color-mix(in oklab, var(--bg-0) 80%, transparent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border-soft)' }}>
        <Link href="/" aria-label="Ir al inicio" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, color: 'var(--text-1)', textDecoration: 'none', flexShrink: 0 }}>
          <Home size={18} />
        </Link>
        {(isMobile || isTablet) ? (
          <>
            <button onClick={() => setSidebarOpen(v => !v)} aria-label="Abrir índice" style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--text-1)', flexShrink: 0 }}>
              {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              <span style={{ color: 'var(--part-1)', marginRight: 4 }}>1</span>Introducción al diseño
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 1</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 1</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/1/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
            <Monitor size={12} />
            {!isMobile && !isTablet && 'Diapositivas'}
          </Link>
          <button onClick={() => setMode('practica')} title="Práctica" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'practica' ? 'white' : 'var(--text-2)', background: mode === 'practica' ? 'var(--accent)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <PenLine size={12} />
            {!isMobile && !isTablet && 'Práctica'}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ position: 'relative', flex: 1 }}>
        {/* Mobile sidebar overlay */}
        {(isMobile || isTablet) && sidebarOpen && (
          <div onClick={closeSidebar} style={{ position: 'fixed', inset: 0, zIndex: 29, background: 'rgba(0,0,0,0.4)' }} />
        )}
        <aside
          style={{
            position: (isMobile || isTablet) ? 'fixed' : 'absolute',
            top: 0, left: 0, bottom: 0,
            width: (isMobile || isTablet) ? 'min(82vw, 300px)' : (sidebarOpen ? 280 : 0),
            zIndex: (isMobile || isTablet) ? 30 : 'auto',
            transform: (isMobile || isTablet) ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: (isMobile || isTablet) ? 'transform 0.26s cubic-bezier(0.4,0,0.2,1)' : 'width 0.3s',
            borderRight: '1px solid var(--border-soft)',
            background: 'var(--bg-0)',
            overflow: isMobile ? undefined : 'hidden',
            overflowY: 'auto',
            padding: sidebarOpen ? '22px 18px 22px 22px' : 0,
            display: 'flex', flexDirection: 'column', gap: 18,
          }}
        >
          <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-soft)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--part-1)', lineHeight: 1, letterSpacing: '-0.03em' }}>01</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Introducción al<br />diseño en ingeniería</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>
            <span>Parte 1</span>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--part-1)', width: '25%' }} />
            </div>
            <span>Fundamentos</span>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => { setActiveSection(s.id); closeSidebar() }} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', textDecoration: 'none' }}>
                <span style={{ color: activeSection === s.id ? 'var(--part-1)' : 'var(--text-3)', marginRight: 6 }}>{s.id}</span>
                {s.title}
              </a>
            ))}
          </nav>
          <Link href="/capitulo/1/slides" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, color: 'white', background: 'var(--part-1)', textDecoration: 'none', marginTop: 'auto' }}>
            <Monitor size={14} /> Modo Presentación
          </Link>
        </aside>

        {/* Content */}
        <main style={{
          overflowY: 'auto',
          padding: isMobile ? '24px 16px 100px' : isTablet ? '24px 24px 80px' : '32px 40px 80px',
          paddingBottom: isMobile ? 'calc(100px + var(--safe-bottom, 0px))' : '80px',
          height: 'calc(100vh - 56px)',
        }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>

            {/* Chapter header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: 'var(--part-1)', borderRadius: '50%', display: 'inline-block' }} />
              Parte 1 · Fundamentos
            </div>
            <h1 style={{ fontSize: 38, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16, color: 'var(--text-1)' }}>
              <span style={{ color: 'var(--part-1)', marginRight: 12 }}>1</span>
              Introducción al diseño en ingeniería mecánica
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              El diseño mecánico es una tarea compleja que requiere muchas habilidades. Este capítulo establece la naturaleza del proceso de diseño, sus fases, los recursos disponibles y los conceptos fundamentales de esfuerzo, resistencia, incertidumbre y factores de seguridad.
            </p>

            {mode === 'lectura' ? (
              <>
            {/* 1-1 */}
            <SectionTitle id="1-1" title="El diseño" />
            <ConceptBlock color="var(--part-1)" label="Definición" text="Diseñar es formular un plan para satisfacer una necesidad específica o resolver un problema particular. El producto debe ser funcional, seguro, confiable, competitivo, útil, que pueda fabricarse y comercializarse." />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El diseño es un proceso innovador y altamente iterativo. También es un proceso de toma de decisiones, que en ocasiones deben tomarse con muy poca información, en otras con apenas la cantidad adecuada y en ocasiones con un exceso de información parcialmente contradictoria.</p>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Las capacidades personales del diseñador en cuanto a creatividad, habilidad para comunicarse y destreza para resolver problemas están entrelazadas con el conocimiento de la tecnología. Las herramientas de la ingeniería (matemáticas, estadística, computación, gráficas y lenguaje) se combinan para producir un plan.</p>

            {/* 1-2 */}
            <SectionTitle id="1-2" title="El diseño en ingeniería mecánica" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los ingenieros mecánicos están relacionados con la producción y el procesamiento de energía y con el suministro de los medios de producción, las herramientas de transporte y las técnicas de automatización. Las bases disciplinarias incluyen la mecánica de sólidos, de fluidos, la transferencia de masa y momento, los procesos de manufactura y las teorías de la electricidad y de la información.</p>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los problemas reales se resisten a la especialización. El diseño de un simple cojinete involucra flujo de fluidos, transferencia de calor, fricción, transporte de energía, selección de materiales, tratamientos termomecánicos, descripciones estadísticas, etc.</p>

            {/* 1-3 */}
            <SectionTitle id="1-3" title="Fases del proceso de diseño" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>El proceso de diseño completo, de principio a fin, comienza con la identificación de una necesidad y la decisión de resolverla, después de muchas iteraciones, termina con la presentación de los planes para satisfacerla.</p>
            <DesignProcessFlow />

            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '20px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>26 Consideraciones de diseño importantes</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                {['Funcionalidad','Resistencia/esfuerzo','Distorsión/deflexión','Desgaste','Corrosión','Seguridad','Confiabilidad','Manufactura','Utilidad','Costo','Fricción','Peso','Vida','Ruido','Estilo','Forma','Tamaño','Control','Propiedades térmicas','Superficie','Lubricación','Comercialización','Mantenimiento','Volumen','Responsabilidad legal','Capacidad de reciclado'].map((c, i) => (
                  <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', padding: '6px 10px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>{i + 1}. {c}</div>
                ))}
              </div>
            </div>

            {/* 1-4 */}
            <SectionTitle id="1-4" title="Herramientas y recursos de diseño" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>En la actualidad el ingeniero tiene una gran variedad de herramientas y recursos disponibles. Las microcomputadoras y los robustos paquetes de software proporcionan herramientas de gran capacidad para diseñar, analizar y simular componentes mecánicos.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '20px 0' }}>
              {[
                { label: 'CAD', examples: 'AutoCAD, SolidWorks, ProEngineer, CATIA', color: 'var(--accent)', desc: 'Diseño asistido por computadora — modelos 3D, vistas ortográficas, dimensionamiento' },
                { label: 'FEA', examples: 'ANSYS, ALGOR, MSC/NASTRAN', color: 'var(--success)', desc: 'Análisis de elemento finito — esfuerzo, deflexión, vibración, transferencia de calor' },
                { label: 'CAE', examples: 'MATLAB, MathCAD, Mathematica', color: 'var(--warning)', desc: 'Solucionadores matemáticos — modelado, simulación, optimización' },
                { label: 'CFD', examples: 'FLUENT, CFD++, FIDAP', color: 'var(--danger)', desc: 'Dinámica de fluidos computacional — análisis de flujo y simulación' },
              ].map((t) => (
                <div key={t.label} style={{ background: 'var(--bg-1)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-sm)', padding: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: t.color, marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>{t.examples}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* 1-5 */}
            <SectionTitle id="1-5" title="Responsabilidades profesionales" />
            <ConceptBlock color="var(--warning)" label="Ética del ingeniero" text='El ingeniero debe satisfacer las necesidades de los usuarios (la administración y la sociedad) mediante la aplicación de sus habilidades técnicas. Las acciones del diseñador afectan directamente la seguridad pública. "La ética del ingeniero" — NSPE, 1954.' />

            {/* 1-6 */}
            <SectionTitle id="1-6" title="Normas y códigos" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Una norma es un conjunto de especificaciones para partes, materiales o procesos que tiene el objetivo de lograr uniformidad, eficiencia y una calidad específica. Un código es un conjunto de especificaciones para el análisis, diseño, manufactura y construcción de algo.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '16px 0' }}>
              {['ASME', 'ASTM', 'SAE', 'AWS', 'ANSI', 'ISO', 'OSHA'].map((org) => (
                <span key={org} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, padding: '4px 12px', background: 'var(--bg-3)', borderRadius: 999, color: 'var(--text-1)' }}>{org}</span>
              ))}
            </div>

            {/* 1-7 */}
            <SectionTitle id="1-7" title="Aspectos económicos" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La ingeniería tiene que ver con los costos. Un ingeniero que diseña un producto que no puede producirse a un precio que el mercado estará dispuesto a pagar o que producirse con beneficio, ha desperdiciado el tiempo de todos. El diseñador debe considerar el costo de manufactura, el análisis del punto de equilibrio, y la estimación de costos.</p>

            {/* 1-8 */}
            <SectionTitle id="1-8" title="Seguridad y responsabilidad legal" />
            <ConceptBlock color="var(--danger)" label="Seguridad del producto" text="Las mejores formas para prevenir la responsabilidad legal son la buena ingeniería del análisis y el diseño, el control de calidad y los procedimientos exhaustivos de pruebas. Los gerentes de publicidad deben analizar con cuidado las garantías para eliminar promesas excesivas e insertar advertencias adecuadas e instrucciones para el uso." />

            {/* 1-9 */}
            <SectionTitle id="1-9" title="Esfuerzo y resistencia" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La supervivencia de muchos productos depende de la forma en que el diseñador ajusta el esfuerzo inducido por la carga para que sea menor que la resistencia en un punto de interés. Debe permitir que la resistencia exceda al esfuerzo por un margen suficiente para que a pesar de las incertidumbres, la falla no sea frecuente.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '20px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Resistencia (S)</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>Propiedad <strong>inherente</strong> del material — construida en la pieza por la selección de material y el proceso de manufactura. Se designa con S mayúscula: Sy (fluencia), Su (última), Se (fatiga).</p>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Esfuerzo (σ, τ)</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>Propiedad de <strong>estado</strong> en un punto — función de la carga, geometría, temperatura y proceso de manufactura. Se designa con letras griegas: σ (normal), τ (cortante).</p>
                </div>
              </div>
            </div>

            {/* 1-10 */}
            <SectionTitle id="1-10" title="Incertidumbre" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>En el diseño de maquinaria abundan las incertidumbres. Existen métodos matemáticos para enfrentar las incertidumbres: los métodos determinísticos y los estocásticos.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 10 }}>Fuentes comunes de incertidumbre:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Composición del material y variaciones en las propiedades','Variaciones de propiedades en distintos puntos del material','Efectos del procesamiento sobre propiedades locales','Efectos del ensamble (soldaduras, ajustes por contracción)','Intensidad y distribución de cargas','Validez de los modelos matemáticos','Intensidad de las concentraciones de esfuerzos','Influencia del tiempo sobre resistencia y geometría'].map((u, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-2)', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--warning)', flexShrink: 0 }}>•</span>{u}
                  </li>
                ))}
              </ul>
            </div>

            {/* 1-11 */}
            <SectionTitle id="1-11" title="Factor de diseño y factor de seguridad" />
            <ConceptBlock color="var(--accent)" label="Método determinístico" text="El factor de diseño nd se define como la razón entre el parámetro de pérdida de función y el parámetro máximo permisible. Después del diseño, el factor real se conoce como factor de seguridad n." />
            <FormulaBox title="Ecuaciones del factor de diseño">
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: 'var(--text-3)' }}>n<sub>d</sub></span> = <span style={{ color: 'var(--success)' }}>parámetro de pérdida de función</span> / <span style={{ color: 'var(--accent)' }}>parámetro máximo permisible</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: 'var(--text-3)' }}>n<sub>d</sub></span> = <span style={{ color: 'var(--success)' }}>S</span> / <span style={{ color: 'var(--accent)' }}>σ</span>
                <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 16 }}>(expresado en esfuerzo y resistencia)</span>
              </div>
              <div>
                <span style={{ color: 'var(--accent)' }}>σ</span><sub>perm</sub> = <span style={{ color: 'var(--success)' }}>S</span> / <span style={{ color: 'var(--text-3)' }}>n<sub>d</sub></span>
              </div>
            </FormulaBox>
            <SafetyFactorCalc />

            {/* 1-12 */}
            <SectionTitle id="1-12" title="Confiabilidad" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La medida estadística de la probabilidad de que un elemento mecánico no falle en el servicio se llama confiabilidad. Es importante notar que los buenos datos estadísticos y las buenas estimaciones son esenciales para realizar un análisis de confiabilidad aceptable.</p>
            <FormulaBox title="Definiciones de confiabilidad">
              <div style={{ marginBottom: 12 }}>
                <span style={{ color: 'var(--success)' }}>R</span> = 1 − <span style={{ color: 'var(--danger)' }}>p<sub>f</sub></span>
                <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 16 }}>0 ≤ R ≤ 1</span>
              </div>
              <div>
                <span style={{ color: 'var(--success)' }}>R<sub>sistema</sub></span> = <span style={{ color: 'var(--text-3)' }}>∏</span><span style={{ color: 'var(--success)' }}>R<sub>i</sub></span>
                <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 16 }}>(componentes en serie)</span>
              </div>
            </FormulaBox>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 16, margin: '16px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>Ejemplo: Eje con dos cojinetes R₁ = 95%, R₂ = 98%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--success)' }}>R = 0.95 × 0.98 = 0.93 (93%)</div>
            </div>

            {/* 1-13 */}
            <SectionTitle id="1-13" title="Dimensiones y tolerancias" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, margin: '16px 0' }}>
              {[
                { term: 'Tamaño nominal', def: 'Tamaño para designar un elemento. Puede diferir significativamente del tamaño real medido.' },
                { term: 'Tolerancia', def: 'Diferencia entre los límites máximo y mínimo permisibles de una dimensión. Ej: 25 ± 0.1 mm.' },
                { term: 'Límite superior / inferior', def: 'Valores máximo y mínimo permisibles de una dimensión en la manufactura.' },
                { term: 'Ajuste', def: 'Clase de ajuste (holgura, interferencia, transición) entre partes ensambladas.' },
              ].map((d) => (
                <div key={d.term} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 4 }}>{d.term}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{d.def}</p>
                </div>
              ))}
            </div>

            {/* 1-14 */}
            <SectionTitle id="1-14" title="Unidades" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Este libro utiliza el Sistema Internacional (SI) y el sistema de uso común en Estados Unidos (USC). Las unidades de esfuerzo en SI son el pascal (Pa = N/m²), el kilopascal (kPa), el megapascal (MPa) y el gigapascal (GPa). En USC se usa el psi (lbf/pulg²) y el kpsi.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
                    {['Cantidad', 'SI', 'USC', 'Factor de conversión'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Fuerza', 'N (newton)', 'lbf', '1 lbf = 4.45 N'],
                    ['Masa', 'kg', 'lbm', '1 lbm = 0.454 kg'],
                    ['Esfuerzo', 'Pa, MPa', 'psi, kpsi', '1 psi = 6.895 kPa; 1 ksi = 6.89 MPa'],
                    ['Longitud', 'm, mm', 'pulg, pie', '1 pulg = 25.4 mm; 1 pie = 0.305 m'],
                    ['Energía', 'J (joule)', 'lbf·pulg', '1 lbf·pulg = 0.113 J'],
                    ['Potencia', 'W (watt)', 'hp', '1 hp = 0.746 kW'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-0)' }}>
                      {row.map((c, j) => <td key={j} style={{ padding: '9px 14px', color: j === 0 ? 'var(--text-1)' : j === 3 ? 'var(--success)' : 'var(--text-2)' }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 1-15 */}
            <SectionTitle id="1-15" title="Cálculos y cifras significativas" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>En la práctica de la ingeniería es costumbre expresar los resultados con tres cifras significativas porque la incertidumbre en los datos raramente justifica más precisión. Para números entre 0.1 y 1000, se expresa el resultado directamente (p. ej. 82.3, 1.57, 0.234). Para números fuera de este rango, se usa notación científica.</p>

            {/* 1-16 */}
            <SectionTitle id="1-16" title="Interdependencias entre temas de diseño" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El texto está organizado en forma de espiral. Los conceptos se presentan, se aplican y luego se revisan con mayor profundidad conforme avanza el libro. La parte 1 establece los fundamentos que son aplicados en todas las partes subsiguientes.</p>

            {/* 1-17 */}
            <SectionTitle id="1-17" title="Caso de estudio: transmisión de potencia" />
            <ConceptBlock color="var(--success)" label="Caso de estudio integrador" text="A lo largo del libro se desarrolla el diseño de una transmisión de potencia: un reductor de velocidad con engranes helicoidales, ejes, rodamientos y cuñas. Los capítulos 7-18 aplican sus respectivos métodos a este caso de estudio, mostrando cómo se integran todos los conceptos del libro." />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '20px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Especificaciones del caso de estudio:</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Potencia de entrada: 1 hp a 1750 rpm','Relación de velocidades: 3.5:1 (reducción)','Vida de diseño: 10,000 horas','Confiabilidad: 90%','Cargas: combinación de flexión y torsión en ejes'].map((s, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-2)', display: 'flex', gap: 10 }}>
                    <CheckCircle size={14} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />{s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div style={{
              display: 'flex',
              flexDirection: (isMobile || isTablet) ? 'column' : 'row',
              justifyContent: 'center',
              gap: 10,
              marginTop: 48, paddingTop: 28,
              borderTop: '1px solid var(--border-soft)',
            }}>
              <Link href="/capitulo/2" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--accent)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Capítulo 2: Materiales <ChevronRight size={14} />
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
