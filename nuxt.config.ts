// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  ssr: true,
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@pinia/nuxt', '@nuxt/test-utils/module'],

  shadcn: {
    prefix: '',
    componentDir: './src/components/ui/',
  },

  pinia: {
    storesDirs: ['./src/store'],
  },

  compatibilityDate: '2024-11-16',

  runtimeConfig: {
    POKE_API: process.env.POKE_API,
  },
});
