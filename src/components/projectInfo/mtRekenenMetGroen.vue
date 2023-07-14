<template>
  <div class="mtStepper mx-auto">
    <v-stepper v-model="step" class="mx-auto">
      <v-row class="mtHeader mx-auto">
        <v-stepper-header class="mx-auto">
          <v-stepper-step :complete="step > 1" step="1" editable
            >Project</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2" editable
            >Type woning</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3" editable
            >Verwarming</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 4" step="4" editable
            >Zonnepanelen</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 5" step="5" editable
            >Afschrijving</v-stepper-step
          >
        </v-stepper-header>
      </v-row>

      <v-stepper-items class="mtBody">
        <v-stepper-content step="1">
          <GreenParticulierVraag1 ref="Q1" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <GreenParticulierVraag2 ref="Q2" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <GreenParticulierVraag3 ref="Q3" />
        </v-stepper-content>
        <v-stepper-content step="4">
          <GreenParticulierVraag4 ref="Q4" />
        </v-stepper-content>
        <v-stepper-content step="5">
          <GreenParticulierVraag5 ref="Q5" />
        </v-stepper-content>
        <v-stepper-content step="6">
          <GreenParticulierVraagCompleted ref="Q6" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div class="text-center pt-5">
      <v-btn @click="back()" :disabled="step === 1" width="100">Back</v-btn>
      <v-btn
        color="primary"
        @click="next()"
        :disabled="step === 6"
        width="100"
        class="ml-5"
        >Next</v-btn
      >
    </div>
  </div>
</template>

<script>
import GreenParticulierVraag1 from './mtParticulierVraag1';
import GreenParticulierVraag2 from './mtParticulierVraag2';
import GreenParticulierVraag3 from './mtParticulierVraag3';
import GreenParticulierVraag4 from './mtParticulierVraag4';
import GreenParticulierVraag5 from './mtParticulierVraag5';
import GreenParticulierVraagCompleted from './mtParticulierVraagCompleted';

import { EffectenVoorDeKlant } from '@/store/modules/info/GD_Calculations/effectenVoorDeKlant';
import { EffectenVoorGemeenschap } from '@/store/modules/info/GD_Calculations/effectenVoorGemeenschap';
import { EffectenVoorDeKlant as GGEffectenVoorDeKlant } from '@/store/modules/info/GG_Calculations/effectenVoorDeKlant';
import { EffectenVoorGemeenschap as GGEffectenVoorGemeenschap } from '@/store/modules/info/GG_Calculations/effectenVoorGemeenschap';

export default {
  data: function() {
    return {
      step: 1,
      componentRef: [null, 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']
    };
  },
  methods: {
    next() {
      if (this.saveScreen()) {
        if (this.step === 5) this.doCalculations();
        if (this.step === 6) {
          return;
        }
        this.step++;
      }
    },
    back() {
      this.saveScreen();
      if (this.step === 1) return;
      this.step--;
    },
    saveScreen() {
      return this.$refs[this.componentRef[this.step]].save();
    },
    doCalculations() {
      let effectenVoorDeKlant;

      try {
        effectenVoorDeKlant = new EffectenVoorDeKlant(
          this.$store.getters.getWoning,
          this.$store.getters.getProjectInfo,
          this.$store.getters.getVerwarming,
          this.$store.getters.getZonnepanelen,
          this.$store.getters.getAfschrijving
        );
        console.log(effectenVoorDeKlant);
      } catch (error) {
        console.log('effectenVoorDeKlant');
        console.log(error);
      }

      let effectenVoorGemeenschap;
      try {
        effectenVoorGemeenschap = new EffectenVoorGemeenschap(
          effectenVoorDeKlant,
          this.$store.getters.getWoning,
          this.$store.getters.getProjectInfo,
          this.$store.getters.getVerwarming,
          this.$store.getters.getZonnepanelen,
          this.$store.getters.getAfschrijving
        );
        console.log(effectenVoorGemeenschap);
      } catch (error) {
        console.log('effectenVoorGemeenschap');
        console.log(error);
      }

      let effectenVoorDeKlantGG;
      try {
        effectenVoorDeKlantGG = new GGEffectenVoorDeKlant(
          this.$store.getters.getWoning,
          this.$store.getters.getProjectInfo,
          this.$store.getters.getVerwarming,
          this.$store.getters.getZonnepanelen,
          this.$store.getters.getAfschrijving
        );
        console.log(effectenVoorDeKlantGG);
      } catch (error) {
        console.log('effectenVoorDeKlantGG');
        console.log(error);
      }

      let effectenVoorGemeenschapGG;
      try {
        effectenVoorGemeenschapGG = new GGEffectenVoorGemeenschap(
          effectenVoorDeKlantGG,
          this.$store.getters.getWoning,
          this.$store.getters.getProjectInfo,
          this.$store.getters.getVerwarming,
          this.$store.getters.getZonnepanelen,
          this.$store.getters.getAfschrijving
        );
        console.log(effectenVoorGemeenschapGG);
      } catch (error) {
        console.log('effectenVoorGemeenschapGG');
        console.log(error);
      }

      this.$store.commit('SET_GDRESULTAATVOORKLANT', effectenVoorDeKlant);
      this.$store.commit(
        'SET_GDRESULTAATVOORGEMEENSCHAP',
        effectenVoorGemeenschap
      );

      this.$store.commit('SET_GGRESULTAATVOORKLANT', effectenVoorDeKlantGG);
      this.$store.commit(
        'SET_GGRESULTAATVOORGEMEENSCHAP',
        effectenVoorGemeenschapGG
      );
    }
  },
  components: {
    GreenParticulierVraag1,
    GreenParticulierVraag2,
    GreenParticulierVraag3,
    GreenParticulierVraag4,
    GreenParticulierVraag5,
    GreenParticulierVraagCompleted
  }
};
</script>

<style>
.mtStepper {
  width: 50em;
}

/*   Overwrite default Vutify style  */
/*   Styling for combobox items      */

/*Overwrite Vuetify Default*/
.theme--light.v-list {
  /*background-color: orange;*/
}

/*Overwrite Vuetify Default*/
.v-list-item__title {
  font-size: 0.6em;
}

/*Overwrite Vuetify Default*/
.v-list-item {
  min-height: 1em;
  height: 1.1em;
  /*border: 1px solid black;*/
}

.v-btn.v-size--default {
  font-size: 1em;
  min-height: 1.6em;
}

div {
  font-size: 1em;
}

label {
  font-size: 1em;
}

.v-stepper__header {
  box-shadow: 0 0;
}

.vraagCard {
  width: 50em;
  height: 30em;
}
</style>
