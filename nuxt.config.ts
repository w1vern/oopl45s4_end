// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: {
      baseURL: 'http://26.206.10.180:5205/',
    },
  },
  vite: {
    define: {
      global: "window"
    }
  },
  modules: ["@pinia/nuxt"]
})