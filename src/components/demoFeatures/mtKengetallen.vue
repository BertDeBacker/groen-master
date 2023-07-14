<template>
  <v-card class="pa-5">
    <v-container style="max-height: 100%" class="overflow-y-auto">
      <v-row class="titleGroenInfo">kengetallen groen dak overzicht</v-row>
      <br />
      <v-row style="height: 100%">
        <div>
          <table class="table_1">
            <tr v-for="(value, propertyname) in numbersDak" :key="propertyname">
              <td>{{ propertyname }}</td>
              <td>
                <table class="table_2">
                  <tr v-for="(val, propname) in value" :key="propname">
                    <td>{{ propname }}</td>

                    <td v-if="typeof val !== 'string'">
                      <table class="table_2">
                        <tr v-for="(vali, propnamei) in val" :key="propnamei">
                          <td>{{ propnamei }}</td>

                          <td v-if="typeof vali !== 'string'">
                            <table class="table_2">
                              <tr
                                v-for="(vala, propnamea) in vali"
                                :key="propnamea"
                              >
                                <td>{{ propnamea }}</td>

                                <td v-if="typeof vala !== 'string'">
                                  <table class="table_2">
                                    <tr
                                      v-for="(vale, propnamee) in vala"
                                      :key="propnamee"
                                    >
                                      <td>{{ propnamee }}</td>

                                      <td v-if="typeof vale !== 'string'">
                                        <table class="table_2">
                                          <tr
                                            v-for="(valo, propnameo) in vale"
                                            :key="propnameo"
                                          >
                                            <td>{{ propnameo }}</td>

                                            <td>{{ valo }}</td>
                                          </tr>
                                        </table>
                                      </td>

                                      <td v-else>{{ vale }}</td>
                                    </tr>
                                  </table>
                                </td>

                                <td v-else>{{ vala }}</td>
                              </tr>
                            </table>
                          </td>

                          <td v-else>{{ vali }}</td>
                        </tr>
                      </table>
                    </td>

                    <td v-else>{{ val }}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import json from './data/kengetallen-groen-dak.json';

export default {
  data: () => ({
    offsetTop: 0,
    kengetallen: undefined,
    myJson: json
  }),
  computed: {
    numbersDak: function() {
      return this.myJson.kengetallengroendak;
    }
  },
  methods: {
    formatWaarde(val) {
      if (val.hasOwnProperty('waarde')) return val.waarde;
      else return val;
    },
    formatEenheid(val) {
      if (val.hasOwnProperty('eenheid')) return val.eenheid;
      else return '';
    }
  }
};
</script>

<style>
.table_1 {
  border-collapse: collapse;
  font-size: 12px;
}

.table_1 > tr {
  border: 1px solid gray;
}

.table_1 > tr > td {
  vertical-align: center;
}

.table_2 {
  font-size: 12px;
}

.table_2 > tr {
  border: 1px solid gray;
}

.table_2 > tr > td {
  overflow: hidden;
}

.table_2 > tr > td:nth-child(2) {
  text-align: right;
}

.table_2 > tr > td:nth-child(3) {
  text-align: left;
}

.table_2 > tr > td {
  padding: 1px;
  padding-left: 3px;
  padding-right: 3px;
}
</style>
