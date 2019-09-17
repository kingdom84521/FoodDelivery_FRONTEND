<template>
  <v-app-bar
    app
    flat
    dark
    max-height="60"
    color="orange darken-2"
  >
    <v-img
      :src="require('../assets/logo.svg')"
      max-height="40"
      max-width="40"
      contain
    ></v-img>
    <v-toolbar-title>Love Meal</v-toolbar-title>

    <!-- <v-btn
      @click="isLogin = !isLogin; drawer = 'null'"
    >
      login: {{ isLogin }}
    </v-btn> -->

    <div class="flex-grow-1"></div>

    <v-toolbar-items v-if="!isLogin">
      <v-btn text v-blur>Sign in</v-btn>
      <v-btn text v-blur>Sign up</v-btn>
    </v-toolbar-items>
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          icon
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default { 
    data:() => ({
      isLogin: false,
    })
  }
</script>
