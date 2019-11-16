<template>
  <v-container fluid>
    <v-row
      justify="center"
    >
      <v-card
        width="500"
        class="justify-center"
      >
        <v-card-title class="justify-center">SIGN IN</v-card-title>
        <v-divider />
        <v-row
          class="justify-center"
        >
          <v-col
            cols="10"
          >
            <v-form
              class="mt-5"
            >
              <v-text-field 
                v-model="username"
                label="User"
                placeholder="Place input user name or email"
                required
              />
              <v-text-field 
                v-model="password"
                type="password"
                label="Password"
                placeholder="Please input password"
                required
              />
            </v-form>
          </v-col>
        </v-row>
        <v-row
          class="justify-end"
        >
          <v-col sm="3" cols="5">
            <v-btn color="success" @click="signin">Sign In</v-btn>
          </v-col>
        </v-row>
        <v-row
          class="justify-center"
        >
          <v-col cols="11">
            <v-divider />
          </v-col>
        </v-row>
        <v-row
          class="justify-center"
        >
          <v-col cols="10">
            <router-link to="/signup">Create an account</router-link>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'signin',
    data:() => ({
     username: '',
     password: '',
   }),
   props: {
     user: {
       type: Object,
       default: null,
       required: false
     },
   },
   methods: {
     signin: () => {
     }
   }
  }
</script>