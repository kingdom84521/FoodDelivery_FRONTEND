<template>
  <v-container>
      <v-row>
          <v-col
            cols="12"
          >
            <v-card outlined class="text-center">
                <v-row
                    justify="center"
                >
                    <v-col
                      cols="6"
                    >
                        <v-avatar
                            color="grey"
                            size="150"
                        >
                            <v-img src="@/assets/logo.png"/>
                        </v-avatar>
                    </v-col>
                </v-row>
                <v-row>
                    <feature-group
                        :data="features"
                    />
                </v-row>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
// import FeatureSquare from "@/components/dashboard/featureGroup/featureSquare"
import FeatureGroup from "@/components/dashboard/featureGroup/main"

export default {
    name: "Dashboard",
    components: {
        FeatureGroup
    },
    data: () => {
        return {
            features: [   
            ]
        }
    },
    async mounted() {
        let el =  {
                    title: "test",
                    description: "testing testing testing",
                    route: "/testing"
                }

        for ( let i = 0 ; i < 6 ; ++i ) {
             this.features.push( el )
             await this.delayOne()
        }
    },
    methods: {
        delayOne() {
            return new Promise( ( resolve ) => {
                setTimeout( () => {
                    resolve();
                }, 100 )
            })
        }
    }
}
</script>

<style>

</style>