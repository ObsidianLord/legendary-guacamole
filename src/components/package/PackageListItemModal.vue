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
      <v-chip
        v-for="version in versionsList"
        :key="version"
        class="mr-1 mb-1"
        small
      >{{ version }}</v-chip>
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
    ...mapState(['versionsList']),
  },
};
</script>
