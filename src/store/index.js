import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import {
  DEFAULT_PAGE_SIZE,
  NPM_REGISTRY_SEARCH_ENDPOINT,
  JSDELIVR_PACKAGE_VERSIONS_ENDPOINT,
} from '@/config/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: '',
    selectedPackage: null,
    packageList: [],
    versionsList: [],
    totalPackages: 0,
    currentPage: 1,

    loading: false,
    searchInitiated: false,
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setSelectedPackage(state, selectedPackage) {
      state.selectedPackage = selectedPackage;
    },
    setPackageList(state, packageList) {
      state.packageList = packageList;
    },
    setVersionsList(state, versionsList) {
      state.versionsList = versionsList;
    },
    setTotalPackages(state, totalPackages) {
      state.totalPackages = totalPackages;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSearchInitiated(state) {
      state.searchInitiated = true;
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
    selectPackage({ commit }, packageName) {
      axios.get(JSDELIVR_PACKAGE_VERSIONS_ENDPOINT + packageName)
        .then((result) => {
          commit('setVersionsList', result.data.versions);
        });
    },
  },
  getters: {
    totalPages: (state) => Math.ceil(state.totalPackages / DEFAULT_PAGE_SIZE),
  },
});
