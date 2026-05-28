'use client'
import { useState } from 'react'
import ChapterShell from '@/components/layout/ChapterShell'
import { PreguntaBox, OjoAqui, MiniEjemplo, FormulaGlosa } from '@/components/content/ChapterHelpers'
import { DiscretizationSVG, AssemblySVG, ConvergenceSVG, BeamElementSVG } from '@/components/content/Chap19Figures'

const accent = 'var(--part-4)'

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

function SimpleBeamFEA() {
  const [L, setL] = useState(120)
  const [P, setP] = useState(5000)
  const [E, setE] = useState(30)
  const [b, setB] = useState(2)
  const [h, setH] = useState(4)
  const [nElem, setNElem] = useState(2)

  const I = b * Math.pow(h, 3) / 12
  const E_real = E * 1e6
  const k_elem = (E_real * I) / Math.pow(L / nElem, 3) * 12

  const exact_dmax = P * Math.pow(L, 3) / (48 * E_real * I)
  const exact_smax = P * L / 4 * (h / 2) / I

  const nNodes = nElem + 1
  const nDOF = nNodes * 2
  const K = Array.from({ length: nDOF }, () => new Array(nDOF).fill(0))
  const F = new Array(nDOF).fill(0)
  const elemLen = L / nElem

  for (let e = 0; e < nElem; e++) {
    const n1 = e * 2, n2 = n1 + 1, n3 = n1 + 2, n4 = n1 + 3
    const ke = [
      [12, 6*elemLen, -12, 6*elemLen],
      [6*elemLen, 4*elemLen*elemLen, -6*elemLen, 2*elemLen*elemLen],
      [-12, -6*elemLen, 12, -6*elemLen],
      [6*elemLen, 2*elemLen*elemLen, -6*elemLen, 4*elemLen*elemLen],
    ]
    const k_scale = E_real * I / Math.pow(elemLen, 3)
    const dofs = [n1, n2, n3, n4]
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        K[dofs[i]][dofs[j]] += ke[i][j] * k_scale
      }
    }
  }

  F[2 * Math.floor(nElem / 2)] = -P

  for (let i = 0; i < nDOF; i++) {
    K[0][i] = 0
    K[i][0] = 0
  }
  K[0][0] = 1
  F[0] = 0

  if (nNodes > 1) {
    for (let i = 0; i < nDOF; i++) {
      K[1][i] = 0
      K[i][1] = 0
    }
    K[1][1] = 1
    F[1] = 0
  }

  for (let i = 0; i < nDOF; i++) {
    K[nDOF - 2][i] = 0
    K[i][nDOF - 2] = 0
  }
  K[nDOF - 2][nDOF - 2] = 1
  F[nDOF - 2] = 0

  const u = new Array(nDOF).fill(0)
  const nEq = nDOF
  const aug = K.map((row, i) => [...row, F[i]])
  for (let col = 0; col < nEq; col++) {
    let maxRow = col
    for (let row = col + 1; row < nEq; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]]
    for (let row = col + 1; row < nEq; row++) {
      const factor = aug[row][col] / aug[col][col]
      for (let j = col; j <= nEq; j++) aug[row][j] -= factor * aug[col][j]
    }
  }
  for (let i = nEq - 1; i >= 0; i--) {
    u[i] = aug[i][nEq] / aug[i][i]
    for (let j = i - 1; j >= 0; j--) aug[j][nEq] -= aug[j][i] * u[i]
  }

  const fea_dmax = Math.abs(u[2 * Math.floor(nElem / 2)])
  const Mmax = P * L / 4
  const fea_smax = Mmax * (h / 2) / I
  const error_d = Math.abs((fea_dmax - exact_dmax) / exact_dmax * 100)
  const error_s = Math.abs((fea_smax - exact_smax) / exact_smax * 100)

  const beamH = 140
  const svgW = 400

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>SimpleBeamFEA — Viga simplemente apoyada</h3>
      <p className="text-sm mb-4 opacity-70">
        Viga simplemente apoyada con carga puntual P al centro. Resuelve con {nElem} elemento(s) viga 1D (2 nodos, función cúbica). Compara con solución exacta de Euler-Bernoulli.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'L — Longitud (pulg)', val: L, set: setL, step: 10, min: 10 },
          { label: 'P — Carga (lbf)', val: P, set: setP, step: 500, min: 100 },
          { label: 'E — Módulo (Mpsi)', val: E, set: setE, step: 1, min: 1 },
          { label: 'b — Ancho (pulg)', val: b, set: setB, step: 0.5, min: 0.5 },
          { label: 'h — Altura (pulg)', val: h, set: setH, step: 0.5, min: 0.5 },
          { label: 'Elementos', val: nElem, set: setNElem, step: 1, min: 2, max: 6 },
        ].map(({ label, val, set, step, min, max }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" step={step} min={min} max={max} value={val} onChange={e => set(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={{ borderColor: 'var(--border)' }} />
          </div>
        ))}
      </div>
      {/* SVG beam diagram */}
      <svg viewBox={`0 0 ${svgW} ${beamH}`} width="100%" style={{ maxWidth: svgW, margin: '0 auto 16px' }}>
        <defs>
          <marker id="arrB" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
          </marker>
        </defs>
        {/* Viga */}
        <line x1="40" y1={beamH / 2} x2={svgW - 40} y2={beamH / 2} stroke="var(--accent)" strokeWidth="4" />
        {/* Apoyos */}
        <polygon points="35,75 45,75 40,85" fill="var(--text-2)" />
        <polygon points={svgW - 45 + ',75 ' + (svgW - 35) + ',75 ' + (svgW - 40) + ',85'} fill="var(--text-2)" />
        <circle cx={svgW - 40} cy={beamH / 2} r="6" fill="none" stroke="var(--text-2)" strokeWidth="1.5" />
        {/* Carga P */}
        <line x1={svgW / 2} y1={beamH / 2 - 5} x2={svgW / 2} y2={30} stroke="var(--danger)" strokeWidth="2" markerEnd="url(#arrB)" />
        <text x={svgW / 2 - 8} y={24} fill="var(--danger)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="bold">P</text>
        {/* Línea deformada (estimada) */}
        <path d={`M40,${beamH / 2} Q${svgW / 2},${beamH / 2 + 40 - nElem * 3} ${svgW - 40},${beamH / 2}`}
          fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5,3" opacity={0.6} />
        {/* Nodos */}
        {Array.from({ length: nNodes }, (_, i) => {
          const x = 40 + (svgW - 80) * i / (nNodes - 1)
          return <circle key={i} cx={x} cy={beamH / 2} r="4" fill="var(--accent)" />
        })}
        <text x={svgW / 2 - 15} y={beamH - 5} fill="var(--text-3)" fontSize="9">L = {L} pulg</text>
      </svg>
      {/* Resultados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'δ_max (FEA)', value: `${fea_dmax.toFixed(4)} pulg` },
          { label: 'δ_max (Exacta)', value: `${exact_dmax.toFixed(4)} pulg` },
          { label: 'Error δ', value: `${error_d.toFixed(2)}%`, color: error_d < 5 ? 'var(--success)' : 'var(--warning)' },
          { label: 'σ_max (FEA)', value: `${fea_smax.toFixed(1)} psi` },
          { label: 'σ_max (Exacta)', value: `${exact_smax.toFixed(1)} psi` },
          { label: 'Error σ', value: `${error_s.toFixed(2)}%`, color: error_s < 5 ? 'var(--success)' : 'var(--warning)' },
          { label: 'I = bh³/12', value: `${I.toFixed(2)} pulg⁴` },
          { label: 'M_max = PL/4', value: `${Mmax.toFixed(0)} lbf·pulg` },
        ].map(({ label, value, color }) => (
          <div key={label} className="p-3 rounded-lg" style={{ background: 'var(--bg-2)' }}>
            <div className="text-xs opacity-60">{label}</div>
            <div className="text-lg font-mono font-bold" style={{ color: color || accent }}>{value}</div>
          </div>
        ))}
      </div>
      <OjoAqui>
        El error en σ_max no disminuye tan rápido como el error en δ_max. Esto se debe a que el esfuerzo se calcula de las derivadas de la función de forma (menor precisión). Para reducir el error, aumenta el número de elementos (refinamiento h).
      </OjoAqui>
    </div>
  )
}

function PracticaContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: accent }}>Práctica — Cap. 19</h2>
      <SimpleBeamFEA />
      {[
        { n: '19-1', e: 'Un eje escalonado tiene sección AB: A=0.2 pulg², L=8 pulg y sección BC: A=0.3 pulg², L=15 pulg. E=30 Mpsi. Se aplica F=2000 lbf en B. Use FEM de 2 elementos para calcular: (a) desplazamiento de B, (b) fuerzas internas en AB y BC, (c) reacción en A.' },
        { n: '19-2', e: 'Una placa delgada cuadrada de 100×100 mm, espesor 5 mm, acero (E=200 GPa, ν=0.3) está empotrada en el borde izquierdo y tiene presión uniforme p=10 MPa en el borde derecho. (a) ¿Qué tipo de elemento recomendarías? (b) ¿Cuántos elementos mínimos? (c) ¿Dónde se esperan los esfuerzos máximos?' },
        { n: '19-3', e: 'Una columna circular maciza, d=25 mm, L=500 mm, acero E=200 GPa, empotrada en la base. Use análisis FEA de pandeo para estimar la carga crítica de Euler. Compare con Pcr = π²EI/(KL)² con K=2 (columna en voladizo).' },
        { n: '19-4', e: 'Se modela un cigüeñal con elementos de viga en 3D. (a) ¿Qué DOF deben restringirse en los cojinetes principales? (b) ¿Cómo se aplicaría la carga de presión de gas en las muñequillas? (c) ¿Qué criterio de convergencia usarías?' },
        { n: '19-5', e: 'Un cilindro de aluminio (E=70 GPa, ν=0.33) con OD=150 mm, ID=100 mm se ajustará a presión sobre un cilindro de acero (E=190 GPa, ν=0.30) con OD=100.20 mm. Use FEA axisimétrico para determinar: (a) presión de interfaz p, (b) esfuerzos tangenciales máximos. Compare con la solución analítica (Cap. 3).' },
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
  { id: 'concepto', label: '19-1 El concepto del FEA' },
  { id: 'formulacion', label: '19-2 Formulación de EF' },
  { id: 'viga1d', label: '19-3 Elemento viga 1D' },
  { id: 'convergencia', label: '19-4 Convergencia y error' },
  { id: 'aplicaciones', label: '19-5 Aplicaciones prácticas' },
  { id: 'malla', label: 'Generación de malla' },
  { id: 'cargas', label: 'Aplicación de cargas' },
  { id: 'condiciones', label: 'Condiciones de frontera' },
  { id: 'modelado', label: 'Técnicas de modelado' },
  { id: 'termico', label: 'Esfuerzos térmicos' },
  { id: 'pandeo', label: 'Pandeo y vibración' },
  { id: 'calculadora', label: 'SimpleBeamFEA' },
]

export default function Cap19Page() {
  return (
    <ChapterShell
      chapterId={19}
      chapterNum="19"
      title="Análisis de elementos finitos"
      subtitle="Discretización, formulación de elementos, convergencia y aplicaciones prácticas del método FEA en diseño mecánico."
      partNum={4}
      sections={sections}
      practica={<PracticaContent />}
    >
      <section id="concepto">
        <SectionTitle id="concepto">19-1 El concepto del FEA — Discretización</SectionTitle>
        <PreguntaBox>¿Cómo divide una computadora una pieza en pedacitos para analizarla?</PreguntaBox>
        <p className="mb-4">
          La idea central del <strong>método del elemento finito (FEA)</strong> es sencilla: <em>dividir un dominio continuo
          en elementos pequeños y discretos</em> conectados entre sí en puntos llamados <strong>nodos</strong>.
          A esto se le llama <strong>discretización</strong>. Cada elemento tiene una solución aproximada
          (generalmente polinómica) y al ensamblar todos los elementos obtenemos una aproximación
          al comportamiento del sistema completo.
        </p>
        <DiscretizationSVG />
        <p className="mb-4">
          La discretización puede hacerse en 1D (vigas y armaduras), 2D (triángulos y cuadriláteros
          para placas y cascarones) o 3D (tetraedros y hexaedros para sólidos completos).
          Todos los paquetes FEA comerciales (ANSYS, NASTRAN, ABAQUS, COMSOL) siguen este mismo principio.
        </p>
        <ConceptBlock title="Nodos y grados de libertad (DOF)">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Nodos:</strong> puntos que conectan elementos. Son las incógnitas fundamentales del problema.</li>
            <li><strong>DOF (grados de libertad):</strong> desplazamientos y rotaciones en cada nodo (hasta 6 por nodo en 3D).</li>
            <li>Las fuerzas y condiciones de frontera se aplican sobre los nodos.</li>
            <li>El campo dentro de cada elemento se interpola desde los valores nodales mediante <strong>funciones de forma</strong>.</li>
          </ul>
        </ConceptBlock>
        <OjoAqui>
          No todos los tipos de elemento funcionan bien en todos los casos. Los triángulos de 3 nodos son rígidos (demasiado stiff) y requieren mallas muy finas. Siempre que sea posible, usa elementos cuadriláteros o hexaédricos.
        </OjoAqui>
        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: 'var(--bg-3)' }}>
                <th className="border p-2 text-left">Categoría</th>
                <th className="border p-2 text-left">Tipo de elemento</th>
                <th className="border p-2 text-center">Nodos</th>
                <th className="border p-2 text-left">Aplicaciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Línea', 'Puntal (truss/bar)', '2', 'Fuerza axial, resortes en serie'],
                ['Línea', 'Viga (beam)', '2', 'Flexión, cargas transversales, momentos'],
                ['Línea', 'Armazón (frame)', '2', 'Axial + flexión combinados'],
                ['Superficie', 'Triangular 3 nodos', '3', 'Esfuerzo plano, deformación plana'],
                ['Superficie', 'Triangular 6 nodos', '6', 'Bordes curvos; distribución cuadrática'],
                ['Superficie', 'Cuadrilátero 4 nodos', '4', 'Esfuerzo plano general, mallas estructuradas'],
                ['Superficie', 'Cuadrilátero 8 nodos', '8', 'Bordes curvos; distribución de orden superior'],
                ['Sólido', 'Hexaedro 8 nodos (ladrillo)', '8', 'Sólido 3D, placa gruesa, componentes generales'],
                ['Sólido', 'Pentaedro 6 nodos (cuña)', '6', 'Transición de malla, geometrías irregulares'],
                ['Sólido', 'Tetraedro 4 nodos', '4', 'Sólido 3D; transiciones de malla automática'],
                ['Sólido', 'Tetraedro 10 nodos', '10', 'Sólido 3D de orden superior; resultados más suaves'],
                ['Especial', 'Brecha (gap)', '2', 'Contacto, apoyo unidireccional'],
                ['Especial', 'Rígido', '2+', 'Unión rígida entre nodos'],
                ['Especial', 'Masa', '1', 'Masa concentrada para análisis dinámico'],
              ].map(([cat, tipo, nodos, apps]) => (
                <tr key={tipo} className="border-b">
                  <td className="border p-2 font-medium">{cat}</td>
                  <td className="border p-2">{tipo}</td>
                  <td className="border p-2 text-center font-mono">{nodos}</td>
                  <td className="border p-2 text-xs">{apps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm opacity-70 mb-4"><strong>Tabla 19-1</strong> — Biblioteca de elementos finitos. Los elementos de orden superior (8+ nodos) dan mejores resultados con menos DOF.</p>
      </section>

      <section id="formulacion">
        <SectionTitle id="formulacion">19-2 Formulación de Elementos Finitos</SectionTitle>
        <PreguntaBox>¿Cuál es la ecuación que resuelve el computador?</PreguntaBox>
        <p className="mb-4">
          En FEA, toda la física se reduce a resolver un sistema de ecuaciones lineales:
        </p>
        <FormulaGlosa
          formula="[K]{u} = {F}"
          glosa={[
            { sym: '[K]', desc: 'Matriz de rigidez global — propiedades del material y geometría' },
            { sym: '{u}', desc: 'Vector de desplazamientos nodales (incógnitas del sistema)' },
            { sym: '{F}', desc: 'Vector de fuerzas nodales externas (cargas aplicadas)' },
          ]}
        />
        <p className="mb-4">
          Para un <strong>elemento puntal 1D</strong> (barra en tensión/compresión axial), la matriz de rigidez elemental es:
        </p>
        <FormulaGlosa
          formula="k_e = (AE/L) · [1  −1;  −1  1]"
          glosa={[
            { sym: 'A', desc: 'Área de la sección transversal' },
            { sym: 'E', desc: 'Módulo de elasticidad del material' },
            { sym: 'L', desc: 'Longitud del elemento' },
          ]}
        />
        <p className="mb-4">
          Las matrices elementales se <strong>ensamblan</strong> en la matriz global [K] mediante superposición. El ensamble suma las contribuciones de cada elemento en las posiciones correspondientes a los DOF compartidos.
        </p>
        <AssemblySVG />
        <p className="mb-4">
          Una vez ensamblado el sistema, se aplican las <strong>condiciones de frontera</strong> (desplazamientos conocidos) y se resuelve el sistema lineal. Las fuerzas de reacción se obtienen de los DOF restringidos.
        </p>
        <MiniEjemplo>
          <strong>Ejemplo 19-1 — Eje escalonado con resorte:</strong> Sea AB: A₁ = 0.100 pulg², L₁ = 10 pulg; BC: A₂ = 0.150 pulg², L₂ = 12 pulg. E = 10 Mpsi. F = 1000 lbf en B. Un espacio δ = 0.002 pulg entre C y la pared derecha.
          <br /><br />
          <strong>Paso 1 — Rigideces elementales:</strong> k₁ = A₁E/L₁ = 0.100(10×10⁶)/10 = 1×10⁵ lbf/pulg; k₂ = 0.150(10×10⁶)/12 = 1.25×10⁵ lbf/pulg.
          <br /><br />
          <strong>Paso 2 — Ensamble global:</strong> [K] = 10⁵ × [[1, −1, 0], [−1, 2.25, −1.25], [0, −1.25, 1.25]]. Con u₁ = 0 y u₃ = 0.002 pulg.
          <br /><br />
          <strong>Paso 3 — Solución:</strong> u₂ = (1000 + 1.25×10⁵ × 0.002) / (2.25×10⁵) = 5.556×10⁻³ pulg. Como u₂ &gt; δ, el supuesto de que C alcanza la pared se verifica.
          <br /><br />
          <strong>Paso 4 — Reacciones y esfuerzos:</strong> F₁ = −555.6 lbf (reacción en pared izquierda); F₃ = −444.4 lbf (reacción en pared derecha). Verificación: |F₁| + |F₃| = 1000 lbf ✓. Elemento AB: tensión, σ_AB = 555.6/0.100 = 5 556 psi. Elemento BC: compresión, σ_BC = 444.4/0.150 = 2 963 psi.
        </MiniEjemplo>
        <OjoAqui>
          Error típico: olvidar aplicar condiciones de frontera. Sin restricciones, la matriz [K] es singular (no invertible). El modelo debe tener al menos los DOF necesarios para eliminar el movimiento de cuerpo rígido.
        </OjoAqui>
      </section>

      <section id="viga1d">
        <SectionTitle id="viga1d">19-3 Elemento Viga 1D</SectionTitle>
        <PreguntaBox>¿Cómo se modela una viga que se flexiona?</PreguntaBox>
        <p className="mb-4">
          Para vigas en flexión, el elemento viga 1D (viga de Euler-Bernoulli) tiene <strong>4 grados de libertad</strong>: desplazamiento vertical v y rotación θ en cada nodo. La función de forma es <strong>cúbica</strong>, lo que permite representar la deformación por flexión exactamente para cargas puntuales.
        </p>
        <BeamElementSVG />
        <FormulaGlosa
          formula="k_e = (EI/L³) · [12  6L  −12  6L;  6L  4L²  −6L  2L²;  −12  −6L  12  −6L;  6L  2L²  −6L  4L²]"
          glosa={[
            { sym: 'E', desc: 'Módulo de elasticidad' },
            { sym: 'I', desc: 'Momento de inercia de la sección (bh³/12 para sección rectangular)' },
            { sym: 'L', desc: 'Longitud del elemento' },
            { sym: 'v₁, θ₁, v₂, θ₂', desc: 'DOF: desplazamiento vertical y rotación en nodos 1 y 2' },
          ]}
        />
        <p className="mb-4">
          La matriz de rigidez del elemento viga se obtiene integrando la ecuación de Euler-Bernoulli:
          EI·d⁴v/dx⁴ = q(x). La función de forma cúbica satisface exactamente la ecuación homogénea,
          por lo que un solo elemento entre apoyos y cargas puntuales da la solución exacta para
          <strong>desplazamientos</strong> en los nodos. Sin embargo, los esfuerzos (derivadas de la función de forma)
          son menos precisos y requieren más elementos.
        </p>
        <OjoAqui>
          Un elemento viga entre dos apoyos con carga puntual al centro da la deflexión exacta en los nodos, pero el esfuerzo en el centro puede tener error de hasta 30% con 1 elemento. Con 4 elementos el error baja a &lt;1%.
        </OjoAqui>
      </section>

      <section id="convergencia">
        <SectionTitle id="convergencia">19-4 Convergencia y Error</SectionTitle>
        <PreguntaBox>¿Más elementos = mejor resultado? ¿Siempre?</PreguntaBox>
        <p className="mb-4">
          Aumentar el número de elementos generalmente mejora la precisión, pero con rendimientos decrecientes. Existen dos estrategias principales de refinamiento:
        </p>
        <ConvergenceSVG />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <ConceptBlock title="Refinamiento h (más elementos)">
            Dividir cada elemento en más elementos pequeños. La convergencia es monótona para FEA compatible (los desplazamientos aumentan hacia la solución exacta desde abajo). El error decrece como O(h²) para elementos lineales.
          </ConceptBlock>
          <ConceptBlock title="Refinamiento p (orden superior)">
            Aumentar el orden polinómico de las funciones de forma (lineal → cuadrático → cúbico). Convergencia más rápida que h para problemas suaves. Los códigos modernos (p-adaptivity) combinan ambas estrategias.
          </ConceptBlock>
        </div>
        <MiniEjemplo>
          Viga simplemente apoyada L=120 pulg, P=5000 lbf, E=30 Mpsi, b×h=2×4 pulg.
          Con 2 elementos viga: δ_max = 0.0803 pulg (error ~25%). Con 4 elementos: δ_max = 0.0642 pulg (error &lt;1%).
          La solución exacta es δ_max = 0.0640 pulg = PL³/(48EI). Usa SimpleBeamFEA para experimentar.
        </MiniEjemplo>
        <ConceptBlock title="Criterios prácticos de convergencia">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Energía de deformación:</strong> debe estabilizarse al refinar la malla</li>
            <li><strong>Esfuerzos en puntos de Gauss:</strong> más precisos que en nodos; usar extrapolación</li>
            <li><strong>Estimador de error de Zienkiewicz-Zhu (ZZ):</strong> compara esfuerzos nodales suavizados vs crudos</li>
            <li>Refinar hasta que el cambio en σ_max entre mallas sucesivas sea &lt;5%</li>
          </ul>
        </ConceptBlock>
        <OjoAqui>
          Cuidado con la "convergencia accidental": a veces resultados aparentemente correctos se deben a errores que se cancelan. Siempre verifica con un estudio de mallado (refinar al menos 3 veces) y compara con soluciones analíticas cuando existan.
        </OjoAqui>
      </section>

      <section id="aplicaciones">
        <SectionTitle id="aplicaciones">19-5 Aplicaciones Prácticas</SectionTitle>
        <PreguntaBox>¿Cómo interpreto los resultados de FEA de manera crítica?</PreguntaBox>
        <p className="mb-4">
          El FEA es una herramienta poderosa, pero no un sustituto del criterio ingenieril. Antes de confiar en cualquier resultado, verifica:
        </p>
        <ConceptBlock title="Lista de verificación FEA">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Condiciones de frontera:</strong> ¿son realistas? Un empotramiento perfecto no existe en la realidad</li>
            <li><strong>Elementos distorsionados:</strong> relación de aspecto &gt; 5 produce resultados erróneos</li>
            <li><strong>Malla suficientemente fina:</strong> al menos 3-4 elementos en zonas de concentración de esfuerzos</li>
            <li><strong>Verificación manual:</strong> calcula reacciones globales y compáralas con el equilibrio ΣF = 0</li>
            <li><strong>Puntos de integración:</strong> los esfuerzos en puntos de Gauss son más precisos que en los nodos</li>
            <li><strong>Simetría:</strong> si el modelo tiene simetría, úsala para reducir tamaño y verificar resultados</li>
          </ul>
        </ConceptBlock>
        <OjoAqui>
          El error más común: tomar los resultados de FEA como verdad absoluta. El FEA es una aproximación numérica. Siempre valida con: (1) solución analítica de un caso simplificado, (2) datos experimentales, (3) un estudio de convergencia de malla.
        </OjoAqui>
        <OjoAqui>
          Otro error: usar elementos 3D cuando un modelo 2D (esfuerzo plano o deformación plana) sería suficiente. Los modelos 3D son computacionalmente más costosos y no siempre más precisos si la malla es gruesa.
        </OjoAqui>
        <ConceptBlock title="Aplicaciones típicas en diseño mecánico">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Análisis estático:</strong> esfuerzos y deflexiones bajo cargas de servicio</li>
            <li><strong>Análisis de pandeo:</strong> carga crítica de columnas y estructuras esbeltas</li>
            <li><strong>Análisis modal:</strong> frecuencias naturales y modos de vibración para evitar resonancia</li>
            <li><strong>Esfuerzos térmicos:</strong> dilatación restringida en componentes expuestos a temperatura</li>
            <li><strong>Contacto:</strong> ajustes a presión, engranes en malla, cojinetes (análisis no lineal)</li>
          </ul>
        </ConceptBlock>
      </section>

      <section id="malla">
        <SectionTitle id="malla">19-4 Generación de Malla</SectionTitle>
        <PreguntaBox>¿Cómo se crea y refina una malla de elementos finitos?</PreguntaBox>
        <p className="mb-4">
          La red de elementos y nodos que discretiza una región se conoce como <strong>malla</strong>.
          Existen tres formas básicas de generarla:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <ConceptBlock title="1. Manual">
            Método intensivo en trabajo. Se usaba en los primeros días del FEA. Rara vez se emplea hoy,
            excepto para modificaciones rápidas de un modelo. <strong>Cuidado:</strong> al editar archivos de texto,
            otros archivos (como gráficos binarios) pueden no actualizarse.
          </ConceptBlock>
          <ConceptBlock title="2. Semiautomática">
            El modelador define regiones con límites bien definidos y el algoritmo enmalla automáticamente
            dentro de cada región. Requiere intervención del usuario para definir las regiones, pero la malla
            se genera computacionalmente.
          </ConceptBlock>
          <ConceptBlock title="3. Completamente automática">
            Los programas modernos generan mallas automáticamente a partir de la geometría del sólido
            (tetraedros, hexaedros). Algunos incluyen refinamiento <em>adaptativo</em>: el software calcula
            el error de la solución y refina automáticamente la malla hasta converger.
          </ConceptBlock>
        </div>
        <MiniEjemplo>
          <strong>Convergencia de malla — placa delgada con agujero:</strong> Modelo de placa delgada con
          agujero (Fig. 19-2). Malla inicial: 294 elementos, 344 nodos → σ_max de von Mises = 4 110 psi.
          Malla refinada: 1 008 elementos, 1 096 nodos → σ_max = 4 185 psi. Diferencia: solo 1.8%.
          La solución ha convergido. <strong>Lección:</strong> no se necesitan modelos masivos si la malla
          está bien distribuida y concentrada en zonas de alto gradiente de esfuerzo.
        </MiniEjemplo>
        <OjoAqui>
          Cuando hay concentraciones de esfuerzo, la malla debe ser <strong>mucho más fina</strong> en esa región,
          con una transición gradual hacia malla gruesa. Una transición abrupta produce artefactos numéricos
          equivalentes a una concentración de esfuerzo falsa.
        </OjoAqui>
      </section>

      <section id="cargas">
        <SectionTitle id="cargas">19-5 Aplicación de la Carga</SectionTitle>
        <PreguntaBox>¿Cómo se aplican las cargas reales a un modelo de elementos finitos?</PreguntaBox>
        <p className="mb-4">
          Existen dos formas de especificar cargas: <strong>nodales</strong> (directamente en los nodos) y
          <strong> por elemento</strong> (cargas distribuidas que el software convierte en fuerzas nodales equivalentes).
          Un aspecto clave es el <strong>principio de Saint-Venant</strong>: si no se necesita precisión cerca del punto
          de aplicación, la carga puede aplicarse como fuerza puntual en un solo nodo sin afectar los resultados
          a distancia.
        </p>
        <ConceptBlock title="Tipos de carga y su aplicación">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Fuerzas puntuales:</strong> se aplican directamente en nodos</li>
            <li><strong>Carga de gravedad:</strong> g = 386.1 pulg/s² (sistema inglés) o 9.81 m/s² (SI). Se especifica dirección y magnitud.</li>
            <li><strong>Carga térmica:</strong> se proporciona α (coeficiente de expansión), temperatura inicial y temperaturas nodales finales. La mayoría de los paquetes pueden hacer primero un análisis de transferencia de calor y luego transferir las temperaturas al análisis de esfuerzo.</li>
            <li><strong>Presión superficial:</strong> se convierte a fuerzas nodales equivalentes. Para carga uniforme q sobre un elemento viga de longitud L: F₁ = F₂ = qL/2, M₁ = qL²/12, M₂ = −qL²/12</li>
            <li><strong>Momentos concentrados:</strong> se aplican en nodos de vigas y placas. Para elementos puntuales, planos y sólidos (que no soportan rotación), se aplican como pares de fuerzas.</li>
          </ul>
        </ConceptBlock>
        <OjoAqui>
          No se sorprenda si los esfuerzos cerca del punto de aplicación de una carga puntual son muy grandes.
          El principio de Saint-Venant establece que a una distancia de ~una dimensión característica, los efectos
          locales se disipan y la solución es realista.
        </OjoAqui>
      </section>

      <section id="condiciones">
        <SectionTitle id="condiciones">19-6 Condiciones de Frontera</SectionTitle>
        <PreguntaBox>¿Cómo se modelan los apoyos y uniones en la realidad?</PreguntaBox>
        <p className="mb-4">
          Las condiciones de frontera probablemente constituyen la <strong>parte más difícil</strong> del modelado
          preciso de una estructura. Las uniones de pernos, soldaduras y cojinetes no son tan simples como
          los apoyos idealizados de la teoría.
        </p>
        <ConceptBlock title="Tipos de condición de frontera">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Empotramiento:</strong> todos los DOF = 0. En la práctica, ningún empotramiento es perfecto — siempre hay cierta flexibilidad.</li>
            <li><strong>Articulación (pin):</strong> desplazamientos = 0 pero rotaciones libres. Un eje en cojinete puede modelarse así.</li>
            <li><strong>Plano de simetría:</strong> desplazamientos normales al plano = 0. Reduce el modelo a la mitad.</li>
            <li><strong>Apoyo simple:</strong> desplazamiento vertical = 0, horizontal libre. Modelo conservador para cojinetes.</li>
            <li><strong>Prescrito distinto de cero:</strong> desplazamiento especificado (ej: ajuste a presión δ entre componentes).</li>
          </ul>
        </ConceptBlock>
        <OjoAqui>
          Un eje soportado por cojinetes se modela típicamente como apoyo simple, pero en realidad el soporte
          está entre simple y empotrado. Se recomienda analizar <strong>ambos límites</strong> (simple y empotrado)
          para establecer el rango de comportamiento real. El apoyo simple da resultados conservadores
          (esfuerzos y deflexiones mayores que los reales).
        </OjoAqui>
        <ConceptBlock title="Ecuaciones de restricción y elementos rígidos">
          Las <strong>ecuaciones de restricción de punto múltiple</strong> (MPC) se usan para modelar conexiones rígidas
          entre miembros elásticos. Actúan como elementos que solo pueden rotar o trasladarse rígidamente.
          Los <strong>elementos de frontera</strong> se usan para imponer desplazamientos específicos distintos de cero
          sobre la estructura.
        </ConceptBlock>
        <p className="mb-4">Un modelo sin condiciones de frontera suficientes produce una matriz de rigidez singular (no invertible).</p>
      </section>

      <section id="modelado">
        <SectionTitle id="modelado">19-7 Técnicas de Modelado</SectionTitle>
        <ConceptBlock title="Simplificaciones válidas">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Simetría:</strong> modelar 1/2 o 1/4 de la estructura; reduce DOF significativamente</li>
            <li><strong>Modelo 2D vs 3D:</strong> esfuerzo plano (planchas delgadas) o deformación plana (estructuras largas)</li>
            <li><strong>Submodeling:</strong> modelo global grueso + submodelo refinado en zonas críticas</li>
          </ul>
        </ConceptBlock>
        <MiniEjemplo>
          <strong>Comparación modelo viga vs sólido (Ej. 4-7):</strong> Un eje escalonado se modela con 5 elementos viga (10 DOF) y con 56,384 elementos sólidos. Resultados para un factor de concentración K_t = 3.00 (analítico): el modelo de viga no captura la concentración de esfuerzo, pero el modelo sólido sí, obteniendo σ_max = 23.9 kpsi. La verificación manual simple da σ = K_t · P/A = 25.03 kpsi. La diferencia (4.8%) proviene de la transición del eje que no es perfectamente modelada.
        </MiniEjemplo>
      </section>

      <section id="termico">
        <SectionTitle id="termico">Esfuerzos Térmicos</SectionTitle>
        <FormulaGlosa
          formula="ε_T = α·ΔT ; σ_T = −E·α·ΔT (si se impide la deformación)"
          glosa={[
            { sym: 'ε_T', desc: 'Deformación térmica libre (unitaria)' },
            { sym: 'σ_T', desc: 'Esfuerzo térmico si se impide la expansión' },
            { sym: 'α', desc: 'Coeficiente de expansión térmica lineal [1/°F o 1/°C]' },
            { sym: 'ΔT', desc: 'Cambio de temperatura' },
          ]}
        />
        <MiniEjemplo>
          <strong>Ejemplo FEA térmico:</strong> Placa de acero de 10×4×0.25 pulg con agujero central de 1 pulg de diámetro. Extremos a 100 °F y 0 °F, α = 6.5×10⁻⁶ /°F. Resultado FEA: esfuerzo compresivo máximo = 31.9 kpsi en los bordes del agujero (arriba y abajo). Esto demuestra cómo un agujero de tensión genera concentración aún en un campo puramente térmico.
        </MiniEjemplo>
      </section>

<section id="pandeo">
        <SectionTitle id="pandeo">19-9 a 19-10 Pandeo y Análisis de Vibración</SectionTitle>
        <FormulaBox>
          <div className="font-bold mb-2">Carga de pandeo crítica — autovalor:</div>
          <div>([K] − λ·[Kσ])·{'{u}'} = {'{0}'}</div>
          <div className="mt-2">Pcr = λ₁·Pref &nbsp;&nbsp;&nbsp; [λ₁ = autovalor más pequeño]</div>
          <div className="mt-3 font-bold">Frecuencias naturales:</div>
          <div>([K] − ω²·[M])·{'{Φ}'} = {'{0}'}</div>
          <div className="mt-2">fn = ωn/(2π) [Hz]</div>
        </FormulaBox>
        <ConceptBlock title="Resultados FEA de vibración — eje escalonado">
          <div className="text-sm mb-2">Modelo con <strong>20 elementos viga</strong> vs modelo con <strong>56 384 elementos sólidos</strong>:</div>
          <div className="grid grid-cols-2 gap-3 text-sm font-mono">
            <div>1er modo: f₁ = 322 Hz (viga) vs 316 Hz (sólido) → 1.9% diferencia</div>
            <div>2do modo: f₂ = 1 296 Hz (viga) vs 1 249 Hz (sólido) → 3.6% diferencia</div>
          </div>
          <div className="text-xs mt-2 opacity-70">El modelo de viga es suficiente para frecuencias bajas; para modos superiores y concentraciones de esfuerzo, se necesita un modelo sólido.</div>
        </ConceptBlock>
        <ConceptBlock title="Interpretación de resultados de pandeo">
          El FEA lineal proporciona cargas de bifurcación (pandeo de Euler). Para estructuras reales, aplicar un factor de seguridad de 2–4 sobre la carga crítica calculada.
        </ConceptBlock>
      </section>

      <section id="calculadora">
        <SectionTitle id="calculadora">SimpleBeamFEA — Simulador interactivo</SectionTitle>
        <p className="mb-4">
          Experimenta con el simulador de viga FEA en tiempo real. Cambia el número de elementos, la carga y la geometría para observar cómo converge la solución.
        </p>
        <SimpleBeamFEA />
      </section>
    </ChapterShell>
  )
}
