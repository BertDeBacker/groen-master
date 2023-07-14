import { CalculationResult } from '@/store/modules/info/Calculations/base';

import {
  EPC_BOUWJAAR, //const - geeft EPC op basis van type (WONING of APPARTEMENT) en jaartal
  ISOLATIEGRAADBOUWJAAR, //const - geeft op basis van bouwjaar aan of het gebouw Geen, Gedeeltelijk of Goed geisoleerd is
  ENERGIEBESPARING_GROENDAK //const - geeft op basis van isolatiegraad de besparing aan voor VERWARMING en KOELING
} from './effectenVoorDeKlant_a_Energie';

import {
  GEMIDDELD_PIEKVERMOGEN_PER_PANEEL, //const - gemiddeld piekvermogen per paneel
  GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE, //const - gemiddeld rendement door orientatie
  GEMIDDELD_RENDEMENT_DOOR_OUDERDOM, //const - gemiddeld rendement door ouderdom
  MEERPRODUCTIE_DOOR_GROEN, //const - gemiddelde meerproductie door groen dak
  VERSCHIL_IN_PIEKTEMPERATUUR, // const - gemiddeld verschil in piektemperatuur
  EXTRA_AKOESTISCHE_ISOLATIE // const - gemiddeld extra akoestische isolatie
} from './effectenVoorDeKlant_b_Woning';

import {
  DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT, //const - eenheidsprijs EL
  DEFAULT_EENHEIDSPRIJS_AARDGAS, //const - eenheidsprijs GAS
  DEFAULT_EENHEIDSPRIJS_STOOKOLIE, //const - eenheidsprijs OLIE
  INVESTERINGS_KOST_DAK,
  ONDERHOUDS_KOST_DAK
} from './effectenVoorDeKlant_c_Investering_onderhoud';

