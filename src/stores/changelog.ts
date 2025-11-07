import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface iChange {
  changes: string[]
  version: number
}

export const useChangelogStore = defineStore(
  'changelog',
  () => {
    // #region State
    const currentVersion = ref(0.1),
      lastLoadedVersion = ref(0),
      log = ref<iChange[]>([
        {
          changes: ['Updated to work with the new dashboard'],
          version: 0.1,
        },
      ]),
      showLog = ref(false),
      showSince = ref(0)
    // #endregion

    // #region Actions
    function checkLog() {
      // lastLoadedVersion.value = 1.0
      showLog.value = currentVersion.value > lastLoadedVersion.value && lastLoadedVersion.value > 0
      showSince.value = lastLoadedVersion.value
      lastLoadedVersion.value = currentVersion.value
      const div = document.getElementById('srsGridChangelog')
      if (showLog.value && logSinceLast.value.length > 0) {
        if (div?.classList.contains('hidden')) {
          div?.classList.remove('hidden')
        }
        // } else {
        //   if (!div?.classList.contains('hidden')) {
        //     div?.classList.add('hidden')
        //   }
      }
    }
    // #endregion

    // #region Getters
    const logSinceLast = computed(() =>
      log.value.filter((i: iChange) => i.version > showSince.value),
    )
    // #endregion

    return { checkLog, lastLoadedVersion, log, logSinceLast, showLog }
  },
  {
    persist: {
      key: 'WaniKaniSRSGrid',
      pick: ['lastLoadedVersion'],
    },
  },
)
