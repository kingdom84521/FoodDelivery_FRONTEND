<template>
  <v-container fluid>
    <InnerPage :now="now" />
    <v-divider />
    <v-row justify="space-between" class="mt-3 mx-3">
        <v-btn
            :disabled="now !== 0 ? false : true"
            @click="previousStepHandler()"
            x-large 
            color="red" 
            class="white--text headline"
        >
            <v-icon left large>mdi-chevron-left</v-icon>
            上一步
        </v-btn>
        <v-btn
            @click="nextStepHandler()"
            x-large 
            color="green" 
            class="white--text headline"
        >
            {{ nextOrFinished }}
            <v-icon right large>mdi-chevron-right</v-icon>
        </v-btn>
    </v-row>
  </v-container>
</template>

<script>
  import InnerPage from "@/components/SignUp/StepPage/InnerPage/main.vue"

  export default {
    name: "stepPage",
    props: {
      now: {
        type: Number,
        required: true
      }
    },
    components: {
      InnerPage
    },
    methods: {
      atStep( pageNumber ) {
        return this.now == pageNumber
      },
      nextStepHandler() {
        this.$emit( "next-step", this.now + 1 )
      },
      previousStepHandler() {
        this.$emit( "previous-step", this.now - 1 )
      }
    },
    computed: {
      nextOrFinished() {
        return this.now === 4 ? "完成" : "下一步"
      }
    }
  }
</script>

<style>
  #pactText {
    max-height: 600px ;
  }
</style>