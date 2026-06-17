import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Cache everything — app is self-contained, all content is in App.jsx
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Runtime cache for Supabase API (progress sync)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 }
            }
          }
        ]
      },
      manifest: {
        name: 'Curio Brief',
        short_name: 'Curio',
        description: 'Your daily 10-domain knowledge brief',
        theme_color: '#0d0d14',
        background_color: '#0d0d14',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      }
    })
  ],
  root: '.',
  build: { outDir: 'dist' }
})
