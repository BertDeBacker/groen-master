<template>
  <v-container>
    <v-row justify="center">
      <v-card class="review pa-3" outlined>
        <v-row justify="center">
          <div v-for="(val, index) in Object.keys(info)" :key="index">
            <a @click="show(index, $event)">{{ capitalizeFirstLetter(val) }}</a>
            &nbsp; &nbsp;
          </div>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                @click="PrintInput($event)"
                size="2em"
                color="blue"
                v-on="on"
                >mdi-cloud-print-outline</v-icon
              >
            </template>
            <span>Print gegevens</span>
          </v-tooltip>
        </v-row>

        <v-row justify="center" class="pt-10">
          <v-col cols="10">
            <reviewCard
              :info="info"
              id="algemeen"
              property="algemeen"
              class="ma-2"
              :class="isVisible[0]"
            />
            <reviewCard
              :info="info"
              id="projectInfo"
              property="projectInfo"
              class="ma-2"
              :class="isVisible[1]"
            />
            <reviewCard
              :info="info"
              id="woning"
              property="woning"
              class="ma-2"
              :class="isVisible[2]"
            />
            <reviewCard
              :info="info"
              id="verwarming"
              property="verwarming"
              class="ma-2"
              :class="isVisible[3]"
            />
            <reviewCard
              :info="info"
              id="zonnepanelen"
              property="zonnepanelen"
              class="ma-2"
              :class="isVisible[4]"
            />
            <reviewCard
              :info="info"
              id="afschrijving"
              property="afschrijving"
              class="ma-2"
              :class="isVisible[5]"
            />
          </v-col>
          <v-icon>mid-cloud-print-outline</v-icon>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import reviewCard from './reviewCard';
import jsPDF from 'jspdf';
import { mixinFunctions } from '../../mixins/mixFunctions';

export default {
  mixins: [mixinFunctions],
  data() {
    return {
      isVisible: [
        '',
        'hideCard',
        'hideCard',
        'hideCard',
        'hideCard',
        'hideCard'
      ]
    };
  },
  methods: {
    PrintInput(e) {
      e.preventDefault();
      //Print input to a pdf file.
      let doc = new jsPDF();
      let nLine = 20;
      let nPos = 10;
      const obj = { ...this.info };
      delete obj.GDResultaatVoorKlant;
      delete obj.GDResultaatVoorGemeenschap;

      try {
        Object.keys(obj).map(val => {
          doc.setFontSize(16);
          doc.text(this.capitalizeFirstLetter(val), nPos, nLine);
          nLine = this.pageCheck(nLine, doc);
          Object.keys(obj[val]).map(val2 => {
            doc.setFontSize(12);

            let outputSubj = val2;
            let outputWaarde = this.waarde(obj[val], val2);
            let outputEenheid = this.eenheid(obj[val], val2);

            doc.text(outputSubj, 10, nLine);
            doc.text(outputWaarde, 100, nLine);
            doc.text(outputEenheid, 180, nLine);

            nLine = this.pageCheck(nLine, doc);
          });
          nLine = this.pageCheck(nLine, doc);
        });
        doc.save('test_jsPDF.pdf');
      } catch (error) {
        console.log(error);
      }
    },
    pageCheck(nLine, doc) {
      if (nLine < 280) return nLine + 10;
      if (nLine >= 280) {
        doc.addPage();
        return 20;
      }
    },
    waarde(obj, property) {
      let retval;
      if (obj[property].hasOwnProperty('waarde')) {
        retval = obj[property].waarde.toString();
      } else {
        retval = obj[property].toString();
      }
      return retval;
    },
    eenheid(obj, property) {
      return obj[property].hasOwnProperty('eenheid')
        ? obj[property].eenheid
        : '';
    },
    show(index, event) {
      if (event) {
        event.preventDefault();
      }
      this.isVisible = [
        'hideCard',
        'hideCard',
        'hideCard',
        'hideCard',
        'hideCard',
        'hideCard'
      ];
      this.isVisible[index] = '';
    }
  },
  computed: {
    info() {
      let obj = { ...this.$store.getters.getInfo };
      delete obj.GDResultaatVoorKlant;
      delete obj.GDResultaatVoorGemeenschap;
      delete obj.GGResultaatVoorKlant;
      delete obj.GGResultaatVoorGemeenschap;
      return obj;
    }
  },
  components: {
    reviewCard
  }
};
</script>

<style>
.review {
  width: 50em;
  height: 40em;
}

.hideCard {
  display: none;
}
</style>
