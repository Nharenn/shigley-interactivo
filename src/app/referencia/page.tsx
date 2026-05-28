'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'

const MATERIALS = [
  { name: 'Acero 1020 HR', E: 207, G: 79.3, Sy: 210, Su: 380 },
  { name: 'Acero 1020 CD', E: 207, G: 79.3, Sy: 390, Su: 470 },
  { name: 'Acero 1040 HR', E: 207, G: 79.3, Sy: 290, Su: 520 },
  { name: 'Acero 1040 CD', E: 207, G: 79.3, Sy: 490, Su: 590 },
  { name: 'Acero 4140 (norm.)', E: 207, G: 79.3, Sy: 655, Su: 1020 },
  { name: 'Acero 4340 (norm.)', E: 207, G: 79.3, Sy: 470, Su: 745 },
  { name: 'Aluminio 2024-T4', E: 71.7, G: 26.9, Sy: 325, Su: 469 },
  { name: 'Aluminio 6061-T6', E: 69.0, G: 26.0, Sy: 276, Su: 310 },
  { name: 'Titanio 6Al-4V', E: 114, G: 42.4, Sy: 830, Su: 900 },
  { name: 'Hierro fundido gris', E: 100, G: 41.4, Sy: null, Su: 180 },
]

export default function ReferenciaPage() {
  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <nav style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--text-2)' }}>Inicio</Link>
          <span style={{ color: 'var(--text-3)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--text-1)' }}>Referencia</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Tablas de Referencia
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 36 }}>Propiedades mecánicas de materiales de ingeniería</p>

        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-1)' }}>
                {['Material', 'E (GPa)', 'G (GPa)', 'Sy (MPa)', 'Su (MPa)'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map((m, i) => (
                <tr key={m.name} style={{ borderBottom: '1px solid var(--border-soft)', background: i % 2 === 1 ? 'var(--bg-1)' : 'transparent' }}>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-1)' }}>{m.name}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{m.E}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--success)' }}>{m.G}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--warning)' }}>{m.Sy ?? '—'}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--danger)' }}>{m.Su}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
