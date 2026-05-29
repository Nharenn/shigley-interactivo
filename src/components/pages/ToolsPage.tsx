'use client'

import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'
const MohrCircle = dynamic(() => import('@/components/interactive/MohrCircle'), { ssr: false })
const GoodmanDiagram = dynamic(() => import('@/components/interactive/GoodmanDiagram'), { ssr: false })
const AGMACalc = dynamic(() => import('@/components/interactive/AGMACalc'), { ssr: false })
const BeamSimulator = dynamic(() => import('@/components/interactive/BeamSimulator'), { ssr: false })
import { ChevronRight, X } from 'lucide-react'

type FilterTab = 'todas' | 'esfuerzos' | 'fatiga' | 'materiales' | 'conversiones' | 'engranes'

export default function ToolsPage() {
  const [filter, setFilter] = useState<FilterTab>('todas')
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && TOOLS.some((t) => t.id === hash)) {
      setActiveModal(hash)
      window.location.hash = ''
    }
  }, [])

  const tools = TOOLS.filter((t) => filter === 'todas' || t.category === filter)

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh' }}>
      <Header />

      <div style={{ padding: '40px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--text-2)' }}>Inicio</Link>
          <span style={{ color: 'var(--text-3)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-1)' }}>Herramientas</span>
        </nav>

        <div style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
            Simuladores
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Herramientas y Calculadoras
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: 15, margin: 0 }}>
            Simuladores interactivos para resolver problemas de diseño mecánico
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {([
            { id: 'todas', label: 'Todas' },
            { id: 'esfuerzos', label: 'Esfuerzos' },
            { id: 'fatiga', label: 'Fatiga' },
            { id: 'materiales', label: 'Materiales' },
            { id: 'conversiones', label: 'Conversiones' },
            { id: 'engranes', label: 'Engranes' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '7px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                background: filter === tab.id ? 'var(--accent)' : 'var(--bg-2)',
                color: filter === tab.id ? 'white' : 'var(--text-2)',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveModal(tool.id)}
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--transition)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = 'var(--shadow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  height: 120,
                  borderRadius: 8,
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {tool.preview}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 999,
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tool.category}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 14.5, color: 'var(--text-1)', marginBottom: 4 }}>
                  {tool.title}
                </h4>
                <p style={{ fontSize: 12.5, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
                  {tool.desc}
                </p>
              </div>
              <div
                style={{
                  marginTop: 'auto',
                  color: 'var(--accent)',
                  fontSize: 13,
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                Abrir herramienta <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <ToolModal
          tool={TOOLS.find((t) => t.id === activeModal)!}
          onClose={() => setActiveModal(null)}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
    </div>
  )
}

function ToolModal({ tool, onClose, isMobile, isTablet }: { tool: typeof TOOLS[0]; onClose: () => void; isMobile: boolean; isTablet: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: (isMobile || isTablet) ? 'var(--bg-0)' : 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: (isMobile || isTablet) ? 'stretch' : 'center',
        justifyContent: (isMobile || isTablet) ? 'stretch' : 'center',
        padding: isMobile ? 0 : isTablet ? 24 : 24,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Mobile/Tablet top bar */}
      {(isMobile || isTablet) && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            paddingTop: 'calc(8px + env(safe-area-inset-top, 0px))',
            borderBottom: '1px solid var(--border-soft)',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--radius-sm)', color: 'var(--text-1)',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <ArrowLeft size={22} />
          </button>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, flex: 1 }}>{tool.title}</h2>
        </div>
      )}

      <div
        style={{
          background: (isMobile || isTablet) ? 'transparent' : 'var(--bg-0)',
          border: (isMobile || isTablet) ? 'none' : '1px solid var(--border)',
          borderRadius: (isMobile || isTablet) ? 0 : 'var(--radius-lg)',
          width: '100%',
          maxWidth: isMobile ? '100%' : isTablet ? 700 : 800,
          maxHeight: (isMobile || isTablet) ? undefined : '90vh',
          overflowY: 'auto',
          padding: isMobile ? '16px' : isTablet ? 24 : 32,
          paddingBottom: isMobile ? 'calc(16px + env(safe-area-inset-bottom, 0px))' : isTablet ? 24 : 32,
          position: 'relative',
          flex: (isMobile || isTablet) ? 1 : undefined,
        }}
      >
        {/* Desktop close button (tablet gets 44x44) */}
        {!isMobile && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: isTablet ? 12 : 16, right: isTablet ? 12 : 16,
              width: isTablet ? 44 : 32, height: isTablet ? 44 : 32, borderRadius: '50%',
              background: 'var(--bg-3)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-2)',
            }}
          >
            <X size={16} />
          </button>
        )}

        {!isMobile && !isTablet && (
          <>
            <h2 style={{ fontSize: 22, letterSpacing: '-0.02em', marginBottom: 6 }}>{tool.title}</h2>
            <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 24 }}>{tool.desc}</p>
          </>
        )}

        {tool.component}
      </div>
    </div>
  )
}

