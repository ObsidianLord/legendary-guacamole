import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import {
  DEFAULT_PAGE_SIZE,
  NPM_REGISTRY_SEARCH_ENDPOINT,
  URL_PARAM_DELIMITER,
  JSDELIVR_PACKAGE_VERSIONS_ENDPOINT,
  JSDELIVR_PACKAGE_VERSION_USAGE_STATS_ENDPOINT,
} from '@/config/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    selectedPackage: null,
    selectedVersion: null,
    packageList: [],
    versionsList: [],
    versionUsageStats: {},
    totalPackages: 0,
    currentPage: 1,

    searchInitiated: false,
    loading: false,
    versionsLoading: false,
    usageStatsLoading: false,
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setSelectedPackage(state, selectedPackage) {
      state.selectedPackage = selectedPackage;
    },
    setSelectedVersion(state, selectedVersion) {
      state.selectedVersion = selectedVersion;
    },
    setPackageList(state, packageList) {
      state.packageList = packageList;
    },
    setVersionsList(state, versionsList) {
      state.versionsList = versionsList;
    },
    setVersionUsageStats(state, versionUsageStats) {
      state.versionUsageStats = versionUsageStats;
    },
    setTotalPackages(state, totalPackages) {
      state.totalPackages = totalPackages;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setSearchInitiated(state) {
      state.searchInitiated = true;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setVersionsLoading(state, versionsLoading) {
      state.versionsLoading = versionsLoading;
    },
    setUsageStatsLoading(state, usageStatsLoading) {
      state.usageStatsLoading = usageStatsLoading;
    },
  },
  actions: {
    fetchPackageList({ commit, state }, { query, page }) {
      if (!state.searchInitiated) {
        commit('setSearchInitiated');
      }

      commit('setSearchQuery', query);
      commit('setLoading', true);
      commit('setPackageList', new Array(10).fill({}));

      axios.get(NPM_REGISTRY_SEARCH_ENDPOINT, {
        params: {
          size: DEFAULT_PAGE_SIZE,
          from: DEFAULT_PAGE_SIZE * (page - 1),
          text: query,
        },
      }).then((result) => {
        commit('setPackageList', result.data.objects);
        commit('setTotalPackages', result.data.total);
        commit('setCurrentPage', page);
        commit('setLoading', false);
      }).catch((error) => {
        console.error(error);
        commit('setPackageList', []);
        commit('setTotalPackages', 0);
        commit('setLoading', false);
      });
    },

    selectPackage({ commit, dispatch }, packageName) {
      commit('setSelectedPackage', packageName);
      commit('setVersionsLoading', true);
      axios.get(
        JSDELIVR_PACKAGE_VERSIONS_ENDPOINT.split(URL_PARAM_DELIMITER).join(packageName),
      ).then((result) => {
        commit('setVersionsList', result.data.versions);
        commit('setVersionsLoading', false);
        dispatch('selectVersion', result.data.versions[0]);
      }).catch((error) => {
        console.error(error);
        commit('setVersionsList', []);
        commit('setVersionsLoading', false);
      });
    },

    selectVersion({ commit, state }, packageVersion) {
      commit('setSelectedVersion', packageVersion);
      commit('setUsageStatsLoading', true);
      axios.get(
        JSDELIVR_PACKAGE_VERSION_USAGE_STATS_ENDPOINT.split(URL_PARAM_DELIMITER)
          .join(`${state.selectedPackage}@${packageVersion}`),
      ).then((result) => {
        commit('setVersionUsageStats', result.data);
        commit('setUsageStatsLoading', false);
      }).catch((error) => {
        console.error(error);
        commit('setVersionUsageStats', {});
        commit('setUsageStatsLoading', false);
      });
    },
  },
  getters: {
    totalPages: (state) => Math.ceil(state.totalPackages / DEFAULT_PAGE_SIZE),
  },
});
