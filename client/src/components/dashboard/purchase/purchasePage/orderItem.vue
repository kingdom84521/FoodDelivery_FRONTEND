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
          <v-img
            contain
            src="https://via.placeholder.com/100"
          />
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
                <div class="link-animation">
                  點擊快速檢視訂單內容
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="4"
          class="pa-3 pr-4"
        >
         <div 
          class="d-flex h-100 align-content-space-between flex-wrap"
         >
           <div class="justify-end w-100 d-flex flex-row">
             <v-avatar 
              left
              class="mr-2" 
              color="indigo" 
              size="33"
            >
               <span class="white--text body-2">KK</span>
             </v-avatar>
             <div class="body-2 pt-1 grey--text text--accent-2">點擊查看訂餐人資訊</div>
           </div>
           <div class="text-end w-100 font-weight-bold">
             訂單金額：
             <span class="headline primary--text">
               $888
             </span>
           </div>
         </div>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      type: String,
      required: true
    },
    orderItems: {
      type: Array,
      required: true
    },
    by: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }
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

  .h-100 {
    height: 100% ;
  }

  .w-100 {
    width: 100% ;
  }

  .link-animation {
    color: #000000 ;
    transition: color 0.1s linear 0s ;
    
  }

  .link-animation:hover {
    color: #1976D2 ;
    cursor: pointer ;
  }
</style>