<template>
  <v-app>
    <Header 
      :user="user" 
      @user-signout="signoutHandler" 
      @user-signin="signinHandler"
    />

    <v-content>
      <router-view/>
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
    //  user: null,
     user: {
        img: 'https://cdn.vuetifyjs.com/images/john.jpg',
        name: 'Blue Joe',
        email: 'joe8773@gmail.com',
      },
   }),
   methods: {
     signinHandler( userData ) {
       console.log( userData )
       // this.user = userData
       if ( this.$router.currentRoute.fullPath !== "/home" )
       {
         this.$router.push( "/home" )
       }
     },
     signoutHandler() {
       this.user = null ;
     }
   }
  };
</script>

<style>
  * {
    font-family: 'Noto Sans TC', sans-serif ;
  }
</style>
