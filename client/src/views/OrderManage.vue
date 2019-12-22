<template>
    <v-container>
        <v-card>
            <v-toolbar class="green darken-4" dark flat prominent>
                <v-text-field 
                    class="mt-5 mx-4" label="搜尋..."
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted flat clearable
                ></v-text-field>
            </v-toolbar>

            <v-tabs background-color="green darken-1" fixed-tabs>
                    <v-tab class="white--text title" v-for="(i,index) in tabname" :key="index">{{i}}</v-tab>

                    <v-tabs-slider color="white"></v-tabs-slider>
                    
                    <v-tab-item v-for="(ls, index) in list" :key="index">
                        {{ls.no}}
                    </v-tab-item>
            </v-tabs>

        </v-card>

        <!-- <v-expansion-panels>
            <v-expansion-panel v-for="i in list" :key="i">
                <v-expansion-panel-header>{{i.no}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    {{i.menu}}
                    {{i.total}}
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels> -->
    </v-container>
</template>
<script>
export default {
    data: () => ({
        tabname: ["所有", "製作中", "運送中", "已完成"],
        order: {},
        list: [{
            no: "201911170001",
            menu: "................",
            total: ".....",
            time: ""
        }, {
            no: "201911170002",
            menu: "............",
            total: ".....",
            time: ""
        }, {
            no: "201911170003",
            menu: "..............",
            total: ".....",
            time: ""
        }]
    }),
    methods: {
        
    }
}
</script>