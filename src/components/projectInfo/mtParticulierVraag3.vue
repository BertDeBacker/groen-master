<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <v-container>
          <v-row class="titleGroenInfo">Hoe verwarmt u de woning</v-row>

          <v-row>
            <v-col>
              <v-radio-group v-model="verwarming.verwarming">
                <v-radio
                  v-for="n in verwarmings"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col>
              <div v-if="verwarming.verwarming === 'Elektriciteit'">
                <v-text-field
                  label="Huidig elektriciteitsverbruik (kWh/jaar)"
                  persistent-hint
                  v-model="verwarming.elektriciteitVerbruik.waarde"
                  type="number"
                  suffix="kWh"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.elektriciteitVerbruikWeetNiet"
                ></v-checkbox>
                <v-text-field
                  label="Huidige prijs (Euro/jaar)"
                  persistent-hint
                  v-model="verwarming.elektriciteitPrijs.waarde"
                  type="number"
                  suffix="€"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.elektriciteitPrijsWeetNiet"
                ></v-checkbox>
              </div>

              <div v-if="verwarming.verwarming === 'Aardgas'">
                <v-text-field
                  label="Huidig aardgasverbruik (kWh/jaar)"
                  persistent-hint
                  v-model="verwarming.aardgasVerbruik.waarde"
                  type="number"
                  suffix="kWh"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.aardgasVerbruikWeetNiet"
                ></v-checkbox>
                <v-text-field
                  label="Huidige prijs (Euro/jaar)"
                  persistent-hint
                  v-model="verwarming.aardgasPrijs.waarde"
                  type="number"
                  suffix="€"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.aardgasPrijsWeetNiet"
                  persistent-hint
                ></v-checkbox>
              </div>

              <div v-if="verwarming.verwarming === 'Stookolie'">
                <v-text-field
                  label="Huidig stookolieverbruik (liter/jaar)"
                  persistent-hint
                  v-model="verwarming.stookolieVerbruik.waarde"
                  type="number"
                  suffix="liter"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.stookolieVerbruikWeetNiet"
                ></v-checkbox>
                <v-text-field
                  label="Huidige prijs (Euro/jaar)"
                  persistent-hint
                  v-model="verwarming.stookoliePrijs.waarde"
                  type="number"
                  suffix="€"
                ></v-text-field>
                <v-checkbox
                  label="Ik weet het niet"
                  v-model="verwarming.stookoliePrijsWeetNiet"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <mtError :errors="errors"></mtError>
  </v-container>
</template>

<script>
import Verwarming from '@/store/modules/info/input/verwarming';
import mtError from './mtError';

export default {
  data() {
    return {
      needSaving: true,
      verwarmings: Verwarming.VERWARMING,
      verwarming: Verwarming.clone(this.$store.getters.getVerwarming),
      errors: undefined
    };
  },
  watch: {
    'verwarming.verwarming': function(val) {
      switch (val) {
        case 'Elektriciteit':
          this.resetAardgas();
          this.resetStookOlie();
          break;
        case 'Aardgas':
          this.resetStookOlie();
          this.resetelektriciteit();
          break;
        case 'Stookolie':
          this.resetelektriciteit();
          this.resetAardgas();
          break;
      }
    }
  },
  methods: {
    save() {
      if (this.needSaving) {
        console.log('Save Q3');

        let res = this.verwarming.validate();
        if (res.result) {
          this.$store.commit('SET_VERWARMING', this.verwarming);
          this.needSaving = false;
          this.errors = undefined;
        } else {
          this.errors = { ...res.errors };
        }
      } else {
        console.log('No changes detected on Q3, no need to save!');
      }
      return this.errors ? false : true;
    },

    resetelektriciteit() {
      this.verwarming.elektriciteitVerbruik.waarde = '';
      this.verwarming.elektriciteitVerbruikWeetNiet = true;
      this.verwarming.elektriciteitPrijs.waarde = '';
      this.verwarming.elektriciteitPrijsWeetNiet = true;
    },

    resetAardgas() {
      this.verwarming.aardgasVerbruik.waarde = '';
      this.verwarming.aardgasVerbruikWeetNiet = true;
      this.verwarming.aardgasPrijs.waarde = '';
      this.verwarming.aardgasPrijsWeetNiet = true;
    },

    resetStookOlie() {
      this.verwarming.stookolieVerbruik.waarde = '';
      this.verwarming.stookolieVerbruikWeetNiet = true;
      this.verwarming.stookoliePrijs.waarde = '';
      this.verwarming.stookoliePrijsWeetNiet = true;
    },

    baywatch: function(props, watcher) {
      var iterator = function(prop) {
        this.$watch(prop, watcher);
      };
      props.forEach(iterator, this);
    },
    ISawThis() {
      this.needSaving = true;
      console.log('I saw this!!');
    }
  },
  created() {
    this.baywatch(
      [
        'verwarming.verwarming',
        'verwarming.elektriciteitVerbruik.waarde',
        'verwarming.elektriciteitVerbruikWeetNiet',
        'verwarming.elektriciteitPrijs.waarde',
        'verwarming.elektriciteitPrijsWeetNiet',
        'verwarming.aardgasVerbruik.waarde',
        'verwarming.aardgasVerbruikWeetNiet',
        'verwarming.aardgasPrijs.waarde',
        'verwarming.aardgasPrijsWeetNiet',
        'verwarming.stookolieVerbruik.waarde',
        'verwarming.stookolieVerbruikWeetNiet',
        'verwarming.stookoliePrijs.waarde',
        'verwarming.stookoliePrijsWeetNiet',
        'errors'
      ],
      this.ISawThis.bind(this)
    );
  },
  components: { mtError }
};
</script>
