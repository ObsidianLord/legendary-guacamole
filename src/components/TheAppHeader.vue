<template>
  <header
    id="header"
    :style="{ fontSize: $vuetify.breakpoint.xsOnly ? '7pt' : null }"
  >
    <v-container >
      <v-row class="text-center">
        <v-col :class="{ 'pb-0': $vuetify.breakpoint.xsOnly }">
          <h1 class="font-weight-regular">
            Simple
            <a
              class="font-weight-bold text-decoration-none black--text"
              href="https://www.jsdelivr.com/"
              target="_blank"
            >jsDelivr</a>
            Search
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>
