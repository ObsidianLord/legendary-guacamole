<template>
  <v-pagination
      v-if="searchInitiated && totalPackages > 0"
      :value="currentPage"
      :length="totalPages"
      :disabled="loading"
      :total-visible="totalVisible"
      @input="selectPage"
      @next="selectPage(currentPage + 1)"
      @previous="selectPage(currentPage - 1)"
  ></v-pagination>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  DEFAULT_VISIBLE_PAGES,
  DEFAULT_SM_VISIBLE_PAGES,
} from '@/config/config';

export default {
  name: 'PackagePagination',

  methods: {
    ...mapActions(['fetchPackageList']),
    selectPage(page) {
      this.fetchPackageList({
        query: this.searchQuery,
        page,
      });
    },
  },

  computed: {
    ...mapGetters(['totalPages']),
    ...mapState(['searchQuery', 'totalPackages', 'searchInitiated', 'loading', 'currentPage']),
    totalVisible() {
      return this.$vuetify.breakpoint.xsOnly ? DEFAULT_VISIBLE_PAGES : DEFAULT_SM_VISIBLE_PAGES;
    },
  },
};
</script>
