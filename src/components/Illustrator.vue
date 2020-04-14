<template>
  <div>
    <v-dialog v-model="show">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-media>
          <div class="container">
            <v-img contain :src="require('@/assets/' + src + '')"></v-img>
          </div>
        </v-card-media>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Illustrator",
  props: {
    value: Boolean,
    src: String,
    title: String
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 900px;
  overflow: hidden;
  resize: both;
}
img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
