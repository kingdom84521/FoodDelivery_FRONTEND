<template>
  <v-container>
      <v-silde-y-reverse-transition group>

      </v-silde-y-reverse-transition>
  </v-container>
</template>

<script>
import FeatureSquare from "@/components/dashboard/featureGroup/featureSquare"

export default {
    props: {
        data: {
            type: Array | Object,
            required: true
        }
        rowCount: {
            type: Number,
            default: 1
        }
    }
}
</script>

<style>

</style>