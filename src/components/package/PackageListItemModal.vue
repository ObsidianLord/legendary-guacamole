<template>
  <v-card>
    <v-card-title>
      {{ item.package.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ item.package.version }}
    </v-card-subtitle>
    <v-card-text>
      {{ item.package.description }}
    </v-card-text>
     <v-card-text>
      <h3 class="mb-2">Versions</h3>
      <v-skeleton-loader
        v-if="versionsLoading"
        type="heading@10"
        class="d-flex"
      ></v-skeleton-loader>
      <template v-else>
        <v-chip
          v-for="version in versionsList"
          :key="version"
          class="mr-1 mb-1"
          small
        >{{ version }}</v-chip>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PackageListItemModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['versionsList', 'versionsLoading']),
  },
  methods: {
    chipSkeletonRandomWidth() {
      return Math.round(150 * Math.random()) + 150;
    },
  },
};
</script>

<style lang="scss">
  .v-skeleton-loader__heading {
    margin-right: 4px;
  }
</style>
