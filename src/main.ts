// import './assets/main.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App),
  pinia = createPinia()
// app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// app.mount('#app')
function addNewSRSDiv() {
  const newSpot = document.createElement('div')
  const spotBefore = document.getElementById('turbo-body')
  newSpot.id = 'SRSDivV2'
  if (spotBefore == null) {
    console.log('turbo-body not found')
  } else {
    spotBefore.after(newSpot)
  }
}
// app.mount('.dashboard__srs-progress')
if (import.meta.env.MODE === 'development') {
  app.mount('#app')
} else {
  addNewSRSDiv()
  app.mount('#SRSDivV2')
}
