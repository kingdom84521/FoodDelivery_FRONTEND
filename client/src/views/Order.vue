<template>
    <v-container>
        <v-layout text-center row>
            <v-flex mb-12>
                <h1 class="display-2 font-weight-bold mb-3">選擇店家</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-card class="mx-2 py-1" height="300" width="350">
                <v-img height="150" src="../pic/kid.gif">
                </v-img>
                <v-card-title >店名</v-card-title>
                <v-card-text>預估xxx分鐘</v-card-text>
                <v-card-actions>
                    <v-btn outlined to="menu" class="primary" color="white" >點菜</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>>

<script>
export default {
    data: () => ({
        dateOption: ["Today ", "Tomorrow ", "Day after tomorrow "],
        date: ""
    }),
    methods: {
        /*obtainDate(){
            var d = new Date();
            var mon = d.getMonth+1;
            var day = d.getDate;
            var wd = d.getDay+1;

            dateOption[0] = dateOption[0] + mon.toString() + "月" + day.toString() + "日";
            if ( day <  )
            dateOption[1] = dateOption[0] + mon + "月" + day + "日";
            dateOption[2] = dateOption[0] + mon + "月" + day + "日";
        }*/
    }
};
</script>