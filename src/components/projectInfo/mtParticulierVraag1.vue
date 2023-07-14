<template>
  <v-container>
    <v-row justify="center">
      <v-card class="vraagCard pa-5" outlined>
        <v-container>
          <v-row class="titleGroenInfo">Project</v-row>
          <v-row>
            <v-col cols="4">
              <div>
                <v-checkbox
                  label="Groendak"
                  v-model="projectInfo.groenDakInfo"
                ></v-checkbox>
              </div>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-if="projectInfo.groenDakInfo"
                label="oppervlakte groendak"
                type="number"
                suffix="m²"
                v-model="projectInfo.groenDakOppervlak.waarde"
                persistent-hint
              ></v-text-field>
              <v-text-field
                v-if="projectInfo.groenDakInfo"
                label="totale dak oppervlakte"
                type="number"
                suffix="m²"
                v-model="projectInfo.groenDakTotaalOppervlak.waarde"
                persistent-hint
              ></v-text-field>
              <v-combobox
                class="mtComboBox"
                v-if="projectInfo.groenDakInfo"
                v-model="projectInfo.groenDakType"
                item-text="waarde"
                item-value="id"
                label="type groendak"
                :items="groenDakTypes"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-checkbox
                label="Groenegevel"
                v-model="projectInfo.groeneGevelInfo"
              ></v-checkbox>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-if="projectInfo.groeneGevelInfo"
                label="oppervlakte"
                type="number"
                suffix="m²"
                v-model="projectInfo.groeneGevelOppervlak.waarde"
                persistent-hint
              ></v-text-field>
              <v-combobox
                v-if="projectInfo.groeneGevelInfo"
                v-model="projectInfo.groeneGevelType"
                return-object
                item-text="waarde"
                item-value="id"
                label="type groenegevel"
                :items="groeneGevelTypes"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <mtError :errors="errors"></mtError>
  </v-container>
</template>

<script>
import InfoVoor from '@/store/modules/info/input/projectInfo';
import mtError from './mtError';
import mtGGCombo from './mtGroeneGevelComboBox';

export default {
  data() {
    return {
      needSaving: true,
      groenDakTypes: InfoVoor.GROENDAKTYPE,
      groeneGevelTypes: InfoVoor.GROENGEVELTYPE,
      projectInfo: InfoVoor.clone(this.$store.getters.getProjectInfo),
      errors: undefined
    };
  },

  methods: {
    save() {
      if (this.needSaving) {
        console.log('Save Q1');

        let res = this.projectInfo.validate();
        if (res.result) {
          this.$store.commit('SET_PROJECTINFO', this.projectInfo);
          this.needSaving = false;
          this.errors = undefined;
        } else {
          this.errors = { ...res.errors };
        }

        // this.projectInfo.groenDakPercentage.waarde =
        //   (this.projectInfo.groenDakOppervlak.waarde /
        //     this.infoprojectInfoVoor.groenDakTotaalOppervlak.waarde) *
        //   100;
      } else {
        console.log('No changes detected on Q1, no need to save!');
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
        'projectInfo.groenDakInfo',
        'projectInfo.groenDakOppervlak.waarde',
        'projectInfo.groenDakTotaalOppervlak.waarde',
        'projectInfo.groenDakType',
        'projectInfo.groeneGevelInfo',
        'projectInfo.groeneGevelOppervlak.waarde',
        'projectInfo.groeneGevelTotaalOppervlak.waarde',
        'projectInfo.groeneGevelType',
        'errors'
      ],
      this.ISawThis.bind(this)
    );
  },
  components: { mtError, mtGGCombo }
};
</script>
