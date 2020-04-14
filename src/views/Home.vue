<template>
  <div>
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col md="4">
          <v-select
            dense
            :items="scenarioList"
            label="Scenario"
            v-model="selectedScenario"
          ></v-select>
        </v-col>
        <v-col md="2">
          <v-icon @click="illustationDialog = 'true'">mdi-play</v-icon>
        </v-col>
      </v-row>
    </v-container>
    <Illustrator
      v-model="illustationDialog"
      :title="selectedScenario"
      :src="scenarioMap[selectedScenario]"
    />
    <div v-if="authenticated">
      <OrgFlow
        v-if="selectedScenario === 'Org Sign-on'"
        :username="getUserEmail"
      />
      <AppFlow
        v-else-if="selectedScenario === 'App Sign-on'"
        :username="getUserEmail"
      />
    </div>
    <div v-else>
      <router-link to="/login">Login First</router-link>
    </div>
  </div>
</template>

<script>
import Illustrator from "@/components/Illustrator.vue";
import OrgFlow from "@/components/OrgFlow.vue";
import AppFlow from "@/components/AppFlow.vue";
export default {
  name: "Home",
  components: {
    Illustrator,
    OrgFlow,
    AppFlow
  },
  data: () => ({
    illustationDialog: false,
    selectedScenario: "Org Sign-on",
    scenarioList: ["Org Sign-on", "App Sign-on"],
    scenarioMap: {
      "Org Sign-on": "Org Sign-on.png",
      "App Sign-on": "App Sign-on.png"
    }
  }),
  computed: {
    authenticated: function() {
      return this.$store.getters.isLoggedIn;
    },
    getUserEmail() {
      return this.$store.getters.userEmail;
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