//class EnergieInfo {
class EffectenVoorDeKlant {
  constructor(woning, projectInfo, verwarming, zonnepanelen, afschrijving) {
    this._woning = woning;
    this._projectInfo = projectInfo;
    this._verwarming = verwarming;
    this._zonnepanelen = zonnepanelen;
    this._afschrijving = afschrijving;

    this._type = this._projectInfo.groenDakInfo
      ? this._projectInfo.groenDakType.type.toUpperCase()
      : 'NO';

    this.verwarmingEPC = this.cal_verwarmingEPC();
    this.verwarmingBouwjaarWoning = this.cal_verwarmingEPCWoning_obvBouwjaar();
    this.verwarmingBouwjaarAppartement = this.cal_verwarmingEPCAppartement_obvBouwjaar();
    this.isolatiegraadDak = this.cal_isolatiegraadDak();
    this.energieBesparingVerwarming = this.cal_energieBesparingVerwarming();
    this.energieBesparingKoeling = this.cal_energieBesparingKoeling();
    this.eenheidsprijselektriciteit = this.cal_eenheidsprijselektriciteit();
    this.eenheidsprijsGas = this.cal_eenheidsprijsGas();
    this.eenheidsprijsStookolie = this.cal_eenheidsprijsStookolie();
    this.jaarlijkseExtraProductieDoorGroen = this.cal_jaarlijkseExtraProductieDoorGroen();
    this.extraGSCOpbrengst = this.cal_extraGSCOpbrengst();
    this.meerwaardeHuis = this.cal_meerwaardeHuis();
    this.extraAkoestischeIsolatie = this.cal_extraAkoestischeIsolatie(
      this._type
    );
    this.verschilInPiekTemperatuur = this.cal_verschilInPiekTemperatuur(
      this._type
    );

    //GROEN DAK
    this.investeringskostGroen = this.cal_investeringskostdak(this._type);

    this.levensduurGroen = new CalculationResult(
      'Levensduur',
      '',
      0,
      60,
      60,
      60,
      'jaar'
    );

    this.onderhoudsKostGroen = this.cal_onderhoudskostdak(this._type);

    //KLASSIEK DAK
    this.investeringskostKlassiek = this.cal_investeringskostdak('KLASSIEK');

    this.levensduurKlassiek = new CalculationResult(
      'Levensduur',
      '',
      0,
      20,
      20,
      20,
      'jaar'
    );

    this.onderhoudsKostKlassiek = this.cal_onderhoudskostdak('KLASSIEK');

    this.kostPerLevensjaarGroen = this.cal_kostPerLevensjaarGroen();
    this.kostPerLevensjaarKlassiek = this.cal_kostPerLevensjaarKlassiek();

    this.jaarlijkseMeerkostGroen = this.cal_jaarlijkseMeerkostGroen();

    this.besparingDoorIsolatie = this.cal_totaleBesparingDoorIsolatie();
    this.energiefactuurMetGroen = this.cal_energiefactuurMetGroen();
    this.besparingDoorIsolatieelektrisch = this.cal_totaleBesparingDoorIsolatieelektrisch();
    this.besparingDoorIsolatieGas = this.cal_totaleBesparingDoorIsolatieGas();
    this.besparingDoorIsolatieStookolie = this.cal_totaleBesparingDoorIsolatieStookolie();
    this.JaarlijksExtraUitgespaardeKost = this.cal_jaarlijksExtraUitgespaardeKost();
    this.jaarlijkseExtraOpbrengstGroen = this.cal_jaarlijkseExtraOpbrengstDoorGroen();
    this.indirecteWaardeAkoesischeIsolatie = this.cal_indirecteWaardeAkoesischeIsolatie();

    this.afschrijvingskostGroenPerJaar = this.cal_afschrijvingskostGroenPerJaar();
    this.totaleKostGroen = this.cal_totaleKostGroen();

    this.afschrijvingskostKlassiekPerJaar = this.cal_afschrijvingskostKlassiekPerJaar();
    this.totaleKostKlassiek = this.cal_totaleKostKlassiek();

    this.totaleDirecteOpbrengstenKlant = this.cal_totaleDirecteOpbrengstenKlant();
    this.totaleIndirecteOpbrengstenKlant = this.cal_totaleIndirecteOpbrengstenKlant();
    this.meerkostenKlantDoorGroen = this.cal_meerkostenKlantDoorGroen();
    this.eindbalansKlantDoorGroen = this.cal_eindbalansKlantDoorGroen();

    this.EnergieEffecten();
  }

  cal_verwarmingEPC() {
    let obj = new CalculationResult();
    obj._naam = 'Energiefactuur verwarming - opgegeven EPC';
    obj._eenheid = 'kWh/jaar';

    let epc = this._woning.EPCLabel_Waarde.waarde;
    let opp = this._woning.bewoonbareOppervlakte.waarde;
    let verwarming = epc * opp;

    obj._min = verwarming;
    obj._avg = verwarming;
    obj._max = verwarming;

    return obj;
  }

  cal_verwarmingEPCWoning_obvBouwjaar() {
    let obj = new CalculationResult();
    obj._decimals = 0;
    obj._type = 'Eéngezinswoning';
    obj._eenheid = 'kWh/jaar';
    obj._naam = 'EPC op basis van bouwjaar';

    let bouwjaar = this._woning.bouwjaar.waarde;
    let epc = EPC_BOUWJAAR.WONING(bouwjaar);

    obj._min = epc;
    obj._avg = epc;
    obj._max = epc;

    return obj;
  }

  cal_verwarmingEPCAppartement_obvBouwjaar() {
    let obj = new CalculationResult();
    obj._decimals = 0;
    obj._type = 'Appartment';
    obj._eenheid = 'kWh/jaar';
    obj._naam = 'EPC op basis van bouwjaar';

    let bouwjaar = this._woning.bouwjaar.waarde;
    let epc = EPC_BOUWJAAR.APPARTEMENT(bouwjaar);

    obj._min = epc;
    obj._avg = epc;
    obj._max = epc;

    return obj;
  }

