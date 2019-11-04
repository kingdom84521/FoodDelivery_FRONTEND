<template>
  <v-container>
      <v-slide-y-reverse-transition group>
          <v-row
            class="mx-2"
            :key="`group`"
          >
            <feature-square 
                v-for="( element, index ) in data"
                :key="index" 
                :title="element.title" 
                :description="element.description"
                :to="element.route" 
            />
          </v-row>
      </v-slide-y-reverse-transition>
  </v-container>
</template>

<script>
import FeatureSquare from "@/components/dashboard/featureGroup/featureSquare"

export default {
    components: {
        FeatureSquare
    },
    props: {
        data: {
            type: Array || Object,
            required: true
        }
    }
}
</script>

<style>

</style>