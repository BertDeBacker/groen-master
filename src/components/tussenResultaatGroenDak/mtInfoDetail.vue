<template>
  <div>
    <v-row v-if="!title" class="calcDetail">
      <v-col cols="7"
        >{{ naam }}
        {{ type }}
      </v-col>

      <v-col cols="1">
        <div class="alignRight">{{ min }}</div></v-col
      >

      <v-col cols="1">
        <div class="alignRight">{{ avg }}</div></v-col
      >

      <v-col cols="1"
        ><div class="alignRight">{{ max }}</div></v-col
      >

      <v-col cols="1"
        ><div class="alignRight">{{ eenheid }}</div></v-col
      >
    </v-row>

    <v-row v-if="title" class="calcOverviewTitle">
      <v-col cols="7">Parameter</v-col>
      <v-col cols="1">Min</v-col>
      <v-col cols="1">Gem</v-col>
      <v-col cols="1">Max</v-col>
      <v-col cols="1">Eenh.</v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
    title: Boolean
  },
  computed: {
    min: function() {
      let val = this.info ? this.info.min : '';
      return this.formatDecimals(val);
    },

    avg: function() {
      let val = this.info ? this.info.avg : '';
      return this.formatDecimals(val);
    },
    max: function() {
      let val = this.info ? this.info.max : '';
      return this.formatDecimals(val);
    },
    naam: function() {
      let val = this.info ? this.info.naam : '';
      return val;
    },
    type: function() {
      let val = this.info ? this.info.type : '';
      val = val ? ' - ' + val : val;
      return val;
    },
    eenheid: function() {
      let val = this.info ? this.info.eenheid : '';
      return val;
    }
  },
  methods: {
    formatDecimals(val) {
      try {
        if (typeof val === 'number') {
          return Number.parseFloat(val).toFixed(this.info.decimals);
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

<style>
.calcOverviewTitle {
  font-size: 1.1em;
  font-weight: bold;
}

.calcDetail > div {
  padding: 0 0;
}

.alignRight {
  float: right;
}
</style>