  //Isolatiegraad dak = geen, gedeeltelijk, volledig, IDK (weet niet)
  cal_isolatiegraadDak() {
    let obj = new CalculationResult();
    obj._eenheid = '';
    obj._naam = 'Isolatiegraad dak';

    let isolatieGraad = this._woning.isolatieDak;
    let resVal = '';

    if (isolatieGraad === 'Ik weet het niet') {
      resVal = ISOLATIEGRAADBOUWJAAR(this._woning.bouwjaar.waarde);
    } else {
      if (isolatieGraad === 'Geen isolatie') {
        resVal = 'Geen';
      }
      if (isolatieGraad === 'Gedeeltelijk geïsoleerd') {
        resVal = 'Gedeeltelijk';
      }
      if (isolatieGraad === 'Volledig geïsoleerd') {
        resVal = 'Goed';
      }
    }

    obj._min = resVal;
    obj._avg = resVal;
    obj._max = resVal;

    return obj;
  }

  cal_energieBesparingVerwarming() {
    let obj = new CalculationResult();

    obj._type = 'Verwarming';
    obj._decimals = 2;
    obj._naam = 'Energie besparing';
    obj._eenheid = '%';

    if (this._projectInfo.groenDakInfo) {
      let val = ENERGIEBESPARING_GROENDAK.VERWARMING(this.isolatiegraadDak.min); //min = avg = max

      obj._min = val.min;
      obj._avg = val.avg;
      obj._max = val.max;
    }

    return obj;
  }

  cal_energieBesparingKoeling() {
    let obj = new CalculationResult();

    obj._type = 'Koeling';
    obj._decimals = 2;
    obj._naam = 'Energie besparing';
    obj._eenheid = '%';

    let val = ENERGIEBESPARING_GROENDAK.KOELING(this.isolatiegraadDak.min); //min = avg = max

    obj._min = val.min;
    obj._avg = val.avg;
    obj._max = val.max;

    return obj;
  }

  cal_eenheidsprijselektriciteit() {
    //Elektriciteit prijs
    let prijs = DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT;

    if (this._verwarming.verwarming === 'Elektriciteit') {
      if (
        this._verwarming.elektriciteitPrijs.waarde &&
        this._verwarming.elektriciteitVerbruik.waarde > 0
      ) {
        prijs =
          this._verwarming.elektriciteitPrijs.waarde /
          this._verwarming.elektriciteitVerbruik.waarde;
      }
    }

    let obj = new CalculationResult(
      'Eenheidsprijs',
      'Elektriciteit',
      5,
      prijs,
      prijs,
      prijs,
      '€/kWh'
    );

    return obj;
  }

  cal_eenheidsprijsGas() {
    //aardgas prijs
    let prijs = DEFAULT_EENHEIDSPRIJS_AARDGAS;

    if (this._verwarming.verwarming === 'Aardgas') {
      if (
        this._verwarming.aardgasPrijs.waarde &&
        this._verwarming.aardgasVerbruik.waarde > 0
      ) {
        prijs =
          this._verwarming.aardgasPrijs.waarde /
          this._verwarming.aardgasVerbruik.waarde;
      }
    }

    let obj = new CalculationResult(
      'Eenheidsprijs',
      'Aardgas',
      5,
      prijs,
      prijs,
      prijs,
      '€/kWh'
    );
    return obj;
  }

  cal_eenheidsprijsStookolie() {
    //stookolie prijs
    let prijs = DEFAULT_EENHEIDSPRIJS_STOOKOLIE;

    if (this._verwarming.verwarming === 'Stookolie') {
      if (
        this._verwarming.stookoliePrijs.waarde &&
        this._verwarming.stookolieVerbruik.waarde > 0
      ) {
        prijs =
          this._verwarming.stookoliePrijs.waarde /
          (this._verwarming.stookolieVerbruik.waarde * 10.641); //Energetische waarde van Stookolie = 10.641 kwH per liter
      }
    }

    let obj = new CalculationResult(
      'Eenheidsprijs',
      'Stookolie',
      5,
      prijs,
      prijs,
      prijs,
      '€/l'
    );

    return obj;
  }

