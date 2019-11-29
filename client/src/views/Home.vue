<template>
  <div
    :style="`width: 100%`"
  >
    <v-row 
      no-gutters
      justify="center"
    >
      <v-col
        cols="11"
      >
        <v-row no-gutters>
          <v-col
            cols="4"
          >
            <v-sheet
              class="d-flex justify-center align-center"
              color="transparent"
              height="580"
            >
              <v-img
                src="@/assets/logo.png"
                max-height="85%"
                max-width="85%"
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
              color="transparent"
              height="300"
            >
              <v-row>
                <v-col>
                  <div class="display-1">您的健康飲食，我們幫您送達。</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="11"
                >
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
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <v-col
        cols="10"
      >
        <v-sheet color="transparent">
          <div 
            class="display-3 grey--text"
            style="line-height: 3.24rem"
          >
            Introduction
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
      >
        <v-sheet
          color="green"
          width="100%"
          class="d-flex justify-center"
        >
          <v-sheet
            width="85%"
            color="transparent"
            class="py-4"
          >
            <v-row>
              <v-col
                cols="6"
              >
                <div>
                  <div class="display-1 font-weight-bold">
                    均衡營養
                  </div>
                  <div 
                    class="headline ml-2 pa-5"
                    style="line-height: 3.5rem; width: 85%"
                  >
                    我們不只幫您找出餐點，為了各位不同的需求，食載有你會將每個餐點的營養也標示出來，讓您有更完善的飲食均衡，也使您的生活更加多采多姿。
                  </div>
                </div>
              </v-col>
              <v-col
                cols="6"
              >
                <div>
                  <div class="display-1 font-weight-bold">
                    無地不送
                  </div>
                  <div 
                    class="headline ml-2 pa-5"
                    style="line-height: 3.5rem; width: 85%"
                  >
                    每個顧客的交通不便，我們幫您想到了。再遠的地方，熱騰騰的飯菜都能為你準時送達。  
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      keyword: ""
    }),
    methods: {
    }
  }
</script>

<style>
  .border--grey {
    border: 1px #A4A4A4 solid !important ;
    border-radius: 5px
  }
</style>