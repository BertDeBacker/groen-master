<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <v-container>
          <v-row class="titleGroenInfo">Alle vragen ingevuld!</v-row>
          <v-row class="titleGroenInfo"
            >U kan uw gegevens wijzigen door te clicken op bovenstaande info
            icons.</v-row
          >
        </v-container>
        <v-row>
          <div class="mx-auto mt-10">
            <router-link to="/groen/review"
              >Overloop de ingegeven gegevens</router-link
            >
          </div>
        </v-row>
        <v-row>
          <div class="mx-auto mt-10">
            <router-link to="/groen/resultgroendakvoorklant"
              >Effecten voor Klant</router-link
            >
          </div>
        </v-row>
        <v-row>
          <div class="mx-auto mt-10">
            <router-link to="/groen/resultgroendakvoorgemeenschap"
              >Effecten voor Gemeenschap</router-link
            >
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    save() {
      console.log('Q6 nothing to save.');
    }
  }
};
</script>
