'use client'

import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { Download, Wifi, BookOpen, CheckCircle } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function DescargarPage() {
  const { isMobile, isTablet } = useBreakpoint()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [pwaInstalled, setPwaInstalled] = useState(false)
  const [pwaStatus, setPwaStatus] = useState<'idle' | 'installed' | 'unavailable'>('idle')

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled(true)
      setPwaStatus('installed')
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setPwaInstalled(true)
      setPwaStatus('installed')
      setDeferredPrompt(null)
    })

    // After 3 seconds without prompt, mark as unavailable (e.g. already installed, Firefox, etc.)
    const t = setTimeout(() => {
      setDeferredPrompt(prev => {
        if (!prev) setPwaStatus('unavailable')
        return prev
      })
    }, 3000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(t)
    }
  }, [])

  const handlePWAInstall = async () => {
    if (pwaInstalled) return
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setPwaInstalled(true)
        setPwaStatus('installed')
      }
      setDeferredPrompt(null)
    } else {
      // Fallback instructions
      alert(
        'Para instalar la PWA:\n\n' +
        '• Chrome/Edge: menú (⋮) → "Instalar app" o icono ⊕ en la barra de dirección\n' +
        '• Safari (iOS): botón Compartir → "Añadir a pantalla de inicio"\n' +
        '• Firefox: no soporta instalación de PWA\n\n' +
        'Si ya está instalada, ábrela desde tu pantalla de inicio.'
      )
    }
  }

  const PWA_LABEL = pwaInstalled
    ? 'Instalada'
    : deferredPrompt
      ? 'Instalar PWA'
      : pwaStatus === 'unavailable'
        ? 'Ver instrucciones'
        : 'Instalar PWA'

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: isMobile ? '32px 16px' : isTablet ? '40px 20px' : '60px 24px', maxWidth: 800, margin: '0 auto' }}>
        {!isMobile && !isTablet && (
          <nav style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'var(--font-mono)', marginBottom: 32 }}>
            <Link href="/" style={{ color: 'var(--text-2)' }}>Inicio</Link>
            <span style={{ color: 'var(--text-3)', margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-1)' }}>Descargar</span>
          </nav>
        )}

        <h1 style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Descargar para uso <span style={{ color: 'var(--accent)' }}>Offline</span>
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 40 }}>
          Dos formas de acceder a la plataforma sin conexión a internet
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 16 }}>

          {/* PWA */}
          <div style={{
            display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? 12 : 20, alignItems: 'center',
            padding: isMobile ? 16 : 24,
            paddingBottom: isMobile ? 12 : 24,
            background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          }}>
            <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 12, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {pwaInstalled ? <CheckCircle size={isMobile ? 20 : 24} /> : <Wifi size={isMobile ? 20 : 24} />}
            </div>
            <div style={{ flex: 1, minWidth: isMobile ? 'calc(100% - 56px)' : 'auto' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? 14 : 16 }}>Progressive Web App (PWA)</h3>
                <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontFamily: 'var(--font-mono)', background: 'color-mix(in srgb, var(--accent) 18%, transparent)', color: 'var(--accent)' }}>
                  {pwaInstalled ? 'Instalada ✓' : 'Recomendado'}
                </span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-2)', fontSize: isMobile ? 13 : 13.5, lineHeight: 1.55 }}>
                Instala la app en tu dispositivo. Funciona offline completo con actualizaciones automáticas.
                {pwaStatus === 'unavailable' && !pwaInstalled && (
                  <span style={{ display: 'block', marginTop: 4, color: 'var(--text-3)', fontSize: 12 }}>
                    Si el botón no activa la instalación, usa el menú de tu navegador (⋮ → Instalar app).
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handlePWAInstall}
              disabled={pwaInstalled}
              style={{
                padding: '12px 18px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500, minHeight: 44,
                background: pwaInstalled ? 'color-mix(in srgb, var(--success) 12%, transparent)' : 'color-mix(in srgb, var(--accent) 12%, transparent)',
                color: pwaInstalled ? 'var(--success)' : 'var(--accent)',
                border: `1px solid ${pwaInstalled ? 'var(--success)' : 'var(--accent)'}`,
                cursor: pwaInstalled ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, width: isMobile ? '100%' : 'auto', flexShrink: 0,
              }}
            >
              {pwaInstalled ? <CheckCircle size={14} /> : <Download size={14} />}
              {PWA_LABEL}
            </button>
          </div>

          {/* Libro Shigley */}
          <div style={{
            display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? 12 : 20, alignItems: 'center',
            padding: isMobile ? 16 : 24,
            paddingBottom: isMobile ? 12 : 24,
            background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          }}>
            <div style={{ width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: 12, background: 'color-mix(in srgb, var(--success) 12%, transparent)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={isMobile ? 20 : 24} />
            </div>
            <div style={{ flex: 1, minWidth: isMobile ? 'calc(100% - 56px)' : 'auto' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? 14 : 16 }}>Libro Shigley (PDF)</h3>
                <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontFamily: 'var(--font-mono)', background: 'color-mix(in srgb, var(--success) 18%, transparent)', color: 'var(--success)' }}>
                  Referencia
                </span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-2)', fontSize: isMobile ? 13 : 13.5, lineHeight: 1.55 }}>
                Shigley's Mechanical Engineering Design — 10ª edición completa. Referencia para todos los capítulos de la plataforma.
              </p>
            </div>
            <a
              href="/shigley.pdf"
              download="Shigley-Diseno-Mecanico-10e.pdf"
              style={{
                padding: '12px 18px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500,
                minHeight: 44, justifyContent: 'center',
                background: 'color-mix(in srgb, var(--success) 12%, transparent)',
                color: 'var(--success)',
                border: '1px solid var(--success)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, width: isMobile ? '100%' : 'auto',
                textDecoration: 'none',
              }}
            >
              <Download size={14} />
              Descargar libro
            </a>
          </div>

        </div>

        {/* Nota PWA offline */}
        <div style={{ marginTop: isMobile ? 32 : 40, padding: isMobile ? '12px 16px' : '16px 20px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-2)', border: '1px solid var(--border)', fontSize: isMobile ? 12.5 : 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>¿Cómo funciona offline?</span>
          {' '}Una vez instalada la PWA, el service worker almacena en caché todos los capítulos al visitarlos.
          La siguiente vez que abras la app sin internet, la versión guardada estará disponible automáticamente.
        </div>
      </div>
    </div>
  )
}
