<template>
  <v-container fluid>
    <v-row
      v-if="now == 0"
      class="mr-3"
    >
        <v-card
          class="grey ma-3 col-12"
        >
          <v-card
            flat
            class="grey lighten-3"
          >
            <v-card-text>
              <div
                id="pactText"
                class="pa-3 white headline overflow-y-auto"
              >
                asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>asdasdasdasdasd
                <br>
              </div>
            </v-card-text>
            <v-row
              class="mx-4"
              justify="end"
            >
              <v-card-actions
                class="ma-1"
              >
                <v-checkbox
                  class="white ma-1 pa-4"
                  hide-details
                  label="同意上述條款" 
                  v-model="value" 
                  value="同意"
                >

                </v-checkbox>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-card>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: "stepPage",
  props: {
    now: {
      type: Number,
      required: true
    }
  },
  data: () => {
    return {

    }
  }
}
</script>

<style>
  #pactText {
    max-height: 600px ;
  }
</style>