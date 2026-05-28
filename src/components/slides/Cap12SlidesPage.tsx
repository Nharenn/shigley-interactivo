'use client'

import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'  /* part-3 green */

/* ── Slide 1 — Título ── */
function S1({ revealed }: { revealed: number }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: C, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
        Capítulo 12 · Parte 3 — Elementos mecánicos
      </div>
      <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18, fontFamily: 'var(--font-mono)' }}>
        Cojinetes de<br /><span style={{ color: C }}>Contacto Deslizante</span>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.6 }}>
        Lubricación hidrodinámica · Petroff · Sommerfeld · Diseño de chumaceras
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        {['μ', 'S', 'f', 'r/c', 'h₀', 'ZN/P'].map(t => (
          <span key={t} style={{ padding: '6px 18px', borderRadius: 999, background: `${C}12`, border: `1px solid ${C}40`, fontFamily: 'var(--font-mono)', fontSize: 13, color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 2 — Tipos de lubricación ── */
function S2({ revealed }: { revealed: number }) {
  const types = [
    { name: 'Hidrodinámica (película gruesa)', desc: 'La velocidad del muñón bombea lubricante a la cuña convergente. Superficies completamente separadas. No requiere presión externa.', color: C },
    { name: 'Hidrostática', desc: 'Lubricante suministrado a presión externa. Funciona a velocidad cero. Mayor costo.', color: 'var(--accent)' },
    { name: 'Elastohidrodinámica (EHD)', desc: 'Contacto rodante (engranes, rodamientos). Combina deformación Hertz + mecánica de fluidos.', color: 'var(--warning)' },
    { name: 'Límite', desc: 'Película de pocas moléculas. La química del lubricante es crítica.', color: 'var(--danger)' },
    { name: 'Película sólida', desc: 'Grafito, MoS₂. Para temperaturas extremas donde los aceites no sirven.', color: C },
  ]
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Eyebrow>Cinco regímenes de lubricación</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>El régimen determina cómo se separan las superficies</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {types.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'var(--bg-2)', borderLeft: `3px solid ${t.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', opacity: i < revealed ? 1 : 0.2, transition: 'opacity 0.35s' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: t.color, marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 3 — Viscosidad ── */
function S3({ revealed }: { revealed: number }) {
  const saeData = [
    ['10W', '28–35', '4.1', 'Motores en frío'],
    ['30', '90–110', '9.3–12.5', 'Motores'],
    ['40', '130–160', '12.5–16.3', 'Engranes industria'],
    ['90', '165–200', '14–18', 'Transmisiones'],
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Viscosidad — propiedad fundamental del lubricante</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>τ = μ · (du/dy) — Ley de viscosidad de Newton</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Viscosidad dinámica" eq="τ = μ · (du/dy)  [Pa·s]" color={C} />
          <FormulaBox label="Conversiones clave" eq="1 reyn = 6.89×10⁶ μPa·s  |  1 cP = 10⁻³ Pa·s" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Viscosidad cinemática:</strong><br />
            ν = μ/ρ  [m²/s = cSt × 10⁻⁶]<br />
            <strong style={{ color: 'var(--text-1)' }}>Saybolt → SI:</strong><br />
            ν = (0.22t − 180/t) × 10⁻⁶ m²/s
          </div>
        </div>
        <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 10 }}>Grados SAE</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr>
                {['SAE', 'ν@40°C', 'ν@100°C', 'Uso'].map(h => (
                  <th key={h} style={{ padding: '4px 6px', textAlign: 'left', color: C, fontFamily: 'var(--font-mono)', borderBottom: `1px solid ${C}50` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {saeData.map(([sae, v40, v100, app], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '5px 6px', fontFamily: 'var(--font-mono)', color: C }}>{sae}</td>
                  <td style={{ padding: '5px 6px', fontFamily: 'var(--font-mono)', color: 'var(--text-2)', fontSize: 10 }}>{v40}</td>
                  <td style={{ padding: '5px 6px', fontFamily: 'var(--font-mono)', color: 'var(--text-2)', fontSize: 10 }}>{v100}</td>
                  <td style={{ padding: '5px 6px', color: 'var(--text-3)', fontSize: 10 }}>{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <svg viewBox="0 0 240 120" width="100%">
              <line x1="20" y1="100" x2="230" y2="100" stroke="var(--text-3)" strokeWidth="1" />
              <line x1="20" y1="100" x2="20" y2="15" stroke="var(--text-3)" strokeWidth="1" />
              <text x="125" y="114" fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">T (°C)</text>
              <text x="10" y="60" fontSize="7" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,10,60)">ν log</text>
              <path d="M 20,25 C 60,32 100,45 140,60 C 180,75 210,85 230,92" fill="none" stroke={C} strokeWidth="2" />
              <path d="M 20,40 C 60,46 100,58 140,70 C 180,82 210,90 230,95" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <path d="M 20,55 C 60,60 100,70 140,80 C 180,88 210,94 230,97" fill="none" stroke="var(--warning)" strokeWidth="2" />
              <text x="232" y="91" fontSize="7" fill={C} fontFamily="monospace">SAE 40</text>
              <text x="232" y="94" fontSize="7" fill="var(--accent)" fontFamily="monospace">SAE 30</text>
              <text x="232" y="97" fontSize="7" fill="var(--warning)" fontFamily="monospace">SAE 10W</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 4 — Ecuación de Petroff ── */
function S4({ revealed }: { revealed: number }) {
  const [muReyn, setMuReyn] = useState(2.7)
  const [N_rps, setN_rps] = useState(20)
  const [P_psi, setP_psi] = useState(200)
  const [rc, setRc] = useState(500)

  const mu = muReyn * 1e-6
  const f = 2 * Math.PI ** 2 * (mu * N_rps / P_psi) * rc
  const S = rc ** 2 * (mu * N_rps / P_psi)
  const stable = mu * N_rps / P_psi >= 1.7e-6

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Eyebrow>Ecuación de Petroff — base analítica del diseño</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>f = 2π²·(μN/P)·(r/c) — muñón concéntrico, carga leve</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <FormulaBox label="Coeficiente de fricción (Petroff)" eq="f = 2π²·(μN/P)·(r/c)" color={C} />
          <FormulaBox label="Número de Sommerfeld" eq="S = (r/c)²·μN/P  [adimensional]" color="var(--accent)" />
          <Slider label="μ — Viscosidad (μreyn)" unit="" value={muReyn} min={0.5} max={20} step={0.1} onChange={setMuReyn} color={C} />
          <Slider label="N — Velocidad (rps)" unit="" value={N_rps} min={1} max={100} step={1} onChange={setN_rps} color="var(--accent)" />
          <Slider label="P — Presión (psi)" unit="" value={P_psi} min={10} max={2000} step={10} onChange={setP_psi} color="var(--warning)" />
          <Slider label="r/c — Relación holgura" unit="" value={rc} min={100} max={2000} step={50} onChange={setRc} color="var(--danger)" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '16px', background: `${C}10`, border: `1px solid ${C}60`, borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>f — Coef. fricción</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: C }}>{f.toExponential(3)}</div>
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 4 }}>S — Sommerfeld</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>{S.toFixed(4)}</div>
          </div>
          <div style={{ padding: '12px 14px', background: stable ? `${C}10` : '#EF444415', border: `1px solid ${stable ? C : '#EF4444'}50`, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <div style={{ color: stable ? C : '#EF4444' }}>{stable ? '✓ Película gruesa estable' : '⚠ Revisar condición'}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>μN/P ≥ 1.7×10⁻⁶ para estabilidad</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 5 — Curva de McKee ── */
function S5({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Lubricación estable — curva de McKee</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 20 }}>μN/P ≥ 1.7×10⁻⁶ → zona estable de película gruesa</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        <div style={{ padding: '16px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Curva f vs ZN/P (esquemática)</div>
          <svg viewBox="0 0 300 200" width="100%">
            <line x1="40" y1="10" x2="40" y2="175" stroke="var(--text-3)" strokeWidth="1" />
            <line x1="40" y1="175" x2="280" y2="175" stroke="var(--text-3)" strokeWidth="1" />
            <text x="8" y="14" fontSize="9" fill="var(--text-2)" fontFamily="monospace">f</text>
            <text x="155" y="192" fontSize="9" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">ZN/P</text>
            <path d="M 40,50 C 60,65 75,100 95,135 L 115,158" fill="none" stroke="#EF4444" strokeWidth="2.5" />
            <path d="M 115,158 C 135,150 155,138 185,122 L 220,106 L 265,90" fill="none" stroke={C} strokeWidth="2.5" />
            <circle cx="115" cy="158" r="5" fill="var(--warning)" />
            <line x1="115" y1="10" x2="115" y2="175" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="45" y="38" fontSize="9" fill="#EF4444" fontFamily="monospace">Inestable</text>
            <text x="185" y="82" fontSize="9" fill={C} fontFamily="monospace">Estable</text>
            <text x="118" y="22" fontSize="8" fill="var(--warning)" fontFamily="monospace">Punto crítico</text>
            <text x="118" y="33" fontSize="8" fill="var(--warning)" fontFamily="monospace">ZN/P ≈ 30–150</text>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Condición de estabilidad" eq="μN/P ≥ 1.7×10⁻⁶" color={C} />
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text-1)' }}>Zona estable (derecha):</strong><br />
            μ↓ → f↓ → menos calor → autocorrección<br /><br />
            <strong style={{ color: 'var(--text-1)' }}>Zona inestable (izquierda):</strong><br />
            μ↓ → f↑ → más calor → colapso
          </div>
          <FormulaBox label="Relación Petroff-Sommerfeld" eq="f·(r/c) = 2π²·S" color="var(--accent)" />
        </div>
      </div>
    </div>
  )
}

/* ── Slide 6 — Geometría chumacera ── */
function S6({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Geometría del cojinete de muñón</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>h₀ = c·(1 − ε) — espesor mínimo de película</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { sym: 'r', desc: 'Radio del muñón', note: 'Dimensión primaria' },
            { sym: 'c = R−r', desc: 'Holgura radial', note: 'c/r típico: 0.001–0.002' },
            { sym: 'l', desc: 'Longitud cojinete', note: 'l/d óptimo: 0.5–1.0' },
            { sym: 'e', desc: 'Excentricidad muñón', note: '0 ≤ e ≤ c' },
            { sym: 'ε = e/c', desc: 'Razón excentricidad', note: 'ε→1: película colapsa' },
            { sym: 'h₀ = c(1−ε)', desc: 'Espesor mínimo', note: 'h₀ ≥ 0.5·Ra₁+Ra₂' },
          ].map((v, i) => (
            <div key={i} style={{ padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: C, marginBottom: 2 }}>{v.sym}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{v.desc}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{v.note}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FormulaBox label="Sommerfeld — parámetro universal" eq="S = (r/c)²·μN/P" color={C} />
          <FormulaBox label="Presión proyectada" eq="P = W / (l · d)" color="var(--accent)" />
          <div style={{ padding: '12px 14px', background: `${C}08`, border: `1px solid ${C}30`, borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
            <strong style={{ color: C }}>Rangos de diseño (l/d ≈ 1):</strong><br />
            S recomendado: 0.05–0.5<br />
            P: 0.1–3.5 MPa<br />
            T aceite: 70–90 °C
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Slide 7 — Proceso iterativo ── */
function S7({ revealed }: { revealed: number }) {
  const steps = [
    { label: 'P = W/(l·d)', text: 'Calcular presión proyectada. Verificar rango 0.1–3.5 MPa.' },
    { label: 'Elegir lubricante y T → μ', text: 'SAE 30 típico para 70–90°C. Tablas viscosidad vs temperatura.' },
    { label: 'S = (r/c)²·μN/P', text: 'Número de Sommerfeld. Objetivo: S ≈ 0.05–0.5 para l/d = 1.' },
    { label: 'Tablas Raimondi-Boyd', text: 'Obtener ε, f·r/c, Q/rcNl, Qs/Q, ΔT.' },
    { label: 'Verificar T_eq = T_entrada + ΔT', text: 'Si no converge → cambiar lubricante o dimensiones e iterar.' },
    { label: 'Verificar h₀ ≥ 0.5·Ra', text: 'h₀ = c(1−ε). Si falla → aumentar c o mejorar acabado superficial.' },
  ]
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Eyebrow>Proceso de diseño iterativo — 6 pasos</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 22 }}>La iteración converge en 2–3 ciclos típicamente</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--bg-2)', border: `1px solid ${i < revealed ? C + '50' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', opacity: i < revealed ? 1 : 0.25, transition: 'all 0.35s' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: C, flexShrink: 0, width: 24 }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: C, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Slide 8 — Puntos clave ── */
const KEY_POINTS_12 = [
  'Lubricación hidrodinámica requiere velocidad — la película colapsa al arranque/parada',
  'Ecuación de Petroff: f = 2π²·(μN/P)·(r/c) — válida para muñón concéntrico (sin carga)',
  'Número de Sommerfeld S = (r/c)²·μN/P — parámetro universal que resume la operación',
  'Condición de película gruesa estable: μN/P ≥ 1.7×10⁻⁶ (zona derecha de la curva McKee)',
  'Diseño iterativo: elegir lubricante → calcular S → tablas Raimondi-Boyd → verificar temperatura',
  'Balance térmico: calor generado = calor disipado → la viscosidad de operación depende de T_eq',
  'Holgura c/r = 0.001–0.002: muy cerrado → sobrecalienta, muy abierto → vibración',
  'Cojinetes hidrostáticos: funcionan a N=0 con bomba externa — solución para arranque/parada',
  'Babbitt sobre acero: capa delgada de aleación blanda sobre respaldo estructural',
  'Peldaños Kingsbury: pivote inclinable genera cuña hidrodinámica axial',
  'Lubricación límite: arranque y parada = contacto metal-metal, aditivos EP protegen',
]

function S8({ revealed }: { revealed: number }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Eyebrow>Resumen del capítulo</Eyebrow>
      <h2 style={{ ...H2, marginBottom: 32, color: 'var(--success)' }}>Puntos clave</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {KEY_POINTS_12.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10 }}>
            <span style={{ color: 'var(--success)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.45 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'A diferencia de los rodamientos (cap. 11) que se seleccionan de catálogo, las chumaceras de muñón se diseñan con criterios analíticos. La velocidad relativa genera la presión hidrodinámica.', Content: S1 },
  { id: 2, title: 'Tipos de lubricación', revealCount: 5, note: 'La mayoría de los fallos ocurren al arranque y parada, cuando no hay velocidad suficiente para la película hidrodinámica. Los cojinetes hidrostáticos resuelven esto con presión externa.', Content: S2 },
  { id: 3, title: 'Viscosidad', note: 'La viscosidad decrece fuertemente con la temperatura. El equilibrio térmico es lo que fija las condiciones reales de operación — no se puede diseñar sin conocer la temperatura de operación.', Content: S3 },
  { id: 4, title: 'Ecuación de Petroff', note: 'Petroff asumió posición concéntrica (sin carga). La solución real de Raimondi-Boyd es más precisa, pero Petroff da la escala correcta. Demostrar: doblar r/c cuadruplica S.', Content: S4 },
  { id: 5, title: 'Lubricación estable', note: 'El punto mínimo de la curva McKee es la zona más peligrosa. Diseñar a la derecha garantiza que perturbaciones térmicas se autocompensen en lugar de escalar.', Content: S5 },
  { id: 6, title: 'Geometría chumacera', note: 'La relación r/c es el parámetro geométrico más importante. Típico: 500–1000. Valor muy alto → difícil de montar y problemas térmicos por calor generado por fricción.', Content: S6 },
  { id: 7, title: 'Proceso de diseño', revealCount: 6, note: 'Error más común: olvidar verificar la temperatura de equilibrio. La viscosidad cambia con T, por lo que el diseño que pasa a 25°C puede fallar a 90°C de operación.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Asignar: problemas 12-1 a 12-12 de Shigley. Próxima clase: engranes — nomenclatura y geometría (cap. 13).', Content: S8 },
]

export default function Cap12SlidesPage() {
  return <PresentationShell chapterId={12} partColor={C} slides={SLIDES} />
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
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color, fontWeight: 600, lineHeight: 1.4 }}>{eq}</div>
    </div>
  )
}

function Slider({ label, unit, value, min, max, step = 1, onChange, color }: {
  label: string; unit: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; color: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginBottom: 5 }}>
        <span>{label}</span>
        <span style={{ color }}>{value}{unit ? ' ' + unit : ''}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} style={{ width: '100%', accentColor: color }} />
    </div>
  )
}
