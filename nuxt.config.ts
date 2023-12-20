export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxtjs/supabase', '@nuxtjs/algolia'],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
    }
  },

  algolia: {
    instantSearch: {
      theme: 'reset'
    }
  },
})