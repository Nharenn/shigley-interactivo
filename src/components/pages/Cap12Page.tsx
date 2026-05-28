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

function PetroffCalc() {
  const [muReyn, setMuReyn] = useState(2.7)
  const [N, setN] = useState(20)
  const [P, setP] = useState(200)
  const [r, setR] = useState(1.0)
  const [c, setC] = useState(0.002)

  const mu = muReyn * 1e-6
  const f = 2 * Math.PI ** 2 * (mu * N / P) * (r / c)
  const S = (r / c) ** 2 * (mu * N / P)
  const ZNP = muReyn * 1000 * (N * 60) / P

  return (
    <div className="my-6 p-5 rounded-2xl border-2 border-green-300 bg-green-50">
      <h4 className="font-bold text-green-700 mb-4 text-lg">Calculadora — Ecuación de Petroff y Número de Sommerfeld</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'μ – Viscosidad (μreyn)', val: muReyn, set: setMuReyn, min: 0.1, max: 20, step: 0.1 },
          { label: 'N – Velocidad (rps)', val: N, set: setN, min: 1, max: 100, step: 1 },
          { label: 'P – Presión (psi)', val: P, set: setP, min: 10, max: 2000, step: 10 },
          { label: 'r – Radio del muñón (in)', val: r, set: setR, min: 0.1, max: 5, step: 0.1 },
          { label: 'c – Holgura radial (in × 10⁻³)', val: c * 1000, set: (v: number) => setC(v / 1000), min: 0.5, max: 10, step: 0.5 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="range" min={min} max={max} step={step} value={val}
              onChange={e => set(+e.target.value)} className="w-full accent-green-600" />
            <span className="text-sm font-mono text-green-700">{typeof val === 'number' ? val.toFixed(step < 1 ? 2 : 0) : val}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'f (coef. fricción)', value: f.toFixed(5), color: 'text-green-700' },
          { label: 'S (Sommerfeld)', value: S.toFixed(4), color: 'text-blue-700' },
          { label: 'ZN/P', value: ZNP.toFixed(1), color: 'text-amber-700' },
          { label: 'r/c (rel. holgura)', value: (r / c).toFixed(0), color: 'text-gray-700' },
          { label: 'Lubricación', value: (mu * N / P) >= 1.7e-6 ? 'Película gruesa ✓' : 'Revisar ⚠', color: (mu * N / P) >= 1.7e-6 ? 'text-green-600' : 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-3 rounded-xl bg-white border border-green-200 text-center">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className={`text-lg font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        f = 2π²·(μN/P)·(r/c) | S = (r/c)²·μN/P | Película gruesa: μN/P ≥ 1.7×10⁻⁶
      </p>
    </div>
  )
}

