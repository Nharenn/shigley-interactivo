'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo } from '@/components/content/ChapterHelpers'
import { GearboxLayoutSVG, ShaftForcesSVG } from '@/components/content/Chap18Figures'

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

function GearReducerCalc() {
  const [H_hp, setH_hp] = useState(20)
  const [n_in, setN_in] = useState(1750)
  const [N2, setN2] = useState(16)
  const [N3, setN3] = useState(72)
  const [N4, setN4] = useState(16)
  const [N5, setN5] = useState(72)
  const [Pd, setPd] = useState(5)
  const [eff, setEff] = useState(0.97)

  const e = (N2 * N4) / (N3 * N5)
  const n3 = n_in * (N2 / N3)
  const n5 = n3 * (N4 / N5)
  const T2 = 63025 * H_hp / n_in
  const T3 = 63025 * H_hp / n3
  const T5 = 63025 * (H_hp * eff) / n5
  const d2 = N2 / Pd
  const d3 = N3 / Pd
  const d4 = N4 / Pd
  const d5 = N5 / Pd
  const Wt2 = T2 / (d2 / 2)
  const H_out = H_hp * eff

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Tren de Engranes de 2 Etapas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'H — Potencia (hp)', val: H_hp, set: setH_hp, step: 1 },
          { label: 'n₂ — Velocidad entrada (rpm)', val: n_in, set: setN_in, step: 50 },
          { label: 'Pd — Paso diametral (1/pulg)', val: Pd, set: setPd, step: 1, min: 1 },
        ].map(({ label, val, set, step }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
        <div>
          <label className="block text-xs mb-1">η — Eficiencia del tren</label>
          <input type="range" min="0.90" max="1.00" step="0.01" value={eff} onChange={e => setEff(Number(e.target.value))} className="w-full mt-2" />
          <div className="text-sm font-mono text-center">{(eff * 100).toFixed(0)} %</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'N₂ — Dientes piñón etapa 1', val: N2, set: setN2 },
          { label: 'N₃ — Dientes engrane etapa 1', val: N3, set: setN3 },
          { label: 'N₄ — Dientes piñón etapa 2', val: N4, set: setN4 },
          { label: 'N₅ — Dientes engrane etapa 2', val: N5, set: setN5 },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step="1" min="12" value={val} onChange={ev => set(Number(ev.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Valor del tren e = ωo/ωi', value: `1 / ${(1 / e).toFixed(2)} (${e.toFixed(5)})` },
          { label: 'ω₃ = ω₄ — Eje intermedio', value: `${n3.toFixed(1)} rpm` },
          { label: 'ω₅ — Velocidad de salida', value: `${n5.toFixed(2)} rpm` },
          { label: 'T₂ — Par entrada', value: `${T2.toFixed(1)} lbf·in` },
          { label: 'T₃ — Par eje intermedio', value: `${T3.toFixed(1)} lbf·in` },
          { label: 'T₅ — Par de salida', value: `${T5.toFixed(0)} lbf·in` },
          { label: 'd₂ / d₃ — Diámetros etapa 1', value: `${d2.toFixed(3)} / ${d3.toFixed(3)} pulg` },
          { label: 'd₄ / d₅ — Diámetros etapa 2', value: `${d4.toFixed(3)} / ${d5.toFixed(3)} pulg` },
          { label: 'H_salida — Potencia de salida', value: `${H_out.toFixed(2)} hp` },
          { label: 'Wt₂ — Carga tangencial piñón 2', value: `${Wt2.toFixed(1)} lbf` },
        ].map(({ label, value }) => (
          <div key={label} className="p-3 rounded-lg" style={{ background: 'var(--bg-2)' }}>
            <div className="text-xs opacity-60">{label}</div>
            <div className="text-xl font-mono font-bold" style={{ color: accent }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: accent }}>Práctica — Cap. 18</h2>
      {[
        { n: '18-1', e: 'Para el caso de estudio, diseñe el eje de entrada (eje del piñón N₂). Especifique: material del eje, diámetro, longitud total, tipo de cojinetes, cuñas y anillos de retención. Utilice los engranes del caso: N₂=16, N₃=72, Pd=5, φ=20°, 20 hp, 1750 rpm.' },
        { n: '18-2', e: 'Diseñe el eje de salida (eje del engrane N₅). Incluya especificación completa de engranaje, cojinetes, cuña, anillos de retención y eje.' },
        { n: '18-3', e: 'Repita el caso de estudio del eje intermedio pero usando engranes helicoidales con ψ=20°. Compare las fuerzas radiales y axiales con el diseño de engrane recto.' },
        { n: '18-4', e: 'Realice el análisis final del eje intermedio del caso de estudio. Elabore un esquema final con dimensiones y tolerancias. ¿Satisface el diseño todos los requisitos? Identifique los aspectos críticos.' },
        { n: '18-5', e: 'Repita el caso de estudio del eje intermedio cambiando el requerimiento de potencia a 40 hp. ¿Cuánto aumentan los diámetros del eje? ¿Cuáles componentes se convierten en los críticos?' },
      ].map(p => (
        <div key={p.n} className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
          <div className="font-bold mb-2" style={{ color: accent }}>Problema {p.n}</div>
          <p className="text-sm leading-relaxed">{p.e}</p>
        </div>
      ))}
    </div>
  )
}

const sections = [
  { id: 'intro', label: 'Introducción' },
  { id: 'secuencia', label: 'Secuencia de diseño' },
  { id: 'potencia', label: 'Potencia y par' },
  { id: 'engranes', label: 'Especificaciones de engranes' },
  { id: 'eje', label: 'Diseño del eje' },
  { id: 'fuerzas', label: 'Análisis de fuerzas' },
  { id: 'material', label: 'Material y esfuerzos' },
  { id: 'cojinetes', label: 'Cojinetes y cuñas' },
  { id: 'calculo', label: 'Calculadora interactiva' },
  { id: 'guia', label: 'Guía paso a paso' },
  { id: 'analisis', label: 'Análisis final' },
]

export default function Cap18Page() {
  return (
    <ChapterShell
      chapterId={18}
      chapterNum="18"
      title="Caso de estudio: transmisión de potencia"
      subtitle="Diseño de sistema completo de un reductor de velocidad de dos etapas integrando engranes, ejes, cojinetes y elementos de fijación."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <section id="intro">
        <SectionTitle id="intro">Introducción</SectionTitle>
        <PreguntaBox>
          ¿Cómo se diseña un reductor de velocidad <strong>completo</strong> desde cero? Este capítulo integra <em>todo</em> lo aprendido: engranes, ejes, cojinetes, cuñas y anillos. Sigue el caso de estudio del libro Shigley: un reductor de 2 etapas que va de 1750 rpm a 86 rpm. No es teoría — es el proceso real que sigue un ingeniero de diseño.
        </PreguntaBox>
        <GearboxLayoutSVG />
        <p className="mb-4">
          La transmisión de potencia desde una fuente hasta una carga de salida es una de las tareas más comunes en maquinaria. Este capítulo presenta el <strong>diseño de sistema completo</strong> de un reductor de velocidad de dos etapas, integrando: engranes (Cap. 14), ejes (Cap. 7), cojinetes (Cap. 11) y elementos de fijación.
        </p>
        <p className="mb-4">
          El proceso de diseño es <strong>iterativo</strong> porque los componentes se afectan mutuamente: el diámetro del eje depende de las fuerzas del engrane, pero el agujero del engrane requiere conocer ese diámetro. Los cojinetes necesitan el diámetro del eje. La secuencia de diseño no es arbitraria — sigue las dependencias entre componentes.
        </p>
        <ConceptBlock title="Especificaciones del caso de estudio">
          <ul className="list-disc list-inside space-y-1">
            <li>Potencia: <strong>20 hp</strong></li>
            <li>Velocidad de entrada: <strong>1 750 rpm</strong></li>
            <li>Velocidad de salida: <strong>82–88 rpm</strong></li>
            <li>Carga: habitualmente bajos niveles de impacto, a veces moderados</li>
            <li>Carcasa: 22 × 14 × 14 pulgadas | Ejes en línea</li>
            <li>Vida: 12 000 horas para engranes y cojinetes</li>
          </ul>
        </ConceptBlock>
      </section>

      <section id="secuencia">
        <SectionTitle id="secuencia">18-1 Secuencia de Diseño para Transmisión de Potencia</SectionTitle>
        <ol className="list-decimal list-inside space-y-3 mb-4">
          <li><strong>Requisitos de potencia y par de torsión</strong> — determina el dimensionamiento global del sistema.</li>
          <li><strong>Especificación de engranes</strong> — relaciones de engranes, transmisión de par.</li>
          <li><strong>Diseño del eje (preliminar)</strong> — ubicaciones axiales, forma general, cuñas, anillos de retención.</li>
          <li><strong>Análisis de fuerzas</strong> — diagramas de cuerpo libre, cortante y momento.</li>
          <li><strong>Selección del material del eje</strong> — elegir material razonable antes del diseño por fatiga.</li>
          <li><strong>Diseño del eje para esfuerzo</strong> — análisis estático y de fatiga (DE-Goodman).</li>
          <li><strong>Diseño del eje para deflexión</strong> — verificar deflexiones críticas.</li>
          <li><strong>Selección de cojinetes</strong> — seleccionar de catálogo.</li>
          <li><strong>Selección de cuñas y anillos de retención</strong> — tamaños estándar.</li>
          <li><strong>Análisis final</strong> — verificación completa con factores de seguridad.</li>
        </ol>
      </section>

      <section id="potencia">
        <SectionTitle id="potencia">18-2 Requisitos de Potencia y Par de Torsión</SectionTitle>
        <FormulaBox>
          <div>H = Ti·ωi = To·ωo</div>
          <div className="mt-2">e = ωo/ωi = Ti/To &nbsp;&nbsp;&nbsp; [valor del tren]</div>
          <div className="mt-2">T = 63 025 · H / n &nbsp;&nbsp;&nbsp; [lbf·in, H en hp, n en rpm]</div>
          <div className="mt-2">T = 9 549 · H / n &nbsp;&nbsp;&nbsp; [N·m, H en kW, n en rpm]</div>
        </FormulaBox>
        <ConceptBlock title="Eficiencia del tren de engranes">
          Las pérdidas en cojinetes de rodillo son despreciables. Cada par de engranes tiene ~1–2% de pérdida. En un reductor de dos etapas, la potencia de salida es aproximadamente 2–4% menor que la de entrada.
        </ConceptBlock>
      </section>

<section id="engranes">
        <SectionTitle id="engranes">18-3 Especificaciones de Engranes</SectionTitle>
        <FormulaBox>
          e = (N₂/N₃)·(N₄/N₅) &nbsp;&nbsp;&nbsp; [tren inverso compuesto]
          <div className="mt-2">Para etapas iguales: N₂/N₃ = N₄/N₅ = √e</div>
          <div className="mt-2">N₂ mínimo ≈ 16 dientes (para evitar interferencia)</div>
          <div className="mt-2">d = N / Pd &nbsp;&nbsp;&nbsp; [diámetro de paso, pulg]</div>
        </FormulaBox>
        <ConceptBlock title="Caso de estudio — Conteo de dientes">
          <strong>Objetivo:</strong> reducir de 1 750 rpm a 82–88 rpm.<br />
          e_objetivo = 85/1750 = 1/20.59<br />
          √(1/20.59) = 1/4.54 → N₂ = N₄ = 16, N₃ = N₅ = 72<br />
          e_real = (16/72)² = 1/20.25 → ω₅ = 86.4 rpm ✓
        </ConceptBlock>
        <ConceptBlock title="Análisis AGMA de los engranes — Caso de estudio">
          Con Pd = 5, φ = 20°, la restricción de carcasa (22" × 14") limita Pd ≥ 5.<br /><br />
          <strong>Piñón N₂:</strong> d₂ = 16/5 = 3.200", T₂ = 720 lbf·in, vt = π·3.2·1750/12 = 1473 ft/min<br />
          Ko = 1.25 (impacto ligero), Kv con Qv = 6: B = 0.8255 → Kv = 1.325<br />
          Wt₂ = 2·720/3.2 = 450 lbf, Wr₂ = 450·tan20° = 163.8 lbf<br /><br />
          <strong>Piñón N₄ (eje intermedio):</strong> d₄ = 3.200", T₃ = 3240 lbf·in<br />
          Wt₄ = 2·3240/3.2 = 2025 lbf, Wr₄ = 2025·tan20° = 737 lbf<br /><br />
          Factores: Ks = 0.4867 + 0.2132/5 = 0.529, Km = 1.25 + 0.0036·F²<br />
          Con material Grado 1 (HB=200): sat = 11020 psi, sac = 91420 psi<br />
          <strong>Verificación:</strong> SF y SH para cada engrane. El piñón N₄ es el más cargado → controla el diseño.
        </ConceptBlock>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">Eje</th>
                <th className="border p-2 text-right">Velocidad (rpm)</th>
                <th className="border p-2 text-right">Par T (lbf·in)</th>
                <th className="border p-2 text-right">Par T (lbf·ft)</th>
              </tr>
            </thead>
            <tbody>
              {[['2 — Entrada', '1 750', '720', '60'],
                ['3,4 — Intermedio', '388.9', '3 240', '270'],
                ['5 — Salida', '86.4', '14 580', '1 215']].map(([eje, rpm, lbfin, lbfft]) => (
                <tr key={eje} className="border-b">
                  <td className="border p-2 font-medium">{eje}</td>
                  <td className="border p-2 text-right font-mono">{rpm}</td>
                  <td className="border p-2 text-right font-mono">{lbfin}</td>
                  <td className="border p-2 text-right font-mono">{lbfft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="eje">
        <SectionTitle id="eje">18-4 Diseño del Eje (Esquema)</SectionTitle>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Ubicaciones axiales de engranes y cojinetes</li>
          <li>Método de transmisión de par (cuñas, lengüetas, ajustes de presión)</li>
          <li>Métodos de retención axial (anillos de retención, tuercas, ajustes)</li>
          <li>Estimación de concentraciones de esfuerzo para pasos posteriores</li>
        </ul>
        <ConceptBlock title="Diámetros del eje intermedio — caso de estudio">
          Para el eje intermedio con T₃ = 270 lbf·ft, un acero 1050 CD con Sy = 90 kpsi y Sut = 100 kpsi es una selección razonable. El diámetro inicial estimado (DE-Goodman) es d ≈ 1.25 a 1.5 pulgadas.
        </ConceptBlock>
      </section>

      <section id="fuerzas">
        <SectionTitle id="fuerzas">18-5 Análisis de Fuerzas</SectionTitle>
        <ShaftForcesSVG />
        <OjoAqui>
          El error más común en el caso de estudio es <strong>ignorar que las fuerzas del engrane N₃ y del piñón N₄ actúan en direcciones opuestas</strong> en el eje intermedio. Una está "empujando hacia arriba" y la otra "hacia abajo". El diagrama de cortante y momento debe reflejar eso — o subestimas el momento máximo por un factor de 2.
        </OjoAqui>
        <FormulaBox>
          <div className="font-bold mb-2">Fuerzas en engranes rectos (Pd = 5, φ = 20°):</div>
          <div>Wt = 2T / d &nbsp;&nbsp;&nbsp; [carga tangencial]</div>
          <div className="mt-1">Wr = Wt · tan(φ) &nbsp;&nbsp;&nbsp; [carga radial]</div>
          <div className="mt-3 font-bold">Piñón N₂ (d₂ = 3.2 pulg, T₂ = 720 lbf·in):</div>
          <div>Wt₂ = 2·720/3.2 = 450 lbf | Wr₂ = 450·tan(20°) = 163.8 lbf</div>
          <div className="mt-3 font-bold">Piñón N₄ (d₄ = 3.2 pulg, T₃ = 3 240 lbf·in):</div>
          <div>Wt₄ = 2·3240/3.2 = 2 025 lbf | Wr₄ = 2025·tan(20°) = 737 lbf</div>
        </FormulaBox>
        <p className="mb-4">
          Las cargas se descomponen en los planos <em>xz</em> y <em>xy</em>. Se combinan vectorialmente:
          M = √(M²xy + M²xz). Los momentos máximos determinan la ubicación crítica.
        </p>
      </section>

      <section id="material">
        <SectionTitle id="material">18-6 a 18-8 Material, Esfuerzo y Deflexión del Eje</SectionTitle>
        <PreguntaBox>
          ¿Cuánto debe medir el eje intermedio? Empiezas con un estimado: d ≈ 1.25-1.5 pulg para T = 270 lbf·ft. Luego iteras con DE-Goodman, verificas deflexión (y ≤ 0.005" en engranes) y pendiente (θ ≤ 0.0005 rad en cojinetes). El proceso es iterativo — como todo diseño real.
        </PreguntaBox>
        <MiniEjemplo>
          Eje intermedio: acero 1050 CD, Sut = 100 kpsi, Sy = 90 kpsi.<br />
          Momento alternante Ma = M_max (flexión rotativa), par medio Tm = T₃ (constante).<br />
          d = ∛(16n/π · √[(8·Ma·Kf/Se)² + 3·(Tm·Kfs/Sut)²])<br />
          Con n = 2, Kf = 1.5, Se ≈ 30 kpsi → d ≈ 1.35 pulg. ¡Coincide con el estimado inicial!
        </MiniEjemplo>
        <FormulaBox>
          <div className="font-bold mb-2">DE-Goodman para eje giratorio con flexión y torsión:</div>
          <div>d = ∛(16n/π · √[(8·Ma·Kf/Se)² + 3·(Tm·Kfs/Sut)²])</div>
          <div className="mt-2">Ma = amplitud del momento | Tm = par medio | Se = límite fatiga corregido</div>
        </FormulaBox>
        <ConceptBlock title="Factores de Marin para Se">
          Se' = 0.5·Sut (límite de fatiga sin corregir para acero Sut &lt; 200 kpsi)<br />
          Se = Se'·ka·kb·kc·kd·ke·kf<br /><br />
          <strong>ka</strong> (superficie): ka = a·Sut^b (acabado esmerilado: a=1.58, b=-0.085; maquinado: a=2.67, b=-0.265)<br />
          <strong>kb</strong> (tamaño): kb = (d/0.3)^(-0.107) para d &gt; 0.3"; kb ≈ 0.85 para d = 1.5"<br />
          <strong>kc</strong> (carga): kc = 1 (flexión), kc = 0.575 (torsión)<br />
          <strong>kd</strong> (temperatura): kd = 1 (si t ≤ 250°F)<br />
          <strong>ke</strong> (confiabilidad): ke = 0.814 (R=0.90), 0.753 (R=0.95), 0.702 (R=0.99)<br />
          <strong>kf</strong> (concentración de esfuerzo): kf = 1 + qa·(Sut/Sut_sy - 1)^qb (depende de la muesca o cuñero)<br /><br />
          Para el eje intermedio (AISI 1050 CD, d ≈ 1.35"): Se ≈ 29-35 kpsi tras aplicar factores.
        </ConceptBlock>
        <FormulaBox>
          <div className="font-bold mb-2">Deflexión del eje (ecuación de viga):</div>
          <div>EI · (d²y/dx²) = M(x) &nbsp;&nbsp;&nbsp; [integración doble]</div>
          <div className="mt-2">y ≤ 0.005" en engranes | θ ≤ 0.0005 rad en cojinetes | φ ≤ 0.5° en cuñas</div>
        </FormulaBox>
        <ConceptBlock title="Material típico para el eje intermedio">
          <strong>AISI 1050 CD:</strong> Sut = 100 kpsi, Sy = 90 kpsi<br />
          Se' = 0.5·Sut = 50 kpsi → Se ≈ 29–35 kpsi (con factores de Marin)
        </ConceptBlock>
      </section>

      <section id="cojinetes">
        <SectionTitle id="cojinetes">18-9 a 18-10 Selección de Cojinetes y Cuñas</SectionTitle>
        <OjoAqui>
          Las reacciones en los cojinetes del eje intermedio no son simétricas — el engrane grande (N₃) está más cerca de un cojinete que del otro. Calcula las reacciones con sumatoria de momentos, no asumas 50/50. Un error de 20% en la reacción puede hacer que escojas un cojinete que falle a las 5000 horas en lugar de las 12000 requeridas.
        </OjoAqui>
        <FormulaBox>
          <div className="font-bold mb-2">Capacidad de carga dinámica del cojinete:</div>
          <div>C₁₀ = Fd · (Ld / 10⁶)^(1/3) &nbsp;&nbsp;&nbsp; [kN, cojinetes de bolas]</div>
          <div className="mt-2">Ld = 60 · n · L_h &nbsp;&nbsp;&nbsp; [rev de vida, con L_h = 12 000 h]</div>
          <div className="mt-2">Carga equivalente: P = X·Fr + Y·Fa</div>
        </FormulaBox>
        <ConceptBlock title="Procedimiento de selección de cojinetes">
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Calcular reacciones en cada cojinete (dos planos: horizontal y vertical)</li>
            <li>Determinar carga radial Fr y carga axial Fa en cada cojinete</li>
            <li>Calcular carga equivalente P = X·Fr + Y·Fa</li>
            <li>Calcular vida requerida Ld = 60·n·L_h (12 000 h)</li>
            <li>Calcular C₁₀ requerido = P·(Ld/10⁶)^(1/3)</li>
            <li>Seleccionar cojinete de catálogo con C₁₀ ≥ C₁₀ requerido</li>
            <li>Verificar que el diámetro interior del cojinete ≥ diámetro del eje</li>
          </ol>
        </ConceptBlock>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">Diámetro eje (pulg)</th>
                <th className="border p-2 text-right">Ancho w (pulg)</th>
                <th className="border p-2 text-right">Alto h (pulg)</th>
              </tr>
            </thead>
            <tbody>
              {[['1 – 1¼', '3/16', '3/16'], ['1¼ – 1⅜', '1/4', '1/4'], ['1⅜ – 1¾', '5/16', '5/16'],
                ['1¾ – 2¼', '3/8', '3/8'], ['2¼ – 2¾', '1/2', '1/2']].map(([d, w, h]) => (
                <tr key={d} className="border-b">
                  <td className="border p-2">{d}</td>
                  <td className="border p-2 text-right font-mono">{w}</td>
                  <td className="border p-2 text-right font-mono">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FormulaBox>
          <div className="font-bold mb-2">Selección de cuñas — dimensiones estándar:</div>
          <div>Esfuerzo de cortante: τ = 2T / (w·L·d) ≤ S_sy/n</div>
          <div className="mt-1">Esfuerzo de aplastamiento: σ = 4T / (w·L·d) ≤ S_sy/(n·√3)</div>
          <div className="mt-1">Verificar: longitud L ≥ max(L_corte, L_aplastamiento)</div>
        </FormulaBox>
      </section>

      <section id="calculo">
        <SectionTitle id="calculo">Calculadora — Tren de Engranes de 2 Etapas</SectionTitle>
        <GearReducerCalc />
      </section>

      <section id="guia">
        <SectionTitle id="guia">Guía Paso a Paso — Caso de Estudio Integrado</SectionTitle>
        <PreguntaBox>
          ¿Cómo se conectan todas las piezas del rompecabezas? Esta guía integra los 8 pasos del diseño en un flujo continuo. No puedes diseñar el eje sin saber las fuerzas, y no puedes saber las fuerzas sin los engranes. ¡Diseño iterativo en acción!
        </PreguntaBox>
        <ol className="list-decimal ml-6 space-y-3 mb-4 text-sm">
          <li><strong>Potencia y par:</strong> H = 20 hp, n₁ = 1750 rpm, n₅ = 82–88 rpm. T₂ = 63025×20/1750 = 720 lbf·in. Usar el calculador de arriba.</li>
          <li><strong>Relación de engranes:</strong> e = (16/72)² = 1/20.25 → n₅ = 86.4 rpm. N₂=N₄=16, N₃=N₅=72, Pd=5.</li>
          <li><strong>Fuerzas tangenciales:</strong> Wt₂ = 2T₂/d₂ = 2×720/3.2 = 450 lbf. Wt₄ = 2T₃/d₄ = 2×3240/3.2 = 2025 lbf. (Ver sección 18-5)</li>
          <li><strong>Diagramas V y M:</strong> Descomponer en planos xy y xz. Combinar: M = √(M²xy + M²xz). Ubicar punto crítico.</li>
          <li><strong>Material:</strong> AISI 1050 CD: Sut=100 kpsi, Sy=90 kpsi. Se'≈50 kpsi → Se≈29-35 kpsi (Marin).</li>
          <li><strong>Diámetro del eje (DE-Goodman):</strong> d = ∛(16n/π · √[(8MaKf/Se)² + 3(TmKfs/Sut)²]) → d ≈ 1.35 in.</li>
          <li><strong>Selección de cojinetes:</strong> C₁₀ = P·(60×n×12000/10⁶)^(1/3). Elegir catálogo ≥ C₁₀ con d_int ≥ 1⅜ in.</li>
          <li><strong>Cuñas:</strong> Para d=1⅜ in → w=5/16 in, h=5/16. L ≥ max(2T/(w·d·Ssy/n), 4T/(w·d·Ssy/(n√3))).</li>
          <li><strong>Verificación final:</strong> Deflexión ≤ 0.005 in (engrane), pendiente ≤ 0.0005 rad (cojinete), velocidad crítica &gt; 1.2×n_max.</li>
        </ol>
        <OjoAqui>
          El error más frecuente en el caso de estudio es olvida que las fuerzas del piñón N₂ y del engrane N₃ sobre el eje intermedio actúan en direcciones opuestas. El diagrama V-M debe reflejar esto — si unes los puntos incorrectamente, subestimas el momento máximo por un factor de 2.
        </OjoAqui>
      </section>

      <section id="analisis">
        <SectionTitle id="analisis">18-11 Análisis Final</SectionTitle>
        <PreguntaBox>
          ¿El diseño está completo? Solo cuando cada componente cumple: engranes SF ≥ 1.2 (flexión), SH ≥ 1.1 (picadura); eje n ≥ 1.5 (fatiga), ny ≥ 2 (fluencia); cojinetes L₁₀ ≥ 12000 h; cuñas resistentes al corte y aplastamiento. Y todo eso dentro de una carcasa de 22" × 14" × 14". ¡Eso es ingeniería de diseño!
        </PreguntaBox>
        <ConceptBlock title="Lista de verificación del diseño final">
          <ul className="list-disc list-inside space-y-1">
            <li>✓ Factores de seguridad de engranes (SF ≥ 1.2, SH ≥ 1.1) según AGMA</li>
            <li>✓ Factores de seguridad del eje (n ≥ 1.5 por fatiga, ny ≥ 2 por fluencia)</li>
            <li>✓ Deflexión del eje en engranes ≤ 0.005 pulg</li>
            <li>✓ Pendiente del eje en cojinetes ≤ 0.0005 rad</li>
            <li>✓ Vida de cojinetes ≥ 12 000 h con confiabilidad ≥ 90%</li>
            <li>✓ Resistencia de cuñas al corte y aplastamiento</li>
            <li>✓ Especificación de tolerancias y ajustes (ISO/ANSI)</li>
          </ul>
        </ConceptBlock>
      </section>
    </ChapterShell>
  )
}
