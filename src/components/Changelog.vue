<script setup lang="ts">
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Button from 'primevue/button'
import Image from 'primevue/image'
import Message from 'primevue/message'
import Popover from 'primevue/popover'
import { onMounted, ref } from 'vue'

import { useChangelogStore } from '@/stores/changelog'
import { useIndexStore } from '@/stores/index'

// import KofiDialog from './KofiDialog.vue'
const changelogStore = useChangelogStore(),
  indexStore = useIndexStore(),
  // kd = ref()
  kofi = ref(),
  kofiToggle = (event: any) => {
    kofi.value.toggle(event)
  },
  visible = ref(true)

onMounted(() => {
  changelogStore.checkLog()
})
</script>

<template>
  <Teleport to="#srsGridChangelog">
    <!-- <KofiDialog ref="kd"></KofiDialog> -->
    <Popover ref="kofi">
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/daisukejigen/?hidefeed=true&widget=true&embed=true&preview=true"
        style="border: none; width: 100%; padding: 4px; background: #f9f9f9"
        height="712"
        title="daisukejigen"
      ></iframe>
    </Popover>
    <template v-if="changelogStore.showLog">
      <Message v-if="visible">
        <div class="header">
          <div class="title">
            <span>WaniKani SRS Grid V2 has been updated</span>
          </div>
          <div class="buttons">
            <Button @click="kofiToggle" outlined rounded>
              <Image :src="indexStore.kofiImage" alt="ko-fi" width="16" />
            </Button>
            <Button outlined rounded @click="visible = false">
              <font-awesome-icon :icon="faXmark"
            /></Button>
          </div>
        </div>
        <!-- <Button @click="changelogStore.showLog = false">X</Button> -->
        <!-- <span>{{ changelogStore.log }}</span> -->
        <ul>
          <li class="version" v-for="(version, index) in changelogStore.logSinceLast" :key="index">
            <span class="number">{{ version.version.toFixed(2) }}:</span>
            <ul>
              <li v-for="(change, index) in version.changes" :key="index">
                {{ change }}
              </li>
            </ul>
          </li>
        </ul></Message
      ></template
    >
  </Teleport>
</template>

<style scoped lang="scss">
:deep(.p-message-text) {
  width: 100%;
}
.version {
  display: flex;
  .number {
    padding-right: 10px;
  }
}
.header {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  .title {
    width: 75%;
    span {
      font-size: 2rem;
    }
  }
  .buttons {
    width: 25%;
    .p-button {
      border: none;
    }
  }
}

</style>
