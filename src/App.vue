<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-img
        class="mx-2"
        src="@/assets/okta-logo.png"
        max-height="45"
        max-width="45"
        contain
      />
      <b>Factor API Demo</b>
      <v-spacer />
      <v-label v-if="authenticated">{{getUserEmail}}</v-label>
      <v-label></v-label>
      <v-btn class="ma-2" color="primary" to="/"
        >Home
        <v-icon right>mdi-home</v-icon>
      </v-btn>
      <v-btn
        class="ma-2"
        color="primary"
        v-if="authenticated"
        v-on:click="logout"
        id="logout-button"
        >Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" v-else to="/login" id="login-button"
        >Login
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    authenticated: function() {
      return this.$store.getters.isLoggedIn;
    },
    getUserEmail() {
      return this.$store.getters.userEmail;
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
