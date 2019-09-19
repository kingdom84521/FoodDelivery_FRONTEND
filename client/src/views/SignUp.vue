<template>
    <v-container fluid>
        <step :now="now" @step-change="goToPage( $event )" />
        <step-page :now="now" @next-step="goToPage( $event )" @previous-step="goToPage( $event )" />
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