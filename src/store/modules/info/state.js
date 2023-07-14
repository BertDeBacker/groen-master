import {
  UserInput,
  Algemeen,
  projectInfo,
  Woning,
  Verwarming,
  Zonnepanelen,
  Afschrijving
} from './input/userInput';

const getDefaultState = () => {
  return {
    info: new UserInput(),
    GDResultaatVoorKlant: undefined,
    GDResultaatVoorGemeenschap: undefined,
    GGResultaatVoorKlant: undefined,
    GGResultaatVoorGemeenschap: undefined
  };
};

const getDefaultStatePreLoaded = () => {
  let info = new UserInput();

  //Algemeen
  info.algemeen.wie = 'particulier';
  info.algemeen.isAkkoord = true;

  //InfoVoor
  info.projectInfo.groenDakInfo = true;
  info.projectInfo.groenDakOppervlak.waarde = 100;
  info.projectInfo.groenDakTotaalOppervlak.waarde = 200;
  info.projectInfo.groenDakPercentage.waarde = 0;
  info.projectInfo.groenDakType = {
    id: 1,
    waarde: 'Extensief groendak met sedumplanten (d = 8cm)',
    type: 'extensief'
  };
  info.projectInfo.groeneGevelInfo = true;
  info.projectInfo.groeneGevelOppervlak.waarde = 30;
  info.projectInfo.groeneGevelType = {
    id: 2,
    waarde: 'Living wall met planten naar keuze',
    type: 'LIVINGWALL'
  };

  //Woning
  info.woning.type = 'Eéngezinswoning';
  info.woning.bouwjaar.waarde = 2003;
  info.woning.bewoonbareOppervlakte.waarde = 200;
  info.woning.isolatieDak = 'Volledig geïsoleerd';
  info.woning.EPCLabel = 'ja';
  info.woning.EPCLabel_Waarde.waarde = 244;

  //Verwarming
  info.verwarming.verwarming = 'Aardgas';

  info.verwarming.elektriciteitVerbruik.waarde = '';
  info.verwarming.elektriciteitVerbruikWeetNiet = false;
  info.verwarming.elektriciteitPrijs.waarde = '';
  info.verwarming.elektriciteitPrijsWeetNiet = false;

  info.verwarming.aardgasVerbruik.waarde = '5000';
  info.verwarming.aardgasVerbruikWeetNiet = false;
  info.verwarming.aardgasPrijs.waarde = '336';
  info.verwarming.aardgasPrijsWeetNiet = false;

  info.verwarming.stookolieVerbruik.waarde = '';
  info.verwarming.stookolieVerbruikWeetNiet = false;
  info.verwarming.stookoliePrijs.waarde = '';
  info.verwarming.stookoliePrijsWeetNiet = false;

  //Zonnepanelen
  info.zonnepanelen.zonnepanelen = 'ja';
  info.zonnepanelen.aantal.waarde = 32;
  info.zonnepanelen.orientatie.waarde = 'West';
  info.zonnepanelen.gezamelijkVermogen.waarde = 5500;
  info.zonnepanelen.gezamelijkVermogenWeetNiet = false;
  info.zonnepanelen.jaarlijkseProductie.waarde = 5000;
  info.zonnepanelen.jaarlijkseProductieWeetNiet = false;
  info.zonnepanelen.groenestroomcertificaten = 'ja';
  info.zonnepanelen.groenestroomcertificatenPrijs.waarde = 300;

  //Afschrijving
  info.afschrijving.jaar.waarde = 10;
  info.afschrijving.jaarOverig.waarde = 0;

  //Return
  return {
    info,
    GDResultaatVoorKlant: undefined,
    GDResultaatVoorGemeenschap: undefined,
    GGResultaatVoorKlant: undefined,
    GGResultaatVoorGemeenschap: undefined
  };
};

//For testing purposes I have added the Preloaded state
//export default getDefaultState();

export default getDefaultStatePreLoaded();
