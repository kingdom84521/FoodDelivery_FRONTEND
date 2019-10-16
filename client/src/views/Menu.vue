<template>
    <v-container fluid>
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
                <v-card color="#69F0AE" outlined max-height="250">
                    <v-row no-gutters align="center" justify="center">
                        <v-col cols="3" align-self="start">
                            <v-card-title class="display-2 ml-5">STORE NAME</v-card-title>
                            <v-card-subtitle class="title ml-10">tel:xx-xxxx-xxxx</v-card-subtitle>
                            <v-card-text>address:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</v-card-text>
                        </v-col>
                        <v-col cols="9">
                            <v-img max-height="249" src="../assets/italy.jpg">

                            </v-img>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            
        </v-row>
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