'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'

const C = 'var(--part-3)'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} style={{ fontSize: 22, fontWeight: 700, marginTop: 44, marginBottom: 16, color: C, scrollMarginTop: 80 }}>{children}</h2>
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
function SubSection({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} style={{ fontSize: 17, fontWeight: 600, marginTop: 28, marginBottom: 10, color: 'var(--text-1)', scrollMarginTop: 80 }}>{children}</h3>
}
function p(text: string) {
  return <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>{text}</p>
}

function FigThreadProfiles() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 8-1/2 — Perfiles de rosca: UNC, métrica y Acme</div>
      <svg viewBox="0 0 400 150" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
        <g transform="translate(10, 15)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">UNC/UNF 60°</text>
          <polyline points="30,30 15,10 0,30 15,50 30,30" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <polyline points="45,30 30,10 15,30 30,50 45,30" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <polyline points="60,30 45,10 30,30 45,50 60,30" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="15" y="62" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">p = 1/N</text>
          <line x1="15" y1="57" x2="30" y2="57" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="15" y1="54" x2="15" y2="60" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="30" y1="54" x2="30" y2="60" stroke="var(--text-3)" strokeWidth="0.5" />
        </g>
        <g transform="translate(150, 15)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Métrica ISO 60°</text>
          <polyline points="30,30 15,10 0,30 15,50 30,30" fill="none" stroke="var(--success)" strokeWidth="1.5" />
          <line x1="10" y1="14" x2="20" y2="14" stroke="var(--success)" strokeWidth="0.8" />
          <line x1="10" y1="46" x2="20" y2="46" stroke="var(--success)" strokeWidth="0.8" />
          <text x="15" y="62" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">p (paso)</text>
          <line x1="15" y1="57" x2="30" y2="57" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="15" y1="54" x2="15" y2="60" stroke="var(--text-3)" strokeWidth="0.5" />
          <line x1="30" y1="54" x2="30" y2="60" stroke="var(--text-3)" strokeWidth="0.5" />
        </g>
        <g transform="translate(290, 15)">
          <text x="0" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)">Acme 29°</text>
          <polyline points="10,30 0,15 20,15 30,30 20,45 0,45 10,30" fill="none" stroke="var(--warning)" strokeWidth="1.5" />
          <polyline points="35,30 25,15 45,15 55,30 45,45 25,45 35,30" fill="none" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="20" y="62" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">avance l</text>
          <line x1="10" y1="57" x2="35" y2="57" stroke="var(--text-3)" strokeWidth="0.5" />
        </g>
        <g transform="translate(10, 90)">
          <text x="0" y="0" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Nomenclatura:</text>
          <line x1="90" y1="12" x2="90" y2="30" stroke="var(--text-2)" strokeWidth="0.8" />
          <text x="72" y="10" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">D mayor</text>
          <line x1="110" y1="12" x2="110" y2="24" stroke="var(--text-2)" strokeWidth="0.8" />
          <text x="130" y="10" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">D paso</text>
          <line x1="130" y1="12" x2="130" y2="18" stroke="var(--text-2)" strokeWidth="0.8" />
          <text x="155" y="10" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">D menor</text>
          <line x1="30" y1="24" x2="30" y2="12" stroke="var(--text-2)" strokeWidth="0.8" />
          <polyline points="30,24 25,20 35,20 30,24" fill="none" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="30" y="40" fill="var(--danger)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">raíz</text>
          <text x="130" y="40" fill="var(--success)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">cresta</text>
        </g>
      </svg>
    </div>
  )
}
function FigPowerScrewHelix() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 8-3/4 — Desarrollo de la hélice: la rosca como plano inclinado enrollado</div>
      <svg viewBox="0 0 380 160" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
        <line x1="20" y1="120" x2="320" y2="120" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="20" y1="120" x2="20" y2="30" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="20,120 320,120 320,60" fill="rgba(34,197,94,0.12)" stroke={C} strokeWidth="1.5" />
        <text x="170" y="115" fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">π·d<sub>m</sub></text>
        <line x1="170" y1="120" x2="170" y2="127" stroke="var(--text-3)" strokeWidth="0.5" />
        <line x1="50" y1="120" x2="50" y2="127" stroke="var(--text-3)" strokeWidth="0.5" />
        <line x1="320" y1="90" x2="330" y2="90" stroke="var(--text-3)" strokeWidth="0.5" />
        <text x="330" y="93" fill="var(--text-3)" fontSize="10" fontFamily="var(--font-mono)">l (avance)</text>
        <path d="M325,62 Q330,65 320,68" fill="none" stroke="var(--accent)" strokeWidth="1" />
        <path d="M130,88 A150 40 0 0 1 280 88" fill="none" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x="220" y="47" fill={C} fontSize="9" fontFamily="var(--font-mono)" transform="rotate(-30, 220, 55)">λ (áng. avance)</text>
        <path d="M20,120 Q80,90 140,95 Q200,100 260,85 Q300,75 320,60" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
        <text x="100" y="78" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">F · cos λ</text>
        <circle cx="20" cy="120" r="2" fill="var(--text-1)" />
        <text x="20" y="135" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">F</text>
        <text x="140" y="140" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Un giro completo = avance l</text>
      </svg>
    </div>
  )
}
function FigConePressure() {
  return (
    <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Figura 8-12/13 — Cono de presión a 30° en la unión empernada</div>
      <svg viewBox="0 0 360 180" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
        <line x1="120" y1="20" x2="120" y2="120" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="240" y1="20" x2="240" y2="120" stroke="var(--text-2)" strokeWidth="2" />
        <rect x="115" y="20" width="10" height="100" fill="var(--accent)" opacity="0.3" rx="2" />
        <rect x="235" y="20" width="10" height="100" fill="var(--accent)" opacity="0.3" rx="2" />
        <line x1="130" y1="20" x2="130" y2="120" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="3,2" />
        <line x1="230" y1="20" x2="230" y2="120" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="3,2" />
        <line x1="30" y1="120" x2="330" y2="120" stroke="var(--text-2)" strokeWidth="1.5" />
        <line x1="30" y1="120" x2="60" y2="20" stroke="var(--border-soft)" strokeWidth="0.8" strokeDasharray="3,2" />
        <line x1="330" y1="120" x2="300" y2="20" stroke="var(--border-soft)" strokeWidth="0.8" strokeDasharray="3,2" />
        <line x1="80" y1="120" x2="100" y2="20" stroke="var(--border-soft)" strokeWidth="0.8" strokeDasharray="3,2" />
        <line x1="280" y1="120" x2="260" y2="20" stroke="var(--border-soft)" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x="20" y="15" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Cono a 30°</text>
        <text x="130" y="135" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">elemento (km)</text>
        <text x="130" y="148" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">(material comprimido)</text>
        <line x1="60" y1="20" x2="60" y2="120" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1="300" y1="20" x2="300" y2="120" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="2,2" />
        <path d="M 55,70 Q 55,68 58,67" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
        <text x="45" y="65" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">30°</text>
        <path d="M 305,70 Q 305,68 302,67" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
        <text x="310" y="65" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">30°</text>
        <text x="180" y="170" fill={C} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">C = k<sub>b</sub> / (k<sub>b</sub> + k<sub>m</sub>)</text>
      </svg>
    </div>
  )
}

