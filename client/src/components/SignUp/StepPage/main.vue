<template>
  <v-container fluid>
    <v-row>
      <v-card
        flat
        outline
        class="grey lighten-3"
      >
        asdasd
      </v-card>
    </v-row>
    <v-divider />
    <v-row justify="space-between" class="mt-3 mx-3">
      <v-btn
        x-large 
        color="red" 
        class="white--text headline"
      >
        <v-icon left large>mdi-chevron-left</v-icon>
        上一步
      </v-btn>
      <v-btn 
        x-large 
        color="green" 
        class="white--text headline"
      >
        下一步
        <v-icon right large>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "stepPage",
  data: () => {
    return {

    }
  }
}
</script>

<style>

</style>