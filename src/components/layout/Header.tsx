'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useIsMobile'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Moon, Sun, Download, Search, ArrowLeft } from 'lucide-react'
import SearchOverlay from '@/components/layout/SearchOverlay'

interface HeaderProps {
  onSearch?: (query: string) => void
  compact?: boolean
}

const btnStyle: React.CSSProperties = {
  width: 44, height: 44,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 'var(--radius-sm)', color: 'var(--text-2)',
  background: 'none', border: 'none', cursor: 'pointer',
  transition: 'all 0.2s',
}

export default function Header({ onSearch, compact = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useBreakpoint()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 80)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setShowOverlay(false)
    setQuery('')
    onSearch?.('')
  }

  // Close overlay when clicking outside (desktop only)
  useEffect(() => {
    if (!showOverlay || isMobile || isTablet) return
    const handler = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowOverlay(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showOverlay, isMobile])

  // Close mobile overlay on Escape
  useEffect(() => {
    if (!searchOpen || (!isMobile && !isTablet)) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen, isMobile])

  const searchField = (
    <div style={{ flex: 1, position: 'relative' }}>
      <Search
        size={14}
        style={{
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)', color: 'var(--text-3)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      <input
        ref={inputRef}
        value={query}
        onChange={handleSearch}
        onFocus={() => setShowOverlay(true)}
        placeholder="Buscar tema, ecuación o concepto..."
        style={{
          background: 'var(--bg-1)',
          border: '1px solid var(--border)',
          padding: '9px 12px 9px 34px',
          borderRadius: 999,
          width: '100%',
          fontSize: 13,
          outline: 'none',
          color: 'var(--text-1)',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
        onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
      />
    </div>
  )

  return (
    <>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'color-mix(in oklab, var(--bg-0) 80%, transparent)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border-soft)',
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center',
            gap: isMobile ? 8 : isTablet ? 12 : 20,
            padding: compact ? '10px 16px' : isMobile ? '10px 12px' : isTablet ? '10px 16px' : '14px 24px',
            maxWidth: 1440, margin: '0 auto',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontWeight: 700,
              fontSize: isMobile ? 14 : 15,
              letterSpacing: '-0.01em', color: 'var(--text-1)',
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            <GearIcon />
            {isMobile || isTablet ? 'Shigley' : 'Shigley Interactivo'}
          </Link>

          {/* Desktop search inline */}
          {!isMobile && !isTablet && (
            <div ref={overlayRef} style={{ flex: 1, maxWidth: 460, position: 'relative' }}>
              {searchField}
              {showOverlay && (
                <SearchOverlay
                  query={query}
                  onClose={() => setShowOverlay(false)}
                  inputEl={inputRef.current}
                  position="absolute"
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 4, marginLeft: 'auto', alignItems: 'center' }}>

            {/* Mobile/Tablet search toggle */}
            {(isMobile || isTablet) && (
              <button
                onClick={openSearch}
                aria-label="Buscar"
                style={btnStyle}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
              >
                <Search size={20} />
              </button>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
              style={btnStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.color = 'var(--text-1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-2)' }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Download */}
            <Link
              href="/descargar"
              title="Descargar Offline"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 6,
                width: (isMobile || isTablet) ? 44 : undefined, height: 44,
                padding: (isMobile || isTablet) ? 0 : '0 14px',
                borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500,
                color: 'var(--text-1)', border: '1px solid var(--border)',
                background: 'transparent', transition: 'all var(--transition)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <Download size={(isMobile || isTablet) ? 18 : 14} />
              {!isMobile && !isTablet && 'Descargar Offline'}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet full-screen search overlay */}
      {(isMobile || isTablet) && searchOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'var(--bg-0)',
            display: 'flex', flexDirection: 'column',
            paddingTop: 'env(safe-area-inset-top, 0px)',
          }}
        >
          {/* Top bar with close + input */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              borderBottom: '1px solid var(--border-soft)',
            }}
          >
            <button
              onClick={closeSearch}
              aria-label="Cerrar búsqueda"
              style={{
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-1)',
                background: 'none', border: 'none', cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <ArrowLeft size={22} />
            </button>
            {searchField}
          </div>

          {/* Results */}
          <div
            style={{
              flex: 1, overflowY: 'auto',
              padding: '0 12px 12px',
              paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {showOverlay && (
              <SearchOverlay
                query={query}
                onClose={closeSearch}
                inputEl={inputRef.current}
                position="static"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
