// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseURL: 'http://26.206.10.180:5205/',
    },
  },

  modules: ["@pinia/nuxt"]
})