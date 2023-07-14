<template>
  <v-app>
    <mtHeader v-if="showHeader" class="mtMenu" />

    <v-content class="mtBodyColor">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <mtFooter v-if="showFooter" class="mtFooter" />
  </v-app>
</template>

<script>
import mtHeader from '@/components/mainLayout/mtHeader';
import mtFooter from '@/components/mainLayout/mtFooter';

export default {
  name: 'App',
  components: { mtHeader, mtFooter },
  data: () => ({
    //
    showHeader: false,
    showFooter: false
  })
};
</script>

<style>
.main {
  width: 50em;
  height: 40em;
}

.mtMenu {
  height: 10em;
}

.mtFooter {
  height: 5em;
}

.mtBodyColor {
  background-color: #95d60a;
}
.mtHeaderColor {
  background-color: #69abe5;
}

.titleGroen {
  font-size: 1.5em;
  font-weight: bold;
}

.titleGroenInfo {
  font-size: 1em;
  font-style: italic;
}

.mtHeader {
  background-color: #69abe5;
}

.mtBody {
  background-color: #95d60a;
}

/* max-width:500px => at least 500px */
/* min-width:500px => at most 500px */
@media (min-width: 1000px) {
  .v-application {
    font-size: 18px;
    /*font-family: 'Courier New', Courier, monospace;*/
    font-family: 'Roboto', sans-serif;
  }
}

@media (max-width: 1000px) {
  .v-application {
    font-size: 13px;
    /*font-family: fantasy;*/
    font-family: 'Roboto', sans-serif;
  }
}

@media (max-width: 700px) {
  .v-application {
    font-size: 8px;
    /*font-family: monospace;*/
    font-family: 'Roboto', sans-serif;
  }
}
</style>
