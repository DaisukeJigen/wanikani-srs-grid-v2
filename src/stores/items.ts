import values from 'lodash/values'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { iItem } from '@/interfaces/items'
declare const wkof: any

export const useItemsStore = defineStore('items', () => {
  // #region State
  const loadingCount = ref(0)
  const items = ref<iItem[]>([])
  // #endregion

  // #region Actions
  async function getItems() {
    wkof.ItemData.get_items('subjects,assignments').then(processItems) //.then(srsGridStyling);
  }

  async function processItems(i: any) {
    if (i.length == 0) console.log('processItems Error: No items found')
    items.value = i
  }
  // #endregion

  // #region Getters
  const loading = computed(() => loadingCount.value > 0)
  const getCountForTypeAndLevel = (type: string, level: number[]) => {
    // const u = values(level)
    if (items.value.length == 0) {
      console.log('getCountForTypeAndLevel Error: No items found')
      return 0
    }
    let x = items.value.filter((i: iItem) => i.object == type)
    x = x.filter((i: iItem) => i.assignments != undefined)
    if (level.includes(-1)) {
      x = x.filter((i: iItem) => ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(i.assignments?.srs_stage))
    } else {
      x = x.filter((i: iItem) => level.includes(i.assignments?.srs_stage))
    }
    return x == undefined ? 0 : x.length
  }
  const getCountForLevel = (level: number[]) => {
    // const u = values(level)
    if (items.value.length == 0) {
      console.log('getCountForLevel Error: No items found')
      return 0
    }
    let x = items.value.filter((i: iItem) => i.assignments != undefined)
    if (level.includes(-1)) {
      x = x.filter((i: iItem) => ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(i.assignments?.srs_stage))
    } else {
      x = items.value.filter((i: iItem) => level.includes(i.assignments?.srs_stage))
    }
    return x == undefined ? 0 : x.length
  }
  const itemsCount = computed(() => items.value.length)
  // #endregion

  return { loading, getItems, getCountForTypeAndLevel, getCountForLevel, itemsCount }
})
