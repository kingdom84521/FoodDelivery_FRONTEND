<template>
    <v-container fluid>
        <v-row class="mb-12">
            <v-text-field append-icon="mdi-magnify" outlined placeholder="搜尋店家..."></v-text-field>
            <!-- <v-btn color="primary">
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
        </v-row>
        <v-row justify="space-between">
            <v-card class="mb-7" v-for="i in test" :key="i" height="300" width="490">
                <v-img height="155" src="../assets/italy.jpg"></v-img>
                <v-card-title >{{i.store}}</v-card-title>
                <v-card-text>預估{{i.time}}分鐘</v-card-text>
                <v-card-actions>
                    <v-btn outlined to="menu" class="primary" color="white" >點菜</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <v-fade-transition>
            <v-btn color="primary" fab fixed right bottom v-show="scrolling" @click="ScrollTop()">
                <v-icon>mdi-arrow-up-bold-outline</v-icon>
            </v-btn>
        </v-fade-transition>
    </v-container>
</template>>

<script>
export default {
    data: () => ({
        dateOption: ["Today ", "Tomorrow ", "Day after tomorrow "],
        date: "",
        test: [{store:"store1", time:"xxx"}, {store:"store2", time:"xxx"}, {store:"store3", time:"xxx"},
               {store:"store4", time:"xxx"}, {store:"store5", time:"xxx"}, {store:"store6", time:"xxx"}],
        scrolling: false
    }),
    methods:{
        handleScroll() {
            this.scrolling = window.pageYOffset > 0
        },
        ScrollTop(){
            window.scroll({top:0, behavior:"smooth"})
        }
    },
    computed: {
        /*testToAry() {
            let ary = [];
            for(let key in this.test) {
                ary.push({key: this.test[key]})
            }
            return ary
        }*/
    },
    created() {
        window.addEventListener( "scroll", this.handleScroll ) 
    },
    beforeDestroy() {
        window.removeEventListener( "scroll", this.handleScroll )
    }
};
</script>