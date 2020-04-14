/* eslint-disable no-unused-vars */
<template>
  <v-container>
    <v-row>
      <v-col cols="10"> </v-col>
      <v-col cols="2">
        <a @click="showAPIResult = 'true'">API Result</a>
      </v-col>
    </v-row>
    <v-dialog v-model="showAPIResult">
      <v-card>
        <v-card-title>API Response</v-card-title>
        <v-card-text>
          <div class="container">
            {{ result }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Start Transaction</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Initiate MFA</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="e1 > 3">Challenge</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="e1 > 4">Verify</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="5">Finish</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-5" color="blue lighten-5" height="200px">
            <v-card-text>
              <p class="display-0">
                <b>{{ username }}</b> starts the transaction after logging in.
              </p>
              <p class="display-0">
                This is a sensitive transaction that needs additional
                authentication.
              </p>
            </v-card-text>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">
            Get My Coupon
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-5" color="blue lighten-5">
            <v-card-text>
              <v-row>
                <v-col class="md-6">
                  <p>
                    System initiates a multi-factor authentiction transaction
                    with Okta.
                  </p>
                  <p>
                    It needs to obtain a state token first.
                  </p>
                </v-col>
                <v-col class="md-6">
                  <v-expansion-panels popout hover dark>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="subtitle-2 primary"
                        >API Call</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <HTTPCall
                          mode="POST"
                          resource="/api/v1/authn"
                          :baseurl="this.$store.state.baseUrl"
                          :payload="{ username: this.$props.username }"
                        />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>

              <div v-if="error">
                <Error
                  message="Unauthorized"
                  @click="showErrorDetails = 'true'"
                />
                <v-dialog v-model="showErrorDetails">
                  <v-card>
                    <v-card-title>Error Details</v-card-title>
                    <v-card-text>
                      <div class="container">
                        {{ result }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>
          </v-card>

          <v-btn color="primary" @click="primaryAuth">
            Step in
          </v-btn>

          <v-btn flat @click="e1 = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-5" color="blue lighten-5">
            <v-card-text>
              <v-row>
                <v-col class="md-6">
                  <p>Send an MFA API call to Okta that sends MFA challenge.</p>
                  <v-select
                    :items="factorsList"
                    item-text="factorType"
                    item-value="id"
                    v-model="selectedFactor"
                    label="Select a factor"
                  >
                  </v-select>
                </v-col>
                <v-col class="md-6">
                  <v-expansion-panels popout hover dark v-if="!!selectedFactor">
                    <v-expansion-panel>
                      <v-expansion-panel-header class="subtitle-2 primary"
                        >API Call</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <HTTPCall
                          mode="POST"
                          :resource="factorAPIUrl"
                          :baseurl="this.$store.state.baseUrl"
                          :payload="{ stateToken: this.stateToken }"
                        />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-btn color="primary" @click="mfaChallenge">
            Step in
          </v-btn>

          <v-btn flat @click="e1 = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-5" color="blue lighten-5">
            <v-card-text>
              <v-row>
                <v-col class="md-6">
                  <v-text-field
                    v-model="mfaCode"
                    label="MFA Code"
                    filled
                    rounded
                    dense
                  ></v-text-field>
                </v-col>
                <v-col class="md-6">
                  <v-expansion-panels popout hover dark>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="subtitle-2 primary"
                        >API Call</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <HTTPCall
                          mode="POST"
                          :resource="factorAPIUrl"
                          :baseurl="this.$store.state.baseUrl"
                          :payload="{
                            stateToken: this.stateToken,
                            passCode: this.mfaCode
                          }"
                        />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>

              <div v-if="error">
                <Error
                  message="MFA Failed"
                  @click="showErrorDetails = 'true'"
                />
                <v-dialog v-model="showErrorDetails">
                  <v-card>
                    <v-card-title>MFA Error Details</v-card-title>
                    <v-card-text>
                      <div class="container">
                        {{ result }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>
          </v-card>

          <v-btn color="primary" @click="mfaVerify">
            Verify
          </v-btn>
          <v-btn flat @click="e1 = 3">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-card color="blue lighten-5">
            <v-card-media>
              <v-img
                src="https://media.giphy.com/media/TLayDh2IZOHPW/giphy.gif"
                contain
              />
            </v-card-media>
          </v-card>

          <v-btn color="primary" @click="finishTransaction">
            Finish
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import api from "@/api";
import HTTPCall from "@/components/HTTPCall.vue";
import Error from "@/components/error.vue";

export default {
  name: "OrgFlow",
  data() {
    return {
      e1: 1,
      result: {},
      error: false,
      selectedFactor: "",
      factorsList: [],
      stateToken: "",
      mfaCode: "",
      showErrorDetails: false,
      showAPIResult: false
    };
  },
  components: {
    HTTPCall,
    Error
  },
  props: {
    username: String
  },
  computed: {
    factorAPIUrl() {
      return "/api/v1/authn/factors/" + this.selectedFactor + "/verify";
    }
  },
  methods: {
    setFactorList() {
      if (this.result) {
        let factors = this.result._embedded.factors;
        // eslint-disable-next-line no-unused-vars
        factors.forEach(element => {
          this.factorsList.push(element);
        });
      }
    },
    async primaryAuth() {
      let payload = { username: this.$props.username };
      this.result = await api.execute("post", "/api/v1/authn", payload);
      if (this.result.errorCode) {
        this.error = true;
        this.e1 = 2;
      } else {
        this.error = false;
        this.stateToken = this.result.stateToken;
        this.setFactorList();
        this.e1 = 3;
      }
    },
    async mfaChallenge() {
      let payload = { stateToken: this.stateToken };
      this.result = await api.execute(
        "post",
        "/api/v1/authn/factors/" + this.selectedFactor + "/verify",
        payload
      );
      if (this.result.errorCode) {
        this.error = true;
        this.e1 = 3;
      } else {
        this.error = false;
        this.e1 = 4;
      }
    },
    async mfaVerify() {
      let payload = { stateToken: this.stateToken, passCode: this.mfaCode };
      this.result = await api.execute(
        "post",
        "/api/v1/authn/factors/" + this.selectedFactor + "/verify",
        payload
      );
      if (this.result.errorCode) {
        this.error = true;
        this.e1 = 4;
      } else {
        this.error = false;
        this.e1 = 5;
      }
    },
    finishTransaction() {
      this.error = false;
      this.result = {};
      this.selectedFactor = "";
      this.factorsList = [];
      this.stateToken = "";
      this.mfaCode = "";
      this.showErrorDetails = false;
      this.e1 = 1;
    }
  }
};
</script>

<style scoped></style>
