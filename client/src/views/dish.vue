<template>
    <v-container>
        <!-- Title -->
        <v-row>
            <v-col class="display-1">
                菜單列表
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <!--Dish list  -->
        <v-card>    
            <v-toolbar class="green darken-4" dark flat prominent>
                <!-- search bar -->
                <v-text-field 
                    class="mt-5 mx-4" label="搜尋..."
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted flat clearable
                    v-model="search"
                ></v-text-field>
            </v-toolbar>

            <!-- tabs -->
                <v-tabs background-color="green darken-1" fixed-tabs>
                    <!-- category tabs -->
                    <v-tab class="white--text title" v-for="(item, index) in dish" :key="index">{{item.category}}</v-tab>
                    <v-tabs-slider color="white"></v-tabs-slider>

                    <!-- menu list -->
                    <v-tab-item v-for="(item, index) in dish" :key="index">
                        <v-list class="list" max-height="380">
                            <v-list-item v-for="(menu, i) in item.list" :key="i">
                                <v-card class="mb-2" outlined>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-img class="ml-2" max-width="200" max-height="200" src="../assets/logo.png"></v-img>
                                        </v-col>
                                        <v-col cols="9">
                                            {{menu.name}}
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-list-item>
                        </v-list>
                    </v-tab-item>
                </v-tabs>        
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        search: "",
        dish: [
            {
                category: "主菜",
                list: [
                    {
                        name: "咖哩飯",
                        price: 80,
                        nutrition: 1800,
                        tag: "tag info"
                    },
                    {
                        name: "義大利麵",
                        price: 65,
                        nutrition: 1500,
                        tag: "tag info"
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info"
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info"
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info"
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info"
                    },
                    {
                        name: "排骨便當",
                        price: 70,
                        nutrition: 1600,
                        tag: "tag info"
                    }
                ]
            },
            {
                category: "小菜",
                list: [
                    {
                        name: "皮蛋豆腐",
                        price: 35,
                        nutrition: 350,
                        tag: "tag info"
                    },
                    {
                        name: "雞肉凱薩沙拉",
                        price: 50,
                        nutrition: 400,
                        tag: "tag info"
                    },
                    {
                        name: "燙青菜",
                        price: 30,
                        nutrition: 200,
                        tag: "tag info"
                    }
                ]
            },
            {
                category: "飲料",
                list: [
                    {
                        name: "冬瓜茶",
                        price: 20,
                        nutrition: 250,
                        tag: "tag info"
                    },
                    {
                        name: "日式綠茶",
                        price: 25,
                        nutrition: 150,
                        tag: "tag info"
                    },
                    {
                        name: "現打果汁",
                        price: 30,
                        nutrition: 300,
                        tag: "tag info"
                    }
                ]
            }
        ]
    }),
    methods: {

    }
}
</script>

<style>
    .list{
        overflow: auto
    }
</style>