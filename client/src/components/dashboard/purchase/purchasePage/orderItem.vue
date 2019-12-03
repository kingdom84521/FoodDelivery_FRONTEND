<template>
  <div class="border--black">
    <v-sheet
      class="border--black"
    >
      <v-row no-gutters>
        <v-col
          cols="2"
          class="pa-3"
        >
          <div class="square">
            
          </div>
        </v-col>
        <v-col
          cols="6"
        >
          <v-row no-gutters class="pa-3">
            <v-col>
              <div>
                testing
              </div>
              <v-spacer />
              <div>
                testing
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="4"
        >
          asd
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .border--black {
    border: 1px #D8D8D8 solid ;
  }
  .square {
    background-color: gray ;
    height: 100px ;
    width: 100px ;
  }
</style>