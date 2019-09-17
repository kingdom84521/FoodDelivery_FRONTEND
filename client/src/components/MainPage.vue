<template>
  <v-container>
    <v-row>
      <v-img
        :src="imageMap"
        contain
        weight="auto"
        max-height="500"
      ></v-img>
    </v-row>
    <v-row>
      <v-col
        v-for="(funCard,i) in functionCards"
        :key="i"
        md="3"
        sm="6"
        cols="12"
      >
        <v-card
          outlined
          tile
          height="50"
          elevation="4"
          :to="funCard.target"
          color="amber lighten-1"
        >
          <v-card-title
            class="justify-center"
          > 
            {{ funCard.text }} 
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
        imageMap:'https://resize.hswstatic.com/w_907/gif/tesla-cat.jpg',
        functionCards: [
          {
            text:'訂餐',
            target:'/'
          },
          {
            text:'功能2',
            target:'/'
          },
          {
            text:'功能3',
            target:'/'
          },
          {
            text:'功能4',
            target:'/'
          },
        ]
    })
  }
</script>