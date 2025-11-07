import merge from 'lodash/merge'
import { defineStore } from 'pinia'
// import axios from '@/axios/axios-'
import { ref, computed } from 'vue'

import { useIndexStore } from '@/stores'
// const indexStore = useIndexStore()
declare const wkof: any
export const useSettingsStore = defineStore('settings', () => {
  // #region State
  const loadingCount = ref(0)
  const data = ref([])
  const settingsDialog: any = ref()
  const defaults = {
    // gridMode: 'Center/Center',
    extraBreakdown: false,
    includeInitiate: false,
    includeLocked: false,
    extraBreakdownStyle: 1,
  }
  const loaded = ref(false)
  // #endregion

  // #region Actions
  async function installMenu() {
    const indexStore = useIndexStore()
    wkof.Menu.insert_script_link({
      script_id: indexStore.scriptId,
      name: indexStore.scriptName,
      submenu: 'Settings',
      title: 'SRS Grid',
      on_click: openSettings,
    })
  }
  async function installSettings() {
    const indexStore = useIndexStore()
    settingsDialog.value = new wkof.Settings({
      script_id: indexStore.scriptId,
      name: indexStore.scriptName,
      title: 'SRS Grid',
      on_save: processSettings,
      settings: {
        //'srsGid_pg_display': {type:'page',label:'Display',content:{
        //    'grp_detail': {type:'group',label:'Review Details',content:{
        // gridMode: {
        //   type: 'dropdown',
        //   label: 'Mode',
        //   content: { 'left/right': 'Left/Right', 'center/center': 'Center/Center' }
        //   // default: defaults.gridMode
        // },
        extraBreakdown: {
          type: 'checkbox',
          label: 'Breakdown by sublevel',
          default: defaults.extraBreakdown,
        },
        extraBreakdownStyle: {
          type: 'dropdown',
          label: 'Breakdown by sublevel Style',
          default: defaults.extraBreakdownStyle,
          content: ['A', 'B'],
        },
        includeInitiate: {
          type: 'checkbox',
          label: 'Include Initiate',
          default: defaults.includeInitiate,
        },
        includeLocked: {
          type: 'checkbox',
          label: 'Include Locked',
          default: defaults.includeLocked,
        },
        //    }}
        //}}
      },
    })
    settingsDialog.value.load().then(function () {
      wkof.settings.srsGrid = merge({}, defaults, wkof.settings.srsGrid)
      settingsDialog.value.save()
      loaded.value = true
    })
  }
  function processSettings() {
    settingsDialog.value.save()
    console.log('Settings saved!')
  }
  function openSettings() {
    settingsDialog.value.open()
  }
  //   async function fetch() {
  //     data.value = []
  //     loadingCount.value += 1
  //     return axios
  //       .get('', {})
  //       .then((ret: any) => {
  //         data.value = ret.data
  //         loadingCount.value -= 1
  //       })
  //       .catch((error: any) => {
  //         loadingCount.value -= 1
  //         throw error
  //       })
  //   }
  // #endregion

  // #region Getters
  const loading = computed(() => loadingCount.value > 0)
  // #endregion

  return { loaded, installMenu, installSettings }
})
