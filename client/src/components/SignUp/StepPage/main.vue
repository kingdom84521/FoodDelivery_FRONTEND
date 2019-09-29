<template>
  <v-container fluid>
    <v-window
      v-model="now"
    >
      <v-window-item>
        <contract-page @data-change="dataUpdate( $event )" />
      </v-window-item>
      <v-window-item>
        <register-page @data-change="dataUpdate( $event )" />
      </v-window-item>
      <v-window-item>
        <personal-data-page />
      </v-window-item>
      <v-window-item>
        <final-page />
      </v-window-item>
    </v-window>
    <!-- <InnerPage :now="now" @data-change="dataUpdate( $event )" /> -->
    <v-divider />
    <v-row no-gutters justify="space-between align-end" class="mt-3 mx-3">
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
  import ContractPage from "@/components/SignUp/StepPage/ContractPage/main.vue"
  import RegisterPage from "@/components/SignUp/StepPage/RegisterPage/main.vue"
  import PersonalDataPage from "@/components/SignUp/StepPage/PersonalDataPage/main.vue"
  import FinalPage from "@/components/SignUp/StepPage/FinalPage/main.vue"

  export default {
    name: "stepPage",
    data: () => {
      return {
        user: {},
        errors: [
          {
            contractNotAgreeing: false
          },
          {
            accountRequired: false,
            passwordRequired: false,
            inconsistentPassword: false,
          },
          {

          },
          {

          }
        ]
      }
    },
    props: {
      now: {
        type: Number,
        required: true
      }
    },
    components: {
      ContractPage,
      RegisterPage,
      PersonalDataPage,
      FinalPage
    },
    methods: {
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
        this.user = this._.merge( this.user, dataPack )
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

  .noto-family {
    font-family: "Noto Sans TC", sans-serif;
  }

 .title-text {
   font-size: 18px ;
  }

 input[ type="password" ] {
   font-family: caption
 }
</style>