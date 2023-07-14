<template>
  <v-row dense>
    <v-col cols="4">{{ this.property }}</v-col>
    <v-col cols="6"
      ><div class="float-right">{{ waarde }}</div></v-col
    >
    <v-col cols="2"
      ><div class="float-left">{{ eenheid }}</div></v-col
    >
  </v-row>
</template>

<script>
export default {
  props: { info: Object, property: String },
  computed: {
    waarde() {
      return this.info[this.property].hasOwnProperty('waarde')
        ? this.info[this.property].waarde
        : this.info[this.property];
    },
    eenheid() {
      return this.info[this.property].hasOwnProperty('eenheid')
        ? this.info[this.property].eenheid
        : '';
    }
  }
};
</script>

<style></style>
