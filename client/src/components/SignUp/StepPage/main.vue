<template>
  <v-container fluid>
    <InnerPage :now="now" @data-change="dataUpdate( $event )" />
    <v-divider />
    <v-row no-gutters justify="space-between" class="mt-3 mx-3">
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
        <v-col
          cols="4"
        >
          <v-card
            outlined
          >
            <v-row>
              <v-card-text
                class="text-center red--text"
              >
                testing
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
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
    data: () => {
      return {
        user: {},
        storedRules: {
          required: value => !!value || ""
        }
      }
    },
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
        // if ( !checkErrors( this.now ) )
        // {
        //   this.$emit( "next-step", this.now + 1 )
        // }
        // else
        // {
        //   return
        // }
        this.$emit( "next-step", this.now + 1 )
      },
      previousStepHandler() {
        this.$emit( "previous-step", this.now - 1 )
      },
      dataUpdate( dataPack ) {
        this.user = dataPack
      },
      checkErrors() {

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