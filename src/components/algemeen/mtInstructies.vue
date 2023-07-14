<template>
  <v-container>
    <v-row justify="center">
      <v-card class="main pa-5" outlined>
        <v-container>
          <v-row class="titleGroen">Rekentool voor particulieren</v-row>
          <v-row class="pa-6">
            Als eerste stap zal rekenenmetgroen je vragen om een aantal gegeven
            in te vullen. Aan de hand van deze gegevens, worden de berekeningen
            omtrent uw groene investering uitgevoerd.
            <br />Indien U op een vraag het antwoord niet (zeker) weet,
            selecteer dan de optie "ik weet het niet". Bij de berekening zal dan
            een waarde worden gebruikt die overeenkomt met deze van een
            gemiddeld Vlaams huishouden.
            <br />
            <br />Vragen aangeduid met een sterretje (*) zijn vereist en dienen
            steeds ingevuld te worden. Indien u vragen of opmerkingen zou
            hebben, aarzel dan niet om contact met ons op te nemen via
            <a>info@muurtuin.be</a>

            <br />Om de vragen vlot te kunnen beantwoorden, neemt u best
            volgende gegevens bij de hand: <br />- Recente elektriciteits - /
            gas - / stookoliefactuur <br />- Eventuele informatie omtrent uw
            zonnepanelen
            <br />
          </v-row>
          <v-row>
            <div class="mx-auto mt-10">
              <router-link to="/groen/rekenenmetgroen"
                >ga verder naar rekenenmetgroen</router-link
              >
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      select: null,
      woningTypes: ['Eéngezinswoning', 'appartement']
    };
  },
  props: ['info']
};
</script>
