<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              {{ mode }} {{ resource }} HTTP/1.1
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content> Host: {{ baseurl }} </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              Accept: application/json
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              Content-Type: application/json
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              Content-Type: text/plain
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              {{ payload }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "HTTPCall",

  props: {
    mode: String,
    resource: String,
    payload: Object,
    baseurl: String
  }
};
</script>

