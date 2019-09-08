<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col 
                v-for="( content, n ) in step"
                :key="n"
                cols="4"
                class="pa-1"
            >
            <v-fade-transition>
                <v-card
                    outlined
                    :color="``"
                    :class="`green--text`"
                    @click="test( n )"
                >
                    <v-card-title primary-title class="pb-4">
                        <v-flex row justify-space-between>
                            <div>
                                <v-icon right :color="`green`" class="pr-2 pl-3">{{ content.icon }}</v-icon>
                                {{ content.text }}
                            </div>
                            <v-icon color="white">mdi-check-circle</v-icon>
                        </v-flex>
                    </v-card-title>
                </v-card>
            </v-fade-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => {
        return {
            step: [
                {
                    icon: "mdi-account",
                    color: "",
                    text: "設定帳號和密碼",
                    textColor: "white",
                    finished: false
                },
                {
                    icon: "mdi-account-details",
                    color: "",
                    text: "設定帳號和密碼",
                    textColor: "white",
                    finished: false
                },
                {
                    icon: "mdi-account-check",
                    color: "",
                    text: "設定帳號和密碼",
                    textColor: "white",
                    finished: false
                }
            ],
            now: 0,
        }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>