import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { HoppModule } from "."

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { pinia }
export default <HoppModule>{
  onVueAppInit(app) {
    app.use(pinia)
  },
}
