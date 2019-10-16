<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
    }
  },
  mounted() {
    this.axios.get( "https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP049/107" )
              .then( res => {
                console.log( res )
              } )
  }
}
</script>

<style>
  * {
    font-family: 'Noto Sans TC', sans-serif ;
  }

  .noto-family {
    font-family: "Noto Sans TC", sans-serif;
  }

  .title-text {
   font-size: 20px ;
  }
</style>
