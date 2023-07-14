<template>
  <v-container>
    <v-card class="mx-auto infoCard">
      <v-card-title primary-title>
        Info Sheets todo
      </v-card-title>

      <v-card-text class="infoBody ">
        Here goes the sheet content.
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="">
        <v-btn color="success" href="result">todo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.infoCard {
  width: 20em;
  height: 15em;
}

.infoBody {
  height: 11em;
}

.infoActions {
  height: 3em;
}
</style>
