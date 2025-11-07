<script setup lang="ts">
import Level from '@/components/Level.vue'
import LevelStyleTwo from '@/components/LevelStyleTwo.vue'

import { useIndexStore } from './stores'
const indexStore = useIndexStore()
import keys from 'lodash/keys'
import { onMounted, computed, watch, nextTick } from 'vue'

import { useSettingsStore } from './stores/settings'
const settingsStore = useSettingsStore()
import { useItemsStore } from './stores/items'
const itemsStore = useItemsStore()
import flatten from 'lodash/flatten'
import values from 'lodash/values'

import Changelog from '@/components/Changelog.vue'

//import test from '@/components/test.vue'

declare const wkof: any

function addStyle(aCss: string) {
  let head, style
  head = document.getElementsByTagName('head')[0]
  if (head) {
    style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.textContent = aCss
    head.appendChild(style)
    return style
  }
  return null
}

const columns = computed(() => {
  let base = 5
  if (wkof.settings == undefined) return base
  if (wkof.settings.srsGrid.includeLocked) base++
  if (wkof.settings.srsGrid.includeInitiate) base++
  if (base == 7) return 4
  if (base == 6) return 3
  if (base == 5) return 5
  return 5
})

const levelsToShow = computed(() => {
  let levels = keys(indexStore.levels)
  if (!wkof.settings.srsGrid.includeLocked) levels = levels.filter((l: any) => l != 'locked')
  if (!wkof.settings.srsGrid.includeInitiate) levels = levels.filter((l: any) => l != 'initiate')
  return levels
})

const stagesToShow = computed(() => {
  let stages: number[] = []
  const levels = levelsToShow.value
  //@ts-ignore
  stages = flatten(levels.map((l: any) => values(indexStore.levels[l])))
  return stages
})

const xbd = computed(() => wkof.settings.srsGrid.extraBreakdown),
  xbdStyle = computed(() => wkof.settings.srsGrid.extraBreakdownStyle)

const waitForSRSLoaded = () => {
  if (document.querySelectorAll('.item-spread-table-row--loading').length == 0) {
    indexStore.srsGridLoaded = true
  } else {
    setTimeout(() => {
      waitForSRSLoaded()
    }, 300)
  }
}

// const done = ref(false)

onMounted(() => {
  //@ts-ignore
  // if (!window.wkof) {
  //   if (
  //     confirm(
  //       'WaniKani SRS Grid requires Wanikani Open Framework.\nDo you want to be forwarded to the installation instructions?'
  //     )
  //   )
  //     window.location.href =
  //       'https://community.wanikani.com/t/instructions-installing-wanikani-open-framework/28549'
  //   return
  // }

  // if (import.meta.env.MODE == 'development') {
  //   wkof.include('Apiv2, ItemData')
  //   wkof.ready('ItemData').then(itemsStore.getItems())
  // } else {

  nextTick(() => {
    wkof.include('Apiv2, ItemData, Menu, Settings')
    wkof.ready('Menu').then(settingsStore.installMenu)
    wkof.ready('ItemData, Settings').then(settingsStore.installSettings).then(itemsStore.getItems)
    // .then(() => {
    //   debugger
    //   done.value = true
    // })

    const scriptUrl =
      'https://update.greasyfork.org/scripts/501980/1426289/Wanikani%20Open%20Framework%20Turbo%20Events.user.js'
    wkof.load_script(scriptUrl, /* use_cache */ true)
    //@ts-ignore
    wkof.ready('TurboEvents').then(() => {
      //@ts-ignore
      wkof.turbo.on.common.dashboard(() => {
        indexStore.srsGridLoaded = false
        //TODO figure it out
        settingsStore
          .installMenu()
          .then(settingsStore.installSettings)
          .then(itemsStore.getItems)
          .then(() => {
            waitForSRSLoaded()
            // indexStore.srsGridLoaded = true
          })
      })
      // wkof.turbo.on.commonListeners.targetIds((widget-ac4b3f36-8d98-4301-9dde-95e6a8eb1b62) => {
      //   debugger
      //   console.log("hello there")
      // })
    })
  })

  // watch(
  //   () => settingsStore.loaded,
  //   (newVal, oldVal) => {
  //     if (newVal) {
  //       addStyle(
  //         // '.srs-progress:first-of-type {' +
  //         //   ' display: none;' +
  //         //   '}' +
  //         ':root {' +
  //           ' --color-srs-progress-locked: #2e2729;' +
  //           ' --color-srs-progress-initiate: #3bb33e;' +
  //           '}' +
  //           '.item-spread-table-row {' +
  //           ' display: none;' +
  //           '}' +
  //           '.item-spread-table-row.jigen {' +
  //           ' display: flex !important;' +
  //           '}' +
  //           '.jigen .item-spread-table-row__count, .jigen .item-spread-table-row__total {' +
  //           ' min-width: 50px;' +
  //           ' width: unset;' +
  //           '}',
  //       )
  //     }
  //   },
  //   // { deep: true }
  // )
  // // }
})
</script>

<template>
  <!-- <p class="user-summary__username">DaisukeJigen</p>
  indexStore.srsGridLoaded: {{ indexStore.srsGridLoaded }} -->
  <!-- TODO: for debugging -->
  <!--<test></test>-->
  <template v-if="indexStore.srsGridLoaded">
    <Teleport defer to=".item-spread-table-widget__rows">
      <!-- xbd: {{ xbd }}<br />xbdStyle: {{ xbdStyle }} -->
      <template v-if="settingsStore.loaded && itemsStore.itemsCount > 0">
        <template v-if="(xbdStyle == 0 && xbd) || !xbd">
          <Level v-for="l in levelsToShow" :level="l" :key="l" :xbd="xbd"></Level
        ></template>
        <template v-else-if="xbdStyle == 1 && xbd">
          <template v-for="(l, i) in levelsToShow" :key="i">
            <!--@vue-ignore-->
            <Level
              v-for="(s, i2) in values(indexStore.levels[l])"
              :level="l"
              :sub-level="s"
              :key="i2"
              :xbd="xbd"
            ></Level
          ></template>
        </template>
        <template v-else>Error</template>

        <!-- <LevelStyleTwo
          v-for="l in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :level="l"
          :key="l"
          :xbd="xbd"
        ></LevelStyleTwo> -->
      </template>
    </Teleport></template
  >
  <Changelog v-if="indexStore.srsGridLoaded"></Changelog>
</template>

<style>
:root {
  --color-srs-progress-locked: #2e2729;
  --color-srs-progress-initiate: #3bb33e;
}
.item-spread-table-row {
  display: none;
}
.item-spread-table-row.jigen {
  display: flex !important;
}
.jigen .item-spread-table-row__count,
.jigen .item-spread-table-row__total {
  min-width: 50px;
  width: unset;
}
</style>
