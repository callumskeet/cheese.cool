const OFFLINE_VERSION = 2
const CACHE_NAME = 'offline'

const OFFLINE_MEDIA = [
  'manifest.json',
  '/',
  '/index.html',
  '/assets/cheese/',
  '/assets/cheese/cheese.mp3',
  '/assets/cheese/cheese.webp',
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
