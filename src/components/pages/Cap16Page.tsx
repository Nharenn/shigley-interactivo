'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo } from '@/components/content/ChapterHelpers'
import { DiskClutchSVG, BandBrakeSVG, FlywheelSVG } from '@/components/content/Chap16Figures'

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

function DiskClutchCalc() {
  const [D, setD] = useState(8)
  const [d, setD_inner] = useState(5)
  const [f, setF] = useState(0.35)
  const [pa, setPa] = useState(100)
  const [N_surf, setN_surf] = useState(1)
  const [mode_press, setMode_press] = useState<'uniform_wear' | 'uniform_pressure'>('uniform_wear')

  const F_uw = Math.PI * pa * (d / 2) * (D - d)
  const T_uw = Math.PI * f * pa * (d / 2) * (D ** 2 - d ** 2) / 4
  const Rm_uw = (D + d) / 4
  const F_up = (Math.PI * pa / 4) * (D ** 2 - d ** 2)
  const T_up = (Math.PI * f * pa / 12) * (D ** 3 - d ** 3)

  const F_use = mode_press === 'uniform_wear' ? F_uw : F_up
  const T_use = (mode_press === 'uniform_wear' ? T_uw : T_up) * N_surf

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Embrague/Freno de Disco</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs mb-1">D — Diámetro exterior (pulg)</label>
          <input type="number" step="0.5" value={D} onChange={e => setD(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">d — Diámetro interior (pulg)</label>
          <input type="number" step="0.5" value={d} onChange={e => setD_inner(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">f — Coeficiente de fricción</label>
          <input type="range" min="0.05" max="0.6" step="0.01" value={f} onChange={e => setF(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{f.toFixed(2)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">pa — Presión máxima (psi)</label>
          <input type="number" step="10" value={pa} onChange={e => setPa(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">N — Pares de superficies</label>
          <input type="number" min="1" max="10" value={N_surf} onChange={e => setN_surf(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">Supuesto de presión</label>
          <select value={mode_press} onChange={e => setMode_press(e.target.value as 'uniform_wear' | 'uniform_pressure')} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }}>
            <option value="uniform_wear">Desgaste uniforme</option>
            <option value="uniform_pressure">Presión uniforme</option>
          </select>
        </div>
      </div>
      <div className="text-xs opacity-60 mb-3">Relación d/D = {(d / D).toFixed(3)} (recomendado: 0.6–1.0)</div>
      <div className="p-4 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-3" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">F — Fuerza axial</div>
          <div className="text-lg font-bold">{F_use.toFixed(1)} lbf</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">T — Par de torsión total</div>
          <div className="text-lg font-bold">{T_use.toFixed(1)} lbf·pulg</div>
          <div className="text-xs">{(T_use / 12).toFixed(2)} lbf·pie</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">Radio medio efectivo Rm</div>
          <div className="text-lg font-bold">{Rm_uw.toFixed(3)} pulg</div>
        </div>
      </div>
    </div>
  )
}

function FlywheelCalc() {
  const [omega, setOmega] = useState(250)
  const [Cs, setCs] = useState(0.05)
  const [E, setE] = useState(3531)
  const [OD, setOD] = useState(24)
  const [thick, setThick] = useState(2)

  const I_req = E / (Cs * omega ** 2)
  const W_rim = Math.PI * (OD / 2) ** 2 * thick * 0.282
  const I_rim = W_rim * (OD / 2) ** 2 / 386
  const omega2 = omega * (1 + Cs / 2)
  const omega1 = omega * (1 - Cs / 2)

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora — Volante de inercia</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs mb-1">ω — Velocidad nominal (rad/s)</label>
          <input type="number" step="10" value={omega} onChange={e => setOmega(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">Cs — Coeficiente variación velocidad</label>
          <input type="range" min="0.01" max="0.2" step="0.005" value={Cs} onChange={e => setCs(Number(e.target.value))} className="w-full" />
          <div className="text-sm font-mono text-center">{Cs.toFixed(3)}</div>
        </div>
        <div>
          <label className="block text-xs mb-1">ΔE — Fluctuación de energía (lbf·pulg)</label>
          <input type="number" step="100" value={E} onChange={e => setE(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">OD — Diámetro exterior disco (pulg)</label>
          <input type="number" step="1" value={OD} onChange={e => setOD(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1">Espesor del disco (pulg)</label>
          <input type="number" step="0.5" value={thick} onChange={e => setThick(Number(e.target.value))} className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
      <div className="p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">I requerida</div>
          <div className="text-lg font-bold">{I_req.toFixed(4)} lbf·s²·pulg</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">I disco sólido (γ=0.282)</div>
          <div className="text-lg font-bold">{I_rim.toFixed(4)} lbf·s²·pulg</div>
        </div>
        <div className="p-3 rounded" style={{ background: I_rim >= I_req ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">¿Suficiente?</div>
          <div className="font-bold" style={{ color: I_rim >= I_req ? '#16a34a' : '#dc2626' }}>{I_rim >= I_req ? 'Sí ✓' : 'No — aumentar OD/espesor'}</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">ω₁ / ω₂ (rad/s)</div>
          <div className="font-bold">{omega1.toFixed(1)} / {omega2.toFixed(1)}</div>
        </div>
      </div>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <DiskClutchCalc />
      <FlywheelCalc />
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado — Embrague de disco</h3>
        <p className="mb-3 text-sm">Un embrague de disco simple con D=8", d=5", f=0.35, pa=100 psi. Calcular F y T (desgaste uniforme).</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>F = π·pa·(d/2)·(D-d) = π·100·2.5·3 = 2356 lbf</li>
          <li>T = F·f·(D+d)/4 = 2356·0.35·3.25 = 2679 lbf·pulg</li>
          <li>Para 3 pares de superficies: T_total = 3 × 2679 = 8037 lbf·pulg = 670 lbf·pie</li>
        </ol>
      </div>
      <div className="p-6 rounded-xl border-2" style={{ borderColor: accent }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Ejercicio Guiado — Volante de inercia</h3>
        <p className="mb-3 text-sm">Motor 1 cilindro, ΔE=3531 lbf·pulg, ω=250 rad/s, Cs=0.1. ¿Qué inercia se requiere?</p>
        <ol className="list-decimal ml-6 space-y-2 text-sm">
          <li>I = ΔE/(Cs·ω²) = 3531/(0.1·62500) = 0.565 lbf·s²·pulg</li>
          <li>ω₂ = 250·(1.05) = 262.5 rad/s | ω₁ = 250·(0.95) = 237.5 rad/s</li>
          <li>Disco sólido OD=24", h=2": W = π·144·2·0.282 = 255 lbm; I = 255·144/772 = 47.5 lbf·s²·pulg ≫ requerido</li>
        </ol>
      </div>
    </div>
  )
}

const sections = [
  { id: '16-1', label: '16-1 Análisis estático frenos' },
  { id: '16-2', label: '16-2 Frenos tambor expansión' },
  { id: '16-3', label: '16-3 Frenos tambor externos' },
  { id: '16-4', label: '16-4 Frenos de banda' },
  { id: '16-5', label: '16-5 Embragues axiales disco' },
  { id: '16-6', label: '16-6 Frenos de disco' },
  { id: '16-7', label: '16-7 Embragues cónicos' },
  { id: '16-8', label: '16-8 Consideraciones energía' },
  { id: '16-9', label: '16-9 Zapata larga (presión senoidal)' },
  { id: '16-10', label: '16-10 Materiales fricción' },
  { id: '16-11', label: '16-11 Volantes de inercia' },
  { id: '16-12', label: '16-12 Coples y acoples' },
]

export default function Cap16Page() {
  return (
    <ChapterShell
      chapterId={16}
      chapterNum="16"
      title="Embragues, frenos, coples y volantes"
      subtitle="Análisis estático de frenos, embragues por fricción y diseño de volantes de inercia para control de fluctuación de velocidad."
      partNum={3}
      sections={sections}
      practica={<PracticaContent />}
    >
      <SectionTitle id="16-1">16-1 Fundamentos del análisis estático de frenos</SectionTitle>
      <PreguntaBox>
        ¿Alguna vez pusiste el dedo en la rueda de un juguete para frenarlo? Eso es un freno de disco en su forma más simple. Ahora imagina hacerlo con pares de 1000 N·m. ¿Cómo se escala esa idea? Con <strong>fricción</strong> — y dos hipótesis según el desgaste.
      </PreguntaBox>
      <p className="mb-4">El análisis de cualquier embrague o freno sigue el mismo procedimiento general:</p>
      <ol className="list-decimal ml-6 space-y-1 text-sm mb-4">
        <li>Calcular (o modelar) la distribución de presión en las superficies de fricción</li>
        <li>Determinar la relación entre presión máxima y presión en cualquier punto</li>
        <li>Aplicar condiciones de equilibrio estático → fuerza de frenado, par y reacciones</li>
      </ol>
      <ConceptBlock title="Ejemplo conceptual: tope de puerta">
        Imagina un tope de puerta: una almohadilla rectángular de fricción, montada sobre un pasador en A, frena la puerta que se desliza por el piso. El análisis es idéntico al de una zapata de freno: la presión varía con la posición, la fuerza de fricción crea un momento, y si ese momento <strong>ayuda</strong> al freno → autoenergizante. Si la fuerza de accionamiento se vuelve cero o negativa → <strong>autobloqueo</strong>.
      </ConceptBlock>
      <ConceptBlock title="Autoenergizado vs. autobloqueo">
        Una zapata de freno es <b>autoenergizante</b> si el sentido del momento de fricción ayuda a aplicar el freno. Es <b>autobloqueo</b> cuando la fuerza de accionamiento → 0 o negativa.
        <br /><br />Condición autobloqueo: f ≥ (c + ū)/a
        <br /><br /><strong>Cuatro supuestos clave:</strong> (1) la presión es proporcional a la distancia al pivote, (2) se ignoran fuerzas centrífugas, (3) la zapata se asume rígida, (4) el coeficiente de fricción es constante.
      </ConceptBlock>
      <OjoAqui>
        <strong>Autoenergizado vs. autobloqueo:</strong> No son lo mismo. Un freno autoenergizante <em>ayuda</em> a aplicar la fuerza de frenado (menos esfuerzo del operador). Un freno autobloqueante se traba solo — peligroso si no lo deseas. En bandas, la condición de autobloqueo es f ≥ c/a. Siempre verifica cuál tienes.
      </OjoAqui>

      <SectionTitle id="16-2">16-2 Frenos de tambor con zapatas de expansión interna</SectionTitle>
      <ConceptBlock title="Zapata corta vs. zapata larga">
        Una zapata se considera <strong>corta</strong> cuando su ángulo de arco es menor a ~45°. En ese caso, la presión se puede asumir uniforme (p ≈ constante).<br /><br />
        Cuando el ángulo supera ~45°, la zapata es <strong>larga</strong> y la presión <strong>no es uniforme</strong>. La distribución sigue una ley senoidal: p(θ) = pa·sen(θ)/sen(θa), donde θa es el ángulo donde ocurre la presión máxima. Esto cambia radicalmente los momentos y la fuerza de accionamiento.
      </ConceptBlock>
      <FormulaBox>
        Momento fuerzas normales: MN = pa·b·r·a/sin(θa) · (θ/2 - sin(2θ)/4)|θ₂θ₁
        <br />Momento fuerzas fricción: Mf = f·pa·b·r·a/sin(θa) · [-r·cos(θ) - a·sin²(θ)/2]|θ₂θ₁
        <br />Fuerza accionamiento: F = (MN - Mf) / c
        <br />Par de torsión: T = f·pa·b·r² · (cos θ₁ - cos θ₂) / sin(θa)
      </FormulaBox>

      <SectionTitle id="16-3">16-3 Frenos de tambor con zapatas externas (contráctiles)</SectionTitle>
      <ConceptBlock title="Zapata externa vs. interna">
        Las zapatas externas se <em>contraen</em> alrededor del tambor (como el abrazo de un brazalete). La distribución de presión es la misma que las zapatas internas, pero con el <strong>signo del momento cambiado</strong>.<br /><br />
        <strong>Zapata larga:</strong> Cuando el ángulo de la zapata excede ~45°, la presión <em>no</em> es uniforme. La deformación de lazapata sigue una distribución senoidal:<br />
        p(θ) = p_máx · sen(θ) / sen(θ_máx)<br /><br />
        Esto afecta tanto las zapatas internas como externas.
      </ConceptBlock>
      <FormulaBox>
        Zapata larga — distribución senoidal de presión:
        <br />p(θ) = (pa · a · sen(θ)) / (r · sen(θa))
        <br /><br />Moment de fuerzas normales (sentido horario positivo):
        <br />MN = (pa · b · r) / sen(θa) · [a/2 · (θa - sen(θa) · cos(θa))]   
        <br /><br />Momento de fuerzas de fricción:
        <br />Mf = (f · pa · b · r) / sen(θa) · [r · sen(θa) - a/2 · (1 - cos(θa))]  (zapata interna)
        <br /><br />Par de torsión: T = f · pa · b · r · a · (cos θ₁ + cos θ₂) / (2 · sen(θa))
        <br /><br />Autoenergizante: si Mf ayuda a F → F = (MN ∓ Mf) / c  (− autoenergizante, + desenergizante)
      </FormulaBox>

      <SectionTitle id="16-4">16-4 Frenos de banda</SectionTitle>
      <PreguntaBox>
        ¿Cómo frenan las grúas? Con una banda flexible que abraza un tambor. La relación P₁/P₂ crece <strong>exponencialmente</strong> con el ángulo de contacto — un pequeño cambio en φ multiplica la capacidad de frenado. ¡La misma física que usas para amarrar un bote a un poste!
      </PreguntaBox>
      <BandBrakeSVG />
      <FormulaBox>
        Relación de fuerzas (Capstan/Euler):
        <br />P₁/P₂ = e^(f·φ)    ← φ en radianes
        <br />Par de torsión: T = (P₁ - P₂)·D/2
        <br />Presión máxima: pa = 2·P₁/(b·D)
      </FormulaBox>

      <PreguntaBox>
        ¿Sabías que un embrague de disco nuevo no se comporta igual que uno desgastado? Cuando es nuevo, la presión es uniforme. Cuando se asienta, el desgaste es uniforme — y el par que transmite cambia. Hipótesis distintas, resultados distintos.
      </PreguntaBox>
      <DiskClutchSVG />

      <SectionTitle id="16-5">16-5 Embragues axiales de disco</SectionTitle>
      <FormulaBox>
        DESGASTE UNIFORME (condición permanente):
        <br />F = π·pa·d/2·(D - d)
        <br />T = π·f·pa·d/8·(D² - d²)  por par de superficies
        <br />T = F·f·(D + d)/4
        <br /><br />PRESIÓN UNIFORME (embrague nuevo):
        <br />F = π·pa/4·(D² - d²)
        <br />T = π·f·pa/12·(D³ - d³)  por par de superficies
        <br /><br />Embrague de discos múltiples: T_total = T × N_pares_superficies
      </FormulaBox>
      <ConceptBlock title="Rango recomendado d/D">
        Se recomienda 0.6 ≤ d/D ≤ 1.0. En d/D=0.6 el error entre desgaste uniforme y presión uniforme es solo ~2%.
      </ConceptBlock>

      <OjoAqui>
        El par en un embrague de disco <strong>no es igual</strong> bajo las hipótesis de presión uniforme vs. desgaste uniforme. Para d/D = 0.6, la diferencia es solo ~2%, pero para d/D = 0.2, puede ser del 20%. ¿Cuál usar? Regla práctica: usa <em>desgaste uniforme</em> (p·r = cte) para embragues usados; <em>presión uniforme</em> solo para diseño inicial.
      </OjoAqui>

      <SectionTitle id="16-6">16-6 Frenos de disco (yugo)</SectionTitle>
      <FormulaBox>
        Freno de zapata anular (condición desgaste uniforme): pr = pa·ri
        <br />F = (θ₂-θ₁)·pa·ri·(ro-ri)
        <br />T = f·F·re  donde re = (ro+ri)/2
      </FormulaBox>

      <SectionTitle id="16-7">16-7 Embragues y frenos cónicos</SectionTitle>
      <ConceptBlock title="Embrague cónico — geometría">
        Un embrague cónico usa la cuña formada entre el cono macho y el cono hembra. La fuerza axial se amplifica por el ángulo del cono: la reacción normal es <strong>F/sen(α)</strong>, donde α es el ángulo de semicono.<br /><br />
        Ángulo típico: α = 10°–15°. Si α &lt; arctan(f), el embrague se autopenetra y no se puede desconectar → <strong>autobloqueo</strong>.
      </ConceptBlock>
      <FormulaBox>
        Embrague cónico (desgaste uniforme): pa·r = cte → pa actúa en el diámetro interior
        <br />Fuerza axial: F = π·pa·d·(D-d)/(4·sin α)
        <br />Par: T = F·f·(D+d)/(4·sin α)  =  π·f·pa·d·(D²-d²)/(8·sin α)
        <br />Rango típico α: 10° a 15°
      </FormulaBox>
      <OjoAqui>
        En un embrague cónico, si el ángulo de semicono α es menor que arctan(f), el cono se <strong>autopenetra</strong> y es imposible desacoplarlo. Para f = 0.30, α debe ser &gt; arctan(0.30) = 16.7°. Pero los valores típicos son 10°–15°, que son menores. La solución: el mecanismo de desacoplamiento debe <em>forzar</em> la separación (resorte de retorno).
      </OjoAqui>

      <SectionTitle id="16-8">16-8 Consideraciones sobre energía</SectionTitle>
      <FormulaBox>
        Energía disipada: E = I₁·I₂·(ω₁-ω₂)² / [2·(I₁+I₂)]
        <br />Para frenar totalmente (I₂=0): E = I₁·ω₁²/2
        <br />Tiempo de parada: t = I·(ω₁-ω₂) / T_freno
      </FormulaBox>

<SectionTitle id="16-9">16-9 Aumento de temperatura y zapata larga</SectionTitle>
      <FormulaBox>
        Distribución senoidal de presión (zapata larga, θ &gt; 45°):
        <br />p(θ) = pa · sen(θ) / sen(θa)
        <br /><br />Aumento de temperatura por frenada:
        <br />ΔT = H / (Cp · W)     [°F]  (H en Btu, Cp=0.12 acero, W en lbm)
        <br />ΔT = E / (Cp · m)  [°C]  (E en J, Cp=500 J/kg·°C, m en kg)
        <br /><br />Potencia disipada: H = T·ω/33000  [hp]  o  H = T·n/63000  [hp]
        <br /><br />Coeficiente de transferencia de calor:
        <br />hCR = nW/6494 + 0.13  [hp/(in²·°F)]  (con ventilador de eje)
        <br />hCR = nW/3939 + 0.13  [hp/(in²·°F)]  (sin ventilador)
        <br />Temperatura: ts = ta + H_pérdida/(hCR·A)
        <br />Área mínima recomendada: Amin = 43.20·C^1.7  [in²]
      </FormulaBox>
      <ConceptBlock title="Diseño térmico de frenos y embragues">
        Los embragues de disco de múltiple superficie y los frenos de banda generan cantidades significativas de calor. Si la temperatura del aceite supera ~250°F, la viscosidad baja y el coeficiente de fricción cambia. En el peor caso, la fricción desaparece — el embrague patina. Por eso el <strong>diseño térmico</strong> es tan importante como el diseño mecánico.
      </ConceptBlock>
      <MiniEjemplo>
        <strong>Zapata larga:</strong> Freno de tambor con zapata de 120° de arco, pa = 100 psi, b = 2", r = 5", f = 0.3.<br />
        La distribución senoidal p(θ) = pa·sen(θ)/sen(θa) concentra la fuerza cerca del centro del arco — nunca asuma presión uniforme para zapatas &gt; 45°.
      </MiniEjemplo>

      <SectionTitle id="16-10">16-10 Materiales de fricción</SectionTitle>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr style={{ background: 'var(--bg-3)' }}>
            <th className="p-2 text-left">Material</th>
            <th className="p-2">f seco</th>
            <th className="p-2">T max (°F)</th>
            <th className="p-2">p max (psi)</th>
            <th className="p-2">Aplicación</th>
          </tr></thead>
          <tbody>
            {[
              ['Metal sinterizado/hierro', '0.1-0.4', '1000', '150', 'Embragues trabajo pesado'],
              ['Asbesto moldeado rígido', '0.37-0.41', '500', '100', 'Frenos de tambor'],
              ['Asbesto moldeado flexible', '0.39-0.45', '750', '300', 'Embragues y frenos'],
              ['Algodón tejido', '0.47', '230', '100', 'Frenos industriales'],
              ['Cuero/acero', '0.3-0.5 seco', '200', '10-40', 'Embragues ligeros'],
              ['Papel resiliente (húmedo)', '0.09-0.15', '300', 'PV lim', 'Embragues en aceite'],
            ].map(([mat, f, T, p, app], i) => (
              <tr key={i} className={i % 2 === 0 ? 'opacity-90' : 'opacity-70'}>
                <td className="p-2 border-b" style={{ borderColor: 'var(--border)' }}>{mat}</td>
                <td className="p-2 border-b text-center font-mono" style={{ borderColor: 'var(--border)' }}>{f}</td>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{T}</td>
                <td className="p-2 border-b text-center" style={{ borderColor: 'var(--border)' }}>{p}</td>
                <td className="p-2 border-b text-sm" style={{ borderColor: 'var(--border)' }}>{app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle id="16-11">16-11 Volantes de inercia</SectionTitle>
      <PreguntaBox>
        ¿Cómo suaviza un volante las pulsaciones de un motor de 1 cilindro? Un motor de combustión interna entrega potencia a golpes — solo durante la explosión. El volante <strong>almacena energía cinética</strong> cuando sobra y la devuelve cuando falta. La clave: I = ΔE/(Cs·ω²).
      </PreguntaBox>
      <FlywheelSVG />
      <MiniEjemplo>
        Motor 1 cilindro, ΔE = 3531 lbf·pulg, ω = 250 rad/s, Cs deseado = 0.1.<br />
        I = 3531/(0.1 × 62500) = 0.565 lbf·s²·pulg.<br />
        Disco sólido acero OD 24", h = 2" → I ≈ 47.5 ≫ 0.565. ¡Más que suficiente!<br />
        El volante real suele ser más pequeño — pero mejor que sobre a que falte.
      </MiniEjemplo>
      <FormulaBox>
        Coeficiente de variación: Cs = (ω₂-ω₁)/ω
        <br />Relación fundamental: ΔE = Cs · I · ω²
        <br />I = ΔE / (Cs · ω²)
        <br /><br />Valores típicos de Cs: Prensas 0.02-0.05 | Motores 1 cil. 0.05-0.10 | Generadores 0.003
        <br />Disco sólido: I = m·R²/2  [kg·m²]  o  I = W·R²/(2g) [lbf·s²·pulg]
      </FormulaBox>
      <DiskClutchCalc />
      <FlywheelCalc />

      <SectionTitle id="16-12">16-12 Coples y acoples</SectionTitle>
      <PreguntaBox>
        Si dos ejes están perfectamente alineados, puedes usar un <strong>cople rígido</strong>. Pero en la vida real, los ejes se desalinean. ¿Cuánto? Axial, angular, paralelo — o los tres a la vez. Los coples <em>flexibles</em> absorben esa desalineación y protegen los cojinetes de cargas adicionales.
      </PreguntaBox>
      <ConceptBlock title="Tipos de coples">
        <strong>Coples rígidos:</strong> Brida o manguito. No toleran desalineación. Transmiten par puro. Requieren alineación perfecta.<br /><br />
        <strong>Coples flexibles — tipo parrilla:</strong> Una parrilla de resorte conecta las dos mitades. Absorbe desalineación angular hasta 0.5° y paralela hasta 0.05".<br /><br />
        <strong>Coples flexibles — tipo disco elástico:</strong> Disco de acero o poliuretano flexible que transmite par mediante deformación. Sin holgura, mantenimiento bajo.<br /><br />
        <strong>Coples flexibles — tipo cadena:</strong> Cadenas de rodillos sobre sprockets montados en cada eje. Toleran desalineación considerable.<br /><br />
        <strong>Coples de liberación (deslizables):</strong> Se desconectan cuando el par excede un umbral. Protegen la máquina de sobrecarga.
      </ConceptBlock>
      <FormulaBox>
        Desalineación angular: Δα (grados o radianes)
        <br />Desalineación paralela: Δy (pulg o mm)
        <br />Par máximo: T_max = Ks · T_nominal / Kf
        <br /><br />Potencia: H = T·n/63000  [hp, lbf·pulg, rpm]
        <br />Selección: T_nominal ≥ H·63000·Ks/n  (Ks = factor de servicio)
      </FormulaBox>
      <OjoAqui>
        El error más común al seleccionar un cople es usar solo el par nominal. Los catálogos incluyen un <strong>factor de servicio Ks</strong> que depende del tipo de carga (uniforme, choque ligero, choque pesado) y del tipo de máquina motriz y accionada. Sin multiplicar por Ks (1.0–3.0), el cople fallará prematuramente.
      </OjoAqui>
    </ChapterShell>
  )
}
