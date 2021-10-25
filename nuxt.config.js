export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "RAKU RAKU EC",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  //ここにfirebaseとveeValidateをいれる
  plugins: [
    { src: "~/plugins/swiper.ts", ssr: false },
    { src: "~/plugins/veeValidate" },
    { src: "~/plugins/firebase.ts" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  //コンポーネントの呼び出し
  components: [
    {
      path: "@/components",
      pathPrefix: false
    }
  ],
  vuex: false,
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient, isServer }) {
      if (isServer) {
        config.externals = {
          "@firebase/app": "commonjs @firebase/app",
          "@firebase/firestore": "commonjs @firebase/firestore",
          "@firebase/storage": "commonjs @firebase/storage",
          "@firebase/auth": "commonjs @firebase/auth"
          //etc...
        };
      }
    },
    transpile: ["vee-validate"]
  }
};
