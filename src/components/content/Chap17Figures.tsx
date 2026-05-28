'use client'
import { SVGContainer } from './ChapterHelpers'

export function FlatBeltSVG() {
  return (
    <SVGContainer caption="Figura 17-1: Transmisión por banda plana — geometría abierta" width={400} height={260}>
      <defs>
        <marker id="arr17" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Polea menor (conducida) */}
      <circle cx="100" cy="130" r="35" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="100" cy="130" r="10" fill="var(--accent)" opacity={0.4} />
      <line x1="100" y1="95" x2="100" y2="70" stroke="var(--accent)" strokeWidth="2" />
      {/* Polea mayor (motriz) */}
      <circle cx="300" cy="130" r="65" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="300" cy="130" r="15" fill="var(--accent)" opacity={0.4} />
      <line x1="300" y1="65" x2="300" y2="35" stroke="var(--accent)" strokeWidth="2" />
      {/* Banda (tramo superior) */}
      <path d="M100,95 Q200,75 300,65" fill="none" stroke="#f97316" strokeWidth="3" opacity={0.7} />
      {/* Banda (tramo inferior) */}
      <path d="M100,165 Q200,185 300,195" fill="none" stroke="#f97316" strokeWidth="3" opacity={0.7} />
      {/* Flechas tensión */}
      <text x="170" y="80" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">F₁ (tenso)</text>
      <text x="170" y="200" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">F₂ (flojo)</text>
      {/* Ángulo de contacto */}
      <path d="M135,130 A35,35 0 0,1 100,95" fill="none" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,2" />
      <text x="140" y="100" fill="#22C55E" fontSize="9">φd</text>
      <path d="M235,130 A65,65 0 0,0 300,65" fill="none" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,2" />
      <text x="225" y="75" fill="#22C55E" fontSize="9">φD</text>
      {/* Distancia entre centros */}
      <line x1="100" y1="230" x2="300" y2="230" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="180" y="245" fill="var(--text-2)" fontSize="9">C</text>
      {/* Rotación */}
      <path d="M125,105 Q115,115 115,125" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arr17)" />
      <path d="M275,85 Q265,75 265,70" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arr17)" />
    </SVGContainer>
  )
}

export function VBeltSVG() {
  return (
    <SVGContainer caption="Figura 17-2: Banda en V — efecto cuña en la ranura" width={360} height={240}>
      <defs>
        <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity={0.6} />
        </linearGradient>
      </defs>
      {/* Sección transversal de la polea */}
      <path d="M100,50 L140,180 L220,180 L260,50 Z" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M100,50 L140,180" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      <path d="M260,50 L220,180" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      {/* Banda en V (sección) */}
      <path d="M130,70 L150,150 L210,150 L230,70 Z" fill="url(#vGrad)" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Ángulo de ranura */}
      <path d="M135,90 Q160,110 180,110" fill="none" stroke="#f97316" strokeWidth="1" />
      <path d="M180,110 Q200,110 225,90" fill="none" stroke="#f97316" strokeWidth="1" />
      <text x="170" y="105" fill="#f97316" fontSize="9">α</text>
      {/* Fuerza normal y fricción */}
      <line x1="145" y1="100" x2="115" y2="90" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arr17)" />
      <text x="100" y="85" fill="#ef4444" fontSize="8">N</text>
      <line x1="145" y1="100" x2="155" y2="120" stroke="#f97316" strokeWidth="1" markerEnd="url(#arr17)" />
      <text x="160" y="125" fill="#f97316" fontSize="8">f·N</text>
      <text x="70" y="220" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">f_eff = f / sin(α/2)</text>
    </SVGContainer>
  )
}

