<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="modalWidth"
      @input="onDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          one-line
          v-bind="attrs"
          v-on="on"
        >
          <v-list-item-content class="pb-0">
            <v-list-item-title class="mb-2">
              <h3>{{ item.package.name }} <span class="caption">{{ versionString }}</span></h3>
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2">
              <h4 v-if="item.package.description">{{ item.package.description }}</h4>
              <div
                v-else
                style="height: 16px"
              >
              </div>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mb-2 d-none d-sm-flex">
              <template v-if="uniqueKeywords.length > 0">
                <v-chip
                  v-for="keyword in uniqueKeywords"
                  :key="keyword"
                  class="mr-1 mb-1"
                  dark
                  small
                >{{ keyword }}</v-chip>
              </template>
              <div
                v-else
                style="height: 28px"
              >
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="d-none d-sm-flex">
            <v-list-item-action-text>
              {{ dateString }}
            </v-list-item-action-text>
            <v-list-item-action-text>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    :color="scoreColor"
                    label
                    v-bind="attrs"
                    v-on="on"
                  ><span class="text-h6">{{ scoreString }}</span></v-chip>
                </template>
                <div class="text-right">
                  <strong>Final score: {{ item.score.final.toFixed(3) }}</strong><br>
                  <span>Quality score: {{ item.score.detail.quality.toFixed(3) }}</span><br>
                  <span>Popularity score: {{ item.score.detail.popularity.toFixed(3) }}</span><br>
                  <span>Maintenance score: {{ item.score.detail.maintenance.toFixed(3) }}</span><br>
                </div>
              </v-tooltip>
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </template>

      <PackageListItemModal :item="item"/>

    </v-dialog>
    <v-divider v-if="!isLast"></v-divider>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import scoreToColor from '@/util/scoreToColor';
import PackageListItemModal from '@/components/package/PackageListItemModal.vue';
import {
  DEFAULT_DATE_FORMAT_LOCALE,
  DEFAUT_MODAL_WIDTH,
} from '@/config/config';

export default {
  components: { PackageListItemModal },
  name: 'PackageListItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isLast: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
    modalWidth: DEFAUT_MODAL_WIDTH,
  }),
  computed: {
    uniqueKeywords() {
      return this.item.package.keywords
        ? this.item.package.keywords
          .slice(0, 5)
          .filter((keyword, index, keywords) => keywords.indexOf(keyword) === index)
        : [];
    },
    versionString() {
      return `v${this.item.package.version}`;
    },
    dateString() {
      return new Date(this.item.package.date).toLocaleDateString(DEFAULT_DATE_FORMAT_LOCALE);
    },
    scoreString() {
      return (this.item.score.final * 10).toFixed(1);
    },
    scoreColor() {
      return scoreToColor(this.item.score.final);
    },
  },
  methods: {
    ...mapActions(['selectPackage']),
    onDialog(visible) {
      if (visible) {
        this.selectPackage(this.item.package.name);
      }
    },
  },
};
</script>
