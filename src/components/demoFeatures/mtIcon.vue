<template>
  <div>
    <router-link :to="linkTo"
      ><img :src="iconToDisplay" class="mtIcons" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['icon'],
  data: function() {
    return {
      muurTuinIcons: {
        appel: {
          src: require('@/assets/iconen/appel.png'),
          linkTo: 'infosheet'
        },
        bij: {
          src: require('@/assets/iconen/bij.png'),
          linkTo: 'infosheet'
        },
        gasmasker: {
          src: require('@/assets/iconen/gasmasker.png'),
          linkTo: 'infosheet'
        },
        grafiek: {
          src: require('@/assets/iconen/grafiek.png'),
          linkTo: 'infosheet'
        },
        hart: {
          src: require('@/assets/iconen/hart.png'),
          linkTo: 'infosheet'
        },
        hoofdtelefoon: {
          src: require('@/assets/iconen/hoofdtelefoon.png'),
          linkTo: 'infosheet'
        },
        huis: {
          src: require('@/assets/iconen/huis.png'),
          linkTo: 'infosheet'
        },
        koelkast: {
          src: require('@/assets/iconen/koelkast.png'),
          linkTo: 'infosheet'
        },
        oog: {
          src: require('@/assets/iconen/oog.png'),
          linkTo: 'infosheet'
        },
        rekenenmetgroen: {
          src: require('@/assets/iconen/rekenenmetgroen.png'),
          linkTo: 'infosheet'
        },
        spaarvarken: {
          src: require('@/assets/iconen/spaarvarken.png'),
          linkTo: 'infosheet'
        },
        stofzuiger: {
          src: require('@/assets/iconen/stofzuiger.png'),
          linkTo: 'infosheet'
        },
        thermometer: {
          src: require('@/assets/iconen/thermometer.png'),
          linkTo: 'infosheet'
        },
        thermos: {
          src: require('@/assets/iconen/thermos.png'),
          linkTo: 'infosheet'
        },
        uithangbord: {
          src: require('@/assets/iconen/uithangbord.png'),
          linkTo: 'infosheet'
        },
        veiligheid: {
          src: require('@/assets/iconen/veiligheid.png'),
          linkTo: 'infosheet'
        },
        ventilator: {
          src: require('@/assets/iconen/ventilator.png'),
          linkTo: 'infosheet'
        },
        wolk: {
          src: require('@/assets/iconen/wolk.png'),
          linkTo: 'infosheet'
        },
        zonnecreme: {
          src: require('@/assets/iconen/zonnecreme.png'),
          linkTo: 'infosheet'
        }
      }
    };
  },
  computed: {
    iconToDisplay: function() {
      return this.muurTuinIcons[this.icon].src.default;
    },
    linkTo: function() {
      return this.muurTuinIcons[this.icon].linkTo;
    }
  }
};
</script>

<style>
.mtIcons {
  width: 4em;
  height: 4em;
}
</style>
