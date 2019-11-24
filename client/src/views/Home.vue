<template>
  <v-container v-scroll="test">
    <v-row id="title-block" no-gutters>
      <v-col
        cols="4"
      >
        <v-sheet
          class="d-flex justify-center align-center"
          color="transparent"
          height="750"
        >
          <v-img
            src="@/assets/logo.png"
            max-height="70%"
            max-width="70%"
            contain
          >
          </v-img>
        </v-sheet>

      </v-col>
      <v-col
        cols="8"
        align-self="center"
      >
        <v-sheet
          class="ml-6"
          color="transparent"
          height="300"
        >
          <v-row>
            <v-col>
              <div class="display-1">您的健康飲食，我們幫您送達。</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-sheet
                class="d-flex border--grey pa-2"
                height="65"
                elevation="5"
              >
                <v-text-field 
                  solo
                  clearable
                  v-model="keyword"
                  class="mr-3"
                  placeholder="找到你所想要的美食"
                  clear-icon="mdi-close-circle"
                >
                </v-text-field>
                <v-btn 
                  height="48" 
                  width="150"
                  color="success"
                  class="white--text"
                  elevation="4"
                >
                  <div class="title">
                    搜尋
                  </div>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      keyword: ""
    }),
    methods: {
      test() {
        // var top = 0 ;
        // if ( element.target.scrollTop > top )
        // {
        //   console.log( "scrolling down" )
        // }
        // top = element.target.scrollTop
        console.log( window.pageYOffset )
      }
    }
  }
</script>

<style>
  .border--grey {
    border: 1px #A4A4A4 solid !important ;
  }
</style>