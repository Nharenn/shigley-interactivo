'use client'
import { PDF_CHAPTERS, PARTS_META } from '@/data/pdfContent'

export default function ImprimirPage() {
  return (
    <>
      <style>{`
        @media screen {
          :root { --bg: #0F1117; --text: #E8EAF0; --text2: #9CA3AF; }
          .print-btn {
            position: fixed; top: 16px; right: 16px; z-index: 100;
            padding: 10px 20px; background: #3B82F6; color: #fff;
            border: none; border-radius: 8px; cursor: pointer;
            font-family: system-ui, sans-serif; font-size: 14px; font-weight: 600;
            display: flex; align-items: center; gap: 8px;
          }
          .print-btn:hover { background: #2563EB; }
          .page-wrap { max-width: 900px; margin: 0 auto; padding: 20px 24px 60px; }
          .cover-s { text-align: center; padding: 80px 0 40px; border-bottom: 1px solid #222; margin-bottom: 48px; }
          .toc-s { margin-bottom: 48px; }
          .toc-s h2 { font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: #9CA3AF; margin-bottom: 24px; }
          .toc-part { margin-bottom: 20px; }
          .toc-part-title { font-weight: 700; font-size: 14px; margin-bottom: 6px; }
          .toc-chapter { font-size: 13px; color: #9CA3AF; padding: 3px 0 3px 24px; }
          .part-divider-s {
            text-align: center; padding: 60px 0; margin-bottom: 48px;
            border: 1px solid #222; border-radius: 12px; background: #13151A;
          }
          .part-divider-s .part-num { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #9CA3AF; margin-bottom: 12px; }
          .part-divider-s .part-title { font-size: 24px; font-weight: 800; }
          .chapters-section-s { display: flex; flex-direction: column; gap: 36px; margin-bottom: 48px; }
          .chapter-s { border: 1px solid #222; border-radius: 10px; overflow: hidden; background: #13151A; }
          .chapter-header-s { padding: 14px 18px; display: flex; align-items: center; gap: 14px; }
          .chapter-header-s .num-badge {
            width: 36px; height: 36px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-weight: 800; font-size: 13px; flex-shrink: 0;
          }
          .chapter-header-s h2 { font-size: 16px; margin: 0; color: #fff; }
          .sections-s { padding: 16px 18px; display: flex; flex-direction: column; gap: 16px; }
          .section-s { }
          .section-title-s { font-family: var(--font-mono); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
          .formula-box-s {
            background: #0A0C12; border-radius: 6px; padding: 10px 14px; margin-bottom: 8px;
            border-left: 3px solid;
            font-family: 'Courier New', monospace; font-size: 12px;
            white-space: pre-wrap; line-height: 1.6;
          }
          .section-items-s { font-size: 12.5px; line-height: 1.6; color: #9CA3AF; }
          .section-items-s p { margin: 0 0 3px; }
        }
        @media print {
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
          @page { size: A4; margin: 20mm 18mm 22mm; }
          @page :first { margin-top: 0; }
          @page { @bottom-center { content: counter(page); font-family: 'Courier New', monospace; font-size: 7pt; color: #aaa; } }
          body { background: #fff !important; color: #000 !important; font-family: 'Times New Roman', Times, serif; font-size: 9.5pt; line-height: 1.45; }
          .print-btn { display: none !important; }
          .page-wrap { max-width: none; padding: 0; }

          .cover-s { display: none !important; }
          .cover-p {
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            height: 100vh; text-align: center; page-break-after: always;
          }
          .cover-p .eyebrow { font-family: 'Courier New', monospace; font-size: 10pt; letter-spacing: 0.2em; text-transform: uppercase; color: #666; margin-bottom: 20pt; }
          .cover-p h1 { font-size: 32pt; font-weight: 900; letter-spacing: -0.5pt; margin: 0 0 10pt; color: #000; }
          .cover-p .subtitle { font-size: 16pt; margin-bottom: 6pt; }
          .cover-p .desc { font-size: 10pt; color: #888; margin-bottom: 40pt; }
          .cover-p .line { width: 50pt; height: 1pt; background: #000; margin: 0 auto 20pt; }
          .cover-p .edition { font-family: 'Courier New', monospace; font-size: 8pt; color: #aaa; }

          .toc-p { page-break-after: always; padding-top: 10mm; }
          .toc-p h2 { font-family: 'Courier New', monospace; font-size: 11pt; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 20pt; border-bottom: 0.5pt solid #ddd; padding-bottom: 6pt; }
          .toc-part { margin-bottom: 14pt; }
          .toc-part-title { font-weight: 700; font-size: 10pt; margin-bottom: 3pt; }
          .toc-chapter { font-size: 9pt; color: #555; padding-left: 14pt; line-height: 1.6; }

          .part-divider-p {
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            height: 100vh; text-align: center; page-break-before: always; page-break-after: always;
          }
          .part-divider-p .bar { width: 40pt; height: 3pt; margin-bottom: 20pt; }
          .part-divider-p .part-num { font-family: 'Courier New', monospace; font-size: 9pt; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin-bottom: 8pt; }
          .part-divider-p .part-title { font-size: 24pt; font-weight: 900; margin: 0; }
          .part-divider-p .chapters-list { font-size: 9pt; color: #888; margin-top: 14pt; }

          .chapter-p { page-break-inside: avoid; margin-bottom: 18pt; }
          .chapter-header-p {
            padding: 8pt 12pt; border-radius: 3pt 3pt 0 0;
            display: flex; align-items: center; gap: 10pt;
          }
          .chapter-header-p .num-badge {
            width: 26pt; height: 26pt; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-weight: 800; font-size: 10pt; flex-shrink: 0;
          }
          .chapter-header-p h2 { font-size: 11pt; margin: 0; color: #fff; }

          .sections-p { border: 0.5pt solid #ddd; border-top: none; padding: 10pt 12pt; border-radius: 0 0 3pt 3pt; }
          .section-p { margin-bottom: 10pt; }
          .section-p:last-child { margin-bottom: 0; }
          .section-title-p { font-family: 'Courier New', monospace; font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #333; margin-bottom: 3pt; }
          .formula-box-p {
            font-family: 'Courier New', monospace; font-size: 8pt;
            padding: 4pt 8pt; margin: 3pt 0;
            border-left: 2pt solid; color: #222 !important;
            line-height: 1.5; white-space: pre-wrap;
          }
          .section-body-p { font-size: 8pt; line-height: 1.45; color: #444; }
          .section-body-p p { margin: 0 0 1.5pt; }


        }
      `}</style>

      <button className="print-btn" onClick={() => window.print()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Guardar PDF
      </button>

      <div className="page-wrap">

        {/* ── PORTADA (screen) ── */}
        <div className="cover-s">
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16, color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>Referencia rápida</div>
          <h1 style={{ fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 10, color: '#fff' }}>Shigley Interactivo</h1>
          <div style={{ fontSize: 18, color: '#3B82F6', marginBottom: 6 }}>Diseño en Ingeniería Mecánica</div>
          <p style={{ color: '#9CA3AF', fontSize: 13 }}>Fórmulas y conceptos clave — 20 capítulos</p>
          <div style={{ margin: '28px auto', width: 48, height: 2, background: '#3B82F6', borderRadius: 2 }} />
          <p style={{ color: '#6B7280', fontSize: 11, fontFamily: 'var(--font-mono)' }}>Shigley&apos;s Mechanical Engineering Design · 10ª edición</p>
        </div>

        {/* ── PORTADA (print) ── */}
        <div className="cover-p">
          <div className="eyebrow">Referencia rápida</div>
          <h1>Shigley Interactivo</h1>
          <div className="subtitle" style={{ color: '#3B82F6' }}>Diseño en Ingeniería Mecánica</div>
          <div className="desc">Fórmulas y conceptos clave de los 20 capítulos</div>
          <div className="line" style={{ background: '#3B82F6' }} />
          <div className="edition">Shigley&apos;s Mechanical Engineering Design · 10.ª edición</div>
        </div>

        {/* ── TABLA DE CONTENIDOS (screen) ── */}
        <div className="toc-s">
          <h2>Contenido</h2>
          {PARTS_META.map(p => (
            <div key={p.id} className="toc-part">
              <div className="toc-part-title" style={{ color: p.color }}>
                Parte {p.id} — {p.title}
              </div>
              {PDF_CHAPTERS.filter(c => p.chapters.includes(c.n)).map(c => (
                <div key={c.n} className="toc-chapter">
                  Capítulo {c.n}. {c.title}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── TABLA DE CONTENIDOS (print) ── */}
        <div className="toc-p">
          <h2>Contenido</h2>
          {PARTS_META.map(p => (
            <div key={p.id} className="toc-part">
              <div className="toc-part-title" style={{ color: p.color }}>
                Parte {p.id} — {p.title}
              </div>
              {PDF_CHAPTERS.filter(c => p.chapters.includes(c.n)).map(c => (
                <div key={c.n} className="toc-chapter">
                  Capítulo {c.n}. {c.title}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── PARTES Y CAPÍTULOS ── */}
        {PARTS_META.map(p => (
          <div key={p.id}>

            {/* Divider (screen) */}
            <div className="part-divider-s">
              <div className="part-num">Parte {p.id}</div>
              <div className="part-title" style={{ color: p.color }}>{p.title}</div>
            </div>

            {/* Divider (print) */}
            <div className="part-divider-p">
              <div className="bar" style={{ background: p.color }} />
              <div className="part-num">Parte {p.id}</div>
              <div className="part-title" style={{ color: p.color }}>{p.title}</div>
              <div className="chapters-list">
                {PDF_CHAPTERS.filter(c => p.chapters.includes(c.n)).map(c => c.title).join(' · ')}
              </div>
            </div>

            {/* Chapters */}
            <div className="chapters-section-s">
              {PDF_CHAPTERS.filter(c => p.chapters.includes(c.n)).map(cap => (
                <div key={cap.n} className="chapter-s">

                  {/* Chapter header (screen) */}
                  <div className="chapter-header-s" style={{ background: cap.color }}>
                    <div className="num-badge" style={{ background: 'rgba(255,255,255,0.2)' }}>{cap.n}</div>
                    <h2>{cap.title}</h2>
                  </div>

                  {/* Chapter header (print) */}
                  <div className="chapter-header-p" style={{ background: cap.color }}>
                    <div className="num-badge" style={{ background: 'rgba(255,255,255,0.2)' }}>{cap.n}</div>
                    <h2>Capítulo {cap.n}. {cap.title}</h2>
                  </div>

                  {/* Sections (screen) */}
                  <div className="sections-s">
                    {cap.sections.map((sec, i) => (
                      <div key={i} className="section-s">
                        <div className="section-title-s" style={{ color: cap.color }}>{sec.title}</div>
                        {sec.formula && (
                          <div className="formula-box-s" style={{ borderLeftColor: cap.color }}>
                            {sec.formula}
                          </div>
                        )}
                        <div className="section-items-s">
                          {sec.items.map((item, j) => <p key={j}>{item}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sections (print) */}
                  <div className="sections-p">
                    {cap.sections.map((sec, i) => (
                      <div key={i} className="section-p">
                        <div className="section-title-p" style={{ color: cap.color }}>{sec.title}</div>
                        {sec.formula && (
                          <div className="formula-box-p" style={{ borderLeftColor: cap.color }}>
                            {sec.formula}
                          </div>
                        )}
                        <div className="section-body-p">
                          {sec.items.map((item, j) => <p key={j}>{item}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}


      </div>
    </>
  )
}