function SommerfeldChart() {
  const [logS, setLogS] = useState(Math.log10(0.126))
  const [ldRatio, setLdRatio] = useState('1')
  const S = Math.pow(10, logS)
  const rb1 = [
    { S: 0.016, eps: 0.920, h0c: 0.080, frc: 1.17, Q: 0.125 },
    { S: 0.032, eps: 0.860, h0c: 0.140, frc: 1.72, Q: 0.162 },
    { S: 0.063, eps: 0.780, h0c: 0.220, frc: 2.42, Q: 0.190 },
    { S: 0.126, eps: 0.670, h0c: 0.330, frc: 3.44, Q: 0.210 },
    { S: 0.240, eps: 0.540, h0c: 0.460, frc: 4.95, Q: 0.216 },
    { S: 0.500, eps: 0.380, h0c: 0.620, frc: 7.65, Q: 0.203 },
    { S: 1.000, eps: 0.240, h0c: 0.760, frc: 12.4, Q: 0.160 },
    { S: 2.000, eps: 0.140, h0c: 0.860, frc: 21.0, Q: 0.112 },
  ]
  const rb12 = [
    { S: 0.016, eps: 0.940, h0c: 0.060, frc: 2.13, Q: 0.084 },
    { S: 0.032, eps: 0.880, h0c: 0.120, frc: 3.10, Q: 0.108 },
    { S: 0.063, eps: 0.800, h0c: 0.200, frc: 4.56, Q: 0.130 },
    { S: 0.126, eps: 0.690, h0c: 0.310, frc: 6.64, Q: 0.145 },
    { S: 0.240, eps: 0.570, h0c: 0.430, frc: 9.60, Q: 0.149 },
    { S: 0.500, eps: 0.420, h0c: 0.580, frc: 15.1, Q: 0.136 },
    { S: 1.000, eps: 0.280, h0c: 0.720, frc: 24.7, Q: 0.105 },
  ]
  const rb14 = [
    { S: 0.016, eps: 0.960, h0c: 0.040, frc: 3.40, Q: 0.050 },
    { S: 0.032, eps: 0.910, h0c: 0.090, frc: 5.00, Q: 0.070 },
    { S: 0.063, eps: 0.840, h0c: 0.160, frc: 7.30, Q: 0.085 },
    { S: 0.126, eps: 0.730, h0c: 0.270, frc: 10.6, Q: 0.100 },
    { S: 0.240, eps: 0.620, h0c: 0.380, frc: 15.2, Q: 0.110 },
    { S: 0.500, eps: 0.470, h0c: 0.530, frc: 24.0, Q: 0.100 },
    { S: 1.000, eps: 0.330, h0c: 0.670, frc: 39.0, Q: 0.080 },
  ]
  const rbInf = [
    { S: 0.016, eps: 0.970, h0c: 0.030, frc: 4.80, Q: 0.030 },
    { S: 0.032, eps: 0.930, h0c: 0.070, frc: 7.10, Q: 0.045 },
    { S: 0.063, eps: 0.870, h0c: 0.130, frc: 10.4, Q: 0.060 },
    { S: 0.126, eps: 0.760, h0c: 0.240, frc: 15.0, Q: 0.075 },
    { S: 0.240, eps: 0.650, h0c: 0.350, frc: 21.5, Q: 0.085 },
    { S: 0.500, eps: 0.510, h0c: 0.490, frc: 34.0, Q: 0.075 },
    { S: 1.000, eps: 0.370, h0c: 0.630, frc: 55.0, Q: 0.060 },
  ]
  type D = { S: number; eps: number; h0c: number; frc: number; Q: number }
  const byRatio: Record<string, D[]> = { '1/4': rb14, '1/2': rb12, '1': rb1, '∞': rbInf }
  const ratios = ['1/4', '1/2', '1', '∞']
  const colors: Record<string, string> = { '1/4': '#F59E0B', '1/2': '#3B82F6', '1': '#22C55E', '∞': '#A855F7' }

  function interp(data: D[], s: number): D {
    if (s <= data[0].S) return data[0]
    if (s >= data[data.length - 1].S) return data[data.length - 1]
    for (let i = 0; i < data.length - 1; i++) {
      if (s >= data[i].S && s <= data[i + 1].S) {
        const f = (Math.log10(s) - Math.log10(data[i].S)) / (Math.log10(data[i + 1].S) - Math.log10(data[i].S))
        return { S: s, eps: data[i].eps + f * (data[i + 1].eps - data[i].eps), h0c: data[i].h0c + f * (data[i + 1].h0c - data[i].h0c), frc: data[i].frc + f * (data[i + 1].frc - data[i].frc), Q: data[i].Q + f * (data[i + 1].Q - data[i].Q) }
      }
    }
    return data[data.length - 1]
  }

  const cur = interp(byRatio[ldRatio], S)
  const W = 440, H = 260, PL = 55, PR = 15, PT = 25, PB = 40
  const PW = W - PL - PR, PH = H - PT - PB
  const LSmin = -2, LSmax = 0
  const sx = (v: number) => PL + (Math.log10(v) - LSmin) / (LSmax - LSmin) * PW
  const sy = (v: number) => PT + (1 - v) * PH

  function pathD(data: D[]) {
    return data.filter(d => d.S >= 0.01 && d.S <= 1.0).map((d, i) => `${i === 0 ? 'M' : 'L'}${sx(d.S).toFixed(1)},${sy(d.eps).toFixed(1)}`).join(' ')
  }

  return (
    <div className="my-6 p-5 rounded-2xl border-2 border-green-300 bg-green-50">
      <h4 className="font-bold text-green-700 mb-4 text-lg">Simulador — Carta de Raimondi-Boyd (ε vs S)</h4>
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <span className="text-sm font-semibold text-gray-600 mr-1">Relación l/d:</span>
        {ratios.map(r => (
          <button key={r} onClick={() => setLdRatio(r)} className="px-3 py-1.5 rounded-lg text-sm font-mono font-bold transition-all" style={{ background: ldRatio === r ? C : 'var(--bg-2)', color: ldRatio === r ? 'white' : 'var(--text-1)', border: `1px solid ${ldRatio === r ? C : 'var(--border)'}` }}>{r === '∞' ? '∞' : r}</button>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Número de Sommerfeld S (escala logarítmica)</label>
        <input type="range" min={-2} max={0} step={0.01} value={logS} onChange={e => setLogS(+e.target.value)} className="w-full accent-green-600" />
        <div className="flex justify-between text-xs text-gray-500 font-mono mt-1"><span>0.01</span><span>0.1</span><span>1.0</span></div>
        <div className="text-center text-lg font-bold font-mono" style={{ color: C }}>S = {S.toFixed(4)}</div>
      </div>
      <div className="my-4 p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Curvas ε vs S — Raimondi-Boyd para distintas relaciones l/d</div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: W }}>
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(e => (
            <g key={`e${e}`}>
              <line x1={PL} y1={sy(e)} x2={W - PR} y2={sy(e)} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x={PL - 5} y={sy(e) + 4} fontSize="10" fill="var(--text-2)" fontFamily="monospace" textAnchor="end">{e.toFixed(1)}</text>
            </g>
          ))}
          {[0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0].map(s => (
            <g key={`s${s}`}>
              <line x1={sx(s)} y1={PT} x2={sx(s)} y2={H - PB} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x={sx(s)} y={H - PB + 15} fontSize="9" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">{s}</text>
            </g>
          ))}
          <line x1={PL} y1={PT} x2={PL} y2={H - PB} stroke="var(--text-2)" strokeWidth="1.5" />
          <line x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} stroke="var(--text-2)" strokeWidth="1.5" />
          <text x={(PL + W - PR) / 2} y={H - 3} fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">S (Sommerfeld)</text>
          <text x={14} y={(PT + H - PB) / 2} fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90,14,${(PT + H - PB) / 2})`}>ε</text>
          {ratios.map(r => (
            <path key={`p${r}`} d={pathD(byRatio[r])} fill="none" stroke={ldRatio === r ? colors[r] : '#CBD5E1'} strokeWidth={ldRatio === r ? 2.5 : 1} />
          ))}
          <g transform="translate(340,32)">
            <rect x="0" y="0" width="90" height="82" fill="white" stroke="var(--border)" rx="3" opacity="0.9" />
            {ratios.map((r, i) => (
              <g key={`lg${r}`} transform={`translate(5,${15 + i * 17})`}>
                <line x1="0" y1="0" x2="18" y2="0" stroke={colors[r]} strokeWidth={ldRatio === r ? 2.5 : 1} />
                <text x="22" y="4" fontSize="9" fill={ldRatio === r ? colors[r] : 'var(--text-3)'} fontFamily="monospace" fontWeight={ldRatio === r ? 'bold' : 'normal'}>l/d={r === '∞' ? '∞' : r}</text>
              </g>
            ))}
          </g>
          <line x1={sx(S)} y1={PT} x2={sx(S)} y2={H - PB} stroke={C} strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
          <circle cx={sx(S)} cy={sy(cur.eps)} r="5" fill={C} stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'ε (razón excentricidad)', value: cur.eps.toFixed(3), color: 'text-green-700' },
          { label: 'h₀/c (espesor mínimo)', value: cur.h0c.toFixed(3), color: 'text-blue-700' },
          { label: 'f·r/c (fricción)', value: cur.frc.toFixed(2), color: 'text-amber-700' },
          { label: 'Q/(rcNl) (flujo)', value: cur.Q.toFixed(3), color: 'text-purple-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-3 rounded-xl bg-white border border-green-200 text-center">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className={`text-lg font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-xl border-l-4 bg-red-50 border-red-400 text-sm">
        <strong className="text-red-700"> Ojo aquí:</strong>{' '}
        <span className="text-gray-700">Las tablas Raimondi-Boyd asumen condiciones de estado estable y lubricación hidrodinámica completa. No usar para ε &gt; 0.9 o S &lt; 0.01.</span>
      </div>
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
        Tres problemas de lubricación hidrodinámica y diseño de chumaceras (Shigley Cap. 12).
      </p>

      <button style={btn(1)} onClick={() => toggle(1)}>
        P12-1 · Número de Sommerfeld y coeficiente de fricción (Petroff)
      </button>
      {open === 1 && (
        <div style={box}>
          <strong>Enunciado:</strong> Un cojinete de muñón tiene r = 1.5 in, c = 0.003 in, l = 2 in. Opera a N = 30 rps con aceite SAE 30 (μ = 3.5 μreyn) y carga W = 800 lb. Calcular S y f por la ecuación de Petroff.<br /><br />
          <strong>Solución:</strong><br />
          P = W/(l·d) = 800/(2 × 3) = 133.3 psi<br />
          μ = 3.5 × 10⁻⁶ reyn<br />
          S = (r/c)² × (μN/P) = (1.5/0.003)² × (3.5×10⁻⁶ × 30 / 133.3)<br />
          S = (500)² × (7.87×10⁻⁷) = 250 000 × 7.87×10⁻⁷ ≈ <strong>0.197</strong><br /><br />
          f = 2π² × (μN/P) × (r/c) = 2π² × 7.87×10⁻⁷ × 500 ≈ <strong>0.00777</strong>
        </div>
      )}

      <button style={btn(2)} onClick={() => toggle(2)}>
        P12-2 · Verificación de película gruesa (criterio McKee)
      </button>
      {open === 2 && (
        <div style={box}>
          <strong>Enunciado:</strong> Un cojinete opera a N = 15 rps con aceite de μ = 2.0 μreyn y presión proyectada P = 180 psi. ¿Está en régimen de película gruesa?<br /><br />
          <strong>Solución:</strong><br />
          Criterio: μN/P ≥ 1.7 × 10⁻⁶<br />
          μN/P = (2.0×10⁻⁶ × 15) / 180 = 3.0×10⁻⁵ / 180 = 1.67×10⁻⁷<br /><br />
          1.67×10⁻⁷ {'<'} 1.7×10⁻⁶ → <strong>No cumple</strong> el criterio de película gruesa.<br /><br />
          Acción: aumentar viscosidad (aceite SAE más viscoso), reducir carga o aumentar velocidad. Probar μ = 5 μreyn: μN/P = 4.17×10⁻⁷ {'<'} 1.7×10⁻⁶. Probar μ = 25 μreyn: 2.08×10⁻⁶ {'>'} 1.7×10⁻⁶ ✓
        </div>
      )}

      <button style={btn(3)} onClick={() => toggle(3)}>
        P12-3 · Diseño iterativo de chumacera — temperatura de equilibrio
      </button>
      {open === 3 && (
        <div style={box}>
          <strong>Enunciado:</strong> Diseñar una chumacera con W = 1 200 N, n = 1 800 rpm, d = 50 mm, l/d = 1. Verificar temperatura de equilibrio con ΔT ≤ 30°C.<br /><br />
          <strong>Datos base:</strong><br />
          N = 1 800/60 = 30 rps | r = 25 mm | c/r = 0.001 → c = 0.025 mm<br />
          P = W/(l·d) = 1 200/(0.050 × 0.050) = 480 000 Pa = 69.6 psi<br /><br />
          <strong>Iteración 1 (aceite SAE 30, T_op = 60°C → μ ≈ 8 μreyn = 5.5×10⁻⁵ Pa·s):</strong><br />
          S = (r/c)² × μN/P = (1000)² × (5.5×10⁻⁵ × 30 / 480 000) ≈ 3.44<br />
          Con S alto → régimen de película gruesa confirmado ✓<br /><br />
          De tablas Raimondi-Boyd (l/d = 1, S ≈ 3.44): ΔT ≈ 18°C {'<'} 30°C ✓ — <strong>diseño aceptable</strong>
        </div>
      )}
    </div>
  )
}

