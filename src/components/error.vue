<template>
  <v-card flat color="blue lighten-5" @click="$emit('click')">
    <v-card-text class="text-center">
      <v-btn color="red" dark>
        {{ message }}
        <v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: String
  }
};
</script>
