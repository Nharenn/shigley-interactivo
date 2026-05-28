'use client'
import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#A78BFA'

function S1({ revealed }: { revealed: number }) {
  void revealed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      <Eyebrow>Parte 4 — Herramientas de análisis</Eyebrow>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
        Análisis de Elementos<br />Finitos (FEA)
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 19 — Fundamentos, formulación y aplicaciones</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['k = AE/L', '[K]{u}={F}', 'Meshing', 'Térmico', 'Pandeo', 'Vibración'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  const concepts = [
    { label: 'Discretización', desc: 'El dominio continuo se divide en elementos finitos conectados en nodos' },
    { label: 'Función de forma', desc: 'Interpolación del campo (u, T...) dentro del elemento desde los nodos' },
    { label: 'Ensamble global', desc: '[K_global]{u} = {F} — suma de matrices elementales (superposición)' },
    { label: 'Condiciones de borde', desc: 'Desplazamientos impuestos (Dirichlet) o fuerzas aplicadas (Neumann)' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Conceptos fundamentales</Eyebrow>
      <h2 style={H2}>El método FEA en 4 pasos</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {concepts.map((c, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 10, padding: '14px 18px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontWeight: 700, fontSize: 14 }}>{c.label}</div>
            <div style={{ fontSize: 14, color: 'var(--fg-2)' }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  void revealed
  const [A, setA] = useState(100)
  const [E, setE] = useState(200e9)
  const [L, setL] = useState(0.5)
  const [F, setF] = useState(10000)
  const k = (A * 1e-6 * E) / L
  const delta = F / k
  const sigma = F / (A * 1e-6)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Elemento barra — rigidez axial</Eyebrow>
      <h2 style={H2}>k = AE/L → [K]·{'{'}u{'}'} = {'{'}F{'}'}</h2>
      <div style={{ background: 'var(--bg-1)', borderRadius: 10, padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-2)', marginBottom: 8 }}>
        <div style={{ color: C, fontWeight: 700, marginBottom: 8 }}>Matriz de rigidez elemental (barra axial)</div>
        <div>[k] = (AE/L) × [[ 1, -1], [-1,  1]]</div>
        <div style={{ marginTop: 8 }}>Nodo 1: u₁, F₁ | Nodo 2: u₂, F₂</div>
        <div>F₁ = k(u₁−u₂), F₂ = k(u₂−u₁)</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="A área" unit="mm²" value={A} min={10} max={1000} step={10} onChange={setA} color={C} />
          <Slider label="E módulo" unit="GPa" value={E / 1e9} min={70} max={300} step={5} onChange={v => setE(v * 1e9)} color={C} />
          <Slider label="L longitud" unit="m" value={L} min={0.1} max={2.0} step={0.05} onChange={setL} color={C} />
          <Slider label="F fuerza" unit="N" value={F} min={1000} max={100000} step={1000} onChange={setF} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="k rigidez" eq={`${(k / 1e6).toFixed(2)} MN/m`} color={C} />
          <FormulaBox label="δ desplaz." eq={`${(delta * 1000).toFixed(4)} mm`} color={C} />
          <FormulaBox label="σ esfuerzo" eq={`${(sigma / 1e6).toFixed(1)} MPa`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Barra (truss)', dof: '1 DOF/nodo', use: 'Armaduras, cables', note: 'Solo carga axial' },
    { name: 'Viga (beam)', dof: '3 DOF/nodo', use: 'Estructuras flexurales', note: 'M, V, axial' },
    { name: 'Plano (quad/tri)', dof: '2 DOF/nodo', use: 'Placas, análisis 2D', note: 'CPS4, CPE4 (ABAQUS)' },
    { name: 'Sólido (hex/tet)', dof: '3 DOF/nodo', use: 'Piezas 3D', note: 'C3D8, C3D4' },
    { name: 'Cáscara (shell)', dof: '5-6 DOF/nodo', use: 'Chapa delgada', note: 'S4R (ABAQUS)' },
    { name: 'Axisimétrico', dof: '2 DOF/nodo', use: 'Geometría axial', note: 'CAX4 — eficiencia 3D→2D' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Tipos de elementos</Eyebrow>
      <h2 style={H2}>Biblioteca de elementos FEA</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        {types.map((t, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '8px 14px', display: 'grid', gridTemplateColumns: '110px 80px 1fr 1fr', gap: 12, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{t.dof}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-1)' }}>{t.use}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{t.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  const rules = [
    { rule: 'Compatibilidad de malla', desc: 'Los nodos deben coincidir en interfaz — evitar "T-connections" sin nodo compartido' },
    { rule: 'Relación de aspecto', desc: 'Cuad: L_max/L_min ≤ 5; Hex: evitar celdas muy deformadas (skewness < 0.85)' },
    { rule: 'Convergencia', desc: 'Refinar hasta que el resultado cambie < 5% al duplicar elementos en zona crítica' },
    { rule: 'Singularidades', desc: 'Esquinas vivas → esfuerzo → ∞; usar radio de filete real o ignorar zona local' },
    { rule: 'Verificación', desc: 'Comparar suma de reacciones con cargas aplicadas (equilibrio nodal)' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Calidad de malla</Eyebrow>
      <h2 style={H2}>Reglas de meshing</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {rules.map((r, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', borderLeft: `3px solid ${C}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{r.rule}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  const analyses = [
    { type: 'Térmico', eq: 'ε_T = α·ΔT → σ = E·(ε−ε_T)', note: 'Coeficiente de dilatación α, ΔT temperatura' },
    { type: 'Pandeo lineal', eq: '[K − λ·Kσ]{u} = {0}', note: 'Carga crítica P_cr = λ·P_aplicada' },
    { type: 'Vibración libre', eq: '[K − ω²·M]{Φ} = {0}', note: 'Frecuencias naturales ω y modos Φ' },
    { type: 'Dinámico transiente', eq: '[M]{ü} + [C]{u̇} + [K]{u} = {F(t)}', note: 'Respuesta al tiempo; integración HHT-α' },
    { type: 'Contacto', eq: 'Fuerzas de contacto ≥ 0', note: 'No lineal — iteraciones Newton-Raphson' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Análisis especiales</Eyebrow>
      <h2 style={H2}>Más allá del análisis estático lineal</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {analyses.map((a, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px', display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: 12, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontWeight: 700, fontSize: 12 }}>{a.type}</div>
            <code style={{ fontSize: 12, color: 'var(--fg-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.eq}</code>
            <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{a.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const [nelems, setNelems] = useState(10)
  const sigma_ref = 100
  const sigma_coarse = sigma_ref * (1 - 0.3 * Math.exp(-nelems / 5))
  const error = Math.abs(sigma_ref - sigma_coarse) / sigma_ref * 100
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Convergencia y verificación</Eyebrow>
      <h2 style={H2}>Estudio de convergencia de malla</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 13, margin: 0 }}>El esfuerzo converge hacia el valor exacto al refinar — el costo computacional sube exponencialmente</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Slider label="Nº elementos" unit="" value={nelems} min={2} max={100} step={2} onChange={setNelems} color={C} />
          <div style={{ background: 'var(--bg-1)', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'var(--fg-2)' }}>
            <div style={{ color: C, fontWeight: 600, marginBottom: 6 }}>Criterio de convergencia</div>
            <div>σ converge en O(h²) para elementos lineales</div>
            <div style={{ marginTop: 4 }}>σ converge en O(h⁴) para cuadráticos</div>
            <div style={{ marginTop: 4 }}>Detener cuando Δσ/σ &lt; 5% al duplicar malla</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="σ estimado" eq={`${sigma_coarse.toFixed(2)} MPa`} color={C} />
          <FormulaBox label="Error vs ref." eq={`${error.toFixed(1)}%`} color={C} />
          <div style={{ background: error < 5 ? '#10B98122' : error < 15 ? '#F59E0B22' : '#EF444422', border: `1px solid ${error < 5 ? '#10B981' : error < 15 ? '#F59E0B' : '#EF4444'}`, borderRadius: 8, padding: '10px 14px', textAlign: 'center', fontSize: 13 }}>
            {error < 5 ? '✓ Error < 5% — malla convergida' : error < 15 ? '⚠ Refinar malla recomendable' : '✗ Malla muy gruesa — resultados no confiables'}
          </div>
        </div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'FEA convierte un PDE continuo en un sistema lineal [K]{u}={F} via discretización nodal',
    'La rigidez axial elemental k=AE/L es el bloque básico — ensamble global por superposición',
    'Tipos de elementos: barra, viga, plano, sólido, cáscara — elegir según geometría y respuesta buscada',
    'Convergencia requiere refinado progresivo hasta Δσ/σ < 5% — no creer en el primer resultado',
    'Singularidades en esquinas vivas: el esfuerzo teóricamente diverge — usar radio de filete real',
    'FEA es herramienta, no oráculo: resultados incorrectos con malla incorrecta o condiciones de borde erróneas',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 19</Eyebrow>
      <h2 style={H2}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pts.map((p, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 14 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Cap 19: FEA es la herramienta de análisis más poderosa del ingeniero moderno — y la más mal usada.', Content: S1 },
  { id: 2, title: 'Conceptos FEA', note: 'El concepto de función de forma es lo que distingue FEA de diferencias finitas.', revealCount: 4, Content: S2 },
  { id: 3, title: 'Elemento barra k=AE/L', note: 'Variar A y L: mostrar que k ∝ A/L — intuición de rigidez axial.', Content: S3 },
  { id: 4, title: 'Tipos de elementos', note: 'Para la mayoría de piezas mecánicas usar sólido hex (C3D8R en ABAQUS).', revealCount: 6, Content: S4 },
  { id: 5, title: 'Reglas de meshing', note: 'El punto de la singularidad es el más importante — muchos reportes mal interpretados por esto.', revealCount: 5, Content: S5 },
  { id: 6, title: 'Análisis especiales', note: 'Pandeo y vibración comparten la misma estructura de valor propio — elegante.', revealCount: 5, Content: S6 },
  { id: 7, title: 'Convergencia', note: 'Demostrar en vivo: de 2 a 50 elementos la solución converge visiblemente.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'El punto 6 es la filosofía: FEA amplifica errores conceptuales del ingeniero.', revealCount: 6, Content: S8 },
]

export default function Cap19SlidesPage() {
  return <PresentationShell chapterId={19} partColor={C} slides={SLIDES} />
}

/* ─── Helpers ─── */
const H2: React.CSSProperties = { fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: '-0.025em', fontFamily: 'var(--font-mono)', marginBottom: 0, marginTop: 0, lineHeight: 1.15 }

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>// {children}</div>
}

function FormulaBox({ label, eq, color }: { label: string; eq: string; color: string }) {
  return (
    <div style={{ background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 8, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color }}>{eq}</span>
    </div>
  )
}

function Slider({ label, unit, value, min, max, step, onChange, color }: { label: string; unit: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color }}>{value}{unit ? ` ${unit}` : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: color, width: '100%' }} />
    </div>
  )
}