  cal_jaarlijkseExtraProductieDoorGroen() {
    let obj = new CalculationResult();
    obj._eenheid = 'kWh/jaar';
    obj._decimals = 0;
    obj._naam = 'Zonnepanelen, extra productie';

    if (this._projectInfo.groenDakInfo) {
      let jaarlijkseProductie = this._zonnepanelen.jaarlijkseProductieWeetNiet
        ? 0
        : this._zonnepanelen.jaarlijkseProductie.waarde;

      const aantalPanelen = this._zonnepanelen.aantal.waarde;

      if (jaarlijkseProductie === 0 && aantalPanelen > 0) {
        jaarlijkseProductie =
          aantalPanelen *
          GEMIDDELD_PIEKVERMOGEN_PER_PANEEL *
          GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE *
          GEMIDDELD_RENDEMENT_DOOR_OUDERDOM;
      }

      obj._min = jaarlijkseProductie * (MEERPRODUCTIE_DOOR_GROEN.min / 100);
      obj._avg = jaarlijkseProductie * (MEERPRODUCTIE_DOOR_GROEN.avg / 100);
      obj._max = jaarlijkseProductie * (MEERPRODUCTIE_DOOR_GROEN.max / 100);
    }

    return obj;
  }

  cal_extraGSCOpbrengst() {
    let obj = new CalculationResult();
    obj._decimals = 2;
    obj._eenheid = '€/jaar';
    obj._naam = 'Zonnepanelen, extra opbrengst groenestroomcertificaten';

    let extraProductie = this.jaarlijkseExtraProductieDoorGroen;
    let groeneStroomCertificatenPrijs = this._zonnepanelen
      .groenestroomcertificatenPrijs;

    obj._min =
      (extraProductie.min / 1000) * groeneStroomCertificatenPrijs.waarde;
    obj._avg =
      (extraProductie.avg / 1000) * groeneStroomCertificatenPrijs.waarde;
    obj._max =
      (extraProductie.max / 1000) * groeneStroomCertificatenPrijs.waarde;

    return obj;
  }

  cal_meerwaardeHuis() {
    let obj;
    if (this._projectInfo.groenDakInfo)
      obj = new CalculationResult('Meerwaarde huis', '', 2, 6, 7, 8, '%');

    if (!this._projectInfo.groenDakInfo)
      obj = new CalculationResult('Meerwaarde huis', '', 2, 0, 0, 0, '%');
    return obj;
  }

  cal_extraAkoestischeIsolatie(type) {
    let obj;

    let val = EXTRA_AKOESTISCHE_ISOLATIE[type];
    obj = new CalculationResult(
      'Extra akoestische isolatie',
      '',
      2,
      val.min,
      val.avg,
      val.max,
      'db'
    );
    return obj;
  }

  cal_verschilInPiekTemperatuur(type) {
    let obj = new CalculationResult();
    obj._eenheid = '°C';
    obj._decimals = 2;
    obj._naam = 'Verschil in piek temperatuur';
    obj._type = type;

    obj._min = VERSCHIL_IN_PIEKTEMPERATUUR[type].min;
    obj._avg = VERSCHIL_IN_PIEKTEMPERATUUR[type].avg;
    obj._max = VERSCHIL_IN_PIEKTEMPERATUUR[type].max;

    return obj;
  }

  cal_investeringskostdak(type) {
    let obj = new CalculationResult();
    obj._decimals = 2;
    obj._eenheid = '€/m²';
    obj._naam = 'Investeringskost';

    obj._type = type;

    let opp = this._projectInfo.groenDakInfo
      ? this._projectInfo.groenDakOppervlak.waarde
      : 0;

    obj._min = INVESTERINGS_KOST_DAK[type].min * opp;
    obj._avg = INVESTERINGS_KOST_DAK[type].avg * opp;
    obj._max = INVESTERINGS_KOST_DAK[type].max * opp;

    return obj;
  }

