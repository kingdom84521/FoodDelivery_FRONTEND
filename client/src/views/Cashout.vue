<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
  },
  created() {
    console.log( this.$store.state.cart );
  }
};
</script>
