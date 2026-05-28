const CACHE = 'shigley-v3'

const PRECACHE = [
  '/',
  '/capitulo/1', '/capitulo/2', '/capitulo/3', '/capitulo/4',
  '/capitulo/5', '/capitulo/6', '/capitulo/7', '/capitulo/8',
  '/capitulo/9', '/capitulo/10', '/capitulo/11', '/capitulo/12',
  '/capitulo/13', '/capitulo/14', '/capitulo/15', '/capitulo/16',
  '/capitulo/17', '/capitulo/18', '/capitulo/19', '/capitulo/20',
  '/capitulo/1/slides', '/capitulo/2/slides', '/capitulo/3/slides', '/capitulo/4/slides',
  '/capitulo/5/slides', '/capitulo/6/slides', '/capitulo/7/slides', '/capitulo/8/slides',
  '/capitulo/9/slides', '/capitulo/10/slides', '/capitulo/11/slides', '/capitulo/12/slides',
  '/capitulo/13/slides', '/capitulo/14/slides', '/capitulo/15/slides', '/capitulo/16/slides',
  '/capitulo/17/slides', '/capitulo/18/slides', '/capitulo/19/slides', '/capitulo/20/slides',
  '/herramientas', '/referencia', '/descargar',
  '/manifest.json', '/icon.svg',
]

self.addEventListener('install', e => {
  self.skipWaiting()
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  const url = new URL(e.request.url)
  if (!['http:', 'https:'].includes(url.protocol)) return

  // Network-first for HTML/navigation, cache-first for assets
  const isNavigation = e.request.mode === 'navigate'

  if (isNavigation) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const clone = r.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
          return r
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('/')))
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached
        return fetch(e.request).then(r => {
          if (r.ok) {
            const clone = r.clone()
            caches.open(CACHE).then(c => c.put(e.request, clone))
          }
          return r
        })
      })
    )
  }
})
