<template>
  <v-card
    v-if="searchInitiated"
    class="mb-4"
    outlined
  >
    <v-virtual-scroll
      v-if="packageList.length > 0"
      :items="packageList"
      :height="packageList.length * itemHeight"
      :max-height="maxHeight"
      :item-height="itemHeight"
    >
      <template v-slot:default="{ item, index }">
        <v-skeleton-loader
          v-if="loading"
          :height="itemHeight"
          type="list-item-three-line, divider"
        ></v-skeleton-loader>
        <PackageListItem
          v-else
          :key="item.name"
          :item="item"
          :isLast="index === packageList.length - 1"
        />
      </template>
    </v-virtual-scroll>
    <v-card-title
      v-else
      class="justify-center"
    >
      0 packages found
    </v-card-title>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PackageListItem from '@/components/package/PackageListItem.vue';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION_BLOCK_HEIGHT,
  DEFAULT_SM_ITEM_ROW_HEIGHT,
  DEFAULT_ITEM_ROW_HEIGHT,
} from '@/config/config';

export default {
  name: 'PackageList',
  components: { PackageListItem },

  data: () => ({
    maxHeight: 0,
  }),

  mounted() {
    window.addEventListener('resize', this.calculateMaxHeight, { passive: true });
    this.calculateMaxHeight();
  },

  computed: {
    ...mapState(['packageList', 'searchInitiated', 'loading']),
    itemHeight() {
      return this.$vuetify.breakpoint.xsOnly ? DEFAULT_ITEM_ROW_HEIGHT : DEFAULT_SM_ITEM_ROW_HEIGHT;
    },
  },

  methods: {
    calculateMaxHeight() {
      if (this.$vuetify.breakpoint.xsOnly) {
        this.maxHeight = this.itemHeight * DEFAULT_PAGE_SIZE;
      } else {
        const headerHeight = document.getElementById('header').offsetHeight;
        const searchHeight = document.getElementById('search').offsetHeight;
        const footerHeight = document.getElementById('footer').offsetHeight;
        this.maxHeight = window.innerHeight
          - (headerHeight + searchHeight + footerHeight + DEFAULT_PAGINATION_BLOCK_HEIGHT);
      }
    },
  },
};
</script>
