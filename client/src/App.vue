<template>
  <v-app>
    <Header :user="user"/>

    <v-content>
      <!-- <Home/> -->
      <router-view></router-view>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
   name: 'App',
   components: {
     Header,
     Footer
   },
   data:() => ({
     user: null,
   }),
  };
</script>

<style>
  * {
    font-family: 'Noto Sans TC', sans-serif ;
  }
</style>