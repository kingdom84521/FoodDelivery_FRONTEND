<template>
  <v-container fluid>
    <!-- 購物車 -->
    <!-- <v-navigation-drawer expand-on-hover absolute right>
      <v-list>
        <v-list-item-group></v-list-item-group>
      </v-list>
      <v-divider />小計:
      服務費:
      <v-spacer></v-spacer>
      總計:
    </v-navigation-drawer> -->

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
    <v-dialog v-model="store_detail" max-width="1000">
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
    <v-tabs background-color="green accent-3" center-active v-model="menu_tab">
      <v-tab 
        v-for="(category, index) in store_menu.categories"
        :key="index"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <!-- 餐點項目 -->
    <v-tabs-items v-model="menu_tab">
      <v-tab-item
        v-for="(category, index) in store_menu.categories"
        :key="index"
      >
        <v-card
          v-for="(product, index) in category.products"
          :key="index"
          @click="checkoutItemExtra(category, product)"
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
    <v-dialog v-model="product_detail" max-width="600">
      <v-card>
        <v-img
          max-height="250"
          src="../assets/butter.jpg"
        ></v-img>
        <v-card-title>
          <div> {{ item_extra.product.name }} </div>
          <v-spacer />
          <div> NT{{ temporary_item.subtotal }}$ </div>
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
        <v-list v-if="item_extra.toppings">
          <template
            v-for="(topping, top_index) in item_extra.toppings"
          >
            <v-list-item-group
              v-model="temporary_item.toppings[top_index]"
              :key="topping.id"
              :mandatory="topping.quantity_min > 0"
              :multiple="topping.quantity_max > 1"
            >
              <v-divider />
              <v-card-title> {{ topping.name }} </v-card-title>
              <template
                v-for="(option, op_index) in topping.options"
              >
                <v-list-item
                  v-if="topping.quantity_min === 1"
                  :key="option.id"
                >
                  <template 
                    v-slot:default="{ active,toggle }"
                  >
                    <v-list-item-icon>
                      <v-icon v-if="temporary_item.toppings[top_index] !== op_index">mdi-radiobox-blank</v-icon>
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
      </v-card>
    </v-dialog>
  </v-container>
</template>>

<script>
import Store from '@/assets/temp/storeList.json';
import Menu from '@/assets/temp/menuList.json';

export default {
  data: () => ({
    store_data: {},
    store_menu: {},
    menu_tab: null,
    store_detail: false,
    product_detail: false,
    product_variation: null,
    item_extra: {
      category: {},
      product: {},
      remarks: null
    },
    shopping_cart: {
      store_id: null,
      menu_id: null,
      list: [],
      total: 0
    },
    temporary_item: {
      category_id: null,
      product_id: null,
      variation_id: null,
      quantity: null,
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
    checkoutItemExtra( category , product ) {
      this.temporary_item.category_id = category.id;
      this.temporary_item.product_id = product.id;
      this.temporary_item.variation_id = product.product_variations[0].id;
      this.temporary_item.quantity = 1;
      this.temporary_item.subtotal = product.product_variations[0].price;

      if ( this.isItemExtra(product) ) {
        this.product_detail = true;
        this.item_extra.category = category;
        this.item_extra.product = product;
        return;
      }
      this.addToCart();
    },
    addToCart() {
      console.log("Add item to the cart!");
      this.clearTemporaryItem();
    },
    clearTemporaryItem() {
      this._.unset(this.temporary_item, 'toppings');
      this._.forEach(this.temporary_item, (value, key) => {
        this._.set(this.temporary_item, [key], null);
      });
    },
    unsetToppings() {
      this._.unset(this.item_extra, 'toppings');
      this._.unset(this.temporary_item, 'toppings');
    }
  },
  watch: {
    product_detail( now_status ) {
      if ( !now_status ) {
        this.product_variation = null;
        this._.set(this.item_extra, 'category', {});
        this._.set(this.item_extra, 'product', {});
        this._.set(this.item_extra, 'remarks', null);
        this.unsetToppings();
      }
    },
    product_variation( variation_index ) {
      // 先移除原有的 toppings
      this.unsetToppings();
      let topping_ids = this._.get(this.item_extra, ['product', 'product_variations', variation_index, 'topping_ids']);

      // 有 toppings 才新增
      if ( topping_ids !== undefined ) {
        this._.set(this.item_extra, 'toppings', []);
        this._.set(this.temporary_item, 'toppings', []);
        this._.forEach(topping_ids, (topping_id, index) => {
          let topping = this._.get(this.store_data, ['toppings', topping_id]);
          this.item_extra.toppings.push( topping );  
          // this.temporary_item.toppings.push( null );
          this._.set(this.temporary_item, ['toppings', index], []);
        });
        console.log( this.temporary_item.toppings );
      }
    }
  },
  created() {
    this.store_data = this._.find(Store, {'id': 100001});
    this.store_menu = this._.find(Menu, {'id': this.store_data.menus[0]});
    this.shopping_cart.store_id = this.store_data.id;
    this.shopping_cart.menu_id = this.store_menu.id;
  }
};
</script>>