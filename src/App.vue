<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <div class="d-flex align-center">
          <a href="/">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
          </a>
        </div>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
