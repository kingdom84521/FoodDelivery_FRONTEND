<template>
    <v-container fluid>
        <step :now="now" @step-change="goToPage( $event )" />
        <step-page :now="now" />

        <v-divider />
            <v-row justify="space-between" class="mt-3 mx-3">
                <v-btn
                    x-large 
                    color="red" 
                    class="white--text headline"
                >
                    <v-icon left large>mdi-chevron-left</v-icon>
                    上一步
                </v-btn>
                <v-btn 
                    x-large 
                    color="green" 
                    class="white--text headline"
                >
                    下一步
                    <v-icon right large>mdi-chevron-right</v-icon>
                </v-btn>
            </v-row>
    </v-container>
</template>

<script>
import step from '@/components/SignUp/Step/main.vue'
import stepPage from '@/components/SignUp/StepPage/main.vue'

export default {
    components: {
        step,
        stepPage
    },
    data: () => ({
        now: null
    }),
    created() {
        // Data Initialize
        this.now = 0
    },
    methods: {
        goToPage( now ) {
            this.now = now
        }
    }
}
</script>