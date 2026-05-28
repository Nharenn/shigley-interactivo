'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import AGMACalc from '@/components/interactive/AGMACalc'

const accent = 'var(--part-3)'

function LewisCalc() {
  const [Wt, setWt] = useState(1000)
  const [Pd, setPd] = useState(8)
  const [F, setF] = useState(1.5)
  const [N, setN] = useState(20)
  const [phi, setPhi] = useState(20)

  const Ytable: Record<string, Record<number, number>> = {
    '14.5': { 12: 0.210, 16: 0.276, 20: 0.317, 24: 0.344, 30: 0.370, 40: 0.397, 75: 0.435, 9999: 0.485 },
    '20': { 12: 0.245, 16: 0.299, 20: 0.320, 24: 0.345, 30: 0.369, 40: 0.394, 75: 0.435, 9999: 0.485 },
    '25': { 12: 0.287, 16: 0.328, 20: 0.341, 24: 0.360, 30: 0.379, 40: 0.399, 75: 0.435, 9999: 0.485 },
  }
  const phiKey = phi === 14.5 ? '14.5' : phi === 25 ? '25' : '20'
  const Ylookup = Ytable[phiKey] || Ytable['20']
  const closestN = Object.keys(Ylookup).map(Number).reduce((prev, curr) => Math.abs(curr - N) < Math.abs(prev - N) ? curr : prev)
  const Y = Ylookup[closestN] || 0.320

  const sigmaLewis = (Wt * Pd) / (F * Y)
  const d = N / Pd
  const p = Math.PI / Pd
  const m = 25.4 / Pd

  return (
    <div className="my-6 p-5 rounded-2xl border-2" style={{ borderColor: accent, background: 'var(--bg-2)' }}>
      <h4 className="font-bold mb-4 text-lg" style={{ color: accent }}>LewisEquation — Calculadora de esfuerzo de flexión</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-2)' }}>Wt — Fuerza tangencial (lbf)</label>
          <input type="range" min={100} max={10000} step={50} value={Wt} onChange={e => setWt(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
          <span className="text-sm font-mono" style={{ color: accent }}>{Wt} lbf</span>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-2)' }}>Pd — Paso diametral (1/in)</label>
          <input type="range" min={2} max={24} step={1} value={Pd} onChange={e => setPd(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
          <span className="text-sm font-mono" style={{ color: accent }}>{Pd}</span>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-2)' }}>F — Ancho de cara (in)</label>
          <input type="range" min={0.5} max={6} step={0.25} value={F} onChange={e => setF(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
          <span className="text-sm font-mono" style={{ color: accent }}>{F.toFixed(2)} in</span>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-2)' }}>N — Número de dientes</label>
          <input type="range" min={12} max={200} step={1} value={N} onChange={e => setN(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
          <span className="text-sm font-mono" style={{ color: accent }}>{N}</span>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-2)' }}>φ — Ángulo de presión (°)</label>
          <select value={phi} onChange={e => setPhi(+e.target.value)} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: 'var(--border)' }}>
            <option value={14.5}>14.5°</option>
            <option value={20}>20°</option>
            <option value={25}>25°</option>
          </select>
        </div>
      </div>
      <div className="mt-4 p-4 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}>
        <div className="text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>σ (Lewis)</div>
          <div className="text-xl font-bold" style={{ color: accent }}>{sigmaLewis.toFixed(0)} psi</div>
        </div>
        <div className="text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>Y (factor forma)</div>
          <div className="text-xl font-bold" style={{ color: '#3B82F6' }}>{Y.toFixed(3)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>d (diámetro)</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-2)' }}>{d.toFixed(3)} in</div>
        </div>
        <div className="text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>m (módulo)</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-2)' }}>{m.toFixed(2)} mm</div>
        </div>
      </div>
      <p className="text-xs mt-2" style={{ color: 'var(--text-3)' }}>
        σ = Wt·Pd/(F·Y) | Y interpolado para φ={phi}°, N≈{closestN} | Este es el esfuerzo sin factores AGMA (Ko, Kv, etc.)
      </p>
    </div>
  )
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold mt-10 mb-4 pb-2 border-b-2" style={{ borderColor: accent, color: accent }}>
      {children}
    </h2>
  )
}

function FormulaBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-lg font-mono text-sm overflow-x-auto" style={{ background: 'var(--bg-2)', borderLeft: `4px solid ${accent}` }}>
      {children}
    </div>
  )
}

function ConceptBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 p-4 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
      <div className="font-bold mb-2" style={{ color: accent }}>{title}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <AGMACalc />
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado 14-1</h3>
        <p className="mb-3 text-sm">Un par de engranes rectos de acero transmite 20 hp a 1750 rpm del piñón. N_P=20, N_G=50, Pd=8, F=1.5 pulg, φ=20°, Qv=7, Ko=1.25, Km=1.3. Material: acero grado 1, HB=300. Calcular SF y SH.</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>V = π·d_P·n = π·(20/8)·1750 = 1374 ft/min; Wt = 33000·20/1374 = 481 lbf</li>
          <li>Kv: B=0.25(12-7)^(2/3)=0.5306, A=50+56(1-0.5306)=76.28; Kv=((76.28+√1374)/76.28)^0.5306 ≈ 1.404</li>
          <li>Ks = 1.192·(F·√Y_P/Pd)^0.0535 ≈ 1.047 (Y_P≈0.322 para N=20)</li>
          <li>J_P ≈ 0.32, I = (sin20°·cos20°)/(2·1)·(2.5/3.5) ≈ 0.107</li>
          <li>σ_b = 481·1.25·1.404·1.047·(8/1.5)·(1.3/0.32) = 41 500 psi</li>
          <li>σ_H = 2300·√(481·1.25·1.404·1.047·1.3/(2.5·1.5·0.107)) ≈ 103 500 psi</li>
          <li>St(HB=300): 0.533·300+26600 = 42 590 psi; Sc: 322·300+29100 = 125 700 psi</li>
          <li>N=10⁷ → YN=ZN=1.0; KT=KR=1.0</li>
          <li>SF = 42590·1/(41500·1·1) = 1.03 ✓; SH = 125700·1·1/(103500·1·1) = 1.21 ✓</li>
        </ol>
      </div>
    </div>
  )
}

const sections = [
  { id: 'intro', label: 'Pregúntate esto' },
  { id: '14-1', label: '14-1 Ecuación de Lewis' },
  { id: '14-2', label: '14-2 Durabilidad superficial' },
  { id: '14-3', label: '14-3 Esfuerzo AGMA' },
  { id: '14-4', label: '14-4 Resistencia AGMA' },
  { id: '14-5', label: '14-5 Factores J e I' },
  { id: '14-6', label: '14-6 Cp' },
  { id: '14-7', label: '14-7 Kv' },
  { id: '14-8', label: '14-8 Ko' },
  { id: '14-9', label: '14-9 Cf (ZR)' },
  { id: '14-10', label: '14-10 Ks' },
  { id: '14-11', label: '14-11 Km' },
  { id: '14-12', label: '14-12 CH' },
  { id: '14-13', label: '14-13 YN y ZN' },
  { id: '14-14', label: '14-14 KR (YZ)' },
  { id: '14-15', label: '14-15 KT (Yθ)' },
  { id: '14-16', label: '14-16 KB' },
  { id: '14-17', label: '14-17 SF y SH' },
  { id: '14-18', label: '14-18 Análisis' },
  { id: '14-19', label: '14-19 Diseño acoplamiento' },
  { id: 'flujo', label: 'Flujo diseño AGMA' },
  { id: 'ojo-aqui', label: 'Ojo aquí' },
]

