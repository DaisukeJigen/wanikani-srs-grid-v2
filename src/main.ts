// import './assets/main.css'

import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
// import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App),
  MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
    primitive: {
      warning: '{yellow.500}',
    },
    semantic: {
      primary: {
        100: '{indigo.100}',
        200: '{indigo.200}',
        300: '{indigo.300}',
        400: '{indigo.400}',
        50: '{indigo.50}',
        500: '{indigo.500}',
        600: '{indigo.600}',
        700: '{indigo.700}',
        800: '{indigo.800}',
        900: '{indigo.900}',
        950: '{indigo.950}',
      },
    },
  }),
  pinia = createPinia()
// app.use(createPinia())
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    options: {
      darkModeSelector: '.dark',
    },
    preset: MyPreset,
  },
})
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
function addChangelogDiv() {
  const newSpot = document.createElement('div')
  const spotBefore = document.getElementsByClassName('dashboard__content')[0]
  newSpot.id = 'srsGridChangelog'
  newSpot.classList.add('hidden')
  if (spotBefore == null) {
    console.log('Could not find dashboard__content')
  } else {
    spotBefore.before(newSpot)
  }
}
// app.mount('.dashboard__srs-progress')
if (import.meta.env.MODE === 'development') {
  app.mount('#app')
} else {
  addNewSRSDiv()
  addChangelogDiv()
  app.mount('#SRSDivV2')
}
