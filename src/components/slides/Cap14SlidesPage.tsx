'use client'
import { useState } from 'react'
import PresentationShell, { SlideData } from './PresentationShell'

const C = '#22C55E'

function S1({ revealed }: { revealed: number }) {
  void revealed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      <Eyebrow>Parte 4 — Diseño de sistemas</Eyebrow>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.1 }}>
        Engranes Rectos y<br />Helicoidales
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 20px)', color: 'var(--fg-2)', margin: 0 }}>Capítulo 14 — Metodología AGMA</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
        {['Lewis (1892)', 'AGMA 2101', 'Bending σ', 'Contact σH', 'SF & SH'].map(t => (
          <span key={t} style={{ background: `${C}22`, border: `1px solid ${C}55`, borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--font-mono)', color: C }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function S2({ revealed }: { revealed: number }) {
  const items = [
    { label: 'Ecuación de Lewis', eq: 'σ = WtPd / (F·Y)', note: 'Base histórica — no incluye concentradores ni velocidad' },
    { label: 'Factor de forma Y', eq: 'Y = f(N, presión φ)', note: 'Tabulado de Shigley — mayor Y → mayor resistencia' },
    { label: 'Factor de velocidad Kv', eq: 'Kv = ((A + √V) / A)^B', note: 'V en ft/min; A,B según calidad AGMA (Q = 3…12)' },
    { label: 'AGMA bending', eq: 'σ = Wt·Ko·Kv·Ks·Pd·(Km·CF)/(F·J)', note: 'J = factor geométrico de flexión; CF = factor de corona' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Lewis → AGMA Bending</Eyebrow>
      <h2 style={H2}>Esfuerzo de Flexión</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((it, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', background: 'var(--bg-1)', borderRadius: 10, padding: '14px 18px', borderLeft: `3px solid ${C}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13, marginBottom: 4 }}>{it.label}</div>
            <code style={{ fontSize: 15, color: 'var(--fg-1)' }}>{it.eq}</code>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>{it.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S3({ revealed }: { revealed: number }) {
  const factors = [
    { name: 'Ko', desc: 'Sobrecarga', values: 'Uniforme=1.0, Choque leve=1.25–1.5, Choque moderado=1.5–1.75' },
    { name: 'Kv', desc: 'Velocidad / calidad', values: 'Uso: A=(50+56(1−B))^0.5, B=(12−Qv)^(2/3)/4' },
    { name: 'Ks', desc: 'Tamaño', values: 'Ks = 1.192(√F·Y/Pd)^0.0535 (AGMA)' },
    { name: 'Km', desc: 'Factor de montaje', values: 'Km = 1+Cmc(Cpf·Cpm+Cma·Ce)' },
    { name: 'CF', desc: 'Corona', values: '1.0 (engrane normal), >1 si hay abombado excesivo' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Factores de corrección AGMA</Eyebrow>
      <h2 style={H2}>Factores Ko · Kv · Ks · Km</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {factors.map((f, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12, alignItems: 'start', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: C, textAlign: 'center' }}>{f.name}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{f.desc}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{f.values}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S4({ revealed }: { revealed: number }) {
  void revealed
  const [wt, setWt] = useState(500)
  const [ko, setKo] = useState(1.25)
  const [qv, setQv] = useState(6)
  const [pd, setPd] = useState(8)
  const [f, setF] = useState(1.5)
  const [km, setKm] = useState(1.3)
  const [j, setJ] = useState(0.42)
  const V = 1000
  const B = (12 - qv) ** (2 / 3) / 4
  const A = (50 + 56 * (1 - B)) ** 0.5
  const kv = ((A + Math.sqrt(V)) / A) ** B
  const sigma = (wt * ko * kv * 1.0 * pd * km) / (f * j)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Calculadora AGMA Bending</Eyebrow>
      <h2 style={H2}>σ = Wt·Ko·Kv·Ks·Pd·Km / (F·J)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Wt" unit="lb" value={wt} min={100} max={2000} step={50} onChange={setWt} color={C} />
          <Slider label="Ko" unit="" value={ko} min={1.0} max={2.0} step={0.05} onChange={setKo} color={C} />
          <Slider label="Qv (calidad)" unit="" value={qv} min={3} max={12} step={1} onChange={setQv} color={C} />
          <Slider label="Pd" unit="1/in" value={pd} min={2} max={20} step={1} onChange={setPd} color={C} />
          <Slider label="F (cara)" unit="in" value={f} min={0.5} max={4} step={0.25} onChange={setF} color={C} />
          <Slider label="Km" unit="" value={km} min={1.0} max={2.0} step={0.05} onChange={setKm} color={C} />
          <Slider label="J (factor geom.)" unit="" value={j} min={0.20} max={0.60} step={0.01} onChange={setJ} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="Kv (vel.)" eq={`${kv.toFixed(3)}`} color={C} />
          <FormulaBox label="σ bending" eq={`${sigma.toFixed(0)} psi`} color={C} />
          <div style={{ background: `${C}15`, borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>
            <div style={{ color: C, fontWeight: 600, marginBottom: 4 }}>V = 1000 ft/min (fijo en demo)</div>
            <div>B = {B.toFixed(4)}</div>
            <div>A = {A.toFixed(3)}</div>
            <div style={{ marginTop: 6 }}>Compare σ con St·YN/(SF·KT·KR) para verificar</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S5({ revealed }: { revealed: number }) {
  void revealed
  const [wt, setWt] = useState(500)
  const [ko, setKo] = useState(1.25)
  const [kv, setKv] = useState(1.35)
  const [ks, setKs] = useState(1.05)
  const [km, setKm] = useState(1.3)
  const [cp, setCp] = useState(191)
  const [cf, setCf] = useState(1.0)
  const [dp, setDp] = useState(3.0)
  const [f, setF] = useState(1.5)
  const [i, setI] = useState(0.107)
  const inner = (wt * ko * kv * ks * km * cf) / (dp * f * i)
  const sigH = inner > 0 ? -cp * Math.sqrt(inner) : 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Esfuerzo de contacto</Eyebrow>
      <h2 style={H2}>σH = –Cp · √(Wt·Ko·Kv·Ks·(Km·CF)/(dp·F·I))</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Slider label="Wt" unit="lb" value={wt} min={100} max={2000} step={50} onChange={setWt} color={C} />
          <Slider label="Ko" unit="" value={ko} min={1.0} max={2.0} step={0.05} onChange={setKo} color={C} />
          <Slider label="Kv" unit="" value={kv} min={1.0} max={2.5} step={0.05} onChange={setKv} color={C} />
          <Slider label="Ks" unit="" value={ks} min={1.0} max={1.5} step={0.01} onChange={setKs} color={C} />
          <Slider label="Km" unit="" value={km} min={1.0} max={2.0} step={0.05} onChange={setKm} color={C} />
          <Slider label="Cp (psi^0.5)" unit="" value={cp} min={150} max={230} step={1} onChange={setCp} color={C} />
          <Slider label="dp (in)" unit="in" value={dp} min={1} max={10} step={0.5} onChange={setDp} color={C} />
          <Slider label="F cara" unit="in" value={f} min={0.5} max={4} step={0.25} onChange={setF} color={C} />
          <Slider label="I (factor geom)" unit="" value={i} min={0.05} max={0.20} step={0.005} onChange={setI} color={C} />
          <Slider label="CF corona" unit="" value={cf} min={1.0} max={1.5} step={0.05} onChange={setCf} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <FormulaBox label="|σH|" eq={`${Math.abs(sigH).toFixed(0)} psi`} color={C} />
          <div style={{ background: `${C}15`, borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--fg-2)' }}>
            <div style={{ color: C, fontWeight: 600, marginBottom: 4 }}>Cp (coeficiente elástico)</div>
            <div>Acero-Acero: 191 √psi</div>
            <div>Hierro fund.-Acero: 163 √psi</div>
            <div style={{ marginTop: 6 }}>I = cosφ·sinφ/(2mN) · (mG/(mG+1))</div>
            <div style={{ marginTop: 6, color: inner > 0 ? 'var(--fg-2)' : '#EF4444' }}>
              {inner > 0 ? 'Verificar: |σH| ≤ Sc·ZN/(SH·KT·KR)' : 'Parámetros inválidos'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function S6({ revealed }: { revealed: number }) {
  const rows = [
    ['AGMA Grado 1', 'St = 55 HB + 1000 psi', 'Sc = 322 HB + 29 100 psi'],
    ['AGMA Grado 2', 'St = 55 HB + 1000 psi', 'Sc = 349 HB + 34 300 psi'],
    ['Acero cementado', '~55 000 psi', '~180 000 psi'],
    ['Hierro fundido', '~8 700 psi', '~50 000 psi'],
    ['Bronce', '~5 700 psi', '~30 000 psi'],
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resistencia del material AGMA</Eyebrow>
      <h2 style={H2}>St (flexión) y Sc (contacto)</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.4fr', gap: 8, background: `${C}22`, borderRadius: 8, padding: '10px 14px' }}>
          {['Material', 'St (psi)', 'Sc (psi)'].map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.4fr', gap: 8, background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
            {r.map((cell, j) => (
              <div key={j} style={{ fontSize: 13, color: j === 0 ? 'var(--fg-1)' : 'var(--fg-2)', fontFamily: j > 0 ? 'var(--font-mono)' : undefined }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-2)', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
        Los factores YN y ZN (ciclos) reducen St y Sc para número de ciclos &lt; 3×10⁶
      </div>
    </div>
  )
}

function S7({ revealed }: { revealed: number }) {
  void revealed
  const [st, setSt] = useState(26000)
  const [yn, setYn] = useState(0.9)
  const [sf, setSf] = useState(1.2)
  const [sc, setSc] = useState(85000)
  const [zn, setZn] = useState(0.85)
  const [sh, setSh] = useState(1.2)
  const Sat = (st * yn) / sf
  const Sac = (sc * zn) / sh
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Factores de seguridad AGMA</Eyebrow>
      <h2 style={H2}>SF (flexión) y SH (contacto)</h2>
      <p style={{ color: 'var(--fg-2)', fontSize: 14, margin: 0 }}>SF = (St·YN/KT·KR) / σ ≥ 1.2 | SH = (Sc·ZN/KT·KR) / |σH| ≥ 1.2</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 12, marginBottom: 4 }}>// Flexión</div>
          <Slider label="St" unit="psi" value={st} min={10000} max={60000} step={500} onChange={setSt} color={C} />
          <Slider label="YN" unit="" value={yn} min={0.5} max={1.3} step={0.01} onChange={setYn} color={C} />
          <Slider label="SF" unit="" value={sf} min={1.0} max={2.5} step={0.05} onChange={setSf} color={C} />
          <FormulaBox label="Sat permisible" eq={`${Sat.toFixed(0)} psi`} color={C} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 12, marginBottom: 4 }}>// Contacto</div>
          <Slider label="Sc" unit="psi" value={sc} min={20000} max={200000} step={1000} onChange={setSc} color={C} />
          <Slider label="ZN" unit="" value={zn} min={0.5} max={1.3} step={0.01} onChange={setZn} color={C} />
          <Slider label="SH" unit="" value={sh} min={1.0} max={2.5} step={0.05} onChange={setSh} color={C} />
          <FormulaBox label="Sac permisible" eq={`${Sac.toFixed(0)} psi`} color={C} />
        </div>
      </div>
    </div>
  )
}

function S8({ revealed }: { revealed: number }) {
  const pts = [
    'Lewis (1892) sentó la base: σ = WtPd/(FY) — carga tangencial, módulo y factor forma',
    'AGMA agrega Ko·Kv·Ks·Km·CF para capturar sobrecargas, velocidad, tamaño y montaje',
    'Esfuerzo de contacto σH = –Cp·√(...·I⁻¹) — diseño paralelo al de fatiga superficial',
    'Materiales: St ∝ HB para Grado 1&2; cementados y nitrurados alcanzan St>55 kpsi',
    'Factores YN / ZN reducen las allowables para N < 3×10⁶ ciclos (región de vida finita)',
    'Cf (condición superficial) y CH (dureza relativa) ajustan σH y Sc respectivamente',
    'KR (confiabilidad) y KT (temperatura) reducen permisibles en condiciones severas',
    'KB (espesor del aro): si tR/ht < 1.2, el aro puede flexionar — KB > 1.0',
    'Verificar AMBOS: SF ≥ 1.2 (flexión) y SH ≥ 1.2 (contacto) — el contacto suele gobernar',
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Resumen Cap. 14</Eyebrow>
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

function S9({ revealed }: { revealed: number }) {
  const factors = [
    { name: 'Cf', desc: 'Condición superficial', values: '1.0 normal, 1.25–1.5 acabado pobre, 0.8–0.9 endurecido' },
    { name: 'CH', desc: 'Relación de dureza', values: '1.0 si igual dureza; ajusta cuando piñón y rueda tienen HB distinto' },
    { name: 'KR', desc: 'Confiabilidad', values: '0.85 (R=90%), 1.0 (99%), 1.25 (99.9%), 1.50 (99.99%)' },
    { name: 'KT', desc: 'Temperatura', values: '1.0 para T≤120°C; T(°F)/620 para T>250°F' },
    { name: 'KB', desc: 'Espesor del aro', values: '1.0 si tR/ht≥1.2; >1.0 si aro delgado' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <Eyebrow>Factores adicionales AGMA</Eyebrow>
      <h2 style={H2}>Cf · CH · KR · KT · KB</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        {factors.map((f, i) => (
          <div key={i} style={{ opacity: i < revealed ? 1 : 0.15, transition: 'opacity 0.4s', display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12, alignItems: 'start', background: 'var(--bg-1)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: C, textAlign: 'center' }}>{f.name}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{f.desc}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{f.values}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function S10({ revealed }: { revealed: number }) {
  void revealed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Eyebrow>Flujo de diseño AGMA</Eyebrow>
      <h2 style={H2}>Procedimiento completo</h2>
      <svg viewBox="0 0 500 420" width="90%" style={{ maxWidth: 500 }}>
        <defs>
          <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill={C} /></marker>
        </defs>
        <rect x="140" y="0" width="220" height="32" rx="6" fill={`${C}20`} stroke={C} strokeWidth="1.5" />
        <text x="250" y="21" textAnchor="middle" fontSize="10" fill={C} fontFamily="var(--font-mono)" fontWeight="600">Entrada: H, n, N, Pd, F, φ</text>
        <line x1="250" y1="32" x2="250" y2="46" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="90" y="46" width="320" height="32" rx="6" fill="var(--bg-1)" stroke={C} strokeWidth="1.5" />
        <text x="250" y="59" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">Wt = 33000H/V · V = πdn/12</text>
        <text x="250" y="71" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">Ko · Kv · Ks · Km · Cf · J · I · Cp</text>
        <line x1="250" y1="78" x2="250" y2="92" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="50" y="92" width="170" height="38" rx="6" fill="var(--bg-1)" stroke="var(--fg-3)" strokeWidth="1.5" />
        <text x="135" y="109" textAnchor="middle" fontSize="10" fill={C} fontFamily="var(--font-mono)" fontWeight="600">σ (flexión)</text>
        <text x="135" y="122" textAnchor="middle" fontSize="8" fill="var(--fg-2)" fontFamily="var(--font-mono)">Wt·Ko·Kv·Ks·Pd·Km/(F·J)</text>
        <rect x="280" y="92" width="170" height="38" rx="6" fill="var(--bg-1)" stroke="var(--fg-3)" strokeWidth="1.5" />
        <text x="365" y="109" textAnchor="middle" fontSize="10" fill={C} fontFamily="var(--font-mono)" fontWeight="600">σH (contacto)</text>
        <text x="365" y="122" textAnchor="middle" fontSize="8" fill="var(--fg-2)" fontFamily="var(--font-mono)">Cp·√(...Cf/(dp·F·I))</text>
        <line x1="135" y1="130" x2="135" y2="144" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <line x1="365" y1="130" x2="365" y2="144" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="50" y="144" width="170" height="34" rx="6" fill={`${C}10`} stroke={C} strokeWidth="1.5" />
        <text x="135" y="158" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">St·YN / (KT·KR)</text>
        <text x="135" y="170" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">SF = St·YN/(σ·KT·KR)</text>
        <rect x="280" y="144" width="170" height="34" rx="6" fill={`${C}10`} stroke={C} strokeWidth="1.5" />
        <text x="365" y="158" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">Sc·ZN·CH / (KT·KR)</text>
        <text x="365" y="170" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">SH = Sc·ZN·CH/(σH·KT·KR)</text>
        <line x1="220" y1="161" x2="250" y2="190" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <line x1="250" y1="161" x2="280" y2="190" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="110" y="194" width="280" height="38" rx="8" fill={`${C}25`} stroke={C} strokeWidth="2" />
        <text x="250" y="211" textAnchor="middle" fontSize="11" fill={C} fontFamily="var(--font-mono)" fontWeight="700">SF ≥ 1.2 y SH ≥ 1.2?</text>
        <text x="250" y="225" textAnchor="middle" fontSize="9" fill="var(--fg-2)" fontFamily="var(--font-mono)">(AGMA recomienda ambos ≥ 1.2)</text>
        <line x1="250" y1="232" x2="250" y2="248" stroke={C} strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="100" y="248" width="300" height="34" rx="17" fill="#22C55E" opacity="0.15" stroke="#22C55E" strokeWidth="1.5" />
        <text x="250" y="268" textAnchor="middle" fontSize="11" fill="#22C55E" fontFamily="var(--font-mono)" fontWeight="700">Cumple → Diseño OK</text>
        <line x1="390" y1="213" x2="460" y2="213" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="460" y1="213" x2="460" y2="258" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arr2)" />
        <rect x="410" y="248" width="100" height="34" rx="6" fill="#EF4444" opacity="0.1" stroke="#EF4444" strokeWidth="1.5" />
        <text x="460" y="265" textAnchor="middle" fontSize="9" fill="#EF4444" fontFamily="var(--font-mono)" fontWeight="600">No → Iterar</text>
        <text x="460" y="276" textAnchor="middle" fontSize="8" fill="#EF4444" fontFamily="var(--font-mono)">cambiar material / geometría</text>
      </svg>
    </div>
  )
}

const SLIDES: SlideData[] = [
  { id: 1, title: 'Título', note: 'Cap 14: extensión natural del Cap 13. Aquí cuantificamos el fallo.', Content: S1 },
  { id: 2, title: 'Esfuerzo de flexión', note: 'Lewis subestima; AGMA agrega todos los factores reales.', revealCount: 4, Content: S2 },
  { id: 3, title: 'Factores AGMA', note: 'Ko domina en aplicaciones de impacto; Kv es crítico a alta velocidad.', revealCount: 5, Content: S3 },
  { id: 4, title: 'Calculadora σ bending', note: 'Variar Qv muestra cómo la calidad de fabricación impacta directamente en σ.', Content: S4 },
  { id: 5, title: 'Esfuerzo de contacto σH', note: 'σH es compresivo — el fallo es picadura (pitting), no fractura.', Content: S5 },
  { id: 6, title: 'Materiales St & Sc', note: 'Para acero, aumentar HB 10 puntos sube St ≈550 psi — economía del tratamiento térmico.', revealCount: 5, Content: S6 },
  { id: 7, title: 'Factores de seguridad SF & SH', note: 'AGMA recomienda SF ≥ 1.2 y SH ≥ 1.2; en transmisiones críticas usar ≥1.5.', Content: S7 },
  { id: 8, title: 'Puntos clave', note: 'Los 9 puntos resumen el flujo completo de diseño AGMA para engranes rectos, incluyendo los factores adicionales Cf, CH, KR, KT, KB.', revealCount: 9, Content: S8 },
  { id: 9, title: 'Factores adicionales AGMA', note: 'Cf y CH son específicos de contacto; KR, KT y KB aplican a ambos esfuerzos.', revealCount: 5, Content: S9 },
  { id: 10, title: 'Flujo de diseño AGMA', note: 'Este diagrama integra todos los factores en un proceso iterativo: entrada → σ y σH → permisibles → SF/SH → OK o iterar.', Content: S10 },
]

export default function Cap14SlidesPage() {
  return <PresentationShell chapterId={14} partColor={C} slides={SLIDES} />
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
