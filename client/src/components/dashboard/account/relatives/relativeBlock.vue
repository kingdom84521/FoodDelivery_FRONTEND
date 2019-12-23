<template>
    <v-dialog>
        <template v-slot:activator>
            <v-sheet
                elevation="2"
                class="w-100 pa-2"
                width="99%"
            >
                <v-row no-gutters>
                    <v-col cols="4">
                        <v-img
                            max-height="100"
                            max-width="100"
                            src="https://via.placeholder.com/100"
                        />
                    </v-col>
                    <v-col cols="8">
                        <div class="headline d-flex align-center">
                            {{ user.name }}
                            <span class="ml-2">
                                <v-chip>{{ user.relationship }}</v-chip>
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
        </template>
        <v-sheet
         color="white"
        >
            test
        </v-sheet>
    </v-dialog>
</template>

<script>
export default {
    data: () => {
        return {
            user: {
                name: "呱吉",
                relationship: "大便"
            }
        }
    },
    methods: {}
}
</script>

<style>
  .w-100 {
      width: 100%
  }
</style>