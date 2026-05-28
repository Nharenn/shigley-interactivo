'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SEARCH_INDEX, type SearchEntry } from '@/data/searchIndex'
import { BookOpen, Wrench, Hash, ChevronRight } from 'lucide-react'

interface SearchOverlayProps {
  query: string
  onClose: () => void
  inputEl: HTMLInputElement | null
  position?: 'absolute' | 'static'
}

const TYPE_CONFIG = {
  capitulo: { icon: BookOpen, label: 'Capítulos' },
  seccion: { icon: Hash, label: 'Secciones' },
  herramienta: { icon: Wrench, label: 'Herramientas' },
  referencia: { icon: BookOpen, label: 'Referencia' },
}

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <span key={i} style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 600, borderRadius: 2 }}>{part}</span>
      : part
  )
}

export default function SearchOverlay({ query, onClose, inputEl, position = 'absolute' }: SearchOverlayProps) {
  const router = useRouter()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim().toLowerCase()

  const results = trimmed
    ? SEARCH_INDEX.filter((entry) =>
        entry.title.toLowerCase().includes(trimmed) ||
        (entry.subtitle && entry.subtitle.toLowerCase().includes(trimmed)) ||
        entry.keywords.some((k) => k.toLowerCase().includes(trimmed))
      ).slice(0, 12)
    : []

  const grouped = results.reduce<Record<string, SearchEntry[]>>((acc, entry) => {
    ;(acc[entry.type] = acc[entry.type] || []).push(entry)
    return acc
  }, {})

  const flatResults = Object.entries(grouped).flatMap(([, entries]) => entries)

  const handleSelect = useCallback((entry: SearchEntry) => {
    onClose()
    router.push(entry.href)
  }, [onClose, router])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        inputEl?.focus()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx((prev) => Math.min(prev + 1, flatResults.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'Enter' && flatResults[selectedIdx]) {
        e.preventDefault()
        handleSelect(flatResults[selectedIdx])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, flatResults, selectedIdx, handleSelect, inputEl])

  useEffect(() => {
    if (position !== 'absolute') return
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, position])

  if (!trimmed || flatResults.length === 0) return null

  let idx = -1

  const isStatic = position === 'static'

  return (
    <div
      ref={overlayRef}
      style={{
        position: isStatic ? 'static' : 'absolute',
        top: isStatic ? undefined : 'calc(100% + 8px)',
        left: isStatic ? undefined : 0,
        right: isStatic ? undefined : 0,
        background: 'var(--bg-1)',
        border: isStatic ? 'none' : '1px solid var(--border)',
        borderRadius: isStatic ? 0 : 'var(--radius)',
        boxShadow: isStatic ? 'none' : '0 12px 40px rgba(0,0,0,0.5)',
        maxHeight: isStatic ? 'none' : 480,
        overflow: 'hidden',
        zIndex: isStatic ? undefined : 100,
      }}
    >
      <div
        ref={listRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: 480,
        }}
      >
        {Object.entries(grouped).map(([type, entries]) => {
          const config = TYPE_CONFIG[type as keyof typeof TYPE_CONFIG]
          const Icon = config.icon
          return (
            <div key={type}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px 6px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                <Icon size={12} />
                {config.label}
              </div>
              {entries.map((entry) => {
                idx++
                const isSelected = idx === selectedIdx
                return (
                  <button
                    key={`${entry.type}-${entry.href}-${entry.title}`}
                    onClick={() => handleSelect(entry)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 16px',
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      background: isSelected ? 'var(--bg-2)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.1s',
                      borderLeft: entry.partColor ? `3px solid ${isSelected ? entry.partColor : 'transparent'}` : '3px solid transparent',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: 'var(--text-1)',
                          lineHeight: 1.35,
                          marginBottom: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {highlightMatch(entry.title, trimmed)}
                      </div>
                      {entry.subtitle && (
                        <div
                          style={{
                            fontSize: 11.5,
                            color: 'var(--text-3)',
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {highlightMatch(entry.subtitle, trimmed)}
                        </div>
                      )}
                    </div>
                    <ChevronRight
                      size={14}
                      style={{
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        opacity: isSelected ? 1 : 0.4,
                      }}
                    />
                  </button>
                )
              })}
            </div>
          )
        })}
        {flatResults.length > 0 && (
          <div
            style={{
              padding: '8px 16px',
              fontSize: 11,
              color: 'var(--text-3)',
              fontFamily: 'var(--font-mono)',
              borderTop: '1px solid var(--border-soft)',
              textAlign: 'center',
            }}
          >
            {flatResults.length} resultado{flatResults.length !== 1 ? 's' : ''} · Usa ↑↓ para navegar, Enter para abrir
          </div>
        )}
      </div>
    </div>
  )
}
