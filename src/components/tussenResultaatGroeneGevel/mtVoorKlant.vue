<template>
  <v-container>
    <v-row justify="center">
      <v-card class="main pa-5" outlined>
        <v-row>
          <v-col col="6">GG - klant</v-col>
          <v-col col="6"></v-col>
        </v-row>

        <v-container class="calcOverview1">
          <infoDetail :info="{}" :title="true" />

          <infoDetail :info="verwarming_EPC"></infoDetail>
          <infoDetail :info="verwarming_BOUWJAAR_woning"></infoDetail>
          <infoDetail :info="verwarming_BOUWJAAR_appt"></infoDetail>
          <infoDetail :info="isolatiegraadDak"></infoDetail>
          <infoDetail :info="energieBesparingVerwarming"></infoDetail>
          <infoDetail :info="energieBesparingKoeling"></infoDetail>
          <br />
          <infoDetail :info="verwarming_EPC"></infoDetail>
          <infoDetail :info="besparingDoorIsolatie"></infoDetail>
          <infoDetail :info="energiefactuurMetGroen"></infoDetail>
          <br />
          <infoDetail :info="besparingDoorIsolatieelektrisch"></infoDetail>
          <infoDetail :info="besparingDoorIsolatieGas"></infoDetail>
          <infoDetail :info="besparingDoorIsolatieStookolie"></infoDetail>
          <br />
          <infoDetail :info="eenheidsprijselektriciteit"></infoDetail>
          <infoDetail :info="eenheidsprijsGas"></infoDetail>
          <infoDetail :info="eenheidsprijsStookolie"></infoDetail>
          <br />
          <infoDetail :info="extraProductieDoorGroen"></infoDetail>
          <infoDetail :info="JaarlijksExtraUitgespaardeKost"></infoDetail>
          <infoDetail :info="extraGSCOpbrengst"></infoDetail>
          <infoDetail :info="jaarlijkseExtraOpbrengstGroen"></infoDetail>
          <infoDetail :info="meerwaardeHuis"></infoDetail>
          <infoDetail :info="extraAkoestischeIsolatie"></infoDetail>
          <infoDetail :info="indirecteWaardeAkoesischeIsolatie"></infoDetail>
          <infoDetail :info="verschilInPiekTemperatuur"></infoDetail>
          <br />

          <infoDetail :info="investeringskostGroen"></infoDetail>
          <infoDetail :info="afschrijvingskostGroenPerJaar"></infoDetail>
          <infoDetail :info="levensduurGroen"></infoDetail>
          <infoDetail :info="onderhoudsKostGroen"></infoDetail>
          <infoDetail :info="totaleKostGroen"></infoDetail>
          <br />
          <infoDetail :info="investeringskostKlassiek"></infoDetail>
          <infoDetail :info="afschrijvingskostKlassiekPerJaar"></infoDetail>
          <infoDetail :info="levensduurKlassiek"></infoDetail>
          <infoDetail :info="onderhoudsKostKlassiek"></infoDetail>
          <infoDetail :info="totaleKostKlassiek"></infoDetail>
          <br />
          <infoDetail :info="totaleDirecteOpbrengstenKlant"></infoDetail>
          <infoDetail :info="totaleIndirecteOpbrengstenKlant"></infoDetail>
          <infoDetail :info="meerkostenKlantDoorGroen"></infoDetail>
          <br />
          <infoDetail :info="eindbalansKlantDoorGroen"></infoDetail>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import infoDetail from './mtInfoDetail';
// import resNavigation from './mtResultNavigation';

