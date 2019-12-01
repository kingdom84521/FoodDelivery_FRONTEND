<template>
  <v-sheet
    height="100%"
    elevation="2"
    color="green accent-3"
    class="pa-1"
  >
    <v-card
      height="100%"
    >
      <v-card-title class="justify-center font-weight-black">購物車列表</v-card-title>
      <v-divider />
      <v-sheet
        v-if="shopping_cart.list.length === 0"
        height="10%"
        class="pa-1 text-center font-weight-medium"
      >
        你尚未放入任何產品到購物車中。
      </v-sheet>
      <v-list
        max-height="80%"
        v-else
        class="overflow-y-auto"
      >
        <v-list-item
          v-for="(item, index) in shopping_cart.list"
          :key="index"
          @click="backToProductVariation( index )"
        >
          <v-row no-gutter>
            <!-- 數量調整 -->
            <v-col cols="1" class="pa-0 pt-2">
              <v-btn 
                icon
                color="green accent-3"
                @click.stop="changeQuantity(item, '-')"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" class="pa-0 pt-3">
              <div class="text-end font-weight-bold"> {{ item.quantity }} </div>
            </v-col>
            <v-col cols="1" class="pa-0 pt-2">
              <v-btn 
                icon
                color="green accent-3"
                @click.stop="changeQuantity(item, '+')"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <!-- 項目描述 -->
            <v-col cols="5" class="pa-0">
              <v-list class="pa-0">
                <v-list-item>
                  <v-list-item-title>{{ item.product.name }}</v-list-item-title>
                </v-list-item>
                <v-list-item 
                  class="mt-n5"
                  v-if="item.variation.name !== null"
                >
                  <v-list-item-title>~{{ item.variation.name }}</v-list-item-title>
                </v-list-item>
                <template
                  v-if="item.toppings.length !== 0"
                >
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
                </template>
              </v-list>
            </v-col>
            <!-- 小計 -->
            <v-col 
              cols="4" 
              class="pr-0 pb-0"
              v-if="!shopping_cart_edit"
            >
              <v-list-item-action-text class="title">NT{{ item.subtotal }}$</v-list-item-action-text>
            </v-col>
            <v-col v-else>
              <v-btn 
                block
                color="red darken-1"
                @click="deleteShoppingCartItem(index)"
              >
                刪除
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-divider />
      
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
  data: {
    shopping_cart_edit: false,
  },
  methods: {
    changeQuantity( item , state ) {
      this.$emit('changeQuantity', item, state, true);
    },
    backToProductVariation( index ) {
      this.$emit('backToProductVariation', index);
    },
    deleteShoppingCartItem(index) {
      console.log( index );
    }
  }
}
</script>