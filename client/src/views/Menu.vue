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
        @click.stop="showStoreData = true"
      >
        <!-- 店名 -->
        <v-card-title>
          {{ storeData.name }}
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
    <v-dialog v-model="showStoreData" max-width="1000">
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
            @click="showStoreData=false"
          >
            <v-icon
              color="green accent-4"  
            >
              mdi-close
            </v-icon>
          </v-btn>
        </v-img>
        <v-card-title>
          {{ storeData.name }}
        </v-card-title>
        <v-container>

        </v-container>
      </v-card>
    </v-dialog>
    
    <!-- 餐點分類 -->
    <v-tabs background-color="green accent-3" center-active v-model="menu">
      <v-tab 
        v-for="(category, index) in storeMenu.categories"
        :key="index"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <!-- 餐點項目 -->
    <v-tabs-items v-model="menu">
      <v-tab-item
        v-for="(category, index) in storeMenu.categories"
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
            <v-spacer></v-spacer>
            <v-card-subtitle>
              NT{{ product.product_variations[0].price }}$
              <!-- NT{{ lowestPrice(product.product_variations) }}$ -->
            </v-card-subtitle>
            <v-btn
              icon
              v-if="product.product_variations.length !== 1"
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
    <v-dialog v-model="showItemExtra" max-width="1000">
      <v-card>
        <v-img
          max-height="250"
          src="../assets/butter.jpg"
        ></v-img>
        <v-card-title>
          <div> {{ itemExtra.product.name }} </div>
          <v-spacer />
          <div> NT{{ tempShopItem.subtotal }}$ </div>
        </v-card-title>
        <v-divider />

        <!-- Variation -->
        <v-list>
          <v-list-item-group
            v-model="product_variation"
            :mandatory="product_variation !== null"
          >
            <v-card-title>選擇種類</v-card-title>
            <template
              v-for="(variation, index) in itemExtra.product.product_variations"
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
        <v-list v-if="itemExtra.toppings">
          <v-list-item-group
            v-for="(topping, top_index) in itemExtra.toppings"
            v-model="tempShopItem.toppings[top_index]"
            :key="top_index"
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
                :key="op_index"
              >
                <template 
                  v-slot:default="{ active,toggle }"
                >
                  <v-list-item-icon>
                    <v-icon v-if="tempShopItem.toppings[top_index] !== op_index">mdi-radiobox-blank</v-icon>
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
        </v-list>

        <v-divider />
        
        <!-- 備註 -->
      </v-card>
    </v-dialog>
  </v-container>
</template>>

<script>
import Store from '@/assets/temp/storeList.json';
import Menu from '@/assets/temp/menuList.json';

export default {
  data: () => ({
    storeData: {},
    storeMenu: {},
    menu: null,
    showStoreData: false,
    showItemExtra: false,
    product_variation: null,
    itemExtra: {
      category: {},
      product: {},
      toppings: null,
      remarks: null
    },
    shoppingCart: {
      store_id: null,
      menu_id: null,
      list: [],
      total_price: 0
    },
    tempShopItem: {
      category_id: null,
      product_id: null,
      variation_id: null,
      quantity: null,
      subtotal: null
    }
  }),
  methods: {
    checkoutItemExtra( category , product ) {
      this.tempShopItem.category_id = category.id;
      this.tempShopItem.product_id = product.id;
      this.tempShopItem.variation_id = product.product_variations[0].id;
      this.tempShopItem.quantity = 1;
      this.tempShopItem.subtotal = product.product_variations[0].price;

      if ( product.product_variations.length !== 1 && product.product_variations[0].toppings_ids.length !== 0 ) {
        this.showItemExtra = true;
        this.itemExtra.category = category;
        this.itemExtra.product = product;
        return;
      }
      this.addToCart();
    },
    addToCart() {
      console.log("Add item to the cart!");
      console.log( this.tempShopItem );
    },
    lowestPrice( variations ) {
      return this._.minBy( variations, variation => { return variation.price } ).price;
    }
  },
  watch: {
    showItemExtra( showStatus ) {
      if ( !showStatus ) {
        this.product_variation = null;
        this._.forEach()
        this._.set(this.itemExtra, 'category', {});
        this._.set(this.itemExtra, 'product', {});
        this._.set(this.itemExtra, 'remarks', null);
        this._.unset(this.itemExtra, 'toppings');
        this._.unset(this.tempShopItem, 'toppings');
      }
    },
    product_variation( nowVariation ) {
      // 先移除原有的 topping
      this._.unset(this.itemExtra, 'toppings');
      this._.unset(this.tempShopItem, 'toppings');
      let toppings_ids = this._.get(this.itemExtra, ['product', 'product_variations', nowVariation, 'toppings_ids']);

      // 有 topping 才新增
      if ( toppings_ids !== undefined ) {
        this._.set(this.itemExtra, 'toppings', []);
        this._.set(this.tempShopItem, 'toppings', []);
        this._.forEach(toppings_ids, topping => {
          this.itemExtra.toppings.push(this._.get(this.storeData, ['toppings', topping]));  
          this.tempShopItem.toppings.push([]);  
        });
      }
    }
  },
  created() {
    this.storeData = this._.find(Store, {'id': 100001});
    this.storeMenu = this._.find(Menu, {'id': this.storeData.menus[0]});
    this.shoppingCart.store_id = this.storeData.id;
    this.shoppingCart.menu_id = this.storeMenu.id;
  }
};
</script>>