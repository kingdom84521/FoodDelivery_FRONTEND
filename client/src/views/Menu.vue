<template>
  <v-container fluid>
    <v-row>
      <v-col
      >
        <!-- cols="10"
        class="pr-0" -->
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
          center-active 
          v-model="menu_tab"
        >
          <v-tab 
            v-for="(category, index) in store_menu.categories"
            :key="index"
          >
            {{ category.name }}
          </v-tab>
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
                <v-card-subtitle>
                  NT{{ lowestPrice(product.product_variations) }}$
                </v-card-subtitle>
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
          <v-card>
            <v-img
              max-height="250"
              src="../assets/butter.jpg"
            ></v-img>
            <v-card-title>
              <div> {{ item_extra.product.name }} </div>
              <v-spacer />
              <div> NT{{ temporary_item.subtotal * temporary_item.quantity }}$ </div>
            </v-card-title>
            <v-divider />

            <!-- Variations -->
            <v-list>
              <v-list-item-group
                v-model="product_variation"
                :mandatory="product_variation !== null"
              >
                <v-card-title>選擇種類</v-card-title>
                <template
                  v-for="(variation, index) in item_extra.product.product_variations"
                >
                  <v-list-item
                    :key="index"
                  >
                    <template v-slot:default="{ active,toggle }">
                      <v-list-item-icon>
                        <v-icon v-if="product_variation !== index">mdi-radiobox-blank</v-icon>
                        <v-icon v-else>mdi-radiobox-marked</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ variation.name }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text class="title">NT{{ variation.price }}$</v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>

            <!-- Toppings -->
            <v-list 
              v-if="item_extra.toppings"
            >
              <template
                v-for="(topping, top_index) in item_extra.toppings"
              >
                <v-list-item-group
                  v-model="toppings[top_index]"
                  :key="topping.id"
                  :mandatory="topping.quantity_min > 0 && toppings[top_index] !== null"
                  :multiple="topping.quantity_max > 1"
                >
                  <v-divider />
                  <v-card-title> {{ topping.name }} </v-card-title>
                  <template
                    v-for="(option, op_index) in topping.options"
                  >
                    <v-list-item
                      v-if="topping.quantity_max === 1"
                      :key="option.id"
                    >
                      <template 
                        v-slot:default="{ active,toggle }"
                      >
                        <v-list-item-icon>
                          <v-icon v-if="toppings[top_index] !== op_index">mdi-radiobox-blank</v-icon>
                          <v-icon v-else>mdi-radiobox-marked</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>{{ option.name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text class="title">+NT{{ option.price }}$</v-list-item-action-text>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </template>
            </v-list>

            <v-divider />

            <!-- 備註 -->
            <v-card-title>備註</v-card-title>

            <!-- 數量調整及送出 -->
            <v-card-actions>
              <v-row justify="center">
                <v-col cols="1">
                  <v-btn 
                    icon
                    color="green accent-3"
                    :disabled="temporary_item.quantity === 1"
                    @click="changeQuantity(temporary_item, '-')"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <div class="text-end font-weight-bold"> {{ temporary_item.quantity }} </div>
                </v-col>
                <v-col cols="1">
                  <v-btn 
                    icon
                    color="green accent-3"
                    @click="changeQuantity(temporary_item, '+')"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn 
                    block
                    color="green accent-3"
                    :disabled="!check_shopping_car"
                    @click="addToCart()"
                  >
                    加入購物車
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>

      <!-- 購物車 -->
      <!-- <v-col>
        <v-sheet
          elevation="5"
          color="green"
        >
          123132
        </v-sheet>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import Store from '@/assets/temp/storeList.json';
import Menu from '@/assets/temp/menuList.json';

export default {
  name: 'Menu',
  components: {
  },
  data: () => ({
    store_data: {},
    store_menu: {},
    menu_tab: null,
    store_detail: false,
    product_detail: false,
    check_shopping_car: false,
    product_variation: null,
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
    addToCart() {
      console.log("Add item to the cart!");

      let list_item_template = { ...this.temporary_item, "toppings": [], "remarks": null };
      list_item_template.price = list_item_template.subtotal;
      list_item_template.subtotal = list_item_template.price * list_item_template.quantity;

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
            list_item_template.toppings.push( topping_unit );
          } 
        });
      }

      this.shopping_cart.list.push( list_item_template );
      console.log( this.shopping_cart.list );

      this.product_detail = false;
      this.clearTemporaryItem();
    }
  },
  watch: {
    product_detail( now_status ) {
      if ( !now_status ) {
        this.product_variation = null;
        this._.set(this.item_extra, 'category', {});
        this._.set(this.item_extra, 'product', {});
        this._.set(this.item_extra, 'remarks', null);
      }
    },
    product_variation( variation_index ) {
      this.check_shopping_car = false;
      this.unsetToppings();

      if ( variation_index !== null ) {
        let variation = this._.get(this.item_extra, ['product', 'product_variations', variation_index]);
        this.temporary_item.variation = this.getUnit(variation);
        this.temporary_item.price = variation.price;
        this.temporary_item.subtotal = this.temporary_item.price;

        let topping_ids = this._.get(variation, 'topping_ids');

        // 有 toppings 才新增
        if ( topping_ids !== undefined ) {
          this._.set(this.item_extra, 'toppings', []);
          this._.forEach(topping_ids, topping_id => {
            let topping = this._.get(this.store_data, ['toppings', topping_id]);
            this.item_extra.toppings.push( topping );
          });
        } else {
          this.check_shopping_car = true;
        }
      }
    },
    toppings( now_status ) {
      // console.log( now_status );
      if ( this.item_extra.toppings !== null ) {
        this.temporary_item.subtotal = this.temporary_item.price;

        // 檢查每一個 Topping 是否符合
        let canCheckout = true;
        this._.forEach(this.item_extra.toppings, (topping, index) => {
          let choice_index = now_status[index];
          
          if ( typeof( choice_index ) === "object" ) {
            if ( choice_index === null ) {
              canCheckout = canCheckout && (topping.quantity_min === 0 );
            } else {
              this._.forEach(choice_index, option_index => {
                this.temporary_item.subtotal += this._.get(topping , ['options', option_index, 'price']);
              });
              canCheckout = canCheckout && (topping.quantity_max >= choice_index.length);
            }
          } else {
            this.temporary_item.subtotal += this._.get(topping , ['options', choice_index, 'price']);
            canCheckout = canCheckout && true
          }
        });
        this.check_shopping_car = canCheckout;
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