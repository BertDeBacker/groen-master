<template>
  <v-container>
    <v-row justify="center">
      <v-card class="main pa-5" outlined>
        <v-row>
          <div class="titleGroen">Gebruiksvoorwaarden:</div>
        </v-row>

        <v-row class="pt-6">
          <div>
            Deze tool werd ontwikkeld door masterstudenten Industrieel Ingenieur
            Milieukunde aan de Universiteit Gent, Campus Kortrijk.
            <br />
            <br />Het doel van deze tool is om een eerste inschatting te bekomen
            van de belangrijkste voordelen van uw geplande investering in groen.
            <br />
            <br />Wij vragen u echter rekening te houden met het feit dat de
            bekomen waarden slechts een (ruwe) schatting zijn van de
            werkelijkheid, gebaseerd op kengetallen uit de literatuur. Noch de
            Universiteit Gent, noch de studenten die deze tool ontwikkelden,
            kunnen bijgevolg aansprakelijk worden gesteld voor mogelijke
            negatieve effecten/kosten die zouden optreden tijdens/na het
            gebruiken van deze rekentool.
          </div>
        </v-row>

        <v-row class="pt-10">
          <div>
            Ik ga akkoord met de gebruiksvoorwaarden.
            <div>
              <v-checkbox
                label="Ja, ik verklaar hierbij akkoord te zijn met de opgelijste gebruiksvoorwaarden."
                v-model="isAkkoord"
                >></v-checkbox
              >
            </div>
          </div>
        </v-row>
        <v-row>
          <div class="mx-auto mt-10">
            <router-link to="/groen/instructies"
              >ga verder naar instructies</router-link
            >
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      info: this.$store.getters.getInfo
    };
  },
  computed: {
    //...mapState(['info']),

    isAkkoord: {
      set(val) {
        this.$store.commit('SET_ISAKKOORD', val);
      },
      get() {
        return this.info.algemeen.isAkkoord;
      }
    }
  }
};
</script>
