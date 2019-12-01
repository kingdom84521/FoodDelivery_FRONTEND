<template>
  <v-container fluid>
    <v-row>
      <!-- 菜單 -->
      <v-col>
        <!-- 餐廳招牌 -->
        <v-card>
          <v-img 
            max-height="250"
            src="../assets/italy.jpg"
          ></v-img>
          <v-card-actions
            @click.stop="store_detail = true"
          >
            <!-- 店名 -->
            <v-card-title>
              {{ store_data.name }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn 
              icon
            >
              <v-icon
                color="green accent-4"
              >
                mdi-alert-circle-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- 餐廳詳細資料 -->
        <v-dialog 
          v-model="store_detail" 
          max-width="1000"
        >
          <v-card>
            <v-img
              max-height="250"
              src="../assets/garlic.jpg"
            >
              <v-btn
                fab
                absolute
                x-small
                color="white"
                @click="store_detail=false"
              >
                <v-icon
                  color="green accent-4"  
                >
                  mdi-close
                </v-icon>
              </v-btn>
            </v-img>
            <v-card-title>
              {{ store_data.name }}
            </v-card-title>
            <v-container>

            </v-container>
          </v-card>
        </v-dialog>
        
        <!-- 餐點分類 -->
        <v-tabs 
          background-color="green accent-3" 
          color="grey darken-2"
          center-active 
          v-model="menu_tab"
        >
          <v-tab 
            v-for="(category, index) in store_menu.categories"
            :key="index"
            class="font-weight-bold"
          >
            {{ category.name }}
          </v-tab>
          <v-tabs-slider color="orange darken-2" />
        </v-tabs>

        <!-- 餐點項目 -->
        <v-tabs-items 
          v-model="menu_tab"
        >
          <v-tab-item
            v-for="(category, index) in store_menu.categories"
            :key="index"
          >
            <v-card
              v-for="(product, index) in category.products"
              :key="index"
              @click="checkItemExtra(category, product)"
            >
              <!-- <v-img  src="@/assets/italy.jpg"></v-img> -->
              <v-card-actions>
                <v-card-title> {{ product.name }} </v-card-title>
                <v-spacer />
                <div class="font-weight-medium">
                  NT{{ lowestPrice(product.product_variations) }}$
                </div>
                <v-btn
                  icon
                  v-if="isItemExtra( product )"
                >
                  <v-icon
                    color="green accent-4"
                  >
                    mdi-plus-box-outline
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <!-- 餐點額外項目 -->
        <v-dialog 
          v-model="product_detail" 
          max-width="600"
        >
          <product-variation
            :product_detail="product_detail"
            :store_data="store_data"
            :item_extra="item_extra"
            :temporary_item="temporary_item"
            :toppings="toppings"
            :unset-toppings="unsetToppings"
            @changeQuantity="changeQuantity"
            @addToCart="addToCart"
          />
        </v-dialog>
      </v-col>

      <!-- 購物車 -->
      <v-col
        lg="3"
        md="3"
        cols="12"
        class="pl-md-0"
      >
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
                      @click.stop="changeQuantity(item, '-', true)"
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
                      @click.stop="changeQuantity(item, '+', true)"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Store from '@/assets/temp/storeList.json';
import Menu from '@/assets/temp/menuList.json';
import ProductVariation from '@/components/Menu/ProductVariation/main';

export default {
  name: 'Menu',
  components: {
    ProductVariation
  },
  data: () => ({
    store_data: {},
    store_menu: {},
    menu_tab: null,
    store_detail: false,
    product_detail: false,
    shopping_cart_edit: false,
    toppings: [],
    item_extra: {
      category: {},
      product: {},
      toppings: null,
      remarks: null
    },
    shopping_cart: {
      store: null,
      menu: null,
      list: [],
      total: 0
    },
    temporary_item: {
      category: null,
      product: null,
      variation: null,
      quantity: null,
      price: null,
      subtotal: null
    }
  }),
  methods: {
    lowestPrice( variations ) {
      return this._.minBy( variations, variation => { return variation.price } ).price;
    },
    isItemExtra( product ) {
      return (product.product_variations.length !== 1 || product.product_variations[0].topping_ids.length !== 0);
    },
    checkItemExtra( category , product ) {
      this.temporary_item.category = this.getUnit( category );
      this.temporary_item.product = this.getUnit( product );
      this.temporary_item.variation = this.getUnit( product.product_variations[0] );
      this.temporary_item.quantity = 1;
      this.temporary_item.price = product.product_variations[0].price;
      this.temporary_item.subtotal = this.temporary_item.price;

      if ( this.isItemExtra(product) ) {
        this.product_detail = true;
        this.item_extra.category = category;
        this.item_extra.product = product;
        return;
      }
      this.addToCart();
    },
    changeQuantity( item , state , shopping_cart_list = false ) {
      if ( state === '+' ) {
        item.quantity += 1;
      } else if ( state === '-' ) {
        item.quantity -= 1;
      }
      if ( shopping_cart_list ) {
        this.updateShoppingCart();
      }
    },
    clearTemporaryItem() {
      this._.forEach(this.temporary_item, (value, key) => {
        this._.set(this.temporary_item, [key], null);
      });
    },
    unsetToppings() {
      this._.set(this.item_extra, 'toppings', null);
      this.toppings.fill( null );
    },
    getUnit( item ) {
      let unit = {
        id: null,
        name: null
      };
      unit.id = item.id;
      unit.name = item.name;

      return unit
    },
    getNewListItem() {
      let item_template = { ...this.temporary_item, "toppings": [], "remarks": null };
      item_template.price = item_template.subtotal;
      item_template.subtotal = item_template.price * item_template.quantity;

      if ( this.item_extra.toppings !== null ) {
        let toppings_choice = this.toppings;
        this._.forEach(this.item_extra.toppings, (topping, index) => {
          let choice_index = toppings_choice[index];
          let topping_unit =  { ...this.getUnit( topping ), "options_list": [] };

          if ( choice_index !== null ) {
            if ( typeof( choice_index ) === "number" ) {
              topping_unit.options_list.push( this.getUnit( topping.options[choice_index] ) );              
            } else {
              this._.forEach(choice_index, option_index => {
                topping_unit.options_list.push( this.getUnit( topping.options[option_index] ) );              
              });
            } 
            item_template.toppings.push( topping_unit );
          } 
        });
      }

      this.clearTemporaryItem();
      this.unsetToppings();
      return item_template;
    },
    getSameItemIndex( item ) {
      let list = this.shopping_cart.list;
      if ( list.length === 0 ) {
        return -1;
      }

      return this._.findIndex(list, list_item => {
        if ( item.category.id !== list_item.category.id || item.product.id !== list_item.product.id || item.variation.id !== list_item.variation.id || item.toppings.length !== list_item.toppings.length ) {
          return false;
        }

        let item_toppings = item.toppings;
        let list_toppings = list_item.toppings;
        for ( var topping_index = 0 ; topping_index < item_toppings.length ; ++topping_index ) {
          if ( item_toppings[ topping_index ].options_list.length !== list_toppings[ topping_index ].options_list.length ) {
            return false;
          }

          let item_options = item_toppings[ topping_index ];
          let list_options = list_toppings[ topping_index ];
          for ( var option_index = 0 ; option_index < item_options.length ; ++option_index ) {
            if ( item_options[ option_index ].id !== list_options[ option_index ].id ) {
              return false;
            } 
          }
        }
        return true;
      });
    },
    addToCart() {
      let list_item_template = this.getNewListItem();

      let same_item_index = this.getSameItemIndex( list_item_template );
      if ( same_item_index === -1 ) {
        this.shopping_cart.list.push( list_item_template );
      } else {
        this.shopping_cart.list[ same_item_index ].quantity += list_item_template.quantity;
      }

      this.product_detail = false;
      this.updateShoppingCart();
    },
    updateShoppingCart() {
      let price_total = 0;

      this._.remove(this.shopping_cart.list, {'quantity': 0});

      this._.forEach(this.shopping_cart.list, (item, index) => {
        let price_subtotal = item.price * item.quantity;
        if ( item.subtotal !== price_subtotal ) {
          this.shopping_cart.list[index].subtotal = price_subtotal;
        }
        price_total += price_subtotal;
      });

      this.shopping_cart.total = price_total;
    },
    backToProductVariation( index ) {
      console.log( index );
    }
  },
  watch: {
    product_detail( now_status ) {
      if ( !now_status ) {
        this._.set(this.item_extra, 'category', {});
        this._.set(this.item_extra, 'product', {});
        this._.set(this.item_extra, 'remarks', null);
      }
    }
  },
  created() {
    this.store_data = this._.find(Store, {'id': 100001});
    this.store_menu = this._.find(Menu, {'id': this.store_data.menus[0]});
    this.shopping_cart.store = this.getUnit( this.store_data );
    this.shopping_cart.menu = this.getUnit( this.store_menu );
    this.toppings = new Array( this._.size(this.store_data.toppings) );
  }
};
</script>