<template>
  <v-sheet>
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
      <v-tabs-slider color="orange darken-2"/>
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
          @click="checkItemExtra(category, product)"
        >
          <v-container fluid class="pa-0">
            <v-row class="pa-0 pl-3">
              <v-col cols="2" class="pr-0">
                <v-img  
                  height="100" 
                  width="100" 
                  src="https://fakeimg.pl/100x100" 
                />
              </v-col>
              <v-col cols="9" class="ml-n12">
                <v-row>
                  <v-col cols="4">
                    <div class="font-weight-bold headline"> {{ product.name }} </div>
                  </v-col>
                  <v-col>
                    餐點標籤：
                  </v-col>
                </v-row>
                <v-row class="mt-n4 pb-0">
                  <v-col cols="2" class="pr-0">
                    營養成分：
                  </v-col>
                  <template
                    v-for="(item, name, index) in lowestPrice(product.product_variations).nutrition.nutrition_facts"
                  >
                    <v-col
                      v-if="index%nutrition_one_line === 0  && index !== 0"
                      :key="index+'_pre_space'"
                      class="pa-0"
                      cols="2"
                    />
                    <v-col 
                      :key="index+'_item'"
                      :cols="nutrition_space"
                      :class="nutritionClass( index )"
                    >
                      <v-row no-gutters>
                        <v-col cols="6">
                          {{ nutrition_name.nutrition[name].chinese_name }}
                        </v-col>
                        <v-col class="text-end">
                          {{ `${ typeof(item) === 'object' ? item.total : item }` }}
                        </v-col>
                        <v-col>
                          {{ getNutritionUnitName( name ) }}
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      v-if="index%nutrition_one_line === nutrition_one_line - 1"
                      :key="index+'_last_space'"
                      :cols="lastSpace()"
                      class="pa-0"
                    />
                  </template>
                </v-row>
              </v-col>
              <v-col align-self="end" class="text-end pr-8">
                <v-btn
                  icon
                  v-if="isItemExtra( product )"
                  class="mb-5 mr-n2"
                >
                  <v-icon color="green accent-4">
                    mdi-plus-box-outline
                  </v-icon>
                </v-btn>
                <div class="font-weight-medium">
                  NT{{ lowestPrice(product.product_variations).price }}$
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import NutritionName from '@/assets/temp/nutrition_name.json';

export default {
  name: "ProductList",
  props: {
    store_menu: {
      type: Object,
      require: true
    },
  },
  data: () => ({
    menu_tab: null,
    nutrition_name: {},
    nutrition_space: 3,
    nutrition_one_line: 3
  }),
  methods: {
    lowestPrice( variations ) {
      return this._.minBy( variations, variation => { return variation.price } );
    },
    lastSpace() {
      let one_line = this.nutrition_one_line;
      let one_space = this.nutrition_space;

      let last_extra_space = 10 - (one_line * one_space);
      if ( last_extra_space < 0 ) {
        this.nutrition_space = Math.floor(10 / one_line);
        last_extra_space = 10 - (one_line * one_space);
      }
      return last_extra_space;
    },
    nutritionClass( index ) {
      let class_type = '';
      if ( index%this.nutrition_one_line === 0 ) {
        class_type += 'ml-n12';
      } else {
        class_type += 'ml-n7';
      }
      if ( index > this.nutrition_one_line-1 ) {
        class_type += ' ' + 'mt-n4';
      }
      return class_type;
    },
    getNutritionUnitName( name ) {
      let unit = this.nutrition_name.unit;
      let unit_index = this.nutrition_name.nutrition[name].unit_index;
      return unit[ unit_index ].abbreviation;
    },
    isItemExtra( product ) {
      return (product.product_variations.length !== 1 || product.product_variations[0].topping_ids.length !== 0);
    },
    checkItemExtra( category , product ) {
      this.$emit('checkItemExtra', category, product);
    }
  },
  created() {
    this.nutrition_name = NutritionName;
  }
}
</script>

<style>

</style>