/* ─── Calculadora de Factor de Seguridad ─── */
function SafetyFactorCalc() {
  const [sy, setSy] = useState(400)
  const [sigma, setSigma] = useState(200)
  const n = sy / sigma

  const status = n >= 2 ? 'success' : n >= 1 ? 'warning' : 'danger'
  const color = `var(--${status})`

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>
            Sy — Resistencia del material (MPa)
          </label>
          <input
            type="range" min={50} max={2000} value={sy}
            onChange={(e) => setSy(Number(e.target.value))}
          />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)' }}>{sy} MPa</div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', display: 'block', marginBottom: 6 }}>
            σ — Esfuerzo aplicado (MPa)
          </label>
          <input
            type="range" min={1} max={2000} value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
          />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)' }}>{sigma} MPa</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: `2px solid ${color}` }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Factor de Seguridad
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 52, fontWeight: 700, color, lineHeight: 1 }}>
          {n.toFixed(2)}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color }}>
          {n >= 2 ? '✓ Diseño seguro' : n >= 1 ? '⚠ Margen ajustado' : '✗ Falla inminente'}
        </div>
      </div>
      <div style={{ marginTop: 12, height: 8, background: 'var(--bg-3)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: color, width: `${Math.min(100, (n / 3) * 100)}%`, transition: 'width 0.4s, background 0.4s', borderRadius: 999 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginTop: 4 }}>
        <span>n = 0</span><span>n = 1</span><span>n = 2</span><span>n = 3</span>
      </div>
    </div>
  )
}

