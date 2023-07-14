<template>
  <tr v-bind:class="{ trSummaryRow: isSummaryRow }">
    <td class="tdAlignRight ">
      {{ groenGD ? groenGD.naam : '-' }}
      {{ groenGD.type ? ' - ' + groenGD.type : '' }}
    </td>
    <td>{{ klassiekGD_val }}</td>
    <td v-if="min">{{ groenGD_val_min }}</td>
    <td v-if="avg">{{ groenGD_val_avg }}</td>
    <td v-if="max">{{ groenGD_val_max }}</td>
    <td class="tdTussen"></td>
    <td>{{ klassiekGG_val }}</td>
    <td v-if="min">{{ groenGG_val_min }}</td>
    <td v-if="avg">{{ groenGG_val_avg }}</td>
    <td v-if="max">{{ groenGG_val_max }}</td>
    <td>{{ eenheid }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    klassiekGD: { type: Object },
    groenGD: { type: Object },
    klassiekGG: { type: Object },
    groenGG: { type: Object },
    min: [Boolean],
    avg: [Boolean],
    max: [Boolean],
    isSummaryRow: { type: Boolean, default: false }
  },
  computed: {
    klassiekGD_val: function() {
      let val = this.klassiekGD ? this.klassiekGD.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.klassiekGD ? this.klassiekGD.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGD_val_min: function() {
      let val = this.groenGD ? this.groenGD.min : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGD ? this.groenGD.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGD_val_avg: function() {
      let val = this.groenGD ? this.groenGD.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGD ? this.groenGD.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGD_val_max: function() {
      let val = this.groenGD ? this.groenGD.max : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGD ? this.groenGD.decimals : 0;
      return this.formatDecimals(val, decimals);
    },

    klassiekGG_val: function() {
      let val = this.klassiekGG ? this.klassiekGG.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.klassiekGG ? this.klassiekGG.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGG_val_min: function() {
      let val = this.groenGG ? this.groenGG.min : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGG ? this.groenGG.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGG_val_avg: function() {
      let val = this.groenGG ? this.groenGG.avg : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGG ? this.groenGG.decimals : 0;
      return this.formatDecimals(val, decimals);
    },
    groenGG_val_max: function() {
      let val = this.groenGG ? this.groenGG.max : '-';
      val === 0 ? (val = '-') : val;
      let decimals = this.groenGG ? this.groenGG.decimals : 0;
      return this.formatDecimals(val, decimals);
    },

    eenheid: function() {
      let eenh = this.groenGD ? this.groenGD.eenheid : '';
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

.tdTussen {
  background-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  width: 2em;
}

.trSummaryRow {
  font-weight: bold;
}
</style>
