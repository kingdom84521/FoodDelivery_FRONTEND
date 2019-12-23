<template>
    <div>
        <v-row justify="end">
            <v-col
                cols="5"
            >
                <v-expand-transition>
                    <div v-if="this.type !== 'ongoing'">
                        <v-text-field
                            outlined
                            prepend-inner-icon="mdi-magnify"
                            clear-icon="mdi-close"
                            clearable
                            v-model="keyword"
                            hide-details
                            placeholder="請輸入您要搜尋的關鍵字"
                        />
                    </div>
                </v-expand-transition>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
            <v-col class="border--black">
                <v-sheet 
                    class="pa-2 overflow-y-auto"
                    max-height="600"
                    height="600"
                >
                    <order-Item></order-Item>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import orderItem from "@/components/Dashboard/purchase/purchasePage/orderItem"

export default {
    components: {
        orderItem
    },
    props: {
        type: String
    },
    data: () => {
        return {
            keyword: ""
        }
    },
    methods: {
    }
}
</script>

<style>
    .border--black {
        border: 1px #D8D8D8 solid ;
    }
</style>