  cal_kostPerLevensjaarGroen() {
    let obj = new CalculationResult();
    obj._decimals = 2;
    obj._eenheid = '€';
    obj._naam = 'Kost per Levensjaar';

    obj._min =
      this.investeringskostGroen.min / this.levensduurGroen.min +
      this.onderhoudsKostGroen.min;
    obj._avg =
      this.investeringskostGroen.avg / this.levensduurGroen.avg +
      this.onderhoudsKostGroen.avg;
    obj._max =
      this.investeringskostGroen.max / this.levensduurGroen.max +
      this.onderhoudsKostGroen.max;

    return obj;
  }

  cal_kostPerLevensjaarKlassiek() {
    let obj = new CalculationResult();
    obj._decimals = 2;
    obj._eenheid = '€';
    obj._naam = 'Kost per Levensjaar';

    obj._min =
      this.investeringskostKlassiek.min / this.levensduurKlassiek.min +
      this.onderhoudsKostKlassiek.min;
    obj._avg =
      this.investeringskostKlassiek.avg / this.levensduurKlassiek.avg +
      this.onderhoudsKostKlassiek.avg;
    obj._max =
      this.investeringskostKlassiek.max / this.levensduurKlassiek.max +
      this.onderhoudsKostKlassiek.max;

    return obj;
  }

  cal_jaarlijkseMeerkostGroen() {
    let obj = new CalculationResult();
    obj._decimals = 2;
    obj._eenheid = '€';
    obj._naam = 'Jaarlijkse meerkost groen';

    obj._min =
      this.kostPerLevensjaarGroen.min - this.kostPerLevensjaarKlassiek.min;
    obj._avg =
      this.kostPerLevensjaarGroen.avg - this.kostPerLevensjaarKlassiek.avg;
    obj._max =
      this.kostPerLevensjaarGroen.max - this.kostPerLevensjaarKlassiek.max;
    return obj;
  }

  cal_onderhoudskostdak(type) {
    let obj = new CalculationResult();

    obj._decimals = 2;
    obj._eenheid = '€/m²/jaar';
    obj._naam = 'Onderhoudskost';
    obj._type = type;
    let opp = this._projectInfo.groenDakInfo
      ? this._projectInfo.groenDakOppervlak.waarde
      : 0;

    obj._min = ONDERHOUDS_KOST_DAK[type].min * opp;
    obj._avg = ONDERHOUDS_KOST_DAK[type].avg * opp;
    obj._max = ONDERHOUDS_KOST_DAK[type].max * opp;

    return obj;
  }

  cal_totaleBesparingDoorIsolatie() {
    //Totale besparing door isolatie
    let obj = new CalculationResult();

    obj._naam = 'Besparing door isolatie';
    obj._eenheid = 'kWh/jaar';
    obj._decimals = 0;
    obj._min =
      (this.energieBesparingVerwarming.min / 100) *
        this.verwarmingEPC.min *
        (this._projectInfo.groenDakPercentage.waarde / 100) +
      (this.energieBesparingKoeling.min / 100) *
        this.verwarmingEPC.min *
        (this._projectInfo.groenDakPercentage.waarde / 100);
    obj._avg =
      (this.energieBesparingVerwarming.avg / 100) *
        this.verwarmingEPC.avg *
        (this._projectInfo.groenDakPercentage.waarde / 100) +
      (this.energieBesparingKoeling.avg / 100) *
        this.verwarmingEPC.avg *
        (this._projectInfo.groenDakPercentage.waarde / 100);
    obj._max =
      (this.energieBesparingVerwarming.max / 100) *
        this.verwarmingEPC.max *
        (this._projectInfo.groenDakPercentage.waarde / 100) +
      (this.energieBesparingKoeling.max / 100) *
        this.verwarmingEPC.max *
        (this._projectInfo.groenDakPercentage.waarde / 100);

    return obj;
  }

