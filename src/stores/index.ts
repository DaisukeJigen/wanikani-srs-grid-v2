import { defineStore } from 'pinia'
// import axios from '@/axios/axios-'
import { ref, computed } from 'vue'

export const useIndexStore = defineStore('index', () => {
  // #region State
  const srsGridLoaded = ref(false)
  const scriptName = 'SRS Grid V2'
  const scriptId = 'srsGrid'
  const loadingCount = ref(0)
  const apiKey = ref('')
  const levels = ref({
      locked: [-1],
      initiate: [0],
      apprentice: [1, 2, 3, 4],
      guru: [5, 6],
      master: [7],
      enlightened: [8],
      burned: [9],
    }),
    kofiImage =
      'data:image/webp;base64,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'

  const types = ref({
    radical: 'Radicals',
    kanji: 'Kanji',
    vocabulary: 'Vocabulary',
    kana_vocabulary: 'Kana Vocab',
  })
  // const data = ref([])
  // #endregion

  // #region Actions
  // async function fetch() {
  //     data.value = []
  //     loadingCount.value += 1
  //     return axios
  //         .get('', {})
  //         .then((ret: any) => {
  //             data.value = ret.data
  //             loadingCount.value -= 1
  //         })
  //         .catch((error: any) => {
  //             loadingCount.value -= 1
  //             throw error
  //         })
  // }
  // #endregion

  // #region Getters
  const loading = computed(() => loadingCount.value > 0)
  // #endregion

  return { loading, apiKey, levels, types, srsGridLoaded, scriptName, scriptId, kofiImage }
})
