'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'

const C = 'var(--part-3)'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-2xl font-bold mt-10 mb-4 scroll-mt-24" style={{ color: C }}>{children}</h2>
}
function FormulaBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 p-4 rounded-xl border-l-4 bg-green-50 border-green-400 font-mono text-sm overflow-x-auto">{children}</div>
}
function ConceptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
      <div className="font-semibold text-gray-700 mb-2">{title}</div>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function OjoAqui({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 p-4 rounded-xl border-l-4 border-amber-400 bg-amber-50">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-amber-600 font-bold text-sm">⚠ Ojo aquí — Error frecuente</span>
      </div>
      <div className="text-amber-800 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function BearingLifeCalculator() {
  const [FD, setFD] = useState(4000)
  const [nD, setND] = useState(1725)
  const [lifeD, setLifeD] = useState(5000)
  const [bearingType, setBearingType] = useState('ball')
  const [Fr, setFr] = useState(3000)
  const [Fa, setFa] = useState(500)
  const [V, setV] = useState(1)
  const [X, setX] = useState(0.56)
  const [Y, setY] = useState(1.5)
  const [reliability, setReliability] = useState(90)

  const a = bearingType === 'ball' ? 3 : 10 / 3
  const LR = 1e6
  const LD = lifeD * nD * 60
  const C10 = FD * Math.pow(LD / LR, 1 / a)

  const a1Table: Record<number, number> = { 90: 1.00, 95: 0.62, 96: 0.53, 97: 0.44, 98: 0.33, 99: 0.21 }
  const a1 = a1Table[reliability] ?? 1.0
  const C10_adj = C10 / Math.pow(a1, 1 / a)

  const Pe = V * Fr > Fa / 0.35 ? Fr : X * V * Fr + Y * Fa
  const CP_ratio = C10 / (Pe || 1)
  const L10_rev_est = Math.pow(Math.max(CP_ratio, 0.1), a) * 1e6

  return (
    <div className="my-6 p-5 rounded-2xl border-2 border-green-300 bg-green-50">
      <h4 className="font-bold text-green-700 mb-4 text-lg">BearingLifeCalculator — Selección de Cojinete (C₁₀)</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">FD – Carga deseada (N)</label>
          <input type="range" min={100} max={30000} step={100} value={FD} onChange={e => setFD(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{FD} N</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">n – Velocidad (rpm)</label>
          <input type="range" min={100} max={6000} step={50} value={nD} onChange={e => setND(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{nD} rpm</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Vida deseada (h)</label>
          <input type="range" min={500} max={30000} step={500} value={lifeD} onChange={e => setLifeD(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{lifeD} h</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Tipo de cojinete</label>
          <select value={bearingType} onChange={e => setBearingType(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
            <option value="ball">Bolas (a = 3)</option>
            <option value="roller">Rodillos (a = 10/3)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Fr – Carga radial (N)</label>
          <input type="range" min={100} max={20000} step={100} value={Fr} onChange={e => setFr(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{Fr} N</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Fa – Carga axial (N)</label>
          <input type="range" min={0} max={10000} step={100} value={Fa} onChange={e => setFa(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{Fa} N</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Confiabilidad R (%)</label>
          <input type="range" min={90} max={99} step={1} value={reliability} onChange={e => setReliability(+e.target.value)} className="w-full accent-green-600" />
          <span className="text-sm font-mono text-green-700">{reliability} % (a₁ = {a1.toFixed(2)})</span>
        </div>
      </div>
      <div className="mt-4 p-4 bg-white rounded-xl border border-green-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">C₁₀ requerida</div>
          <div className="text-2xl font-bold text-green-700">{(C10 / 1000).toFixed(2)} kN</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">C₁₀ ajustada (R)</div>
          <div className="text-2xl font-bold text-blue-700">{(C10_adj / 1000).toFixed(2)} kN</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Vida en rev</div>
          <div className="text-xl font-bold text-blue-700">{(LD / 1e6).toFixed(1)} × 10⁶</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Relación C/P</div>
          <div className="text-xl font-bold text-gray-700">{CP_ratio.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Exponente a</div>
          <div className="text-xl font-bold text-gray-700">{a.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Carga equiv. Pe</div>
          <div className="text-xl font-bold" style={{ color: C }}>{Pe.toFixed(0)} N</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">a₁ (R={reliability}%)</div>
          <div className="text-xl font-bold text-amber-600">{a1.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">L₁₀ estimada</div>
          <div className="text-xl font-bold text-purple-700">{(L10_rev_est / 1e6).toFixed(2)}×10⁶ rev</div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        C₁₀ = FD·(LD/LR)^(1/a) | LR = 10⁶ rev (SKF) | a = 3 (bolas), 10/3 (rodillos) | a₁ (Shigley tabla 11-2) ajusta por confiabilidad
      </p>
    </div>
  )
}

function PracticaContent() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (n: number) => setOpen(open === n ? null : n)

  const btn = (n: number) => ({
    width: '100%', textAlign: 'left' as const, padding: '14px 18px',
    background: open === n ? C : 'var(--bg-2)', color: open === n ? 'white' : 'var(--text-1)',
    border: `1px solid ${open === n ? C : 'var(--border)'}`, borderRadius: 10,
    fontFamily: 'var(--font-mono)', fontSize: 13, cursor: 'pointer', marginBottom: 8,
  })
  const box = { padding: '16px 20px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 16, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 20 }}>
        Tres problemas de selección y análisis de cojinetes (Shigley Cap. 11).
      </p>

      <button style={btn(1)} onClick={() => toggle(1)}>
        P11-1 · Cálculo de C₁₀ para vida y velocidad dadas
      </button>
      {open === 1 && (
        <div style={box}>
          <strong>Enunciado:</strong> Un cojinete de bolas debe soportar F_D = 2 200 N a 1 500 rpm durante 8 000 h con confiabilidad del 90 %. Determinar C₁₀.<br /><br />
          <strong>Solución:</strong><br />
          L_D = 8 000 h × 1 500 rpm × 60 = 720 × 10⁶ rev<br />
          L_R = 1 × 10⁶ rev (SKF), a = 3 (bolas)<br />
          C₁₀ = 2 200 × (720×10⁶ / 1×10⁶)^(1/3)<br />
          C₁₀ = 2 200 × (720)^(1/3) = 2 200 × 8.963 ≈ <strong>19 718 N ≈ 19.7 kN</strong><br /><br />
          Buscar en catálogo cojinete con C₁₀ ≥ 19.7 kN y diámetro de eje adecuado.
        </div>
      )}

      <button style={btn(2)} onClick={() => toggle(2)}>
        P11-2 · Carga equivalente con componentes radial y axial
      </button>
      {open === 2 && (
        <div style={box}>
          <strong>Enunciado:</strong> Un cojinete de ranura profunda soporta Fr = 4 000 N y Fa = 1 200 N, anillo interior girando (V = 1). Factores X = 0.56, Y = 1.8. ¿Cuál es la carga equivalente P?<br /><br />
          <strong>Solución:</strong><br />
          Criterio: si Fa/(V·Fr) {'>'} e → P = X·V·Fr + Y·Fa<br />
          Fa/(V·Fr) = 1 200/(1×4 000) = 0.30 {'>'} e ≈ 0.24 ✓<br />
          P = 0.56 × 1 × 4 000 + 1.8 × 1 200<br />
          P = 2 240 + 2 160 = <strong>4 400 N</strong><br /><br />
          Usar P = 4 400 N como F_D en la ecuación de C₁₀.
        </div>
      )}

      <button style={btn(3)} onClick={() => toggle(3)}>
        P11-3 · Vida esperada dado un cojinete de catálogo
      </button>
      {open === 3 && (
        <div style={box}>
          <strong>Enunciado:</strong> Se seleccionó un cojinete con C₁₀ = 25 000 N. Opera con F = 3 500 N a 900 rpm. ¿Cuál es la vida esperada L₁₀ en horas (bolas)?<br /><br />
          <strong>Solución:</strong><br />
          De C₁₀ = F·(L_D/L_R)^(1/a) despejamos L_D:<br />
          L_D = L_R × (C₁₀/F)^a = 1×10⁶ × (25 000/3 500)³<br />
          L_D = 1×10⁶ × (7.143)³ = 1×10⁶ × 364.4 = 364.4 × 10⁶ rev<br />
          θ_D = L_D / (n × 60) = 364.4×10⁶ / (900 × 60) ≈ <strong>6 748 h</strong>
        </div>
      )}
    </div>
  )
}

const sections = [
  { id: 's11-1', label: '11-1 Tipos de cojinetes' },
  { id: 's11-2', label: '11-2 Vida L10' },
  { id: 's11-3', label: '11-3 Carga-Vida' },
  { id: 's11-4', label: '11-4 Confiabilidad Weibull' },
  { id: 's11-5', label: '11-5 Carga-Vida-Confiabilidad' },
  { id: 's11-6', label: '11-6 Carga equivalente' },
  { id: 's11-7', label: '11-7 Cargas variables' },
  { id: 's11-8', label: '11-8 Selección de cojinetes' },
  { id: 's11-9', label: '11-9 Cojinetes cónicos' },
  { id: 's11-10', label: '11-10 Evaluación del diseño' },
  { id: 's11-11', label: '11-11 Lubricación' },
  { id: 's11-12', label: '11-12 Montaje y alojamiento' },
]

export default function Cap11Page() {
  return (
    <ChapterShell
      chapterId={11}
      chapterNum="11"
      title="Cojinetes de contacto rodante"
      subtitle="Selección de cojinetes de bolas y rodillos con base en la vida L10, carga nominal dinámica C10, confiabilidad de Weibull y carga equivalente."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300">
        <div className="font-bold text-green-800 text-lg mb-2">Pregúntate esto</div>
        <p className="text-green-700 text-sm leading-relaxed">
          ¿Bolsa o rodillo? ¿Cuándo usar cuál? ¿Cuánto dura un cojinete? ¿Y si la carga viene inclinada — cómo la combinamos?
          En este capítulo aprenderemos a seleccionar cojinetes de catálogo: entender los tipos, calcular la vida L₁₀,
          combinar cargas radiales y axiales, y ajustar por confiabilidad. Al final, serás capaz de ir de una
          especificación de máquina a un número de catálogo.
        </p>
      </div>

      <SectionTitle id="s11-1">11-1 Tipos de cojinetes de contacto rodante</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los cojinetes de contacto rodante separan las superficies mediante elementos rodantes (bolas o rodillos), reduciendo drásticamente la fricción. <em>Aunque se les llama "antifricción", la fricción inicial es aproximadamente el doble de la de operación</em> — sigue siendo despreciable comparada con la de un cojinete de manguito. Los anillos interior y exterior guían los elementos rodantes, y el <strong>separador (jaula)</strong> evita que los elementos se rocen entre sí. En cojinetes económicos, el separador se omite, lo que reduce capacidad y vida.
      </p>
      <ConceptBlock title={'Motivación — ¿Por qué "antifricción"?'}>
        <div className="text-sm text-gray-600 leading-relaxed">
          Una unidad de carga axial <strong>no causa el mismo daño por revolución</strong> que una unidad de carga radial. Por eso necesitamos una "carga equivalente" que convierte la combinación de cargas en una carga radial pura equivalente. El diseñador no inventa el cojinete — lo <em>selecciona</em> del catálogo del fabricante, que ya definió su geometría, capacidad y vida.
        </div>
      </ConceptBlock>
      <ConceptBlock title="Tipos principales (Figura 11-2 y 11-3)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            ['Ranura profunda (bolas)', 'Carga radial + algo de empuje. El más común.'],
            ['Contacto angular', 'Mayor capacidad de empuje axial. Se monta en pares.'],
            ['Rodillos cilíndricos', 'Mayor carga radial, NO tolera empuje axial.'],
            ['Rodillos cónicos', 'Cargas radiales + axiales combinadas (Timken).'],
            ['Agujas', 'Espacio radial mínimo. Alta capacidad. Sin separador opcional.'],
            ['Autoalineante', 'Tolera desalineamiento significativo. Esférico doble.'],
          ].map(([t, d]) => (
            <div key={t} className="p-2 bg-gray-50 rounded border border-gray-200">
              <span className="font-semibold text-gray-700">{t}</span><br />
              <span className="text-gray-600">{d}</span>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <div className="my-6 p-4 rounded-2xl bg-white border-2 border-green-200">
        <div className="font-mono text-xs text-gray-500 uppercase mb-3" style={{ color: C }}>Figura 11-1 — Tipos de cojinetes de contacto rodante</div>
        <svg viewBox="0 0 700 200" width="100%" style={{ maxWidth: 700 }}>
          {/* Ranura profunda */}
          <g transform="translate(0,0)">
            <circle cx="60" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="6" fill={C} />
            <text x="60" y="170" fontSize="10" textAnchor="middle" fill="var(--text-2)" fontFamily="monospace">Ranura prof.</text>
          </g>
          {/* Contacto angular */}
          <g transform="translate(130,0)">
            <circle cx="60" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="52" cy="94" r="5" fill="var(--accent)" />
            <circle cx="68" cy="106" r="5" fill="var(--accent)" />
            <text x="60" y="170" fontSize="10" textAnchor="middle" fill="var(--text-2)" fontFamily="monospace">Contacto angular</text>
          </g>
          {/* Rodillos cilíndricos */}
          <g transform="translate(260,0)">
            <circle cx="60" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2" />
            <rect x="55" y="65" width="10" height="30" rx="2" fill="var(--warning)" />
            <rect x="55" y="103" width="10" height="30" rx="2" fill="var(--warning)" />
            <text x="60" y="170" fontSize="10" textAnchor="middle" fill="var(--text-2)" fontFamily="monospace">Rodillos cil.</text>
          </g>
          {/* Cónicos */}
          <g transform="translate(390,0)">
            <circle cx="60" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2" />
            <polygon points="55,65 65,65 65,135 55,135" fill="var(--danger)" opacity="0.6" />
            <text x="60" y="170" fontSize="10" textAnchor="middle" fill="var(--text-2)" fontFamily="monospace">Cónicos (Timken)</text>
          </g>
          {/* Agujas */}
          <g transform="translate(520,0)">
            <circle cx="60" cy="100" r="40" fill="none" stroke="#333" strokeWidth="2" />
            <circle cx="60" cy="100" r="20" fill="none" stroke="#333" strokeWidth="2" />
            {[70, 76, 82, 88, 94, 106, 112, 118, 124, 130].map((y, i) => (
              <rect key={i} x="57" y={y} width="6" height="3" rx="1" fill={C} />
            ))}
            <text x="60" y="170" fontSize="10" textAnchor="middle" fill="var(--text-2)" fontFamily="monospace">Agujas</text>
          </g>
        </svg>
      </div>

      <SectionTitle id="s11-2">11-2 Vida de los cojinetes — Vida L10</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-4">
        La <strong>vida L10</strong> (o vida nominal) es el número de revoluciones u horas que el <strong>90% de un grupo de cojinetes</strong> idénticos alcanza o excede antes de presentar la primera evidencia de fatiga — típicamente, <strong>descascarado</strong> (pitting) en las pistas de rodadura. La norma ABMA define el criterio como la primera evidencia de fatiga; Timken usa picadura de un área de 0.01 pulg². La vida media es típicamente 4–5 veces L10, pero L10 es el estándar de diseño.
      </p>
      <ConceptBlock title="¿Qué significa C₁₀ en realidad?">
        <div className="text-sm text-gray-600 leading-relaxed">
          La <strong>carga nominal básica C₁₀</strong> es la carga radial que causa que el 10% de los cojinetes fallen durante la vida nominal del fabricante (SKF: 10⁶ rev, Timken: 90×10⁶ rev). <em>Ojo: C₁₀ es un valor de referencia estadístico, NO una carga que el cojinete pueda soportar en operación continua.</em> La carga real de operación siempre debe ser menor que C₁₀.
        </div>
      </ConceptBlock>
      <ConceptBlock title="Definiciones clave">
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Vida L10</strong> (B10): 10° percentil de la distribución de vida — 90% supervivencia</li>
          <li><strong>C10</strong>: Carga nominal básica dinámica — carga que causa falla en L10</li>
          <li><strong>LR</strong>: Vida nominal de referencia del fabricante (SKF: 10⁶ rev; Timken: 90×10⁶ rev)</li>
        </ul>
      </ConceptBlock>

      <SectionTitle id="s11-3">11-3 Relación Carga-Vida a confiabilidad nominal</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La relación entre carga y vida sigue una ley potencial. Para seleccionar C10 dado un requisito de carga F_D y vida L_D:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>F · L^(1/a) = constante</div>
          <div>a = 3 (cojinetes de bolas) | a = 10/3 (cojinetes de rodillos)</div>
          <div className="mt-2 font-bold">C₁₀ = FD · (LD / LR)^(1/a)</div>
          <div>LD = θD · nD · 60 &emsp; [en revoluciones]</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s11-4">11-4 Confiabilidad — Distribución de Weibull</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La vida de cojinetes sigue una distribución de Weibull de tres parámetros. La confiabilidad R en función de la vida adimensional x = L/L10:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>R = exp[−((x − x₀)/(θ − x₀))^b]</div>
          <div>Parámetros típicos: x₀ = 0.02, (θ−x₀) = 4.439, b = 1.483</div>
          <div>En x = 1 (vida L10): R = 0.90 (por definición)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s11-5">11-5 Relación Carga-Vida-Confiabilidad</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Para una confiabilidad R_D mayor que 0.90, se calcula el factor de confiabilidad a1 usando la distribución de Weibull. La relación carga-vida es empírica — proviene de miles de ensayos de grupos de cojinetes a diferentes cargas, graficados en escala log-log.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>xD = x₀ + (θ−x₀)·[ln(1/RD)]^(1/b)</div>
          <div>C₁₀ = FD · (xD·nD·60 / LR)^(1/a)</div>
          <div>Factor de confiabilidad a1 (tabla): multiplicador sobre L10 calculado</div>
        </div>
      </FormulaBox>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ backgroundColor: C, color: 'white' }}>
            <th className="px-3 py-2">Confiabilidad R</th>
            <th className="px-3 py-2">0.90</th>
            <th className="px-3 py-2">0.95</th>
            <th className="px-3 py-2">0.99</th>
            <th className="px-3 py-2">0.999</th>
          </tr></thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-3 py-2 font-semibold">a1</td>
              <td className="px-3 py-2 text-center font-mono">1.00</td>
              <td className="px-3 py-2 text-center font-mono">0.62</td>
              <td className="px-3 py-2 text-center font-mono">0.21</td>
              <td className="px-3 py-2 text-center font-mono">0.05</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-6 p-4 rounded-2xl bg-white border-2 border-green-200">
        <div className="font-mono text-xs text-gray-500 uppercase mb-3" style={{ color: C }}>Figura 11-2/3 — Curvas de supervivencia Weibull: Confiabilidad R vs Vida adimensional x = L/L10</div>
        <svg viewBox="0 0 420 260" width="100%" style={{ maxWidth: 420 }}>
          <line x1="50" y1="220" x2="390" y2="220" stroke="var(--text-3)" strokeWidth="1.5" />
          <line x1="50" y1="220" x2="50" y2="20" stroke="var(--text-3)" strokeWidth="1.5" />
          <text x="210" y="250" fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">x = L / L₁₀  (vida adimensional)</text>
          <text x="18" y="125" fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,18,125)">R — Confiabilidad</text>
          {[0, 0.5, 1, 2, 3, 4, 5, 6].map(v => {
            const x = 50 + v * 56
            return <text key={v} x={x} y="234" fontSize="9" fill="var(--text-3)" fontFamily="monospace" textAnchor="middle">{v}</text>
          })}
          {[{r:1,y:220},{r:0.95,y:210},{r:0.90,y:50},{r:0.80,y:184},{r:0.70,y:196},{r:0.50,y:208},{r:0.30,y:214}].map(({r,y}) => {
            const yPx = 220 - (r * 200 / 1)
            return <text key={r} x="44" y={yPx+4} fontSize="9" fill="var(--text-3)" fontFamily="monospace" textAnchor="end">{r < 1 ? r.toFixed(2) : '1.0'}</text>
          })}
          {[0, 0.5, 1, 2, 3, 4, 5, 6].map(v => {
            const x = 50 + v * 56
            return <line key={v} x1={x} y1="220" x2={x} y2="216" stroke="var(--text-3)" strokeWidth="1" />
          })}
          {[1, 0.9, 0.8, 0.7, 0.5, 0.3].map(r => {
            const yPx = 220 - (r * 200)
            return <line key={r} x1="50" y1={yPx} x2="46" y2={yPx} stroke="var(--text-3)" strokeWidth="1" />
          })}
          <path d="M 50,20 C 60,20 70,20 80,22 C 100,26 120,35 140,48 C 160,64 180,82 200,104 C 220,126 240,146 260,162 C 280,176 300,188 320,196 C 340,202 360,207 380,210 L 386,212" fill="none" stroke={C} strokeWidth="2.5" />
          <circle cx="50" cy="20" r="3" fill={C} />
          <circle cx="106" cy="50" r="4" fill="#EF4444" />
          <line x1="106" y1="220" x2="106" y2="50" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 3" />
          <text x="112" y="46" fontSize="9" fill="#EF4444" fontFamily="monospace" fontWeight="bold">x₀ = 0.02</text>
          <circle cx="50" cy="20" r="0" fill="transparent" />
          <rect x="50" y="20" width="336" height="2" fill="var(--text-3)" opacity="0.15" />
          <line x1="50" y1="220" x2="50" y2="20" stroke="var(--text-3)" strokeWidth="0.5" opacity="0.2" />
          <circle cx="106" cy="50" r="3.5" fill="transparent" stroke="#EF4444" strokeWidth="2" />
          <text x="113" y="58" fontSize="8" fill="#EF4444" fontFamily="monospace">R = 0.90 en x = 1</text>
          <text x="250" y="78" fontSize="10" fill={C} fontFamily="monospace" fontWeight="bold">Curva Weibull</text>
          <text x="250" y="92" fontSize="9" fill="var(--text-3)" fontFamily="monospace">b = 1.483, θ−x₀ = 4.439</text>
          <rect x="300" y="130" width="80" height="46" rx="4" fill="var(--bg-2)" stroke="var(--border)" strokeWidth="0.8" />
          <text x="340" y="145" textAnchor="middle" fontSize="8" fill="var(--text-2)" fontFamily="monospace">Punto L₁₀</text>
          <text x="340" y="157" textAnchor="middle" fontSize="8" fill="#EF4444" fontFamily="monospace">x = 1 → R = 90%</text>
          <text x="340" y="169" textAnchor="middle" fontSize="8" fill="var(--text-3)" fontFamily="monospace">L₅₀ = 4.6·L₁₀</text>
          <line x1="106" y1="42" x2="300" y2="140" stroke="var(--text-3)" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

<SectionTitle id="s11-6">11-6 Carga equivalente</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Cuando el cojinete soporta cargas radial Fr y axial Fa simultáneamente, se usa la carga equivalente P. <strong>¿Por qué? Porque una unidad de carga axial causa un daño diferente por revolución que una unidad de carga radial</strong> — cada punto del contacto rodante soporta una fuerza oblicua, no puramente normal.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>P = XVFr + YFa &emsp; (si P &gt; VFr, de lo contrario P = VFr)</div>
          <div>V = 1.0 (anillo interior girando) | V = 1.2 (anillo exterior girando)</div>
          <div>X, Y: factores radial y axial de catálogo (función de Fa/Fr y Fa/C₀)</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="¿Qué es C₀ y por qué importa?">
        <div className="text-sm text-gray-600 leading-relaxed">
          <strong>C₀</strong> es la carga estática básica: la carga que produce una deformación permanente total en pista y elementos rodantes de 0.0001 veces el diámetro del elemento rodante en cualquier punto de contacto. C₀ se usa para determinar el factor e (Fa/C₀) que define si la carga axial es significativa. Si Fa/C₀ {'>'} e, la carga axial afecta la vida y se usa la fórmula completa; si no, P = VFr.
        </div>
      </ConceptBlock>
      <ConceptBlock title="¿Por qué V = 1.2 para anillo exterior girando?">
        <div className="text-sm text-gray-600 leading-relaxed">
          Cuando el anillo interior gira, cada punto del anillo exterior experimenta carga cíclica completa una vez por revolución (peor caso). Cuando gira el anillo exterior, la vida a la fatiga se reduce — V = 1.2 reconoce esta reducción. Excepción: los cojinetes autoalineantes siempre usan V = 1.
        </div>
      </ConceptBlock>
      <ConceptBlock title="Factor de aplicación af — la carga real es mayor que la nominal">
        <div className="text-sm text-gray-600 leading-relaxed">
          Los catálogos dan C₁₀ para carga constante y uniforme. En la práctica, hay choques, vibración y sobrecargas. El <strong>factor de aplicación af</strong> ajusta la carga de diseño: F_D = af · F_nominal. Valores típicos: af = 1.0–1.2 (engranes de precisión), 1.2–1.5 (aplicaciones generales), 2.0–3.0 (choque moderado a pesado). <em>Sin af, la C₁₀ calculada puede quedar hasta 3× por debajo de lo necesario.</em>
        </div>
      </ConceptBlock>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ backgroundColor: C, color: 'white' }}>
            <th className="px-3 py-2">Tipo de máquina</th>
            <th className="px-3 py-2">Horas de vida L₁₀ recomendadas</th>
          </tr></thead>
          <tbody>
            {[
              ['Instrumentos y aparatos', '0–5 000'],
              ['Aeronaves', '500–2 000'],
              ['Automóviles (ruedas)', '5 000–15 000'],
              ['Motores eléctricos industriales', '20 000–40 000'],
              ['Bombas centrífugas', '20 000–40 000'],
              ['Engranes industriales', '25 000–50 000'],
              ['Turbinas de vapor', '50 000–200 000'],
            ].map(([tipo, vida], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2">{tipo}</td>
                <td className="px-3 py-2 text-center font-mono">{vida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OjoAqui>
        Un error clásico: usar la carga radial Fr directamente en la ecuación de C₁₀ cuando hay carga axial presente.
        <strong>La carga axial reduce drásticamente la vida</strong> si no se incluye en la carga equivalente P.
        Siempre verifica si Fa/(V·Fr) supera el valor límite e — de lo contrario, P = VFr.
      </OjoAqui>

      <SectionTitle id="s11-7">11-7 Cargas variables</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Con ciclos de carga variables (F1 durante N1 rev, F2 durante N2 rev, etc.), se usa la carga equivalente media cúbica. Esto proviene de la <strong>regla de daño lineal de Miner-Palmgren</strong>: cada ciclo a una carga dada consume una fracción de la vida disponible, y la suma de todas las fracciones de daño debe ser ≤ 1.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>Fm = (Σ(Fᵢ^a · nᵢ) / Σnᵢ)^(1/a)</div>
          <div>Regla de Miner: l₁/L₁ + l₂/L₂ + l₃/L₃ + ··· ≤ 1</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Carga sinusoidal variable">
        <div className="text-sm text-gray-600 leading-relaxed">
          Para cargas que varían sinusoidalmente: F = F̄ + Â sen θ, el factor de aplicación se convierte en af = [1 + (3/2)(Â/F̄)²]^(1/a). Por ejemplo, para Â/F̄ = 0.5 y a = 3: af = (1 + 0.375)^(1/3) ≈ 1.11. Esto significa que una fluctuación de ±50% sobre la carga media reduce la vida en ~11%.
        </div>
      </ConceptBlock>

      <SectionTitle id="s11-8">11-8 Procedimiento de selección</SectionTitle>
      <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
        <li>Definir carga equivalente P (o FD), velocidad nD y vida deseada θD</li>
        <li>Calcular C10 = FD·(LD/LR)^(1/a) con corrección de confiabilidad si R &gt; 0.90</li>
        <li>Buscar en catálogo del fabricante el cojinete con C10 ≥ calculada y diámetro correcto</li>
        <li>Verificar carga estática: P0 = X0·Fr + Y0·Fa ≤ C0 (carga básica estática)</li>
        <li>Confirmar velocidades de operación vs. velocidad límite del cojinete</li>
      </ol>
      <BearingLifeCalculator />

      <OjoAqui>
        Otro error típico: buscar el cojinete en el catálogo <strong>antes</strong> de calcular C₁₀ requerida.
        Sin saber la carga de catálogo que necesitas, no puedes saber si el cojinete que encontraste servirá.
        La secuencia correcta es siempre: calcular C₁₀ requerida → buscar en catálogo → verificar.
      </OjoAqui>

      <SectionTitle id="s11-9">11-9 Selección de cojinetes cónicos (Timken)</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los cojinetes de rodillos cónicos son especiales porque <strong>la carga radial genera una carga axial interna</strong> debido al ángulo de contacto del cono. Esta componente axial inducida debe considerarse en el cálculo de la carga equivalente.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>F_a_inducida = 0.47 · F_r / K &emsp; (K = factor Timken, típicamente ~1.5)</div>
          <div>K = Carga radial nominal / Carga axial nominal del cojinete</div>
        </div>
      </FormulaBox>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los cojinetes cónicos casi siempre se montan en pares. Las tres configuraciones posibles:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {[
          { nombre: 'Tándem (DT)', desc: 'Las cargas axiales se suman. Ambos conos apuntan en la misma dirección. Usado cuando una dirección de empuje es dominante.' },
          { nombre: 'Espalda con espalda (DB)', desc: 'Los conos apuntan hacia afuera. Mayor rigidez y tolerancia a momento de volteo. La configuración más común para pares.' },
          { nombre: 'Frente a frente (DF)', desc: 'Los conos apuntan hacia adentro. Menor rigidez que DB. Puede aceptar cierta desalineación.' },
        ].map(({ nombre, desc }) => (
          <div key={nombre} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-semibold text-gray-700 text-sm mb-1">{nombre}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
      <ConceptBlock title="Procedimiento para par de cónicos (Timken)">
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>Calcular fuerzas axiales inducidas: F_ai = 0.47·F_ri / K para cada cojinete</li>
          <li>Determinar fuerza axial neta: la inducida del cojinete opuesto + la fuerza externa axial</li>
          <li>Calcular Fa/Fr efectivo para cada cojinete del par</li>
          <li>Obtener X, Y de tablas Timken según Fa/Fr y seleccionar C₁₀ adecuada</li>
        </ol>
      </ConceptBlock>

      <SectionTitle id="s11-10">11-10 Evaluación del diseño de cojinetes</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Seleccionar un cojinete del catálogo no es el final — hay que evaluar que la selección cumpla con todos los requisitos del sistema:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {[
          { check: 'Vida', desc: 'Verificar que L₁₀ calculada ≥ vida deseada. Recordar que la vida real puede ser menor por lubricación o contaminación.' },
          { check: 'Rigidez', desc: 'En aplicaciones de precisión (husillos, máquinas herramienta), la deflexión del cojinete puede ser crítica. Usar precarga para eliminar juego.' },
          { check: 'Velocidad límite', desc: 'Todo cojinete tiene una velocidad máxima de operación (dada por el fabricante). Excederla causa sobrecalentamiento y falla prematura.' },
          { check: 'Lubricación', desc: 'Sin lubricación adecuada, el cojinete falla por desgaste antes de alcanzar la vida L₁₀. La viscosidad debe ser suficiente para formar película.' },
        ].map(({ check, desc }) => (
          <div key={check} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-semibold text-green-700 text-sm mb-1">✓ {check}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
      <ConceptBlock title="Criterios de evaluación rápida">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>C₁₀_catálogo ≥ C₁₀_requerida (con factor de seguridad de 1.1–1.5 según criticidad)</li>
          <li>n_operación ≤ 0.8·n_límite (margen de seguridad en velocidad)</li>
          <li>Lubricante adecuado: κ = υ/υ₁ ≥ 1 (ISO VG 32–68 para aplicaciones típicas)</li>
          <li>Si la aplicación es crítica (aviación, medicina), usar confiabilidad R ≥ 99% → a₁ = 0.21</li>
        </ul>
      </ConceptBlock>

      <SectionTitle id="s11-11">11-11 Lubricación de cojinetes</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La lubricación cumple tres funciones vitales: separar las superficies (evitar contacto metal-metal), evacuar el calor generado por fricción y proteger contra la corrosión. Sin lubricación, la vida del cojinete cae drásticamente.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="font-semibold text-gray-700 text-sm mb-2">Grasa</div>
          <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
            <li>Usada en 80–90% de las aplicaciones</li>
            <li>No requiere sistema de circulación; el cojinete se empaca y sella</li>
            <li>Tipos: litio (multipropósito), calcio (resistente al agua), poliurea (altas T)</li>
            <li>Ventaja: simple, bajo mantenimiento</li>
            <li>Desventaja: velocidad límite menor que con aceite</li>
          </ul>
        </div>
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="font-semibold text-gray-700 text-sm mb-2">Aceite</div>
          <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
            <li>Usado en aplicaciones de alta velocidad o alta temperatura</li>
            <li>Sistemas: baño de aceite, circulación forzada, niebla de aceite</li>
            <li>Ventaja: mejor disipación de calor, permite velocidades más altas</li>
            <li>Desventaja: requiere sistema de sellado y bombeo</li>
            <li>Viscosidad recomendada: ISO VG 32–68 según velocidad y temperatura</li>
          </ul>
        </div>
      </div>
      <ConceptBlock title="Sellos y protectores">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {[
            ['Sello de contacto', 'Labio de caucho presionado contra el anillo. Buen sellado, mayor fricción.'],
            ['Sello sin contacto (shield)', 'Lámina metálica que roza casi sin fricción. Menos sellado, menor par.'],
            ['Protector de laberinto', 'Trayectoria tortuosa para partículas. Usado en ambientes sucios.'],
            ['Tapa de blindaje (Z, ZZ)', 'Protección contra polvo grueso. Bajo costo.'],
          ].map(([t, d]) => (
            <div key={t} className="p-2 bg-gray-50 rounded border border-gray-200">
              <span className="font-semibold text-gray-700">{t}</span><br />
              <span className="text-gray-600">{d}</span>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <SectionTitle id="s11-12">11-12 Montaje y alojamiento</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        El montaje correcto es tan importante como la selección. Un cojinete mal montado puede fallar prematuramente aunque sea de la capacidad correcta.
      </p>
      <ConceptBlock title="Cojinete fijo vs. cojinete libre — concepto fundamental">
        <div className="text-sm text-gray-600 leading-relaxed">
          En un eje con dos cojinetes, uno debe ser <strong>fijo</strong> (toma carga radial y axial,定位 el eje) y el otro <strong>libre</strong> (solo carga radial, permite deslizamiento axial para compensar expansión térmica). Si ambos cojinetes están fijos, la expansión del eje genera cargas axiales enormes que destruyen los cojinetes. El cojinete fijo suele tener ambos anillos con ajuste de interferencia; el libre tiene el anillo exterior con ajuste deslizante.
        </div>
      </ConceptBlock>
      <ConceptBlock title="Confiabilidad del sistema de cojinetes">
        <div className="text-sm text-gray-600 leading-relaxed">
          Si un eje tiene dos cojinetes que deben sobrevivir ambos, la confiabilidad del sistema es R_sistema = R_A · R_B. Para lograr R_sistema = 0.96, cada cojinete necesita R ≥ √0.96 ≈ 0.98. <strong>La confiabilidad individual siempre debe ser mayor que la del sistema.</strong>
        </div>
      </ConceptBlock>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th className="px-3 py-2">Condición</th>
              <th className="px-3 py-2">Ajuste recomendado</th>
              <th className="px-3 py-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Anillo interior giratorio sobre eje', 'Interferencia (k5, m5, n5)', 'Evita que el anillo patine sobre el eje'],
              ['Anillo exterior estacionario en alojamiento', 'Juego ligero (H7, J7)', 'Permite expansión térmica axial'],
              ['Anillo exterior giratorio', 'Interferencia (N7, P7)', 'Evita rotación del anillo en el alojamiento'],
              ['Carga pesada o impacto', 'Interferencia mayor (p6, r6)', 'Para evitar desgaste por frectado'],
            ].map(([cond, ajuste, nota], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2">{cond}</td>
                <td className="px-3 py-2 text-center font-mono">{ajuste}</td>
                <td className="px-3 py-2 text-center">{nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConceptBlock title="Recomendaciones prácticas de montaje">
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>Usar prensa hidráulica o calentamiento por inducción para montar anillos interiores — nunca golpear el cojinete</li>
          <li>Para cojinetes abiertos, lubricar inmediatamente después del montaje</li>
          <li>En montajes con cojinete fijo y cojinete libre, el libre debe poder deslizar axialmente en el alojamiento</li>
          <li>Verificar concentricidad y paralelismo de los hombros del eje y del alojamiento</li>
          <li>Si el ambiente es corrosivo, considerar cojinetes con recubrimientos o acero inoxidable</li>
        </ul>
      </ConceptBlock>

      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
        <h3 className="font-bold text-green-800 text-lg mb-3">Resumen — Fórmulas clave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            ['Vida L10 def.', '90% supervivencia, 10° percentil'],
            ['Carga nominal', 'C₁₀ = FD·(LD/LR)^(1/a)'],
            ['Exponente a', 'Bolas: 3 | Rodillos: 10/3'],
            ['Vida en rev', 'LD = θ[h]·n[rpm]·60'],
            ['Carga equivalente', 'P = XVFr + YFa'],
            ['Confiabilidad Weibull', 'R = exp[−((x−x₀)/(θ−x₀))^b]'],
            ['Factor confiabilidad a₁', 'R=90→1.0, 95→0.62, 99→0.21'],
            ['Carga axial inducida (cónico)', 'Fa = 0.47·Fr / K'],
          ].map(([name, formula]) => (
            <div key={name} className="flex flex-col">
              <span className="font-semibold text-gray-700">{name}</span>
              <code className="text-xs bg-white px-2 py-1 rounded border border-green-200 font-mono">{formula}</code>
            </div>
          ))}
        </div>
      </div>
    </ChapterShell>
  )
}
