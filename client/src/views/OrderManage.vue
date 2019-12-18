<template>
    <v-container>
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
        tabname: ["訂單查詢", "訂單修改", "拒絕訂單"],
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