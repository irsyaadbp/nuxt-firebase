// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["nuxt-vuefire"],
  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_FIREBASE_DB_URL,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MSG_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    },
  },
});
