<template>
  <v-container>
    <v-row>
      <v-text-field
        label="運送地址"
        prepend-icon="mdi-map-marker"
        append-icon="mdi-crosshairs-gps"
        placeholder="請輸入運送地址"
        v-model="location"
        @click:append="getLocation()"
      ></v-text-field>
    </v-row>
    <!-- <v-divider/> -->
    <v-row class="mt-3">
      <v-text-field append-icon="mdi-magnify" outlined placeholder="搜尋店家..."></v-text-field>
    </v-row>
    <!-- 店家列表 -->
    <v-row justify="space-around">
      <v-col
        v-for="(store, i) in stores"
        :key="i"
        md="3"
        sm="4"
        cols="12"
      >
        <v-card
          :to="{ name: 'store', params: { storeId: store.id } }"
          class="mb-7"
          height="310"
        >
          <v-img src="@/assets/italy.jpg" height="155"></v-img>
          <v-card-title> {{ store.name }} </v-card-title>
          <v-card-text> 預估{{ store.distance }}分鐘 </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- 至頂按鈕 -->
    <v-fade-transition>
      <v-btn color="primary" fab fixed right bottom v-show="scrolling" @click="ScrollTop()">
        <v-icon>mdi-arrow-up-bold-outline</v-icon>
      </v-btn>
    </v-fade-transition>
  </v-container>
</template>>

<script>
import StoreList from '@/assets/temp/storeList.json'

export default {
  data: () => ({
    // dateOption: ["Today ", "Tomorrow ", "Day after tomorrow "],
    // date: "",
    scrolling: false,
    stores: [],
    location: ""
  }),
  methods: {
    handleScroll() {
      this.scrolling = window.pageYOffset > 0;
    },
    ScrollTop() {
      window.scroll({ top: 0, behavior: "smooth" });
    },
    getStoresData() {
      if ( this.location === "" ) {
        return;
      }
      this.stores = StoreList;
      // console.log( this.stores );
    },
    getLocation() {
      console.log("Get location by Google API");
      this.location = "360台灣苗栗縣苗栗市恭敬路43號";
      this.getStoresData();
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getStoresData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>