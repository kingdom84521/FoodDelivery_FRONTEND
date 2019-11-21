<template>
  <v-app-bar
    app
    flat
    dark
    height="80"
    color="green"
  >
    <!-- Logo -->
    <router-link to="/home">
      <v-img
        :src="require('../assets/myLogo.png')"
        max-height="64"
        max-width="40"
        contain
      />
    </router-link>
    <v-toolbar-title class="ml-3">食載有你</v-toolbar-title>

    <div class="flex-grow-1"></div>

    <!-- Before sign in -->
    <v-toolbar-items 
      v-if="!isUserSignIn"
    >
      <v-btn text v-blur to="/signin">
        <v-icon
          left
          color="white"
        >
          mdi-account-plus
        </v-icon>
        <div
          class="title"
        >
          註冊
        </div>
      </v-btn>
      <v-btn text v-blur class="d-none d-md-flex" to="/signup">
        <v-icon
          left
          color="white"
        >
          mdi-login
        </v-icon>
        <div
          class="title"
        >
          登入
        </div>
      </v-btn>
    </v-toolbar-items>
    <!-- After sign in -->
    <v-menu 
      v-else
      bottom
      left
      offset-y
      content-class="dropdown-menu"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          icon
          v-on="on"
        >
            <v-avatar
              color="grey lighten-1"
              size="40"
            >
              <img 
                v-if="user.img"
                :src="user.img"
              >
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
        </v-btn>
      </template>
      <!-- User dropdown menu -->
      <v-card>
        <v-list
          flat
          nav
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> {{ user.name }} </v-list-item-title>
              <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          
          <v-list-item-group
            color="green"
            v-model="featureChoose"
          >
            <v-list-item 
              v-for="(item ,i) in features"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <router-link tag="label" :to="item.link"> {{ item.name }} </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default { 
    data:() => ({
      featureChoose: null,
      features: [
        {
          name: 'Order',
          icon: 'mdi-food',
          link: '/order',
        },
        {
          name: 'History',
          icon: 'mdi-history',
          link: '/history',
        },
        {
          name: 'QR code',
          icon: 'mdi-qrcode-scan',
          link: '/qrcode',
        },
        {
          name: 'Progress',
          icon: 'mdi-map-marker',
          link: '/driver',
        },
        {
          name: 'Settings',
          icon: 'mdi-settings-outline',
          link: '/settings',
        },
        {
          name: "Help center",
          icon: "mdi-help-circle",
          link: "help"
        },
        {
          name: 'Sign out',
          icon: 'mdi-logout',
          link: '/signout',
        }
      ],
    }),
    props: {
      user: {
        type: Object
      },
    },
    computed: {
      isUserSignIn() {
        return this.user;
      }
    },
  }
</script>
