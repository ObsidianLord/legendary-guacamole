<template>
  <v-footer
    id="footer"
    app
    :absolute="$vuetify.breakpoint.xsOnly"
  >
    <v-container>
      <v-row class="text-center">
        <v-col>
          {{ new Date().getFullYear() }}  — <strong>Gleb Lebedenko</strong>
          <v-btn
            class="ml-1"
            href="https://github.com/ObsidianLord/legendary-guacamole"
            icon
            target="_blank"
          >
            <v-icon size="24px">
              mdi-github
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>
