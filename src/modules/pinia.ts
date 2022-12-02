import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { HoppModule } from "."

export default <HoppModule>{
  onVueAppInit(app) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    
    app.use(pinia)
  },
}
