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
          <v-card
            class="col-6"
          >
            <v-list
              dense
            >
              <v-list-item>
                <v-row>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-row>
                        <v-list-item-title
                          class="noto-family"
                        >
                        <v-row
                          justify="center"
                        >
                          <v-icon left>
                            mdi-account
                          </v-icon>
                          <div
                            class="title-text"
                          >
                            設定帳號
                          </div>
                        </v-row>
                        </v-list-item-title>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        label="請輸入您的帳號"
                        filled
                        v-model="user.account"
                      >
                        <template v-slot:append>
                          <v-tooltip
                            right
                            v-if="accountStatus.status !== 'loading'"
                            :color="`${ getStatusDisplay( 'color' ) } lighten-1`"
                          >
                            <template v-slot:activator="{ on }">
                              <v-icon
                                v-on="on"
                                right
                                :color="getStatusDisplay( 'color' )"
                              >
                                {{ getStatusDisplay( 'icon' ) }}
                              </v-icon>
                            </template>
                            <span>{{ getStatusDisplay( 'text' ) }}</span>
                          </v-tooltip>
                          <v-progress-circular
                            v-if="accountStatus.status === 'loading'"
                            color="grey lighten-1"
                            indeterminate
                            size="24"
                            width="2"
                          />
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list-item
                class="mt-5"
              >
                <v-row>
                  <v-list-item-content>
                    <v-col
                      cols="4"
                    >
                      <v-row>
                        <v-list-item-title
                          class="noto-family"
                        >
                        <v-row
                          justify="center"
                        >
                          <v-icon left>
                            mdi-lock
                          </v-icon>
                          <div
                            class="title-text"
                          >
                            設定密碼
                          </div>
                        </v-row>
                        </v-list-item-title>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="7"
                    >
                      <v-text-field
                        :append-icon="showPassword.origin ? 'mdi-eye' : 'mdi-eye-off'"
                        label="請輸入您的密碼"
                        :type="showPassword.origin ? 'text': 'password'"
                        filled
                        v-model="user.password"
                        @click:append="showPassword.origin = !showPassword.origin"
                      >
                      </v-text-field>
                      <v-text-field
                        :append-icon="showPassword.confirmed ? 'mdi-eye' : 'mdi-eye-off'"
                        label="請再次輸入您的密碼"
                        :type="showPassword.confirmed ? 'text': 'password'"
                        filled
                        v-model="user.confirmedPassword"
                        @click:append="showPassword.confirmed = !showPassword.confirmed"
                      >
                      </v-text-field>
                    </v-col>
                  </v-list-item-content>
                </v-row>
              </v-list-item>
            </v-list>
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
          ifAgreeContract: false,
          user: {
            account: "",
            password: "",
            confirmedPassword: ""
          },
          accountStatus: {
            status: "default",
            displays: {
              default: {
                icon: "mdi-help-box",
                color: "grey",
                text: "點擊確認帳號是否重複"
              },
              success: {
                icon: "mdi-check-circle",
                color: "green",
                text: "該帳號可以使用"
              },
              error: {
                icon: "mdi-close-circle",
                color: "red",
                text: "帳號已被使用"
              }
            }
          },
          showPassword: {
            origin: false,
            confirmed: false
          }
        }
      },
      props: {
          now: {
              type: Number,
              required: true
          }
      },
      methods: {
          atStep( stepNumber ) {
              return this.now === stepNumber
          },
          getStatusDisplay( type ) {
            var nowStatus = undefined 

            switch( this.accountStatus.status )
            {
              case "default":
                nowStatus = this.accountStatus.displays.default
                break
              case "success":
                nowStatus = this.accountStatus.displays.success
                break
              case "error":
                nowStatus = this.accountStatus.displays.error
                break
            }
            switch( type )
            {
              case "icon":
                return nowStatus.icon
              case "color":
                return nowStatus.color
              case "text":
                return nowStatus.text
              case "tooltipColor":
                return nowStatus.tooltipColor
            }
          }
      }
    }
</script>

<style>
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