/* ─── Conversor de unidades ─── */
function UnitConverter() {
  const [category, setCategory] = useState<'stress' | 'force' | 'length'>('stress')
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('MPa')

  const CATEGORIES = {
    stress: {
      label: 'Esfuerzo / Presión',
      units: [
        { id: 'MPa', label: 'MPa (N/mm²)', factor: 1 },
        { id: 'GPa', label: 'GPa', factor: 1000 },
        { id: 'kPa', label: 'kPa', factor: 0.001 },
        { id: 'psi', label: 'psi', factor: 0.006895 },
        { id: 'ksi', label: 'ksi', factor: 6.895 },
      ],
    },
    force: {
      label: 'Fuerza',
      units: [
        { id: 'N', label: 'N (Newton)', factor: 1 },
        { id: 'kN', label: 'kN', factor: 1000 },
        { id: 'lbf', label: 'lbf', factor: 4.44822 },
        { id: 'kip', label: 'kip', factor: 4448.22 },
      ],
    },
    length: {
      label: 'Longitud',
      units: [
        { id: 'mm', label: 'mm', factor: 1 },
        { id: 'm', label: 'm', factor: 1000 },
        { id: 'cm', label: 'cm', factor: 10 },
        { id: 'in', label: 'pulgada (in)', factor: 25.4 },
        { id: 'ft', label: 'pie (ft)', factor: 304.8 },
      ],
    },
  }

  const cat = CATEGORIES[category]
  const fromFactor = cat.units.find((u) => u.id === fromUnit)?.factor ?? 1

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((k) => (
          <button
            key={k}
            onClick={() => { setCategory(k); setFromUnit(CATEGORIES[k].units[0].id) }}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              background: category === k ? 'var(--accent)' : 'var(--bg-2)',
              color: category === k ? 'white' : 'var(--text-2)',
            }}
          >
            {CATEGORIES[k].label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>Valor</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{
              width: '100%', padding: '10px 12px',
              background: 'var(--bg-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', fontSize: 14,
              color: 'var(--text-1)', fontFamily: 'var(--font-mono)',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>Unidad origen</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px',
              background: 'var(--bg-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', fontSize: 14,
              color: 'var(--text-1)', fontFamily: 'var(--font-mono)',
            }}
          >
            {cat.units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cat.units.filter((u) => u.id !== fromUnit).map((u) => (
          <div
            key={u.id}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 16px', background: 'var(--bg-2)',
              border: '1px solid var(--border)', borderRadius: 8,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-2)' }}>{u.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>
              {((value * fromFactor) / u.factor).toPrecision(6)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Calculadora Marin ─── */
function MarinCalc() {
  const [sut, setSut] = useState(600)
  const [diameter, setDiameter] = useState(30)
  const [finish, setFinish] = useState<'ground' | 'machined' | 'hot-rolled' | 'forged'>('machined')
  const [reliability, setReliability] = useState(0.9)

  const Se_base = sut <= 1400 ? 0.5 * sut : 700

  const KA_COEFFICIENTS: Record<string, [number, number]> = {
    ground: [1.58, -0.085],
    machined: [4.51, -0.265],
    'hot-rolled': [57.7, -0.718],
    forged: [272, -0.995],
  }

  const [a, b] = KA_COEFFICIENTS[finish]
  const ka = a * sut ** b

  const kb = diameter < 8 ? 1 : diameter <= 51 ? 1.24 * diameter ** -0.107 : 0.859 - 0.000837 * diameter

  const kc = 1

  const KD_table: Record<number, number> = { 0.5: 0.897, 0.9: 0.868, 0.95: 0.814, 0.99: 0.753, 0.999: 0.702, 0.9999: 0.659 }
  const ke = KD_table[reliability] ?? 0.868

  const kd = 1

  const Se = ka * kb * kc * kd * ke * Se_base

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>
            Sut — Resistencia última (MPa)
          </label>
          <input type="range" min={200} max={2000} value={sut} onChange={(e) => setSut(Number(e.target.value))} />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{sut} MPa</div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>
            Diámetro (mm)
          </label>
          <input type="range" min={1} max={300} value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--success)' }}>{diameter} mm</div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>
            Acabado superficial
          </label>
          <select
            value={finish}
            onChange={(e) => setFinish(e.target.value as typeof finish)}
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, color: 'var(--text-1)' }}
          >
            <option value="ground">Esmerilado</option>
            <option value="machined">Maquinado</option>
            <option value="hot-rolled">Laminado en caliente</option>
            <option value="forged">Forjado</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 4 }}>
            Confiabilidad
          </label>
          <select
            value={reliability}
            onChange={(e) => setReliability(Number(e.target.value))}
            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13, color: 'var(--text-1)' }}
          >
            <option value={0.5}>50%</option>
            <option value={0.9}>90%</option>
            <option value={0.95}>95%</option>
            <option value={0.99}>99%</option>
            <option value={0.999}>99.9%</option>
            <option value={0.9999}>99.99%</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { label: "Se' base", value: Se_base.toFixed(1), unit: 'MPa' },
          { label: 'ka (acabado)', value: ka.toFixed(4), unit: '' },
          { label: 'kb (tamaño)', value: kb.toFixed(4), unit: '' },
          { label: 'kc (carga)', value: kc.toFixed(2), unit: '' },
          { label: 'kd (temp)', value: kd.toFixed(2), unit: '' },
          { label: 'ke (conf.)', value: ke.toFixed(4), unit: '' },
        ].map((f) => (
          <div key={f.label} style={{ padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>
              {f.value} {f.unit}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: 24, background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '2px solid var(--success)' }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Se' — Límite de fatiga corregido
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, fontWeight: 700, color: 'var(--success)', lineHeight: 1 }}>
          {Se.toFixed(1)} <span style={{ fontSize: 18, fontWeight: 400 }}>MPa</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Conversor de dureza ─── */
function HardnessConverter() {
  const [hb, setHb] = useState(200)

  const hrc = hb > 100 ? (0.0835 * hb - 1.3).toFixed(1) : 'N/A'
  const hv = (hb * 1.067 - 2.25).toFixed(0)
  const sut = (hb > 0 ? 3.45 * hb : 0).toFixed(0)

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', display: 'block', marginBottom: 6 }}>
          Dureza Brinell (HB)
        </label>
        <input type="range" min={80} max={650} value={hb} onChange={(e) => setHb(Number(e.target.value))} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginTop: 4 }}>
          <span>80 HB</span><span style={{ color: 'var(--accent)', fontSize: 16 }}>{hb} HB</span><span>650 HB</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {[
          { label: 'Rockwell HRC', value: hrc, color: 'var(--accent)' },
          { label: 'Vickers HV', value: hv, color: 'var(--success)' },
          { label: 'Sut aprox. (MPa)', value: sut, color: 'var(--warning)' },
        ].map((r) => (
          <div key={r.label} style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBottom: 8 }}>{r.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: r.color }}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Tools data ─── */
