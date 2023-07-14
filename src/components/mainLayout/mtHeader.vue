<template>
  <v-app-bar color="#69abe5" class="pt-0" height="118" app>
    <VSpacer />

    <ul class="mtUL">
      <mtMenuItem link="http://www.muurtuin.be/#top" title="Home" />
      <mtMenuItem link="http://www.muurtuin.be/over-ons/" title="Over Ons" />
      <mtMenuItem link="Todo - dropdown" title="Voor wie" />
      <mtMenuItem
        link="http://www.muurtuin.be/toepassing/"
        title="Toepassing"
      />
      <mtMenuItem link="http://www.muurtuin.be/planten/" title="Planten" />
      <mtMenuItem link="http://www.muurtuin.be/onderhoud/" title="Onderhoud" />
      <mtMenuItem link="http://www.muurtuin.be/projecten/" title="Projecten" />
      <mtMenuItem
        link="https://test-groen.herokuapp.com/groen/welkom"
        title="Rekenen met Groen"
      />
      <mtMenuItem
        link="http://www.muurtuin.be/contact/"
        title="Contact"
        v-bind:end="true"
      />
    </ul>

    <div class="alignRight">
      <a href="http://www.muurtuin.be/">
        <img
          class="mtLogo"
          src="http://www.muurtuin.be/wp-content/uploads/2016/03/Muurtuin_logo_randsm_neg.png"
          alt="Muurtuin"
        />
      </a>
    </div>

    <VSpacer />
  </v-app-bar>
</template>

<script>
import mtMenuItem from './headerMenu/mtMenuItem';

export default {
  components: { mtMenuItem }
};
</script>

<style scoped>
.mtLogo {
  height: 5em;
  width: 15em;
}

.contactBorder {
  border: 2px solid white;
}

.mtUL {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
