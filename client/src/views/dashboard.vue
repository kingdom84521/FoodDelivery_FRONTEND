<template>
    <v-container fluid>
        <v-sheet>
            <v-row>
                <v-col
                    class="text-center"
                    cols="3"
                >
                    <v-row>
                        <v-col>
                            <v-avatar
                                size="175"
                                color="grey"
                                class="mt-3"
                            >
                                <img :src="src" alt="alt">
                            </v-avatar>
                        </v-col>
                    </v-row>
                    <v-row
                        dense
                    >
                        <v-col>
                            <div>
                                {{ account.name }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                        justify="center"
                        @click="test"
                    >
                        <v-col
                            cols="1"
                        >
                            <v-icon 
                                size="15"
                                left
                            >
                                mdi-pencil
                            </v-icon>
                        </v-col>
                        <v-col
                            cols="3"
                        >
                            <div
                                style="text-decoration: underline;"
                            >
                                編輯用戶頭像
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    cols="9"
                >

                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>

<script>
export default {
    name: "Dashboard",
    components: {
    },
    data: () => {
        return {
            src: "https://ui-avatars.com/api/?name=John+Doe&size=175",
            account: {
                name: "default"
            }
        }
    }
}
</script>

<style>

</style>