const TOOLS = [
  {
    id: 'mohr',
    title: 'Círculo de Mohr',
    desc: 'Calcula esfuerzos principales, cortante máximo y ángulo del plano principal en tiempo real.',
    category: 'esfuerzos',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <line x1="10" y1="60" x2="190" y2="60" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="100" y1="10" x2="100" y2="110" stroke="var(--text-3)" strokeWidth="0.8" />
        <circle cx="100" cy="60" r="45" fill="rgba(59,130,246,0.06)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="145" cy="60" r="3" fill="var(--accent)" />
        <circle cx="55" cy="60" r="3" fill="var(--accent)" />
        <text x="147" y="57" fill="var(--accent)" fontSize="9" fontFamily="monospace">σ₁</text>
        <text x="38" y="57" fill="var(--accent)" fontSize="9" fontFamily="monospace">σ₂</text>
        <circle cx="120" cy="35" r="3" fill="var(--danger)" />
        <circle cx="80" cy="85" r="3" fill="#60A5FA" />
        <line x1="120" y1="35" x2="80" y2="85" stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="190" y="56" fill="var(--text-2)" fontSize="8" fontFamily="monospace">σ</text>
        <text x="103" y="12" fill="var(--text-2)" fontSize="8" fontFamily="monospace">τ</text>
      </svg>
    ),
    component: <MohrCircle />,
  },
  {
    id: 'safety',
    title: 'Factor de Seguridad',
    desc: 'Calcula el factor de seguridad n = Sy/σ con indicador visual de estado.',
    category: 'esfuerzos',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <rect x="40" y="40" width="120" height="50" rx="8" fill="none" stroke="var(--success)" strokeWidth="1.5" />
        <text x="100" y="73" textAnchor="middle" fill="var(--success)" fontSize="28" fontFamily="monospace" fontWeight="700">2.34</text>
        <text x="100" y="108" textAnchor="middle" fill="var(--text-3)" fontSize="9" fontFamily="monospace">FACTOR DE SEGURIDAD</text>
        <rect x="20" y="30" width="40" height="6" rx="3" fill="var(--danger)" opacity="0.5" />
        <rect x="60" y="30" width="60" height="6" rx="3" fill="var(--warning)" opacity="0.5" />
        <rect x="120" y="30" width="60" height="6" rx="3" fill="var(--success)" opacity="0.5" />
      </svg>
    ),
    component: <SafetyFactorCalc />,
  },
  {
    id: 'units',
    title: 'Conversor de Unidades',
    desc: 'Convierte entre sistemas SI y USCS para esfuerzo, fuerza y longitud.',
    category: 'conversiones',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <text x="30" y="50" fill="var(--accent)" fontSize="14" fontFamily="monospace" fontWeight="700">1 MPa</text>
        <line x1="80" y1="44" x2="120" y2="44" stroke="var(--text-3)" strokeWidth="1" markerEnd="url(#a)" />
        <text x="130" y="50" fill="var(--success)" fontSize="14" fontFamily="monospace" fontWeight="700">145 psi</text>
        <text x="30" y="75" fill="var(--accent)" fontSize="14" fontFamily="monospace" fontWeight="700">1 kN</text>
        <text x="130" y="75" fill="var(--success)" fontSize="14" fontFamily="monospace" fontWeight="700">225 lbf</text>
        <text x="30" y="100" fill="var(--accent)" fontSize="14" fontFamily="monospace" fontWeight="700">25 mm</text>
        <text x="130" y="100" fill="var(--success)" fontSize="14" fontFamily="monospace" fontWeight="700">0.984 in</text>
        <text x="94" y="74" fill="var(--text-3)" fontSize="14">⇄</text>
        <text x="94" y="99" fill="var(--text-3)" fontSize="14">⇄</text>
      </svg>
    ),
    component: <UnitConverter />,
  },
  {
    id: 'marin',
    title: 'Calculadora de Marin',
    desc: 'Calcula el límite de fatiga corregido Se con todos los factores de Marin (ka, kb, kc, kd, ke).',
    category: 'fatiga',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <line x1="20" y1="100" x2="180" y2="100" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="20" y1="20" x2="20" y2="105" stroke="var(--text-3)" strokeWidth="0.8" />
        <path d="M 20 30 L 60 45 L 100 60 L 140 80 L 180 100" fill="none" stroke="var(--warning)" strokeWidth="2" />
        <circle cx="100" cy="60" r="4" fill="var(--success)" />
        <text x="102" y="55" fill="var(--success)" fontSize="8" fontFamily="monospace">Se'</text>
        <text x="22" y="18" fill="var(--warning)" fontSize="8" fontFamily="monospace">S-N Marin</text>
      </svg>
    ),
    component: <MarinCalc />,
  },
  {
    id: 'hardness',
    title: 'Conversor de Dureza',
    desc: 'Convierte entre Brinell (HB), Rockwell (HRC) y Vickers (HV), con estimación de Sut.',
    category: 'materiales',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <text x="100" y="38" textAnchor="middle" fill="var(--accent)" fontSize="22" fontFamily="monospace" fontWeight="700">200 HB</text>
        <path d="M 60 50 L 50 65 M 100 50 L 100 65 M 140 50 L 150 65" stroke="var(--text-3)" strokeWidth="1" />
        <text x="30" y="85" fill="var(--success)" fontSize="12" fontFamily="monospace">HRC 15</text>
        <text x="80" y="85" fill="var(--warning)" fontSize="12" fontFamily="monospace">HV 210</text>
        <text x="130" y="85" fill="var(--danger)" fontSize="12" fontFamily="monospace" transform="rotate(-5,145,82)">690 MPa</text>
      </svg>
    ),
    component: <HardnessConverter />,
  },
  {
    id: 'beam',
    title: 'Simulador de Vigas',
    desc: 'Calcula reacciones, cortante, momento flector y deflexión en viga simplemente apoyada con carga puntual.',
    category: 'esfuerzos',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <line x1="20" y1="55" x2="180" y2="55" stroke="var(--text-2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="50" x2="20" y2="75" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="180" y1="50" x2="180" y2="75" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="110" y1="20" x2="110" y2="55" stroke="var(--danger)" strokeWidth="1.5" />
        <text x="110" y="16" fill="var(--danger)" fontSize="9" fontFamily="monospace">P</text>
        <path d="M 30 80 L 70 95 L 110 110" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M 30 80 L 70 95 L 110 110" fill="none" stroke="var(--accent)" strokeWidth="1.5" transform="translate(0,-15)" opacity="0.3" />
        <text x="55" y="105" fill="var(--accent)" fontSize="7" fontFamily="monospace">SFD</text>
        <text x="100" y="60" fill="var(--warning)" fontSize="7" fontFamily="monospace">BMD</text>
      </svg>
    ),
    component: <BeamSimulator />,
  },
  {
    id: 'goodman',
    title: 'Diagrama de Goodman',
    desc: 'Analiza la resistencia a fatiga con esfuerzo medio y alternante. Criterio Goodman modificado con cálculo de factor de seguridad.',
    category: 'fatiga',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <line x1="20" y1="100" x2="190" y2="100" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="20" y1="10" x2="20" y2="105" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="20" y1="20" x2="160" y2="100" stroke="var(--accent)" strokeWidth="2" />
        <line x1="20" y1="35" x2="135" y2="100" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="90" cy="63" r="5" fill="var(--success)" />
        <text x="22" y="18" fill="var(--accent)" fontSize="8" fontFamily="monospace">Se</text>
        <text x="162" y="98" fill="var(--accent)" fontSize="8" fontFamily="monospace">Sut</text>
        <text x="25" y="108" fill="var(--text-2)" fontSize="7" fontFamily="monospace">σm</text>
        <text x="5" y="55" fill="var(--text-2)" fontSize="7" fontFamily="monospace">σa</text>
      </svg>
    ),
    component: <GoodmanDiagram />,
  },
  {
    id: 'agma',
    title: 'Calculadora AGMA',
    desc: 'Diseño completo de engranes rectos/helicoidales con todos los factores de la norma AGMA.',
    category: 'engranes',
    preview: (
      <svg viewBox="0 0 200 120" width="180" height="110">
        <circle cx="80" cy="60" r="40" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="80" cy="60" r="10" fill="none" stroke="var(--accent)" strokeWidth="1" />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => {
          const r = (a * Math.PI) / 180
          return <line key={a} x1={80 + 40 * Math.sin(r)} y1={60 - 40 * Math.cos(r)} x2={80 + 48 * Math.sin(r)} y2={60 - 48 * Math.cos(r)} stroke="var(--accent)" strokeWidth="4" strokeOpacity="0.6" />
        })}
        <circle cx="140" cy="60" r="25" fill="none" stroke="var(--success)" strokeWidth="1.2" />
        <circle cx="140" cy="60" r="6" fill="none" stroke="var(--success)" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180
          return <line key={a} x1={140 + 25 * Math.sin(r)} y1={60 - 25 * Math.cos(r)} x2={140 + 32 * Math.sin(r)} y2={60 - 32 * Math.cos(r)} stroke="var(--success)" strokeWidth="4" strokeOpacity="0.6" />
        })}
        <text x="100" y="110" textAnchor="middle" fill="var(--text-3)" fontSize="8" fontFamily="monospace">AGMA · Engranes Rectos/Helicoidales</text>
      </svg>
    ),
    component: <AGMACalc />,
  },
]
