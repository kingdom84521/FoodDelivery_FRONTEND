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
          height="auto"
          elevation="4"
          :to="funCard.target"
          color="light-green"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon icon large> {{ funCard.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline"> {{ funCard.text }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
        imageMap:'https://tnyummy.tw/wp-content/uploads/2019/02/2019-02-18_174518.jpg',
        cat:'https://resize.hswstatic.com/w_907/gif/tesla-cat.jpg',
        functionCards: [
          {
            text:'訂餐',
            target:'/order',
            icon:'mdi-food'
          },
          {
            text:'訂單查詢',
            target:'/history',
            icon:'mdi-history'
          },
          {
            text:'QR code',
            target:'/qrcode',
            icon:'mdi-qrcode-scan'
          },
          {
            text:'查進度',
            target:'/driver',
            icon:'mdi-map-marker'
          },
        ]
    })
  }
</script>