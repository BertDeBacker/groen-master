<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <v-container>
          <v-row class="titleGroenInfo"
            >Over hoeveel jaar wenst u de investering af te schrijven?</v-row
          >
          <v-row align="end">
            <v-col cols="2">
              <v-radio-group v-model="afschrijvingWaarde">
                <v-radio
                  v-for="(n, i) in afschrijvings"
                  :key="i"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-if="afschrijving.jaar.waarde === 'overig'"
                label="aantal jaar"
                persistent-hint
                v-model="afschrijving.jaarOverig.waarde"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <mtError :errors="errors"></mtError>
  </v-container>
</template>

<script>
import Afschrijving from '@/store/modules/info/input/afschrijving';
import mtError from './mtError';

export default {
  data() {
    return {
      needSaving: true,
      afschrijvings: Afschrijving.AFSCHRIJVINGSPERIODES,
      afschrijving: Afschrijving.clone(this.$store.getters.getAfschrijving),
      afschrijvingWaarde: this.$store.getters.getAfschrijving.jaar.waarde.toString(),
      errors: undefined
    };
  },
  watch: {
    afschrijvingWaarde: function(val) {
      this.afschrijving.jaar.waarde = val;
    }
  },
  methods: {
    save() {
      if (this.needSaving) {
        console.log('Save Q5');

        let res = this.afschrijving.validate();
        if (res.result) {
          this.$store.commit('SET_AFSCHRIJVING', this.afschrijving);
          this.needSaving = false;
          this.errors = undefined;
        } else {
          this.errors = { ...res.errors };
        }
      } else {
        console.log('No changes detected on Q5, no need to save!');
      }
      return this.errors ? false : true;
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
      ['afschrijving.jaar.waarde', 'afschrijving.jaarOverig.waarde', 'errors'],
      this.ISawThis.bind(this)
    );
  },
  components: { mtError }
};
</script>

<style>
.reSize {
  transform: scale(1);
}
</style>
