<template>
  <v-container fluid v-if="atStep( 0 )">
    <v-row>
      <v-card class="grey col-12">
        <v-card flat class="grey lighten-3">
          <v-card-text>
            <div id="pactText" class="pa-3 white headline overflow-y-auto">
              <!-- Where the contract text display.   -->
            </div>
          </v-card-text>
          <v-row class="mx-4" justify="end">
            <v-card-actions class="ma-1">
              <v-checkbox
                class="white ma-1 pa-4"
                hide-details
                label="同意上述條款"
                v-model="ifAgreeContract"
              />
            </v-card-actions>
          </v-row>
        </v-card>
      </v-card>
    </v-row>
  </v-container>
  <v-container fluid v-else-if="atStep( 1 )">
    <v-row>
      <v-card outlined class="col-12">
        <v-row justify="center">
          <v-card class="col-6">
            <div @click="clickHandler">
              <v-list disabled>
                <v-list-item>
                  <v-row>
                    <v-list-item-content>
                      <v-col cols="4">
                        <v-row>
                          <v-list-item-title class="text-center noto-family title-text">帳號</v-list-item-title>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row justify="center">
                          <v-text-field
                            ref="textField"
                            v-model="testText.value"
                            label="Placeholder"
                            @focus="testText.focus = true"
                            @blur="testText.focus = false"
                          />
                        </v-row>
                      </v-col>
                    </v-list-item-content>
                  </v-row>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
  <v-container fluid v-else-if="atStep( 2 )">
    <v-row>
      <v-card outlined class="col-12">
        <v-row justify="center">
          <v-card class="col-6">
            <v-card-title primary-title>title</v-card-title>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
  <v-container fluid v-else-if="atStep( 3 )">
    <v-row>
      <v-card outlined class="col-12">
        <v-row justify="center">
          <v-card class="col-6">
            <v-card-title primary-title>title</v-card-title>
          </v-card>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      ifAgreeContract: undefined,
      testText: {
        value: "",
        focus: false
      }
    };
  },
  created() {
    // Data Initialized
    this.ifAgreeContract = false;
  },
  props: {
    now: {
      type: Number,
      required: true
    }
  },
  methods: {
    clickHandler() {
      if (!this.testText.focus) {
        this.$refs.textField.focus();
      }
    },
    atStep(stepNumber) {
      return this.now === stepNumber;
    }
  },
  watch: {
    now(val) {
      if (val == 1) {
        setTimeout(() => {
          console.log(this.$refs.textField.focus());
        }, 300);
      }
    }
  }
};
</script>

<style>
.noto-family {
  font-family: "Noto Sans TC", sans-serif;
}

.title-text {
  font-size: 24px;
}
</style>