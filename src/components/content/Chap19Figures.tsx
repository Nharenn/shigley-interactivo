'use client'
import { SVGContainer } from './ChapterHelpers'

export function DiscretizationSVG() {
  return (
    <SVGContainer caption="Figura 19-1: Discretización 1D, 2D y 3D — el dominio continuo se divide en elementos finitos conectados por nodos" width={460} height={340}>
      <defs>
        <marker id="dot19" markerWidth="6" markerHeight="6" refX="3" refY="3">
          <circle cx="3" cy="3" r="3" fill="var(--accent)" />
        </marker>
      </defs>
      {/* 1D: Viga discretizada */}
      <text x="10" y="25" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">1D — Viga</text>
      <line x1="30" y1="60" x2="430" y2="60" stroke="var(--accent)" strokeWidth="3" />
      {[30, 130, 230, 330, 430].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={60} r="5" fill="var(--accent)" />
          <text x={x - 8} y="82" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">n{i}</text>
        </g>
      ))}
      <text x="155" y="48" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">elem 1</text>
      <text x="255" y="48" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">elem 2</text>
      <text x="355" y="48" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">elem 3</text>
      <text x="355" y="48" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">elem 3</text>
      {/* 2D: Malla triangular */}
      <text x="10" y="115" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">2D — Triangular</text>
      {[
        [50,160],[120,130],[180,160],
        [80,210],[140,190],[200,210],
        [110,260],[170,240],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="var(--accent)" />
      ))}
      {[
        [50,160,120,130],[50,160,80,210],[120,130,180,160],[120,130,140,190],
        [80,210,140,190],[80,210,110,260],[180,160,140,190],[140,190,170,240],
        [110,260,170,240],[180,160,200,210],[140,190,200,210],[200,210,170,240],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1" opacity={0.6} />
      ))}
      <text x="95" y="285" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Triángulo 3 nodos</text>
      {/* 2D: Cuadrilátero */}
      <text x="220" y="115" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">2D — Cuadrilátero</text>
      {[
        [240,160],[310,145],[380,160],
        [250,210],[320,195],[390,210],
        [260,260],[330,245],[400,260],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="var(--accent)" />
      ))}
      {[
        [240,160,310,145],[310,145,380,160],
        [240,160,250,210],[310,145,320,195],[380,160,390,210],
        [250,210,320,195],[320,195,390,210],
        [250,210,260,260],[320,195,330,245],[390,210,400,260],
        [260,260,330,245],[330,245,400,260],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1" opacity={0.6} />
      ))}
      <text x="285" y="285" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Cuadrilátero 8 nodos</text>
      {/* 3D: Hexaedro */}
      <text x="10" y="310" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">3D — Hexaedro</text>
      {[
        [30,330],[60,318],[90,330],[60,340],
        [130,320],[160,308],[190,320],[160,330],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--accent)" />
      ))}
      {[
        [30,330,60,318],[60,318,90,330],[90,330,60,340],[60,340,30,330],
        [130,320,160,308],[160,308,190,320],[190,320,160,330],[160,330,130,320],
        [30,330,130,320],[60,318,160,308],[90,330,190,320],[60,340,160,330],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1" opacity={0.5} />
      ))}
      <text x="120" y="345" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Hexaedro 8 nodos (ladrillo)</text>
    </SVGContainer>
  )
}

export function AssemblySVG() {
  return (
    <SVGContainer caption="Figura 19-2: Ensamble de matrices de rigidez — superposición de elementos en la matriz global" width={420} height={280}>
      <defs>
        <marker id="arrowAsm" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Elemento 1 */}
      <text x="10" y="22" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Elemento 1</text>
      <rect x="10" y="30" width="70" height="60" rx="3" fill="none" stroke="var(--accent)" strokeWidth="1" />
      <text x="18" y="50" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)">k₁ -k₁</text>
      <text x="18" y="65" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)">-k₁  k₁</text>
      <text x="24" y="80" fill="var(--text-3)" fontSize="7">nodos 1-2</text>
      {/* Elemento 2 */}
      <text x="100" y="22" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Elemento 2</text>
      <rect x="100" y="30" width="70" height="60" rx="3" fill="none" stroke="var(--accent)" strokeWidth="1" />
      <text x="108" y="50" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)">k₂ -k₂</text>
      <text x="108" y="65" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)">-k₂  k₂</text>
      <text x="114" y="80" fill="var(--text-3)" fontSize="7">nodos 2-3</text>
      {/* Flecha */}
      <line x1="175" y1="60" x2="205" y2="60" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowAsm)" />
      <text x="178" y="55" fill="var(--text-3)" fontSize="8">ensamble</text>
      {/* Global */}
      <text x="220" y="22" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Matriz global [K]</text>
      <rect x="220" y="30" width="100" height="100" rx="3" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="228" y="50" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)"> k₁   -k₁   0</text>
      <text x="228" y="65" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)">-k₁  k₁+k₂ -k₂</text>
      <text x="228" y="80" fill="var(--text-2)" fontSize="8" fontFamily="var(--font-mono)"> 0   -k₂   k₂</text>
      {/* DOF labels */}
      <text x="225" y="100" fill="var(--text-3)" fontSize="7">u₁    u₂    u₃</text>
      {/* Ec. global */}
      <text x="220" y="135" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">[K]&#123;u&#125; = &#123;F&#125;</text>
      <text x="220" y="150" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">|k₁  -k₁   0| |u₁|   |F₁|</text>
      <text x="220" y="163" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">|-k₁ k₁+k₂ -k₂|·|u₂| = |F₂|</text>
      <text x="220" y="176" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">| 0   -k₂   k₂| |u₃|   |F₃|</text>
      {/* Leyenda */}
      <text x="10" y="210" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">k = AE/L &nbsp;▶&nbsp; rigidez del elemento</text>
      <text x="10" y="225" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">u₁, u₂, u₃ = desplazamientos nodales</text>
      <text x="10" y="240" fill="var(--text-3)" fontSize="8" fontFamily="var(--font-mono)">F₁, F₂, F₃ = fuerzas nodales externas</text>
    </SVGContainer>
  )
}

