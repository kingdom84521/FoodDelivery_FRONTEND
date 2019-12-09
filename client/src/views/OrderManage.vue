<template>
    <v-container fluid>
        <v-navigation-drawer permanent>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-navigation-drawer>

        <v-tabs fixed-tabs>
            <v-tab v-for="i in tabname" :key="i">{{i}}</v-tab>
            <!-- Search -->
            <v-tab-item>
                <v-text-field label="編號查詢" outlined clearable></v-text-field>
                <v-select label="菜單查詢" outlined multiple chips></v-select>
                <row>
                    <v-text-field></v-text-field>
                </row>
                <v-btn ></v-btn>
            </v-tab-item>
            <!-- Modify -->
            <v-tab-item>
            </v-tab-item>
            <!-- Refuse -->
            <v-tab-item>
            </v-tab-item>
        </v-tabs>
        <v-expansion-panels>
            <v-expansion-panel v-for="i in list" :key="i">
            <v-expansion-panel-header>{{i.no}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                {{i.menu}}
                {{i.total}}
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        
        tabname: ["訂單查詢", "訂單修改", "拒絕訂單"],
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
    methods:{
        
    }
}

/* menu: {
    id: "",
    category: {
        name: "",
        special: [],
        item: [
            {
                name: "",
                price: "",
                nutrition: "",
                sp: ""
            }
        ]
    },
},
*/

</script>

<style>

</style>