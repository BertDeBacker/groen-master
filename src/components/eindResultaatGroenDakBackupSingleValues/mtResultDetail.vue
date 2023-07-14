<template>
  <tr v-bind:class="{ trSummaryRow: isSummaryRow }">
    <td class="tdAlignRight ">
      {{ groen ? groen.naam : '-' }}
      {{ groen.type ? ' - ' + groen.type : '' }}
    </td>
    <td>{{ klassiek_val }}</td>
    <td v-if="min">{{ groen_val_min }}</td>
    <td v-if="avg">{{ groen_val_avg }}</td>
    <td v-if="max">{{ groen_val_max }}</td>
    <td>{{ eenheid }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    klassiek: { type: Object },
    groen: { type: Object },
    min: [String, Number],
    avg: [String, Number],
    max: [String, Number],
    isSummaryRow: { type: Boolean, default: false }
  },
  computed: {
    klassiek_val: function() {
      let val = this.klassiek ? this.klassiek.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.klassiek ? this.klassiek.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groen_val_min: function() {
      let val = this.groen ? this.groen.min : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groen ? this.groen.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groen_val_avg: function() {
      let val = this.groen ? this.groen.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groen ? this.groen.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groen_val_max: function() {
      let val = this.groen ? this.groen.max : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groen ? this.groen.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    eenheid: function() {
      let eenh = this.groen ? this.groen.eenheid : '';
      return eenh;
    }
  },
  methods: {
    formatDecimals(val, decimals) {
      try {
        if (typeof val === 'number') {
          return Number.parseFloat(val).toFixed(decimals);
        } else {
          return val;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
td {
  padding: 2px;
  text-align: center;
  font-size: 0.7em;
  border: 1px solid black;
}

.tdAlignRight {
  text-align: left;
  border: 1px solid black;
  background-color: orange;
}

.trSummaryRow {
  font-weight: bold;
}
</style>