export default function Cap14Page() {
  return (
    <ChapterShell
      chapterId={14}
      chapterNum="14"
      title="Engranes rectos y helicoidales"
      subtitle="Análisis y diseño según la metodología AGMA para resistir falla por flexión y picadura superficial."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <ConceptBlock title="Pregúntate esto">
        ¿Sabes por qué el esfuerzo de contacto σ<sub>H</sub> suele gobernar el diseño de engranes y no el esfuerzo de flexión σ? ¿Qué ocurre con la resistencia cuando la temperatura supera 120°C o la confiabilidad requerida es del 99.99%? ¿Por qué el factor de velocidad K<sub>v</sub> es más crítico que K<sub>o</sub> en transmisiones rápidas? Estas preguntas guían el análisis AGMA completo.
      </ConceptBlock>

      <SectionTitle id="14-1">14-1 Ecuación de flexión de Lewis</SectionTitle>
      <p className="mb-4">Wilfred Lewis (1892) modeló el diente de engrane como viga en voladizo. El módulo de sección I/c = Ft²/6:</p>
      <FormulaBox>
        σ = M/(I/c) = 6Wt·l / (F·t²)  →  σ = Wt·Pd / (F·Y)
        <br />donde Y = factor de forma de Lewis (función del número de dientes)
        <br />Pd = paso diametral = N/d
      </FormulaBox>
      <ConceptBlock title="Factor de forma de Lewis Y">
        Depende del número de dientes N y el ángulo de presión φ. Para φ = 20° (dientes de altura completa):
        N = 12 → Y ≈ 0.245 | N = 20 → Y ≈ 0.320 | N = 40 → Y ≈ 0.389 | N = 75 → Y ≈ 0.435 | N = ∞ (cremallera) → Y ≈ 0.550
      </ConceptBlock>
      <FormulaBox>
        σ = Wt·Ko·Kv·Ks·Pd / (F·J)  (AGMA, unidades inglesas)
        <br />σ = Wt·Ko·Kv·Ks / (b·mt·J)  (AGMA, unidades SI)
      </FormulaBox>

      <LewisCalc />

      <SectionTitle id="14-2">14-2 Durabilidad de la superficie (teoría de Hertz)</SectionTitle>
      <p className="mb-4">La picadura superficial es falla por fatiga de contacto. Usando la teoría de Hertz para dos cilindros en contacto:</p>
      <FormulaBox>
        pmax = 2F / (π·b·l)
        <br />σH = -Cp · √(Wt·Ko·Kv·Ks·Km / (dp·F·I))
        <br />Cp = coeficiente elástico (√psi), I = factor de geometría para contacto
      </FormulaBox>
      <ConceptBlock title="Coeficiente elástico Cp (ZE en SI)">
        Acero/Acero: Cp = 2300 (psi^0.5) | Acero/Hierro fundido: Cp ≈ 2160 | Acero/Bronce: Cp ≈ 1950
        <br />En SI: ZE = 191 (N/mm²)^0.5 para acero/acero
      </ConceptBlock>

      <SectionTitle id="14-3">14-3 Ecuaciones de esfuerzo de AGMA</SectionTitle>
      <p className="mb-4">Las ecuaciones AGMA 2001-D04 son el estándar para diseño de engranes en EUA:</p>
      <FormulaBox>
        Flexión:   σ = Wt · Ko · Kv · Ks · (Pd/F) · (Km/J)
        <br />Contacto: σH = -Cp · √(Wt · Ko · Kv · Ks · (Km/(dp·F·I)))
        <br /><br />En unidades SI:
        <br />Flexión:   σ = Wt · Ko · Kv · Ks · (1/(b·mt)) · (KH/YJ)
        <br />Contacto: σH = -ZE · √(Wt · Ko · Kv · Ks · (ZR·KH/(d1·b·ZI)))
      </FormulaBox>

      <SectionTitle id="14-4">14-4 Ecuaciones de resistencia de AGMA</SectionTitle>
      <p className="mb-4">Los esfuerzos permisibles AGMA son para 10⁷ ciclos, confiabilidad 99%, carga unidireccional:</p>
      <FormulaBox>
        Permisible flexión:   σ_perm = (St/SF) · (YN/(KT·KR))
        <br />Permisible contacto: σH_perm = (Sc/SH) · (ZN·CH/(KT·KR))
        <br /><br />Criterio de diseño: σ ≤ σ_perm  y  σH ≤ σH_perm
      </FormulaBox>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Material</th>
            <th className="p-2">Tratamiento</th>
            <th className="p-2">HB</th>
            <th className="p-2">St (kpsi)</th>
            <th className="p-2">Sc (kpsi)</th>
          </tr></thead>
          <tbody>
            {[
              ['Acero', 'Recocido', '180', 'St=0.533HB+26.6', 'Sc=322HB+29100 psi'],
              ['Acero', 'Temple/Rev.', '300', '~55-65', '~130-140'],
              ['Acero', 'Carburiz.+endurecido', '≥55HRC', '55-75', '170-225'],
              ['Hierro fundido A48', 'Grado 40', '201', '13', '75'],
              ['Hierro dúctil A536', '80-55-06', '179', '22-33', '85-105'],
              ['Bronce ASTM B-148', 'Trat. térmico', '≥90ksi', '23.6', '65'],
            ].map(([mat, trat, hb, st, sc], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{mat}</td>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{trat}</td>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{hb}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{st}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{sc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-6 p-4 rounded-2xl bg-white border-2" style={{ borderColor: accent }}>
        <div className="font-mono text-xs uppercase mb-3" style={{ color: accent }}>Gráfica S-N — Resistencias St' y Sc' vs ciclos de carga (aceros)</div>
        <svg viewBox="0 0 480 280" width="100%" style={{ maxWidth: 480 }}>
          <line x1="60" y1="240" x2="450" y2="240" stroke="var(--text-3)" strokeWidth="1.5" />
          <line x1="60" y1="240" x2="60" y2="20" stroke="var(--text-3)" strokeWidth="1.5" />
          <text x="250" y="270" fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle">N — Ciclos de carga</text>
          <text x="18" y="130" fontSize="11" fill="var(--text-2)" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,18,130)">Esfuerzo (kpsi)</text>
          {[
            { n: '10³', x: 60 },
            { n: '10⁴', x: 134 },
            { n: '10⁵', x: 209 },
            { n: '10⁶', x: 283 },
            { n: '10⁷', x: 356 },
            { n: '10⁸', x: 430 },
          ].map(({ n, x }) => (
            <text key={n} x={x} y="255" fontSize="9" fill="var(--text-3)" fontFamily="monospace" textAnchor="middle">{n}</text>
          ))}
          {[
            { s: '200', y: 30 },
            { s: '150', y: 80 },
            { s: '100', y: 140 },
            { s: '75', y: 176 },
            { s: '50', y: 216 },
          ].map(({ s, y }) => (
            <text key={s} x="54" y={y + 4} fontSize="9" fill="var(--text-3)" fontFamily="monospace" textAnchor="end">{s}</text>
          ))}
          <path d="M 60,20 C 90,22 120,30 160,55 C 200,80 240,108 280,140 C 310,158 335,170 356,176 C 385,182 410,188 440,195" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
          <text x="445" y="198" fontSize="9" fill="#3B82F6" fontFamily="monospace" fontWeight="bold">Sc'</text>
          <path d="M 60,80 C 90,85 120,100 160,132 C 200,158 240,178 280,196 C 310,206 335,214 356,220 C 385,225 410,230 440,234" fill="none" stroke="#EF4444" strokeWidth="2.5" />
          <text x="445" y="238" fontSize="9" fill="#EF4444" fontFamily="monospace" fontWeight="bold">St'</text>
          <circle cx="283" cy="140" r="3.5" fill="#3B82F6" />
          <circle cx="283" cy="196" r="3.5" fill="#EF4444" />
          <line x1="283" y1="240" x2="283" y2="56" stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="283" y="50" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">10⁶ rev (ref.)</text>
          <circle cx="356" cy="176" r="3.5" fill="#3B82F6" />
          <circle cx="356" cy="220" r="3.5" fill="#EF4444" />
          <line x1="356" y1="240" x2="356" y2="56" stroke="var(--text-3)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="356" y="50" textAnchor="middle" fontSize="9" fill="var(--text-3)" fontFamily="monospace">10⁷ rev (cap.)</text>
          <rect x="320" y="65" width="120" height="42" rx="4" fill="var(--bg-2)" stroke="var(--border)" strokeWidth="0.8" />
          <rect x="328" y="73" width="12" height="3" rx="1" fill="#3B82F6" />
          <text x="344" y="79" fontSize="9" fill="#3B82F6" fontFamily="monospace">Sc' (contacto)</text>
          <rect x="328" y="89" width="12" height="3" rx="1" fill="#EF4444" />
          <text x="344" y="95" fontSize="9" fill="#EF4444" fontFamily="monospace">St' (flexión)</text>
          <text x="160" y="12" fontSize="8" fill="var(--text-3)" fontFamily="monospace">Acero grado 1 (HB = 300): St' = 0.533·HB+26.6 kpsi</text>
          <text x="160" y="24" fontSize="8" fill="var(--text-3)" fontFamily="monospace">Sc' = 322·HB + 29100 psi (unidades kpsi = Sc'/1000)</text>
        </svg>
        <p className="text-sm mt-2" style={{ color: 'var(--text-2)' }}>
          <strong>Punto clave:</strong> Sc' siempre es mayor que St', por eso la falla por contacto (picadura) suele gobernar cuando el material es duro. La resistencia aumenta con menos ciclos N — por eso se usan YN y ZN para ajustar.
        </p>
      </div>

      <SectionTitle id="14-5">14-5 Factores geométricos I y J (ZI y YJ)</SectionTitle>
      <ConceptBlock title="Factor de geometría para flexión J">
        J incorpora la forma del diente (factor de Lewis Y) y la concentración de esfuerzo en la raíz del diente. Valores típicos: φ=20°, N=17 → J≈0.27; N=25 → J≈0.32; N=50 → J≈0.38; N=275 (cremallera) → J≈0.485
      </ConceptBlock>
      <ConceptBlock title="Factor de geometría para contacto I (ZI)">
        I = (sin φ · cos φ)/(2mN) · (mG/(mG+1))  para engranes rectos externos
        <br />donde mN = relación de ancho de contacto (=1 para rectos), mG = relación de velocidades = NL/NP
      </ConceptBlock>

      <SectionTitle id="14-6">14-6 Coeficiente elástico Cp (ZE)</SectionTitle>
      <FormulaBox>
        Cp = √(1 / (π·[(1-ν₁²)/E₁ + (1-ν₂²)/E₂]))
        <br />Acero-Acero (E=30 Mpsi, ν=0.3): Cp = 2300 √psi = 191 √MPa
      </FormulaBox>

      <SectionTitle id="14-7">14-7 Factor dinámico Kv</SectionTitle>
      <p className="mb-4">Cuenta por cargas dinámicas debidas a la imprecisión en el paso y perfil del diente. Depende de la velocidad V (pie/min) y calidad AGMA Q<sub>v</sub>:</p>
      <FormulaBox>
        Kv = ((A + √V)/A)^B
        <br />A = 50 + 56(1-B),  B = 0.25(12-Qv)^(2/3)
        <br />Calidad Qv: 3-7 (general), 8-10 (preciso), 11-13 (ultra-preciso)
      </FormulaBox>

      <SectionTitle id="14-8">14-8 Factor de sobrecarga Ko</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Fuente de potencia</th>
            <th className="p-2">Carga uniforme</th>
            <th className="p-2">Carga moderada</th>
            <th className="p-2">Carga pesada</th>
          </tr></thead>
          <tbody>
            {[
              ['Uniforme (motor eléctrico)', '1.00', '1.25', '1.75 o más'],
              ['Choque ligero (turbina vapor)', '1.25', '1.50', '2.00 o más'],
              ['Choque medio (motor de comb.)', '1.50', '1.75', '2.25 o más'],
            ].map(([src, u, m, h], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{src}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{u}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{m}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="14-9">14-9 Factor de condición superficial Cf (ZR)</SectionTitle>
      <p className="mb-4">El factor de condición superficial C<sub>f</sub> (Z<sub>R</sub> en SI) corrige el esfuerzo de contacto por el acabado superficial, esfuerzos residuales y endurecimiento por trabajo de las superficies de los dientes.</p>
      <ConceptBlock title="Valores de Cf (AGMA 2001-D04)">
        C<sub>f</sub> = 1.0 para engranes fabricados con procesos normales (rectificado, cepillado, tallado) sin esfuerzos residuales significativos.
        <br />C<sub>f</sub> = 1.25 – 1.50 para superficies con acabado deficiente, sin endurecimiento superficial o con esfuerzos residuales desfavorables.
        <br />C<sub>f</sub> = 0.8 – 0.9 cuando se aplican procesos de endurecimiento superficial (nitruración, carburización) que introducen esfuerzos residuales compresivos benéficos.
      </ConceptBlock>
      <FormulaBox>
        Ecuación AGMA de contacto con C<sub>f</sub>:
        <br />σ<sub>H</sub> = C<sub>p</sub> · √(W<sup>t</sup> · K<sub>o</sub> · K<sub>v</sub> · K<sub>s</sub> · K<sub>m</sub> · C<sub>f</sub> / (d<sub>p</sub> · F · I))
      </FormulaBox>

      <SectionTitle id="14-10">14-10 Factor de tamaño Ks</SectionTitle>
      <FormulaBox>
        Ks = 1.192·(F·√Y/Pd)^0.0535  (unidades inglesas, AGMA 2001-D04)
        <br />Si Ks &lt; 1.0 → usar Ks = 1.0
      </FormulaBox>

      <SectionTitle id="14-11">14-11 Factor de distribución de la carga Km (KH)</SectionTitle>
      <FormulaBox>
        Km = 1 + Cmc(Cpf·Cpm + Cma·Ce)
        <br />Cmc = 1 (diente no coronado), 0.8 (coronado)
        <br />Cpf = Fc/(10·d) - 0.025  (cuando F ≤ d)
        <br />Cpm = 1 (eje simétrico), 1.1 (eje asimétrico)
        <br />Ce = 1 (convencional), 0.8 (engranes de precisión ajustados)
      </FormulaBox>

      <SectionTitle id="14-12">14-12 Factor de relación de dureza CH</SectionTitle>
      <p className="mb-4">Cuando el piñón y la rueda tienen diferentes durezas superficiales, el factor C<sub>H</sub> (Z<sub>W</sub> en SI) ajusta la resistencia al contacto del miembro más blando. Si ambos tienen la misma dureza, C<sub>H</sub> = 1.0.</p>
      <ConceptBlock title="Cálculo de CH (aceros endurecidos completamente)">
        C<sub>H</sub> = 1.0 + 0.00198 · (m<sub>G</sub> − 1.8) · ((HB<sub>P</sub> − HB<sub>G</sub>) / HB<sub>G</sub>)
        <br />donde m<sub>G</sub> = N<sub>G</sub>/N<sub>P</sub> (relación de velocidades), HB<sub>P</sub> y HB<sub>G</sub> son las durezas Brinell del piñón y la rueda.
        <br />Rango: m<sub>G</sub> ≥ 1.8. Si m<sub>G</sub> &lt; 1.8, usar C<sub>H</sub> = 1.0.
      </ConceptBlock>
      <FormulaBox>
        σ<sub>H,perm</sub> = (S<sub>c</sub> · Z<sub>N</sub> · C<sub>H</sub>) / (S<sub>H</sub> · K<sub>T</sub> · K<sub>R</sub>)
        <br />S<sub>c</sub> es la resistencia al contacto del miembro más blando (generalmente la rueda).
      </FormulaBox>

      <SectionTitle id="14-13">14-13 Factores de ciclos de esfuerzo YN y ZN</SectionTitle>
      <FormulaBox>
        YN = 1.3558 · N^(-0.0178)    (acero, 3×10⁶ ≤ N ≤ 3×10⁸)
        <br />ZN = 1.4488 · N^(-0.023)  (acero, endurecido completamente)
      </FormulaBox>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2">N (ciclos)</th>
            <th className="p-2">YN (acero)</th>
            <th className="p-2">ZN (acero endurecido)</th>
          </tr></thead>
          <tbody>
            {[
              ['10⁴', '~2.70', '~2.83'],
              ['10⁵', '~2.16', '~2.18'],
              ['10⁶', '~1.66', '~1.68'],
              ['3×10⁶', '~1.54', '~1.54'],
              ['10⁷', '1.00', '1.00'],
              ['10⁸', '~0.93', '~0.91'],
              ['3×10⁸', '~0.90', '~0.87'],
            ].map(([n, yn, zn], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{n}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{yn}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{zn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="14-14">14-14 Factor de confiabilidad KR (YZ)</SectionTitle>
      <p className="mb-4">El factor de confiabilidad K<sub>R</sub> (Y<sub>Z</sub> en SI) ajusta los esfuerzos permisibles según la probabilidad de supervivencia deseada. AGMA define valores para cuatro niveles estándar:</p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2">Confiabilidad R</th>
            <th className="p-2">K<sub>R</sub> (YZ)</th>
            <th className="p-2">Aplicación típica</th>
          </tr></thead>
          <tbody>
            {[
              ['0.90 (90%)', '0.85', 'Equipos no críticos, bajo riesgo'],
              ['0.99 (99%)', '1.00', 'Diseño AGMA estándar'],
              ['0.999 (99.9%)', '1.25', 'Equipos industriales críticos'],
              ['0.9999 (99.99%)', '1.50', 'Aeroespacial, seguridad humana'],
            ].map(([r, kr, app], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{r}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{kr}</td>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="14-15">14-15 Factor de temperatura KT (Yθ)</SectionTitle>
      <p className="mb-4">El factor de temperatura K<sub>T</sub> (Y<sub>θ</sub> en SI) corrige los esfuerzos permisibles cuando la temperatura de operación excede el límite normal de lubricación con aceite mineral (≈120°C / 250°F).</p>
      <ConceptBlock title="Valores de KT">
        K<sub>T</sub> = 1.0 para T ≤ 120°C (250°F) — rango normal de operación con lubricación por aceite.
        <br />K<sub>T</sub> = T(°F) / 620 para T &gt; 250°F — ecuación empírica de AGMA para temperaturas elevadas.
        <br />K<sub>T</sub> = T(°C) / 325 para T &gt; 120°C — versión en unidades SI.
        <br />Ejemplo: a 300°F, K<sub>T</sub> = 300/620 ≈ 0.48 (el esfuerzo permisible se reduce).
      </ConceptBlock>

      <SectionTitle id="14-16">14-16 Factor de espesor del aro KB</SectionTitle>
      <p className="mb-4">Cuando el aro del engrane tiene un espesor delgado en relación con la altura del diente, el aro puede flexionar bajo carga, aumentando el esfuerzo en la raíz. El factor K<sub>B</sub> corrige este efecto.</p>
      <ConceptBlock title="Criterio de KB">
        K<sub>B</sub> = 1.0 cuando t<sub>R</sub> / h<sub>t</sub> ≥ 1.2 (aro suficientemente robusto).
        <br />K<sub>B</sub> &gt; 1.0 cuando t<sub>R</sub> / h<sub>t</sub> &lt; 1.2; el valor depende de la relación t<sub>R</sub>/h<sub>t</sub> y se obtiene de gráficas AGMA.
        <br />t<sub>R</sub> = espesor radial del aro (desde la raíz del diente hasta el diámetro interior del aro).
        <br />h<sub>t</sub> = altura total del diente (addendum + dedendum ≈ 2.25/P<sub>d</sub> para dientes de altura completa).
      </ConceptBlock>
      <FormulaBox>
        Para t<sub>R</sub> / h<sub>t</sub> ≥ 1.2: K<sub>B</sub> = 1.0
        <br />Para t<sub>R</sub> / h<sub>t</sub> &lt; 1.2: consultar AGMA 2001-D04 (K<sub>B</sub> crece al disminuir t<sub>R</sub>/h<sub>t</sub>).
      </FormulaBox>

      <SectionTitle id="14-17">14-17 Factores de seguridad SF y SH</SectionTitle>
      <FormulaBox>
        SF = (St · YN) / (σF · KT · KR)    ← seguridad a flexión (SF ≥ 1)
        <br />SH = (Sc · ZN · CH) / (σH · KT · KR)  ← seguridad a contacto (SH ≥ 1)
        <br /><br />KR: R=0.90→0.85 | R=0.99→1.00 | R=0.999→1.25 | R=0.9999→1.50
        <br />KT = 1.0 para T ≤ 250°F (120°C)
      </FormulaBox>

      <SectionTitle id="14-18">14-18 Análisis</SectionTitle>
      <ol className="list-decimal ml-6 space-y-2 text-sm mb-4">
        <li>Calcular W<sup>t</sup> de la potencia y velocidad: W<sup>t</sup> = 33000·H/V (H en hp, V en ft/min)</li>
        <li>Determinar K<sub>o</sub> del tipo de carga (tabla)</li>
        <li>Calcular V (pie/min) y K<sub>v</sub> de la calidad Q<sub>v</sub></li>
        <li>Seleccionar K<sub>s</sub>, K<sub>m</sub> de la geometría de la transmisión</li>
        <li>Obtener J e I de las gráficas AGMA (o fórmulas)</li>
        <li>Calcular σ (flexión) y σ<sub>H</sub> (contacto) con las ecuaciones AGMA</li>
        <li>Seleccionar material → S<sub>t</sub>, S<sub>c</sub></li>
        <li>Calcular Y<sub>N</sub>, Z<sub>N</sub> para los ciclos esperados</li>
        <li>Calcular S<sub>F</sub> y S<sub>H</sub> → verificar ≥ 1</li>
      </ol>

      <SectionTitle id="14-19">14-19 Diseño de un acoplamiento de engranes</SectionTitle>
      <ConceptBlock title="Engranes helicoidales — consideraciones adicionales">
        Para engranes helicoidales con ángulo de hélice ψ:
        <br />• La carga tangencial se distribuye sobre más dientes → mayor área de contacto
        <br />• Carga axial: Wa = Wt·tan(ψ) — requiere cojinetes de empuje
        <br />• Para ψ óptimo típico: 15° a 30°
      </ConceptBlock>
      <FormulaBox>
        Engrane helicoidal — factor I:
        <br />I = (cos φt · sin φt) / (2mN) · (mG/(mG+1))
        <br />donde φt = ángulo de presión transversal = atan(tan(φn)/cos(ψ))
      </FormulaBox>

      <SectionTitle id="flujo">Flujo de diseño AGMA — visión general</SectionTitle>
      <div className="my-6" style={{ background: 'var(--bg-2)', borderRadius: 12, padding: 20, border: '1px solid var(--border)' }}>
        <svg viewBox="0 0 560 500" width="100%" style={{ maxWidth: 560, display: 'block', margin: '0 auto' }}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill={accent} /></marker>
          </defs>
          <rect x="160" y="0" width="240" height="36" rx="6" fill={`${accent}20`} stroke={accent} strokeWidth="1.5" />
          <text x="280" y="23" textAnchor="middle" fontSize="11" fill={accent} fontFamily="var(--font-mono)" fontWeight="600">Entrada: H, n, N, Pd, F, φ, material</text>
          <line x1="280" y1="36" x2="280" y2="50" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="150" y="50" width="260" height="36" rx="6" fill="var(--bg-1)" stroke={accent} strokeWidth="1.5" />
          <text x="280" y="63" textAnchor="middle" fontSize="10" fill="var(--text-2)" fontFamily="var(--font-mono)">Wt = 33000·H/V · V = π·d·n/12</text>
          <text x="280" y="78" textAnchor="middle" fontSize="10" fill="var(--text-2)" fontFamily="var(--font-mono)">Ko · Kv · Ks · Km · Cf</text>
          <line x1="280" y1="86" x2="280" y2="100" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="100" y="100" width="160" height="42" rx="6" fill="var(--bg-1)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="180" y="119" textAnchor="middle" fontSize="11" fill={accent} fontFamily="var(--font-mono)" fontWeight="600">σ (flexión)</text>
          <text x="180" y="134" textAnchor="middle" fontSize="9" fill="var(--text-2)" fontFamily="var(--font-mono)">Wt·Ko·Kv·Ks·Pd·Km/(F·J)</text>
          <rect x="300" y="100" width="160" height="42" rx="6" fill="var(--bg-1)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="380" y="119" textAnchor="middle" fontSize="11" fill={accent} fontFamily="var(--font-mono)" fontWeight="600">σH (contacto)</text>
          <text x="380" y="134" textAnchor="middle" fontSize="9" fill="var(--text-2)" fontFamily="var(--font-mono)">Cp·√(Wt·Ko·Kv·Ks·Km·Cf/(dp·F·I))</text>
          <line x1="180" y1="142" x2="180" y2="156" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="380" y1="142" x2="380" y2="156" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="100" y="156" width="160" height="36" rx="6" fill={`${accent}18`} stroke={accent} strokeWidth="1.5" />
          <text x="180" y="171" textAnchor="middle" fontSize="10" fill="var(--text-1)" fontFamily="var(--font-mono)">St (material) · YN</text>
          <text x="180" y="184" textAnchor="middle" fontSize="10" fill="var(--text-1)" fontFamily="var(--font-mono)">/ (KT · KR)</text>
          <rect x="300" y="156" width="160" height="36" rx="6" fill={`${accent}18`} stroke={accent} strokeWidth="1.5" />
          <text x="380" y="171" textAnchor="middle" fontSize="10" fill="var(--text-1)" fontFamily="var(--font-mono)">Sc (material) · ZN · CH</text>
          <text x="380" y="184" textAnchor="middle" fontSize="10" fill="var(--text-1)" fontFamily="var(--font-mono)">/ (KT · KR)</text>
          <line x1="180" y1="192" x2="180" y2="206" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="380" y1="192" x2="380" y2="206" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="100" y="206" width="160" height="36" rx="6" fill="var(--bg-1)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="180" y="221" textAnchor="middle" fontSize="10" fill={accent} fontFamily="var(--font-mono)" fontWeight="600">SF = St·YN/(σ·KT·KR)</text>
          <text x="180" y="234" textAnchor="middle" fontSize="9" fill="var(--text-2)" fontFamily="var(--font-mono)">SF ≥ 1.2?</text>
          <rect x="300" y="206" width="160" height="36" rx="6" fill="var(--bg-1)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="380" y="221" textAnchor="middle" fontSize="10" fill={accent} fontFamily="var(--font-mono)" fontWeight="600">SH = Sc·ZN·CH/(σH·KT·KR)</text>
          <text x="380" y="234" textAnchor="middle" fontSize="9" fill="var(--text-2)" fontFamily="var(--font-mono)">SH ≥ 1.2?</text>
          <line x1="260" y1="224" x2="280" y2="252" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="280" y1="224" x2="300" y2="252" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="140" y="256" width="280" height="40" rx="8" fill={`${accent}25`} stroke={accent} strokeWidth="2" />
          <text x="280" y="274" textAnchor="middle" fontSize="11" fill={accent} fontFamily="var(--font-mono)" fontWeight="700">SF ≥ 1.2 y SH ≥ 1.2?</text>
          <text x="280" y="288" textAnchor="middle" fontSize="9" fill="var(--text-2)" fontFamily="var(--font-mono)">(AGMA recomienda ambos ≥ 1.2)</text>
          <line x1="280" y1="296" x2="280" y2="314" stroke={accent} strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="130" y="314" width="300" height="36" rx="18" fill="#22C55E" opacity="0.15" stroke="#22C55E" strokeWidth="1.5" />
          <text x="280" y="336" textAnchor="middle" fontSize="12" fill="#22C55E" fontFamily="var(--font-mono)" fontWeight="700">Cumple → Diseño OK</text>
          <line x1="420" y1="276" x2="490" y2="276" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="490" y1="276" x2="490" y2="324" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arr)" />
          <rect x="440" y="314" width="120" height="36" rx="6" fill="#EF4444" opacity="0.1" stroke="#EF4444" strokeWidth="1.5" />
          <text x="500" y="333" textAnchor="middle" fontSize="10" fill="#EF4444" fontFamily="var(--font-mono)" fontWeight="600">No → Iterar</text>
          <text x="500" y="344" textAnchor="middle" fontSize="8" fill="#EF4444" fontFamily="var(--font-mono)">cambiar material / geometría</text>
        </svg>
      </div>

      <SectionTitle id="ojo-aqui">Ojo aquí — Errores comunes en diseño de engranes</SectionTitle>
      <ConceptBlock title="Error 1: Olvidar que el contacto gobierna">
        En engranes con superficies endurecidas (cementados, nitrurados), la falla por picadura (σ<sub>H</sub>) suele ocurrir antes que la falla por flexión (σ). Siempre verifica S<sub>H</sub> además de S<sub>F</sub> — incluso si el fabricante solo especifica resistencia a flexión.
      </ConceptBlock>
      <ConceptBlock title="Error 2: Mezclar unidades US y SI">
        Las ecuaciones AGMA son dimensionalmente inconsistentes si mezclas pulgadas con Newtons, o kpsi con mm. La fórmula σ = W<sup>t</sup>·K<sub>o</sub>·K<sub>v</sub>·K<sub>s</sub>·P<sub>d</sub>/(F·J) asume W<sup>t</sup> en lbf, P<sub>d</sub> en 1/pulg, F en pulg. En SI usa σ = W<sup>t</sup>·K<sub>o</sub>·K<sub>v</sub>·K<sub>s</sub>/(b·m<sub>t</sub>·Y<sub>J</sub>) con W<sup>t</sup> en N, b en mm, m<sub>t</sub> en mm.
      </ConceptBlock>

      <AGMACalc />
    </ChapterShell>
  )
}
