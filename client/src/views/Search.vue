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
        v-for="(restaurant, i) in restaurants"
        :key="i"
        md="3"
        sm="4"
        cols="12"
      >
        <v-card
          :to="{ name: 'restaurant', params: { restaurantId: restaurant.id } }"
          class="mb-7"
          height="310"
        >
          <v-img src="@/assets/italy.jpg" height="155"></v-img>
          <v-card-title> {{ restaurant.name }} </v-card-title>
          <v-card-text> 預估{{ restaurant.distance }}分鐘 </v-card-text>
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
import RestaurantList from '@/assets/temp/restaurant_list.json'

export default {
  props: {
    keyword: {
      type: String
    }
  },
  data: () => ({
    // dateOption: ["Today ", "Tomorrow ", "Day after tomorrow "],
    // date: "",
    scrolling: false,
    restaurants: [],
    location: "360台灣苗栗縣苗栗市聯合大學八甲校區1"
  }),
  methods: {
    handleScroll() {
      this.scrolling = window.pageYOffset > 0;
    },
    ScrollTop() {
      window.scroll({ top: 0, behavior: "smooth" });
    },
    getRestaurantsData() {
      if ( this.location === "" ) {
        return;
      }
      this.restaurants = RestaurantList;
      // console.log( this.restaurants );
    },
    getLocation() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      let success = async pos => {
        var crd = pos.coords;
        try {
          let latlng = crd.latitude.toString() + "," + crd.longitude.toString();
          // console.log( "Position: ", latlng );
          const result = await this.$axios({
            methods: 'GET',
            baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
            'Cotent-type': 'application/json',
            params: {
              latlng: latlng,
              language: 'zh-TW',
              key: 'AIzaSyDWAvWMT0ZxoBnAsYZgrqp9LgLvxA-yABE'
            }
          }); 
          this.location = this._.get(result, ['data', 'results', 0, 'formatted_address']);
        } catch( error ) {
          console.log( error );
        }
        this.getRestaurantsData();
      };

      let error = err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
      // this.location = "360台灣苗栗縣苗栗市恭敬路43號";
      // console.log("Get adress by Google API");
    }
  },
  watch: {},
  computed: {},
  created() {
    console.log( this.keyword );

    this.getRestaurantsData();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>