export default {
  created() {
    console.log('GG - voor klant created ');
  },
  data() {
    return {
      effectenVoorDeKlant: this.$store.getters.getGGResultaatVoorKlant
    };
  },
  computed: {
    verwarming_EPC() {
      return this.effectenVoorDeKlant.verwarmingEPC;
    },
    verwarming_BOUWJAAR_woning() {
      return this.effectenVoorDeKlant.verwarmingBouwjaarWoning;
    },
    verwarming_BOUWJAAR_appt() {
      return this.effectenVoorDeKlant.verwarmingBouwjaarAppartement;
    },
    isolatiegraadDak() {
      return this.effectenVoorDeKlant.isolatiegraadDak;
    },
    energieBesparingVerwarming() {
      return this.effectenVoorDeKlant.energieBesparingVerwarming;
    },
    energieBesparingKoeling() {
      return this.effectenVoorDeKlant.energieBesparingKoeling;
    },
    besparingDoorIsolatie() {
      return this.effectenVoorDeKlant.besparingDoorIsolatie;
    },
    energiefactuurMetGroen() {
      return this.effectenVoorDeKlant.energiefactuurMetGroen;
    },
    eenheidsprijselektriciteit() {
      return this.effectenVoorDeKlant.eenheidsprijselektriciteit;
    },
    eenheidsprijsGas() {
      return this.effectenVoorDeKlant.eenheidsprijsGas;
    },
    eenheidsprijsStookolie() {
      return this.effectenVoorDeKlant.eenheidsprijsStookolie;
    },
    besparingDoorIsolatieelektrisch() {
      return this.effectenVoorDeKlant.besparingDoorIsolatieelektrisch;
    },
    besparingDoorIsolatieGas() {
      return this.effectenVoorDeKlant.besparingDoorIsolatieGas;
    },
    besparingDoorIsolatieStookolie() {
      return this.effectenVoorDeKlant.besparingDoorIsolatieStookolie;
    },
    extraProductieDoorGroen() {
      return this.effectenVoorDeKlant.jaarlijkseExtraProductieDoorGroen;
    },
    JaarlijksExtraUitgespaardeKost() {
      return this.effectenVoorDeKlant.JaarlijksExtraUitgespaardeKost;
    },
    extraGSCOpbrengst() {
      return this.effectenVoorDeKlant.extraGSCOpbrengst;
    },
    jaarlijkseExtraOpbrengstGroen() {
      return this.effectenVoorDeKlant.jaarlijkseExtraOpbrengstGroen;
    },
    meerwaardeHuis() {
      return this.effectenVoorDeKlant.meerwaardeHuis;
    },
    extraAkoestischeIsolatie() {
      return this.effectenVoorDeKlant.extraAkoestischeIsolatie;
    },
    indirecteWaardeAkoesischeIsolatie() {
      return this.effectenVoorDeKlant.indirecteWaardeAkoesischeIsolatie;
    },
    verschilInPiekTemperatuur() {
      return this.effectenVoorDeKlant.verschilInPiekTemperatuur;
    },
    //Groen dak
    investeringskostGroen() {
      return this.effectenVoorDeKlant.investeringskostGroen;
    },
    afschrijvingskostGroenPerJaar() {
      return this.effectenVoorDeKlant.afschrijvingskostGroenPerJaar;
    },
    levensduurGroen() {
      return this.effectenVoorDeKlant.levensduurGroen;
    },
    onderhoudsKostGroen() {
      return this.effectenVoorDeKlant.onderhoudsKostGroen;
    },
    totaleKostGroen() {
      return this.effectenVoorDeKlant.totaleKostGroen;
    },
    //Klassiek dak
    investeringskostKlassiek() {
      return this.effectenVoorDeKlant.investeringskostKlassiek;
    },
    onderhoudsKostKlassiek() {
      return this.effectenVoorDeKlant.onderhoudsKostKlassiek;
    },
    levensduurKlassiek() {
      return this.effectenVoorDeKlant.levensduurKlassiek;
    },
    afschrijvingskostKlassiekPerJaar() {
      return this.effectenVoorDeKlant.afschrijvingskostKlassiekPerJaar;
    },
    totaleKostKlassiek() {
      return this.effectenVoorDeKlant.totaleKostKlassiek;
    },
    totaleDirecteOpbrengstenKlant() {
      return this.effectenVoorDeKlant.totaleDirecteOpbrengstenKlant;
    },
    totaleIndirecteOpbrengstenKlant() {
      return this.effectenVoorDeKlant.totaleIndirecteOpbrengstenKlant;
    },
    meerkostenKlantDoorGroen() {
      return this.effectenVoorDeKlant.meerkostenKlantDoorGroen;
    },
    eindbalansKlantDoorGroen() {
      return this.effectenVoorDeKlant.eindbalansKlantDoorGroen;
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
  height: 46em;
}

.mtLinks {
  font-size: 0.6em;
}
</style>
