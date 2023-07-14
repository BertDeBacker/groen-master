<template>
  <v-footer padless absolute app>
    <v-row class="mtFooter pl-10 pt-5">
      <v-col cols="11" class="mtFooterText">
        {{ new Date().getFullYear() }} — © Copyright - Muurtuin
      </v-col>
      <v-col cols="1">
        <v-btn icon>
          <v-icon @click="gotoFacebook()" color="white">mdi-facebook</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  methods: {
    gotoFacebook() {
      window.location = 'https://www.facebook.com/Muurtuin';
    }
  }
};
</script>

<style scoped>
.mtFooter {
  background-color: #69abe5;
}

.mtFooterText {
  font-size: 1em;
}
</style>
