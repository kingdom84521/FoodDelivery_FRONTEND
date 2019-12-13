<template>
  <v-sheet
    height="650px"
    elevation="2"
    color="green accent-4"
    class="pa-1"
    v-scroll="onScroll"
  >
    <!-- height="100%" -->
    <v-card
      height="100%"
    >
      <v-card-title class="justify-center font-weight-black">購物車列表</v-card-title>
      <v-divider />
      <v-sheet
        v-if="shopping_cart.list.length === 0"
        height="15%"
        class="pa-1 text-center font-weight-medium"
      >
        你尚未放入任何產品到購物車中。
      </v-sheet>
      <v-list
        max-height="70%"
        v-else
        class="overflow-y-auto"
      >
        <v-list-item
          v-for="(item, index) in shopping_cart.list"
          :key="index"
          @click="backToProductVariation( index )"
        >
          <v-row>
            <!-- 項目描述 -->
            <v-col cols="9">
              <v-row>
                <div class="pl-4 font-weight-bold headline">{{ item.product.name }}</div>
              </v-row>
              <v-row v-if="item.variation.name !== null">
                <div class="pl-4 title">~{{ item.variation.name }}</div>
              </v-row>
              <template v-if="item.toppings.length !== 0">
                <v-row>
                  <div class="pl-4 subtitle-1">加點：</div>
                </v-row>
                <v-row>
                  <v-list class="pl-12">
                    <div
                      v-for="(topping, topping_index) in item.toppings"
                      :key="topping_index"
                    >
                      <v-list-item 
                        v-for="(option, option_index) in topping.options_list"
                        :key="option_index"
                        class="mt-n5"
                      >
                        <v-list-item-title>+{{ option.name }}</v-list-item-title>
                      </v-list-item>
                    </div>
                  </v-list>
                </v-row>
              </template>
            </v-col>
            <!-- 數量調整 -->
            <v-col 
              cols="3"
              class="pa-0 pr-3"
            >
              <v-row class="justify-center">
                <v-btn 
                  icon
                  color="red accent-3"
                  @click.stop="changeQuantity(item, '-')"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-row>
              <v-row class="justify-center">
                <div class="font-weight-bold"> {{ item.quantity }} </div>
              </v-row>
              <v-row class="justify-center">
                <v-btn 
                  icon
                  color="green accent-4"
                  @click.stop="changeQuantity(item, '+')"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-row>
            </v-col>
            <!-- 小計 -->
            <v-col cols="9">
              <v-row class="justify-end">
                <div class="ont-weight-bold title">價錢：</div>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row class="justify-start">
                <div class="ont-weight-bold title">NT{{ item.subtotal }}$</div>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-divider />
      <!-- 總計 -->
      <v-container>
        <v-row no-gutters>
          <v-col cols="3">
            餐點總價：
          </v-col>
          <v-col>
            NT{{ shopping_cart.total }} $
          </v-col>
        </v-row>
        <!-- <v-row no-gutters>
          <v-col cols="3" justify-self="end">
            服務費：
          </v-col>
          <v-col cols="4">
            NT0 $
          </v-col>
        </v-row> -->
        <!-- <v-row no-gutters>
          <v-col cols="8">
            總價：
          </v-col>
          <v-col cols="4">
            789
          </v-col>
        </v-row> -->
      </v-container>
      <v-card-actions class="px-2">
        <v-btn
          block
          large
          color="green accent-4"
          class="headline"
        >
          結帳
          <!-- 結帳 {{ offsetTop }} -->
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    shopping_cart: {
      type: Object,
      require: true
    }
  },
  data: () => ({
    shopping_cart_edit: false,
    offsetTop: 0
  }),
  methods: {
    changeQuantity( item , state ) {
      this.$emit('changeQuantity', item, state, true);
    },
    backToProductVariation( index ) {
      this.$emit('backToProductVariation', index);
    },
    deleteShoppingCartItem(index) {
      console.log( index );
    },
    onScroll( e ) {
      // console.log( e );
      // this.offsetTop = e.target.scrollTop;
    }
  }
}
</script>