  cal_energiefactuurMetGroen() {
    let obj = new CalculationResult();

    obj._naam = 'Energiefactuur';
    obj._eenheid = 'kWh/jaar';
    obj._decimals = 0;
    obj._min = this.verwarmingEPC.min - this.besparingDoorIsolatie.min;
    obj._avg = this.verwarmingEPC.avg - this.besparingDoorIsolatie.avg;
    obj._max = this.verwarmingEPC.max - this.besparingDoorIsolatie.max;

    return obj;
  }

  cal_totaleBesparingDoorIsolatieelektrisch() {
    //Totale besparing door isolatie - elektrisch
    let obj = new CalculationResult();

    obj._naam = 'Besparing door isolatie';
    obj._type = 'Elektrisch';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;

    if (this._verwarming.verwarming === 'Elektriciteit') {
      obj._min =
        this.besparingDoorIsolatie.min * this.eenheidsprijselektriciteit.min;
      obj._avg =
        this.besparingDoorIsolatie.avg * this.eenheidsprijselektriciteit.avg;
      obj._max =
        this.besparingDoorIsolatie.max * this.eenheidsprijselektriciteit.max;
    }

    return obj;
  }

  cal_totaleBesparingDoorIsolatieGas() {
    //Totale besparing door isolatie - Gas
    let obj = new CalculationResult();

    obj._naam = 'Besparing door isolatie';
    obj._type = 'Aardgas';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;

    if (this._verwarming.verwarming === 'Aardgas') {
      obj._min = this.besparingDoorIsolatie.min * this.eenheidsprijsGas.min;
      obj._avg = this.besparingDoorIsolatie.avg * this.eenheidsprijsGas.avg;
      obj._max = this.besparingDoorIsolatie.max * this.eenheidsprijsGas.max;
    }

    return obj;
  }

  cal_totaleBesparingDoorIsolatieStookolie() {
    //Totale besparing door isolatie - Stookolie
    let obj = new CalculationResult();

    obj._naam = 'Besparing door isolatie';
    obj._type = 'Stookolie';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    if (this._verwarming.verwarming === 'Stookolie') {
      obj._min =
        this.besparingDoorIsolatie.min * this.eenheidsprijsStookolie.min;
      obj._avg =
        this.besparingDoorIsolatie.avg * this.eenheidsprijsStookolie.avg;
      obj._max =
        this.besparingDoorIsolatie.max * this.eenheidsprijsStookolie.max;
    }

    return obj;
  }

  cal_jaarlijksExtraUitgespaardeKost() {
    let obj = new CalculationResult();

    obj._naam = 'Zonnepanelen, uitgespaarde kost door extra productie';

    obj._eenheid = '€/jaar';
    obj._decimals = 2;

    obj._min =
      this.jaarlijkseExtraProductieDoorGroen.min *
      this.eenheidsprijselektriciteit.min;

    obj._avg =
      this.jaarlijkseExtraProductieDoorGroen.avg *
      this.eenheidsprijselektriciteit.avg;

    obj._max =
      this.jaarlijkseExtraProductieDoorGroen.max *
      this.eenheidsprijselektriciteit.max;

    return obj;
  }

  cal_jaarlijkseExtraOpbrengstDoorGroen() {
    let obj = new CalculationResult();

    obj._naam = 'Totaal netto extra opbrengst door groen';

    obj._eenheid = '€/jaar';
    obj._decimals = 2;

    obj._min =
      this.JaarlijksExtraUitgespaardeKost.min + this.extraGSCOpbrengst.min;

    obj._avg =
      this.JaarlijksExtraUitgespaardeKost.avg + this.extraGSCOpbrengst.avg;
    obj._max =
      this.JaarlijksExtraUitgespaardeKost.max + this.extraGSCOpbrengst.max;

    return obj;
  }

