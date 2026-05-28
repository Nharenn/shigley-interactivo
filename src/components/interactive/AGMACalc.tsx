'use client'

import { useState } from 'react'

const accent = 'var(--part-3)'

export default function AGMACalc() {
  const [Wt, setWt] = useState(1000)
  const [Pd, setPd] = useState(8)
  const [F, setF] = useState(1.5)
  const [J, setJ] = useState(0.36)
  const [I, setI] = useState(0.107)
  const [Ko, setKo] = useState(1.25)
  const [Kv, setKv] = useState(1.48)
  const [Ks, setKs] = useState(1.0)
  const [Km, setKm] = useState(1.3)
  const [Cp, setCp] = useState(2300)
  const [dp, setDp] = useState(2.5)
  const [St, setSt] = useState(36250)
  const [Sc, setSc] = useState(120000)
  const [YN, setYN] = useState(1.3558)
  const [ZN, setZN] = useState(1.4488)
  const [KT, setKT] = useState(1.0)
  const [KR, setKR] = useState(1.0)
  const [CH, setCH] = useState(1.0)

  const sigma_b = Wt * Ko * Kv * Ks * Pd * (Km / (F * J))
  const sigma_c = Cp * Math.sqrt(Math.abs(Wt * Ko * Kv * Ks * Km / (dp * F * I)))
  const SF = (St * YN) / (sigma_b * KT * KR)
  const SH = (Sc * ZN * CH) / (sigma_c * KT * KR)

  const inputBorder = { borderColor: 'var(--border)' }

  return (
    <div className="my-6 p-6 rounded-xl border-2" style={{ borderColor: accent }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: accent }}>Calculadora AGMA — Engranes Rectos/Helicoidales</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Wt — Carga tangencial (lbf)', val: Wt, set: setWt, step: 1 },
          { label: 'Pd — Paso diametral (dientes/pulg)', val: Pd, set: setPd, step: 1 },
          { label: 'F — Ancho de cara (pulg)', val: F, set: setF, step: 0.1 },
          { label: 'J — Factor geométrico flexión', val: J, set: setJ, step: 0.01 },
          { label: 'I — Factor geométrico contacto', val: I, set: setI, step: 0.001 },
          { label: 'dp — Diámetro de paso piñón (pulg)', val: dp, set: setDp, step: 0.1 },
          { label: 'Ko — Factor de sobrecarga', val: Ko, set: setKo, step: 0.05 },
          { label: 'Kv — Factor dinámico', val: Kv, set: setKv, step: 0.01 },
          { label: 'Ks — Factor de tamaño', val: Ks, set: setKs, step: 0.05 },
          { label: 'Km — Factor distribución de carga', val: Km, set: setKm, step: 0.05 },
          { label: 'Cp — Coeficiente elástico (psi^0.5)', val: Cp, set: setCp, step: 10 },
          { label: 'St — Resist. flexión permisible (psi)', val: St, set: setSt, step: 1000 },
          { label: 'Sc — Resist. contacto permisible (psi)', val: Sc, set: setSc, step: 1000 },
          { label: 'YN — Factor ciclos flexión', val: YN, set: setYN, step: 0.01 },
          { label: 'ZN — Factor ciclos contacto', val: ZN, set: setZN, step: 0.01 },
          { label: 'KT — Factor temperatura', val: KT, set: setKT, step: 0.05 },
          { label: 'KR — Factor confiabilidad', val: KR, set: setKR, step: 0.05 },
          { label: 'CH — Factor relación dureza', val: CH, set: setCH, step: 0.01 },
        ].map(({ label, val, set, step }) => (
          <div key={label}>
            <label className="block text-xs mb-1">{label}</label>
            <input type="number" value={val} step={step} onChange={e => set(Number(e.target.value))}
              className="w-full p-2 rounded border text-sm" style={inputBorder} />
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg text-sm font-mono grid grid-cols-2 md:grid-cols-4 gap-3" style={{ background: 'var(--bg-2)' }}>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">σb — Esfuerzo flexión</div>
          <div className="text-lg font-bold">{sigma_b.toFixed(0)} psi</div>
          <div className="text-xs">{(sigma_b / 1000).toFixed(2)} kpsi</div>
        </div>
        <div className="p-3 rounded" style={{ background: 'var(--bg-3)' }}>
          <div className="text-xs opacity-70">σc — Esfuerzo contacto</div>
          <div className="text-lg font-bold">{sigma_c.toFixed(0)} psi</div>
          <div className="text-xs">{(sigma_c / 1000).toFixed(2)} kpsi</div>
        </div>
        <div className="p-3 rounded" style={{ background: SF >= 1 ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">SF — Factor seguridad flexión</div>
          <div className="text-lg font-bold" style={{ color: SF >= 1 ? '#16a34a' : '#dc2626' }}>{SF.toFixed(3)}</div>
          <div className="text-xs">{SF >= 1 ? 'Aceptable' : 'FALLA'}</div>
        </div>
        <div className="p-3 rounded" style={{ background: SH >= 1 ? '#16a34a22' : '#dc262622' }}>
          <div className="text-xs opacity-70">SH — Factor seguridad contacto</div>
          <div className="text-lg font-bold" style={{ color: SH >= 1 ? '#16a34a' : '#dc2626' }}>{SH.toFixed(3)}</div>
          <div className="text-xs">{SH >= 1 ? 'Aceptable' : 'FALLA'}</div>
        </div>
      </div>
    </div>
  )
}
