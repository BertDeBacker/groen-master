<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-text
      ><div>
        <v-btn color="success" href="infosheet">InfoSheet</v-btn>
      </div></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  props: ['title', 'text', 'actions']
};
</script>

<style></style>
