export default {
  modules: ['@nuxt/http'],
  buildModules: [
    '@nuxtjs/pwa',
  ],
  workbox: {
    config: {
      debug: false,
    },
    cachingExtensions: [
      'static/custom-sw.js'
    ],
    runtimeCaching: [
      {
        urlPattern: 'http://localhost:3001/reservations',
        strategyOptions: {
          cacheName: 'reservation-cache',
          cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 30000
          }
        }
      }
    ]
  }
};
