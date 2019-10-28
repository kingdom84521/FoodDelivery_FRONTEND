<template>
  <v-container fluid>
      <v-row>
          <v-col
            cols="12"
          >
            <v-card
                outlined
                color="grey lighten-2"
            >
                <v-row
                    justify="center"
                >
                    <v-card-title class="headline">
                        testing
                    </v-card-title>
                    <v-card-text class="grey--text">
                        testing testing testing
                    </v-card-text>
                </v-row>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>