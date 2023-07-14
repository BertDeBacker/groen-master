<template>
  <v-combobox
    v-bind="select"
    :items="listData"
    item-text="waarde"
    item-value="id"
    return-object
    @change="doit($event)"
  ></v-combobox>
</template>

<script>
export default {
  props: ['listData', 'value'],
  data() {
    return {
      select: value
    };
  },
  //   ,
  //   computed: {
  //     list: function() {
  //       let list = this.listData.map(val => val.waarde);
  //       return list;
  //     }

  methods: {
    doit: function(val) {
      this.$emit('input', this.select);
    }
  }
};
</script>

<style></style>
