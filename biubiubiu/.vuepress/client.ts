import { defineClientConfig } from "@vuepress/client";
import Snowfall from "./components/Snowfall.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("Snowfall", Snowfall);
  },
})

