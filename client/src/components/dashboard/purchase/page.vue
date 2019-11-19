<template>
    <div>
        <v-row justify="end">
            <v-col
                cols="5"
            >
                <v-expand-transition>
                    <div v-if="this.type !== 'future'">
                        <v-text-field
                            solo
                            prepend-inner-icon="mdi-magnify"
                            clear-icon="mdi-close"
                            clearable
                            v-model="keyword"
                            @click:clear="clearMessage"
                        />
                    </div>
                </v-expand-transition>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        type: String
    },
    data: () => {
        return {
            keyword: ""
        }
    },
    methods: {
        clearMessage() {
            this.keyword = ''
        }
    }
}
</script>

<style>

</style>