// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js',
    cssPath: '~/assets/css/botanical.css',
    exposeConfig: false,
    injectPosition: 'first',
  },

  image: {
    // Fast image handling: optimized provider with presets
    provider: 'ipx',
    ipx: {
      baseURL: '/',
    },
    presets: {
      product: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 85,
        },
      },
      thumb: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 80,
          width: 400,
          height: 400,
        },
      },
      hero: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 90,
        },
      },
      arch: {
        modifiers: {
          fit: 'cover',
          format: 'webp',
          quality: 85,
        },
      },
    },
  },

  site: {
    url: 'https://nuvana-jewellery.example.com',
    name: 'Nuvana Jewellery',
  },

  sitemap: {
    sources: [
      '/api/_sitemap',
    ],
  },

  app: {
    head: {
      title: 'Nuvana Jewellery — Handcrafted Botanical Jewellery',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Handcrafted botanical jewellery inspired by the garden. Necklaces, earrings, rings and brooches in cream, forest green and clay tones.' },
        { name: 'theme-color', content: '#f5efdf' },
        { property: 'og:site_name', content: 'Nuvana Jewellery' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_GB' },
        { property: 'og:description', content: 'Handcrafted botanical jewellery inspired by the garden.' },
        { property: 'og:image', content: 'https://images.unsplash.com/photo-1612167677728-4f9903d69bb4?q=80&w=1200&h=630&fit=crop' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@nuvana' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap',
        },
      ],
    },
  },
})
