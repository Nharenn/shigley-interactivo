'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo } from '@/components/content/ChapterHelpers'
import { FlatBeltSVG, VBeltSVG, ChainSVG, WireRopeSVG } from '@/components/content/Chap17Figures'

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

function ChainCalc() {
  const [p_in, setP] = useState(0.75)
  const [N1, setN1] = useState(18)
  const [N2, setN2] = useState(72)
  const [n_rpm, setN_rpm] = useState(200)
  const [H_hp, setH_hp] = useState(10)
  const [Cr_out, setChainRow] = useState(1)

  const p = p_in
  const d1 = p * N1 / Math.PI
  const d2 = p * N2 / Math.PI
  const e = N1 / N2
  const n2 = n_rpm * e
  const V = N1 * p * n_rpm / 12
  const F = H_hp * 33000 / (V > 0 ? V : 1)
  const P_nominal = H_hp * (1 + 0.01 * (n_rpm > 0 ? 1 : 0))
  const ratio = N2 / N1

  const chainData: Record<string, { hp_rpm: number[] }> = {
    '0.5': { hp_rpm: [3.9, 2.2, 1.6] },
    '0.625': { hp_rpm: [7.2, 4.0, 2.9] },
    '0.75': { hp_rpm: [12.0, 6.7, 4.8] },
    '1.0': { hp_rpm: [24.0, 13.5, 9.7] },
    '1.25': { hp_rpm: [40.0, 22.5, 16.2] },
  }
  const pKey = p_in.toString()
  const maxHp = (chainData[pKey]?.hp_rpm || [12])[Math.min(Cr_out - 1, 2)]
  const safe = P_nominal <= maxHp

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Cadena de Rodillos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'p — Paso (pulg)', val: p_in, set: setP },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <select value={val} onChange={e => set(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }}>
              <option value={0.5}>#40 — 0.500"</option>
              <option value={0.625}>#50 — 0.625"</option>
              <option value={0.75}>#60 — 0.750"</option>
              <option value={1.0}>#80 — 1.000"</option>
              <option value={1.25}>#100 — 1.250"</option>
            </select>
          </div>
        ))}
        <div><label className="block text-xs mb-1">N₁ — Dientes piñón</label><input type="number" min="12" step="1" value={N1} onChange={e => setN1(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
        <div><label className="block text-xs mb-1">N₂ — Dientes rueda</label><input type="number" min="17" step="1" value={N2} onChange={e => setN2(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
        <div><label className="block text-xs mb-1">n₁ — Velocidad (rpm)</label><input type="number" step="10" value={n_rpm} onChange={e => setN_rpm(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
        <div><label className="block text-xs mb-1">H — Potencia (hp)</label><input type="number" step="0.5" value={H_hp} onChange={e => setH_hp(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
        <div><label className="block text-xs mb-1">Hileras de cadena</label><select value={Cr_out} onChange={e => setChainRow(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }}><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}><div className="text-xs opacity-70">Relación</div><div className="text-lg font-bold">{ratio.toFixed(2)}:1</div></div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}><div className="text-xs opacity-70">V — Velocidad</div><div className="text-lg font-bold">{V.toFixed(0)} ft/min</div></div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}><div className="text-xs opacity-70">F — Fuerza</div><div className="text-lg font-bold">{F.toFixed(0)} lbf</div></div>
        <div className="p-3 rounded" style={{ background: safe ? '#16a34a22' : '#dc262622' }}><div className="text-xs opacity-70">Capacidad</div><div className="font-bold text-sm" style={{ color: safe ? '#16a34a' : '#dc2626' }}>{safe ? 'Adecuada ✓' : 'Insuficiente ✗'}</div><div className="text-xs">Max ≈ {maxHp.toFixed(1)} hp</div></div>
      </div>
    </div>
  )
}

function WireRopeCalc() {
  const [d_r, setD_r] = useState(0.5)
  const [D_p, setD_p] = useState(30)
  const [FS, setFS] = useState(5)
  const [F_break, setF_break] = useState(13.0)

  const ropeData: Record<string, number> = { '0.25': 1.7, '0.375': 3.9, '0.5': 6.9, '0.625': 10.4, '0.75': 14.9, '0.875': 20.1, '1.0': 26.5 }
  const p_rope = 2 * (F_break > 0 ? F_break : (ropeData[d_r.toFixed(d_r % 1 === 0 ? 0 : 3)] || 6.9))
  const P_allow = (F_break > 0 ? F_break : (ropeData[d_r.toFixed(d_r % 1 === 0 ? 0 : 3)] || 6.9)) * 1000 / FS
  const D_ratio = D_p / d_r
  const safe_D = D_ratio >= 20

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Selector — Cable de Acero</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs mb-1">d — Diámetro cable (pulg)</label>
          <select value={d_r} onChange={e => setD_r(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }}>
            {[0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0].map(v => <option key={v} value={v}>{v}"</option>)}
          </select>
        </div>
        <div><label className="block text-xs mb-1">D — Diámetro polea (pulg)</label><input type="number" step="1" value={D_p} onChange={e => setD_p(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
        <div><label className="block text-xs mb-1">FS — Factor de seguridad</label><input type="range" min="3" max="12" step="0.5" value={FS} onChange={e => setFS(Number(e.target.value))} className="w-full" /><div className="text-sm font-mono text-center">{FS.toFixed(1)}</div></div>
        <div><label className="block text-xs mb-1">Rotura nominal (kips)</label><input type="number" step="0.5" value={F_break} onChange={e => setF_break(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} /></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-lg" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}><div className="text-xs opacity-70">Carga permisible</div><div className="text-lg font-bold">{P_allow.toFixed(0)} lbf</div></div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}><div className="text-xs opacity-70">D/d — Ratio polea</div><div className="text-lg font-bold">{D_ratio.toFixed(0)}</div></div>
        <div className="p-3 rounded" style={{ background: safe_D ? '#16a34a22' : '#dc262622' }}><div className="text-xs opacity-70">¿D/d ≥ 20?</div><div className="font-bold" style={{ color: safe_D ? '#16a34a' : '#dc2626' }}>{safe_D ? 'Sí ✓' : 'No — aumentar D'}</div></div>
      </div>
    </div>
  )
}

function BeltCalc() {
  const [D, setD] = useState(18)
  const [d, setd] = useState(6)
  const [C_in, setC_in] = useState(96)
  const [f, setf] = useState(0.8)
  const [H_hp, setH_hp] = useState(15)
  const [n_rpm, setn_rpm] = useState(1750)
  const [F1a, setF1a] = useState(420)

  const phi = Math.PI - 2 * Math.asin((D - d) / (2 * C_in))
  const efp = Math.exp(f * phi)
  const V_fpm = Math.PI * d * n_rpm / 12
  const T = 63025 * H_hp / n_rpm
  const dF = 2 * T / d
  const F2 = F1a - dF
  const fPrime = phi > 0 ? Math.log(F1a / Math.max(F2, 0.1)) / phi : 0
  const noSlip = fPrime < f
  const Fi = (F1a + F2) / 2
  const H_trans = (F1a - F2) * V_fpm / 33000

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Transmisión de Banda Plana</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'D — Diámetro polea mayor (pulg)', val: D, set: setD, step: 1 },
          { label: 'd — Diámetro polea menor (pulg)', val: d, set: setd, step: 1 },
          { label: 'C — Distancia entre centros (pulg)', val: C_in, set: setC_in, step: 1 },
          { label: 'H — Potencia nominal (hp)', val: H_hp, set: setH_hp, step: 1 },
          { label: 'n — Velocidad piñón (rpm)', val: n_rpm, set: setn_rpm, step: 100 },
          { label: '(F1)a — Tensión máx. permisible (lbf)', val: F1a, set: setF1a, step: 10 },
        ].map(({ label, val, set, step }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
        <div>
          <label className="block text-xs mb-1">f — Coeficiente de fricción banda</label>
          <input type="range" min="0.1" max="1.0" step="0.05" value={f} onChange={e => setf(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{f.toFixed(2)}</div>
        </div>
      </div>
      <div className="p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: 'var(--bg-2)' }}>
        {[
          { label: 'φ — Ángulo de contacto', value: `${phi.toFixed(4)} rad (${(phi * 180 / Math.PI).toFixed(1)}°)` },
          { label: 'T — Par de torsión', value: `${T.toFixed(1)} lbf·pulg` },
          { label: 'F₂ — Tensión lado flojo', value: `${F2.toFixed(1)} lbf` },
          { label: 'Fi — Tensión inicial', value: `${Fi.toFixed(1)} lbf` },
          { label: 'V — Velocidad banda', value: `${V_fpm.toFixed(0)} ft/min` },
          { label: 'H transmitida', value: `${H_trans.toFixed(2)} hp` },
          { label: 'e^(fφ)', value: efp.toFixed(3) },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
            <div className="text-xs opacity-70">{label}</div>
            <div className="text-base font-bold">{value}</div>
          </div>
        ))}
        <div className="p-3 rounded" style={{ background: noSlip ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">Deslizamiento</div>
          <div className="font-bold text-sm" style={{ color: noSlip ? '#16a34a' : '#dc2626' }}>
            {noSlip ? 'Sin desliz. ✓' : 'DESLIZAMIENTO'}
          </div>
          <div className="text-xs">f′={fPrime.toFixed(3)}, f={f}</div>
        </div>
      </div>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <BeltCalc />
      <ChainCalc />
      <WireRopeCalc />
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado 17-1 — Banda plana poliamida</h3>
        <p className="mb-3 text-sm">Banda A-3, b=6 pulg, D=18", d=6", C=96", f=0.8, H=15 hp, n=1750 rpm, Ks=1.25, nd=1.1, Cp=0.70, Fa=100 lbf/pulg.</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>φd = π - 2·arcsin((18-6)/(2×96)) = π - 0.125 = 3.017 rad</li>
          <li>e^(fφ) = e^(0.8×3.017) = 11.17</li>
          <li>V = π×6×1750/12 = 2749 ft/min</li>
          <li>T = 63025×15×1.25×1.1/1750 = 743 lbf·pulg</li>
          <li>(F1)a = b×Fa×Cp×Cv = 6×100×0.70×1 = 420 lbf</li>
          <li>F2 = 420 - 2×743/6 = 420 - 248 = 172 lbf</li>
          <li>f&apos; = ln(420/172)/3.017 = 0.328 &lt; f=0.8 ✓ Sin deslizamiento</li>
          <li>H_trans = (420-172)×2749/33000 = 20.7 hp ≥ Hd = 20.6 hp ✓</li>
        </ol>
      </div>
    </div>
  )
}

const sections = [
  { id: '17-1', label: '17-1 Bandas' },
  { id: '17-2', label: '17-2 Banda plana/redonda' },
  { id: '17-3', label: '17-3 Bandas en V' },
  { id: '17-4', label: '17-4 Banda sincrónica' },
  { id: '17-5', label: '17-5 Cadenas rodillos' },
  { id: '17-6', label: '17-6 Cables metálicos' },
  { id: '17-7', label: '17-7 Ejes flexibles' },
]

export default function Cap17Page() {
  return (
    <ChapterShell
      chapterId={17}
      chapterNum="17"
      title="Elementos mecánicos flexibles"
      subtitle="Diseño y análisis de transmisiones por banda plana, banda en V, cadenas de rodillos y cables metálicos."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="17-1">17-1 Bandas — generalidades</SectionTitle>
      <PreguntaBox>
        ¿Por qué un motor eléctrico usa una banda en V y no una cadena? Las bandas son silenciosas, no requieren lubricación, toleran desalineación y actúan como fusible mecánico (si algo se traba, la banda resbala en lugar de romper el eje). Pero si necesitas sincronización exacta, ahí entra la cadena o la banda dentada.
      </PreguntaBox>
      <FlatBeltSVG />
      <ConceptBlock title="Tipos de bandas y sus características">
        <b>Banda plana:</b> Eficiencia ~98%, silenciosa, grandes distancias entre centros.
        <br /><b>Banda en V:</b> Más tracción (efecto cuña), eficiencia 70-96%, distancias cortas-medianas.
        <br /><b>Banda de sincronización (dentada):</b> Sin deslizamiento, relación de velocidad constante.
        <br /><b>Banda redonda:</b> Para poleas ranuradas, aplicaciones ligeras.
      </ConceptBlock>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2">f típico</th>
            <th className="p-2">Eficiencia</th>
            <th className="p-2">Aplicación típica</th>
          </tr></thead>
          <tbody>
            {[
              ['Plana-cuero', '0.5-0.8', '~98%', 'Maquinaria industrial, molinos'],
              ['Plana-poliamida', '0.5-0.8', '~98%', 'Transmisión de alta velocidad'],
              ['En V estándar', '0.5-0.6', '70-96%', 'Automóvil, electrodoméstico'],
              ['En V estrecha', '0.5-0.6', '~96%', 'Compresores, bombas'],
              ['Sincronización', 'N/A', '~98%', 'Distribución motores, CNC'],
            ].map(([tipo, ff, eff, app], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{tipo}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{ff}</td>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{eff}</td>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="17-2">17-2 Transmisiones de banda plana o redonda</SectionTitle>
      <OjoAqui>
        La tensión centrífuga Fc <strong>no es despreciable</strong> en bandas de alta velocidad. A 5000 ft/min, Fc puede ser el 30% de la tensión total. Si usas la ecuación de Euler sin restar Fc, sobreestimas la capacidad de transmisión drásticamente. Siempre usa (F₁−Fc)/(F₂−Fc) = e^(f·φ).
      </OjoAqui>
      <ConceptBlock title="Creuencia elástica (no es deslizamiento)">
        Cuando una banda transmite potencia, el lado tenso (F₁) está más estirado que el lado flojo (F₂). Al pasar sobre la polea motriz, la banda se <strong>acorta</strong> (pasa de F₁ a F₂), y la polea avanza un poco más que la banda. Este fenómeno se llama <em>creuencia elástica</em> — no es deslizamiento, pero causa que la polea conducida gire ligeramente más lento que la relación de diámetros. La velocidad de la banda es: v_banda ≈ v_polea·(1 - creep). El creep es inevitable en cualquier sistema de banda que transmita potencia.
      </ConceptBlock>
      <ConceptBlock title="Tensión inicial — la clave del diseño">
        La tensión inicial Fi es <strong>fundamental</strong>: sin Fi, no hay torque. La ecuación Fi = (T/d)·(e^(fφ)+1)/(e^(fφ)-1) muestra que el torque es <strong>proporcional a Fi</strong>. Esto significa que para que una transmisión por banda funcione:
        <br />1. La tensión inicial <em>debe</em> proporcionarse (mecanismo de tensión o polea tensora)
        <br />2. La tensión inicial <em>debe</em> mantenerse (la banda se estira con el tiempo)
        <br />3. La tensión inicial <em>debe</em> ser la cantidad correcta (demasiado = desgaste, poco = deslizamiento)
        <br />4. La tensión inicial <em>debe</em> verificarse rutinariamente
        <br /><br />La <strong>flecha</strong> (sag) de la banda en el lado flojo se usa para verificar Fi en campo:
        <br />dip = C²·w/(96·Fi), donde C = distancia entre centros, w = peso por unidad de longitud.
      </ConceptBlock>
      <FormulaBox>
        Geometría (banda abierta):
        <br />φd = π - 2·arcsin((D-d)/(2C))   ← ángulo de contacto, polea menor
        <br />L = √(4C²-(D-d)²) + (D·φD + d·φd)/2  ← longitud de banda
        <br /><br />Velocidad: V = π·d·n/12  [ft/min]
        <br />Tensión centrífuga: Fc = (w/g)·(V/60)²  [lbf]
        <br /><br />Ecuación de Euler (con Fc):
        <br />(F1-Fc)/(F2-Fc) = e^(f·φ)
        <br />Tensión inicial: Fi = (F1+F2)/2 + Fc (aprox.)
        <br />Par: T = (F1-F2)·d/2 | Potencia: H = (F1-F2)·V / 33000  [hp]
        <br />Verificar sin deslizamiento: f' = ln(F1/F2)/φ  &lt;  f
      </FormulaBox>

      <SectionTitle id="17-3">17-3 Bandas en V</SectionTitle>
      <PreguntaBox>
        ¿Por qué una banda en V puede transmitir más potencia que una plana del mismo ancho? Por el <strong>efecto cuña</strong>: la banda se acuña en la ranura de la polea, multiplicando la fuerza normal. La fricción efectiva es f/sen(α/2). Con α = 36°, ¡la fricción efectiva es ~3.2 veces mayor!
      </PreguntaBox>
      <VBeltSVG />
      <FormulaBox>
        Fricción efectiva en banda en V:
        <br />f_eff = f / sin(α/2)    ← α = ángulo de ranura (típico: 34-40°)
        <br />Relación de Euler modificada: F1/F2 = e^(f_eff·φ)
        <br /><br />Potencia por banda: H1 = d₁·n₁·Ks / 63000  (de tablas del fabricante)
        <br />Corrección por ángulo de contacto: K₁ ≈ 0.2·(φ/π) aprox.
        <br />Corrección por longitud: K₂ ≈ 0.9-1.0 según longitud estándar
        <br /><br />Número de bandas: N_bands = H_diseño / (H1·K₁·K₂)
        <br />Factor de servicio Ks: uniforme=1.0, impacto ligero=1.1-1.2, impacto medio=1.2-1.4
      </FormulaBox>
      <ConceptBlock title="Procedimiento de selección de banda en V">
        <ol className="list-decimal ml-4 space-y-1 text-sm">
          <li>Determinar potencia de diseño: H_d = H_nominal · Ks</li>
          <li>Elegir sección de banda (A, B, C, D, 3V, 5V, 8V) según H_d y velocidad</li>
          <li>Seleccionar diámetro de polea motriz (d₁ ≥ d_mín de la tabla)</li>
          <li>Calcular d₂ = d₁ · (n₁/n₂), verificar velocidad de salida</li>
          <li>Determinar distancia entre centros C y longitud de banda L</li>
          <li>Verificar ángulo de contacto φ₁ ≥ 120° (mínimo)</li>
          <li>Leer H₁ de tablas del fabricante para d₁ y n₁</li>
          <li>Calcular H_corregida = H₁ · K₁ · K₂</li>
          <li>Número de bandas: N = H_d / H_corregida (redondear hacia arriba)</li>
        </ol>
      </ConceptBlock>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2">Sección</th>
            <th className="p-2">Ancho superior (pulg)</th>
            <th className="p-2">Profundidad (pulg)</th>
            <th className="p-2">d_min (pulg)</th>
          </tr></thead>
          <tbody>
            {[
              ['A', '0.50', '0.31', '3.0'],
              ['B', '0.66', '0.41', '5.0'],
              ['C', '0.88', '0.53', '7.0'],
              ['D', '1.25', '0.75', '12.0'],
              ['3V', '0.38', '0.34', '2.65'],
              ['5V', '0.62', '0.53', '7.1'],
            ].map(([sec, w, h, d], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b text-center font-bold" style={{ borderColor: 'var(--border)', color: accent }}>{sec}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{w}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{h}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="17-5">17-5 Cadenas de rodillos</SectionTitle>
      <PreguntaBox>
        ¿Cadena o banda? Si necesitas transmitir potencia a baja velocidad con alta carga y <strong>sin deslizamiento</strong>, la cadena es la respuesta. Las cadenas de rodillos ANSI son el estándar industrial — desde bicicletas hasta transportadores de 500 hp.
      </PreguntaBox>
      <ChainSVG />
      <ConceptBlock title="Variación cordal de velocidad">
        La cadena no se mueve a velocidad constante sobre el piñón. Cuando un eslabón entra en contacto, la velocidad varía entre un máximo y un mínimo. Esta <strong>variación cordal</strong> causa vibración y ruido:
        <br /><br />ΔV/V = (π/N)·[1/sin(180°/N) - 1/tan(180°/N)]
        <br /><br />Con N=18 dientes: ΔV/V ≈ 3.5%. Con N=12: ΔV/V ≈ 7.5%.
        <br /><strong>Recomendación:</strong> N ≥ 17 dientes para mínima vibración.
      </ConceptBlock>
      <ConceptBlock title="Lubricación de cadenas">
        <strong>Tipo A (manual/goteo):</strong> V &lt; 1000 ft/min. Aceite periódico.<br />
        <strong>Tipo B (baño/disco):</strong> V = 1000-2500 ft/min. Disco sumerge y rocía.<br />
        <strong>Tipo C (inyección):</strong> V &gt; 2500 ft/min. Bomba de aceite dirigida.
      </ConceptBlock>
      <FormulaBox>
        Velocidad de la cadena: V = N1·p·n1 / 12  [ft/min]
        <br />Fuerza transmitida: F = H·33000/V   [lbf]
        <br />Número de eslabones: L/p ≈ 2C/p + (N2+N1)/2 + [(N2-N1)/(2π)]²·(p/C)
        <br />Relaciones típicas de velocidad: hasta 7:1 (una etapa)
      </FormulaBox>
      <ConceptBlock title="Designación de cadenas ANSI">
        No. 40 → p = 0.5 pulg | No. 60 → p = 0.75 pulg | No. 80 → p = 1 pulg | No. 100 → p = 1.25 pulg
        <br />Cadenas múltiples (#40-2, #40-3): capacidad × factor (1.7, 2.5, 3.3...)
      </ConceptBlock>
      <ChainCalc />

      <SectionTitle id="17-4">17-4 Bandas de sincronización (dentadas)</SectionTitle>
      <ConceptBlock title="Banda de sincronización (timing belt)">
        La banda dentada combina las ventajas de la banda (silenciosa, sin lubricación) con las de la cadena (relación de velocidad constante, sin deslizamiento). Los dientes encajan con la polea dentada como un engrane flexible.<br /><br />
        <strong>Aplicaciones:</strong> Distribución de motores, impresoras, CNC, robótica.<br />
        <strong>Relación:</strong> Exacta — sin deslizamiento = relación precisa.<br />
        <strong>Potencia:</strong> Hasta ~200 hp en aplicaciones industriales.<br />
        <strong>Ventaja clave:</strong> No requiere tensión inicial elevada (los dientes transmiten la carga, no la fricción).
      </ConceptBlock>
      <OjoAqui>
        La banda dentada <strong>no se estira</strong> como una banda plana o en V, así que la tensión inicial <em>no</em> determina la capacidad de transmisión — la determinan los dientes. Pero eso también significa que no absorbe impactos: la carga de choque va directamente al eje y los cojinetes.
      </OjoAqui>

      <SectionTitle id="17-6">17-6 Cables metálicos</SectionTitle>
      <PreguntaBox>
        ¿Cómo se calcula un cable de ascensor? Un cable 6×19 tiene 6 torones de 19 alambres cada uno. La carga de rotura nominal es enorme, pero el factor de seguridad para personas es FS ≥ 5 (ascensores) o incluso FS ≥ 9 (teleféricos). No es solo resistencia — la <strong>fatiga</strong> por flexión sobre poleas es el verdadero enemigo.
      </PreguntaBox>
      <WireRopeSVG />
      <FormulaBox>
        Carga de trabajo segura: F_perm = F_rotura / FS
        <br />Presión en polea: p = 2F / (d·D) ≤ p_perm    [d = diámetro cable, D = diámetro polea]
        <br />Presión permisible: p_perm ≈ 200 psi (6×19 sobre polea de acero)
        <br />Ratio mínimo D/d ≥ 20 (para uso general) | ≥ 45 (ascensores)
        <br /><br />Construcciones comunes: 6×7 (rudo), 6×19 (estándar), 6×37 (flexible), 8×19 (alta flex)
        <br />Clase de resistencia: Grado 80 (80 kgf/mm²), Grado 160, Grado 180
      </FormulaBox>
      <ConceptBlock title="Cables de acero — selección">
        <strong>Regla 1:</strong> D/d ≥ 20 para uso general. Ascensores requieren D/d ≥ 45.<br />
        <strong>Regla 2:</strong> Fatiga por flexión: cada ciclo de flexión sobre una polea causa esfuerzo de contacto que puede causar rotura de alambres individuales.<br />
        <strong>Regla 3:</strong> FS = 5 para izado general. FS = 7–9 para transporte de personas.<br />
        <strong>Regla 4:</strong> Verificar tanto la resistencia estática (FS) como la fatiga (p ≤ p_perm).
      </ConceptBlock>
      <WireRopeCalc />

      <SectionTitle id="17-7">17-7 Ejes flexibles</SectionTitle>
      <PreguntaBox>
        ¿Cómo transmites par a través de una curva de 90°? Un eje rígido no puede. Los ejes flexibles (flexible shafts) son espirales de alambres que funcionan como resortes de torsión muy largos — perfectos para herramientas de mano, odontología, controles de instrumentos y maquinaria en espacios reducidos.
      </PreguntaBox>
      <ConceptBlock title="Tipos de ejes flexibles">
        <strong>Tipo potencia:</strong> Transmiten par a baja velocidad (bajo par). Núcleo grueso, múltiples capas de alambre. Aplicaciones: equipos dentales, rectificadoras portátiles, mezcladoras industriales.
        <br /><br />
        <strong>Tipo instrumento/control:</strong> Transmiten movimiento angular con bajo par. Núcleo delgado, alta precisión. Aplicaciones: tacómetros, contadores, paneles de control a distancia.
        <br /><br />
        <strong>Construcción:</strong> Un núcleo central (alambre trenzado) rodeado por capas alternas de alambres en espiral, cada capa en dirección opuesta. El núcleo absorbe la compresión axial; las capas exteriores transmiten el par por torsión.
      </ConceptBlock>
      <FormulaBox>
        Eficiencia: η = 1 - (T_perdido / T_aplicado)
        <br />η disminuye con: radio de curvatura pequeño, velocidad alta, lubricación deficiente
        <br /><br />Regla práctica — radio mínimo de curvatura:
        <br />R_min ≈ 25 × d_eje  (tipo instrumento)
        <br />R_min ≈ 12 × d_eje  (tipo potencia, uso moderado)
        <br /><br />Par transmisible: T = k_torsión × φ  (k varía según construcción y curvatura)
        <br />Pérdida de eficiencia por curvatura: ~1-3% por cada curva de 90°
      </FormulaBox>
      <ConceptBlock title="Selección de ejes flexibles">
        <strong>Criterio 1 — Par:</strong> El eje debe soportar T_diseño = T_nominal × Ks (factor de servicio ≥ 1.25 para cargas variables).
        <br /><br />
        <strong>Criterio 2 — Radio de curvatura:</strong> El radio de instalación debe ser mayor que R_min del fabricante. Doblar más el eje reduce drásticamente la vida por fatiga de los alambres.
        <br /><br />
        <strong>Criterio 3 — Velocidad:</strong> Los ejes flexibles tienen velocidades máximas (típico: 5,000–20,000 rpm para tipo instrumento; 500–3,000 rpm para tipo potencia). Exceder la velocidad causa vibración y calor excesivo.
        <br /><br />
        <strong>Criterio 4 — Lubricación:</strong> La mayoría requiere grasa interna. La funda protectora (casing) retiene el lubricante y protege el núcleo.
      </ConceptBlock>
      <OjoAqui>
        El sentido de giro importa en un eje flexible. Si el núcleo gira en el mismo sentido que el enrollamiento de los alambres exteriores, las capas tienden a <strong>apretar</strong> el eje (bueno: se autoajusta). Si gira en sentido contrario, las capas tienden a <strong>aflojarse</strong> — esto provoca ruido, vibración y desgaste prematuro. Consulta siempre las instrucciones del fabricante sobre el sentido de rotación.
      </OjoAqui>
    </ChapterShell>
  )
}
