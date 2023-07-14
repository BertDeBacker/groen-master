<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <span class="titleGroenInfo">Type woning en bouwjaar</span>
        <v-card-text>
          <v-combobox
            label="woning type"
            v-model="woning.type"
            :items="woningTypes"
          />
          <v-text-field
            label="bouwjaar"
            v-model="woning.bouwjaar.waarde"
            persistent-hint
            type="number"
          />
          <v-text-field
            label="bewoonbare opp"
            v-model="woning.bewoonbareOppervlakte.waarde"
            type="number"
            suffix="m²"
            persistent-hint
          />

          <v-container fluid>
            <v-row>
              <v-col>
                <v-radio-group
                  v-model="woning.isolatieDak"
                  label="isolatie dak"
                >
                  <v-radio
                    v-for="n in DakIsolatie"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col>
                <v-radio-group
                  v-model="woning.EPCLabel"
                  label="EPC energielabel"
                >
                  <v-radio
                    v-for="n in EPCEnergielabel"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  >
                  </v-radio>
                  <a
                    href="https://nl.wikipedia.org/wiki/Energieprestatiecertificaat"
                    target="_blank"
                    class="overline"
                    >(Meer informatie)</a
                  >
                </v-radio-group>
              </v-col>
              <v-col>
                <v-text-field
                  v-if="woning.EPCLabel === 'ja'"
                  class="pt-10"
                  label="EPC "
                  type="number"
                  suffix="kWh/m²"
                  v-model="woning.EPCLabel_Waarde.waarde"
                  persistent-hint
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
    <mtError :errors="errors"></mtError>
  </v-container>
</template>

<script>
import Woning from '@/store/modules/info/input/woning';
import mtError from './mtError';

export default {
  data() {
    return {
      needSaving: true,
      woningTypes: Woning.WONINGTYPE,
      DakIsolatie: Woning.DAKISOLATIE,
      EPCEnergielabel: Woning.EPCENERGIELABEL,
      woning: Woning.clone(this.$store.getters.getWoning),
      errors: undefined
    };
  },
  methods: {
    save() {
      if (this.needSaving) {
        console.log('Save Q2');

        let res = this.woning.validate();
        if (res.result) {
          this.$store.commit('SET_WONING', this.woning);
          this.needSaving = false;
          this.errors = undefined;
        } else {
          this.errors = { ...res.errors };
        }
      } else {
        console.log('No changes detected on Q2, no need to save!');
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
      [
        'woning.type',
        'woning.bouwjaar.waarde',
        'woning.bewoonbareOppervlakte.waarde',
        'woning.isolatieDak',
        'woning.EPCLabel',
        'woning.EPCLabel_Waarde.waarde',
        'errors'
      ],
      this.ISawThis.bind(this)
    );
  },
  components: { mtError }
};
</script>
