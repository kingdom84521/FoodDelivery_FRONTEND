<template>
  <v-container fluid>
    <v-row>
      <!-- 菜單 -->
      <v-col>
        <!-- 餐廳招牌 -->
        <v-card>
          <v-img 
            max-height="250"
            :src="restaurant_data.imgURL"
            v-if="restaurant_data.imgURL"
          />
          <v-img 
            max-height="250"
            src="../assets/italy.jpg"
            v-else
          />
          <v-card-actions
            @click.stop="restaurant_detail = true"
          >
            <!-- 店名 -->
            <v-card-title class="display-2">
              {{ restaurant_data.name }}
            </v-card-title>
            <v-spacer />
            <v-btn icon>
              <v-icon color="green accent-4">mdi-alert-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- 餐廳詳細資料 -->
        <v-dialog 
          v-model="restaurant_detail" 
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
                @click="restaurant_detail=false"
              >
                <v-icon color="green accent-4">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-img>
            <v-card-title>
              {{ restaurant_data.name }}
            </v-card-title>
            <v-container>

            </v-container>
          </v-card>
        </v-dialog>

        <!-- 餐點列表 -->
        <product-list 
          :restaurant_menu="restaurant_menu"
          @checkItemExtra="checkItemExtra"
        />

        <!-- 餐點額外項目 -->
        <v-dialog 
          v-model="product_detail" 
          max-width="600"
        >
          <product-variation
            :product_detail="product_detail"
            :restaurant_data="restaurant_data"
            :item_extra="item_extra"
            :temporary_item="temporary_item"
            :toppings="toppings"
            :unset-toppings="unsetToppings"
            :add-to-cart="addToCart"
            :back-to-cart="backToCart"
            :show-img="have_img"
            @changeQuantity="changeQuantity"
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
          @backToProductVariation="backToProductVariation"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Restaurant from '@/assets/temp/restaurant_list.json';
import Menu from '@/assets/temp/menu_list.json';
import ProductList from '@/components/Menu/Product/ProductList';
import ProductVariation from '@/components/Menu/Product/ProductVariation';
import ShoppingCart from '@/components/Menu/ShoppingCart';

export default {
  name: 'Menu',
  components: {
    ProductList,
    ProductVariation,
    ShoppingCart
  },
  props: {
    restaurantId: {
      type: String,
      require: true
    }
  },
  data: () => ({
    restaurant_data: {},
    restaurant_menu: {},
    restaurant_detail: false,
    product_detail: false,
    toppings: [],
    item_extra: {
      category: {},
      product: {},
      toppings: null,
      remarks: null
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
    changeQuantity( item , state ) {
      if ( state === '+' ) {
        item.quantity += 1;
      } else if ( state === '-' ) {
        item.quantity -= 1;
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
      let item_template = { ...this.temporary_item, "toppings": [], "remarks": null, "checker": null };
      item_template.price = item_template.subtotal;
      item_template.subtotal = item_template.price * item_template.quantity;
      item_template.remarks = this.item_extra.remarks;

      let item_checker = "" + item_template.category.id;
      item_checker += "," + item_template.product.id;
      item_checker += "," + item_template.variation.id;

      if ( this.item_extra.toppings !== null ) {
        let toppings_choice = this.toppings;
        this._.forEach(this.item_extra.toppings, (topping, index) => {
          let choice_index = toppings_choice[index];
          let topping_unit =  { ...this.getUnit( topping ), "options_list": [] };

          if ( choice_index !== null ) {
            let topping_string = "" + topping_unit.id;

            if ( typeof( choice_index ) === "number" ) {
              let option_unit = this.getUnit( topping.options[choice_index] );
              topping_unit.options_list.push( option_unit );       

              topping_string += "_" + option_unit.id;
            } else {
              this._.forEach(choice_index, option_index => {
                let option_unit = this.getUnit( topping.options[option_index] );
                topping_unit.options_list.push( option_unit );  

                topping_string += "_" + option_unit.id;
              });
            } 
            item_template.toppings.push( topping_unit );

            item_checker += "," + topping_string;
          } 
        });
      }

      item_template.checker = item_checker + "," + item_template.remarks;
      this.clearTemporaryItem();
      this.unsetToppings();
      return item_template;
    },
    addToCart() {
      let list_item_template = this.getNewListItem();
      this.$store.dispatch('cart/addProductToCart', list_item_template);
      console.log( this.$store.state.cart );
      this.product_detail = false;
    },
    backToCart() {
    },
    backToProductVariation( index ) {
      console.log( 'Fix index:', index );
    }
  },
  computed: {
    have_img() {
      return this.restaurant_data.imgURL !== "";
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
    this.restaurant_data = this._.find(Restaurant, {'id': parseInt(this.restaurantId)});
    this.restaurant_menu = this._.find(Menu, {'id': this.restaurant_data.menus[0]});
    this.toppings = new Array( this._.size(this.restaurant_data.toppings) );
    this.$store.dispatch('cart/setCartInit', {
      restaurantId: this.restaurantId,
      restaurantName: this.restaurant_data.name,
    }); 
  }
};
</script>