<template>
  <v-container bg fill-height>
    <v-col cols="12">
      <v-row>
        <v-col cols="4"><h2>Groen Dak - gemeenschap</h2></v-col>
        <v-col cols="2">
          <v-switch v-model="min" :label="`minimum`"></v-switch
        ></v-col>
        <v-col cols="2">
          <v-switch v-model="avg" :label="`gemiddeld`"></v-switch
        ></v-col>
        <v-col cols="4">
          <v-switch v-model="max" :label="`maximum`"></v-switch
        ></v-col>
      </v-row>

      <v-expansion-panels focusable>
        <v-expansion-panel v-for="(item, i) in menus" :key="i">
          <v-expansion-panel-header>{{ item }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <mtResultBlock
              :infoGD="infoGD"
              :infoGG="infoGG"
              :target="item"
              :min="min"
              :avg="avg"
              :max="max"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-container>
</template>

<script>
import mtResultBlock from './mtResultBlock';

export default {
  data: () => ({
    menus: [
      'CO2Reductie',
      'Waterhuishouding',
      'Luchtvervuiling',
      'Gezondheidszorg',
      'Totaal'
    ],
    min: false,
    avg: true,
    max: false
  }),

  components: { mtResultBlock },
  computed: {
    infoGD: function() {
      debugger;
      return this.$store.state.info.GDResultaatVoorGemeenschap;
    },
    infoGG: function() {
      debugger;
      return this.$store.state.info.GGResultaatVoorGemeenschap;
    }

    // getImage: () => {
    //   let test = require('@/assets/rekenenMetGroen.png');
    //   console.log(test);
    //   return test.default;
    // },
    // calcColumns: function() {
    //   let m = this.min ? 1 : 0;
    //   let a = this.avg ? 1 : 0;
    //   let x = this.max ? 1 : 0;
    //   let tot = m + a + x;
    //   if (tot === 0) {
    //     this.avg = true;
    //     tot = 1;
    //   }
    //   return tot;
    // }
  }
};
</script>

<style>
.mtResult {
  height: 40em;
  width: 80em;
}

.resultInfoArea {
  width: 15em;
  height: 22em;
  background-color: aliceblue;
}
</style>
