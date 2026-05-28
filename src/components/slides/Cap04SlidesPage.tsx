'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#3B82F6'

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 4 · Parte 1 — Fundamentos
      </div>
      <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Deflexión<br /><span style={{ color: C }}>y Rigidez</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Integración doble · Castigliano · Pandeo de Euler
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['δ = f(M)', 'Ley de Hooke', 'Castigliano', 'Pandeo', 'Pcr'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Ecuación diferencial ── */
function S2({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Ecuación diferencial de la viga</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Relación entre curvatura y momento flector</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Ecuación exacta de la curva elástica" eq="EI · d²y/dx² = M(x)" color={C} />
          <FormulaBox label="Para carga distribuida w(x)" eq="EI · d⁴y/dx⁴ = w(x)" color="var(--warning)" />
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Proceso de integración:</strong><br />
            1. EI·y'' = M(x)<br />
            2. EI·y' = ∫M dx + C₁ &nbsp;← pendiente<br />
            3. EI·y = ∫∫M dx² + C₁x + C₂ ← deflexión<br />
            4. Aplicar C.C. para hallar C₁, C₂
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Condiciones de contorno comunes</div>
            {[
              { tipo: 'Extremo libre', cond: 'y′′ = 0, y′′′ = 0' },
              { tipo: 'Extremo apoyado', cond: 'y = 0, y′′ = 0' },
              { tipo: 'Extremo empotrado', cond: 'y = 0, y′ = 0' },
            ].map(c => (
              <div key={c.tipo} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{c.tipo}:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: C, marginLeft: 8 }}>{c.cond}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            EI = rigidez a la flexión. Duplicar E o I reduce la deflexión a la mitad. I depende de la geometría (b·h³/12).
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 3 — Formulario de deflexiones ── */
const CASES = [
  { beam: 'Viga S.A. — carga central', delta: 'δmax = PL³/(48EI)', theta: 'θ = PL²/(16EI)', pos: 'Centro' },
  { beam: 'Viga S.A. — carga dist. unif.', delta: 'δmax = 5wL⁴/(384EI)', theta: 'θ = wL³/(24EI)', pos: 'Centro' },
  { beam: 'Cantiléver — carga en extremo', delta: 'δmax = PL³/(3EI)', theta: 'θmax = PL²/(2EI)', pos: 'Extremo libre' },
  { beam: 'Cantiléver — carga dist. unif.', delta: 'δmax = wL⁴/(8EI)', theta: 'θmax = wL³/(6EI)', pos: 'Extremo libre' },
]

function S3({ revealed }: { revealed: number }) {
  return (
    <div>
      <Eyebrow>Formulario de deflexiones</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Casos canónicos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CASES.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.2fr 2fr 1.5fr', gap: 16, padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? C + '50' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', alignItems: 'center', opacity: i < revealed ? 1 : 0.2, transition: 'all 0.35s' }}>
            <div style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{c.beam}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{c.delta}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--warning)' }}>{c.theta}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '2.2fr 2fr 1.5fr', gap: 16, padding: '8px 16px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase' }}>Configuración</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase' }}>Deflexión máxima δ</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase' }}>Pendiente θ</div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Teorema de Castigliano ── */
function S4({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Teorema de Castigliano</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 24 }}>Deflexión a partir de la energía de deformación</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Energía de deformación (flexión)" eq="U = ∫M²/(2EI) dx" color="var(--warning)" />
          <FormulaBox label="Teorema de Castigliano" eq="δᵢ = ∂U/∂Fᵢ" color={C} />
          <FormulaBox label="Formulación directa" eq="δ = ∫[M·(∂M/∂F)/(EI)] dx" color="var(--success)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Ventajas del método</div>
            {[
              'No requiere calcular la curva elástica completa',
              'Válido para estructuras hiperestáticas',
              'Aplica en torsión, axial y flexión: U = ∫T²/(2GJ)dx + ∫F²/(2AE)dx',
              'Para giro: θᵢ = ∂U/∂Mᵢ',
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 12, color: 'var(--text-2)' }}>
                <span style={{ color: C, flexShrink: 0 }}>→</span> {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Calculadora de deflexión ── */
function S5({ revealed }: { revealed: number }) {
  const [P, setP] = useState(10)
  const [L, setL] = useState(1.5)
  const [E, setE] = useState(207)
  const [b, setB] = useState(40)
  const [h, setH] = useState(60)
  const I = (b * h ** 3) / 12  // mm⁴
  const Empa = E * 1000         // MPa → kN/mm² → usando kN y mm
  const delta = (P * (L * 1000) ** 3) / (48 * E * 1000 * I)  // mm (P en kN, L en mm, E en GPa→kN/mm², I en mm⁴)
  const delta_mm = delta.toFixed(3)
  const sigmaMax = (P * 1000 * (L * 1000 / 4) * (h / 2)) / I  // MPa
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <Eyebrow>Calculadora — viga simplemente apoyada</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>Carga central: δmax = PL³ / (48EI)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Slider label="P — Carga" unit="kN" value={P} min={1} max={100} onChange={setP} color="var(--danger)" />
          <Slider label="L — Longitud" unit="m" value={L} min={0.5} max={5} step={0.1} onChange={setL} color={C} />
          <Slider label="E — Módulo" unit="GPa" value={E} min={50} max={300} onChange={setE} color="var(--warning)" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Slider label="b [mm]" unit="" value={b} min={10} max={200} onChange={setB} color="var(--success)" />
            <Slider label="h [mm]" unit="" value={h} min={10} max={300} onChange={setH} color="var(--success)" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ResultCard label="δmax [mm]" value={delta_mm} color={C} />
          <ResultCard label="σmax = Mc/I [MPa]" value={sigmaMax.toFixed(1)} color="var(--danger)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.7 }}>
            I = b·h³/12 = {I.toFixed(0)} mm⁴<br />
            M_max = PL/4 = {(P * L / 4).toFixed(2)} kN·m<br />
            c = h/2 = {(h / 2).toFixed(0)} mm
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Pandeo de Euler ── */
function S6({ revealed }: { revealed: number }) {
  const [L, setL] = useState(2)
  const [E, setE] = useState(207)
  const [d, setD] = useState(40)
  const I = Math.PI * d ** 4 / 64
  const K = 1.0  // pin-pin
  const Pcr = (Math.PI ** 2 * E * 1000 * I) / ((K * L * 1000) ** 2) / 1000  // kN
  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Pandeo de columnas</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>Carga crítica de Euler</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Carga crítica de Euler" eq="Pcr = π²EI / (KL)²" color={C} />
          <div style={{ padding: '12px 16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Factor de longitud efectiva K</div>
            {[['Pin-Pin', '1.0'], ['Fijo-Libre', '2.0'], ['Fijo-Fijo', '0.5'], ['Fijo-Pin', '0.7']].map(([c, k]) => (
              <div key={c} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border-soft)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{c}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: C }}>K = {k}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Slider label="L — Longitud libre" unit="m" value={L} min={0.5} max={6} step={0.1} onChange={setL} color={C} />
          <Slider label="d — Diámetro (circular)" unit="mm" value={d} min={10} max={120} onChange={setD} color="var(--warning)" />
          <ResultCard label="Pcr — Carga crítica (K=1)" value={`${Pcr.toFixed(1)} kN`} color={Pcr > 50 ? 'var(--success)' : 'var(--danger)'} />
          <div style={{ padding: '10px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>
            I = πd⁴/64 = {I.toFixed(0)} mm⁴<br />
            Válido solo para columnas esbeltas: KL/r &gt; 100
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Ejemplo resuelto ── */
const EX_STEPS = [
  { label: 'Datos', val: 'P=5kN, L=2m, sección IPE: I=404cm⁴, E=207GPa' },
  { label: 'Deflexión', val: 'δ = 5·10³·(2000)³/(48·207·10³·404·10⁴) = 1.00 mm' },
  { label: 'Pendiente', val: 'θ = PL²/(16EI) = 0.001 rad = 0.057°' },
  { label: 'Verificación', val: 'δ/L = 1.00/2000 = 1/2000 ✓ (límite L/300)' },
]

function S7({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <Badge color={C}>Ejemplo 4-3</Badge>
        <Badge color="var(--warning)">Viga S.A.</Badge>
      </div>
      <h2 style={{ ...H2, marginBottom: 16 }}>Deflexión en viga de acero con carga central</h2>
      <div style={{ padding: '14px 20px', background: 'var(--bg-2)', borderLeft: `3px solid ${C}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: 20, fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
        Viga simplemente apoyada, longitud L = 2 m, carga central P = 5 kN. Perfil IPE: I = 404 cm⁴, E = 207 GPa. Hallar deflexión máxima y verificar límite L/300.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {EX_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? 'var(--success)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.2, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', minWidth: 80, paddingTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS = [
  'La ecuación EI·y″ = M(x) es la base de todos los métodos de deflexión',
  'El método de Castigliano es el más versátil: aplica a estructuras complejas e isostáticas',
  'Aumentar I (no E) es la forma práctica de reducir deflexión: I ∝ h³',
  'Pandeo de Euler: Pcr ∝ 1/L² — duplicar la longitud reduce Pcr en 4×',
  'El factor K de longitud efectiva depende completamente de las condiciones de apoyo',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, animation: 'fadeIn 0.4s ease both', animationDelay: `${i * 0.08}s` }}>
            <span style={{ color: 'var(--success)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.45 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Conectar: ya sabemos calcular esfuerzos (cap 3). Ahora necesitamos saber si la estructura se deforma demasiado, incluso antes de fallar.', Content: S1 },
  { id: 2, title: 'Ecuación diferencial', note: 'Mostrar en pizarrón cómo EI·y″=M(x) viene de la relación curvatura-momento. La doble integral física: primero la pendiente, luego la deflexión.', Content: S2 },
  { id: 3, title: 'Formulario', revealCount: 4, note: 'Estos casos se pueden combinar por superposición. El libro tiene tablas extensas. No memorizar: saber dónde buscar y verificar unidades.', Content: S3 },
  { id: 4, title: 'Castigliano', note: 'Castigliano es especialmente útil en estructuras con múltiples cargas donde la integración directa sería tediosa. Equivalente energético del método de secciones.', Content: S4 },
  { id: 5, title: 'Calculadora deflexión', note: 'Demostrar: duplicar h reduce δ en 8× (I ∝ h³). Cambiar E de acero a aluminio solo reduce δ en 3×. La geometría domina.', Content: S5 },
  { id: 6, title: 'Pandeo de Euler', note: 'Preguntar: ¿por qué un eje largo y delgado falla por pandeo antes de alcanzar Sy? El pandeo es inestabilidad, no resistencia.', Content: S6 },
  { id: 7, title: 'Ejemplo 4-3', revealCount: 4, note: 'Verificar siempre con el límite de deflexión. En estructuras: L/300 normal, L/500 sensitivo a deflexión, L/1000 precisión.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 4-7 a 4-12. Próxima clase: teorías de falla — ¿cuándo falla un material dúctil vs frágil?', Content: S8 },
]

export default function Cap04SlidesPage() {
  return <PresentationShell chapterId={4} partColor={C} slides={SLIDES} />
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color, fontWeight: 600 }}>{eq}</div>
    </div>
  )
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: '14px 18px', background: `${color}10`, border: `1px solid ${color}50`, borderRadius: 'var(--radius-sm)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color }}>{value}</div>
    </div>
  )
}

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return <span style={{ padding: '4px 12px', borderRadius: 999, background: `${color}18`, color, fontSize: 12, fontFamily: 'var(--font-mono)', border: `1px solid ${color}40` }}>{children}</span>
}

function Slider({ label, unit, value, min, max, step = 1, onChange, color }: {
  label: string; unit: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; color: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 5 }}>
        <span>{label}</span>
        <span style={{ color }}>{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} style={{ width: '100%', accentColor: color }} />
    </div>
  )
}
