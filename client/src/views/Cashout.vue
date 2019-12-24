<template>
  <v-container id="cashout">
    <v-stepper 
      vertical
      v-model="step_status"
    >
      <v-stepper-step 
        step="1"
        :complete="step_status > 1"
      >
        餐點確認
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card
          height="300px"
          flat
        >
          <v-list
            max-height="80%"
            class="overflow-y-auto"
            color="grey lighten-3"
          >
            <v-list-item
              v-for="(item, index) in cart_list"
              :key="index"
            >
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="8">
                    <v-row>
                      <v-col cols="5">
                        <div class="font-weight-bold headline">{{ item.product.name }}</div>
                      </v-col>
                    </v-row>
                    <v-row v-if="item.variation.name !== null">
                      <div class="pl-3 pb-3 headline">選項：{{ item.variation.name }}</div>
                    </v-row>
                    <v-row v-if="item.toppings.length !== 0" >
                      <v-col class="pt-0 pr-0">
                        <div class="headline">加點：{{ getToppingString(item.toppings) }}</div>
                      </v-col>
                    </v-row>
                    <v-row v-if="item.remarks">
                      <div class="pl-3 pb-3 title">備註：{{ item.remarks }}</div>
                    </v-row>
                  </v-col>
                  <!-- 數量和價錢 -->
                  <v-col align-self="center" cols="4">
                    <v-row justify="center" class="pa-0" no-gutters>
                      <v-col>
                        <div class="ont-weight-bold title">NT{{ item.price }}</div>
                      </v-col>
                      <v-col>
                        <div class="headline">X{{ item.quantity }} </div>
                      </v-col>
                      <v-col>
                        <div class="ont-weight-bold title">NT{{ item.subtotal }}</div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
          <v-card-text>
            <div class="headline font-weight-black">
              總價：{{ total_price }}
            </div>
          </v-card-text>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title" 
          @click="step_status = 2"
        >
          確認無誤
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          :to="{ name: 'restaurant', params: {restaurantId: order_list_item.restaurantId} }"
        >
          返回上頁
        </v-btn>
      </v-stepper-content>

      <v-stepper-step 
        step="2"
        :complete="step_status > 2"
      >
        送餐地址
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card
          height="400px"
          flat
        >
          <v-container>
            <v-row>
              <v-radio-group v-model="receiver_choice" row>
                <v-radio label="自己"/>
                <v-radio label="親人"/>
              </v-radio-group>
            </v-row>
            <template v-if="receiver_choice === 1">
              <v-row>
                <v-select v-model="family_choice" :items="family_list"/>
              </v-row>
            </template>
            <v-row>
              <v-col cols="2" class="pt-5">
                收餐人：
              </v-col>
              <v-col>
                <v-text-field 
                  v-model="receiver.name"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="pt-5">
                地址：
              </v-col>
              <v-col>
                <v-text-field 
                  v-model="receiver.address"
                  outlined
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title" 
          @click="step_status = 3"
        >
          確認無誤
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          @click="step_status = 1"
        >
          回上一步
        </v-btn>
      </v-stepper-content>

      <v-stepper-step 
        step="3"
        :complete="step_status > 3"
      >
        付款方式
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
          height="200px"
          flat
        >
          <v-container>
            <v-select v-model="cashout_choice" :items="cashout_methods"/>
          </v-container>
        </v-card>
        <v-btn 
          large 
          class="mr-1 green darken-2 white--text title"
          :loading="wait_submit"
          :disabled="wait_submit"
          @click="submit()"
        >
          付款
        </v-btn>
        <v-btn 
          text 
          large 
          class="ml-1 red darken-2 white--text title" 
          :disabled="wait_submit"
          @click="step_status = 2"
        >
          回上一步
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    step_status: 0,
    receiver_choice: 0,
    receiver: {},
    user: {
      id: "000001",
      name: "黃耑霖",
      phone: "0910809449",
      address: "360苗栗縣苗栗市天雲街1巷1號"
    },
    family_choice: null,
    family_index: 0,
    family:[
      {
        id: "f00001",
        name: "黃爸爸",
        nickName: "爸爸",
        phone: "0910475594",
        address: "300新竹市香山區浸水街406巷66弄11號"
      },
      {
        id: "f00002",
        name: "黃媽媽",
        nickName: "媽媽",
        phone: "0912123111",
        address: "300新竹市香山區浸水街406巷66弄11號"
      }
    ],
    cashout_choice: null,
    cashout_methods: ['信用卡', 'Apple Pay', 'Google Pay'],
    order_list_item : {
      orderId: "",
      receiverId: "",
      restaurantId: "",
      address: "",
      phone: "",
      totalPrice: 0,
      content: [],
    },
    wait_submit: false
  }),
  methods: {
    addCartToOrder() {
      this.order_list_item.orderId = this.user.id;

      let cart = this.$store.state.cart;
      this.order_list_item.restaurantId = cart.restaurantId.toString();
      this.order_list_item.totalPrice = cart.total;

      let table_name = [ 'category', 'product', 'variation' ];
      this._.forEach(cart.list, item => {
        let productName = "";
        let product_item_template = {
          productName: "",
          quantity: item.quantity,
          price: item.price
        };
        for ( let index = 0 ; index < table_name.length ; ++index ) {
          let name = table_name[index];
          if ( item[name].name ) {
            productName += (productName ? ',' : "") + ( index === 2 ? '~' : '' ) + item[name].name;
          }
        }
        let topping_name = "";
        this._.forEach(item.toppings, topping => {
          topping_name += (topping_name ? '_' : '') + this._.join(this._.map(topping.options_list, item => item.name), "+");
        });
        if ( topping_name ) {
          productName += ",_" + topping_name;
        }
        if ( item.remarks ) {
          productName += "," + item.remarks;
        }
        if ( productName.charAt( productName.length - 1 ) == "," ) {
          productName = productName.slice(0, productName.length - 1);
        }
        product_item_template.productName = productName;
        this.order_list_item.content.push( product_item_template );
        // console.log( JSON.stringify( product_item_template ) );
      });

      console.log( this.order_list_item );
    },
    getToppingString( toppings ) {
      let toppingString = "";
      for ( let topping_index = 0 ; topping_index < toppings.length ; ++topping_index ) {
        let options = toppings[ topping_index ].options_list;
        for ( let option_index = 0 ; option_index < options.length ; ++option_index ) {
          if ( toppingString !== "" ) {
            toppingString += "，";
          }
          toppingString += options[ option_index ].name;
        }
      }
      return toppingString;
    },
    submit() {
      this.order_list_item.receiverId = this.receiver.id;
      this.order_list_item.address = this.receiver.address;
      this.order_list_item.phone = this.receiver.phone;
      console.log( this.order_list_item );
      let submitOrder = async () => {
        this.wait_submit = true;
        try {
          await this.$axios({
            method: 'post',
            baseURL: 'http://localhost:3001',
            url: '/orders',
            'Content-Type': 'application/json',
            data: this.order_list_item
          });
          alert("訂餐成功");
          this.$router.push({ name: 'dashboard' });
        } catch (error) {
          console.log( error );
          console.log( JSON.stringify(this.order_list_item) );
          alert("訂餐失敗");
        }
        this.wait_submit = false;
      }

      submitOrder();
    }
  },
  computed: {
    ...mapState({
      cart_list: state => state.cart.list,
      total_price: state => state.cart.total,
    }),
    family_list() {
      return this._.map(this.family, person => { return person.nickName });
    }
  },
  watch: {
    receiver_choice( choice ) {
      this.receiver = {};
      if ( choice === 0 ) {
        this.receiver = { ...this.user};
      }
    },
    family_choice( nickName ) {
      // console.log( nickName );
      this.family_index = this._.findIndex(this.family, person => {
        return person.nickName === nickName;
      });
      this.receiver = { ...this.family[ this.family_index ] };
      // console.log( this.family_index );
    }
  },
  created() {
    // console.log( this.$store.state.cart );
    this.receiver = { ...this.user};
    if ( this.$store.state.cart.list.length === 0 ) {
      this.$router.push({ name: 'home' });
    }
    this.addCartToOrder();
  }
};
</script>

<style>
#cashout {
  font-size: 25px;
}

.v-label {
  font-size: 25px;
}
</style>