<template>
  <v-container fluid>
    <v-row>
      <v-card class="grey col-12">
        <v-card flat class="grey lighten-3">
          <v-card-text>
            <div id="pactText" class="pa-3 white headline overflow-y-auto">
              <!-- Where cantact text display -->
            </div>
          </v-card-text>
          <v-row class="mx-4" justify="end">
            <v-card-actions class="ma-1">
              <v-checkbox
                class="white ma-1 pa-4"
                hide-details
                label="同意上述條款"
                v-model="partUser.agreeContract"
              />
            </v-card-actions>
          </v-row>
        </v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => {
      return {
        partUser: {
          agreeContract: false
        }
      }
    },
    watch: {
      partUser: {
        handler( value ) {
          this.$emit( "data-change", value )
        },
        deep: true
      }
    }
}
</script>