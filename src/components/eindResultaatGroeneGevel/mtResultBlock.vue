<template>
  <v-container>
    <table>
      <thead>
        <tr>
          <th rowspan="2" style="width:30em" class="thTopR"></th>
          <th rowspan="2" style="width:10em">Klassiek Dak</th>

          <th v-if="calcColumns === 1" colspan="1" style="width:10em">
            Groen Dak
          </th>
          <th v-if="calcColumns === 2" colspan="2" style="width:10em">
            Groen Dak
          </th>
          <th v-if="calcColumns === 3" colspan="3" style="width:10em">
            Groen Dak
          </th>
        </tr>

        <tr>
          <th v-if="min">minimum</th>
          <th v-if="avg">gemiddeld</th>
          <th v-if="max">maximum</th>

          <th rowspan="2" class="thTopL"></th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in infoChapter" v-bind:key="index">
        <mtResultDetail
          :klassiek="info[item.klassiek ? item.klassiek : undefined]"
          :groen="info[item.groen ? item.groen : undefined]"
          :min="min"
          :avg="avg"
          :max="max"
          :isSummaryRow="item.summary"
        />
      </tbody>
    </table>
  </v-container>
</template>

<script>
import mtResultDetail from './mtResultDetail';

export default {
  props: ['info', 'target', 'min', 'avg', 'max'],
  data: function() {
    return {
      //waarde: 'Gemiddeld',
      //waardes: { Minimum: 'min', Gemiddeld: 'avg', Maximum: 'max' }
      columns: 1
    };
  },

  computed: {
    infoChapter: function() {
      return this.info[this.target];
    },
    calcColumns: function() {
      let m = this.min ? 1 : 0;
      let a = this.avg ? 1 : 0;
      let x = this.max ? 1 : 0;
      let tot = m + a + x;
      return tot;
    }
  },
  components: { mtResultDetail }
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

th {
  padding: 2px;
  text-align: center;
  font-size: 1em;
  background-color: orange;
}

.thTopR {
  background-color: transparent;
  border-top-color: transparent;
  border-left-color: transparent;
}
.thTopL {
  background-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
}
</style>
