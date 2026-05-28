'use client'

import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { Typewriter } from '@/components/ui/typewriter'
import {
  ChevronRight, ChevronDown, BookOpen, Monitor, PenLine, Settings, Compass, Layers,
  Activity, TrendingDown, AlertTriangle, Zap, RotateCw, Toolbox, GitMerge, Loader,
  Disc, Droplet, Octagon, Link as LinkIcon, Package, Grid, BarChart2,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  compass: Compass, layers: Layers, activity: Activity,
  'trending-down': TrendingDown, 'alert-triangle': AlertTriangle,
  zap: Zap, 'rotate-cw': RotateCw, tool: Toolbox, 'git-merge': GitMerge,
  loader: Loader, disc: Disc, droplet: Droplet,
  settings: Settings, octagon: Octagon, link: LinkIcon,
  package: Package, grid: Grid, 'bar-chart-2': BarChart2,
}
import { PARTS } from '@/data/chapters'

export default function LandingPage() {
  const [search, setSearch] = useState('')
  const [openParts, setOpenParts] = useState<Set<number>>(new Set([1]))
  const { isMobile, isTablet } = useBreakpoint()

  const togglePart = (id: number) => {
    setOpenParts((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = search.trim().toLowerCase()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }}>
      <Header onSearch={setSearch} />

      {/* Hero */}
      <section
        className="section-pad"
        style={{ position: 'relative', padding: isMobile ? '40px 16px 60px' : isTablet ? '60px 20px 80px' : '80px 24px 100px', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="hero-grid"
          style={{
            position: 'relative',
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              className="animate-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                borderRadius: 999,
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 0 4px var(--accent-soft)',
                }}
              />
              Plataforma educativa abierta · v0.1
            </div>

            <h1
              className="animate-in"
              style={{
                fontSize: 'clamp(36px, 4.4vw, 58px)',
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                marginBottom: 22,
              }}
            >
              Aprende{' '}
              <Typewriter
                text="Diseño Mecánico"
                speed={80}
                loop={false}
                showCursor={false}
                className="text-[var(--accent)]"
              />
              {' '}de forma interactiva
            </h1>

            <p
              className="animate-in"
              style={{
                fontSize: 17,
                color: 'var(--text-2)',
                lineHeight: 1.6,
                marginBottom: 28,
                maxWidth: 560,
                margin: '0 0 28px',
              }}
            >
              Los 20 capítulos del Shigley transformados en simuladores, animaciones y
              calculadoras. El mejor docente del mundo, disponible 24/7.
            </p>

            <div className="hero-btns" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10, marginBottom: 32 }}>
              <Link
                href="/capitulo/1"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 15,
                  fontWeight: 500,
                  background: 'var(--accent)',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all var(--transition)',
                  width: isMobile ? '100%' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-hover)'
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(59,130,246,0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Comenzar a aprender
                <ChevronRight size={16} />
              </Link>

              <Link
                href="/capitulo/1/slides"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--text-1)',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  textDecoration: 'none',
                  transition: 'all var(--transition)',
                  width: isMobile ? '100%' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-2)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <Monitor size={14} />
                Ver modo presentación
              </Link>
            </div>

            <div className="stat-row" style={{ display: 'flex', gap: isMobile ? 8 : 16, justifyContent: isMobile ? 'space-between' : undefined }}>
              {[
                { num: '20', label: 'Capítulos' },
                { num: '50+', label: 'Simuladores' },
                { num: '100%', label: 'Interactivo' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`stat-card animate-in-${i + 1}`}
                  style={{
                    padding: isMobile ? '10px 12px' : '14px 18px',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    flex: isMobile ? 1 : undefined,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: isMobile ? 20 : 26,
                      fontWeight: 700,
                      color: 'var(--accent)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? 10 : 12,
                      color: 'var(--text-2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ilustración de engranajes — oculta en móvil/tablet via CSS */}
          <div className="hero-illus" style={{ position: 'relative', aspectRatio: '1', maxWidth: 460, margin: '0 auto' }}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="section-pad"
        style={{
          padding: isMobile ? '48px 16px' : '80px 24px',
          borderTop: '1px solid var(--border-soft)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 10,
            }}
          >
            Metodología
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: 8 }}>¿Cómo funciona?</h2>
          <p style={{ color: 'var(--text-2)', fontSize: isMobile ? 14 : 15, marginBottom: 28 }}>
            Tres modos de aprendizaje para cualquier contexto
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {([
              {
                icon: <BookOpen size={22} />,
                title: 'Modo Lectura',
                desc: 'Contenido enriquecido con ecuaciones interactivas, diagramas animados y ejemplos paso a paso. Navega a tu ritmo.',
                href: '/capitulo/1',
              },
              {
                icon: <Monitor size={22} />,
                title: 'Modo Diapositivas',
                desc: 'Navega slide por slide. Perfecto para docentes en clase con atajos de teclado y pantalla completa.',
                href: '/capitulo/1/slides',
              },
              {
                icon: <PenLine size={22} />,
                title: 'Modo Práctica',
                desc: 'Ejercicios interactivos con feedback inmediato, calculadoras y problemas resueltos paso a paso.',
                href: '/herramientas',
              },
            ] as const).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  padding: isMobile ? 20 : 26,
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  transition: 'all var(--transition)',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = 'var(--shadow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                    background: 'var(--accent-soft)',
                    color: 'var(--accent)',
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 16,
                    marginBottom: 8,
                    color: 'var(--text-1)',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-2)', fontSize: 13.5, margin: 0, lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido del curso */}
      <section className="section-pad"
        id="contenido"
        style={{
          padding: isMobile ? '48px 16px' : isTablet ? '60px 20px' : '80px 24px',
          borderTop: '1px solid var(--border-soft)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 10,
            }}
          >
            Contenido
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: 8 }}>
            20 Capítulos del Shigley
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: isMobile ? 14 : 15, marginBottom: 28 }}>
            Del Capítulo 1 al 20, con simuladores en cada sección crítica
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PARTS.map((part) => {
              const isOpen = openParts.has(part.id)
              const filteredChapters = filtered
                ? part.chapters.filter(
                    (c) =>
                      c.title.toLowerCase().includes(filtered) ||
                      c.description.toLowerCase().includes(filtered)
                  )
                : part.chapters

              if (filtered && filteredChapters.length === 0) return null

              return (
                <div
                  key={part.id}
                  style={{
                    background: 'var(--bg-2)',
                    border: `1px solid ${isOpen ? part.color + '44' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    transition: 'border-color 0.25s',
                  }}
                >
                  <button
                    onClick={() => togglePart(part.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: isMobile ? '14px 16px' : '18px 22px',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: 48,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: isMobile ? 34 : 38,
                        borderRadius: 4,
                        background: part.color,
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--text-2)',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Parte {part.id}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 18,
                          color: 'var(--text-1)',
                          margin: 0,
                        }}
                      >
                        {part.title}
                      </h3>
                    </div>
                    <div
                      style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        color: 'var(--text-2)',
                        fontSize: 13,
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)' }}>
                        {part.chapters.length} caps
                      </span>
                      <ChevronDown
                        size={16}
                        style={{
                          transition: 'transform 0.3s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: 'var(--text-2)',
                        }}
                      />
                    </div>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? 2000 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    <div
                      style={{
                        padding: isMobile ? '4px 12px 18px' : '6px 16px 22px',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: 8,
                      }}
                    >
                      {filteredChapters.map((ch) => (
                        <Link
                          key={ch.id}
                          href={ch.ready ? `/capitulo/${ch.id}` : '#'}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12,
                            padding: isMobile ? 10 : 14,
                            border: '1px solid var(--border-soft)',
                            borderRadius: 10,
                            background: 'var(--bg-1)',
                            transition: 'all var(--transition)',
                            cursor: ch.ready ? 'pointer' : 'default',
                            textDecoration: 'none',
                            opacity: ch.ready ? 1 : 0.6,
                            minHeight: 48,
                          }}
                          onMouseEnter={(e) => {
                            if (!ch.ready) return
                            e.currentTarget.style.borderColor = part.color
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.25)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-soft)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 22,
                              fontWeight: 700,
                              lineHeight: 1,
                              color: part.color,
                              minWidth: 30,
                            }}
                          >
                            {ch.id.toString().padStart(2, '0')}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13.5,
                                fontWeight: 500,
                                color: 'var(--text-1)',
                                marginBottom: 4,
                                lineHeight: 1.35,
                              }}
                            >
                              {ch.shortTitle}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--text-3)',
                                letterSpacing: '0.05em',
                                marginBottom: 6,
                              }}
                            >
                              {ch.slides} slides
                            </div>
                            <div
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: 10,
                                borderRadius: 999,
                                background: ch.ready
                                  ? `color-mix(in srgb, ${part.color} 18%, transparent)`
                                  : 'var(--bg-3)',
                                color: ch.ready ? part.color : 'var(--text-3)',
                                letterSpacing: '0.06em',
                              }}
                            >
                              {ch.ready ? 'disponible' : 'próximamente'}
                            </div>
                            <div
                              style={{
                                marginTop: 8,
                                height: 3,
                                background: 'var(--bg-3)',
                                borderRadius: 999,
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  background: part.color,
                                  width: ch.ready ? '0%' : '0%',
                                  transition: 'width 0.4s',
                                }}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: `color-mix(in srgb, ${part.color} 12%, transparent)`,
                              color: part.color,
                              flexShrink: 0,
                            }}
                          >
                            {(() => { const Icon = ICON_MAP[ch.icon]; return Icon ? <Icon size={16} /> : <Settings size={16} /> })()}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Herramientas destacadas */}
      <section className="section-pad"
        style={{
          padding: isMobile ? '48px 16px' : isTablet ? '60px 20px' : '80px 24px',
          borderTop: '1px solid var(--border-soft)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 10,
            }}
          >
            Simuladores
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: 8 }}>
            Herramientas destacadas
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: isMobile ? 14 : 15, marginBottom: 28 }}>
            Los simuladores más importantes del diseño mecánico
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
              {FEATURED_TOOLS.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                style={{
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: isMobile ? 16 : 20,
                  transition: 'all var(--transition)',
                  display: 'flex',
                  flexDirection: isMobile ? 'row' as const : 'column' as const,
                  alignItems: isMobile ? 'center' : 'stretch',
                  gap: 14,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = 'var(--shadow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: isMobile ? 100 : '100%',
                    height: isMobile ? 70 : 110,
                    borderRadius: 8,
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {tool.preview}
                </div>
                <div style={{ flex: isMobile ? undefined : 1 }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14.5,
                      color: 'var(--text-1)',
                      marginBottom: 4,
                    }}
                  >
                    {tool.title}
                  </h4>
                  <p style={{ fontSize: 12.5, color: 'var(--text-2)', margin: 0 }}>
                    {tool.desc}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: isMobile ? undefined : 'auto',
                    color: 'var(--accent)',
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    flexShrink: 0,
                  }}
                >
                  Abrir herramienta <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="footer-pad"
        style={{
          borderTop: '1px solid var(--border-soft)',
          padding: isMobile ? '32px 16px' : isTablet ? '40px 20px' : '48px 24px',
          color: 'var(--text-2)',
          fontSize: 13,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: 14,
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ margin: '0 0 4px', color: 'var(--text-2)', fontSize: isMobile ? 12 : 13 }}>
              Basado en: <em>Diseño en Ingeniería Mecánica de Shigley</em>, 9ª Edición
            </p>
            <p style={{ margin: 0, color: 'var(--text-3)', fontSize: 11 }}>
              Contenido educativo original — No es una reproducción del libro
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/herramientas" style={{ color: 'var(--text-2)', fontSize: isMobile ? 13 : 13 }}>
              Herramientas
            </Link>
            <Link href="/referencia" style={{ color: 'var(--text-2)', fontSize: isMobile ? 13 : 13 }}>
              Referencia
            </Link>
            <Link href="/descargar" style={{ color: 'var(--text-2)', fontSize: isMobile ? 13 : 13 }}>
              Descargar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Hero illustration ─── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid)" />

      {/* Engrane grande */}
      <g style={{ animation: 'spin 28s linear infinite', transformOrigin: '155px 155px' }}>
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4">
          <circle cx="155" cy="155" r="90" />
          <circle cx="155" cy="155" r="78" />
          <circle cx="155" cy="155" r="14" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 155 + 90 * Math.sin(rad)
            const y1 = 155 - 90 * Math.cos(rad)
            const x2 = 155 + 104 * Math.sin(rad)
            const y2 = 155 - 104 * Math.cos(rad)
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="8" strokeOpacity="0.5" />
          })}
        </g>
      </g>

      {/* Engrane pequeño */}
      <g style={{ animation: 'spin 12s linear infinite reverse', transformOrigin: '293px 200px' }}>
        <g fill="none" stroke="var(--success)" strokeWidth="1.2">
          <circle cx="293" cy="200" r="48" />
          <circle cx="293" cy="200" r="40" />
          <circle cx="293" cy="200" r="8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 293 + 48 * Math.sin(rad)
            const y1 = 200 - 48 * Math.cos(rad)
            const x2 = 293 + 58 * Math.sin(rad)
            const y2 = 200 - 58 * Math.cos(rad)
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--success)" strokeWidth="6" strokeOpacity="0.5" />
          })}
        </g>
      </g>

      {/* Dimensiones técnicas */}
      <g stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.35">
        <line x1="30" y1="310" x2="280" y2="310" strokeDasharray="4 3" />
        <line x1="30" y1="305" x2="30" y2="315" />
        <line x1="280" y1="305" x2="280" y2="315" />
        <text x="155" y="325" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="var(--font-mono)" opacity="0.5">Ø 180mm</text>

        <line x1="330" y1="50" x2="330" y2="300" strokeDasharray="4 3" />
        <line x1="325" y1="50" x2="335" y2="50" />
        <line x1="325" y1="300" x2="335" y2="300" />
        <text x="350" y="180" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="var(--font-mono)" opacity="0.5" transform="rotate(90,350,180)">h = 250mm</text>
      </g>

      {/* Esfuerzos tensionales */}
      <g opacity="0.6">
        <line x1="60" y1="155" x2="30" y2="155" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrow-red)" />
        <line x1="250" y1="155" x2="280" y2="155" stroke="var(--danger)" strokeWidth="1.5" />
        <text x="18" y="150" fill="var(--danger)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.7">σx</text>
      </g>
    </svg>
  )
}

/* ─── Herramientas destacadas ─── */
const FEATURED_TOOLS = [
  {
    id: 'mohr',
    title: 'Círculo de Mohr Interactivo',
    desc: 'Calcula esfuerzos principales, cortante máximo y ángulo del plano principal',
    href: '/herramientas#mohr',
    preview: (
      <svg viewBox="0 0 200 110" width="100%" style={{ maxHeight: 90 }}>
        <line x1="10" y1="55" x2="190" y2="55" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="100" y1="10" x2="100" y2="100" stroke="var(--text-3)" strokeWidth="0.8" />
        <circle cx="100" cy="55" r="38" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="138" cy="55" r="3" fill="var(--accent)" />
        <circle cx="62" cy="55" r="3" fill="var(--accent)" />
        <circle cx="120" cy="30" r="3" fill="var(--danger)" />
        <circle cx="80" cy="80" r="3" fill="#60A5FA" />
        <line x1="120" y1="30" x2="80" y2="80" stroke="var(--text-3)" strokeWidth="0.8" />
        <text x="140" y="52" fill="var(--accent)" fontSize="8" fontFamily="monospace">σ₁</text>
        <text x="50" y="52" fill="var(--accent)" fontSize="8" fontFamily="monospace">σ₂</text>
        <text x="102" y="10" fill="var(--text-2)" fontSize="7" fontFamily="monospace">τ</text>
        <text x="185" y="52" fill="var(--text-2)" fontSize="7" fontFamily="monospace">σ</text>
      </svg>
    ),
  },
  {
    id: 'beam',
    title: 'Simulador de Vigas',
    desc: 'Calcula reacciones, cortante, momento flector y deflexión en vigas con carga puntual',
    href: '/herramientas#beam',
    preview: (
      <svg viewBox="0 0 200 110" width="100%" style={{ maxHeight: 90 }}>
        <line x1="20" y1="55" x2="180" y2="55" stroke="var(--text-2)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="50" x2="20" y2="75" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="180" y1="50" x2="180" y2="75" stroke="var(--text-2)" strokeWidth="2" />
        <line x1="110" y1="20" x2="110" y2="55" stroke="var(--danger)" strokeWidth="1.5" />
        <text x="110" y="14" fill="var(--danger)" fontSize="9" fontFamily="monospace">P</text>
        <path d="M 20 65 L 80 85 L 140 98" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
        <path d="M 20 65 L 80 85 L 140 98" fill="none" stroke="var(--warning)" strokeWidth="1.2" transform="translate(0,10)" opacity="0.4" />
        <text x="88" y="104" fill="var(--text-2)" fontSize="7" fontFamily="monospace">SFD / BMD</text>
      </svg>
    ),
  },
  {
    id: 'goodman',
    title: 'Diagrama de Goodman',
    desc: 'Analiza la resistencia a fatiga con esfuerzo medio y alternante',
    href: '/herramientas#goodman',
    preview: (
      <svg viewBox="0 0 200 110" width="100%" style={{ maxHeight: 90 }}>
        <line x1="20" y1="90" x2="185" y2="90" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="20" y1="10" x2="20" y2="95" stroke="var(--text-3)" strokeWidth="0.8" />
        <line x1="20" y1="20" x2="160" y2="90" stroke="var(--warning)" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="180" y2="90" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="5 3" />
        <circle cx="80" cy="58" r="4" fill="var(--success)" />
        <text x="22" y="18" fill="var(--warning)" fontSize="8" fontFamily="monospace">Se</text>
        <text x="162" y="88" fill="var(--warning)" fontSize="8" fontFamily="monospace">Sut</text>
        <text x="25" y="100" fill="var(--text-2)" fontSize="7" fontFamily="monospace">σm</text>
        <text x="5" y="50" fill="var(--text-2)" fontSize="7" fontFamily="monospace">σa</text>
      </svg>
    ),
  },
  {
    id: 'agma',
    title: 'Calculadora AGMA',
    desc: 'Diseño completo de engranes con todos los factores de la norma AGMA',
    href: '/herramientas#agma',
    preview: (
      <svg viewBox="0 0 200 110" width="100%" style={{ maxHeight: 90 }}>
        <g style={{ animation: 'spin 4s linear infinite', transformOrigin: '80px 55px' }}>
          <circle cx="80" cy="55" r="32" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="80" cy="55" r="8" fill="none" stroke="var(--accent)" strokeWidth="1" />
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => {
            const r = (a * Math.PI) / 180
            return <line key={a} x1={80 + 32 * Math.sin(r)} y1={55 - 32 * Math.cos(r)} x2={80 + 40 * Math.sin(r)} y2={55 - 40 * Math.cos(r)} stroke="var(--accent)" strokeWidth="5" strokeOpacity="0.6" />
          })}
        </g>
        <g style={{ animation: 'spin 2.5s linear infinite reverse', transformOrigin: '140px 55px' }}>
          <circle cx="140" cy="55" r="20" fill="none" stroke="var(--success)" strokeWidth="1.2" />
          <circle cx="140" cy="55" r="5" fill="none" stroke="var(--success)" strokeWidth="1" />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const r = (a * Math.PI) / 180
            return <line key={a} x1={140 + 20 * Math.sin(r)} y1={55 - 20 * Math.cos(r)} x2={140 + 27 * Math.sin(r)} y2={55 - 27 * Math.cos(r)} stroke="var(--success)" strokeWidth="5" strokeOpacity="0.6" />
          })}
        </g>
      </svg>
    ),
  },
]
