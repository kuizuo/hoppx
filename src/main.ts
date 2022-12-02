import { createApp } from "vue"
import { HOPP_MODULES } from "@modules/."

import "virtual:windi.css"
import "../assets/scss/themes.scss"
import "../assets/scss/styles.scss"
import "nprogress/nprogress.css"

import App from "./App.vue"

const app = createApp(App)

HOPP_MODULES.forEach((mod) => mod.onVueAppInit?.(app))

app.mount("#app")