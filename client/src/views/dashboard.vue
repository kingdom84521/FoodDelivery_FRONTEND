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
                    <feature-square v-for="i in 6" :key="i"/>
                </v-row>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import FeatureSquare from "@/components/featureSquare"

export default {
    name: "Dashboard",
    components: {
        FeatureSquare
    },
    data: () => {
        return {
            feature: [
                {
                }
            ]
        }
    }
}
</script>

<style>

</style>