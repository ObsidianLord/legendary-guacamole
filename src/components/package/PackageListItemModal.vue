<template>
  <v-card>
    <v-card-title class="justify-space-between align-end">
      <span class="text-h4">{{ item.package.name }}</span>
      <span class="font-weight-thin">{{ versionString }}</span>
    </v-card-title>
    <v-card-text>
      {{ item.package.description }}
    </v-card-text>
    <v-card-text>
      <v-select
        :value="selectedVersion"
        :loading="versionsLoading"
        :items="versionsList"
        label="Version"
        outlined
        hide-details
        @change="selectVersion"
      ></v-select>
    </v-card-text>
    <v-card-text v-if="selectedVersion && !versionsLoading">
      <h2 class="mb-2">Version Usage Stats</h2>
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        item-key="date"
        class="elevation-1"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'PackageListItemModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    tableHeaders: [
      {
        text: 'Date',
        value: 'date',
      },
      {
        text: 'Usages',
        value: 'total',
      },
    ],
  }),
  computed: {
    ...mapState(['versionsList', 'versionsLoading', 'selectedVersion', 'versionUsageStats']),
    versionString() {
      return `v${this.item.package.version}`;
    },
    tableItems() {
      if (this.versionUsageStats.dates) {
        return Object.entries(this.versionUsageStats.dates).map((entry) => ({
          date: entry[0],
          total: entry[1].total,
        }));
      }
      return [];
    },
  },
  methods: {
    ...mapActions(['selectVersion']),
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
