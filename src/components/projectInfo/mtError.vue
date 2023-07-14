<template>
  <v-snackbar v-model="showError" multi-line>
    <ul>
      <li v-for="(er, index) in errors" v-bind:key="index">
        {{ er }}
      </li>
    </ul>
    <v-btn color="red" text @click="showError = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: ['errors'],
  data() {
    return { showError: false };
  },
  watch: {
    errors: function(val) {
      if (val) this.showError = true;
      if (!val) this.showError = false;
    }
  }
};
</script>
