<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col 
                v-for="( content, n ) in step"
                :key="n"
                :cols="12 / ( step.length + 1 )"
                class="pa-1"
            >
                <v-card
                    outlined
                    :color="content.color"
                    :class="`${ content.textColor }--text`"
                    @click="goToStep( n )"
                >
                    <v-card-title primary-title class="pb-4">
                        <v-flex row justify-space-between>
                            <div>
                                <v-icon right :color="content.textColor" class="pr-2 pl-3">{{ content.icon }}</v-icon>
                                {{ content.text }}
                            </div>
                            <v-icon color="white">mdi-check-circle</v-icon>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "step",
    props: {
        now: {
            type: Number,
            required: true
        }
    },
    data: () => {
        return {
            step: [
                {
                    icon: "mdi-script-text",
                    color: "",
                    text: "閱讀帳戶條款",
                    textColor: "green",
                    finished: false
                },
                {
                    icon: "mdi-account",
                    color: "",
                    text: "設定帳號和密碼",
                    textColor: "green",
                    finished: false
                },
                {
                    icon: "mdi-account-details",
                    color: "",
                    text: "輸入個人資料",
                    textColor: "green",
                    finished: false
                },
                {
                    icon: "mdi-account-check",
                    color: "",
                    text: "完成註冊",
                    textColor: "green",
                    finished: false
                }
            ]
        }
    },
    methods: {
        goToStep( now ) {
            // for ( let n = now ; n > 0 ; --n )
            // {
            //     this.step[ n - 1 ].color = "green"
            //     this.step[ n - 1 ].textColor = "white"
            //     this.step[ n - 1 ].finished = true
            // }
            // for ( let n = now ; n <= 2 ; ++n )
            // {
            //     this.step[ n ].color = ""
            //     this.step[ n ].textColor = "green"
            //     this.step[ n ].finished = false
            // }
            this.$emit( "step-change", now )
        }
    },
    watch: {
        now( newValue ) {

            for ( let n = newValue ; n > 0 ; --n )
            {
                this.step[ n - 1 ].color = "green"
                this.step[ n - 1 ].textColor = "white"
                this.step[ n - 1 ].finished = true
            }
            for ( let n = newValue ; n <= 2 ; ++n )
            {
                this.step[ n ].color = ""
                this.step[ n ].textColor = "green"
                this.step[ n ].finished = false
            }
        }
    }
}
</script>

<style scoped>

</style>