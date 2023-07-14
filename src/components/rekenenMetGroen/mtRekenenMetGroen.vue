<template>
  <div>
    <v-row>
      <v-col cols="2">
        <mtRekenSideMenu></mtRekenSideMenu>
      </v-col>
      <v-col cols="10">
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mtRekenSideMenu from './mtRekenSideMenu';

export default {
  // computed: {
  //   calculationsCompleted: function() {
  //     let val = false;

  //     try {
  //       val = this.$store.state.info.GDResultaatVoorKlant === undefined;
  //     } catch (error) {
  //       console.log(this.$store.getGDResultaatVoorKlant);
  //     }
  //     return !val;
  //   }
  // },
  components: {
    mtRekenSideMenu
  }
};
</script>

<style>
.mtUL {
  list-style-type: none;
}

.mtUL > li {
  margin: 0em;
  padding: 0.3em;
}

.menuCard {
  width: 15em;
  height: 40em;
}

.targetCard {
  width: 75em;
  height: 40em;
}

v-col {
  border: 1px solid black;
}
v-row {
  border: 1px solid black;
}
.cartTussenResultaat {
  background-color: lightgrey;
  font-size: 0.9em;
  height: 2.5em;
  padding: 0 0;
}
</style>
