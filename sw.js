const cacheName = 'mertule-v2';
const assets = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// አፑ ሲጫን ፋይሎቹን መቅበር
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching all assets...');
      return cache.addAll(assets);
    })
  );
});

// ኢንተርኔት በሌለበት ጊዜ ከቀብር (Cache) አውጥቶ ማሳየት
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).then(fetchRes => {
        return caches.open(cacheName).then(cache => {
          // አዲስ የወረዱ ፋይሎችን (PDF/Images) ለወደፊት ኦፍላይን እንዲሆኑ መቅበር
          cache.put(e.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(() => {
        // ኢንተርኔትም ከሌለ Cache ውስጥም ከሌለ የሚታይ (አማራጭ)
    })
  );
});
