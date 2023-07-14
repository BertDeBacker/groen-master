const EPC_BOUWJAAR = {
  WONING(jaartal) {
    let epc = 0;
    if (jaartal > 1960 && jaartal <= 1970) epc = 567;
    if (jaartal > 1971 && jaartal <= 1985) epc = 443;
    if (jaartal > 1986 && jaartal <= 1995) epc = 345;
    if (jaartal > 1996 && jaartal <= 2005) epc = 244;
    if (jaartal > 2006 && jaartal <= 2019) epc = 190;

    return epc;
  },

  APPARTEMENT(jaartal) {
    let epc = 0;
    if (jaartal > 1960 && jaartal <= 1970) epc = 372;
    if (jaartal > 1971 && jaartal <= 1985) epc = 286;
    if (jaartal > 1986 && jaartal <= 1995) epc = 252;
    if (jaartal > 1996 && jaartal <= 2005) epc = 199;
    if (jaartal > 2006 && jaartal <= 2019) epc = 160;

    return epc;
  }
};

const ISOLATIEGRAADBOUWJAAR = function(bouwjaar) {
  let isolatieGraad = '';
  if (bouwjaar > 0 && bouwjaar <= 1970) isolatieGraad = 'Geen';
  if (bouwjaar > 1971 && bouwjaar <= 1991) isolatieGraad = 'Gedeeltelijk';
  if (bouwjaar > 1992 && bouwjaar <= 2019) isolatieGraad = 'Goed';
  return isolatieGraad;
};

const ENERGIEBESPARING_GROENDAK = {
  VERWARMING(isolatieGraad) {
    if (isolatieGraad === 'Goed') {
      return { min: 8, avg: 8.5, max: 9, eenheid: '%' };
    } else if (isolatieGraad === 'Gedeeltelijk') {
      return { min: 13, avg: 13, max: 13, eenheid: '%' };
    } else if (isolatieGraad === 'Geen') {
      return { min: 45, avg: 45.5, max: 46, eenheid: '%' };
    }
  },
  KOELING(isolatieGraad) {
    if (isolatieGraad === 'Goed') {
      return { min: 0, avg: 0, max: 0, eenheid: '%' };
    } else if (isolatieGraad === 'Gedeeltelijk') {
      return { min: 0, avg: 11.9, max: 30, eenheid: '%' };
    } else if (isolatieGraad === 'Geen') {
      return { min: 22, avg: 33.5, max: 45, eenheid: '%' };
    }
  }
};

export {
  EPC_BOUWJAAR, //const - geeft EPC op basis van type (WONING of APPARTEMENT) en jaartal
  ISOLATIEGRAADBOUWJAAR, //const - geeft op basis van bouwjaar aan of het gebouw Geen, Gedeeltelijk of Goed geisoleerd is
  ENERGIEBESPARING_GROENDAK //const - geeft op basis van isolatiegraad de besparing aan voor VERWARMING en KOELING
};

// //Totale energiefactuur VERWARMING op basis opgegeven epc(kWh/j)
// class A extends Base {
//   constructor(epc, opp) {
//     super();
//     //input
//     this._epc = epc;
//     this._opp = opp;

//     //eenheid
//     this._decimals = 0;
//     this._eenheid = 'kWh/jaar';
//     this._naam = 'Energiefactuur verwarming - opgegeven EPC';

//     // //resultaat
//     // this._verwarming = 0;

//     //bereken
//     this.calculate();
//   }

//   calculate() {
//     let verwarming = this._epc * this._opp;
//     this._min = verwarming;
//     this._avg = verwarming;
//     this._max = verwarming;
//   }
// }

// //EPC waarde op basis van bouwjaar
// class B extends Base {
//   constructor(bouwjaar, type) {
//     super();
//     this._bouwjaar = bouwjaar;
//     this._decimals = 0;
//     this._type = type;
//     this._eenheid = 'kWh/jaar';
//     this._naam = 'EPC op basis van bouwjaar';

//     this.calculate(bouwjaar, type);
//   }

//   calculate(bouwjaar, type) {
//     //this._epc = this._epcBouwjaar[type](bouwjaar);
//     let temp = type === 'Appartement' ? 'APPARTEMENT' : 'WONING';
//     this._epc = EPC_BOUWJAAR[temp](bouwjaar);
//     this._min = this._epc;
//     this._avg = this._epc;
//     this._max = this._epc;
//   }
// }

// //epc op basis bouwjaar (kWh/m²) voor, type = Eéngezinswoning of Apparement
// //input
// //bouwjaar = jaartal
// //opp = bewoonbare oppervlakte in m²
// //type = woning of appartement
// class BB extends Base {
//   constructor(bouwjaar, opp, type) {
//     super();
//     //input
//     this._bouwjaar = bouwjaar;
//     this._decimals = 0;
//     this._opp = opp;
//     this._type = type;
//     this._decimals = 0;

