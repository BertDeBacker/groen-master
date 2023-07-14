<template>
  <li class="mtLI">
    <a class="mtLIa" v-bind:href="this.link">
      <span class="mtMenuItem">
        {{ this.title }}
        <mtSpace v-if="!this.end" spaces="2" separator="|" />
        <mtSpace v-if="this.end" spaces="2" separator />
      </span>
    </a>
  </li>
</template>

<script>
import mtMenuSpacer from "./mtMenuSpacer";
export default {
  props: {
    link: { type: String, required: true },
    title: { type: String },
    separator: { type: String },
    end: { type: Boolean, default: false }
  },
  components: { mtSpace: mtMenuSpacer }
};
</script>

<style>
.mtMenuItem {
  color: white;
  font-weight: bold;
  font-family: "Droid Sans", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}

.mtLI {
  float: left;
}

.mtLIa {
  text-decoration: none;
}
</style>
