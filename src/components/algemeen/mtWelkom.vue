<template>
  <v-container>
    <v-row justify="center">
      <v-card class="main pa-5" outlined>
        <v-row>
          <div class="pt-2 titleGroen mb-2">
            Welkom bij rekenenmetgroen.be
          </div>
        </v-row>

        <v-row class="pt-6">
          Bent U ook op zoek naar concrete gegevens betreffende uw groene
          project?
        </v-row>

        <v-row class="pt-6">
          <div>
            Met behulp van deze rekentool kunt u met enkele muisklikken de
            belangrijkste basisberekenen uitvoeren die u kunnen helpen bij het
            maken van uw beslissing omtrent investering in groen.
          </div>
        </v-row>
        <v-row>
          <div class="mx-auto mt-10">
            <router-link to="/groen/gebruiksvoorwaarden"
              >ga verder naar gebruiksvoorwaarden</router-link
            >
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      info: { algemeen: { wie: 'Particulier' } }
    };
  }
};
</script>

<style>
.test {
  width: 10em;
}
</style>
