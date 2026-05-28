'use client'
import { SVGContainer } from './ChapterHelpers'

export function BellCurveSVG({ mu = 0, sigma = 1 }: { mu?: number; sigma?: number }) {
  const w = 420, h = 260
  const cx = w / 2, cy = 180
  const scale = 45
  const pts: [number, number][] = []
  const steps = 120
  const xMin = mu - 4 * sigma
  const xMax = mu + 4 * sigma
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (xMax - xMin) * i / steps
    const z = (x - mu) / sigma
    const y = Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI))
    pts.push([cx + (x - mu) * scale / sigma, cy - y * scale * sigma])
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return (
    <SVGContainer caption="Figura 20-1: Campana de Gauss — la distribución normal cambia forma con μ y σ" width={w} height={h}>
      {/* Ejes */}
      <line x1="30" y1={cy} x2={w - 20} y2={cy} stroke="var(--text-3)" strokeWidth="1" />
      <line x1={cx} y1="30" x2={cx} y2={cy + 10} stroke="var(--text-3)" strokeWidth="1" />
      {/* Curva */}
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {/* Relleno */}
      <path d={`${d} L${cx},${cy} Z`} fill="var(--accent)" opacity={0.08} />
      {/* Marcas μ */}
      <line x1={cx} y1={cy + 5} x2={cx} y2={cy - 5} stroke="var(--accent)" strokeWidth="1.5" />
      <text x={cx - 12} y={cy + 22} fill="var(--text-2)" fontSize="12" fontFamily="var(--font-mono)">μ</text>
      {/* Marcas μ±σ */}
      {[-1, 1].map(s => {
        const x = cx + s * scale
        return (
          <g key={s}>
            <line x1={x} y1={cy + 3} x2={x} y2={cy - 3} stroke="var(--text-3)" strokeWidth="1" strokeDasharray="3,2" />
            <text x={x - 12} y={cy + 22} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">μ{s < 0 ? '−' : '+'}σ</text>
          </g>
        )
      })}
      {/* Valores */}
      <text x={cx - 40} y="18" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">
        μ = {mu}, σ = {sigma}
      </text>
      {/* Rango 68-95-99.7 */}
      <text x={cx + 60} y={cy - 70} fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">
        68% | 95% | 99.7%
      </text>
    </SVGContainer>
  )
}

export function StressStrengthSVG() {
  return (
    <SVGContainer caption="Figura 20-2: Superposición esfuerzo–resistencia — la zona de traslape (rojo) representa la probabilidad de falla" width={420} height={280}>
      {/* Curva de resistencia S */}
      <path d="M60,200 Q160,200 200,100 Q230,45 280,45 Q330,45 360,100 Q380,130 380,200"
        fill="none" stroke="var(--success)" strokeWidth="2.5" />
      <text x="210" y="38" fill="var(--success)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Resistencia S</text>
      {/* Curva de esfuerzo s */}
      <path d="M100,200 Q160,200 180,140 Q200,80 240,60 Q280,45 320,60 Q360,80 370,200"
        fill="none" stroke="var(--danger)" strokeWidth="2.5" />
      <text x="310" y="52" fill="var(--danger)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Esfuerzo s</text>
      {/* Zona de traslape */}
      <path d="M170,200 Q190,165 210,140 Q230,115 260,105 Q290,98 310,105 Q340,115 355,150 Q365,175 370,200 Z"
        fill="var(--danger)" opacity={0.15} />
      <text x="230" y="155" fill="var(--danger)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">Falla</text>
      {/* μ_S, μ_s */}
      <line x1="220" y1="210" x2="220" y2="220" stroke="var(--success)" strokeWidth="2" />
      <text x="205" y="235" fill="var(--success)" fontSize="10" fontFamily="var(--font-mono)">μ_S</text>
      <line x1="300" y1="210" x2="300" y2="220" stroke="var(--danger)" strokeWidth="2" />
      <text x="290" y="235" fill="var(--danger)" fontSize="10" fontFamily="var(--font-mono)">μ_s</text>
      {/* Ecuación */}
      <text x="60" y="265" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">
        z = (μ_S − μ_s) / √(σ_S² + σ_s²)
      </text>
      <text x="60" y="278" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">
        R = Φ(z) &nbsp;—&nbsp; Confiabilidad
      </text>
    </SVGContainer>
  )
}

export function RegressionSVG() {
  return (
    <SVGContainer caption="Figura 20-3: Regresión lineal — mínimos cuadrados y R² miden la calidad del ajuste" width={420} height={280}>
      {/* Ejes */}
      <line x1="50" y1="230" x2="390" y2="230" stroke="var(--text-2)" strokeWidth="1.5" />
      <line x1="50" y1="30" x2="50" y2="230" stroke="var(--text-2)" strokeWidth="1.5" />
      {/* Puntos de datos */}
      {[
        [80,190],[110,170],[140,155],[170,135],[200,120],
        [230,105],[260,95],[290,80],[320,70],[350,55],
      ].map(([x,y]) => (
        <circle key={x} cx={x} cy={y} r="4" fill="var(--accent)" />
      ))}
      {/* Línea de regresión */}
      <line x1="70" y1="200" x2="360" y2="50" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6,3" />
      {/* Residuos */}
      {[
        [80,190,177],[110,170,164],[140,155,151],[170,135,138],[200,120,125],
        [230,105,112],[260,95,99],[290,80,86],[320,70,73],[350,55,60],
      ].map(([x,y,yHat]) => (
        <line key={x} x1={x} y1={y} x2={x} y2={yHat as number} stroke="var(--danger)" strokeWidth="1" opacity={0.6} />
      ))}
      {/* Etiquetas */}
      <text x="200" y="258" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">x — Variable independiente</text>
      <text x="10" y="140" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)" transform="rotate(-90,10,140)">y — Variable respuesta</text>
      <text x="250" y="45" fill="var(--accent)" fontSize="10" fontFamily="var(--font-mono)">y = a + bx</text>
      <text x="250" y="60" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">R² → 1 (buen ajuste)</text>
      <text x="250" y="75" fill="var(--text-3)" fontSize="9" fontFamily="var(--font-mono)">Línea roja = residuos</text>
    </SVGContainer>
  )
}
