<template>
  <v-text-field
    ref="search"
    :value="searchQuery"
    clearable
    hide-details
    outlined
    :dense="$vuetify.breakpoint.xsOnly"
    prepend-inner-icon="mdi-magnify"
    @input="search"
  ></v-text-field>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DEFAULT_SEARCH_DEBOUNCE_TIME } from '@/config/config';

export default {
  name: 'SearchBar',

  data: () => ({
    query: '',
    timeout: null,
  }),

  mounted() {
    this.$refs.search.focus();
  },

  computed: {
    ...mapState(['searchQuery']),
  },

  methods: {
    ...mapActions(['fetchPackageList']),
    search(query) {
      // debounce
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
      if (query !== null && query !== undefined && query.length > 0) {
        this.timeout = setTimeout(() => {
          this.fetchPackageList({
            query,
            page: 1,
          });
        }, DEFAULT_SEARCH_DEBOUNCE_TIME);
      }
    },
  },
};
</script>