function PowerScrewCalc() {
  const [F, setF] = useState(5000);
  const [dm, setDm] = useState(22);
  const [l, setL] = useState(5);
  const [f, setF2] = useState(0.15);
  const [alpha, setAlpha] = useState(14.5);
  const [fc, setFc] = useState(0.15);
  const [dc, setDc] = useState(30);

  const alphaRad = alpha * Math.PI / 180;
  const secAlpha = 1 / Math.cos(alphaRad);
  const TR = (F * dm / 2) * (l + Math.PI * f * dm * secAlpha) / (Math.PI * dm - f * l * secAlpha);
  const TL = (F * dm / 2) * (Math.PI * f * dm * secAlpha - l) / (Math.PI * dm + f * l * secAlpha);
  const T0 = F * l / (2 * Math.PI);
  const efficiency = T0 / TR;
  const Tc = F * fc * dc / 2;
  const T_total = TR + Tc;
  const lambdaDeg = Math.atan(l / (Math.PI * dm)) * 180 / Math.PI;
  const selfLocking = f >= Math.tan(lambdaDeg * Math.PI / 180);

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid ${C}`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Calculadora — Tornillo de Potencia</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {[
          { label: 'F – Carga axial (N)', val: F, set: setF, min: 100, max: 50000, step: 100 },
          { label: 'dm – Diámetro medio (mm)', val: dm, set: setDm, min: 5, max: 100, step: 1 },
          { label: 'l – Avance (mm)', val: l, set: setL, min: 1, max: 30, step: 0.5 },
          { label: 'f – Coef. fricción rosca', val: f, set: setF2, min: 0.05, max: 0.30, step: 0.01 },
          { label: 'α – Ángulo rosca (°)', val: alpha, set: setAlpha, min: 0, max: 30, step: 0.5 },
          { label: 'fc – Coef. fricción collarín', val: fc, set: setFc, min: 0.05, max: 0.30, step: 0.01 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>{label}</label>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)}
              style={{ width: '100%', accentColor: '#22C55E' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{typeof val === 'number' ? val.toFixed(step < 1 ? 2 : 0) : val}</span>
          </div>
        ))}
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>dc – Diámetro collarín (mm)</label>
          <input type="range" min={10} max={100} step={1} value={dc} onChange={e => setDc(+e.target.value)} style={{ width: '100%', accentColor: '#22C55E' }} />
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{dc} mm</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginTop: 14 }}>
        {[
          { label: 'TR (elevar)', value: `${TR.toFixed(0)} N·mm`, clr: C },
          { label: 'TL (bajar)', value: TL > 0 ? `${TL.toFixed(0)} N·mm` : 'Baja solo', clr: TL > 0 ? 'var(--accent)' : 'var(--danger)' },
          { label: 'Tc (collarín)', value: `${Tc.toFixed(0)} N·mm`, clr: 'var(--warning)' },
          { label: 'T total', value: `${T_total.toFixed(0)} N·mm`, clr: 'var(--accent)' },
          { label: 'Eficiencia', value: `${(efficiency * 100).toFixed(1)}%`, clr: 'var(--success)' },
          { label: 'Ángulo λ', value: `${lambdaDeg.toFixed(2)}°`, clr: 'var(--text-2)' },
          { label: 'Autobloqueo', value: selfLocking ? 'Sí' : 'No', clr: selfLocking ? 'var(--success)' : 'var(--danger)' },
        ].map(({ label, value, clr }) => (
          <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: clr }}>{value}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>TR = (F·dm/2)·(l+πf·dm·secα)/(πdm−f·l·secα) | Autobloqueo: f ≥ tan λ</p>
    </div>
  )
}

function BoltJointCalc() {
  const [kb, setKb] = useState(3.69);
  const [km, setKm] = useState(9.38);
  const [Fi, setFi] = useState(28000);
  const [P, setP] = useState(8000);
  const [N, setN] = useState(1);

  const Cratio = kb / (kb + km);
  const Pb = Cratio * (P / N);
  const Pm = (1 - Cratio) * (P / N);
  const Fb = Pb + Fi;
  const Fm_val = Fi - Pm;

  return (
    <div style={{ background: 'var(--bg-1)', border: `2px solid var(--part-3)`, borderRadius: 'var(--radius)', padding: 20, margin: '16px 0' }}>
      <h4 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Calculadora — Unión con Pernos a Tensión</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {[
          { label: 'kb – Rigidez perno (MN/m)', val: kb, set: setKb, min: 0.1, max: 20, step: 0.1 },
          { label: 'km – Rigidez elementos (MN/m)', val: km, set: setKm, min: 0.1, max: 100, step: 0.5 },
          { label: 'Fi – Precarga (N)', val: Fi, set: setFi, min: 1000, max: 100000, step: 1000 },
          { label: 'P – Carga externa total (N)', val: P, set: setP, min: 0, max: 50000, step: 500 },
          { label: 'N – Número de pernos', val: N, set: setN, min: 1, max: 12, step: 1 },
        ].map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 2 }}>{label}</label>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)}
              style={{ width: '100%', accentColor: '#10B981' }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: C }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginTop: 14 }}>
        {[
          { label: 'C (const. rigidez)', value: Cratio.toFixed(3), clr: C },
          { label: 'Pb (P en perno)', value: `${Pb.toFixed(0)} N`, clr: 'var(--accent)' },
          { label: 'Pm (P en elementos)', value: `${Pm.toFixed(0)} N`, clr: 'var(--warning)' },
          { label: 'Fb (total en perno)', value: `${Fb.toFixed(0)} N`, clr: 'var(--accent)' },
          { label: 'Fm (en elementos)', value: `${Fm_val.toFixed(0)} N`, clr: Fm_val > 0 ? 'var(--success)' : 'var(--danger)' },
          { label: 'Estado unión', value: Fm_val > 0 ? 'Cerrada ✓' : 'Separación ✗', clr: Fm_val > 0 ? 'var(--success)' : 'var(--danger)' },
        ].map(({ label, value, clr }) => (
          <div key={label} style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)', padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: clr }}>{value}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>C = kb/(kb+km) | Fb = C·P + Fi | Fm = Fi − (1−C)·P ≥ 0</p>
    </div>
  )
}

const sections = [
  { id: 's8-1', label: '8-1 Normas y definiciones' },
  { id: 's8-2', label: '8-2 Tornillos de potencia' },
  { id: 's8-3', label: '8-3 Sujetadores roscados' },
  { id: 's8-4', label: '8-4 Rigidez del sujetador' },
  { id: 's8-5', label: '8-5 Rigidez del elemento' },
  { id: 's8-6', label: '8-6 Resistencia del perno' },
  { id: 's8-7', label: '8-7 Carga externa' },
  { id: 's8-8', label: '8-8 Par–Tensión' },
  { id: 's8-9', label: '8-9 Uniones con precarga' },
  { id: 's8-10', label: '8-10 Uniones con empaque' },
  { id: 's8-11', label: '8-11 Fatiga en uniones' },
  { id: 's8-12', label: '8-12 Cortante en pernos' },
]

function PracticaContent() {
  const [show, setShow] = useState<number[]>([])
  const toggle = (i: number) => setShow(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const problems = [
    {
      num: 1,
      enunciado: 'Un tornillo M12×1.75 clase 8.8 tiene Sp = 600 MPa y At = 84.3 mm². Calcular la precarga recomendada Fi = 0.75·Sp·At y el torque de apriete T = K·Fi·d con K = 0.20.',
      respuesta: 'Fi = 0.75 × 600 × 84.3 = 37935 N ≈ 37.9 kN; T = 0.20 × 37935 × 12 = 91044 N·mm ≈ 91 N·m.',
    },
    {
      num: 2,
      enunciado: 'Una unión empernada tiene kb = 4 MN/m y km = 16 MN/m. Con Fi = 38 kN y carga externa P = 15 kN (un perno), calcular C, la carga en el perno Fb, la carga residual en los elementos Fm, y determinar si la unión permanece cerrada.',
      respuesta: 'C = kb/(kb+km) = 4/20 = 0.20; Fb = C·P+Fi = 0.20×15000+38000 = 41000 N = 41 kN; Fm = Fi−(1−C)·P = 38000−0.80×15000 = 26000 N > 0 → unión cerrada ✓.',
    },
    {
      num: 3,
      enunciado: 'El mismo perno M12 se somete a carga cíclica: P varía de 0 a 15 kN. Con Se = 129 MPa (roscas laminadas) y Sut = 830 MPa, calcular σa y el factor de seguridad a fatiga nf por Goodman.',
      respuesta: 'Pa = 7500 N (amplitud); σa = C·Pa/At = 0.20×7500/84.3 = 17.8 MPa; σm = (C·Pm+Fi)/At = (0.20×7500+38000)/84.3 = 469 MPa; nf = 1/(17.8/129+469/830) = 1/(0.138+0.565) = 1.42 ✓.',
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

export default function Cap08Page() {
  return (
    <ChapterShell
      chapterId={8}
      chapterNum="08"
      title="Tornillos, sujetadores y uniones no permanentes"
      subtitle="Mecánica de tornillos de potencia, análisis de rigidez de uniones empernadas, precarga, fatiga y resistencia de sujetadores bajo carga estática y dinámica."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="s8-1">8-1 Normas y definiciones de roscas</SectionTitle>
      <PreguntaBlock text="¿Cómo saber si un tornillo de ferretería es métrico o en pulgadas? Basta mirar la cabeza o medir el paso. Si el paso se mide en hilos por pulgada, es UNC/UNF. Si se mide en milímetros, es métrico ISO." />
      {p('La terminología básica de roscas incluye: <strong>paso p</strong> (distancia entre crestas adyacentes), <strong>diámetro mayor d</strong>, <strong>diámetro menor dr</strong> (raíz), <strong>diámetro de paso dp</strong>, y <strong>avance l</strong> (desplazamiento axial por vuelta). En una rosca simple, avance = paso. En rosca doble, avance = 2×paso.')}
      <ConceptBlock title="Sistemas de rosca">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li><strong>UNC/UNF</strong> — Unified National Coarse/Fine, ángulo 60°, especificados como <em>d−N serie</em></li>
          <li><strong>Métrica M</strong> — ISO 68, ángulo 60°, especificados como <em>Md×p</em> (ej. M12×1.75)</li>
          <li><strong>MJ</strong> — radio en raíz de rosca externa, mayor resistencia a la fatiga</li>
          <li><strong>Cuadrada y Acme</strong> — para tornillos de potencia (transmisión de carga)</li>
        </ul>
      </ConceptBlock>
      <FigThreadProfiles />
      {p('El <strong>área de esfuerzo a tensión At</strong> representa la sección efectiva de una varilla roscada. Es el área de un círculo con diámetro igual al promedio entre el diámetro de paso y el diámetro menor:')}
      <FormulaBox>At = π/4 · [(dp + dr)/2]²</FormulaBox>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th style={{ padding: '6px 10px' }}>d (mm)</th><th style={{ padding: '6px 10px' }}>p (mm)</th>
              <th style={{ padding: '6px 10px' }}>At (mm²)</th><th style={{ padding: '6px 10px' }}>At fina (mm²)</th>
            </tr>
          </thead>
          <tbody>
            {[['8','1.25','36.6','39.2'],['10','1.5','58.0','61.2'],['12','1.75','84.3','92.1'],
              ['16','2.0','157','167'],['20','2.5','245','272'],['24','3.0','353','384']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="s8-2">8-2 Mecánica de los tornillos de potencia</SectionTitle>
      <PreguntaBlock text="¿Cómo levanta un gato hidráulico una tonelada? La rosca es un plano inclinado enrollado. Al girar, empujamos la carga hacia arriba, como subir un peso por una rampa." />
      {p('Un tornillo de potencia transforma movimiento angular en lineal. El par necesario para <strong>elevar</strong> y <strong>bajar</strong> la carga depende de la geometría de la rosca y la fricción:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div><strong>Elevar:</strong> T_R = (F·dm/2)·(l + πf·dm·sec α) / (πdm − f·l·sec α)</div>
          <div><strong>Bajar:</strong> T_L = (F·dm/2)·(πf·dm·sec α − l) / (πdm + f·l·sec α)</div>
          <div><strong>Collarín:</strong> T_c = F·fc·dc/2</div>
          <div><strong>Eficiencia:</strong> e = F·l / (2π·T_R)</div>
          <div><strong>Autobloqueo:</strong> f ≥ tan λ &emsp; (λ = arctan(l/πdm))</div>
        </div>
      </FormulaBox>
      <FigPowerScrewHelix />
      <OjoBlock text="Si T_L resulta negativo, el tornillo baja solo (no es autobloqueante). ¡Peligroso para gatos y prensas! Verifica siempre que f ≥ tan λ en aplicaciones de seguridad." />
      <PowerScrewCalc />

      <SectionTitle id="s8-3">8-3 Sujetadores roscados</SectionTitle>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>¿Sabías que un perno no es lo mismo que un tornillo? Vamos a distinguirlos:</p>
      <ConceptBlock title="Tipos de sujetadores">
        <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0 }}>
          <li><strong>Perno</strong> — con tuerca, agujero sin rosca en las partes unidas</li>
          <li><strong>Tornillo de cabeza</strong> — roscado en el agujero (tapped)</li>
          <li><strong>Birlo (stud)</strong> — roscado en ambos extremos, sin cabeza</li>
          <li><strong>Tornillo prisionero</strong> — sujeción radial o axial sin tuerca</li>
        </ul>
      </ConceptBlock>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 8-7/8 — Cabezas de pernos y marcas de grado SAE</div>
        <svg viewBox="0 0 400 130" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
          <g transform="translate(10, 10)">
            <text x="30" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Hexagonal</text>
            <circle cx="30" cy="40" r="18" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="30" y1="58" x2="30" y2="78" stroke="var(--text-2)" strokeWidth="3" strokeDasharray="2,1" />
            <circle cx="30" cy="40" r="4" fill="var(--text-3)" />
            <text x="30" y="95" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">6 lados</text>
          </g>
          <g transform="translate(110, 10)">
            <text x="30" y="0" fill={C} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">Socket head</text>
            <circle cx="30" cy="40" r="14" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="30" y1="54" x2="30" y2="78" stroke="var(--text-2)" strokeWidth="3" strokeDasharray="2,1" />
            <rect x="25" y="36" width="10" height="8" rx="1" fill="none" stroke="var(--text-3)" strokeWidth="1" />
            <text x="30" y="95" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Allen</text>
          </g>
          <g transform="translate(210, 10)">
            <text x="30" y="0" fill="var(--warning)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">SAE Grado 5</text>
            <circle cx="30" cy="40" r="18" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="30" y1="58" x2="30" y2="78" stroke="var(--text-2)" strokeWidth="3" strokeDasharray="2,1" />
            <line x1="18" y1="35" x2="22" y2="29" stroke="var(--warning)" strokeWidth="2.5" />
            <line x1="24" y1="35" x2="28" y2="29" stroke="var(--warning)" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="34" y2="29" stroke="var(--warning)" strokeWidth="2.5" />
            <text x="30" y="95" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">3 rayas</text>
          </g>
          <g transform="translate(310, 10)">
            <text x="30" y="0" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">SAE Grado 8</text>
            <circle cx="30" cy="40" r="18" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
            <line x1="30" y1="58" x2="30" y2="78" stroke="var(--text-2)" strokeWidth="3" strokeDasharray="2,1" />
            <line x1="14" y1="35" x2="18" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <line x1="20" y1="35" x2="24" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <line x1="26" y1="35" x2="30" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <line x1="32" y1="35" x2="36" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <line x1="38" y1="35" x2="42" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <line x1="44" y1="35" x2="48" y2="29" stroke="var(--danger)" strokeWidth="2.5" />
            <text x="30" y="95" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">6 rayas</text>
          </g>
        </svg>
      </div>

      <SectionTitle id="s8-4">8-4 Uniones: rigidez del sujetador</SectionTitle>
      <PreguntaBlock text="Un perno es un resorte. ¿Qué tan rígido es? La respuesta no es intuitiva: el perno se estira como un resistor bajo carga." />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>1/kb = ld/(Ad·E) + lt/(At·E) &emsp;→&emsp; kb = Ad·At·E / (Ad·lt + At·ld)</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>ld = longitud sin rosca, lt = longitud roscada, Ad = área del cuerpo, At = área de esfuerzo</div>
        </div>
      </FormulaBox>

      <SectionTitle id="s8-5">8-5 Uniones: rigidez del elemento</SectionTitle>
      <PreguntaBlock text="¿El material alrededor del perno también se comprime? Sí, y forma un cono de presión." />
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>Los elementos comprimidos actúan como resortes en serie. El material alrededor del perno forma un cono de presión a 30° que distribuye la carga. La rigidez del elemento km se calcula con la fórmula del tronco de cono:</p>
      <FormulaBox>km = 0.5774πEd / (2·ln&#123;[1.155l + 0.5(D−d)·(D+d)] / [1.155l·(D+d) + 0.5(D−d)(D+d)]&#125;)</FormulaBox>
      <FigConePressure />
      <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 12 }}>En la práctica km ≈ 3–10 × kb. Los elementos toman más del 80% de la carga externa.</p>

      <SectionTitle id="s8-6">8-6 Resistencia del perno</SectionTitle>
      <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>Las marcas en la cabeza del perno nos dicen su grado. Tres rayas radiales = Grado 5; seis rayas = Grado 8. En métrico: 8.8, 10.9, 12.9.</p>
      <div style={{ overflowX: 'auto', marginBottom: 8 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: C, color: 'white' }}>
              <th style={{ padding: '6px 10px' }}>Grado SAE</th><th style={{ padding: '6px 10px' }}>Sp (kpsi)</th>
              <th style={{ padding: '6px 10px' }}>Sut (kpsi)</th><th style={{ padding: '6px 10px' }}>Sy (kpsi)</th><th style={{ padding: '6px 10px' }}>Material</th>
            </tr>
          </thead>
          <tbody>
            {[['1','33','60','36','Bajo/med. carbono'],
              ['5 (≤1")','85','120','92','Med. carbono T&R'],
              ['8','120','150','130','Aleado T&R']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 10px', textAlign: 'center' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#059669', color: 'white' }}>
              <th style={{ padding: '6px 10px' }}>Clase métrica</th><th style={{ padding: '6px 10px' }}>Sp (MPa)</th>
              <th style={{ padding: '6px 10px' }}>Sut (MPa)</th><th style={{ padding: '6px 10px' }}>Sy (MPa)</th>
            </tr>
          </thead>
          <tbody>
            {[['4.6','225','400','240'],['8.8','600','830','660'],
              ['10.9','830','1040','940'],['12.9','970','1220','1100']].map((r,i)=>(
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-2)' : 'transparent' }}>
                {r.map((v,j)=><td key={j} style={{ padding: '4px 10px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="s8-7">8-7 Uniones a tensión: la carga externa</SectionTitle>
      <PreguntaBlock text="Cuando aprieto un perno, ¿la carga externa se suma completamente al perno? La respuesta te sorprenderá: NO. La mayor parte se la lleva el elemento." />
      {p('Aquí está el concepto clave de todo el capítulo: la carga externa P se reparte entre el perno y los elementos según su rigidez relativa. La constante de rigidez C = kb/(kb+km) determina qué fracción va al perno.')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>C = kb / (kb + km) &emsp; (constante de rigidez)</div>
          <div>Fb = C·P + Fi &emsp; (carga resultante en perno)</div>
          <div>Fm = Fi − (1−C)·P &emsp; (debe ser ≥ 0 para no separación)</div>
        </div>
      </FormulaBox>
      <OjoBlock text="Error clásico: suponer que toda la carga externa P va al perno. Con C típico de 0.1–0.3, el perno solo ve 10-30% de la carga. El resto la absorben los elementos comprimidos." />
      <BoltJointCalc />

      <SectionTitle id="s8-8">8-8 Relación par de torsión–tensión del perno</SectionTitle>
      <PreguntaBlock text="¿Cómo sé cuánto apretar un perno sin romperlo? La respuesta es simple en teoría: T = K·Fi·d." />
      <FormulaBox>T = K · Fi · d &emsp; donde K ≈ 0.20 (coeficiente del par de torsión para condición seca típica)</FormulaBox>
      <ConceptBlock title="Valores de K según condición (Tabla 8-15)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 6, fontSize: 12 }}>
          {[['Sin recubrimiento', '0.30'],['Galvanizado', '0.20'],
            ['Lubricado', '0.18'],['Cadmiado', '0.16'],['Anti-Seize', '0.12']].map(([cond,v])=>(
            <div key={String(cond)} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', background: 'var(--bg-2)', borderRadius: 'var(--radius-sm)' }}>
              <span>{cond}</span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </ConceptBlock>

      <SectionTitle id="s8-9">8-9 Uniones a tensión con precarga (análisis estático)</SectionTitle>
      <PreguntaBlock text="¿Cómo aseguro que la unión no se separe? La precarga es la clave: si Fi es suficientemente grande, los elementos nunca pierden compresión." />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>Fi recomendada = 0.75·Fp &emsp; (Fp = Sp·At) &emsp; [0.60–0.90 según criticidad]</div>
          <div>Factor de seguridad contra fluencia: n<sub>p</sub> = Sp·At / Fb</div>
          <div>Factor de seguridad contra separación: n<sub>0</sub> = Fi / [(1−C)·P]</div>
        </div>
      </FormulaBox>
      <OjoBlock text="Una precarga insuficiente (Fi &lt; 0.6·Sp·At) es la causa más común de falla en uniones empernadas. El perno se afloja solo por vibración." />

      <SectionTitle id="s8-10">8-10 Uniones con empaque (gasketed joints)</SectionTitle>
      {p('En uniones bridadas con empaque, este agrega una rigidez km_e en serie. El empaque reduce la rigidez total, lo que <strong>aumenta C</strong> y, por tanto, la carga alternante en el perno. Cuidado: un empaque blando (bajo E) puede hacer que el perno reciba casi toda la carga.')}
      <FormulaBox>
        1/km_total = 1/km_empaque + 1/km_material &emsp; C = kb / (kb + km_total)
      </FormulaBox>

      <SectionTitle id="s8-11">8-11 Carga por fatiga de uniones a tensión</SectionTitle>
      <PreguntaBlock text="¿Por qué los pernos fallan por fatiga si están bien apretados? La precarga no elimina la fatiga, pero reduce la amplitud del esfuerzo alternante." />
      {p('En una unión empernada con precarga, el esfuerzo alternante en el perno es <strong>solo C·Pa/At</strong> — una fracción de la carga externa. El esfuerzo medio incluye la precarga: σm = (C·Pm + Fi)/At. Esto es clave: <strong>la precarga reduce σa</strong> pero no la elimina. La línea de carga tiene pendiente unitaria: σm = σa + σi, donde σi = Fi/At es el esfuerzo inicial.')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700 }}>Esfuerzos en el perno bajo carga fluctuante:</div>
          <div>σ<sub>a</sub> = C·P<sub>a</sub> / A<sub>t</sub> &emsp; σ<sub>m</sub> = (C·P<sub>m</sub> + F<sub>i</sub>) / A<sub>t</sub></div>
          <div>Línea de carga: σ<sub>m</sub> = σ<sub>a</sub> + σ<sub>i</sub> &emsp; (σ<sub>i</sub> = F<sub>i</sub>/A<sub>t</sub>)</div>
        </div>
      </FormulaBox>
      {p('Aplicamos los criterios de fatiga a esta línea de carga. Tres criterios principales:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700, color: 'var(--success)' }}>Goodman (conservador):</div>
          <div>n<sub>f</sub> = [S<sub>e</sub>(S<sub>ut</sub> − σ<sub>i</sub>)] / [σ<sub>a</sub>(S<sub>ut</sub> + S<sub>e</sub>)]</div>
          <div style={{ fontWeight: 700, color: 'var(--accent)', marginTop: 8 }}>Gerber (menos conservador, parábola):</div>
          <div>n<sub>f</sub> = ½(σ<sub>m</sub>/S<sub>ut</sub>)² · (S<sub>e</sub>/σ<sub>a</sub>) · &#123;−1 + √[1 + (2σ<sub>a</sub>·S<sub>ut</sub>)/(σ<sub>m</sub>·S<sub>e</sub>)²]&#125;</div>
          <div style={{ fontWeight: 700, color: 'var(--warning)', marginTop: 8 }}>ASME-Elíptico:</div>
          <div>n<sub>f</sub> = 1 / √[(σ<sub>a</sub>/S<sub>e</sub>)² + (σ<sub>m</sub>/S<sub>y</sub>)²]</div>
        </div>
      </FormulaBox>
      <OjoBlock text="Siempre compara nf con np (factor contra prueba). El peligro de falla puede ser por fatiga O por exceder la carga de prueba — revisa ambos. Y recuerda: los pernos flojos son dispositivos de fricción; si se pierde la precarga, el perno soporta toda la carga." />
      <ConceptBlock title="Resistencia a la fatiga de pernos (Zimmerli)">
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 8px' }}>Los datos experimentales de Zimmerli muestran que la resistencia a la fatiga de pernos es <strong>independiente del tamaño</strong>:</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 12 }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Condición</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>S<sub>sa</sub> (MPa)</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>S<sub>sm</sub> (MPa)</th>
            </tr></thead>
            <tbody>
              {[
                ['Sin granallar (unpeened)', '241', '379'],
                ['Granallado (peened)', '398', '534'],
              ].map(([cond, ssa, ssm], i) => (
                <tr key={i}>
                  <td style={{ padding: '3px 8px' }}>{cond}</td>
                  <td style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{ssa}</td>
                  <td style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{ssm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '8px 0 0' }}>Los factores de concentración de esfuerzo: K<sub>f</sub> ≈ 2.2–3.8 (roscas laminadas), 3.0–5.8 (roscas cortadas), 2.1–2.3 (filete del perno).</p>
      </ConceptBlock>
      {p('Los tres puntos de falla por fatiga en un perno: ~65% en la rosca a la altura de la tuerca, ~20% en la terminación de la rosca, ~15% debajo de la cabeza. Siempre verifica la precarga máxima útil para fatiga:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>Precarga máxima para beneficio en fatiga:</div>
          <div style={{ fontSize: 16 }}>F<sub>i</sub> ≤ (1 − C) · S<sub>ut</sub> · A<sub>t</sub></div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Si Fi excede este valor, la precarga empeora la fatiga en vez de ayudar.</div>
        </div>
      </FormulaBox>
      <SubSection id="s8-11a">Cortante excéntrico</SubSection>
      {p('Cuando la carga de cortante no pasa por el centroide del grupo de pernos, cada perno recibe <strong>cortante directo más cortante por momento</strong>. El procedimiento en tres pasos:')}
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div style={{ fontWeight: 700 }}>Paso 1 — Cortante directo (igual para todos):</div>
          <div>F&apos; = V / n</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Paso 2 — Cortante por momento (proporcional a r):</div>
          <div>F&apos;&apos;<sub>i</sub> = M · r<sub>i</sub> / Σ r<sub>j</sub>²</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>M = P · e (momento de la carga excéntrica), ri = distancia del centroide al perno i.</div>
          <div style={{ fontWeight: 700, marginTop: 8 }}>Paso 3 — Suma vectorial:</div>
          <div>F<sub>i</sub> = √[(F&apos;<sub>x</sub> + F&apos;&apos;<sub>x,i</sub>)² + (F&apos;<sub>y</sub> + F&apos;&apos;<sub>y,i</sub>)²]</div>
        </div>
      </FormulaBox>
      <OjoBlock text="El perno más cargado está más lejos del centroide. Siempre verifica ese perno primero. El centroide se calcula como x̄ = ΣAi·xi/ΣAi, ȳ = ΣAi·yi/ΣAi — para pernos iguales, es el centro geométrico." />

      <SectionTitle id="s8-12">8-12 Uniones cargadas en cortante</SectionTitle>
      <PreguntaBlock text="¿Qué modo de falla gobierna cuando un perno trabaja a cortante? Puede ser cortante puro, aplastamiento o desgarramiento — y el modo crítico depende de la geometría de la unión." />
      <FormulaBox>
        <div style={{ lineHeight: 2 }}>
          <div>Cortante en perno: τ = F / (n·A) = F / (n·π·d²/4)</div>
          <div>Aplastamiento: σ<sub>b</sub> = F / (n·d·t)</div>
          <div>Desgarramiento: σ<sub>t</sub> = F / [(w − d)·t]</div>
        </div>
      </FormulaBox>
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, margin: '16px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Figura 8-23/24 — Cortante simple y doble en pernos</div>
        <svg viewBox="0 0 400 160" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
          <text x="100" y="14" fill={C} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Cortante simple</text>
          <rect x="30" y="50" width="50" height="60" fill="var(--bg-2)" stroke="var(--text-3)" strokeWidth="1" rx="2" />
          <rect x="120" y="50" width="50" height="60" fill="var(--bg-2)" stroke="var(--text-3)" strokeWidth="1" rx="2" />
          <line x1="80" y1="65" x2="120" y2="65" stroke="var(--danger)" strokeWidth="2" />
          <line x1="80" y1="95" x2="120" y2="95" stroke="var(--danger)" strokeWidth="2" />
          <circle cx="80" cy="80" r="7" fill="var(--accent)" opacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="80" y="84" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">d</text>
          <text x="55" y="75" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Placa</text>
          <text x="145" y="75" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Placa</text>
          <line x1="100" y1="25" x2="100" y2="44" stroke="var(--text-2)" strokeWidth="1.5" />
          <polygon points="96,44 104,44 100,50" fill="var(--text-2)" />
          <text x="100" y="22" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">F</text>
          <text x="100" y="140" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">n = 1 plano de cortante</text>

          <text x="300" y="14" fill={C} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">Cortante doble</text>
          <rect x="215" y="55" width="45" height="50" fill="var(--bg-2)" stroke="var(--text-3)" strokeWidth="1" rx="2" />
          <rect x="285" y="55" width="45" height="50" fill="var(--bg-2)" stroke="var(--text-3)" strokeWidth="1" rx="2" />
          <rect x="255" y="48" width="35" height="64" fill="var(--accent)" opacity="0.08" stroke="var(--accent)" strokeWidth="1.5" rx="2" />
          <line x1="260" y1="42" x2="275" y2="42" stroke="var(--text-2)" />
          <line x1="255" y1="65" x2="215" y2="65" stroke="var(--danger)" strokeWidth="2" />
          <line x1="255" y1="96" x2="215" y2="96" stroke="var(--danger)" strokeWidth="2" />
          <line x1="290" y1="65" x2="260" y2="65" stroke="var(--danger)" strokeWidth="2" />
          <line x1="290" y1="96" x2="260" y2="96" stroke="var(--danger)" strokeWidth="2" />
          <circle cx="260" cy="80" r="5" fill="var(--accent)" opacity="0.4" />
          <line x1="272" y1="25" x2="272" y2="44" stroke="var(--text-2)" strokeWidth="1.5" />
          <polygon points="268,44 276,44 272,50" fill="var(--text-2)" />
          <text x="272" y="22" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">F</text>
          <text x="235" y="75" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Ext.</text>
          <text x="310" y="75" fill="var(--text-3)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Ext.</text>
          <text x="273" y="75" fill="var(--accent)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">Int.</text>
          <text x="272" y="140" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">n = 2 planos de cortante</text>
        </svg>
      </div>
      <OjoBlock text="En cortante doble, el área resistente se duplica. Pero verifica siempre aplastamiento en las placas interior y exterior — no basta con verificar el cortante del perno." />

      <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: C, fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Resumen — Fórmulas clave</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, fontSize: 12 }}>
          {[
            ['Elevar carga', 'TR = (F·dm/2)·(l+πfdm)/(πdm−fl)'],
            ['Autobloqueo', 'f ≥ tan λ'],
            ['Constante rigidez', 'C = kb/(kb+km)'],
            ['Carga en perno', 'Fb = C·P + Fi'],
            ['Par–Precarga', 'T = K·Fi·d'],
            ['Fatiga Goodman', 'σa/Se + σm/Sut = 1/nf'],
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