  cal_indirecteWaardeAkoesischeIsolatie() {
    const WTPPerDb = { min: 2, avg: 5, max: 9 };

    let obj = new CalculationResult();

    obj._naam = 'Indirecte waarde akoestische isolatie';

    obj._eenheid = '€/huis/Jaar';
    obj._decimals = 2;

    obj._min = this.extraAkoestischeIsolatie.min * WTPPerDb.min;

    obj._avg = this.extraAkoestischeIsolatie.avg * WTPPerDb.avg;

    obj._max = this.extraAkoestischeIsolatie.max * WTPPerDb.max;

    return obj;
  }
  cal_afschrijvingskostGroenPerJaar() {
    let obj = new CalculationResult();
    obj._naam = 'Afschrijvingskost investering';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min = this.investeringskostGroen.min / this._afschrijving.jaar.waarde;
    obj._avg = this.investeringskostGroen.avg / this._afschrijving.jaar.waarde;
    obj._max = this.investeringskostGroen.max / this._afschrijving.jaar.waarde;

    return obj;
  }

  cal_totaleKostGroen() {
    let obj = new CalculationResult();
    obj._naam = 'Totale jaarlijkse kost';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min =
      this.afschrijvingskostGroenPerJaar.min + this.onderhoudsKostGroen.min;
    obj._avg =
      this.afschrijvingskostGroenPerJaar.avg + this.onderhoudsKostGroen.avg;
    obj._max =
      this.afschrijvingskostGroenPerJaar.max + this.onderhoudsKostGroen.max;

    return obj;
  }

  cal_afschrijvingskostKlassiekPerJaar() {
    let obj = new CalculationResult();

    obj._naam = 'Afschrijvingskost investering';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min =
      this.investeringskostKlassiek.min / this._afschrijving.jaar.waarde;
    obj._avg =
      this.investeringskostKlassiek.avg / this._afschrijving.jaar.waarde;
    obj._max =
      this.investeringskostKlassiek.max / this._afschrijving.jaar.waarde;

    return obj;
  }

  cal_totaleKostKlassiek() {
    let obj = new CalculationResult();
    obj._naam = 'Jaarlijkse totale kost groen';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min =
      this.afschrijvingskostKlassiekPerJaar.min +
      this.onderhoudsKostKlassiek.min;
    obj._avg =
      this.afschrijvingskostKlassiekPerJaar.avg +
      this.onderhoudsKostKlassiek.avg;
    obj._max =
      this.afschrijvingskostKlassiekPerJaar.max +
      this.onderhoudsKostKlassiek.max;

    return obj;
  }

  cal_totaleDirecteOpbrengstenKlant() {
    let obj = new CalculationResult();
    obj._naam = 'Jaarlijkse directe opbrengsten';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min =
      this.besparingDoorIsolatieelektrisch.min +
      this.besparingDoorIsolatieGas.min +
      this.besparingDoorIsolatieStookolie.min +
      this.jaarlijkseExtraOpbrengstGroen.min;
    obj._avg =
      this.besparingDoorIsolatieelektrisch.avg +
      this.besparingDoorIsolatieGas.avg +
      this.besparingDoorIsolatieStookolie.avg +
      this.jaarlijkseExtraOpbrengstGroen.avg;
    obj._max =
      this.besparingDoorIsolatieelektrisch.max +
      this.besparingDoorIsolatieGas.max +
      this.besparingDoorIsolatieStookolie.max +
      this.jaarlijkseExtraOpbrengstGroen.max;

    return obj;
  }

  cal_totaleIndirecteOpbrengstenKlant() {
    let obj = new CalculationResult();
    obj._naam = 'SOM TOTALE INDIRECTE OPBRENGSTEN KLANT';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min = this.indirecteWaardeAkoesischeIsolatie.min;
    obj._avg = this.indirecteWaardeAkoesischeIsolatie.avg;
    obj._max = this.indirecteWaardeAkoesischeIsolatie.max;

    return obj;
  }

