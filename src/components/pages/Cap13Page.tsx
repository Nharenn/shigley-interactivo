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

function GearCalc() {
  const [N1, setN1] = useState(20)
  const [N2, setN2] = useState(60)
  const [m, setM] = useState(3)
  const [phi, setPhi] = useState(20)
  const [Wt, setWt] = useState(1000)

  const d1 = m * N1
  const d2 = m * N2
  const ratio = N2 / N1
  const phiRad = phi * Math.PI / 180
  const Wr = Wt * Math.tan(phiRad)
  const W = Wt / Math.cos(phiRad)
  const Ccenter = (d1 + d2) / 2
  const p = Math.PI * m
  const rb1 = (d1 / 2) * Math.cos(phiRad)
  const rb2 = (d2 / 2) * Math.cos(phiRad)
  const ra1 = d1 / 2 + m
  const ra2 = d2 / 2 + m
  const Z = Math.sqrt(ra1 ** 2 - rb1 ** 2) + Math.sqrt(ra2 ** 2 - rb2 ** 2) - Ccenter * Math.sin(phiRad)
  const mp = Z / (p * Math.cos(phiRad))

  return (
    <div className="my-6 p-5 rounded-2xl border-2 border-green-300 bg-green-50">
      <h4 className="font-bold text-green-700 mb-4 text-lg">Calculadora — Engrane Recto</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'N₁ – Dientes piñón', val: N1, set: setN1, min: 12, max: 80, step: 1 },
          { label: 'N₂ – Dientes rueda', val: N2, set: setN2, min: 12, max: 200, step: 1 },
          { label: 'm – Módulo (mm)', val: m, set: setM, min: 1, max: 10, step: 0.5 },
          { label: 'φ – Ángulo de presión (°)', val: phi, set: setPhi, min: 14.5, max: 25, step: 0.5 },
          { label: 'Wt – Fuerza tangencial (N)', val: Wt, set: setWt, min: 100, max: 10000, step: 100 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)} className="w-full accent-green-600" />
            <span className="text-sm font-mono text-green-700">{val}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'd₁ (piñón)', value: `${d1} mm`, color: 'text-green-700' },
          { label: 'd₂ (rueda)', value: `${d2} mm`, color: 'text-green-700' },
          { label: 'Relación i', value: ratio.toFixed(2), color: 'text-blue-700' },
          { label: 'C (dist. centros)', value: `${Ccenter} mm`, color: 'text-gray-700' },
          { label: 'Wr (radial)', value: `${Wr.toFixed(0)} N`, color: 'text-amber-700' },
          { label: 'W (total)', value: `${W.toFixed(0)} N`, color: 'text-red-700' },
          { label: 'p (paso circ.)', value: `${p.toFixed(2)} mm`, color: 'text-gray-700' },
          { label: 'mp (rel. contacto)', value: mp.toFixed(3), color: mp >= 1.2 ? 'text-green-700' : 'text-red-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-2 rounded-xl bg-white border border-green-200 text-center">
            <div className="text-xs text-gray-500 mb-0.5">{label}</div>
            <div className={`text-base font-bold ${color}`}>{value}</div>
          </div>
        ))}
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
        Tres problemas de geometría y análisis de engranes (Shigley Cap. 13).
      </p>

      <button style={btn(1)} onClick={() => toggle(1)}>
        P13-1 · Geometría básica de un par de engranes rectos
      </button>
      {open === 1 && (
        <div style={box}>
          <strong>Enunciado:</strong> Un piñón de N₁ = 18 dientes engrána con una rueda de N₂ = 54 dientes. Módulo m = 4 mm, ángulo de presión φ = 20°. Calcular d₁, d₂, distancia entre centros, paso circular y radio del círculo base.<br /><br />
          <strong>Solución:</strong><br />
          d₁ = m·N₁ = 4 × 18 = <strong>72 mm</strong><br />
          d₂ = m·N₂ = 4 × 54 = <strong>216 mm</strong><br />
          C_centros = (72 + 216)/2 = <strong>144 mm</strong><br />
          p = π·m = π × 4 = <strong>12.57 mm</strong><br />
          r_b1 = (72/2)·cos20° = 36 × 0.9397 = <strong>33.83 mm</strong><br />
          Relación de velocidades: i = N₂/N₁ = 54/18 = <strong>3 : 1</strong>
        </div>
      )}

      <button style={btn(2)} onClick={() => toggle(2)}>
        P13-2 · Relación de contacto y verificación de interferencia
      </button>
      {open === 2 && (
        <div style={box}>
          <strong>Enunciado:</strong> Para el par del problema anterior (N₁=18, N₂=54, m=4, φ=20°), calcular la relación de contacto mp y verificar si hay interferencia.<br /><br />
          <strong>Solución:</strong><br />
          ra1 = d1/2 + m = 36 + 4 = 40 mm | ra2 = 108 + 4 = 112 mm<br />
          rb1 = 33.83 mm | rb2 = (216/2)·cos20° = 101.49 mm<br />
          C·sinφ = 144 × sin20° = 49.25 mm<br />
          Z = √(40²−33.83²) + √(112²−101.49²) − 49.25<br />
          Z = √(424.3) + √(2385.4) − 49.25 = 20.60 + 48.84 − 49.25 = <strong>20.19 mm</strong><br />
          mp = Z / (p·cosφ) = 20.19 / (12.57 × 0.9397) = <strong>1.71</strong> ≥ 1.2 ✓<br /><br />
          Interferencia: N_min para φ=20° ≈ 17 dientes → N₁=18 {'>'} 17 → <strong>sin interferencia</strong>
        </div>
      )}

      <button style={btn(3)} onClick={() => toggle(3)}>
        P13-3 · Análisis de fuerzas en engrane recto
      </button>
      {open === 3 && (
        <div style={box}>
          <strong>Enunciado:</strong> El piñón del problema anterior transmite 5 kW a 1 200 rpm. Calcular las fuerzas Wt, Wr y W.<br /><br />
          <strong>Solución:</strong><br />
          Torque: T = P/ω = 5 000 / (1 200×2π/60) = 5 000 / 125.66 = 39.79 N·m<br />
          Wt = 2T/d₁ = 2 × 39 790 N·mm / 72 mm = <strong>1 105 N</strong><br />
          Wr = Wt·tanφ = 1 105 × tan20° = 1 105 × 0.364 = <strong>402 N</strong><br />
          W = Wt/cosφ = 1 105 / cos20° = 1 105 / 0.9397 = <strong>1 176 N</strong><br /><br />
          Verificación: V = π·d₁·n/60 000 = π×72×1200/60 000 = 4.52 m/s<br />
          H = Wt·V = 1 105 × 4.52 = 4 997 W ≈ 5 kW ✓
        </div>
      )}
    </div>
  )
}