export function ConvergenceSVG() {
  return (
    <SVGContainer caption="Figura 19-3: Convergencia del esfuerzo máximo vs número de elementos — el valor exacto se alcanza asintóticamente" width={420} height={280}>
      {/* Ejes */}
      <line x1="60" y1="230" x2="390" y2="230" stroke="var(--text-2)" strokeWidth="1.5" />
      <line x1="60" y1="30" x2="60" y2="230" stroke="var(--text-2)" strokeWidth="1.5" />
      {/* Curva exacta (asíntota) */}
      <line x1="330" y1="50" x2="390" y2="50" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5,3" />
      <text x="340" y="46" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">σ_exacto</text>
      {/* Curva de convergencia h */}
      <path d="M70,220 Q100,200 140,160 Q180,120 230,80 Q280,60 330,52"
        fill="none" stroke="var(--accent)" strokeWidth="2" />
      {/* Puntos discretos */}
      {[
        [70,220,'1'],
        [140,160,'4'],
        [230,80,'16'],
        [280,60,'32'],
        [330,52,'64'],
      ].map(([x,y,label]) => (
        <g key={label}>
          <circle cx={x as number} cy={y as number} r="4" fill="var(--accent)" />
          <circle cx={x as number} cy={y as number} r="2" fill="var(--bg-0)" />
          <text x={(x as number) - 5} y={(y as number) - 10} fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">{label}</text>
        </g>
      ))}
      {/* Etiquetas ejes */}
      <text x="200" y="258" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">Número de elementos (n)</text>
      <text x="10" y="140" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)" transform="rotate(-90,10,140)">Esfuerzo máximo σ_max</text>
      {/* Refinamiento p */}
      <text x="160" y="100" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Refinamiento h: más elementos</text>
      <text x="160" y="115" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Refinamiento p: orden superior</text>
    </SVGContainer>
  )
}

export function BeamElementSVG() {
  return (
    <SVGContainer caption="Elemento viga 1D — 2 nodos, 4 DOF (v₁, θ₁, v₂, θ₂), función de forma cúbica" width={420} height={220}>
      <defs>
        <marker id="arrowBeam" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Viga sin deformar */}
      <line x1="60" y1="120" x2="360" y2="120" stroke="var(--text-3)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="190" y="135" fill="var(--text-3)" fontSize="9">Posición inicial (eje neutro)</text>
      {/* Viga deformada (cúbica) */}
      <path d="M60,120 Q140,60 210,90 Q280,120 360,80"
        fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {/* Nodos */}
      <circle cx="60" cy="120" r="5" fill="var(--accent)" />
      <text x="45" y="140" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">nodo 1</text>
      <circle cx="360" cy="80" r="5" fill="var(--accent)" />
      <text x="350" y="75" fill="var(--text-2)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">nodo 2</text>
      {/* DOF nodo 1 */}
      <line x1="60" y1="120" x2="60" y2="155" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowBeam)" />
      <text x="50" y="168" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">v₁</text>
      <path d="M70,120 Q85,115 90,108" fill="none" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrowBeam)" />
      <text x="88" y="108" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">θ₁</text>
      {/* DOF nodo 2 */}
      <line x1="360" y1="80" x2="360" y2="50" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowBeam)" />
      <text x="352" y="44" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">v₂</text>
      <path d="M350,80 Q335,75 330,68" fill="none" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrowBeam)" />
      <text x="322" y="68" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">θ₂</text>
      {/* Matriz de rigidez */}
      <text x="80" y="195" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)">
        [k_e] = EI/L³ · [12  6L  -12  6L;  6L  4L²  -6L  2L²;  -12  -6L  12  -6L;  6L  2L²  -6L  4L²]
      </text>
    </SVGContainer>
  )
}
