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
            <v-spacer />
            <v-btn icon>
              <v-icon color="green accent-4">mdi-alert-circle-outline</v-icon>
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
                <v-icon color="green accent-4">
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

        <!-- 餐點列表 -->
        <product-list 
          :store_menu="store_menu"
          @checkItemExtra="checkItemExtra"
        />

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
        <shopping-cart
          :shopping_cart="shopping_cart"
          @changeQuantity="changeQuantity"
          @backToProductVariation="backToProductVariation"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Store from '@/assets/temp/store_list.json';
import Menu from '@/assets/temp/menu_list.json';
import ProductList from '@/components/Menu/Product/ProductList/main';
import ProductVariation from '@/components/Menu/Product/ProductVariation/main';
import ShoppingCart from '@/components/Menu/ShoppingCart/main';

export default {
  name: 'Menu',
  components: {
    ProductList,
    ProductVariation,
    ShoppingCart
  },
  data: () => ({
    store_data: {},
    store_menu: {},
    store_detail: false,
    product_detail: false,
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
      return this._.minBy( variations, variation => { return variation.price } );
    },
    isItemExtra( product ) {
      return (product.product_variations.length !== 1 || product.product_variations[0].topping_ids.length !== 0);
    },
    checkItemExtra( category , product ) {
      this.temporary_item.category = this.getUnit( category );
      this.temporary_item.product = this.getUnit( product );
      this.temporary_item.variation = this.getUnit( product.product_variations[0] );
      this.temporary_item.quantity = 1;
      this.temporary_item.price = this.lowestPrice( product.product_variations ).price;
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
      item_template.remarks = this.item_extra.remarks;

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
      console.log( this.shopping_cart );
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
    // console.log( this.$route.params.storeId );
    // this.store_data = this._.find(Store, {'id': parseInt(this.$route.params.storeId)});
    this.store_data = this._.find(Store, {'id': 100001});
    this.store_menu = this._.find(Menu, {'id': this.store_data.menus[0]});
    this.shopping_cart.store = this.getUnit( this.store_data );
    this.shopping_cart.menu = this.getUnit( this.store_menu );
    this.toppings = new Array( this._.size(this.store_data.toppings) );
  }
};
</script>