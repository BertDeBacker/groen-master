<template>
  <span v-html="filler()"></span>
</template>

<script>
export default {
  props: ["spaces", "separator"],
  methods: {
    filler() {
      let val;
      const space = "&nbsp";
      val = space.repeat(this.spaces);
      return val + this.separator + val;
    }
  }
};
</script>
