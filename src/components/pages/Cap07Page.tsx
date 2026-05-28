'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'

const C = 'var(--part-3)'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} style={{ fontSize: 22, fontWeight: 700, marginTop: 44, marginBottom: 16, color: C, scrollMarginTop: 80 }}>{children}</h2>
}
function SubSection({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} style={{ fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-1)', scrollMarginTop: 80 }}>{children}</h3>
}
function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderLeft: `3px solid ${C}`, borderRadius: 'var(--radius)', padding: '14px 18px', margin: '16px 0', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2, overflowX: 'auto' }}>
      {children}
    </div>
  )
}
function ConceptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{title}</div>
      <div style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}
function PreguntaBlock({ text }: { text: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', padding: '12px 16px', margin: '12px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Pregúntate esto:</div>
      <p style={{ color: 'var(--text-1)', fontSize: 14, fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>"{text}"</p>
    </div>
  )
}
function OjoBlock({ text }: { text: string }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--danger)', borderLeft: '4px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', margin: '12px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>&#9888; Ojo aquí</div>
      <p style={{ color: 'var(--text-2)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  )
}
function p(text: string) {
  return <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>{text}</p>
}
function FigShaftAssembly() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 7-1 — Ensamble típico de flecha escalonada</div>
      <svg viewBox="0 0 500 140" style={{ width: '100%', maxWidth: 500, display: 'block', margin: '0 auto' }}>
        <defs>
          <pattern id="hatch7" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="var(--text-3)" strokeWidth="0.8" opacity="0.4" /></pattern>
        </defs>
        <rect x="30" y="50" width="20" height="60" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="50" y="42" width="60" height="76" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="110" y="30" width="90" height="100" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="200" y="42" width="60" height="76" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="260" y="50" width="100" height="60" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <rect x="360" y="42" width="60" height="76" fill="url(#hatch7)" stroke="var(--text-2)" strokeWidth="1.5" rx="4" />
        <rect x="420" y="50" width="30" height="60" fill="var(--bg-1)" stroke="var(--text-2)" strokeWidth="1.5" />
        <line x1="280" y1="50" x2="280" y2="30" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="280" y1="30" x2="360" y2="30" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
        <polygon points="360,30 350,26 350,34" fill="var(--accent)" />
        <text x="320" y="24" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">hombro</text>
        <line x1="50" y1="20" x2="50" y2="10" stroke="var(--success)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="35" y="10" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)">cojinete</text>
        <line x1="130" y1="132" x2="130" y2="145" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="130" y="138" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">cuña</text>
        <line x1="220" y1="132" x2="220" y2="145" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="220" y="138" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">escalón</text>
        <line x1="390" y1="130" x2="390" y2="145" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="390" y="138" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">anillo Seeger</text>
      </svg>
    </div>
  )
}
function FigGoodmanDiagram() {
  const w = 360, h = 280, m = 40
  const Se = 200, Sut = 400
  const sx = (w - 2 * m) / Sut, sy = (h - 2 * m) / Se
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 7-13 — Diagrama de Goodman modificado</div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', maxWidth: w, display: 'block', margin: '0 auto' }}>
        <line x1={m} y1={h - m} x2={w - m} y2={h - m} stroke="var(--border)" strokeWidth="1" />
        <line x1={m} y1={m} x2={m} y2={h - m} stroke="var(--border)" strokeWidth="1" />
        <text x={m - 6} y={m - 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="end">σa</text>
        <text x={w - m + 4} y={h - m + 4} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">σm</text>
        <circle cx={m} cy={h - m - Se * sy} r="3" fill="var(--text-3)" />
        <text x={m + 6} y={h - m - Se * sy + 3} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">(0, Se)</text>
        <circle cx={m + Sut * sx} cy={h - m} r="3" fill="var(--text-3)" />
        <text x={m + Sut * sx - 10} y={h - m + 14} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">(Sut, 0)</text>
        <line x1={m} y1={h - m - Se * sy} x2={m + Sut * sx} y2={h - m} stroke={C} strokeWidth="2" />
        <text x={m + 60} y={h - m - Se * sy + 50} fill={C} fontSize="9" fontFamily="var(--font-mono)" transform={`rotate(33, ${m + 60}, ${h - m - Se * sy + 50})`}>Línea Goodman</text>
        <circle cx={m + 150 * sx} cy={h - m - 120 * sy} r="4" fill="var(--warning)" />
        <text x={m + 150 * sx + 10} y={h - m - 120 * sy + 3} fill="var(--warning)" fontSize="8" fontFamily="var(--font-mono)">Punto op.</text>
        <line x1={m + 150 * sx} y1={h - m - 120 * sy} x2={m} y2={h - m - 120 * sy} stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1={m + 150 * sx} y1={h - m - 120 * sy} x2={m + 150 * sx} y2={h - m} stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="2,2" />
      </svg>
    </div>
  )
}
function FigDeflectionDiagrams() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 7-11 — Diagramas V, M, pendiente y deflexión en dos planos</div>
      <svg viewBox="0 0 360 260" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
        {[0, 1].map((plane) => {
          const oy = plane * 130
          const n = 9
          const pts = [
            [0, 80], [40, 80], [40, 20], [100, 20],
            [100, 50], [160, 50], [160, 50], [220, 50],
            [220, 20], [280, 20], [280, 80], [320, 80]
          ]
          const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${oy + p[1]}`).join(' ')
          return (
            <g key={plane}>
              <line x1={0} y1={oy + 80} x2={320} y2={oy + 80} stroke="var(--border-soft)" strokeWidth="0.5" />
              <path d={path} fill="none" stroke={plane === 0 ? 'var(--accent)' : 'var(--success)'} strokeWidth="1.5" />
              <text x={330} y={oy + 50} fill={plane === 0 ? 'var(--accent)' : 'var(--success)'} fontSize="8" fontFamily="var(--font-mono)">
                plano {plane === 0 ? 'XY' : 'XZ'}
              </text>
            </g>
          )
        })}
        <line x1={0} y1={130} x2={320} y2={130} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4,2" />
        <text x={10} y={15} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">V</text>
        <text x={10} y={145} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">M</text>
        <text x={10} y={215} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">y, θ</text>
        <path d="M0,210 Q80,180 160,210 Q240,240 320,210" fill="none" stroke="var(--danger)" strokeWidth="1.2" />
        <text x={330} y={215} fill="var(--danger)" fontSize="8" fontFamily="var(--font-mono)">deflexión</text>
      </svg>
    </div>
  )
}
function FigFirstMode() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 7-13 — Primer modo de vibración de un eje simplemente apoyado</div>
      <svg viewBox="0 0 360 120" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
        <line x1={60} y1={90} x2={300} y2={90} stroke="var(--border-soft)" strokeWidth="0.5" strokeDasharray="4,3" />
        <path d="M60,90 Q180,10 300,90" fill="none" stroke={C} strokeWidth="2" />
        <line x1={180} y1={10} x2={180} y2={90} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x={180} y={100} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">L/2</text>
        <circle cx={60} cy={90} r="3" fill="var(--text-1)" />
        <circle cx={300} cy={90} r="3" fill="var(--text-1)" />
        <polygon points="315,90 308,85 308,95" fill="var(--text-2)" />
        <text x={185} y={7} fill={C} fontSize="9" fontFamily="var(--font-mono)">ω₁ (1er modo)</text>
        <path d="M60,90 Q120,40 180,15 Q240,40 300,90" fill="none" stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x={245} y={30} fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">ω₂ (2do modo)</text>
      </svg>
    </div>
  )
}

function ShaftDesignCalc() {
  const [Ma, setMa] = useState(2500);
  const [Ta, setTa] = useState(0);
  const [Mm, setMm] = useState(0);
  const [Tm, setTm] = useState(3000);
  const [Kf, setKf] = useState(1.5);
  const [Kfs, setKfs] = useState(1.3);
  const [Se, setSe] = useState(200);
  const [Sut, setSut] = useState(400);
  const [n, setN] = useState(2.0);

  const termA = Math.sqrt(4 * (Kf * Ma) ** 2 + 3 * (Kfs * Ta) ** 2);
  const termM = Math.sqrt(4 * (Kf * Mm) ** 2 + 3 * (Kfs * Tm) ** 2);
  const inner = (termA / Se) + (termM / Sut);
  const d_cubed = (16 * n / Math.PI) * inner;
  const d = Math.cbrt(d_cubed);
  const d3 = d ** 3;
  const sigma_a = (16 / (Math.PI * d3)) * termA;
  const sigma_m = (16 / (Math.PI * d3)) * termM;
  const nCheck = 1 / (sigma_a / Se + sigma_m / Sut);

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid ${C}`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Calculadora DE-Goodman para Ejes</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {[
          { label: 'Ma – Mom. alternante (N·mm)', val: Ma, set: setMa, min: 0, max: 10000, step: 100 },
          { label: 'Ta – Par alternante (N·mm)', val: Ta, set: setTa, min: 0, max: 5000, step: 100 },
          { label: 'Mm – Mom. medio (N·mm)', val: Mm, set: setMm, min: 0, max: 5000, step: 100 },
          { label: 'Tm – Par medio (N·mm)', val: Tm, set: setTm, min: 0, max: 10000, step: 100 },
          { label: 'Kf – Conc. flexión', val: Kf, set: setKf, min: 1.0, max: 3.0, step: 0.05 },
          { label: 'Kfs – Conc. torsión', val: Kfs, set: setKfs, min: 1.0, max: 3.0, step: 0.05 },
          { label: 'Se – Lím. fatiga (MPa)', val: Se, set: setSe, min: 50, max: 500, step: 10 },
          { label: 'Sut – Resist. última (MPa)', val: Sut, set: setSut, min: 200, max: 1500, step: 10 },
          { label: 'n – Factor seguridad deseado', val: n, set: setN, min: 1.0, max: 4.0, step: 0.1 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>{label}</label>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)}
              style={{ width: '100%', accentColor: typeof C === 'string' ? C.replace('var(--part-3)', '#22C55E') : '#22C55E' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{typeof val === 'number' && step < 1 ? val.toFixed(2) : val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12, marginTop: 16 }}>
        {[
          { label: 'Diámetro mínimo', value: `${d.toFixed(2)} mm`, clr: C },
          { label: "σ'a", value: `${sigma_a.toFixed(1)} MPa`, clr: 'var(--accent)' },
          { label: "σ'm", value: `${sigma_m.toFixed(1)} MPa`, clr: 'var(--warning)' },
          { label: 'n verificado', value: nCheck.toFixed(2), clr: nCheck >= n ? 'var(--success)' : 'var(--danger)' },
        ].map(({ label, value, clr }) => (
          <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: clr }}>{value}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Criterio DE-Goodman | d = (16n/π·{'{…}'})^(1/3)</p>
    </div>
  )
}

function CriticalSpeedCalc() {
  const [w1, setW1] = useState(35);
  const [w2, setW2] = useState(55);
  const [y1, setY1] = useState(0.01945);
  const [y2, setY2] = useState(0.02722);

  const g = 386.1;
  const sumWY = w1 * y1 + w2 * y2;
  const sumWY2 = w1 * y1 ** 2 + w2 * y2 ** 2;
  const omega = Math.sqrt(g * sumWY / sumWY2);
  const rpm = omega * 60 / (2 * Math.PI);
  const omega11 = Math.sqrt(g / (Math.max(w1, 0.001) * (Math.max(y1 / Math.max(w1, 0.001), 0.00001))));
  const omega22 = Math.sqrt(g / (Math.max(w2, 0.001) * (Math.max(y2 / Math.max(w2, 0.001), 0.00001))));
  const omegaDunk = omega11 && omega22 ? 1 / Math.sqrt(1 / omega11 ** 2 + 1 / omega22 ** 2) : 0;
  const rpmDunk = omegaDunk * 60 / (2 * Math.PI);

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid var(--part-3)`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Velocidades Críticas — Rayleigh y Dunkerley</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {[
          { label: 'w₁ (lbf)', val: w1, set: setW1, min: 5, max: 100, step: 1 },
          { label: 'w₂ (lbf)', val: w2, set: setW2, min: 5, max: 100, step: 1 },
          { label: 'y₁ – deflexión (pulg)', val: y1, set: setY1, min: 0.001, max: 0.1, step: 0.001 },
          { label: 'y₂ – deflexión (pulg)', val: y2, set: setY2, min: 0.001, max: 0.1, step: 0.001 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>{label}</label>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)}
              style={{ width: '100%', accentColor: '#22C55E' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{val.toFixed(4)}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>Rayleigh ω₁</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C }}>{omega.toFixed(1)} rad/s</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-2)' }}>{rpm.toFixed(0)} rpm</div>
        </div>
        <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>Dunkerley ω₁</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C }}>{omegaDunk.toFixed(1)} rad/s</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-2)' }}>{rpmDunk.toFixed(0)} rpm</div>
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Rayleigh: ω₁ = √(g·Σwᵢyᵢ / Σwᵢyᵢ²) | Dunkerley: 1/ω₁² ≈ Σ(1/ωᵢᵢ²)</p>
    </div>
  )
}

const sections = [
  { id: 's7-1', label: '7-1 Introducción' },
  { id: 's7-2', label: '7-2 Materiales' },
  { id: 's7-3', label: '7-3 Configuración' },
  { id: 's7-4', label: '7-4 Diseño para esfuerzo' },
  { id: 's7-5', label: '7-5 Deflexión' },
  { id: 's7-6', label: '7-6 Velocidades críticas' },
  { id: 's7-7', label: '7-7 Componentes' },
  { id: 's7-8', label: '7-8 Límites y ajustes' },
]

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const problems = [
    {
      num: 1,
      enunciado: 'Un eje de acero AISI 1040 HR tiene Sut = 380 MPa y Se = 180 MPa. Está sometido a Ma = 3000 N·mm (momento alternante), Tm = 5000 N·mm (par medio) y Mm = Ta = 0. Factores de concentración Kf = 1.8 y Kfs = 1.5. Usando el criterio DE-Goodman con n = 2, calcular el diámetro mínimo requerido.',
      respuesta: 'termA = √(4(1.8×3000)²) = 10800 N·mm; termM = √(3(1.5×5000)²) = 12990 N·mm; d³ = (16×2/π)×(10800/180+12990/380) = 10.186×94.2 = 960 mm³; d = ∛960 ≈ 9.86 mm → usar d_std = 10 mm.',
    },
    {
      num: 2,
      enunciado: 'Un eje tiene dos masas: w₁ = 50 lbf con deflexión y₁ = 0.012 pulg y w₂ = 30 lbf con y₂ = 0.008 pulg. Usando la fórmula de Rayleigh (g = 386 pulg/s²), calcular la primera velocidad crítica ω₁ en rad/s y en rpm.',
      respuesta: 'ΣwᵢYᵢ = 50×0.012+30×0.008 = 0.84; ΣwᵢYᵢ² = 50×0.000144+30×0.000064 = 0.00912; ω₁ = √(386×0.84/0.00912) = √35566 ≈ 188.6 rad/s → 1801 rpm.',
    },
    {
      num: 3,
      enunciado: 'Con el eje dimensionado en el Problema 1 (d = 10 mm) y los mismos parámetros, verificar el factor de seguridad n real por DE-Goodman.',
      respuesta: 'd³ = 1000 mm³; σ\'_a = (16/π×1000)×10800 ≈ 54.9 MPa; σ\'_m = (16/π×1000)×12990 ≈ 66.1 MPa; n = 1/(54.9/180+66.1/380) = 1/(0.305+0.174) ≈ 2.09 — el diseño es ligeramente más conservador que n = 2.',
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

export default function Cap07Page() {
  return (
    <ChapterShell
      chapterId={7}
      chapterNum="07"
      title="Ejes, flechas y sus componentes"
      subtitle="Diseño de ejes giratorios sometidos a fatiga combinada (flexión + torsión), análisis de deflexión, velocidades críticas de resonancia y componentes de sujeción."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="s7-1">7-1 Introducción</SectionTitle>
      <PreguntaBlock text="¿Un eje es una flecha? ¿O una flecha es un eje? Vamos a aclarar esta confusión clásica de una vez por todas." />
      {p('Una <strong>flecha</strong> (shaft) es un elemento rotatorio, por lo general de sección transversal circular, que transmite potencia o movimiento. Constituye el eje de rotación de engranes, poleas, volantes, manivelas y catarinas, y controla la geometría del movimiento. En cambio, un <strong>eje</strong> (axle) es un elemento <em>no giratorio</em> que no transmite par de torsión; solo soporta ruedas, poleas y similares. Dato curioso: el "eje" de un automóvil moderno no es un eje verdadero — es una flecha que gira y transmite potencia.')}
      <ConceptBlock title="Aspectos del diseño de una flecha">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li style={{ marginBottom: 4 }}>Selección del material</li>
          <li style={{ marginBottom: 4 }}>Configuración geométrica (forma escalonada)</li>
          <li style={{ marginBottom: 4 }}>Esfuerzo y resistencia: estática y por fatiga</li>
          <li style={{ marginBottom: 4 }}>Deflexión y rigidez: flexión, torsión, pendiente en cojinetes</li>
          <li style={{ marginBottom: 4 }}>Vibración y frecuencia natural (velocidades críticas)</li>
        </ul>
      </ConceptBlock>
      <p style={{ color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>Nota importante: el esfuerzo en un punto solo depende de la geometría local (diámetro, radio de acuerdo), pero la deflexión y pendiente dependen de la <em>geometría completa del eje</em>. Por eso, primero dimensionamos para esfuerzo y luego verificamos deflexiones.</p>
      <FigShaftAssembly />

      <SectionTitle id="s7-2">7-2 Materiales para fabricar ejes</SectionTitle>
      <PreguntaBlock text="¿El material más caro evita que se doble? Pensemos: si cambio de acero al carbono a acero aleado, ¿el eje se deforma menos?" />
      {p('La respuesta es <strong>no</strong>. El módulo de elasticidad E de todos los aceros es esencialmente el mismo: ≈ 207 GPa. La rigidez a la deflexión NO se controla con el material, sino con la geometría (diámetro, momento de inercia I). Así que, para controlar deflexión, ¡hay que cambiar el diámetro, no el material!')}
      {p('Sin embargo, la <strong>resistencia</strong> (capacidad de soportar esfuerzo sin fallar) sí cambia con el material y el tratamiento térmico. Ahí tenemos libertad de elección:')}
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th style={{ padding: '8px 10px', textAlign: 'left' }}>Material</th>
              <th style={{ padding: '8px 10px', textAlign: 'left' }}>Aplicación típica</th>
              <th style={{ padding: '8px 10px', textAlign: 'left' }}>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ANSI 1020-1050', 'Ejes de propósito general', 'Bajo costo, fácil de mecanizar'],
              ['ANSI 4140, 4340', 'Alta resistencia, TT', 'Tratamiento térmico garantizado'],
              ['ANSI 1020 (carburizado)', 'Endurecimiento superficial', 'Núcleo tenaz, superficie dura'],
              ['Acero inoxidable', 'Entornos corrosivos', 'Mayor costo, propiedades similares'],
            ].map(([mat, ap, obs], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                <td style={{ padding: '6px 10px', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{mat}</td>
                <td style={{ padding: '6px 10px' }}>{ap}</td>
                <td style={{ padding: '6px 10px', color: 'var(--text-3)' }}>{obs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OjoBlock text={'Error t\u00edpico: especificar un acero m\u00e1s caro \u201cpara que no se doble\u201d. La deflexi\u00f3n depende de E (\u2248207 GPa para todos los aceros). Si necesitas menos deflexi\u00f3n, aumenta el di\u00e1metro, no el presupuesto del material.'} />

      <SectionTitle id="s7-3">7-3 Configuración del eje</SectionTitle>
      <PreguntaBlock text="¿Por qué los ejes son escalonados y no rectos? ¿No sería más fácil fabricar un cilindro perfecto?" />
      {p('Los hombros (resaltos) tienen una función crítica: <strong>localizan axialmente</strong> los componentes y soportan cargas de empuje. Sin hombros, engranes y cojinetes se deslizarían a lo largo del eje.')}
      <SubSection id="s7-3a">Configuración axial de componentes</SubSection>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>Algunas reglas prácticas que usamos los diseñadores:</p>
      <ul style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, paddingLeft: 20, marginBottom: 16 }}>
        <li>Apoyar componentes <em>entre cojinetes</em> (no en voladizo) siempre que sea posible.</li>
        <li>Usar solo dos cojinetes por eje; para ejes largos con varios componentes, usar más pero con alineación cuidadosa.</li>
        <li>Mantener el eje corto para minimizar momentos y deflexiones.</li>
        <li>Colocar los componentes de carga cerca de los cojinetes.</li>
      </ul>
      <SubSection id="s7-3b">Transmisión del par de torsión</SubSection>
      <ConceptBlock title="Elementos para transmitir par de torsión">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li><strong>Cuñas</strong> — medio más eficaz y económico para pares moderados a altos</li>
          <li><strong>Ejes estriados</strong> — transmiten pares considerables con movimiento axial relativo</li>
          <li><strong>Tornillos de fijación</strong> — pares bajos, remoción fácil</li>
          <li><strong>Pasadores</strong> — carga principal de cortante</li>
          <li><strong>Ajustes a presión/contracción</strong> — Kf muy pequeño, ubicación axial segura</li>
          <li><strong>Ajustes ahusados</strong> — desensamble posible, localización axial pobre</li>
        </ul>
      </ConceptBlock>
      <SubSection id="s7-3c">Soporte de cargas axiales</SubSection>
      {p('Los engranes helicoidales y cónicos producen componentes de fuerza <strong>axial</strong> que deben soportarse. La regla de oro: <strong>solo un cojinete por eje debe resistir la carga axial</strong>. ¿Por qué? Si dos cojinetes compiten por el empuje, las tolerancias dimensionales y la expansión térmica pueden generar cargas parasitarias que destruyen ambos cojinetes. Un solo cojinete "fijo" localiza el eje; el otro "flota" para absorber expansiones.')}
      <OjoBlock text="¿Cojinetes cónicos? Necesitan precarga, pero sigue aplicando la regla: un solo soporte fijo por eje. Los rodamientos de rodillos cilíndricos son naturalmente flotantes en dirección axial." />
      <SubSection id="s7-3d">Ensamble y desensamble</SubSection>
      {p('Diseñar un eje no es solo cumlir con esfuerzos — también hay que <strong>poder armarlo</strong>. Los diámetros deben ser progresivamente menores hacia los extremos para que los componentes deslicen sobre el eje hasta su posición. Si un hombro retiene por ambos lados, se necesita un anillo de retención o un espaciador. Y nunca olvides el acceso para herramientas: alicates para anillos Seeger, extractores de cojinetes, y aberturas en cubos de engranes.')}
      <OjoBlock text="Cuidado con los radios de acuerdo muy pequeños. Un r/d de 0.02 puede dar Kt de hasta 2.7 en flexión. Usa r/d ≥ 0.05 siempre que sea posible (Kt baja a ~2.1)." />
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 7-3/4/5 — Concentración de esfuerzos Kt en hombro según r/d</div>
        <svg viewBox="0 0 320 140" style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto' }}>
          <line x1="40" y1="20" x2="40" y2="120" stroke="var(--border)" strokeWidth="1" />
          <line x1="40" y1="115" x2="300" y2="115" stroke="var(--border)" strokeWidth="1" />
          <text x="30" y="115" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">1.5</text>
          <text x="30" y="75" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">2.0</text>
          <text x="30" y="35" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">2.7</text>
          <line x1="37" y1="115" x2="40" y2="115" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="37" y1="75" x2="40" y2="75" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="37" y1="35" x2="40" y2="35" stroke="var(--text-3)" strokeWidth="0.5" />
          <polyline points="55,35 80,55 110,70 140,80 170,87 200,92 230,96 260,100 290,105" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <polyline points="55,55 80,70 110,80 140,88 170,95 200,100 230,105 260,108 290,110" fill="none" stroke="var(--warning)" strokeWidth="2" strokeDasharray="5,3" />
          <text x="170" y="13" fill="var(--accent)" fontSize="8" fontFamily="var(--font-mono)">Flexión Kt</text>
          <text x="170" y="128" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">r / d</text>
          <text x="55" y="128" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)">0.01</text>
          <text x="140" y="128" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)">0.05</text>
          <text x="230" y="128" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)">0.15</text>
          <text x="55" y="30" fill="var(--danger)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="bold">Peligro</text>
          <text x="240" y="88" fill="var(--warning)" fontSize="7" fontFamily="var(--font-mono)">Torsión Kts</text>
        </svg>
      </div>

      <SectionTitle id="s7-4">7-4 Diseño de ejes para el esfuerzo</SectionTitle>
      <PreguntaBlock text="¿Cómo se rompe un eje que gira? Imagina que el eje da una vuelta completa: cada punto de la superficie pasa por arriba (tracción), un lado (cortante puro) y abajo (compresión). Eso es un ciclo completo de flexión alternante." />
      {p('Los esfuerzos fluctuantes en ejes giratorios se deben principalmente a <strong>flexión completamente alternante</strong> (cuando el eje gira, cada punto ve tracción → compresión → tracción) y <strong>torsión media</strong> (el par transmitido suele ser constante). Combinamos ambos mediante la teoría de Von Mises (energía de distorsión).')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>σ<sub>a</sub> = K<sub>f</sub> · 32M<sub>a</sub> / (πd³)&emsp;&emsp;σ<sub>m</sub> = K<sub>f</sub> · 32M<sub>m</sub> / (πd³)</div>
          <div>τ<sub>a</sub> = K<sub>fs</sub> · 16T<sub>a</sub> / (πd³)&emsp;&emsp;τ<sub>m</sub> = K<sub>fs</sub> · 16T<sub>m</sub> / (πd³)</div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>Von Mises alternante y medio:</div>
          <div>σ&apos;<sub>a</sub> = (16/πd³) · √[4(K<sub>f</sub>M<sub>a</sub>)² + 3(K<sub>fs</sub>T<sub>a</sub>)²]</div>
          <div>σ&apos;<sub>m</sub> = (16/πd³) · √[4(K<sub>f</sub>M<sub>m</sub>)² + 3(K<sub>fs</sub>T<sub>m</sub>)²]</div>
        </div>
      </FormulaBox>
      {p('Ahora aplicamos el criterio de fatiga DE-Goodman (energía de distorsión + línea de Goodman). Es el más usado en la industria por su equilibrio entre precisión y conservadurismo:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700, color: 'var(--success)' }}>Criterio DE-Goodman:</div>
          <div>1/n = (16/πd³) · &#123; (1/S<sub>e</sub>)·√[4(K<sub>f</sub>M<sub>a</sub>)²+3(K<sub>fs</sub>T<sub>a</sub>)²] + (1/S<sub>ut</sub>)·√[4(K<sub>f</sub>M<sub>m</sub>)²+3(K<sub>fs</sub>T<sub>m</sub>)²] &#125;</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Diámetro mínimo:</div>
          <div>d = (16n/π · &#123; … &#125;)<sup>1/3</sup></div>
        </div>
      </FormulaBox>
      <div style={{ background: 'var(--bg-2)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--text-2)' }}><strong>Otros criterios disponibles:</strong> DE-Gerber (menos conservador), DE-ASME-Elíptico, DE-Soderberg (más conservador).</span>
      </div>
      <SubSection id="s7-4a">Criterios alternos de falla</SubSection>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>Además de DE-Goodman, existen otros criterios. Cada uno define una línea límite diferente en el diagrama σ'a vs σ'm:</p>
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700, color: 'var(--success)' }}>DE-Goodman:</div>
          <div>1/n = σ'a/Se + σ'm/Sut</div>
          <div style={{ fontWeight: 700, color: 'var(--accent)', marginTop: 8 }}>DE-Gerber (menos conservador, parábola):</div>
          <div>1/n = ½(σ'm/Sut)² · (Se/σ'a) · &#123;−1 + √[1 + (2σ'a·Sut)/(σ'm·Se)²]&#125;</div>
          <div style={{ fontWeight: 700, color: 'var(--warning)', marginTop: 8 }}>DE-ASME-Elíptico:</div>
          <div>1/n = √[(σ'a/Se)² + (σ'm/Sy)²]</div>
          <div style={{ fontWeight: 700, color: 'var(--danger)', marginTop: 8 }}>DE-Soderberg (más conservador, Sy como límite):</div>
          <div>1/n = σ'a/Se + σ'm/Sy</div>
        </div>
      </FormulaBox>
      {p('<strong>Caso simplificado</strong>: si el eje gira con flexión constante y torsión constante, entonces Mm = Ta = 0 y las ecuaciones se simplifican mucho: σ\'m solo tiene contribución de Tm, y σ\'a solo de Ma.')}
      <SubSection id="s7-4b">Verificación de fluencia</SubSection>
      {p('¡Cuidado! Los criterios de fatiga (Goodman, Gerber, etc.) <strong>no protegen contra la fluencia en el primer ciclo</strong>. Un eje puede "pasar" Goodman y aún así fluir si se carga demasiado. Necesitamos una verificación separada:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700, color: 'var(--danger)' }}>Esfuerzo máximo de Von Mises:</div>
          <div>σ&apos;<sub>max</sub> = (16/πd³) · √[4(K<sub>f</sub>(M<sub>m</sub>+M<sub>a</sub>))² + 3(K<sub>fs</sub>(T<sub>m</sub>+T<sub>a</sub>))²]</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Factor de seguridad contra fluencia:</div>
          <div style={{ fontSize: 18 }}>n<sub>y</sub> = S<sub>y</sub> / σ&apos;<sub>max</sub></div>
        </div>
      </FormulaBox>
      <OjoBlock text="Si ny < 1, el eje fluye en el primer ciclo de carga — falla antes de tener la oportunidad de fatigarse. Siempre verifica ambos: n (fatiga) y ny (fluencia). Soderberg sí evita fluencia automáticamente, pero es el más conservador." />
      <SubSection id="s7-4c">Ubicaciones críticas</SubSection>
      {p('¿Dónde revisar el eje? Busca puntos donde coincidan <strong>tres condiciones</strong>: (1) momento flector grande, (2) torsión presente, y (3) concentración de esfuerzos (hombros, chaveteros, anillos de retención). La torsión suele entrar por un engrane y salir por otro — es constante entre ambos. Los momentos requieren análisis en dos planos (horizontal y vertical) combinados vectorialmente. Cerca de los cojinetes, los momentos suelen ser pequeños, así que enfócate en los puntos intermedios.')}
      <SubSection id="s7-4d">Técnicas para reducir Kt</SubSection>
      {p('Si el radio de acuerdo es demasiado pequeño, tenemos tres opciones (Fig 7-9):')}
      <ul style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>Undercut en el hombro</strong> — un rebaje en la zona de transición que permite un radio grande sin invadir el diámetro mayor. La zona de rebaje suele tener esfuerzo bajo.</li>
        <li><strong>Relief groove detrás del hombro</strong> — una ranura aliviadora que separa el radio del cuerpo del eje.</li>
        <li><strong>Ranura en el diámetro menor</strong> — reduce el área pero elimina la esquina aguda. Cuidado: esta opción sí reduce la resistencia.</li>
      </ul>
      <FigGoodmanDiagram />
      <ShaftDesignCalc />

      <SectionTitle id="s7-5">7-5 Consideraciones sobre deflexión</SectionTitle>
      <PreguntaBlock text="¿Qué pasa si un engrane está muy inclinado sobre el eje? Los dientes se desalinean, el contacto se vuelve irregular y la transmisión se vuelve ruidosa. Por eso controlamos pendientes y deflexiones." />
      {p('El análisis de deflexión requiere conocer la geometría completa del eje. Usamos diagramas de cortante y momento en <strong>dos planos ortogonales</strong> (porque las fuerzas de engranes actúan en direcciones radial y tangencial), y combinamos vectorialmente. Para ejes escalonados, usamos funciones de singularidad o integración numérica. Solo las dimensiones geométricas gruesas afectan la deflexión; chaveteros y ranuras son despreciables para deflexión (aunque no para esfuerzo).')}
      <SubSection id="s7-5a">Deflexión por torsión</SubSection>
      {p('No solo nos flexionamos — también nos <strong>torcemos</strong>. Para ejes escalonados con tramos de diferente diámetro o material:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>θ = Σ θ<sub>i</sub> = Σ (T<sub>i</sub> · l<sub>i</sub>) / (G<sub>i</sub> · J<sub>i</sub>)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Para torsión constante en un material homogéneo: θ = (T/G) · Σ(l<sub>i</sub>/J<sub>i</sub>)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Rigidez torsional de tramos en serie: 1/k = Σ(1/k<sub>i</sub>)</div>
        </div>
      </FormulaBox>
      <OjoBlock text="La deflexión real es mayor que la predicha. La experimentación muestra desviaciones de hasta un 20% por holguras en chaveteros y otros factores. Casi todo el análisis de deflexión de ejes debería verificarse con software de elementos finitos o de vigas en dos planos." />
      <ConceptBlock title="Rangos típicos de deflexión y pendiente (Tabla 7-2)">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12 }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Componente</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Deflexión perm.</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Pendiente perm.</th>
            </tr></thead>
            <tbody>
              {[
                ['Engranes rectos', '0.005–0.010 pulg', '0.0005–0.003 rad'],
                ['Engranes helicoidales', '0.005–0.010 pulg', '< 0.0005 rad'],
                ['Cojinetes de bola', '—', '< 0.0087 rad'],
                ['Cojinetes cilíndricos', '—', '0.0008–0.0012 rad'],
                ['Cojinetes cónicos', '—', '0.0005–0.0012 rad'],
              ].map(([comp, defl, pend], i) => (
                <tr key={i}>
                  <td style={{ padding: '3px 8px' }}>{comp}</td>
                  <td style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{defl}</td>
                  <td style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{pend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ConceptBlock>
      {p('Si la deflexión excede el límite permisible, redimensionamos el diámetro con esta fórmula práctica:')}
      <FormulaBox>
        d<sub>nuevo</sub> = d<sub>anterior</sub> · (n<sub>d</sub> · y<sub>anterior</sub> / y<sub>perm</sub>)<sup>¼</sup>
      </FormulaBox>
      <FigDeflectionDiagrams />
      <OjoBlock text="La deflexión por cortante transversal puede añadir ~1% a la deflexión total. Para ejes cortos (L/D &lt; 10), no la ignores." />

      <SectionTitle id="s7-6">7-6 Velocidades críticas de ejes</SectionTitle>
      <PreguntaBlock text="¿Por qué tiembla un eje a cierta velocidad? ¿Alguna vez has visto un ventilador vibrando violentamente a cierta RPM? Eso es resonancia." />
      {p('A ciertas velocidades de rotación, la frecuencia de giro coincide con la frecuencia natural del eje. Las deflexiones crecen sin límite (resonancia). El diseñador busca que la velocidad de operación esté al menos un 20% por debajo de la primera velocidad crítica (para ejes rígidos) o al menos el doble (para ejes flexibles).')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700 }}>Rayleigh (masas concentradas):</div>
          <div>ω₁ = √( g · Σwᵢyᵢ / Σwᵢyᵢ² )</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Dunkerley (aproximación):</div>
          <div>1/ω₁² ≈ Σ(1/ωᵢᵢ²)&emsp;con ωᵢᵢ = √(g / (wᵢ·δᵢᵢ))</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Eje uniforme simplemente apoyado:</div>
          <div>ω₁ = (π/l)² · √(EI/m)</div>
        </div>
      </FormulaBox>
      <div style={{ color: 'var(--text-3)', fontSize: 12, marginBottom: 16 }}>
        Rayleigh sobreestima ω₁ (es optimista); Dunkerley la subestima (es conservador). Ambos son útiles: el valor real está entre los dos.
      </div>
      <FigFirstMode />
      <CriticalSpeedCalc />

      <SectionTitle id="s7-7">7-7 Componentes diversos de los ejes</SectionTitle>
      <PreguntaBlock text="¿Cómo se fija un engrane a un eje sin que resbale? Aquí es donde entran las cuñas, tornillos y anillos." />
      <SubSection id="s7-7a">Tornillos de fijación</SubSection>
      {p('Los tornillos de fijación (prisioneros) dependen de la <strong>compresión</strong> para desarrollar fuerza de sujeción. La capacidad de sujeción es la resistencia al movimiento axial y tangencial del collarín respecto al eje.')}
      <ConceptBlock title="Tipos de punta (Figura 7-15)">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li><strong>Punta plana</strong> — uso general, daño mínimo al eje</li>
          <li><strong>Punta ahuecada</strong> — mejor sujeción axial y torsional</li>
          <li><strong>Punta ovalada</strong> — para movimiento frecuente</li>
          <li><strong>Punta cónica</strong> — fuerte, penetra ligeramente en el eje</li>
          <li><strong>Punta de macho corto</strong> — entra en agujero taladrado en el eje</li>
        </ul>
      </ConceptBlock>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 7-15 — Tipos de punta en tornillos de fijación</div>
        <svg viewBox="0 0 380 80" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          {[
            { x: 10, label: 'Plana', path: 'M25,20 L25,50 L35,50 L35,42 L25,42' },
            { x: 75, label: 'Ahuecada', path: 'M95,20 L95,50 L105,50 L105,42 Q100,35 95,42' },
            { x: 145, label: 'Ovalada', path: 'M165,20 L165,50 Q170,42 175,50 L175,20' },
            { x: 220, label: 'Cónica', path: 'M240,20 L240,50 L250,50 L250,42 L245,35 L240,42' },
            { x: 295, label: 'Macho corto', path: 'M310,20 L310,50 L320,50 L320,42 L318,38 L320,35 L320,42 L310,42' },
          ].map(({ x, label, path }) => (
            <g key={label} transform={`translate(${x}, 5)`}>
              <line x1="15" y1="20" x2="15" y2="60" stroke="var(--text-2)" strokeWidth="4" strokeLinecap="round" />
              <path d={path.replace(/M(\d+)/g, (m, n) => `M${parseInt(n)-10}`).replace(/L(\d+)/g, (m, n) => `L${parseInt(n)-10}`).replace(/Q(\d+)/g, (m, n) => `Q${parseInt(n)-10}`)} fill="none" stroke={C} strokeWidth="2" />
            </g>
          ))}
        </svg>
      </div>
      <SubSection id="s7-7b">Cuñas y pasadores</SubSection>
      {p('Las <strong>cuñas</strong> se instalan en una ranura (cuñero) del eje y del componente. Permiten ensamble/desensamble sencillo y dan orientación angular positiva.')}
      <FormulaBox>
        τ = 2T / (d·w·l)&emsp;(esfuerzo cortante en la cuña, con w = ancho, l = largo)
      </FormulaBox>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 7-16 — Tipos de cuñas</div>
        <svg viewBox="0 0 380 100" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          <g transform="translate(10, 5)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Cuadrada</text>
            <rect x="10" y="15" width="40" height="12" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <rect x="10" y="10" width="40" height="5" fill={C} opacity="0.3" stroke={C} strokeWidth="1.5" />
            <text x="30" y="40" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">w = h/2</text>
          </g>
          <g transform="translate(110, 5)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Plana</text>
            <rect x="10" y="20" width="40" height="6" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <rect x="10" y="17" width="40" height="3" fill="var(--accent)" opacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="30" y="38" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">h &lt; w/2</text>
          </g>
          <g transform="translate(210, 5)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Woodruff</text>
            <circle cx="40" cy="20" r="12" fill="var(--warning)" opacity="0.3" stroke="var(--warning)" strokeWidth="1.5" />
            <rect x="28" y="10" width="24" height="10" fill="none" stroke="var(--text-2)" strokeWidth="1" strokeDasharray="2,2" />
            <text x="40" y="48" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">semicircular</text>
          </g>
        </svg>
      </div>
      <SubSection id="s7-7c">Anillos de retención y manguitos</SubSection>
      {p('Los <strong>anillos de retención (Seeger)</strong> se instalan en ranuras del eje para localización axial cuando las magnitudes de fuerza son razonablemente bajas. Los <strong>manguitos</strong> separan componentes y permiten crear hombros "virtuales" sin maquinar escalones.')}
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 7-17 — Anillos de retención Seeger (interno y externo)</div>
        <svg viewBox="0 0 340 90" style={{ width: '100%', maxWidth: 340, display: 'block', margin: '0 auto' }}>
          <g transform="translate(10, 10)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Externo (eje)</text>
            <rect x="10" y="18" width="120" height="25" fill="none" stroke="var(--text-2)" strokeWidth="2" rx="4" />
            <path d="M72,18 Q67,18 67,23 L67,33 Q67,43 72,43 M78,18 Q83,18 83,23 L83,33 Q83,43 78,43" fill="none" stroke={C} strokeWidth="2" />
            <line x1="72" y1="30" x2="78" y2="30" stroke={C} strokeWidth="2" />
            <text x="70" y="60" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ranura en eje</text>
          </g>
          <g transform="translate(180, 10)">
            <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Interno (agujero)</text>
            <rect x="10" y="18" width="120" height="25" fill="none" stroke="var(--text-2)" strokeWidth="2" rx="4" />
            <path d="M12,18 Q7,18 7,23 L7,33 Q7,43 12,43 M5,30 L12,30" fill="none" stroke="var(--success)" strokeWidth="2" />
            <text x="60" y="60" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ranura en agujero</text>
          </g>
        </svg>
      </div>

      <SectionTitle id="s7-8">7-8 Límites y ajustes</SectionTitle>
      <PreguntaBlock text="¿Qué significa H7/g6 en un plano? Suena a código secreto, pero es el lenguaje de las tolerancias entre ejes y agujeros." />
      {p('Los sistemas de límites y ajustes (ANSI, ISO) definen las tolerancias dimensionales para ejes y agujeros. La notación es simple: letras mayúsculas = agujero, minúsculas = eje. "H" significa que la desviación inferior del agujero es cero (agujero base).')}
      <ConceptBlock title="Tipos de ajuste">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginTop: 8 }}>
          {[
            ['Con holgura', 'Siempre hay espacio. Movimiento libre. Ej: H7/g6 (deslizante).', 'var(--accent)'],
            ['De transición', 'Puede dar holgura o interferencia. Ej: H7/k6.', 'var(--warning)'],
            ['A presión', 'Siempre hay interferencia. Transmite par. Ej: H7/s6.', 'var(--danger)'],
          ].map(([name, desc, clr]) => (
            <div key={String(name)} style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: `1px solid ${clr}`, background: `color-mix(in srgb, ${clr} 8%, transparent)` }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: clr, marginBottom: 4 }}>{name}</div>
              <p style={{ fontSize: 11, color: 'var(--text-3)', margin: 0, lineHeight: 1.4 }}>{desc}</p>
            </div>
          ))}
        </div>
      </ConceptBlock>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 7-19 — Zonas de tolerancia ISO (sistema agujero-base)</div>
        <svg viewBox="0 0 380 160" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
          <line x1="40" y1="20" x2="40" y2="140" stroke="var(--border)" strokeWidth="1" />
          <line x1="40" y1="80" x2="340" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4,3" />
          <text x="35" y="83" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">0</text>
          <text x="35" y="22" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">+</text>
          <text x="35" y="142" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="end">−</text>
          <rect x="60" y="62" width="30" height="18" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="75" y="90" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">H7</text>
          <text x="75" y="100" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">agujero</text>
          <rect x="110" y="80" width="30" height="10" fill="var(--success)" opacity="0.2" stroke="var(--success)" strokeWidth="1.5" />
          <text x="125" y="58" fill="var(--success)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">g6</text>
          <text x="125" y="68" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">deslizante</text>
          <rect x="160" y="70" width="30" height="20" fill="var(--warning)" opacity="0.2" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="175" y="55" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">h6</text>
          <text x="175" y="65" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">localizado</text>
          <rect x="210" y="55" width="30" height="35" fill="var(--danger)" opacity="0.15" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="225" y="50" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">s6</text>
          <text x="225" y="100" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">interferencia</text>
          <rect x="260" y="45" width="30" height="45" fill="var(--danger)" opacity="0.2" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="275" y="40" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">u6</text>
          <text x="275" y="100" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">forzado</text>
          <rect x="310" y="60" width="22" height="30" fill="var(--text-3)" opacity="0.1" stroke="var(--text-3)" strokeWidth="1" />
          <text x="321" y="55" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">k6</text>
          <text x="321" y="100" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">trans.</text>
          <text x="190" y="152" fill={C} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Mayúsculas = agujero (H) &ensp; Minúsculas = eje (g, h, k, s, u)</text>
        </svg>
      </div>
      {p('Los ajustes de interferencia pueden transmitir par por fricción. La presión de contacto p y el par transmisible se calculan con las ecuaciones de cilindros gruesos, considerando la interferencia diametral δ.')}
      <OjoBlock text="No confundas interferencia con apriete excesivo. Una interferencia mal calculada puede reventar la maza o el eje. Siempre verifica el esfuerzo tangencial en ambos cuerpos." />
      <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Resumen — Fórmulas clave</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, fontSize: 12 }}>
          {[
            ['DE-Goodman (diámetro)', 'd = (16n/π·{…})^(1/3)'],
            ['Rayleigh', 'ω₁ = √(g·Σwᵢyᵢ / Σwᵢyᵢ²)'],
            ['Dunkerley', '1/ω₁² ≈ Σ(1/ωᵢᵢ²)'],
            ['Ajuste de diámetro', 'd_nuevo = d_ant·(n_d·y_ant/y_perm)^(¼)'],
            ['Cortante en cuña', 'τ = 2T / (d·w·l)'],
            ['Par en ajuste', 'T = (π/2)·f·p·l·d²'],
          ].map(([name, formula]) => (
            <div key={String(name)} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{name}</span>
              <code style={{ fontSize: 11, background: 'var(--bg-1)', padding: '4px 6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{formula}</code>
            </div>
          ))}
        </div>
      </div>
    </ChapterShell>
  )
}