  cal_meerkostenKlantDoorGroen() {
    let obj = new CalculationResult();
    obj._naam = 'Meerkost voor groen';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min = this.totaleKostGroen.min - this.totaleKostKlassiek.min;
    obj._avg = this.totaleKostGroen.avg - this.totaleKostKlassiek.avg;
    obj._max = this.totaleKostGroen.max - this.totaleKostKlassiek.max;

    return obj;
  }

  cal_eindbalansKlantDoorGroen() {
    let obj = new CalculationResult();

    obj._naam = 'Eindbalans (besparingen (+ extra opbrengsten) - extra kosten)';
    obj._eenheid = '€/jaar';
    obj._decimals = 2;
    obj._min =
      this.totaleDirecteOpbrengstenKlant.min - this.jaarlijkseMeerkostGroen.min;

    obj._avg =
      this.totaleDirecteOpbrengstenKlant.avg - this.jaarlijkseMeerkostGroen.avg;
    obj._max =
      this.totaleDirecteOpbrengstenKlant.max - this.jaarlijkseMeerkostGroen.max;

    return obj;
  }

  EnergieEffecten() {
    this.Energie = [];
    this.Energie.push({
      klassiek: 'verwarmingEPC',
      groen: 'energiefactuurMetGroen'
    });
    this.Energie.push({ groen: 'besparingDoorIsolatie' });
    this.Energie.push({ groen: 'jaarlijkseExtraProductieDoorGroen' });
    this.Energie.push({ groen: 'extraGSCOpbrengst' });
    this.Energie.push({ groen: 'JaarlijksExtraUitgespaardeKost' });
    this.Energie.push({ groen: 'besparingDoorIsolatieelektrisch' });
    this.Energie.push({ groen: 'besparingDoorIsolatieGas' });
    this.Energie.push({ groen: 'besparingDoorIsolatieStookolie' });
    this.Energie.push({
      groen: 'totaleDirecteOpbrengstenKlant',
      summary: true
    });

    this.Woning = [];
    this.Woning.push({ groen: 'meerwaardeHuis' });
    this.Woning.push({ groen: 'extraAkoestischeIsolatie' });
    this.Woning.push({ groen: 'indirecteWaardeAkoesischeIsolatie' });
    this.Woning.push({ groen: 'verschilInPiekTemperatuur' });

    this.Kosten = [];
    this.Kosten.push({
      klassiek: 'investeringskostKlassiek',
      groen: 'investeringskostGroen'
    });
    this.Kosten.push({
      klassiek: 'afschrijvingskostKlassiekPerJaar',
      groen: 'afschrijvingskostGroenPerJaar'
    });
    this.Kosten.push({
      klassiek: 'onderhoudsKostKlassiek',
      groen: 'onderhoudsKostGroen'
    });
    this.Kosten.push({
      klassiek: 'totaleKostKlassiek',
      groen: 'totaleKostGroen'
    });

    this.Kosten.push({ klassiek: '', groen: 'meerkostenKlantDoorGroen' });
    this.Kosten.push({
      klassiek: 'levensduurKlassiek',
      groen: 'levensduurGroen'
    });

    this.Kosten.push({
      klassiek: 'kostPerLevensjaarKlassiek',
      groen: 'kostPerLevensjaarGroen',
      summary: true
    });

    this.Kosten.push({
      klassiek: '',
      groen: 'jaarlijkseMeerkostGroen',
      summary: true
    });

    this.Eindbalans = [];
    this.Eindbalans.push({
      klassiek: '',
      groen: 'totaleDirecteOpbrengstenKlant'
    });
    this.Eindbalans.push({
      klassiek: '',
      groen: 'jaarlijkseMeerkostGroen'
    });
    this.Eindbalans.push({
      klassiek: '',
      groen: 'eindbalansKlantDoorGroen',
      summary: true
    });
  }

  //WoningEffecten() {}
}

export { EffectenVoorDeKlant };
