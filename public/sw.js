const OFFLINE_VERSION = 1
const CACHE_NAME = 'offline'

const OFFLINE_MEDIA = [
  'manifest.json',
  '/',
  '/index.html',
  '/assets/cheese/',
  '/assets/cheese/cheese.mp3',
  '/assets/cheese/cheese.webp',
  '/assets/icons/',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/favicon/',
  '/assets/favicon/favicon-150.png',
  '/assets/favicon/favicon-144.png',
  '/assets/favicon/favicon-60.png',
  '/assets/favicon/favicon-192.png',
  '/assets/favicon/favicon-76.png',
  '/assets/favicon/favicon-152.png',
  '/assets/favicon/favicon-72.png',
  '/assets/favicon/favicon-180.png',
  '/assets/favicon/favicon-64.png',
  '/assets/favicon/favicon-70.png',
  '/assets/favicon/favicon-16.png',
  '/assets/favicon/favicon-120.png',
  '/assets/favicon/favicon-310.png',
  '/assets/favicon/favicon-114.png',
  '/assets/favicon/favicon-32.png',
  '/assets/favicon/favicon-96.png',
  '/assets/favicon/favicon-57.png',
  '/assets/favicon/favicon-160.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      let cache = await caches.open(CACHE_NAME)
      return await cache.addAll(OFFLINE_MEDIA)
    })()
  )

  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )

  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      let cache = await caches.open(CACHE_NAME)
      let cachedResposne = await cache.match(event.request)

      if (cachedResposne) {
        event.waitUntil(cache.add(event.request))
        return cachedResposne
      }

      return fetch(event.request)
    })()
  )
})