const sections = [
  { id: 's13-1', label: '13-1 Tipos de engranes' },
  { id: 's13-2', label: '13-2 Nomenclatura' },
  { id: 's13-3', label: '13-3 Acción conjugada' },
  { id: 's13-4', label: '13-4 Propiedades de la involuta' },
  { id: 's13-5', label: '13-5 Fundamentos' },
  { id: 's13-6', label: '13-6 Relación de contacto' },
  { id: 's13-7', label: '13-7 Interferencia' },
  { id: 's13-8', label: '13-8 Formación de dientes' },
  { id: 's13-9', label: '13-9 Engranes cónicos' },
  { id: 's13-10', label: '13-10 Engranes helicoidales' },
  { id: 's13-11', label: '13-11 Tornillo sinfín' },
  { id: 's13-12', label: '13-12 Sistemas de dientes' },
  { id: 's13-13', label: '13-13 Trenes de engranes' },
  { id: 's13-14', label: '13-14 Análisis de fuerzas' },
  { id: 's13-15', label: '13-15 Fuerzas en cónicos' },
  { id: 's13-16', label: '13-16 Fuerzas en helicoidales' },
  { id: 's13-17', label: '13-17 Fuerzas en sinfín' },
]

export default function Cap13Page() {
  return (
    <ChapterShell
      chapterId={13}
      chapterNum="13"
      title="Engranes: descripción general"
      subtitle="Geometría, cinemática y análisis de fuerzas de engranes rectos, helicoidales, cónicos y de tornillo sinfín. Trenes de engranes simples, compuestos y epicicloidales."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <div className="my-6 p-5 rounded-2xl bg-amber-50 border border-amber-300">
        <h3 className="font-bold text-amber-800 text-base mb-3">Pregúntate esto</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          <li>¿Qué tipo de engrane elegirías para conectar ejes paralelos que giren en sentido contrario?</li>
          <li>Si ves escrito "Pd = 20, N = 40" en un plano, ¿qué sabes del engrane?</li>
          <li>¿Por qué el perfil de los dientes de casi todos los engranes tiene esa forma curva característica?</li>
          <li>¿Qué crees que pasa si un piñón tiene muy pocos dientes?</li>
        </ul>
      </div>

      <SectionTitle id="s13-1">13-1 Tipos de engranes</SectionTitle>
      <ConceptBlock title="Cuatro tipos principales">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            ['Rectos (spur)', 'Dientes paralelos al eje. Ejes paralelos. Más simples. Ruido moderado.'],
            ['Helicoidales', 'Dientes inclinados (ángulo ψ). Ejes paralelos o cruzados. Silenciosos. Genera empuje axial.'],
            ['Cónicos', 'Dientes en superficie cónica. Ejes que se intersecan (típico 90°). Engranes espirales (Gleason).'],
            ['Tornillo sinfín', 'Tornillo (worm) + corona. Ejes cruzados 90°. Alta relación de reducción. Puede ser autobloqueante.'],
          ].map(([t, d]) => (
            <div key={t} className="p-3 bg-green-50 rounded border border-green-200">
              <span className="font-semibold text-green-700">{t}</span><br /><span className="text-gray-600">{d}</span>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <svg viewBox="0 0 400 220" width="100%" className="my-4" style={{ maxWidth: 480 }}>
        <rect x="0" y="0" width="190" height="100" rx="8" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <circle cx="95" cy="50" r="24" fill="none" stroke="#22C55E" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
          <rect key={a} x={88 + 24 * Math.cos(a * Math.PI / 180) - 4} y={48 + 24 * Math.sin(a * Math.PI / 180) - 6} width="8" height="12" rx="1" fill="none" stroke="#22C55E" strokeWidth="1" transform={`rotate(${a}, ${95 + 24 * Math.cos(a * Math.PI / 180)}, ${50 + 24 * Math.sin(a * Math.PI / 180)})`} />
        ))}
        <text x="95" y="80" textAnchor="middle" fontSize="10" fill="#22C55E" fontFamily="monospace">Rectos</text>

        <rect x="200" y="0" width="200" height="100" rx="8" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <g transform="translate(300,50)">
          <circle r="24" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <line x1="24" y1="-4" x2="32" y2="-6" stroke="#22C55E" strokeWidth="1.5" />
              <line x1="24" y1="4" x2="32" y2="6" stroke="#22C55E" strokeWidth="1.5" />
            </g>
          ))}
          <text x="0" y="30" textAnchor="middle" fontSize="10" fill="#22C55E" fontFamily="monospace">Helicoidales</text>
        </g>

        <rect x="0" y="110" width="190" height="100" rx="8" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <g transform="translate(50,175)">
          <polygon points="-5,-50 25,0 -5,50" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          <line x1="25" y1="0" x2="55" y2="-20" stroke="#22C55E" strokeWidth="1.5" />
          <line x1="25" y1="0" x2="55" y2="20" stroke="#22C55E" strokeWidth="1.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
            <line key={a} x1={-5 + 18 * Math.cos(a * Math.PI / 180)} y1={-50 + 10 * Math.sin(a * Math.PI / 180)} x2={-5 + 40 * Math.cos(a * Math.PI / 180)} y2={-50 + 10 * Math.sin(a * Math.PI / 180)} stroke="#22C55E" strokeWidth="0.8" />
          ))}
          <text x="-15" y="22" fontSize="10" fill="#22C55E" fontFamily="monospace">Cónicos</text>
        </g>

        <rect x="200" y="110" width="200" height="100" rx="8" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <g transform="translate(270,160)">
          <rect x="-30" y="-10" width="60" height="20" rx="4" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          {[-20, -10, 0, 10, 20].map(i => (
            <line key={i} x1={i} y1="-10" x2={i + 8} y2="10" stroke="#22C55E" strokeWidth="1.2" />
          ))}
          <circle cx="40" cy="0" r="16" fill="none" stroke="#22C55E" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <rect key={a} x={36 + 16 * Math.cos(a * Math.PI / 180) - 3} y={-3 + 16 * Math.sin(a * Math.PI / 180)} width="6" height="6" rx="1" fill="none" stroke="#22C55E" strokeWidth="1" />
          ))}
          <text x="5" y="28" textAnchor="middle" fontSize="10" fill="#22C55E" fontFamily="monospace">Sinfín</text>
        </g>
        <text x="200" y="214" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">Figura 13-1 — Tipos de engranes</text>
      </svg>

      <SectionTitle id="s13-2">13-2 Nomenclatura</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Los parámetros geométricos básicos relacionan el número de dientes N con el diámetro de paso d:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>m = d/N &emsp; (módulo, mm) &emsp; [Sistema SI]</div>
          <div>P = N/d &emsp; (paso diametral, dientes/in) &emsp; [Sistema inglés]</div>
          <div>p = πd/N = πm &emsp; (paso circular)</div>
          <div>p · P = π &emsp; (relación universal)</div>
          <div>a = m = 1/P &emsp; (cabeza/addendum)</div>
          <div>b = 1.25m = 1.25/P &emsp; (raíz/dedendum)</div>
          <div>c = 0.25m &emsp; (claro)</div>
        </div>
      </FormulaBox>

      <svg viewBox="0 0 400 240" width="100%" className="my-4" style={{ maxWidth: 480 }}>
        <circle cx="160" cy="120" r="60" fill="none" stroke="#22C55E" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="160" y="116" textAnchor="middle" fontSize="8" fill="#22C55E" fontFamily="monospace" transform="rotate(-15,160,120)">Círculo de paso</text>

        <circle cx="160" cy="120" r="50" fill="none" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="122" y="96" fontSize="8" fill="#3B82F6" fontFamily="monospace">Círculo base (r_b)</text>

        <path d="M 200,62 Q 210,67 215,72 L 235,88 Q 240,92 238,98 L 218,118 Q 215,122 210,124 L 195,130 Q 188,132 182,128 L 160,118 Q 152,114 150,108 L 140,88 Q 138,82 142,76 L 158,58 Q 162,52 168,50 Z" fill="#22C55E15" stroke="#22C55E" strokeWidth="1.5" />

        <line x1="168" y1="50" x2="168" y2="38" stroke="#EF4444" strokeWidth="1" />
        <text x="172" y="46" fontSize="9" fill="#EF4444" fontFamily="monospace">a (addendum)</text>

        <line x1="195" y1="130" x2="195" y2="144" stroke="#F59E0B" strokeWidth="1" />
        <text x="172" y="144" fontSize="9" fill="#F59E0B" fontFamily="monospace">b (dedendum)</text>

        <line x1="160" y1="120" x2="218" y2="118" stroke="#6366F1" strokeWidth="1" />
        <text x="185" y="136" fontSize="9" fill="#6366F1" fontFamily="monospace">p (paso circular)</text>

        <line x1="238" y1="98" x2="248" y2="94" stroke="#8B5CF6" strokeWidth="1" />
        <text x="238" y="108" fontSize="9" fill="#8B5CF6" fontFamily="monospace">c (claro)</text>

        <text x="200" y="234" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">Figura 13-2 — Nomenclatura del diente</text>
      </svg>

      <div className="my-5 p-4 rounded-xl border-l-4 bg-red-50 border-red-400">
        <div className="font-semibold text-red-700 mb-1">⚠ Ojo aquí — Error común</div>
        <div className="text-gray-700 text-sm leading-relaxed">
          Confundir el módulo m con el paso diametral P. En SI: <strong>m = d/N</strong> (en mm); en inglés: <strong>P = N/d</strong> (en pulgadas⁻¹). Si el problema dice "Pd = 20", el módulo es m = 25.4/20 = 1.27 mm, NO 20 mm. Nunca combines sistemas en un mismo cálculo.
        </div>
      </div>

      <SectionTitle id="s13-3">13-3 Acción conjugada y Perfil Involuta</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-4">
        La <strong>acción conjugada</strong> produce una relación constante de velocidades angulares. El perfil <strong>involuta</strong> es el estándar universal porque todos los puntos de contacto ocurren sobre una misma línea recta (línea de acción) y es tolerante a variaciones en la distancia entre centros.
      </p>
      <FormulaBox>
        r_b = (d/2)·cosφ &emsp; (radio del círculo base) &emsp; φ = ángulo de presión (std: 20° o 25°)
      </FormulaBox>

      <SectionTitle id="s13-4">13-4 Propiedades de la involuta</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        Imagina que enrollas una cuerda alrededor de un cilindro (el círculo base) y atas un lápiz en el extremo. Si mantienes la cuerda tensa mientras la desenrollas, el lápiz dibuja una curva: esa es la <strong>involuta del círculo</strong>. Esta curva es el perfil que usan prácticamente todos los engranes modernos.
      </p>

      <svg viewBox="0 0 400 250" width="100%" className="my-4" style={{ maxWidth: 480 }}>
        <circle cx="130" cy="140" r="60" fill="none" stroke="#22C55E" strokeWidth="2" />
        <text x="130" y="136" textAnchor="middle" fontSize="9" fill="#22C55E" fontFamily="monospace">Círculo base</text>

        <line x1="130" y1="140" x2="130" y2="70" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="130" cy="70" r="3" fill="#3B82F6" />
        <text x="134" y="68" fontSize="9" fill="#3B82F6" fontFamily="monospace">Punto de inicio</text>

        <line x1="130" y1="70" x2="310" y2="70" stroke="#EF4444" strokeWidth="1.5" />
        <text x="220" y="64" fontSize="9" fill="#EF4444" fontFamily="monospace">Línea que rueda sin deslizar</text>

        <circle cx="250" cy="70" r="3" fill="#EF4444" />
        <text x="254" y="66" fontSize="9" fill="#EF4444" fontFamily="monospace">Punto trazador</text>

        <path d="M 130,70 Q 145,85 160,95 Q 180,108 200,115 Q 220,120 240,118 Q 260,114 280,104 Q 300,90 315,72" fill="none" stroke="#8B5CF6" strokeWidth="2" />
        <text x="230" y="134" fontSize="9" fill="#8B5CF6" fontFamily="monospace">Involuta: curva trazada por el punto</text>

        <line x1="130" y1="140" x2="280" y2="104" stroke="#6366F1" strokeWidth="0.8" strokeDasharray="2 3" />
        <text x="170" y="156" fontSize="9" fill="#6366F1" fontFamily="monospace">θ · r_b = longitud de arco = distancia recorrida</text>

        <text x="200" y="244" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">Figura 13-3/4 — Construcción de la involuta</text>
      </svg>

      <p className="text-gray-700 leading-relaxed mb-3">
        La magia de la involuta es que dos engranes con este perfil mantienen una relación de velocidades constante aunque se separen o acerquen ligeramente. La línea de acción —la recta tangente a ambos círculos base— siempre pasa por el punto de paso. Mientras el ángulo de presión φ se mantenga, la transmisión es perfecta.
      </p>

      <SectionTitle id="s13-5">13-5 Fundamentos — Relación de velocidades</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>|ω₁/ω₂| = N₂/N₁ = d₂/d₁ = r₂/r₁</div>
          <div>C = (d₁+d₂)/2 &emsp; (distancia entre centros)</div>
          <div>V_pitch = r₁ω₁ = r₂ω₂ &emsp; (velocidad en el paso)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s13-6">13-6 Relación de contacto</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La relación de contacto mp indica cuántos pares de dientes están en contacto en promedio. Para engranaje sin vibración se requiere mp ≥ 1.2:
      </p>
      <FormulaBox>
        mp = [√(ra1²−rb1²) + √(ra2²−rb2²) − C·sinφ] / (p·cosφ)
      </FormulaBox>

      <SectionTitle id="s13-7">13-7 Interferencia</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La interferencia ocurre cuando la parte radial del diente de un engrane golpea o interfiere con la involuta del otro. Se presenta cuando el número de dientes es muy pequeño o el ángulo de presión es demasiado pequeño.
      </p>
      <FormulaBox>
        N_min = 2k/sin²φ · (m + √(m²+1+2m·sin²φ)) &emsp; [k=1 para addendum estándar]
      </FormulaBox>
      <p className="text-gray-600 text-sm">Para φ=20°: N_min ≈ 17 dientes. Para φ=25°: N_min ≈ 12. Solución: tallar (undercut), aumentar N, o aumentar φ.</p>

      <div className="my-6 p-4 rounded-2xl bg-white border border-gray-200">
        <div className="font-mono text-xs text-gray-500 uppercase mb-3" style={{ color: C }}>Figura 13-7 — Interferencia: la punta del diente mayor invade el flanco del piñón</div>
        <svg viewBox="0 0 420 260" width="100%" style={{ maxWidth: 420 }}>
          <defs>
            <marker id="arrowInt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--text-3)" /></marker>
          </defs>
          <circle cx="130" cy="130" r="55" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="130" y="126" textAnchor="middle" fontSize="9" fill="#3B82F6" fontFamily="monospace">Círc. base</text>
          <circle cx="130" cy="130" r="70" fill="none" stroke={C} strokeWidth="1.5" />
          <text x="130" y="148" textAnchor="middle" fontSize="8" fill={C} fontFamily="monospace">Círc. paso</text>
          <circle cx="130" cy="130" r="82" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 3" />
          <text x="130" y="88" textAnchor="middle" fontSize="8" fill="#EF4444" fontFamily="monospace">Círc. exterior</text>
          <g transform="translate(280,100)">
            <circle cx="0" cy="0" r="90" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
            <circle cx="0" cy="0" r="110" fill="none" stroke={C} strokeWidth="1" opacity="0.4" />
            <circle cx="0" cy="0" r="128" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
            <text x="0" y="-4" textAnchor="middle" fontSize="11" fill="var(--text-2)" fontFamily="monospace" fontWeight="bold">Engrane mayor</text>
            <text x="0" y="10" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">(N grande)</text>
            <path d="M -8,-128 L -8,-110 L -12,-110 L -12,-128" fill="var(--bg-2)" stroke="#EF4444" strokeWidth="1.5" />
            <path d="M 8,-128 L 8,-110 L 12,-110 L 12,-128" fill="var(--bg-2)" stroke="#EF4444" strokeWidth="1.5" />
            <line x1="0" y1="-128" x2="0" y2="140" stroke="var(--text-3)" strokeWidth="0.5" strokeDasharray="2 3" />
          </g>
          <rect x="220" y="175" width="190" height="52" rx="4" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1" />
          <text x="315" y="192" textAnchor="middle" fontSize="9" fill="#EF4444" fontFamily="monospace" fontWeight="bold">Zona de interferencia</text>
          <text x="315" y="205" textAnchor="middle" fontSize="8" fill="var(--text-3)" fontFamily="monospace">La punta del diente grande</text>
          <text x="315" y="218" textAnchor="middle" fontSize="8" fill="var(--text-3)" fontFamily="monospace">entra en excavación (undercut)</text>
          <path d="M 195,165 C 210,175 220,180 230,182" fill="none" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowInt)" />
          <text x="35" y="20" fontSize="9" fill={C} fontFamily="monospace" fontWeight="bold">Piñón (N pequeño)</text>
          <text x="35" y="33" fontSize="8" fill="var(--text-3)" fontFamily="monospace">φ = 20° → N_min ≈ 17</text>
          <text x="35" y="46" fontSize="8" fill="var(--text-3)" fontFamily="monospace">φ = 25° → N_min ≈ 12</text>
          <path d="M 140,5 C 170,5 270,5 310,-5" fill="none" stroke="#EF4444" strokeWidth="0.8" strokeDasharray="3 2" />
        </svg>
      </div>

      <div className="my-5 p-4 rounded-xl border-l-4 bg-red-50 border-red-400">
        <div className="font-semibold text-red-700 mb-1">⚠ Ojo aquí — Error común</div>
        <div className="text-gray-700 text-sm leading-relaxed">
          Confundir interferencia con relación de contacto baja. <strong>Interferencia</strong> es un problema geométrico: los dientes chocan físicamente. <strong>mp &lt; 1.2</strong> es un problema de funcionamiento: hay vibración porque a veces ningún diente está en contacto verdadero. La interferencia causa falla inmediata; mp bajo causa ruido y desgaste acelerado.
        </div>
      </div>

      <SectionTitle id="s13-8">13-8 Formación de dientes</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        No todos los engranes se fabrican igual. El método de manufactura determina la precisión, el costo y la calidad superficial del diente. La norma AGMA clasifica la precisión con números Q —entre más alto, más preciso.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {[
          ['Tallado (Hobbing)', 'Método más común. Una fresa madre (hob) gira mientras el engrane en blanco gira sincronizado. Produce perfiles involuta por generación continua. Precisión Q5–Q9.'],
          ['Fresado (Milling)', 'Se usa un cortador de forma para cada espacio entre dientes. Menos eficiente, pero útil para prototipos o engranes muy grandes. Precisión Q3–Q6.'],
          ['Brochado (Broaching)', 'Una brocha con dientes progresivos corta el perfil completo en una pasada. Ideal para engranes internos. Precisión Q7–Q9.'],
          ['Rectificado (Grinding)', 'Proceso de acabado después del tratamiento térmico. Corrige distorsiones y mejora el acabado superficial. Precisión Q10–Q15.'],
        ].map(([t, d]) => (
          <div key={t} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="font-semibold text-gray-700 text-sm mb-1">{t}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-sm">
        La precisión AGMA Q se correlaciona con la tolerancia del paso entre dientes. Engranes de precisión (Q10+) se usan en aeronáutica y transmisiones de alta velocidad. Engranes comerciales (Q5–Q7) son suficientes para la mayoría de aplicaciones industriales.
      </p>

      <SectionTitle id="s13-9">13-9 Engranes cónicos rectos</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>γ₁ = arctan(N₁/N₂) &emsp; γ₂ = 90° − γ₁ &emsp; (ángulos del cono primitivo)</div>
          <div>d₁ = 2R·sinγ₁ &emsp; (diámetro de paso)</div>
          <div>F ≤ R/3 &emsp; y &emsp; F ≤ 10/P &emsp; (ancho de cara recomendado)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s13-10">13-10 Engranes helicoidales paralelos</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>pn = pt·cosψ &emsp; mn = mt·cosψ &emsp; (relación paso normal/transversal)</div>
          <div>φn = arctan(tanφt·cosψ) &emsp; (ángulo de presión normal)</div>
          <div>C = (N₁+N₂)·mt/2 = (N₁+N₂)mn/(2cosψ)</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s13-11">13-11 Engranes de tornillo sinfín</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>C = (d_worm + d_gear)/2</div>
          <div>e = tanλ(1 − f·tanλ·secφn) / (tanλ + f·secφn) &emsp; (eficiencia)</div>
          <div>λ = arctan(p_ax·N_worm / (πd_worm)) &emsp; (ángulo de avance)</div>
          <div>Autobloqueante: f {'>'} tanλ</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s13-12">13-12 Sistemas de dientes</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        No todos los dientes de engrane tienen la misma altura. Existen dos sistemas principales que definen las proporciones del diente:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          ['Diente de profundidad completa (Full depth)', 'a = 1/P (o a = m), b = 1.25/P (o b = 1.25m). Es el estándar AGMA. Máxima relación de contacto, pero mayor riesgo de interferencia con piñones pequeños.'],
          ['Diente rebajado (Stub tooth)', 'a = 0.8/P, b = 1/P. Dientes más cortos y fuertes. Menor relación de contacto, pero soportan mayores cargas y reducen interferencia. Usados en engranes de alta resistencia.'],
        ].map(([t, d]) => (
          <div key={t} className="p-3 rounded-xl bg-gray-50 border border-amber-300">
            <div className="font-semibold text-amber-800 text-sm mb-1">{t}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{d}</div>
          </div>
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed mb-3">
        El ángulo de presión también varía: 14.5° (histórico, ya no se recomienda), 20° (estándar actual AGMA) y 25° (para cargas pesadas, mayor resistencia en la raíz). Todos los engranes que engranan deben tener el mismo φ y el mismo paso.
      </p>

      <SectionTitle id="s13-13">13-13 Trenes de engranes</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>e = ω_salida/ω_entrada = (Π N_conductores) / (Π N_conducidos)</div>
          <div>Tren compuesto: los engranajes del mismo eje comparten ω</div>
          <div>Epicicloidal: e = ω_arm + (ω_sun−ω_arm)·N_ring/N_sun</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s13-14">13-14 Análisis de fuerzas: engranes rectos</SectionTitle>
      <FormulaBox>
        <div className="space-y-2">
          <div>W = Wt/cosφ &emsp; (fuerza total en la línea de acción)</div>
          <div>Wr = Wt·tanφ &emsp; (fuerza radial → carga en cojinetes)</div>
          <div>Wt = T/r = 2T/d &emsp; (fuerza tangencial de transmisión de potencia)</div>
          <div>Potencia: H = Wt·V / 33 000 [hp] = Wt[N]·V[m/s] [W]</div>
        </div>
      </FormulaBox>
      <GearCalc />

      <SectionTitle id="s13-15">13-15 Análisis de fuerzas: engranes cónicos</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        En engranes cónicos rectos, la fuerza resultante tiene tres componentes. La fuerza tangencial Wt se calcula con el diámetro de paso medio d_m:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>Wt = 2T / d_m &emsp; (d_m = diámetro de paso medio)</div>
          <div>Wr = Wt·tanφ·cosγ &emsp; (fuerza radial)</div>
          <div>Wa = Wt·tanφ·sinγ &emsp; (fuerza axial / de empuje)</div>
          <div>γ = ángulo del cono primitivo</div>
        </div>
      </FormulaBox>
      <p className="text-gray-700 leading-relaxed mb-3">
        La dirección de Wr siempre apunta hacia el centro del engrane, y Wa apunta hacia el ápice del cono —esto es crítico al seleccionar los cojinetes. En engranes cónicos espirales (Gleason) hay además una componente adicional por la inclinación del diente.
      </p>

      <SectionTitle id="s13-16">13-16 Análisis de fuerzas: engranes helicoidales</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        La hélice del diente introduce una componente axial Wa que no existe en los rectos. La fuerza total se descompone en tres direcciones ortogonales:
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>Wt = 2T / d &emsp; (tangencial — transmite potencia)</div>
          <div>Wr = Wt·tanφ_n / cosψ &emsp; (radial — carga cojinetes)</div>
          <div>Wa = Wt·tanψ &emsp; (axial — empuje, debe ser absorbida por cojinete de empuje)</div>
          <div>φ_n = ángulo de presión normal, ψ = ángulo de hélice</div>
        </div>
      </FormulaBox>
      <p className="text-gray-700 leading-relaxed mb-3">
        La fuerza axial Wa puede ser grande —un ψ = 30° produce Wa ≈ 0.58·Wt. Por eso los engranes helicoidales requieren cojinetes de empuje o se montan en pares opuestos (doble hélice o chevron) para cancelar el empuje axial.
      </p>

      <SectionTitle id="s13-17">13-17 Análisis de fuerzas: tornillo sinfín</SectionTitle>
      <p className="text-gray-700 leading-relaxed mb-3">
        En un par tornillo sinfín-corona, las fuerzas se relacionan de manera inversa: la fuerza tangencial del tornillo es la fuerza axial de la corona, y viceversa.
      </p>
      <FormulaBox>
        <div className="space-y-2">
          <div>Wt_w = W_a_g &emsp; (tangencial del tornillo = axial de la corona)</div>
          <div>Wt_g = W_a_w &emsp; (tangencial de la corona = axial del tornillo)</div>
          <div>Wr = Wt·tanφ &emsp; (radial — igual para ambos)</div>
          <div>η = [cosφ_n − f·tanλ] / [cosφ_n + f·cotλ] &emsp; (eficiencia)</div>
          <div>λ = ángulo de avance, f = coeficiente de fricción</div>
        </div>
      </FormulaBox>
      <p className="text-gray-700 leading-relaxed mb-3">
        La eficiencia del sinfín es típicamente baja (40–90%) debido a la fricción de deslizamiento. Cuando f {'>'} tanλ, el sistema es autobloqueante: la corona no puede hacer girar al tornillo. Esto es útil en cabrestantes y elevadores, pero ineficiente para transmisión continua de potencia.
      </p>

      <div className="my-5 p-4 rounded-xl border-l-4 bg-red-50 border-red-400">
        <div className="font-semibold text-red-700 mb-1">⚠ Ojo aquí — Error común</div>
        <div className="text-gray-700 text-sm leading-relaxed">
          En el análisis de fuerzas de un sinfín, la fuerza tangencial del tornillo corresponde a la fuerza axial de la corona, no a la tangencial. Es tentador asumir que Wt_w = Wt_g, pero eso es incorrecto: la potencia se transmite por el cambio de dirección de 90°. Siempre verifica las direcciones relativas de las fuerzas.
        </div>
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
        <h3 className="font-bold text-green-800 text-lg mb-3">Resumen — Fórmulas clave</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            ['Módulo (SI)', 'm = d/N'],
            ['Paso diametral', 'P = N/d (in⁻¹)'],
            ['Relación vel.', 'ω₁/ω₂ = N₂/N₁'],
            ['Fuerza tangencial', 'Wt = 2T/d'],
            ['Fuerza radial', 'Wr = Wt·tanφ'],
            ['Rel. contacto', 'mp ≥ 1.2 (mín.)'],
            ['Fza. axial helicoidal', 'Wa = Wt·tanψ'],
            ['Fzas. cónicos', 'Wr = Wt·tanφ·cosγ, Wa = Wt·tanφ·sinγ'],
            ['Eficiencia sinfín', 'η = [cosφ_n − f·tanλ] / [cosφ_n + f·cotλ]'],
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
