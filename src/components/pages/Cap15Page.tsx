'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo } from '@/components/content/ChapterHelpers'
import { BevelGearSVG, WormGearSVG } from '@/components/content/Chap15Figures'

const accent = 'var(--part-3)'

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

function WormGearCalc() {
  const [phi_n, setPhi_n] = useState(20)
  const [lambda, setLambda] = useState(10)
  const [f, setF] = useState(0.05)
  const [H_in, setH_in] = useState(10)
  const [nW, setNW] = useState(1800)
  const [dm, setDm] = useState(2.0)

  const phi_r = (phi_n * Math.PI) / 180
  const lam_r = (lambda * Math.PI) / 180

  const eW = (Math.cos(phi_r) - f * Math.tan(lam_r)) / (Math.cos(phi_r) + f / Math.tan(lam_r))
  const f_lock = Math.cos(phi_r) * Math.tan(lam_r)
  const selfLocking = f >= f_lock
  const Vs = (Math.PI * nW * dm) / (12 * Math.cos(lam_r))
  const H_loss = (1 - eW) * H_in
  const H_out = eW * H_in

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Tornillo Sinfín</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs mb-1">φn — Ángulo de presión normal (°)</label>
          <input type="range" min="14.5" max="30" step="0.5" value={phi_n} onChange={e => setPhi_n(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{phi_n}°</div>
        </div>
        <div>
          <label className="block text-xs mb-1">λ — Ángulo de avance (°)</label>
          <input type="range" min="2" max="45" step="1" value={lambda} onChange={e => setLambda(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{lambda}°</div>
        </div>
        <div>
          <label className="block text-xs mb-1">f — Coeficiente de fricción</label>
          <input type="range" min="0.01" max="0.2" step="0.005" value={f} onChange={e => setF(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{f.toFixed(3)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">H_entrada (hp)</label>
          <input type="number" step="0.5" value={H_in} onChange={e => setH_in(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">nW — Velocidad sinfín (rpm)</label>
          <input type="number" step="100" value={nW} onChange={e => setNW(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">dm — Diámetro medio sinfín (pulg)</label>
          <input type="number" step="0.1" value={dm} onChange={e => setDm(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
      <div className="p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">e — Eficiencia mecánica</div>
          <div className="text-lg font-bold">{(eW * 100).toFixed(1)}%</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">H_salida</div>
          <div className="text-lg font-bold">{H_out.toFixed(2)} hp</div>
        </div>
        <div className="p-3 rounded" style={{ background: '#ef444422' }}>
          <div className="text-xs opacity-70">H_pérdida (calor)</div>
          <div className="text-lg font-bold" style={{ color: '#ef4444' }}>{H_loss.toFixed(2)} hp</div>
        </div>
        <div className="p-3 rounded" style={{ background: selfLocking ? '#16a34a22' : '#f9731622' }}>
          <div className="text-xs opacity-70">Autocontención</div>
          <div className="font-bold text-sm" style={{ color: selfLocking ? '#16a34a' : '#f97316' }}>
            {selfLocking ? 'AUTOCONTENIDO' : 'No autocontenido'}
          </div>
          <div className="text-xs">f_min = {f_lock.toFixed(3)}, f = {f.toFixed(3)}</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">Vs — Vel. deslizamiento</div>
          <div className="text-lg font-bold">{Vs.toFixed(0)} ft/min</div>
        </div>
      </div>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <WormGearCalc />
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado 15-1 — Engrane cónico</h3>
        <p className="mb-3 text-sm">Par de engranes cónicos rectos: NP=NG=25, Pd=5, F=1.10", HB=180, Qv=7, Ko=1.0, montaje exterior, vida=10⁷, R=0.99. Calcular potencia nominal a n=600 rpm.</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>Geometría: γ = arctan(25/25) = 45°; dP = 25/5 = 5 pulg</li>
          <li>vt = π·5·600/12 = 785 ft/min; Kv (Qv=7): B=0.731, A=65.06 → Kv=1.299</li>
          <li>Ks = 0.4867 + 0.2132/5 = 0.529</li>
          <li>Km = 1.25 + 0.0036·(1.1)² = 1.254 (montaje exterior)</li>
          <li>J(NP=25, NG=25) ≈ 0.216; I ≈ 0.065</li>
          <li>KL=1.0 (N=10⁷); CL=3.4822·(10⁷)^(-0.0602)=1.32; KT=CR=1.0</li>
          <li>sat=44·180+2100=10020 psi; sac=341·180+23620=85000 psi</li>
          <li>Wt (flexión) → H=13.2 hp; Wt (desgaste) → H=10.9 hp ← controla</li>
        </ol>
      </div>
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado 15-2 — Tornillo sinfín</h3>
        <p className="mb-3 text-sm">Tornillo sinfín con φn=20°, λ=15°, nW=1800 rpm, dm=2". Calcular eficiencia y potencia de salida para H_entrada=10 hp. ¿Es autocontenido?</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>Vs = π·1800·2/(12·cos15°) = 975 ft/min</li>
          <li>f = 0.103·exp(-0.110·975^0.450) + 0.012 ≈ 0.025</li>
          <li>eW = (cos20°-0.025·tan15°)/(cos20°+0.025/tan15°) = 0.903 → 90.3%</li>
          <li>H_salida = 0.903 × 10 = 9.03 hp</li>
          <li>f_min = cos20°·tan15° = 0.252 &gt; f=0.025 → NO autocontenido</li>
        </ol>
      </div>
    </div>
  )
}

function BevelGearCalc() {
  const [NP, setNP] = useState(25)
  const [NG, setNG] = useState(50)
  const [Pd, setPd] = useState(5)
  const [F_in, setF_in] = useState(1.1)
  const [HP, setHP] = useState(15)
  const [n_rpm, setN_rpm] = useState(600)
  const [Qv, setQv] = useState(7)
  const [Ko, setKo] = useState(1.0)
  const [HB, setHB] = useState(200)

  const mG = NG / NP
  const gamma = Math.atan(NP / NG) * 180 / Math.PI
  const Gamma = 90 - gamma
  const dP = NP / Pd
  const dG = NG / Pd
  const rP = dP / 2
  const rG = dG / 2
  const L = Math.sqrt(rP * rP + rG * rG)
  const dav = dP - F_in * Math.cos(gamma * Math.PI / 180)
  const vt = Math.PI * dP * n_rpm / 12
  const B = 0.25 * Math.pow(12 - Qv, 2 / 3)
  const A = 50 + 56 * (1 - B)
  const Kv = Math.pow((A + Math.sqrt(vt)) / A, B)
  const Ks = 0.4867 + 0.2132 / Pd
  const Kmb = 1.25
  const Km = Kmb + 0.0036 * F_in * F_in
  const T = 63025 * HP / n_rpm
  const Wt = 2 * T / dav
  const sat = 44 * HB + 2100
  const sac = 341 * HB + 23620
  const sigma_t = Wt * Ko * Kv * Ks * Km / (F_in * dav * 0.216)
  const sigma_c_coeff = 1960
  const Sc_req = sigma_c_coeff * Math.sqrt(Wt * Ko * Kv * Km * Ks / (F_in * dP * 0.065))
  const SF = sat / sigma_t
  const SH = sac / Sc_req

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Simulador — Análisis de Engrane Cónico Recto</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'NP — Dientes piñón', val: NP, set: setNP, step: 1 },
          { label: 'NG — Dientes corona', val: NG, set: setNG, step: 1 },
          { label: 'Pd — Paso diametral', val: Pd, set: setPd, step: 1 },
          { label: 'F — Ancho de cara (pulg)', val: F_in, set: setF_in, step: 0.1 },
          { label: 'HP — Potencia (hp)', val: HP, set: setHP, step: 1 },
          { label: 'n — Velocidad (rpm)', val: n_rpm, set: setN_rpm, step: 50 },
        ].map(({ label, val, set, step }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
        <div>
          <label className="block text-xs mb-1">Qv — Calidad AGMA</label>
          <input type="range" min="4" max="12" step={1} value={Qv} onChange={e => setQv(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{Qv}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">Ko — Factor de sobrecarga</label>
          <input type="range" min="1.0" max="2.5" step={0.25} value={Ko} onChange={e => setKo(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{Ko.toFixed(2)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">HB — Dureza Brinell</label>
          <input type="number" step={10} value={HB} onChange={e => setHB(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
      <p className="text-xs opacity-60 mb-3">Montaje: exterior (Kmb=1.25) | J≈0.216 | I≈0.065 (estimados para NP={NP}, NG={NG})</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">γ — Ángulo paso piñón</div>
          <div className="text-lg font-bold">{gamma.toFixed(2)}°</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">dP / dav</div>
          <div className="text-lg font-bold">{dP.toFixed(3)} / {dav.toFixed(3)} pulg</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">vt — Vel. línea de paso</div>
          <div className="text-lg font-bold">{vt.toFixed(0)} ft/min</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">Kv / Ks / Km</div>
          <div className="font-bold">{Kv.toFixed(3)} / {Ks.toFixed(3)} / {Km.toFixed(3)}</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">Wt — Fuerza tangencial</div>
          <div className="text-lg font-bold">{Wt.toFixed(1)} lbf</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">σt — Esfuerzo flexión</div>
          <div className="text-lg font-bold">{sigma_t.toFixed(0)} psi</div>
        </div>
        <div className="p-3 rounded" style={{ background: SF >= 1.5 ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">SF — Factor seg. flexión</div>
          <div className="text-lg font-bold" style={{ color: SF >= 1.5 ? '#16a34a' : '#dc2626' }}>{SF.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded" style={{ background: SH >= 1.1 ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">SH — Factor seg. contacto</div>
          <div className="text-lg font-bold" style={{ color: SH >= 1.1 ? '#16a34a' : '#dc2626' }}>{SH.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

const sections = [
  { id: '15-1', label: '15-1 Engranes cónicos' },
  { id: '15-2', label: '15-2 Esfuerzos y resistencias' },
  { id: '15-3', label: '15-3 Factores AGMA' },
  { id: '15-4', label: '15-4 Análisis cónico' },
  { id: '15-5', label: '15-5 Diseño cónico AGMA' },
  { id: '15-6', label: '15-6 Tornillo sinfín AGMA' },
  { id: '15-7', label: '15-7 Análisis sinfín' },
  { id: '15-8', label: '15-8 Geometría sinfín' },
  { id: '15-9', label: '15-9 Temperatura y eficiencia' },
  { id: '15-10', label: '15-10 Carga Buckingham' },
]

export default function Cap15Page() {
  return (
    <ChapterShell
      chapterId={15}
      chapterNum="15"
      title="Engranes cónicos y tornillo sinfín"
      subtitle="Análisis AGMA de engranes cónicos rectos y eficiencia de acoplamiento tornillo sinfín–corona."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="15-1">15-1 Engranes cónicos: descripción general</SectionTitle>
      <PreguntaBox>
        ¿Cómo transmitir potencia entre ejes que <em>se cruzan</em> (no son paralelos)? Un engrane recto no sirve — necesitas un <strong>engrane cónico</strong>. Es como un cono rodando sobre otro cono. ¿Y si además quieres una reducción enorme en una sola etapa? Ahí entra el <strong>tornillo sinfín</strong>.
      </PreguntaBox>
      <p className="mb-4">Los engranes cónicos transmiten potencia entre ejes que se intersectan. El tipo más común es el engrane cónico recto con ángulo de eje de 90°.</p>
      <ConceptBlock title="Tipos de engranes cónicos">
        <strong>Cónicos rectos:</strong> Dientes rectos sobre la superficie cónica. Hasta 1000 ft/min. Silenciosos para bajas velocidades. Costo de producción menor.<br />
        <strong>Cónicos espirales:</strong> Dientes curvados en espiral (como helicoidales). Mayores velocidades, menos ruido. Cargas axiales mayores.<br />
        <strong>Cónicos Zerol:</strong> Dientes curvados con ángulo de espiral = 0°. Intermedio entre rectos y espirales. Se analizan como rectos.<br />
        <strong>Hipoidales:</strong> Ejes desplazados (no se intersecan). Combinación de rodadura y deslizamiento. Usados en diferenciales de automóvil.<br />
        <strong>Espiroidales:</strong> Desplazamiento mayor. El piñón se parece a un tornillo sinfín ahusado.
      </ConceptBlock>
      <OjoAqui>
        En los engranes cónicos los dientes son <strong>ahusados</strong> — más anchos en el extremo grande que en el pequeño. Esto significa que para lograr contacto lineal perfecto, la carga debe ser proporcionalmente mayor en el extremo grande. Por eso el ancho de cara se limita: F ≤ min(L/3, 10/Pd). No intentes hacer un engrane cónico con cara ancha — la carga no se distribuirá bien.
      </OjoAqui>
      <BevelGearSVG />
      <ConceptBlock title="Geometría básica del engrane cónico">
        • Ángulo de paso: Γ (corona), γ (piñón); tan(γ) = NP/NG, Γ = 90° - γ
        <br />• Diámetro de paso en el extremo grande: dP = NP/Pd (o dP = NP·met)
        <br />• Diámetro de paso medio: dav = dP - F·cos(γ)
        <br />• Distancia cónica superficial: L = √(rP² + rG²)
        <br />• Ancho de cara máximo recomendado: F ≤ L/3 o F ≤ 10/Pd
      </ConceptBlock>
      <FormulaBox>
        Componentes de la fuerza (extremo grande):
        <br />Wt = 2T / dav    ← fuerza tangencial al radio medio
        <br />Wr = Wt · tan(φ) · cos(γ)  ← componente radial
        <br />Wa = Wt · tan(φ) · sin(γ)  ← componente axial
      </FormulaBox>
      <OjoAqui>
        En los engranes cónicos aparecen <strong>tres</strong> componentes de fuerza (tangencial, radial y axial), no solo dos como en los rectos. La fuerza axial Wa del piñón <em>es</em> la fuerza radial de la corona, y viceversa. Olvidar la componente axial es el error más común — y el que causa que los ejes se salgan de sus cojinetes.
      </OjoAqui>

      <SectionTitle id="15-2">15-2 Esfuerzos y resistencias — norma AGMA 2003-B97</SectionTitle>
      <FormulaBox>
        Esfuerzo de contacto:  σc = Cp · √(Wt/(F·dP·I) · Ko·Kv·Km·Cs·Cxc)
        <br />Esfuerzo de flexión:  σt = (Wt/(F·Pd)) · Ko·Kv·(Ks·Km·Kx)/J
        <br /><br />Resistencias permisibles (acero grado 1, endurecido):
        <br />  sac = 341·HB + 23 620 psi  |  sat = 44·HB + 2 100 psi
      </FormulaBox>

<SectionTitle id="15-3">15-3 Factores de la ecuación AGMA</SectionTitle>
      <p className="mb-4">Los factores AGMA corrigen el esfuerzo nominal para reflejar condiciones reales de operación. Cada factor tiene un propósito específico y no se pueden omitir.</p>
      <div className="space-y-3">
        <ConceptBlock title="Factor dinámico Kv">
          Misma fórmula que Cap. 14: Kv = ((A+√vt)/A)^B, A=50+56(1-B), B=0.25(12-Qv)^(2/3)
          <br />Velocidad máxima: vt_máx = [A+(Qv-3)]² ft/min — si vt &gt; vt_máx, el engrane no es adecuado.
        </ConceptBlock>
        <ConceptBlock title="Factor de tamaño Ks">
          Ks = 0.4867 + 0.2132/Pd  (0.5 ≤ Pd ≤ 16)
          <br />Cs = 0.5 (F ≤ 0.5 pulg) | Cs = 0.125F + 0.4375 (0.5 ≤ F ≤ 4.5) | Cs = 1.0 (F ≥ 4.5)
        </ConceptBlock>
        <ConceptBlock title="Factor de distribución de carga Km">
          Km = Kmb + 0.0036·F²
          <br />Kmb = 1.00 (ambos miembros montados separados) | 1.10 (uno separado) | 1.25 (ninguno separado)
          <br />El montaje es crucial: un engrane cónico montado en voladizo sufre mayor desalineación bajo carga.
        </ConceptBlock>
        <ConceptBlock title="Factor de coronamiento Cxc (desgaste) y Kx (flexión)">
          Cxc = 1.5 (dientes coronados adecuadamente) | 2.0 (dientes no coronados)
          <br />Kx = 1.0 (cónicos rectos, siempre)
          <br />Los dientes se coronan durante la fabricación para compensar la deflexión del montaje.
        </ConceptBlock>
        <ConceptBlock title="Factor de relación de dureza CH">
          CH = 1 + B1·(NP/NG - 1), donde B1 = 0.00898·(HBP/HBG) - 0.00829
          <br />Válido para 1.2 ≤ HBP/HBG ≤ 1.7. Si HBP = HBG, CH = 1.
          <br />Cuando el piñón tiene superficie endurecida (≥48 HRC) y la corona está totalmente endurecida (180-400 HB), se produce un <strong>endurecimiento por trabajo</strong> que aumenta la resistencia al desgaste.
        </ConceptBlock>
        <ConceptBlock title="Factores de temperatura y confiabilidad">
          KT = 1 (para t ≤ 250°F) | KT = (460+t)/710 (para t &gt; 250°F)
          <br />KR = 0.50 - 0.25·log(1-R) para 0.99 ≤ R ≤ 0.999
          <br />KR = 0.70 - 0.15·log(1-R) para 0.90 ≤ R &lt; 0.99
          <br />CR = √KR (factor de confiabilidad para desgaste)
          <br />Nota: SH se basa en √(resistencia/esfuerzo), SF se basa en resistencia/esfuerzo directamente. No se pueden comparar directamente — usar √SH vs SF.
        </ConceptBlock>
        <ConceptBlock title="Factores de ciclos de esfuerzo CL y KL">
          CL = 3.4822·N^(-0.0602)  (resistencia a contacto, 10⁴ ≤ N ≤ 10¹⁰)
          <br />KL = 1.683·N^(-0.0323)  (acero carburizado, resistencia a flexión, 3·10⁶ ≤ N ≤ 10¹⁰)
          <br />KL = 6.1514·N^(-0.1182)  (crítico, 10³ ≤ N ≤ 3·10⁶)
          <br />Para engranes totalmente endurecidos, usar KL y CL con precaución — las figuras son aproximaciones.
        </ConceptBlock>
        <ConceptBlock title="Resistencias permisibles (acero)">
          <strong>Grado 1 (endurecido completamente):</strong><br />
          sac = 341·HB + 23620 psi | sat = 44·HB + 2100 psi<br />
          <strong>Grado 2 (endurecido completamente):</strong><br />
          sac = 363.6·HB + 29560 psi | sat = 48·HB + 5980 psi<br />
          <strong>Coeficiente elástico:</strong> Cp = 2290 √psi (acero-acero)
        </ConceptBlock>
      </div>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Carácter de la carga principal</th>
            <th className="p-2">Uniforme</th>
            <th className="p-2">Impacto ligero</th>
            <th className="p-2">Impacto medio</th>
            <th className="p-2">Impacto pesado</th>
          </tr></thead>
          <tbody>
            {[
              ['Uniforme', '1.00', '1.25', '1.50', '1.75+'],
              ['Impacto ligero', '1.10', '1.35', '1.60', '1.85+'],
              ['Impacto medio', '1.25', '1.50', '1.75', '2.00+'],
              ['Impacto pesado', '1.50', '1.75', '2.00', '2.25+'],
            ].map(([row, ...vals], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b font-medium" style={{ borderColor: 'var(--border)' }}>{row}</td>
                {vals.map((v, j) => (
                  <td key={j} className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs opacity-60 mt-1">Tabla 15-2: Factores de sobrecarga Ko — Transmisiones reductoras. Para aumentadoras, agregar 0.01(N/n)².</p>
      </div>

      <MiniEjemplo>
        <strong>Relación de velocidades:</strong> Piñón de 20 dientes, corona de 60 dientes → m<sub>G</sub> = 60/20 = 3.<br />
        Ángulos de paso: γ = arctan(20/60) = 18.43°, Γ = 90° − 18.43° = 71.57°.<br />
        ¿Qué pasa si el ángulo entre ejes no es 90°? Las fórmulas se generalizan, pero el 99% de los casos prácticos son a 90°.
      </MiniEjemplo>

      <SectionTitle id="15-4">15-4 Análisis de engranes cónicos rectos</SectionTitle>
      <ol className="list-decimal ml-6 space-y-2 text-sm mb-4">
        <li>Calcular geometría: γ = arctan(NP/NG), Γ = 90° - γ, dP, dav</li>
        <li>Calcular Wt = 2T/dav y vt = π·dP·nP/12</li>
        <li>Obtener Ko, Kv, Ks, Km de tablas/fórmulas</li>
        <li>Leer I y J de figuras 15-6 y 15-7 (función de NP y NG)</li>
        <li>Calcular σc y σt con las ecuaciones AGMA de contacto y flexión</li>
        <li>Calcular SH y SF → verificar ≥ 1 para cada engrane</li>
      </ol>

      <SectionTitle id="15-5">15-5 Diseño de engranes cónicos — Procedimiento AGMA</SectionTitle>
      <PreguntaBox>
        Ya sabemos calcular los esfuerzos — pero ¿cómo se <em>diseña</em> un engrane cónico desde cero? El proceso es iterativo: eliges materiales, calculas factores, verificas resistencias, y si no pasas, cambias algo y vuelves a empezar. Es como ajustar el foco de una cámara: giras, verificas, giras otra vez.
      </PreguntaBox>
      <ol className="list-decimal ml-6 space-y-2 text-sm mb-4">
        <li><strong>Seleccionar relación de engranes:</strong> mG = NG/NP. Ángulos: γ = arctan(NP/NG), Γ = 90° - γ</li>
        <li><strong>Calcular diámetros:</strong> dP = NP/Pd, dG = NG/Pd. Verificar F ≤ L/3</li>
        <li><strong>Calcular velocidad:</strong> vt = π·dP·n/12. Obtener Kv con Qv</li>
        <li><strong>Obtener factores:</strong> Ko (sobrecarga), Ks (tamaño), Km (distribución de carga)</li>
        <li><strong>Leer I y J:</strong> de figuras AGMA para cónicos (función de NP y NG)</li>
        <li><strong>Calcular esfuerzos:</strong> σc (contacto) y σt (flexión)</li>
        <li><strong>Calcular resistencias permisibles:</strong> Sac y Sat con CL, KL, CH, CR</li>
        <li><strong>Verificar factores de seguridad:</strong> SH = Sac/σc ≥ 1.1 y SF = Sat/σt ≥ 1.2</li>
        <li><strong>Si no cumple:</strong> cambiar Pd, F, material o NP y recalcular</li>
      </ol>
      <ConceptBlock title="Decisiones de diseño críticas">
        <strong>Material:</strong> Acero grado 1 (HB 180-250) o grado 2 (carburizado, 55-60 HRC) — la dureza superficial es clave para contacto.<br />
        <strong>Ancho de cara:</strong> F ≤ min(L/3, 10/Pd). Reducir F reduce la carga total pero aumenta Kv.<br />
        <strong>Montaje:</strong> Kmb = 1.00 (ambos lados), 1.10 (uno), 1.25 (exterior). Montaje rígido → menor Km → menor esfuerzo.
      </ConceptBlock>
      <MiniEjemplo>
        <strong>Ejemplo rápido:</strong> NP=25, NG=50, Pd=5, F=1.0", HB=200, Qv=7, Ko=1.0, montaje exterior.<br />
        γ = arctan(25/50) = 26.57°, Γ = 63.43°<br />
        dP = 5.0", dav = 5.0 - 1.0×cos(26.57°) = 4.104"<br />
        L = √(2.5² + 5²) = 5.590" → F_max = L/3 = 1.863" ✓ (F=1.0 &lt; 1.863)
      </MiniEjemplo>
      <BevelGearCalc />

      <SectionTitle id="15-6">15-6 Tornillo sinfín: ecuación AGMA</SectionTitle>
      <PreguntaBox>
        ¿Cómo lograr una reducción de 60:1 con <strong>una sola etapa</strong>? Con engranes rectos necesitarías 3 o 4 etapas. La respuesta: un <strong>tornillo sinfín</strong> de 1 hilo (entrada) acoplado a una corona de 60 dientes. ¡Reducción de 60:1 al instante!
      </PreguntaBox>
      <WormGearSVG />
      <p className="mb-4">El tornillo sinfín es un sistema de engranes con ejes cruzados (generalmente 90°), capaz de relaciones de velocidad muy altas en una sola etapa.</p>
      <p className="mb-4">Los engranes cruzados helicoidales son el tipo más simple de transmisión entre ejes cruzados — pero su contacto es puntual y se desgastan rápidamente. El <strong>engrane de tornillo sinfín</strong> envuelve la corona parcialmente, convirtiendo el contacto puntual en contacto de línea. Los dientes de la corona se <em>desgastan</em> (wear out), pero antes de eso, se <strong>asientan</strong> (wear in) — el contacto mejora con el uso inicial.
      </p>
      <FormulaBox>
        Fuerza permisible tangencial sobre la corona (AGMA):
        <br />(Wt)perm = Cs · Dm^0.8 · Fe · Cm · Cv
        <br />Vs = π·nW·dm / (12·cos(λ))  ← velocidad de deslizamiento
      </FormulaBox>

      <SectionTitle id="15-7">15-7 Análisis de un tornillo sinfín</SectionTitle>
      <OjoAqui>
        Los tornillos sinfín tienen eficiencia <strong>mucho menor</strong> que otros engranes. Mientras un par de engranes rectos pierde ~1-2%, un sinfín puede perder 10-40%. Esa energía perdida se convierte en <strong>calor</strong> — y el sobrecalentamiento del lubricante suele ser la falla más común. Siempre verifica la temperatura del aceite (ts &lt; 250°F).
      </OjoAqui>
      <FormulaBox>
        Eficiencia (sinfín conduce a corona):
        <br />eW = (cos φn - f·tan λ) / (cos φn + f/tan λ)
        <br /><br />Autocontención (sinfín no puede ser girado por la corona):
        <br />f ≥ cos(φn)·tan(λ)  →  el sistema se &#34;traba&#34; sin freno externo
        <br /><br />Coeficiente de fricción (AGMA, Vs en ft/min):
        <br />  0 &lt; Vs ≤ 10 : f = 0.124·exp(-0.074·Vs^0.645)
        <br />  Vs &gt; 10   : f = 0.103·exp(-0.110·Vs^0.450) + 0.012
      </FormulaBox>

      <SectionTitle id="15-8">15-8 Geometría del tornillo sinfín</SectionTitle>
      <PreguntaBox>
        ¿Qué relación tiene el número de hilos del sinfín con el ángulo de avance? Un sinfín de 1 hilo y paso 1 pulg sobre un diámetro de 2 pulg tiene λ = arctan(1/(π·2)) = 9°. Con 2 hilos, λ se duplica. Más hilos = mayor ángulo = mayor eficiencia = menor reducción. ¡El sinfín siempre es un compromiso!
      </PreguntaBox>
      <FormulaBox>
        Relación de velocidad: mG = NG / NW    (NW = número de hilos del sinfín)
        <br />Paso axial: px = π·dm·tan(λ) / NW = π / Pd
        <br />Diámetro medio del sinfín: dm ≈ C^0.875 - 2·C^0.125 / Pd + 0.5·px  (aprox.)
        <br />Diámetro de paso de la corona: DG = NG / Pd
        <br />Distancia entre centros: C = (dm + DG) / 2
        <br />Ángulo de avance: λ = arctan(NW·px / (π·dm))
        <br />Ángulo normal de presión: φn = arctan(tan(φ)·cos(λ))
        <br />Ancho de cara de la corona: Fe ≤ 0.67·dm (recomendado)
      </FormulaBox>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Cs — Factor de materiales</th>
            <th className="p-2">Par sinfín</th>
            <th className="p-2">Cs</th>
          </tr></thead>
          <tbody>
            {[
              ['Acero/bronce fosforado', '833'],
              ['Acero/bronce estañado', '1000'],
              ['Acero/bronce de plomo', '1200'],
              ['Hierro/bronce', '560'],
              ['Hierro/hierro', '340'],
            ].map(([mat, cs], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{mat}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{cs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Cv — Factor de velocidad</th>
            <th className="p-2">Vs (ft/min)</th>
            <th className="p-2">Cv</th>
          </tr></thead>
          <tbody>
            {[
              ['0 ≤ Vs ≤ 700', 'Cv ≈ 0.659·e^(-0.00112·Vs)'],
              ['700 < Vs ≤ 3000', 'Cv ≈ 13.31/(Vs+8.834)'],
              ['Vs > 3000', 'No recomendado (desgaste excesivo)'],
            ].map(([rng, cv], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{rng}</td>
                <td className="p-2 border-b text-center font-mono text-xs" style={{ borderColor: 'var(--border)' }}>{cv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConceptBlock title="Cm — Factor de relación">
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse" style={{ width: 'auto' }}>
            <thead><tr><th className="p-2 text-right pr-4">mG</th><th className="p-2 text-right">Cm</th></tr></thead>
            <tbody>
              {[['2.5', '0.280'], ['3.0', '0.240'], ['4.0', '0.215'], ['5.0', '0.200'], ['6.0', '0.190'],
                ['8.0', '0.170'], ['10.0', '0.160'], ['15.0', '0.145'], ['20+', '0.136']].map(([mg, cm], i) => (
                <tr key={i}><td className="p-1 text-right font-mono">{mg}</td><td className="p-1 text-right font-mono">{cm}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </ConceptBlock>

      <SectionTitle id="15-9">15-9 Temperatura y calificación térmica</SectionTitle>
      <FormulaBox>
        Calor disipado: Hpérdida = 33000·(1-e)·H_entrada  [ft·lbf/min]
        <br />Temperatura del aceite: ts = ta + Hpérdida / (h̄CR · A)
        <br />Área mínima recomendada: Amin = 43.20·C^1.7  [pulg²]
        <br />Si ts &gt; 250°F → reducir potencia o agregar enfriamiento externo
      </FormulaBox>

      <MiniEjemplo>
        <strong>Autobloqueo:</strong> Un sinfín de λ=5°, φn=20° necesita f &ge; cos20°·tan5° = 0.164 para ser autocontenido.<br />
        Con f típico ~0.02-0.03 (bien lubricado), el sistema <em>no</em> es autocontenido. La corona puede girar el sinfín libremente.<br />
        Si necesitas autobloqueo (polipastos, elevadores), usa fricción alta o un freno separado.
      </MiniEjemplo>

      <SectionTitle id="15-10">15-10 Carga de desgaste de Buckingham</SectionTitle>
      <FormulaBox>
        σa = WtG / (pn · Fe · y)
        <br />y (φn=14.5°)=0.100 | y(φn=20°)=0.125 | y(φn=25°)=0.150
      </FormulaBox>
      <WormGearCalc />
    </ChapterShell>
  )
}
