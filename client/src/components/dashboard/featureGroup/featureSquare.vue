<template>
          <v-col
            cols="4"
          >
            <v-card
                flat
                color="grey lighten-2"
                class="py-5"
                elevation="3"
                @mouseenter="hoverHandler( 'enter' )"
                @mouseleave="hoverHandler( 'leave' )"
                @click="clickHandler( to )"
            >
                <v-row
                    justify="center"
                >
                    <v-card-title class="headline">
                        {{ title }}
                    </v-card-title>
                </v-row>
                <v-row
                    justify="center"
                >
                    <v-expand-transition>
                        <div v-if="hover">
                            <v-card-text class="grey--text">
                                {{ description }}
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-row>
            </v-card>
          </v-col>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {
            hover: false,
        }
    },
    methods: {
        hoverHandler( status ) {
            if ( status == "enter" )
            {
                this.hover = true ;
            }
            else if ( status == "leave" )
            {
                this.hover = false ;
            }
        },
        clickHandler( position ) {
            this.$router.push( position )
        }
    }
}
</script>

<style>
</style>