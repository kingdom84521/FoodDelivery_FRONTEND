<template>
  <v-container>
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
            return new Promise( resolve => {
                setTimeout( () => {
                    resolve()
                }, 100 )
            })
        }
    }
}
</script>

<style>

</style>