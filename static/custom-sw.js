self.addEventListener('fetch', function (event) {
  if (event.request.url.match(/localhost:3000\/\w+$/)) {
    event.respondWith(
      caches.open('page-cache').then(function (cache) {
        return cache.match('/_reservation').then(function (response) {
          return response || fetch(event.request).then(function (response) {
            cache.put('/_reservation', response.clone());
            return response;
          });
        });
      }));
  }
});
