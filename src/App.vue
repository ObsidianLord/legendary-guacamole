<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <v-row
          id="search"
          justify="center"
        >
          <v-col md="10" lg="8" xl="6">
            <SearchBar />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="10" lg="8" xl="6">
            <PackageList />
            <PackagePagination />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from '@/components/TheAppFooter.vue';
import AppHeader from '@/components/TheAppHeader.vue';
import PackageList from '@/components/package/PackageList.vue';
import PackagePagination from '@/components/package/PackagePagination.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    PackageList,
    PackagePagination,
    SearchBar,
  },
};
</script>
