<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <v-container>
          <v-row class="titleGroenInfo">Beschikt U over zonnepanelen?</v-row>

          <v-row>
            <v-col cols="2">
              <v-radio-group
                v-model="zonnepanelen.zonnepanelen"
                @click="$emit('update:info', info)"
              >
                <v-radio
                  v-for="n in zonnepanelens"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="5">
              <div v-if="zonnepanelen.zonnepanelen === 'ja'">
                <v-text-field
                  label="aantal zonnepanlen"
                  v-model="zonnepanelen.aantal.waarde"
                  persistent-hint
                  type="number"
                ></v-text-field>
                <v-combobox
                  v-model="zonnepanelen.orientatie.waarde"
                  label="oriëntatie"
                  :items="orientaties"
                />
                <v-text-field
                  label="gezamelijk vermogen"
                  persistent-hint
                  v-model="zonnepanelen.gezamelijkVermogen.waarde"
                  type="number"
                  suffix="W"
                ></v-text-field>
                <v-checkbox
                  label="ik weet het niet"
                  v-model="zonnepanelen.gezamelijkVermogenWeetNiet"
                  value="value"
                ></v-checkbox>
                <v-text-field
                  label="jaarlijkse productie"
                  suffix="kWh"
                  persistent-hint
                  v-model="zonnepanelen.jaarlijkseProductie.waarde"
                  type="number"
                ></v-text-field>
                <v-checkbox
                  label="ik weet het niet"
                  v-model="zonnepanelen.jaarlijkseProductieWeetNiet"
                  value="value"
                ></v-checkbox>
              </div>
            </v-col>
            <v-col cols="5">
              <div v-if="zonnepanelen.zonnepanelen === 'ja'">
                <v-radio-group
                  v-model="zonnepanelen.groenestroomcertificaten"
                  label="Ontvangt U groenestroomcertificaten?"
                >
                  <v-radio
                    v-for="n in zonnepanelens"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>

                <v-text-field
                  v-if="zonnepanelen.groenestroomcertificaten === 'ja'"
                  label="waarde"
                  persistent-hint
                  v-model="zonnepanelen.groenestroomcertificatenPrijs.waarde"
                  type="number"
                  suffix="€/1000kWh"
                ></v-text-field>
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
import Zonnepanelen from '@/store/modules/info/input/zonnepanelen';
import mtError from './mtError.vue';

export default {
  data() {
    return {
      needSaving: true,
      zonnepanelens: Zonnepanelen.ZONNEPANELEN,
      orientaties: Zonnepanelen.ORIENTATIE,
      zonnepanelen: Zonnepanelen.clone(this.$store.getters.getZonnepanelen),
      errors: undefined
    };
  },
  watch: {
    'zonnepanelen.zonnepanelen': function(val) {
      if (val === 'nee') {
        this.resetZonnepanelen();
      }
    }
  },

  methods: {
    save() {
      if (this.needSaving) {
        console.log('Save Q4');

        let res = this.zonnepanelen.validate();
        if (res.result) {
          this.$store.commit('SET_ZONNEPANELEN', this.zonnepanelen);
          this.needSaving = false;
          this.errors = undefined;
        } else {
          this.errors = { ...res.errors };
        }
      } else {
        console.log('No changes detected on Q4, no need to save!');
      }
      return this.errors ? false : true;
    },
    resetZonnepanelen() {
      this.zonnepanelen.aantal.waarde = '';
      this.zonnepanelen.orientatie = '';
      this.zonnepanelen.gezamelijkVermogen = '';
      this.zonnepanelen.gezamelijkVermogenWeetNiet = false;
      this.zonnepanelen.jaarlijkseProductie = '';
      this.zonnepanelen.jaarlijkseProductieWeetNiet = false;
      this.zonnepanelen.groenestroomcertificaten = '';
      this.zonnepanelen.groenestroomcertificatenPrijs = '';
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
        'zonnepanelen.zonnepanelen',
        'zonnepanelen.aantal.waarde',
        'zonnepanelen.orientatie.waarde',
        'zonnepanelen.gezamelijkVermogen.waarde',
        'zonnepanelen.gezamelijkVermogenWeetNiet',
        'zonnepanelen.jaarlijkseProductie.waarde',
        'zonnepanelen.jaarlijkseProductieWeetNiet',
        'zonnepanelen.groenestroomcertificaten',
        'zonnepanelen.groenestroomcertificatenPrijs.waarde',
        'errors'
      ],
      this.ISawThis.bind(this)
    );
  },
  components: { mtError }
};
</script>