const sections = [
  { id: 's12-1', label: '12-1 Tipos de lubricación' },
  { id: 's12-2', label: '12-2 Viscosidad' },
  { id: 's12-3', label: '12-3 Ecuación de Petroff' },
  { id: 's12-4', label: '12-4 Lubricación estable' },
  { id: 's12-5', label: '12-5 Película gruesa' },
  { id: 's12-6', label: '12-6 Teoría hidrodinámica' },
  { id: 's12-7', label: '12-7 Diseño de chumaceras' },
  { id: 's12-8', label: '12-8 Variables de diseño' },
  { id: 's12-9', label: '12-9 Condiciones de estado estable' },
  { id: 's12-10', label: '12-10 Holgura y estabilidad' },
  { id: 's12-11', label: '12-11 Lubricación a presión' },
  { id: 's12-12', label: '12-12 Cargas y materiales' },
  { id: 's12-13', label: '12-13 Tipos de cojinetes' },
  { id: 's12-14', label: '12-14 Cojinetes de empuje' },
  { id: 's12-15', label: '12-15 Lubricación límite' },
]

export default function Cap12Page() {
  return (
    <ChapterShell
      chapterId={12}
      chapterNum="12"
      title="Cojinetes de contacto deslizante"
      subtitle="Teoría de la lubricación hidrodinámica, número de Sommerfeld, ecuación de Petroff, diseño de chumaceras de muñón y selección de lubricantes."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-amber-50 border border-amber-200">
        <h3 className="font-bold text-green-800 text-lg mb-3">Pregúntate esto antes de empezar</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Cuando aplicas aceite a una bisagra que chirría, ¿qué está pasando realmente entre las superficies metálicas?</li>
          <li>¿Por qué el aceite del motor se vuelve más líquido cuando se calienta? ¿Cómo afecta eso a la protección del motor?</li>
          <li>Si el cojinete de una máquina falla siempre al arrancar, ¿por qué será? ¿Tiene que ver con la velocidad?</li>
        </ul>
      </div>

      <SectionTitle id="s12-1">12-1 Tipos de lubricación</SectionTitle>
      <ConceptBlock title="Cinco regímenes de lubricación">
        <div className="space-y-2 text-sm">
          <div><strong>1. Hidrodinámica (película gruesa/completa)</strong> — La velocidad del muñón bombea el lubricante a una zona cuneiforme que separa completamente las superficies.</div>
          <div><strong>2. Hidrostática</strong> — El lubricante se suministra a presión externa. Útil a velocidad cero.</div>
          <div><strong>3. Elastohidrodinámica (EHD)</strong> — Ocurre en contacto rodante (engranes, cojinetes de rodamiento). Combina deformación elástica de Hertz + mecánica de fluidos.</div>
          <div><strong>4. Límite</strong> — Película delgada de pocas dimensiones moleculares. La composición química del lubricante es crucial.</div>
          <div><strong>5. Película sólida</strong> — Grafito, MoS₂. Para temperaturas extremas donde los aceites minerales no sirven.</div>
        </div>
      </ConceptBlock>
      <p className="text-gray-700 leading-relaxed mb-4">
        ¿Cuándo se elige un cojinete deslizante sobre uno de rodamiento? Los cigüeñales y bielas de motores operan miles de horas; las chumaceras de turbinas de vapor necesitan confiabilidad cercana al 100%. En esos casos, un cojinete de rodamiento puede ser inadecuado por costo, alojamientos complicados, tolerancias estrictas, espacio radial limitado, altas velocidades o efectos de inercia. El cojinete de contacto deslizante shines where rodamientos cannot.
      </p>
      <div className="my-5 p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Figura 12-1 — Curva de Stribeck: coeficiente de fricción vs número de Sommerfeld</div>
        <svg viewBox="0 0 420 260" width="100%" style={{ maxWidth: 420 }}>
          <line x1="50" y1="220" x2="390" y2="220" stroke="var(--text-3)" strokeWidth="1.5" />
          <line x1="50" y1="220" x2="50" y2="30" stroke="var(--text-3)" strokeWidth="1.5" />
          <text x="210" y="248" fontSize="12" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">S — Número de Sommerfeld</text>
          <text x="22" y="130" fontSize="12" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,22,130)">f — Coef. fricción</text>
          <path d="M 70,50 C 90,48 110,70 130,100 C 150,130 170,145 195,150 C 230,158 280,140 340,118 L 370,108"
                fill="none" stroke="var(--part-3)" strokeWidth="3" />
          <text x="78" y="42" fontSize="10" fill="#EF4444" fontFamily="monospace" fontWeight="bold">Límite</text>
          <text x="140" y="82" fontSize="10" fill="#F59E0B" fontFamily="monospace" fontWeight="bold">Mixta</text>
          <text x="280" y="112" fontSize="10" fill="var(--part-3)" fontFamily="monospace" fontWeight="bold">Hidrodinámica</text>
          <circle cx="195" cy="150" r="4" fill="#EF4444" />
          <text x="195" y="170" fontSize="9" fill="#EF4444" fontFamily="monospace" textAnchor="middle">f mínimo</text>
          <line x1="195" y1="220" x2="195" y2="150" stroke="var(--text-3)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="72" y="195" fontSize="8" fill="var(--text-3)" fontFamily="monospace">Contacto sólido</text>
          <text x="330" y="195" fontSize="8" fill="var(--text-3)" fontFamily="monospace">Película fluida completa</text>
        </svg>
      </div>

      <SectionTitle id="s12-2">12-2 Viscosidad</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La <strong>viscosidad dinámica</strong> μ mide la resistencia interna al flujo cortante. Ley de viscosidad de Newton:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>τ = μ · (du/dy) &emsp; [Pa·s = N·s/m²]</div>
          <div>τ = μ · U/h &emsp; (gradiente lineal)</div>
          <div>Conversiones: 1 reyn = 6.89×10⁶ μPa·s | 1 cP = 10⁻³ Pa·s</div>
          <div>Saybolt a SI: ν(m²/s) = (0.22t − 180/t)×10⁻⁶ [t en segundos Saybolt]</div>
        </div>
      </FormulaBox>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ backgroundColor: C, color: 'white' }}>
            <th className="px-3 py-2">Grado SAE</th>
            <th className="px-3 py-2">ν a 40°C (cSt)</th>
            <th className="px-3 py-2">ν a 100°C (cSt)</th>
            <th className="px-3 py-2">Aplicación típica</th>
          </tr></thead>
          <tbody>
            {[['10W', '28-35', '4.1', 'Motores en frío'], ['30', '90-110', '9.3-12.5', 'Motores'],
              ['40', '130-160', '12.5-16.3', 'Engranes industria'], ['90', '165-200', '14-18', 'Transmisiones']].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((v, j) => <td key={j} className="px-3 py-2 text-center">{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Figura 12-2 — Viscosidad vs temperatura para aceites ISO VG</div>
        <svg viewBox="0 0 420 250" width="100%" style={{ maxWidth: 420 }}>
          <line x1="60" y1="220" x2="390" y2="220" stroke="var(--text-3)" strokeWidth="1.5" />
          <line x1="60" y1="220" x2="60" y2="30" stroke="var(--text-3)" strokeWidth="1.5" />
          <text x="210" y="242" fontSize="12" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">Temperatura (°C)</text>
          <text x="22" y="130" fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,22,130)">ν (cSt, log)</text>
          {[20, 40, 60, 80, 100, 120].map(t => (
            <text key={t} x={60 + (t-20)*3.3} y="234" fontSize="9" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">{t}</text>
          ))}
          {[{v: 2, y: 45}, {v: 5, y: 75}, {v: 10, y: 105}, {v: 20, y: 130}, {v: 50, y: 155}, {v: 100, y: 175}, {v: 200, y: 195}].map(({v, y}) => (
            <text key={v} x="54" y={y+3} fontSize="8" fill="var(--text-2)" fontFamily="monospace" textAnchor="end">{v}</text>
          ))}
          <path d="M 60,52 C 120,65 180,85 240,112 C 300,138 340,162 370,180" fill="none" stroke="#22C55E" strokeWidth="2.5" />
          <text x="374" y="178" fontSize="9" fill="#22C55E" fontFamily="monospace">VG 220</text>
          <path d="M 60,75 C 120,86 180,104 240,128 C 300,152 340,172 370,188" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
          <text x="374" y="186" fontSize="9" fill="#3B82F6" fontFamily="monospace">VG 100</text>
          <path d="M 60,96 C 120,106 180,122 240,144 C 300,165 340,182 370,196" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <text x="374" y="194" fontSize="9" fill="#F59E0B" fontFamily="monospace">VG 68</text>
          <path d="M 60,118 C 120,127 180,141 240,160 C 300,178 340,192 370,204" fill="none" stroke="#EF4444" strokeWidth="2.5" />
          <text x="374" y="202" fontSize="9" fill="#EF4444" fontFamily="monospace">VG 32</text>
          <text x="210" y="16" fontSize="9" fill="var(--text-3)" fontFamily="monospace" textAnchor="middle">La viscosidad cae exponencialmente con la temperatura</text>
        </svg>
      </div>

      <SectionTitle id="s12-3">12-3 Ecuación de Petroff</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Petroff (1883) derivó el coeficiente de fricción para un cojinete <em>levemente cargado</em> asumiendo posición concéntrica del muñón:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>f = 2π²·(μN/P)·(r/c) &emsp; [μ en reyn, N en rps, P en psi, r/c adim.]</div>
          <div>f·(r/c) = 2π²·S &emsp; donde S es el número de Sommerfeld</div>
          <div>S = (r/c)² · (μN/P) &emsp; (adimensional)</div>
        </div>
      </FormulaBox>
      <PetroffCalc />

      <SectionTitle id="s12-4">12-4 Lubricación estable</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La curva de McKee (f vs. ZN/P) muestra la transición entre lubricación de película gruesa (estable) y delgada (inestable):
      </p>
      <FormulaBox>
        μN/P ≥ 1.7×10⁻⁶ &emsp; (lubricación de película gruesa estable)
      </FormulaBox>
      <div className="my-5 p-4 rounded-xl bg-white border border-gray-200">
        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Figura 12-3 — Efecto de cuña hidrodinámica: el muñón rotatorio bombea aceite hacia la zona de carga</div>
        <svg viewBox="0 0 320 270" width="100%" style={{ maxWidth: 320 }}>
          <defs>
            <marker id="arrowWedge" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-3)" />
            </marker>
          </defs>
          <circle cx="160" cy="145" r="115" fill="none" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="145" cy="135" r="95" fill="none" stroke="var(--part-3)" strokeWidth="3" />
          <path d="M 145,40 A 95,95 0 1,1 215,205" fill="none" stroke="var(--part-3)" strokeWidth="1.5" markerEnd="url(#arrowWedge)" strokeDasharray="4 3" opacity="0.6" />
          <text x="195" y="45" fontSize="10" fill="var(--part-3)" fontFamily="monospace">ω (rotación)</text>
          <path d="M 230,115 A 115,115 0 0,1 255,185" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="245" y1="145" x2="245" y2="210" stroke="#EF4444" strokeWidth="2" />
          <text x="248" y="190" fontSize="9" fill="#EF4444" fontFamily="monospace">h₀</text>
          <path d="M 85,70 L 110,90" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowWedge)" />
          <path d="M 65,115 L 95,120" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowWedge)" />
          <text x="35" y="100" fontSize="9" fill="#3B82F6" fontFamily="monospace">Aceite</text>
          <line x1="160" y1="145" x2="145" y2="135" stroke="#8B5CF6" strokeWidth="1.5" />
          <text x="140" y="160" fontSize="9" fill="#8B5CF6" fontFamily="monospace">e</text>
          <text x="225" y="95" fontSize="9" fill="#F59E0B" fontFamily="monospace" transform="rotate(25,225,95)">Cuña convergente</text>
          <text x="100" y="245" fontSize="8" fill="var(--text-3)" fontFamily="monospace" textAnchor="middle">Buje (estacionario)</text>
          <text x="130" y="258" fontSize="8" fill="var(--part-3)" fontFamily="monospace" textAnchor="middle">Muñón (gira)</text>
        </svg>
      </div>

      <SectionTitle id="s12-5">12-5 Formación de película gruesa</SectionTitle>
      <ConceptBlock title="Variables del cojinete de muñón">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><strong>r</strong> — radio del muñón</div>
          <div><strong>c</strong> — holgura radial (c = R_buje − r)</div>
          <div><strong>l</strong> — longitud del cojinete</div>
          <div><strong>e</strong> — excentricidad del muñón</div>
          <div><strong>ε = e/c</strong> — razón de excentricidad</div>
          <div><strong>h₀</strong> — espesor mínimo de película</div>
        </div>
        <div className="mt-2 font-mono text-xs">h₀ = c·(1 − ε)</div>
      </ConceptBlock>

      <SectionTitle id="s12-6">12-6 Teoría hidrodinámica (Reynolds)</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La ecuación de Reynolds describe la distribución de presión en la película lubricante:
      </p>
      <FormulaBox>
        ∂/∂x(h³·∂p/∂x) + ∂/∂z(h³·∂p/∂z) = 6μU·(∂h/∂x)
      </FormulaBox>
      <p className="text-gray-600 text-sm mb-3">
        Para la solución de Ocvirk (l/d corto) y la solución de Sommerfeld (l/d largo), existen tablas que relacionan S, ε, f·r/c, Q y Q_s/Q en función de l/d y ε.
      </p>

      <SommerfeldChart />
      <div className="my-6 p-4 rounded-xl border-l-4 bg-red-50 border-red-400 text-sm">
        <strong className="text-red-700"> Ojo aquí — Petroff vs Raimondi-Boyd:</strong>{' '}
        <span className="text-gray-700">La ecuación de Petroff supone ε = 0 (muñón concéntrico). Para cargas reales donde 0.3 &lt; ε &lt; 0.9, los errores de Petroff pueden superar el 100%. Usa estas tablas Raimondi-Boyd para diseño real.</span>
      </div>

      <SectionTitle id="s12-7">12-7 Consideraciones de diseño</SectionTitle>
      <ConceptBlock title="Parámetros de diseño y sus rangos típicos">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><strong>l/d</strong>: 0.5 a 1.5 (óptimo ≈ 0.5–1.0)</div>
          <div><strong>c/r</strong>: 0.001 a 0.002 (holgura típica)</div>
          <div><strong>P</strong>: 0.1 a 3.5 MPa (presión proyectada)</div>
          <div><strong>T_aceite</strong>: 70–90°C en operación</div>
          <div><strong>h₀_min</strong>: ≥ 0.5·Ra_superficies</div>
          <div><strong>S</strong> recomendado: 0.05 a 0.5</div>
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-8">12-8 Relaciones entre las variables</SectionTitle>
      <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
        <li>Calcular la presión proyectada: P = W/(l·d)</li>
        <li>Elegir lubricante SAE y temperatura de operación → μ</li>
        <li>Calcular S = (r/c)²·μN/P</li>
        <li>Entrar a tablas/diagramas Raimondi-Boyd → f·r/c, Q/rcNl, ΔT</li>
        <li>Verificar temperatura de equilibrio: T_entrada + ΔT = T_operación</li>
        <li>Verificar h₀ mínimo vs. rugosidad superficial</li>
      </ol>

      <div className="my-6 p-4 rounded-xl border-l-4 bg-red-50 border-red-400 text-sm">
        <strong className="text-red-700"> Ojo aquí — Error común:</strong>{' '}
        <span className="text-gray-700">Usar la ecuación de Petroff para cojinetes muy cargados. Petroff supone muñón concéntrico (ε = 0). Para cargas reales donde ε → 0.9, el error puede superar el 100 %. Usa las tablas Raimondi-Boyd.</span>
      </div>

      <SectionTitle id="s12-9">12-9 Condiciones de estado estable (balance térmico)</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        En operación continua, el cojinete alcanza un <strong>balance térmico</strong>: el calor generado por la fricción en la película lubricante es igual al calor disipado por convección y conducción.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>Calor generado = f · W · V &emsp; [W]</div>
          <div>Calor disipado = h · A · (T_buje − T_ambiente) &emsp; [W]</div>
          <div>ΔT = Q / (ρ · C_p · Q̇) &emsp; (aumento de temperatura del lubricante)</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="El equilibrio térmico determina la viscosidad real">
        <div className="text-sm">
          La viscosidad del lubricante depende fuertemente de la temperatura de operación. El diseñador debe iterar: supone una temperatura, determina μ, calcula S, estima ΔT, y verifica si la temperatura supuesta es consistente. Si no converge, cambia el lubricante o las dimensiones.
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-10">12-10 Efecto de la holgura en la estabilidad</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La <strong>holgura radial c</strong> es uno de los parámetros más críticos. La relación c/r típica es 0.001–0.002. Una holgura muy pequeña (c/r &lt; 0.001) dificulta el montaje y puede generar sobrecalentamiento; una holgura muy grande (c/r &gt; 0.002) reduce la capacidad de carga y puede causar vibraciones.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>c/r típico: 0.001–0.002</div>
          <div>r/c típico: 500–1000</div>
          <div>La razón de excentricidad ε = e/c se vuelve crítica cuando ε → 1</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Holgura mínima y máxima">
        <div className="text-sm">
          La holgura debe ser suficiente para permitir la formación de la cuña hidrodinámica, pero no tanto que el muñón se desplace excesivamente. Un cojinete con demasiada holgura presenta ruido y vibración, especialmente a bajas velocidades.
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-11">12-11 Cojinetes con lubricación a presión</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los cojinetes <strong>hidrostáticos</strong> reciben lubricante a presión externa mediante una bomba. Funcionan incluso a velocidad cero, lo que los hace ideales para aplicaciones de arranque/parada frecuente o cargas muy pesadas. Los cojinetes <strong>hidrodinámicos</strong> dependen de la velocidad del muñón para generar presión.
      </p>
      <ConceptBlock title="Hidrostático vs hidrodinámico">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Hidrostático:</strong> Presión externa. Funciona a N = 0. Mayor costo (bomba, tubería). Usos: telescopios, máquinas herramienta pesadas.</div>
          <div><strong>Hidrodinámico:</strong> Autogenerado por velocidad. Simple y confiable. Usos: motores, compresores, bombas centrífugas.</div>
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-12">12-12 Cargas y materiales para cojinetes</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        ¿De qué se hacen los cojinetes deslizantes? Los materiales deben tener baja fricción, buena resistencia a la fatiga superficial, capacidad de incrustar partículas extrañas y resistencia a la corrosión.
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ backgroundColor: C, color: 'white' }}>
            <th className="px-3 py-2">Material</th>
            <th className="px-3 py-2">T_max (°C)</th>
            <th className="px-3 py-2">Carga máx (MPa)</th>
            <th className="px-3 py-2">Aplicación</th>
          </tr></thead>
          <tbody>
            {[['Babbitt (Sn-base)', '150', '15–20', 'Cojinetes de motor — capa delgada sobre acero'],
              ['Bronce al plomo', '250', '30–40', 'Bujes de alta carga, maquinaria industrial'],
              ['Aluminio-estaño', '175', '25–35', 'Motores automotrices modernos'],
              ['Polímeros (PTFE, Nylon)', '120', '5–10', 'Aplicaciones sin lubricación'],
              ['Hierro fundido', '200', '20–30', 'Bujes lentos y pesados'],
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((v, j) => <td key={j} className="px-3 py-2 text-center">{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConceptBlock title="Capa de babbitt sobre respaldo de acero">
        <div className="text-sm">
          Muchos cojinetes modernos son bimetálicos o trimetal: un respaldo de acero proporciona resistencia estructural, sobre el cual se deposita una capa delgada (0.1–0.5 mm) de babbitt (aleación de Sn, Pb, Sb, Cu). El babbitt tiene excelente compatibilidad y capacidad de incrustar contaminantes.
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-13">12-13 Tipos de cojinetes deslizantes</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          { tipo: 'Casquillo (buje)', desc: 'La forma más simple: un cilindro hueco de bronce o babbitt. Se monta a presión en el alojamiento. Usos: bielas, pasadores, articulaciones.' },
          { tipo: 'Chumacera partida', desc: 'Dos mitades (tapa y base) que facilitan el montaje y ajuste. La más común en maquinaria industrial.' },
          { tipo: 'Buje de fricción seca', desc: 'Polímero o bronce sinterizado con lubricante impregnado. No requiere lubricación externa. Usos: electrodomésticos, automóvil (suspensión).' },
          { tipo: 'Cojinete de contacto total (full journal)', desc: 'El muñón está completamente rodeado por el cojinete. Es el tipo analizado en la teoría de Reynolds.' },
        ].map(({ tipo, desc }) => (
          <div key={tipo} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-semibold text-gray-700 text-sm mb-1">{tipo}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>

      <SectionTitle id="s12-14">12-14 Cojinetes de empuje (carga axial)</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los cojinetes de empuje soportan <strong>carga axial</strong> (a lo largo del eje). El ejemplo más famoso es el <strong>peldaño de Kingsbury</strong>: segmentos inclinados que generan una cuña hidrodinámica entre el disco rotatorio y los peldaños fijos.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>P_empuje = W_axial / (n · A_segmento) &emsp; (presión por segmento)</div>
          <div>h₀ mínimo controlado por inclinación del peldaño (pendiente típica: 1:1000)</div>
        </div>
      </FormulaBox>
      <ConceptBlock title="Peldaños Kingsbury — la cuña hidrodinámica axial">
        <div className="text-sm">
          Los peldaños (pads) tienen un pivote en el centro que les permite inclinarse automáticamente, formando la cuña convergente necesaria para la lubricación hidrodinámica. Cada segmento soporta una parte de la carga axial. Se usan en turbinas hidroeléctricas, hélices de barcos y compresores grandes.
        </div>
      </ConceptBlock>

      <SectionTitle id="s12-15">12-15 Cojinetes de lubricación límite (frontera)</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        En <strong>arranque y parada</strong> la velocidad es cero o muy baja, por lo que la cuña hidrodinámica no se forma. Las superficies están en contacto parcial — es la <strong>lubricación límite</strong>. La química del lubricante (aditivos EP, capas adsorbidas) es lo que protege las superficies en estas condiciones.
      </p>
      <ConceptBlock title="Lubricación límite — el momento más crítico">
        <div className="text-sm">
          La mayoría del desgaste en un cojinete ocurre durante arranque y parada, cuando el muñón está en contacto con el buje. Los aditivos antidesgaste (ZDDP) y de extrema presión (EP) forman capas protectoras que se sacrifican para evitar el desgaste del metal base. Materiales como el PTFE y el MoS₂ proporcionan lubricación sólida cuando no hay película fluida.
        </div>
      </ConceptBlock>
      <FormulaBox>
        <div className="space-y-2">
          <div>f_límite &gt; f_hidrodinámica &emsp; (factor 2–10× mayor)</div>
          <div>Aditivos EP: forman sulfuros/fosfuros que protegen a altas temperaturas de contacto</div>
          <div>Materiales autolubricantes: PTFE, grafito, MoS₂, bronces sinterizados</div>
        </div>
      </FormulaBox>

      <div className="my-6 p-4 rounded-xl border-l-4 bg-red-50 border-red-400 text-sm">
        <strong className="text-red-700"> Ojo aquí — Error común:</strong>{' '}
        <span className="text-gray-700">Olvidar verificar la temperatura de equilibrio. Un cojinete diseñado con μ a 40°C puede fallar si en operación alcanza 80°C y la viscosidad cae a la mitad. Siempre itera hasta que T_supuesta ≈ T_calculada.</span>
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
        <h3 className="font-bold text-green-800 text-lg mb-3">Resumen — Fórmulas clave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            ['Viscosidad Newton', 'τ = μ·(du/dy)'],
            ['Ecuación de Petroff', 'f = 2π²·(μN/P)·(r/c)'],
            ['Sommerfeld', 'S = (r/c)²·μN/P'],
            ['Pel. gruesa estable', 'μN/P ≥ 1.7×10⁻⁶'],
            ['Presión proyectada', 'P = W/(l·d)'],
            ['Espesor mínimo', 'h₀ = c·(1−ε)'],
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