export function ChainSVG() {
  return (
    <SVGContainer caption="Figura 17-3: Cadena de rodillos ANSI — paso p, rodillos y eslabones" width={380} height={240}>
      <defs>
        <marker id="arr17c" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Sprocket menor */}
      <circle cx="100" cy="120" r="40" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      {[0,45,90,135,180,225,270,315].map(a => {
        const rad = a * Math.PI / 180
        return <circle key={a} cx={100+40*Math.cos(rad)} cy={120+40*Math.sin(rad)} r="5" fill="#22C55E" />
      })}
      {/* Sprocket mayor */}
      <circle cx="300" cy="120" r="60" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const rad = a * Math.PI / 180
        return <circle key={a} cx={300+60*Math.cos(rad)} cy={120+60*Math.sin(rad)} r="5" fill="#22C55E" />
      })}
      {/* Cadena (tramo superior) */}
      <path d="M95,80 Q200,60 300,60" fill="none" stroke="#f97316" strokeWidth="2.5" opacity={0.7} />
      {/* Cadena (tramo inferior) */}
      <path d="M95,160 Q200,180 300,180" fill="none" stroke="#f97316" strokeWidth="2.5" opacity={0.7} />
      {/* Paso p */}
      <line x1="95" y1="80" x2="105" y2="80" stroke="var(--text-2)" strokeWidth="0.8" />
      <text x="90" y="75" fill="var(--text-2)" fontSize="8">p</text>
      {/* Rotación */}
      <path d="M70,100 Q55,110 60,125" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arr17c)" />
      <path d="M340,95 Q355,105 350,120" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arr17c)" />
      <text x="40" y="105" fill="var(--text-2)" fontSize="9">ω₁</text>
      <text x="340" y="95" fill="var(--text-2)" fontSize="9">ω₂</text>
    </SVGContainer>
  )
}

export function WireRopeSVG() {
  return (
    <SVGContainer caption="Figura 17-4: Cable de acero 6×19 — construcción y presión en polea" width={380} height={280}>
      <defs>
        <marker id="arr17w" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Sección transversal del cable 6×19 */}
      <circle cx="120" cy="100" r="40" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="120" cy="100" r="8" fill="var(--accent)" opacity={0.5} />
      <text x="108" y="104" fill="var(--text-2)" fontSize="7">alma</text>
      {[0,60,120,180,240,300].map(a => {
        const rad = a * Math.PI / 180
        const cx = 120 + 24 * Math.cos(rad)
        const cy = 100 + 24 * Math.sin(rad)
        return <circle key={a} cx={cx} cy={cy} r="12" fill="none" stroke="#22C55E" strokeWidth="1" opacity={0.7} />
      })}
      {[0,60,120,180,240,300].map(a => {
        const rad = a * Math.PI / 180
        return <circle key={a+'i'} cx={120+24*Math.cos(rad)} cy={100+24*Math.sin(rad)} r="3" fill="#22C55E" opacity={0.4} />
      })}
      <text x="65" y="155" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">6×19: 6 torones</text>
      <text x="65" y="168" fill="var(--text-2)" fontSize="9" fontFamily="var(--font-mono)">de 19 alambres c/u</text>
      {/* Cable sobre polea */}
      <circle cx="300" cy="150" r="50" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="300" cy="150" r="8" fill="var(--accent)" opacity={0.4} />
      {/* Cable — tramo izquierdo */}
      <path d="M200,80 Q250,85 270,110" fill="none" stroke="#f97316" strokeWidth="3" opacity={0.8} />
      {/* Cable — tramo derecho */}
      <path d="M330,110 Q350,85 380,80" fill="none" stroke="#f97316" strokeWidth="3" opacity={0.8} />
      {/* Presión */}
      <text x="265" y="195" fill="#ef4444" fontSize="8">p = 2F/(d·D)</text>
      <text x="265" y="207" fill="#ef4444" fontSize="8">p ≤ p_perm</text>
      {/* Diámetros */}
      <line x1="300" y1="100" x2="300" y2="80" stroke="var(--text-2)" strokeWidth="0.5" strokeDasharray="3,2" />
      <text x="280" y="95" fill="var(--text-2)" fontSize="8">D</text>
      <line x1="265" y1="110" x2="290" y2="130" stroke="var(--text-2)" strokeWidth="0.8" markerEnd="url(#arr17w)" />
      <text x="250" y="125" fill="var(--text-2)" fontSize="8">F</text>
    </SVGContainer>
  )
}
