<template>
  <v-card raised class="detailCard">
    <v-card-title primary-title>
      {{ this.capitalizeFirstLetter(this.property) }}
    </v-card-title>
    <v-card-text>
      <v-row v-for="(val, index) in keys" v-bind:key="index">
        <waardeEenheid
          v-bind:key="val"
          :info="info[property]"
          :property="val"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import waardeEenheid from './waardeEenheid';
import { mixinFunctions } from '../../mixins/mixFunctions';

export default {
  mixins: [mixinFunctions],
  props: { info: Object, property: String },
  components: { waardeEenheid },
  computed: {
    keys() {
      return Object.keys(this.info[this.property]);
    }
  }
};
</script>

<style>
.v-card__title {
  padding: 5px 15px;
}
</style>
