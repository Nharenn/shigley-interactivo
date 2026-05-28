import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import ServiceWorkerInit from '@/components/providers/ServiceWorkerInit'

export const metadata: Metadata = {
  title: 'Shigley Interactivo — Diseño en Ingeniería Mecánica',
  description:
    'Los 20 capítulos del Shigley transformados en simuladores, animaciones y calculadoras. Plataforma educativa para ingeniería mecánica.',
  keywords: ['Shigley', 'diseño mecánico', 'ingeniería mecánica', 'simuladores', 'calculadoras'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Shigley',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerInit />
      </body>
    </html>
  )
}
