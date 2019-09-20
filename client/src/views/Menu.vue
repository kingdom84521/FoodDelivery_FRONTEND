<template>
    <v-container>
        <v-layout text-center row>
            <v-flex mb-12>
                <h1 class="display-2 font-weight-bold mb-3">選擇菜色</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-col>
                <v-select outlined :items="main" label="主食..." v-model="mainprice" @change="getTotal()"></v-select>
                <v-select outlined :items="dish" label="小菜..." v-model="dishprice" @change="getTotal()"></v-select>
                <v-select outlined :items="drink" label="飲料..." v-model="drinkprice" @change="getTotal()"></v-select>

                <v-input label="總計" :messages="total.toString()" ></v-input>
                <v-btn class="mt-9 primary" color="white" outlined to="submit" @click="passMenu()">送出</v-btn>
            </v-col>
            <v-col>
                <v-card class="ml-auto py-1" height="350" width="500">
                    <v-img height="200" src="../pic/kid.gif"></v-img>
                    <v-card-title >所選店名</v-card-title>
                    <v-card-text>地址:xx市xx區xx路xx號</v-card-text>
                    <v-card-text>電話:04-xxxxxxxx</v-card-text>
                </v-card>
            </v-col>
        </v-layout>
    </v-container>
</template>>

<script>
export default {
    data: () => ({
        main: ["咖哩飯 $65", "鍋燒烏龍麵 $65", "廣東粥 $50", "排骨便當 $60"],
        dish: ["皮蛋豆腐 $30", "海帶豆干 $25", "白菜滷 $20", "隔間肉 $40"],
        drink: ["麥茶 $20", "蜜茶 $20", "冬瓜茶 $15", "仙草干茶 $25"],
        mainprice: "00",
        dishprice: "00",
        drinkprice: "00",
        total: 0,
        pass: []
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
        }
        
    }
};
</script>>