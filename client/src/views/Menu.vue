<template>
    <v-container fluid>
        <v-card max-height="250">
            <v-img max-height="249" src="../assets/italy.jpg"></v-img>
        </v-card>
        <v-row class="green accent-2" align="center">
            <!-- 店名 -->
            STORE NAME
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-10">
            <v-tabs background-color="green accent-3" grow center>
                <v-tabs-slider></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
                  Tab {{ i }}
                </v-tab>
                <v-tab-item v-for="k in tabs" :key="k" :value="'tab-' + k">
                    <v-row>
                        <v-col sm="4"  v-for="i in main" :key="i" >
                            <v-card class="mb-6 green accent-1" outlined width="490">
                                <v-img height="155" src="../assets/italy.jpg"></v-img>
                                <v-card-title >{{i.name}} NT{{i.price}}$</v-card-title>
                                <v-card-text>{{i.nutrition}}kcal</v-card-text>
                                <v-card-actions>
                                   <v-btn fab color="teal" @click="Add()">
                                       <v-icon>mdi-plus</v-icon>
                                   </v-btn>
                                </v-card-actions>
                  </v-card>                            
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-row>
        <v-row >
            <!-- <v-navigation-drawer expand-on-hover permanent absolute right>
                DRAWER TEST
            </v-navigation-drawer> -->
        </v-row>
    </v-container>
</template>>

<script>
export default {
    data: () => ({
        main: [ { name : "咖哩飯",
                  price : 65,
                  nutrition : 800 
                },
                { name : "蒜香海鮮義大利麵",
                  price : 80,
                  nutrition : 750
                },
                { name : "皮蛋瘦肉粥",
                  price : 60,
                  nutrition : 600 
                }
              ],
        dish: [ { name : "白菜滷",
                  price : 20,
                  nutrition : 100
                },
                { name : "皮蛋豆腐",
                  price : 35,
                  nutrition : 200
                },
                { name : "海帶豆干",
                  price : 30,
                  nutrition : 150
                },
              ],
        drink: ["麥茶 $20", "蜜茶 $20", "冬瓜茶 $15", "仙草干茶 $25"],
        pass: [],
        tabs: 3,
    }),
    methods:{
        getTotal: function(){
            this.total = 0
            var mp = parseInt(this.mainprice.slice(-2))
            var dp = parseInt(this.dishprice.slice(-2))
            var drp = parseInt(this.drinkprice.slice(-2))
            this.total = mp + dp + drp
        },
        passMenu: function(){
            this.pass = []
            this.pass.push(this.mainprice)
            this.pass.push(this.dishprice)
            this.pass.push(this.drinkprice)
            this.pass.push(this.total.toString())
        },
        Add: function(){
            console.log("Btn click!")
        }
        
    }
};
</script>>