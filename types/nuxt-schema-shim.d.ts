import { VueFireNuxtModuleOptions } from "nuxt-vuefire";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    vuefire: VueFireNuxtModuleOptions;
  }
  interface NuxtOptions {
    vuefire: VueFireNuxtModuleOptions;
  }
}
