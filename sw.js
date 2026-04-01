//sw.js - 港保通極簡版 (不支援離線，僅滿足 PWA 安裝需求)

const CACHE_NAME = 'gangbaotong-v1';

// 安裝階段：什麼都不做，不快取任何資源
self.addEventListener('install', (event) => {
  self.skipWaiting(); // 強制跳過等待，直接激活
});

// 激活階段：清理舊的快取 (如果有的話)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // 立即使 Service Worker 取得控制權
});

// 請求階段：直接向網絡發起請求，不使用快取
self.addEventListener('fetch', (event) => {
  // 對於所有請求，直接聯網 fetch，不進行快取攔截
  event.respondWith(fetch(event.request));
});
