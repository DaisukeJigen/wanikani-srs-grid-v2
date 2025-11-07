<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useItemsStore } from '@/stores/items'
const itemsStore = useItemsStore()
import { useIndexStore } from '@/stores'
const indexStore = useIndexStore()
import startCase from 'lodash/startCase'
import values from 'lodash/values'

const props = defineProps({
  level: {
    type: String,
    default: '',
  },
  subLevel: {
    type: Number,
    default: null,
  },
  // index: {
  //   type: Number,
  //   default: 0
  // }
  xbd: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {})
</script>

<template>
  <a
    class="item-spread-table-row jigen item-spread-table-row--collapsable"
    href="#details-content-0c9e2962-2384-49da-87af-27a48e0679b6"
    data-detail-target="anchor"
    data-link-activation-target="anchor"
    data-action="detail#showDetail"
    aria-controls="details-content-0c9e2962-2384-49da-87af-27a48e0679b6"
    tabindex="-1"
  >
    <div class="item-spread-table-row__header">
      <div class="item-spread-table-row__icon">
        <svg :class="'wk-icon wk-icon--srs_' + level" viewBox="0 0 390 512" aria-hidden="true">
          <use
            :href="
              '#wk-icon__srs-' +
              level +
              (subLevel != null && (level == 'apprentice' || level == 'guru')
                ? subLevel.toString()
                : level == 'apprentice' || level == 'guru'
                  ? indexStore.levels[level][0]?.toString()
                  : '')
            "
          ></use>
        </svg>
      </div>
      <div class="item-spread-table-row__title">
        {{
          startCase(level) +
          (subLevel == null ||
          (level.toLowerCase() != 'apprentice' && level.toLowerCase() != 'guru')
            ? ''
            : subLevel > 4
              ? ' ' + (subLevel - 4).toString()
              : ' ' + subLevel.toString())
        }}
      </div>
    </div>
    <div class="item-spread-table-row__counts">
      <div class="item-spread-table-row__count item-spread-table-row__count--radical">
        <template v-if="!xbd || subLevel != null">
          <!--@vue-ignore-->
          {{
            itemsStore.getCountForTypeAndLevel(
              'radical',
              subLevel != null ? [subLevel] : values(indexStore.levels[level]),
            )
          }}
        </template>
        <template v-else>
          <!--@vue-ignore-->
          <template v-for="(s, i) in values(indexStore.levels[level])" :key="s">
            {{ (i > 0 ? '/' : '') + itemsStore.getCountForTypeAndLevel('radical', [s]) }}
          </template>
        </template>
      </div>
      <div class="item-spread-table-row__count item-spread-table-row__count--kanji">
        <template v-if="!xbd || subLevel != null">
          <!--@vue-ignore-->
          {{
            itemsStore.getCountForTypeAndLevel(
              'kanji',
              subLevel != null ? [subLevel] : values(indexStore.levels[level]),
            )
          }}
        </template>
        <template v-else>
          <!--@vue-ignore-->
          <template v-for="(s, i) in values(indexStore.levels[level])" :key="s">
            {{ (i > 0 ? '/' : '') + itemsStore.getCountForTypeAndLevel('kanji', [s]) }}
          </template>
        </template>
      </div>
      <div class="item-spread-table-row__count item-spread-table-row__count--vocabulary">
        <template v-if="!xbd || subLevel != null">
          <!--@vue-ignore-->
          {{
            itemsStore.getCountForTypeAndLevel(
              'vocabulary',
              subLevel != null ? [subLevel] : values(indexStore.levels[level]),
            )
          }}
        </template>
        <template v-else>
          <!--@vue-ignore-->
          <template v-for="(s, i) in values(indexStore.levels[level])" :key="s">
            {{ (i > 0 ? '/' : '') + itemsStore.getCountForTypeAndLevel('vocabulary', [s]) }}
          </template>
        </template>
      </div>
    </div>
    <div class="item-spread-table-row__total">
      <template v-if="!xbd || subLevel != null">
        <!--@vue-ignore-->
        {{ itemsStore.getCountForLevel(subLevel != null ? [subLevel] : indexStore.levels[level]) }}
      </template>
      <template v-else>
        <!--@vue-ignore-->
        <template v-for="(s, i) in values(indexStore.levels[level])" :key="s">
          {{ (i > 0 ? '/' : '') + itemsStore.getCountForLevel([s]) }}
        </template>
      </template>
    </div>
    <!-- <div class="item-spread-table-row__indicator">
      <svg class="wk-icon wk-icon--chevron_right" viewBox="0 0 320 512" aria-hidden="true">
        <use href="#wk-icon__chevron-right"></use>
      </svg>
    </div> -->
  </a>
</template>

<style scoped lang="scss"></style>
