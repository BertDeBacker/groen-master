<template>
  <v-card class="menuCard">
    <ul class="mtUL pa-3 ">
      <v-card class="mt-5 pa-2">
        <v-card-title class="cartTussenResultaat">
          &nbsp; Introductie
        </v-card-title>
        <v-card-text class="pa-2">
          <li><router-link to="/groen/Welkom">Welkom</router-link></li>
          <li>
            <router-link to="/groen/gebruiksvoorwaarden"
              >Gebruiksvoorwaarden</router-link
            >
          </li>
          <li>
            <router-link to="/groen/instructies">Instructies</router-link>
          </li>
        </v-card-text>
      </v-card>
      <v-card class="mt-5 pa-2">
        <v-card-title class="cartTussenResultaat">
          &nbsp; Project Info
        </v-card-title>
        <v-card-text class="pa-2">
          <li>
            <router-link to="/groen/rekenenmetgroen"
              >RekenenMetGroen</router-link
            >
          </li>
          <li>
            <router-link to="/groen/review">Review input</router-link>
          </li>
        </v-card-text>
      </v-card>

      <v-card v-if="calculationsCompleted" class="mt-5 pa-2">
        <v-card-title class="cartTussenResultaat">
          &nbsp; Resultaat
        </v-card-title>
        <v-card-text class="pa-2">
          <li>
            <router-link to="/groen/resultgroendakvoorklant"
              >Voor de klant</router-link
            >
          </li>
          <li>
            <router-link to="/groen/resultgroendakvoorgemeenschap"
              >Voor de gemeenschap</router-link
            >
          </li>
          <!--li>
            <router-link to="/groen/resultgroenegevelvoorklant"
              >GG Voor de klant</router-link
            >
          </li>
          <li>
            <router-link to="/groen/resultgroenegevelvoorgemeenschap"
              >GG Voor de gemeenschap</router-link
            >
          </li-->
        </v-card-text>
      </v-card>

      <!--v-card v-if="calculationsCompleted" class="mt-2 pa-0">
        <v-card-title class="cartTussenResultaat">
          &nbsp; Ter controle
        </v-card-title>
        <v-card-text class="pa-2">
          <li>
            <router-link to="/groen/tssresultgroendakvoorklant"
              >GD Effecten Klant</router-link
            >
          </li>
          <li>
            <router-link to="/groen/tssresultgroendakvoorgemeenschap"
              >GD Effecten Gemeenschap</router-link
            >
          </li>
          <li>
            <router-link to="/groen/tssresultgroenegevelvoorklant"
              >GG Effecten Klant</router-link
            >
          </li>
          <li>
            <router-link to="/groen/tssresultgroenegevelvoorgemeenschap"
              >GG Effecten Gemeenschap</router-link
            >
          </li>
          <li>
            <router-link to="/groen/resultOptions"
              >Resultaat Opties</router-link
            >
          </li>
          <li>
            <router-link to="/groen/kengetallen">Kengetallen</router-link>
          </li>
        </v-card-text>
      </v-card-->
    </ul>
  </v-card>
</template>

<script>
export default {
  computed: {
    calculationsCompleted: function() {
      let val = true;

      val =
        this.$store.state.info.GDResultaatVoorKlant &&
        this.$store.state.info.GDResultaatVoorGemeenschap &&
        this.$store.state.info.GGResultaatVoorKlant &&
        this.$store.state.info.GGResultaatVoorGemeenschap;

      return val;
    }
  }
};
</script>

<style>
.mtUL {
  list-style-type: none;
}

.mtUL > li {
  margin: 0em;
  padding: 0.3em;
}

.menuCard {
  width: 15em;
  height: 40em;
}

.targetCard {
  width: 75em;
  height: 40em;
}

v-col {
  border: 1px solid black;
}
v-row {
  border: 1px solid black;
}
.cartTussenResultaat {
  background-color: lightgrey;
  font-size: 0.9em;
  height: 2.5em;
  padding: 0 0;
}
</style>
