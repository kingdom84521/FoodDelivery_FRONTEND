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
      <v-card-actions>
        <!-- 店名 -->
        <v-card-title>
          {{ storeData.name }}
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn 
          icon
          @click.stop="showStoreData = true"
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
      v-model="showStoreData"
      max-width="1000"
    >
      <v-card>
        <v-img
          max-height="250"
          src="../assets/italy.jpg"
        ></v-img>
        <v-container>

        </v-container>
      </v-card>
    </v-dialog>
    
    <!-- 餐點分類 -->
    <v-tabs
      background-color="green accent-3" 
      center-active
      v-model="menu"
    >
      <v-tab 
        v-for="category in storeMenu.categorys"
        :key="category.key"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>

    <!-- 餐點項目 -->
    <v-tabs-items
      v-model="menu"
    >
      <v-tab-item
        v-for="category in storeMenu.categorys"
        :key="category.key"
      >
        <v-card
          v-for="(item, i) in storeMenu.items[ category.key ]"
          :key="i"
          @click="checkoutItemExtra(category, item)"
        >
          <!-- <v-img  src="@/assets/italy.jpg"></v-img> -->
          <v-card-actions>
            <v-card-title> {{ item.name }} </v-card-title>
            <v-spacer></v-spacer>
            <v-card-subtitle>
              NT{{ item.price }}$
            </v-card-subtitle>
            <v-btn
              icon
              v-if="category.extra"
            >
              <v-icon
                color="green accent-4"
              >
                mdi-plus-box-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
          <!-- <v-card-text>{{ items.nutrition }}kcal</v-card-text> -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- 餐點額外項目 -->
    <v-dialog
      v-model="showItemExtra"
      max-width="1000"
    >
      <v-card>
        <v-img
          max-height="250"
          src="../assets/italy.jpg"
        ></v-img>
        <v-container>

        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>>

<script>
import Store from '@/assets/temp/storeList.json';
import Menu from '@/assets/temp/store1.json';

export default {
  data: () => ({
    storeData: {},
    storeMenu: {},
    menu: null,
    showStoreData: false,
    showItemExtra: false
  }),
  methods: {
    checkoutItemExtra( category , item ) {
      if ( category.extra ) {
        this.showItemExtra = true;
        return;
      }
      this.addToCart(category, item);
    },
    addToCart( category , item ) {
      console.log("Add item to the cart!");
    }
  },
  created() {
    this.storeData = Store.find( (element) => {
      return element.id === "store1";
    });
    this.storeMenu = Menu;
    // console.log( this.storeData );
    // console.log( this.storeMenu );
  }
};
</script>>