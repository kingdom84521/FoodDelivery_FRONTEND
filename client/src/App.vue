<template>
  <v-app>
    <Header/>

    <v-content>
      <Home/>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
  import Home from './views/Home'
  import Header from './components/Header'
  // import Footer from './components/Footer'

  export default {
   name: 'App',
   components: {
     Header,
    //  Footer,
     Home,
   },
   data:() => ({

   }),
  };
</script>