<template>
  <v-sheet
        class="ma-2 mt-3 pa-3 rounded"
        color="white"
        elevation="2"
    >
        <v-row justify="start">
            <v-col cols="2" class="ml-2">
                <div class="display-1">
                    親屬列表
                </div>
                <div class="grey--text text--lighten-2 mt-1">
                    在這裡管理您的親屬列表
                </div>
            </v-col>
        </v-row>
        <v-divider />
        <v-row no-gutters>
            <v-col>
                <v-sheet
                    elevation="2"
                    class="ma-2 mt-3 pa-3 rounded"
                >
                    <v-row class="mx-2" justify="space-between">
                        <v-col cols="6">
                            <v-text-field
                                prepend-icon="mdi-magnify"
                                hide-details
                            />
                        </v-col>
                        <v-col cols="6">
                            <div class="d-flex justify-end flex-row">
                                <v-btn text x-large color="success">
                                    <v-icon left>
                                        mdi-plus
                                    </v-icon>
                                    <div>
                                        新增成員
                                    </div>
                                </v-btn>
                                <v-btn text x-large>
                                    <v-icon left>
                                        mdi-sort-variant
                                    </v-icon>
                                    <div>
                                        排序
                                    </div>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="my-3" />
                    <v-row no-gutters>
                        <v-col 
                            cols="4"
                            :class="{ 'mb-2': !atLastRow() }" 
                            v-for="( person, index ) in relatives" 
                            :key="index"
                        >
                            <relative-block></relative-block>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
import RelativeBlock from './relativeBlock'

export default {
    components: {
        RelativeBlock
    },
    data: () => {
        return {
            relatives: [
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
                {
                    name: "呱吉",
                    relationship: "大便"
                },
            ]
        }
    },
    methods: {
        atLastRow( n ) {
            let length = this.relatives.length
            switch ( length % 3 )
            {
                case 0:
                    return n === length - 1 || n === length - 2 || n === length - 3
                case 1:
                    return n === length - 1 
                case 2:
                    return n === length - 1 || n === length - 2
            }
        },
        atLastColumn( n ) {
            return n % 3 === 2
        }
    }
}
</script>

<style>

</style>