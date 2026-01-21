<script setup lang="ts">
import { faCircleQuestion, faComments } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { cloneDeep } from 'es-toolkit'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import Image from 'primevue/image'
import Popover from 'primevue/popover'
import Select from 'primevue/select'
import { ref, onMounted, watch } from 'vue'

import type { iSettings } from '@/interfaces/settings'

import { cSettings } from '@/classes/settings'
import { useIndexStore } from '@/stores'
import { useSettingsStore } from '@/stores/settings'

const data = ref<iSettings>(new cSettings(null)),
  indexStore = useIndexStore(),
  settingsStore = useSettingsStore()
const kofi = ref()
const kofiToggle = (event: any) => {
  kofi.value.toggle(event)
}
onMounted(() => {})

watch(
  () => settingsStore.settingsVisible,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (newValue: any, oldValue: any) => {
    if (newValue) {
      data.value = cloneDeep(settingsStore.settings)
    }
  },
)
</script>

<template>
  <Popover ref="kofi">
    <iframe
      id="kofiframe"
      src="https://ko-fi.com/daisukejigen/?hidefeed=true&widget=true&embed=true&preview=true"
      style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
      height="712"
      title="daisukejigen"
    ></iframe>
  </Popover>
  <Dialog
    v-model:visible="settingsStore.settingsVisible"
    modal
    :header="indexStore.scriptName + ' Settings'"
    id="dlgSettings"
  >
    <div>
      <ul>
        <li>
          <Checkbox v-model="data.initiate" binary inputId="chkInitiate"></Checkbox
          ><label for="chkInitiate">Show Initiate</label>
        </li>
        <li>
          <label for="ddlBreakdownMode">Breakdown Mode</label>
          <Select
            v-model="data.breakdownMode"
            :options="[
              { text: 'None', value: 0 },
              { text: 'Same Row', value: 1 },
              { text: 'Own Row', value: 2 },
            ]"
            optionLabel="text"
            optionValue="value"
            id="ddlBreakdownMode"
          ></Select>
        </li>
      </ul>
    </div>
    <div class="buttons">
      <!-- <Avatar
        image="https://storage.ko-fi.com/cdn/logomarkLogo.png"
        shape="circle"
        @click="
          () => {
            //@ts-ignore
            window.open('https://ko-fi.com/daisukejigen', '_blank').focus()
          }
        "
      /> -->
      <Button @click="kofiToggle" outlined rounded
        ><Image :src="indexStore.kofiImage" alt="ko-fi" width="16"
      /></Button>
      <Button
        href="https://community.wanikani.com/t/userscript-wanikani-srs-grid-v2/72433"
        target="_blank"
        outlined
        rounded
        as="a"
        ><font-awesome-icon id="iconComments" :icon="faComments"
      /></Button>
      <Button id="btnCancel" @click="settingsStore.settingsVisible = false">Cancel</Button>
      <Button
        id="btnSave"
        @click="
          () => {
            settingsStore.settings = data
            settingsStore.settingsVisible = false
            // settingsStore.adjustClasses()
          }
        "
        >Save</Button
      >
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
ul {
  li {
    padding-top: 5px;
    padding-bottom: 5px;
    .p-checkbox {
      margin-right: 5px;
    }
    .p-select {
      margin-left: 10px;
    }
  }
}
.buttons {
  padding-top: 10px;
}
</style>
