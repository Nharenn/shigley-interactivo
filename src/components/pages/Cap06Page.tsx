'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import { BookOpen, Monitor, PenLine, Menu, X, ChevronLeft, ChevronRight, Home } from 'lucide-react'
import GoodmanDiagram from '@/components/interactive/GoodmanDiagram'

const SECTIONS = [
  { id: '6-1', title: 'Introducción a la fatiga en metales' },
  { id: '6-2', title: 'Enfoque de la falla por fatiga' },
  { id: '6-3', title: 'Métodos de fatiga-vida' },
  { id: '6-4', title: 'Método del esfuerzo-vida' },
  { id: '6-5', title: 'Método de deformación-vida' },
  { id: '6-6', title: 'Mecánica de fractura lineal elástica' },
  { id: '6-7', title: 'Límite de resistencia a la fatiga' },
  { id: '6-8', title: 'Resistencia a la fatiga' },
  { id: '6-9', title: 'Factores modificadores de Marin' },
  { id: '6-10', title: 'Concentración de esfuerzo y sensibilidad a la muesca' },
  { id: '6-11', title: 'Caracterización de esfuerzos fluctuantes' },
  { id: '6-12', title: 'Criterios de falla por fatiga' },
  { id: '6-13', title: 'Fatiga por torsión bajo esfuerzos fluctuantes' },
  { id: '6-14', title: 'Combinaciones de modos de carga' },
  { id: '6-15', title: 'Daño por fatiga acumulada (Miner)' },
  { id: '6-16', title: 'Resistencia a la fatiga superficial' },
  { id: '6-17', title: 'Análisis estocástico' },
  { id: '6-18', title: 'Resumen de ecuaciones importantes' },
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

function SNcurvePlot() {
  const [Sut, setSut] = useState(700)
  const Se_prime = 0.5 * Sut
  const S1000 = 0.9 * Sut
  const Sf = Se_prime

  const logN = (n: number) => Math.log10(n)
  const w = 500, h = 240
  const padL = 50, padB = 36, padT = 16, padR = 20
  const chartW = w - padL - padR
  const chartH = h - padB - padT
  const minLog = 1, maxLog = 9
  const minS = 0, maxS = Math.max(Sut * 1.05, 700)

  const xp = (n: number) => padL + ((logN(n) - minLog) / (maxLog - minLog)) * chartW
  const yp = (s: number) => padT + chartH - ((s - minS) / (maxS - minS)) * chartH

  const curvePoints = [
    [1, S1000 * 1.1],
    [1e3, S1000],
    [1e6, Sf * 1.1],
    [2e6, Sf],
    [1e9, Sf],
  ]

  const d = curvePoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${xp(pt[0])} ${yp(pt[1])}`).join(' ')

  const xTicks = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9]
  const yTicks = [0, 200, 400, 600, 800, 1000].filter(v => v <= maxS + 50)

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Diagrama S-N interactivo</div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginRight: 10 }}>Sut: {Sut} MPa</label>
          <input type="range" min={200} max={1400} value={Sut} onChange={e => setSut(+e.target.value)} style={{ width: 120 }} />
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {yTicks.map(y => (
          <g key={y}>
            <line x1={padL} y1={yp(y)} x2={padL + chartW} y2={yp(y)} stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x={padL - 4} y={yp(y) + 3} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">{y}</text>
          </g>
        ))}
        {xTicks.map(n => (
          <g key={n}>
            <line x1={xp(n)} y1={padT} x2={xp(n)} y2={padT + chartH} stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x={xp(n)} y={padT + chartH + 14} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">10{String(Math.round(logN(n))).split('').map((c, i) => c)}</text>
          </g>
        ))}
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="var(--border)" strokeWidth="1" />
        <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="var(--border)" strokeWidth="1" />
        <text x={padL + chartW / 2} y={h - 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">N (ciclos) — escala log</text>
        <text x={10} y={padT + chartH / 2} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" transform={`rotate(-90 10 ${padT + chartH / 2})`}>Sf (MPa)</text>
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <line x1={xp(2e6)} y1={yp(Sf)} x2={padL + chartW} y2={yp(Sf)} stroke="var(--success)" strokeWidth="1.5" strokeDasharray="5,3" />
        <line x1={xp(2e6)} y1={padT} x2={xp(2e6)} y2={padT + chartH} stroke="var(--text-3)" strokeWidth="0.5" strokeDasharray="3,3" />
        <text x={xp(1.5e3)} y={yp(S1000 * 0.98)} fill="var(--warning)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Sf@10³</text>
        <circle cx={xp(1e3)} cy={yp(S1000)} r="4" fill="var(--warning)" />
        <text x={xp(1.5e7)} y={yp(Sf * 0.93)} fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">Se = {Se_prime.toFixed(0)} MPa</text>
        <circle cx={xp(2e6)} cy={yp(Sf)} r="4" fill="var(--success)" />
        <text x={padL + chartW * 0.2} y={padT + 14} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">Sut = {Sut} MPa</text>
        <circle cx={xp(1)} cy={yp(Sut)} r="3" fill="var(--danger)" />
      </svg>
      <div style={{ display: 'flex', gap: 20, marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', flexWrap: 'wrap' as const }}>
        <span style={{ color: 'var(--accent)' }}>— Curva S-N</span>
        <span style={{ color: 'var(--success)' }}>-- Se (límite de resistencia)</span>
        <span style={{ color: 'var(--warning)' }}>● Sf@10³</span>
        <span>Se = 0.5·Sut (acero)</span>
      </div>
    </div>
  )
}

function MarinCalc() {
  const [Sut, setSut] = useState(700)
  const [surface, setSurface] = useState<'pulido' | 'maquinado' | 'forjado'>('maquinado')
  const [d, setD] = useState(30)
  const [loadType, setLoadType] = useState<'flexion' | 'axial' | 'torsion'>('flexion')
  const [temp, setTemp] = useState(25)
  const [reliability, setReliability] = useState<'50' | '90' | '99' | '99.9'>('90')

  const Se_prime = 0.5 * Sut

  const ka_vals: Record<string, number> = { pulido: 1.0, maquinado: 0.82, forjado: 0.47 }
  const ka = ka_vals[surface]
  const kb = d <= 8 ? 1.0 : d <= 51 ? 1.51 * Math.pow(d, -0.157) : 1.51 * Math.pow(d, -0.157)
  const kc_vals: Record<string, number> = { flexion: 1.0, axial: 0.85, torsion: 0.59 }
  const kc = kc_vals[loadType]
  const kd = temp <= 450 ? 1.0 : 1.0 - 0.0004 * (temp - 450)
  const ke_vals: Record<string, number> = { '50': 1.0, '90': 0.897, '99': 0.814, '99.9': 0.753 }
  const ke = ke_vals[reliability]

  const Se = ka * kb * kc * kd * ke * Se_prime

  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Calculadora de factores de Marin: Límite de resistencia a la fatiga</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', display: 'block', marginBottom: 6 }}>Sut (MPa): {Sut}</label>
          <input type="range" min={200} max={1400} value={Sut} onChange={e => setSut(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)', display: 'block', marginBottom: 6 }}>Diámetro d (mm): {d}</label>
          <input type="range" min={2} max={200} value={d} onChange={e => setD(+e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)', display: 'block', marginBottom: 6 }}>Temperatura (°C): {temp}</label>
          <input type="range" min={20} max={600} value={temp} onChange={e => setTemp(+e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Acabado superficial</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(['pulido', 'maquinado', 'forjado'] as const).map(s => (
              <button key={s} onClick={() => setSurface(s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', background: surface === s ? 'var(--accent)' : 'var(--bg-3)', color: surface === s ? 'white' : 'var(--text-2)', textAlign: 'left' as const }}>
                {s} (ka={ka_vals[s]})
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Tipo de carga</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(['flexion', 'axial', 'torsion'] as const).map(s => (
              <button key={s} onClick={() => setLoadType(s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', background: loadType === s ? 'var(--success)' : 'var(--bg-3)', color: loadType === s ? 'white' : 'var(--text-2)', textAlign: 'left' as const }}>
                {s} (kc={kc_vals[s]})
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Confiabilidad</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(['50', '90', '99', '99.9'] as const).map(s => (
              <button key={s} onClick={() => setReliability(s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', background: reliability === s ? 'var(--warning)' : 'var(--bg-3)', color: reliability === s ? 'white' : 'var(--text-2)', textAlign: 'left' as const }}>
                R={s}% (ke={ke_vals[s]})
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 14 }}>
        {[
          { k: 'ka', v: ka.toFixed(3), label: 'Superficial' },
          { k: 'kb', v: kb.toFixed(3), label: 'Tamaño' },
          { k: 'kc', v: kc.toFixed(3), label: 'Carga' },
          { k: 'kd', v: kd.toFixed(3), label: 'Temperatura' },
          { k: 'ke', v: ke.toFixed(3), label: 'Confiabilidad' },
          { k: 'kf', v: '1.0', label: 'Varios' },
        ].map(f => (
          <div key={f.k} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', textAlign: 'center' as const }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>{f.v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{f.k}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>{f.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 20px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginBottom: 4 }}>Se = ka·kb·kc·kd·ke · Se'</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>Se' = 0.5·Sut = {Se_prime.toFixed(0)} MPa</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: 'var(--success)' }}>{Se.toFixed(0)}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)' }}>MPa <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Se</span></div>
      </div>
    </div>
  )
}

function PracticaContent() {
  const C = 'var(--part-2)'
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const problems = [
    {
      num: 1,
      enunciado: 'Un acero AISI 1040 tiene Sut=520 MPa. Calcular Se\'=0.5·Sut (si Sut≤1400). Luego aplicar factores de Marin: ka=0.8 (mecanizado), kb=0.9 (diámetro 20 mm), kc=1 (flexión), kd=1, ke=0.85 (50% confiabilidad). Hallar Se=ka·kb·kc·kd·ke·Se\'.',
      respuesta: 'Se\'=0.5×520=260 MPa; Se=0.8×0.9×1×1×0.85×260=0.612×260=159.1 MPa.',
    },
    {
      num: 2,
      enunciado: 'Un eje tiene σ_a=120 MPa y σ_m=80 MPa. Se=200 MPa, Sut=600 MPa. Aplicar el criterio de Goodman modificado: 1/n=σ_a/Se+σ_m/Sut. Calcular n.',
      respuesta: '1/n=120/200+80/600=0.6+0.133=0.733; n=1/0.733=1.36.',
    },
    {
      num: 3,
      enunciado: 'Un componente se somete a: n₁=2000 ciclos a S₁=400 MPa, n₂=5000 ciclos a S₂=300 MPa. Las vidas correspondientes son N₁=8000 y N₂=25000. Aplicar Miner: D=Σ(n_i/N_i). ¿Falla si D≥1?',
      respuesta: 'D=2000/8000+5000/25000=0.25+0.2=0.45 <1 → no falla. Si se añaden n₃=3000 ciclos más a S₁, D=0.25+0.2+3000/8000=0.25+0.2+0.375=0.825 <1, aún seguro.',
    },
    {
      num: 4,
      enunciado: 'Un acero tiene Sut=800 MPa. Estimar Sf@10³=0.9·Sut y Se=0.5·Sut. Calcular la ecuación de la recta S-N (log-log) entre 10³ y 10⁶ ciclos usando b=−(1/3)·log(Sf@10³/Se) y S=a·N^b, donde a=Sf@10³/(10³)^b. Hallar S para N=50000 ciclos.',
      respuesta: 'Sf@10³=720 MPa; Se=400 MPa; b=−(1/3)×log(720/400)=−(1/3)×0.255=−0.085; a=720/10^(3×(−0.085))=720/10^(−0.255)=720/0.556=1295. N=50000=5e4: logN=4.699, logS=log1295−0.085×4.699=3.112−0.399=2.713, S=516 MPa.',
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

type Mode = 'lectura' | 'diapositivas' | 'practica'

export default function Cap06Page() {
  const { isMobile, isTablet } = useBreakpoint()
  const [mode, setMode] = useState<Mode>('lectura')
  const [activeSection, setActiveSection] = useState('6-4')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
              <span style={{ color: 'var(--part-2)', marginRight: 4 }}>6</span>Fallas por fatiga debidas a cargas variables
            </span>
          </>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>
            <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-3)' }}>Parte 2</span>
            <span style={{ color: 'var(--text-3)' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Cap. 6</span>
          </nav>
        )}
        <div style={{ display: 'flex', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, marginLeft: 'auto', gap: 2, flexShrink: 0 }}>
          <button onClick={() => setMode('lectura')} title="Lectura" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: mode === 'lectura' ? 'white' : 'var(--text-2)', background: mode === 'lectura' ? 'var(--part-2)' : 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', cursor: 'pointer', minHeight: 36 }}>
            <BookOpen size={12} />
            {!isMobile && !isTablet && 'Lectura'}
          </button>
          <Link href="/capitulo/6/slides" title="Diapositivas" style={{ padding: (isMobile || isTablet) ? '6px 8px' : '6px 14px', fontSize: 12.5, fontFamily: 'var(--font-mono)', borderRadius: 999, color: 'var(--text-2)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', minHeight: 36 }}>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 700, color: 'var(--part-2)', lineHeight: 1, letterSpacing: '-0.03em' }}>06</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 6, lineHeight: 1.3, color: 'var(--text-1)' }}>Fallas por fatiga<br />debidas a cargas variables</div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => { setActiveSection(s.id); closeSidebar() }} style={{ display: 'block', padding: (isMobile || isTablet) ? '12px 14px' : '7px 10px', minHeight: (isMobile || isTablet) ? 44 : 'auto', borderRadius: 'var(--radius-sm)', fontSize: isMobile ? 13 : 12.5, fontFamily: 'var(--font-mono)', color: activeSection === s.id ? 'var(--part-2)' : 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}>
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
              <span style={{ color: 'var(--part-2)', marginRight: 12 }}>6</span>
              Fallas por fatiga debidas a cargas variables
            </h1>
            <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 36, maxWidth: 720 }}>
              La fatiga es la falla más común en componentes mecánicos (~90% de fallas en servicio). Ocurre por cargas cíclicas repetidas a esfuerzos inferiores a la resistencia estática. Este capítulo cubre el método esfuerzo-vida con los factores de Marin y los criterios de Goodman/Gerber.
            </p>

            {mode === 'lectura' ? (
              <>
              <SectionTitle id="6-1" title="Introducción a la fatiga en metales" />
              <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La fatiga se produce por la nucleación y propagación de grietas bajo cargas cíclicas. El proceso comienza en discontinuidades microscópicas (rayaduras, poros, cambios de sección), donde la concentración de esfuerzo local supera el límite elástico repetidamente.</p>
              <ConceptBlock color="var(--danger)" label="Mecanismo de falla por fatiga" text="1. Iniciación de grieta: en discontinuidades superficiales bajo esfuerzo cíclico. 2. Propagación: la grieta crece de manera estable con cada ciclo (marcas de playa en superficie de fractura). 3. Fractura final: cuando el área remanente ya no soporta la carga estática. La fractura final puede ser dúctil o frágil." />

            <SectionTitle id="6-2" title="Enfoque de la falla por fatiga en el análisis y diseño" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El análisis de fatiga requiere conocer: la geometría completa del componente, las cargas de servicio reales (no las de diseño), las propiedades del material, el ambiente, el acabado superficial y el tratamiento térmico. El proceso es iterativo.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
              {[
                { step: '1. Identificar cargas', desc: 'Ciclos esperados, ratio R, tipo de carga (flexión, torsión, axial). Usar histogramas de carga si hay datos de campo.' },
                { step: '2. Obtener Se', desc: 'Prueba Moore (R=−1) → S\'e. Corregir con factores Marin: Se = ka·kb·kc·kd·ke·S\'e.' },
                { step: '3. Aplicar criterio', desc: 'Goodman (conservador) o Gerber (preciso). Calcular factor de seguridad nf o vida N.' },
                { step: '4. Verificar fluencia', desc: 'σmax = σa+σm ≤ Sy (la fatiga no es el único modo de falla posible).' },
              ].map(s => (
                <div key={s.step} style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 6 }}>{s.step}</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* 6-3 */}
            <SectionTitle id="6-3" title="Métodos de fatiga-vida" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '16px 0' }}>
              {[
                { m: 'Esfuerzo-vida (S-N)', desc: 'Más tradicional. Curva Sf vs N en papel log-log. Válido para altos ciclos (N>10³). Enfoque de este capítulo.', color: 'var(--accent)' },
                { m: 'Deformación-vida (ε-N)', desc: 'Más preciso para bajos ciclos (N<10³). Incluye deformación plástica local. Curvas σf\'/E y εf\'.', color: 'var(--success)' },
                { m: 'Mecánica de fractura (da/dN)', desc: 'Asume grieta existente. Predice crecimiento con ley de Paris: da/dN = C·(ΔK)ᵐ. Para inspección periódica.', color: 'var(--warning)' },
              ].map(m => (
                <div key={m.m} style={{ background: 'var(--bg-1)', border: `1px solid var(--border)`, borderRadius: 'var(--radius-sm)', padding: 14 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: m.color, marginBottom: 6 }}>{m.m}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              ))}
            </div>

            {/* 6-4 */}
            <SectionTitle id="6-4" title="Método del esfuerzo-vida" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El diagrama S-N se obtiene de la máquina de viga rotativa de R.R. Moore. Las muestras se someten a flexión pura a esfuerzo completamente invertido (R = σmín/σmáx = -1). Para aceros, la curva se vuelve horizontal a 10⁶ ciclos — ese esfuerzo es el límite de resistencia a la fatiga S'e.</p>
            <SNcurvePlot />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Estimación del límite de resistencia a la fatiga (S'e)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>S'e = 0.5·Sut &nbsp;&nbsp; (Sut ≤ 1400 MPa o 200 kpsi) <span style={{ color: 'var(--text-3)', fontSize: 12 }}>acero</span></div>
                <div>S'e = 0.5·Sut &nbsp;&nbsp; si Sut &lt; 200 kpsi, else S'e = 100 kpsi <span style={{ color: 'var(--text-3)', fontSize: 12 }}>USC</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 8 }}>Sf@10³ = 0.9·Sut (flexión) &nbsp;|&nbsp; Sf@10⁶ = Se</div>
              </div>
            </div>

            {/* 6-5 */}
            <SectionTitle id="6-5" title="Método de deformación-vida (ε-N)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El método ε-N es más preciso para vida corta (N {'<'} 10⁴ ciclos) donde hay deformación plástica significativa. La deformación total es la suma de la deformación elástica y plástica.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>Δε/2 = σ'f/E · (2N)^b + ε'f · (2N)^c <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Coffin-Manson)</span></div>
                <div>σ'f: coef. de resistencia a la fatiga &emsp; b: exponente (≈ −0.12 a −0.05)</div>
                <div>ε'f: coef. de ductilidad a la fatiga &emsp; c: exponente (≈ −0.7 a −0.5)</div>
              </div>
            </div>
            <ConceptBlock color="var(--success)" label="Transición elástico-plástica" text="La vida de transición 2Nt es donde la deformación elástica = deformación plástica: (2Nt) = (ε'f·E/σ'f)^(1/(b-c)). Para N < Nt domina la deformación plástica; para N > Nt domina la elástica." />

            {/* 6-6 */}
            <SectionTitle id="6-6" title="Método de mecánica de fractura lineal elástica (MFLE)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Este enfoque asume que existe una grieta inicial de tamaño a₀ y predice cuántos ciclos se necesitan para que la grieta crezca hasta el tamaño crítico ac. Se usa en estructuras de inspección periódica.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>da/dN = C · (ΔK)^m <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Ley de Paris)</span></div>
                <div>ΔK = Y·Δσ·√(πa) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(rango del factor de intensidad)</span></div>
                <div>N = ∫[a₀ a_c] da / [C·(ΔK)^m]</div>
                <div>a_c = (KIc/(Y·σ_max))²/π <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(tamaño crítico de grieta)</span></div>
              </div>
            </div>

            {/* 6-7 */}
            <SectionTitle id="6-7" title="Límite de resistencia a la fatiga" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El <strong>límite de resistencia a la fatiga S'e</strong> es el esfuerzo por debajo del cual un material puede soportar un número infinito de ciclos (para aceros). Se obtiene de la prueba de viga rotativa de R.R. Moore (R = −1, flexión pura).</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>Acero: S'e = 0.5·Sut &emsp; (Sut ≤ 1400 MPa)</div>
                <div>Acero: S'e = 700 MPa &emsp; (Sut {'>'} 1400 MPa)</div>
                <div>Hierro colado: S'e = 0.4·Sut</div>
                <div>Aluminio: NO tiene límite definido (usar S'f @ 5×10⁸ ciclos)</div>
              </div>
            </div>

            {/* 6-8 */}
            <SectionTitle id="6-8" title="Resistencia a la fatiga — Curva S-N completa" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para vidas entre 10³ y 10⁶ ciclos, la resistencia a la fatiga Sf(N) sigue una línea recta en escala log-log. Se usan dos puntos de referencia: (10³, 0.9·Sut) y (10⁶, Se).</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>Sf = a · N^b &emsp; (ecuación de la curva S-N)</div>
                <div>b = −(1/3)·log(f·Sut/Se) &emsp; f ≈ 0.9</div>
                <div>a = (f·Sut)² / Se</div>
                <div>N = (Sf/a)^(1/b) &emsp; (vida para un esfuerzo dado)</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, margin:'12px 0' }}>
              {[['N = 10³','Sf ≈ 0.9·Sut','Punto de referencia alto'],['N = 10⁶','Sf = Se','Límite de fatiga'],['N → ∞','Sf = Se','Para aceros únicamente']].map((r,i)=>(
                <div key={i} style={{ background:'var(--bg-2)', borderRadius:'var(--radius-sm)', padding:'10px 12px', fontFamily:'var(--font-mono)', fontSize:12, textAlign:'center' as const }}>
                  <div style={{ color:'var(--accent)', marginBottom:2 }}>{r[0]}</div>
                  <div style={{ color:'var(--warning)' }}>{r[1]}</div>
                  <div style={{ color:'var(--text-3)', fontSize:10, marginTop:2 }}>{r[2]}</div>
                </div>
              ))}
            </div>

            {/* 6-9 */}
            <SectionTitle id="6-9" title="Factores modificadores de Marin" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>El límite de resistencia real Se de una pieza difiere del valor de laboratorio S'e debido a varios factores que Marin organizó en factores multiplicadores:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, lineHeight: 2 }}>
                <span style={{ color: 'var(--success)' }}>Se</span> = ka · kb · kc · kd · ke · kf · <span style={{ color: 'var(--success)' }}>S'e</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16, textAlign: 'left' as const }}>
                {[
                  { k: 'ka', name: 'Factor superficial', note: 'Pulido=1, maquinado≈0.8, forjado≈0.47' },
                  { k: 'kb', name: 'Factor de tamaño', note: '≤8mm: 1.0; 8-51mm: 1.51d⁻⁰·¹⁵⁷' },
                  { k: 'kc', name: 'Factor de carga', note: 'Flexión=1, Axial=0.85, Torsión=0.59' },
                  { k: 'kd', name: 'Factor de temperatura', note: 'T≤450°C: 1; T>450°C: decrece' },
                  { k: 'ke', name: 'Factor de confiabilidad', note: '90%=0.897, 99%=0.814, 99.9%=0.753' },
                  { k: 'kf', name: 'Factor varios', note: 'Corrosión, platinado, residuales...' },
                ].map(f => (
                  <div key={f.k} style={{ background: 'var(--bg-2)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--warning)', marginRight: 8 }}>{f.k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>{f.name}</span>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{f.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <MarinCalc />

            {/* 6-10 */}
            <SectionTitle id="6-10" title="Concentración de esfuerzo y sensibilidad a la muesca" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>En fatiga, el factor efectivo de concentración de esfuerzo Kf es menor que el teórico Kt, porque los materiales no son completamente sensibles a la muesca. El factor de sensibilidad a la muesca q relaciona ambos:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 2.4 }}>
                <div>K<sub>f</sub> = 1 + q(K<sub>t</sub> − 1) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 16 }}>(Ec. 6-32)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>q = 0 (no sensible) → Kf=1 &nbsp;|&nbsp; q = 1 (totalmente sensible) → Kf=Kt</div>
              </div>
            </div>

            {/* 6-11 */}
            <SectionTitle id="6-11" title="Caracterización de esfuerzos fluctuantes" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div><span style={{ color: 'var(--accent)' }}>σa</span> = (σmáx − σmín) / 2 <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Amplitud)</span></div>
                <div><span style={{ color: 'var(--warning)' }}>σm</span> = (σmáx + σmín) / 2 <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Media)</span></div>
                <div>R = σmín / σmáx <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Razón de esfuerzos)</span></div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>R = −1 (completamente invertido) &nbsp;|&nbsp; R = 0 (pulsante) &nbsp;|&nbsp; R = 1 (estático)</div>
              </div>
            </div>

            {/* 6-12 */}
            <SectionTitle id="6-12" title="Criterios de falla por fatiga" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Los criterios relacionan la amplitud del esfuerzo σa con el esfuerzo medio σm para predecir falla. El criterio de Goodman modificado es el más usado en la práctica de diseño.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', margin: '20px 0', textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: 16 }}>Criterios de falla por fatiga</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.8 }}>
                <div><span style={{ color: 'var(--accent)' }}>Goodman:</span> <span style={{ color: 'var(--accent)' }}>σa</span>/Se + <span style={{ color: 'var(--warning)' }}>σm</span>/Sut = 1/n <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>Conservadora, línea recta</span></div>
                <div><span style={{ color: 'var(--success)' }}>Gerber:</span> (<span style={{ color: 'var(--accent)' }}>σa</span>/Se) + (<span style={{ color: 'var(--warning)' }}>σm</span>/Sut)² = 1/n <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>Parábola, más exacta</span></div>
                <div><span style={{ color: 'var(--warning)' }}>ASME Elíptica:</span> (<span style={{ color: 'var(--accent)' }}>σa</span>/Se)² + (<span style={{ color: 'var(--warning)' }}>σm</span>/Sy)² = 1/n² <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>Combina fatiga y fluencia</span></div>
                <div><span style={{ color: 'var(--danger)' }}>Soderberg:</span> <span style={{ color: 'var(--accent)' }}>σa</span>/Se + <span style={{ color: 'var(--warning)' }}>σm</span>/Sy = 1/n <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>Muy conservadora</span></div>
              </div>
            </div>
            <GoodmanDiagram />

            {/* 6-13 */}
            <SectionTitle id="6-13" title="Resistencia a la fatiga por torsión bajo esfuerzos fluctuantes" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para torsión pura con esfuerzo fluctuante (τa, τm), el límite de resistencia torsional Sse se estima a partir del límite de flexión Se mediante la teoría de la energía de distorsión.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>Sse = 0.577·Se <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(resistencia a la fatiga torsional)</span></div>
                <div>Ssu = 0.67·Sut <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(resistencia última al cortante)</span></div>
                <div>Goodman torsión: τa/Sse + τm/Ssu = 1/n</div>
                <div>Factor Kfs: factor de concentración de esfuerzo torsional a la fatiga</div>
              </div>
            </div>

            {/* 6-14 */}
            <SectionTitle id="6-14" title="Combinaciones de modos de carga" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para combinación de flexión y torsión (ejes), se usa el esfuerzo de von Mises modificado para fatiga. Los esfuerzos amplitudes y medios se combinan por separado:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.4 }}>
                <div>σ'a = √(σa² + 3τa²) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(amplitud equivalente)</span></div>
                <div>σ'm = √(σm² + 3τm²) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(media equivalente)</span></div>
                <div style={{ marginTop: 8 }}>Goodman: σ'a/Se + σ'm/Sut = 1/n</div>
              </div>
            </div>

            {/* 6-15 */}
            <SectionTitle id="6-15" title="Daño por fatiga acumulada (Miner)" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Para cargas de amplitud variable, la regla de Palmgren-Miner predice que la falla ocurre cuando la fracción de ciclos consumidos suma 1.0:</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, lineHeight: 2.4 }}>
                <div>D = Σ(nᵢ / Nᵢ) <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 12 }}>(Regla de Miner)</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Falla cuando D ≥ 1</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>nᵢ = ciclos aplicados al nivel i; Nᵢ = vida a la falla al nivel i</div>
              </div>
            </div>

            {/* 6-16 */}
            <SectionTitle id="6-16" title="Resistencia a la fatiga superficial" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>La <strong>fatiga superficial (pitting)</strong> ocurre en superficies de contacto cíclico (engranes, levas, cojinetes de rodamiento). El esfuerzo de Hertz cíclico genera grietas superficiales que se propagan formando cráteres.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>Resistencia superficial (acero): S_c = 0.4·HB + 10 (kpsi) &emsp; o &emsp; S_c = 2.76·HB − 70 (MPa)</div>
                <div>Criterio: p₀ ≤ S_c / n</div>
                <div>Factor de seguridad por pitting: n_c = S_c / p₀_max</div>
              </div>
            </div>
            <ConceptBlock color="var(--warning)" label="Diferencia entre fatiga volumétrica y superficial" text="La fatiga convencional (flexión, torsión) inicia en discontinuidades superficiales bajo esfuerzo nominal. La fatiga superficial (contact fatigue) inicia por debajo de la superficie al máximo esfuerzo cortante ortogonal (τ_max ≈ 0.3p₀ a z ≈ 0.78b). Son mecanismos distintos con criterios de diseño diferentes." />

            {/* 6-17 */}
            <SectionTitle id="6-17" title="Análisis estocástico de fatiga" />
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>Las resistencias y cargas son variables aleatorias. El análisis estocástico permite estimar la confiabilidad R ante la falla por fatiga usando distribuciones de probabilidad.</p>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 28px', margin: '16px 0', textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.6 }}>
                <div>z = (μ_Se − μ_σa) / √(σ_Se² + σ_σa²)</div>
                <div>P_f = Φ(−z) &emsp; R = 1 − P_f</div>
                <div>C_Se ≈ 0.08–0.10 (coeficiente de variación típico para Se)</div>
                <div>C_σa ≈ 0.10–0.15 (cargas bien definidas)</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, margin:'12px 0' }}>
              {[['ke (Marin)', 'Factor confiabilidad','ke = 1 − 0.08·zα'],['R = 90%','ke = 0.897'],['R = 99%','ke = 0.814'],['R = 99.9%','ke = 0.753']].map((r,i)=>(
                <div key={i} style={{ background:'var(--bg-2)', borderRadius:'var(--radius-sm)', padding:'10px 12px', fontFamily:'var(--font-mono)', fontSize:11, textAlign:'center' as const }}>
                  {r.map((c,j)=><div key={j} style={{ color: j===0?'var(--accent)':j===1?'var(--text-3)':'var(--success)', marginBottom:1 }}>{c}</div>)}
                </div>
              ))}
            </div>

            {/* 6-18 */}
            <SectionTitle id="6-18" title="Resumen de ecuaciones importantes" />
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                {[
                  'Se = ka·kb·kc·kd·ke·kf·S\'e',
                  'S\'e = 0.5·Sut (acero, Sut ≤ 1400 MPa)',
                  'Goodman: σa/Se + σm/Sut = 1/n',
                  'Kf = 1 + q(Kt − 1)',
                  'σa = (σmáx−σmín)/2 ; σm = (σmáx+σmín)/2',
                  'Miner: D = Σ(ni/Ni); falla si D≥1',
                  'von Mises fatiga: σ\'a = √(σa²+3τa²)',
                ].map((eq, i) => (
                  <div key={i} style={{ padding: '8px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{eq}</div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: (isMobile || isTablet) ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: 10,
              marginTop: 48, paddingTop: 28,
              borderTop: '1px solid var(--border-soft)',
            }}>
              <Link href="/capitulo/5" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--bg-2)', color: 'var(--text-1)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
                border: '1px solid var(--border)',
              }}>
                ← Cap. 5: Fallas estáticas
              </Link>
              <Link href="/capitulo/7" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, padding: '12px 24px', minHeight: 44,
                background: 'var(--part-3)', color: 'white',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12.5 : 13,
              }}>
                Cap. 7: Ejes y flechas →
              </Link>
            </div>
            </>
            ) : <PracticaContent />}
          </div>
        </main>
      </div>
    </div>
  )
}
