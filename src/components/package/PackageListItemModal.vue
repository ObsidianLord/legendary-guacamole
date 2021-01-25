<template>
  <v-card>
    <v-card-title class="justify-space-between align-end">
      <span class="text-h4">{{ item.package.name }}</span>
      <span class="font-weight-thin">{{ versionString }}</span>
    </v-card-title>
    <v-card-text>
      <div class="ml-2 float-right">
        <v-chip
          :color="scoreColor"
          label
          large
        ><span class="text-h5">{{ scoreString }}</span></v-chip>
      </div>
      <div>{{ item.package.description }}</div>
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
        :loading="usageStatsLoading"
        dense
        multi-sort
        show-group-by
        item-key="id"
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import scoreToColor from '@/util/scoreToColor';

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
        text: 'File',
        value: 'file',
      },
      {
        text: 'Usages',
        value: 'total',
        align: 'end',
        groupable: false,
      },
    ],
  }),
  computed: {
    ...mapState([
      'versionsList',
      'versionsLoading',
      'selectedVersion',
      'versionUsageStats',
      'usageStatsLoading',
    ]),
    versionString() {
      return `v${this.item.package.version}`;
    },
    scoreColor() {
      return scoreToColor(this.item.score.final);
    },
    scoreString() {
      return (this.item.score.final * 10).toFixed(1);
    },
    tableItems() {
      if (this.versionUsageStats.files) {
        return Object.entries(this.versionUsageStats.files).map(
          (entry) => Object.entries(entry[1].dates).map((innerEntry) => ({
            id: `${entry[0]}@${innerEntry[0]}`,
            file: entry[0],
            date: innerEntry[0],
            total: innerEntry[1],
          })),
        ).flat();
      }
      return [];
    },
  },
  methods: {
    ...mapActions(['selectVersion']),
  },
};
</script>
