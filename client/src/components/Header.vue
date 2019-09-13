<template>
  <v-app-bar
    flat
  >
    <v-img
      :src="require('../assets/logo.svg')"
      max-height="40"
      max-width="40"
      contain
    ></v-img>
    <v-toolbar-title>Love Meal</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-toolbar-items>
      <v-btn text v-blur v-if="!isLogin">Sign in</v-btn>
      <v-btn text v-blur v-if="!isLogin">Sign up</v-btn>
      <v-btn text v-blur v-if="isLogin">Sign out</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  export default { 
    data:() => ({
      isLogin: false
    })
  }
</script>
