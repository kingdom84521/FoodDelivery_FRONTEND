<template>
  <div class="border--black">
    <v-sheet
      class="border--black"
    >
      <v-row no-gutters>
        <v-col
          cols="1"
          class="pa-3"
        >
          <div class="square">
            
          </div>
        </v-col>
        <v-col
          cols="7"
        >
          <v-row no-gutters class="pa-3">
            <v-col>
              <div class="title font-weight-bold">
                [ 這裡是店家的名稱 ]
              </div>
              <v-spacer />
              <div class="d-flex flex-row align-center">
                <v-icon 
                  small 
                  left
                  class="pt-1"
                >
                  mdi-eye
                </v-icon>
                <v-hover v-slot:default="{ hover }">
                  <div :class="{ 'black--text': !hover, 'primary--text': hover }">
                    點擊快速檢視訂單內容
                  </div>
                </v-hover>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="4"
          align-self="stretch"
        >
          <v-row no-gutters align="center">
            <v-col>
              testing
            </v-col>
          </v-row>
          <v-row no-gutters align="end">
            <v-col>
              testing
            </v-col>
          </v-row>
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