//     //eenheid
//     this._eenheid = 'kWh/jaar';
//     this._naam = 'Engergiefactuur verwarming op basis opgegeven bouwjaar';

//     //tussen resultaat
//     this._epc = 0;

//     //resultaat
//     this._verwarming = 0;

//     //bereken
//     this.calculate();
//   }

//   calculate() {
//     this._epc = this._epcBouwjaar[this._type](this._bouwjaar);
//     this._verwarming = this._epc * this._opp;
//     this._min = this._verwarming;
//     this._avg = this._verwarming;
//     this._max = this._verwarming;
//   }
//   calculateepc(bouwjaar, type) {
//     this._epc = this._epcBouwjaar[type](bouwjaar);
//   }
// }

// //Besparing VERWARMING/Koeling (%) jaarlijks
// class D extends Base {
//   constructor(isolatieGraad, typeEnergiebesparing) {
//     super();
//     this._type = typeEnergiebesparing;
//     this._decimals = 2;
//     this._isolatieGraad = isolatieGraad;
//     this._naam = 'Energie besparing';
//     this._eenheid = '%';
//     this._min = 0;
//     this._avg = 0;
//     this._max = 0;

//     this._typeEnergieBesparingGroenDak = {
//       verwarming(isolatieGraad) {
//         if (isolatieGraad === 'Goed') {
//           return { min: 8, avg: 8.5, max: 9 };
//         } else if (isolatieGraad === 'Gedeeltelijk') {
//           return { min: 13, avg: 13, max: 13 };
//         } else if (isolatieGraad === 'Geen') {
//           return { min: 45, avg: 45.5, max: 46 };
//         }
//       },
//       koeling(isolatieGraad) {
//         if (isolatieGraad === 'Goed') {
//           return { min: 0, avg: 0, max: 0 };
//         } else if (isolatieGraad === 'Gedeeltelijk') {
//           return { min: 0, avg: 11.9, max: 30 };
//         } else if (isolatieGraad === 'Geen') {
//           return { min: 22, avg: 33.5, max: 45 };
//         }
//       }
//     };
//     this.calculate();
//   }

//   calculate() {
//     let val = this._typeEnergieBesparingGroenDak[this._type](
//       this._isolatieGraad
//     );
//     this._min = val.min;
//     this._avg = val.avg;
//     this._max = val.max;
//   }
// }

// //Jaarlijkse EXTRA productie dankzij groendak (kWh/j)
// class G extends Base {
//   constructor(jaarlijkseProductie = 0, aantalPanelen = 0) {
//     super();
//     this._eenheid = 'kWh/jaar';
//     this._decimals = 0;
//     this._naam = 'Zonnepanelen, extra productie door groendak';
//     this._jaarlijkseProductie = jaarlijkseProductie;
//     this._aantalPanelen = aantalPanelen;

//     this._gemiddeldPiekvermogenPerPaneel = 260;
//     this._gemiddeldRenedementDoorOrientatie = 0.86;
//     this._gemiddeldRendementDoorOuderdom = 0.85;
//     this._meerproductieDoorGroenDak = { min: 2, avg: 6.67, max: 12 };

//     this.calculate();
//   }

//   calculate() {
//     if (
//       this._jaarlijkseProductie.waarde === 0 &&
//       this._aantalPanelen.waarde > 0
//     ) {
//       this._jaarlijkseProductie.waarde =
//         this.aantalPanelen.waarde *
//         this._gemiddeldPiekvermogenPerPaneel *
//         this._gemiddeldRenedementDoorOrientatie *
//         this._gemiddeldRendementDoorOuderdom;
//     }

//     this._min =
//       this._jaarlijkseProductie.waarde *
//       (this._meerproductieDoorGroenDak.min / 100);

//     this._avg =
//       this._jaarlijkseProductie.waarde *
//       (this._meerproductieDoorGroenDak.avg / 100);

//     this._max =
//       this._jaarlijkseProductie.waarde *
//       (this._meerproductieDoorGroenDak.max / 100);
//   }

//   meerproductieDoorGroenDak() {
//     return this._meerproductieDoorGroenDak;
//   }
// }

// //Extra GSC opbrengst
// class H extends Base {
//   constructor(extraProductie, groeneStroomCertificatenPrijs) {
//     super();
//     this._extraProductie = extraProductie;
//     this._decimals = 2;
//     this._groeneStroomCertificatenPrijs = groeneStroomCertificatenPrijs;
//     this._eenheid = '€/jaar';
//     this._naam = 'Zonnepanelen, extra opbrengst groenestroomcertificaten';

//     this.calculate();
//   }

//   calculate() {
//     this._min =
//       (this._extraProductie.min / 1000) *
//       this._groeneStroomCertificatenPrijs.waarde;
//     this._avg =
//       (this._extraProductie.avg / 1000) *
//       this._groeneStroomCertificatenPrijs.waarde;
//     this._max =
//       (this._extraProductie.max / 1000) *
//       this._groeneStroomCertificatenPrijs.waarde;
//   }
// }
