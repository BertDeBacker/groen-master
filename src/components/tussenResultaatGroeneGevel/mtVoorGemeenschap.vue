<template>
  <v-container>
    <v-row justify="center">
      <v-card class="main pa-5" outlined>
        <v-row>
          <v-col cols="6">GG - Gemeenschap</v-col>
          <v-col cols="6"></v-col>
        </v-row>

        <v-container class="calcOverview1">
          <infoDetail :info="{}" :title="true" />

          <infoDetail :info="reductieC02DoorToenameIsolatie"></infoDetail>
          <infoDetail
            :info="reductieC02DoorMeerproductieZonnepanelen"
          ></infoDetail>
          <infoDetail :info="reductieCO2DoorVegetatie"></infoDetail>
          <infoDetail :info="totaleCO2ReductieDoorGroen"></infoDetail>
          <infoDetail :info="totaleCO2ReductieDoorGroenInAutoKm"></infoDetail>
          <br />

          <infoDetail :info="jaarlijksVolumeNeerslagOpDak"></infoDetail>
          <infoDetail
            :info="jaarlijksAfgevoerdVolumeRegenwaterMetGroen"
          ></infoDetail>
          <infoDetail
            :info="jaarlijksUitgespaardeKostRioolwaterzuivering"
          ></infoDetail>
          <br />
          <infoDetail :info="jaarlijkseVerwijderingFijnStof"></infoDetail>
          <infoDetail :info="jaarlijkseVerwijderingNO2"></infoDetail>
          <infoDetail :info="jaarlijkseVerwijderingSO2"></infoDetail>
          <infoDetail :info="jaarlijkseVerwijderingOzon"></infoDetail>
          <br />
          <infoDetail :info="jaarlijkseBesparingDoorFijnStof"></infoDetail>
          <infoDetail :info="jaarlijkseBesparingDoorNO2"></infoDetail>
          <infoDetail :info="jaarlijkseBesparingDoorSO2"></infoDetail>
          <infoDetail :info="jaarlijkseBesparingDoorOzon"></infoDetail>
          <br />

          <infoDetail :info="jaarlijksMinderPatienten"></infoDetail>
          <infoDetail :info="jaarlijksBesparingMinderPatienten"></infoDetail>
          <infoDetail :info="jaarlijksExtraWerkkrachten"></infoDetail>
          <infoDetail :info="JaarlijksVermedenZiektekost"></infoDetail>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import infoDetail from './mtInfoDetail';
//import resNavigation from './mtResultNavigation';

export default {
  data() {
    return {
      effectenVoorGemeenschap: this.$store.getters.getGGResultaatVoorGemeenschap
    };
  },
  created() {},

  destroyed() {
    this.effectenVoorGemeenschap = {};
  },

  computed: {
    reductieC02DoorToenameIsolatie() {
      return this.effectenVoorGemeenschap.reductieC02DoorToenameIsolatie;
    },
    reductieC02DoorMeerproductieZonnepanelen() {
      return this.effectenVoorGemeenschap
        .reductieC02DoorMeerproductieZonnepanelen;
    },
    reductieCO2DoorVegetatie() {
      return this.effectenVoorGemeenschap.reductieCO2DoorVegetatie;
    },
    totaleCO2ReductieDoorGroen() {
      return this.effectenVoorGemeenschap.totaleCO2ReductieDoorGroen;
    },
    totaleCO2ReductieDoorGroenInAutoKm() {
      return this.effectenVoorGemeenschap.totaleCO2ReductieDoorGroenInAutoKm;
    },
    jaarlijksVolumeNeerslagOpDak() {
      return this.effectenVoorGemeenschap.jaarlijksVolumeNeerslagOpDak;
    },
    jaarlijksAfgevoerdVolumeRegenwaterMetGroen() {
      return this.effectenVoorGemeenschap
        .jaarlijksAfgevoerdVolumeRegenwaterMetGroen;
    },
    jaarlijksUitgespaardeKostRioolwaterzuivering() {
      return this.effectenVoorGemeenschap
        .jaarlijksUitgespaardeKostRioolwaterzuivering;
    },
    jaarlijkseVerwijderingFijnStof() {
      return this.effectenVoorGemeenschap.jaarlijkseVerwijderingFijnStof;
    },
    jaarlijkseVerwijderingNO2() {
      return this.effectenVoorGemeenschap.jaarlijkseVerwijderingNO2;
    },
    jaarlijkseVerwijderingSO2() {
      return this.effectenVoorGemeenschap.jaarlijkseVerwijderingSO2;
    },
    jaarlijkseVerwijderingOzon() {
      return this.effectenVoorGemeenschap.jaarlijkseVerwijderingOzon;
    },
    jaarlijkseBesparingDoorFijnStof() {
      return this.effectenVoorGemeenschap.jaarlijkseBesparingDoorFijnStof;
    },
    jaarlijkseBesparingDoorNO2() {
      return this.effectenVoorGemeenschap.jaarlijkseBesparingDoorNO2;
    },
    jaarlijkseBesparingDoorSO2() {
      return this.effectenVoorGemeenschap.jaarlijkseBesparingDoorSO2;
    },
    jaarlijkseBesparingDoorOzon() {
      return this.effectenVoorGemeenschap.jaarlijkseBesparingDoorOzon;
    },
    jaarlijksMinderPatienten() {
      return this.effectenVoorGemeenschap.jaarlijksMinderPatienten;
    },
    jaarlijksBesparingMinderPatienten() {
      return this.effectenVoorGemeenschap.jaarlijksBesparingMinderPatienten;
    },
    jaarlijksExtraWerkkrachten() {
      return this.effectenVoorGemeenschap.jaarlijksExtraWerkkrachten;
    },
    JaarlijksVermedenZiektekost() {
      return this.effectenVoorGemeenschap.JaarlijksVermedenZiektekost;
    }
  },
  //components: { infoDetail, resNavigation }
  components: { infoDetail }
};
</script>

<style scoped>
.calcOverview1 {
  font-size: 0.7em;
  overflow: scroll;
  height: 43em;
}
</style>
