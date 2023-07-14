import { CalculationResult } from '@/store/modules/info/Calculations/base';

import {
  ReductieC02DoorToenameIsolatie,
  ReductieC02DoorMeerproductieZonnepanelen,
  ReductieCO2DoorVegetatie,
  EMISSIE_AUTORIT
} from './effectenVoorGemeenschap_a_CO2Reductie';

import {
  JaarlijksVolumeNeerslagOpDak,
  //JaarlijksUitgespaardeKostRioolwaterzuivering,
  WATERRETENTIE,
  GEMIDDELDE_KOSTPRIJS_WATERZUIVERING
} from './effectenVoorGemeenschap_b_Waterhuishouding';

import {
  VERWIJDERING_FIJNSTOF,
  VERWIJDERING_NO2,
  VERWIJDERING_SO2,
  VERWIJDERING_Ozon
} from './effectenVoorGemeenschap_c_Luchtvervuiling';

import {
  KOST_GEMEENSCHAP_FIJNSTOF,
  KOST_GEMEENSCHAP_NO2,
  KOST_GEMEENSCHAP_SO2,
  KOST_GEMEENSCHAP_OZON,
  AFNAME_PATIENTEN_DOOR_GROENE_WOONOMGEVING,
  KOSTPRIJS_PER_PATIENT,
  AANTAL_EXTRA_WERKKRACHTEN,
  VERLIES_ECONOMIE_PER_ZIEKE_WERKNEMER
} from './effectenVoorGemeenschap_d_Gezondheidszorg';

class EffectenVoorGemeenschap {
  constructor(
    effectenVoorKlant,
    woning,
    projectInfo,
    verwarming,
    zonnepanelen,
    afschrijving
  ) {
    this._effectenVoorKlant = effectenVoorKlant;
    this._woning = woning;
    this._projectInfo = projectInfo;
    this._verwarming = verwarming;
    this._zonnepanelen = zonnepanelen;
    this._afschrijving = afschrijving;

    //shortcuts
    //this._type = this._projectInfo.groenDakType.substr(0, 9).toLowerCase();

    this._type = this._projectInfo.groeneGevelType.type
      ? this._projectInfo.groeneGevelType.type.toUpperCase()
      : 'NO';

    this._opp = this._projectInfo.groeneGevelOppervlak.waarde;

    this.reductieC02DoorToenameIsolatie = new ReductieC02DoorToenameIsolatie(
      this._verwarming.verwarming,
      this._effectenVoorKlant.besparingDoorIsolatie
    );

    this.reductieC02DoorMeerproductieZonnepanelen = new ReductieC02DoorMeerproductieZonnepanelen(
      this._effectenVoorKlant.jaarlijkseExtraOpbrengstGroen
    );

    this.reductieCO2DoorVegetatie = new ReductieCO2DoorVegetatie(
      this._type,
      this._projectInfo.groeneGevelOppervlak.waarde
    );

    this.jaarlijksVolumeNeerslagOpDak = new JaarlijksVolumeNeerslagOpDak(
      this._projectInfo.groeneGevelOppervlak.waarde
    );

    this.calculateTotaleCO2ReductieDoorGroen();
    this.calculateTotaleCO2ReductieDoorGroenInAutoKm();
    this.calculateJaarlijksAfgevoerdVolumeRegenwaterMetGroen();
    this.calculateJaarlijksUitgespaardeKostRioolwaterzuivering();

    this.calculateJaarlijkseVerwijderingFijnStof();
    this.calculateJaarlijkseVerwijderingNO2();
    this.calculateJaarlijkseVerwijderingSO2();
    this.calculateJaarlijkseVerwijderingOzon();

    this.calculateJaarlijkseBesparingDoorFijnStof();
    this.calculateJaarlijkseBesparingDoorNO2();
    this.calculateJaarlijkseBesparingDoorSO2();
    this.calculateJaarlijkseBesparingDoorOzon();

    this.calculateJaarlijksMinderPatienten(); //per 1000 inwoners
    this.calculateJaarlijksBesparingMinderPatienten();
    this.calculateJaarlijksExtraWerkkrachten(); //per 1000 inwoners
    this.calculateJaarlijksVermedenZiektekost();

    this.EnergieEffecten();
  }

  calculateTotaleCO2ReductieDoorGroen() {
    this.totaleCO2ReductieDoorGroen = new CalculationResult();
    this.totaleCO2ReductieDoorGroen._naam = 'Totale CO2 reductie';
    this.totaleCO2ReductieDoorGroen._decimals = 0;
    this.totaleCO2ReductieDoorGroen._eenheid = 'kg CO2/jaar';
    this.totaleCO2ReductieDoorGroen._min =
      this.reductieC02DoorToenameIsolatie.min +
      this.reductieC02DoorMeerproductieZonnepanelen.min +
      this.reductieCO2DoorVegetatie.min;
    this.totaleCO2ReductieDoorGroen._avg =
      this.reductieC02DoorToenameIsolatie.avg +
      this.reductieC02DoorMeerproductieZonnepanelen.avg +
      this.reductieCO2DoorVegetatie.avg;
    this.totaleCO2ReductieDoorGroen._max =
      this.reductieC02DoorToenameIsolatie.max +
      this.reductieC02DoorMeerproductieZonnepanelen.max +
      this.reductieCO2DoorVegetatie.max;
  }

  calculateTotaleCO2ReductieDoorGroenInAutoKm() {
    this.totaleCO2ReductieDoorGroenInAutoKm = new CalculationResult();
    this.totaleCO2ReductieDoorGroenInAutoKm._naam =
      'Totale auto km uitgespaard per jaar';
    this.totaleCO2ReductieDoorGroenInAutoKm._eenheid = 'km';
    this.totaleCO2ReductieDoorGroenInAutoKm._decimals = 0;
    this.totaleCO2ReductieDoorGroenInAutoKm._min =
      this.totaleCO2ReductieDoorGroen.min / EMISSIE_AUTORIT.min;

    this.totaleCO2ReductieDoorGroenInAutoKm._avg =
      this.totaleCO2ReductieDoorGroen.avg / EMISSIE_AUTORIT.avg;

    this.totaleCO2ReductieDoorGroenInAutoKm._max =
      this.totaleCO2ReductieDoorGroen.max / EMISSIE_AUTORIT.max;
  }

  calculateJaarlijksAfgevoerdVolumeRegenwaterMetGroen() {
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen = new CalculationResult();
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._naam =
      'Jaarlijks afgevoerd volume';
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._eenheid = 'm³';
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._decimals = 2;

    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._min =
      (this.jaarlijksVolumeNeerslagOpDak.min *
        1000 *
        (1 - WATERRETENTIE[this._type].min / 100)) /
      1000;
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._avg =
      (this.jaarlijksVolumeNeerslagOpDak.avg *
        1000 *
        (1 - WATERRETENTIE[this._type].avg / 100)) /
      1000;
    this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._max =
      (this.jaarlijksVolumeNeerslagOpDak.max *
        1000 *
        (1 - WATERRETENTIE[this._type].max / 100)) /
      1000;
  }

  calculateJaarlijksUitgespaardeKostRioolwaterzuivering() {
    this.jaarlijksUitgespaardeKostRioolwaterzuivering = new CalculationResult();
    this.jaarlijksUitgespaardeKostRioolwaterzuivering._naam =
      'Jaarlijks uitgespaarde kost rioolwaterzuivering';
    this.jaarlijksUitgespaardeKostRioolwaterzuivering._eenheid = '€/jaar';
    this.jaarlijksUitgespaardeKostRioolwaterzuivering._decimals = 2;

    this.jaarlijksUitgespaardeKostRioolwaterzuivering._min =
      this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._min *
      GEMIDDELDE_KOSTPRIJS_WATERZUIVERING;
    this.jaarlijksUitgespaardeKostRioolwaterzuivering._avg =
      this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._avg *
      GEMIDDELDE_KOSTPRIJS_WATERZUIVERING;
    this.jaarlijksUitgespaardeKostRioolwaterzuivering._max =
      this.jaarlijksAfgevoerdVolumeRegenwaterMetGroen._max *
      GEMIDDELDE_KOSTPRIJS_WATERZUIVERING;
  }

  calculateJaarlijkseVerwijderingFijnStof() {
    this.jaarlijkseVerwijderingFijnStof = new CalculationResult();
    this.jaarlijkseVerwijderingFijnStof._naam =
      'Jaarlijks verwijdering fijn stof';
    this.jaarlijkseVerwijderingFijnStof._eenheid = 'g/m².jaar';
    this.jaarlijkseVerwijderingFijnStof._decimals = 0;
    this.jaarlijkseVerwijderingFijnStof._min =
      VERWIJDERING_FIJNSTOF[this._type].min * this._opp;
    this.jaarlijkseVerwijderingFijnStof._avg =
      VERWIJDERING_FIJNSTOF[this._type].avg * this._opp;
    this.jaarlijkseVerwijderingFijnStof._max =
      VERWIJDERING_FIJNSTOF[this._type].max * this._opp;
  }
  calculateJaarlijkseVerwijderingNO2() {
    this.jaarlijkseVerwijderingNO2 = new CalculationResult();
    this.jaarlijkseVerwijderingNO2._naam = 'Jaarlijks verwijdering NO2';
    this.jaarlijkseVerwijderingNO2._eenheid = 'g/m².jaar';
    this.jaarlijkseVerwijderingNO2._decimals = 0;
    this.jaarlijkseVerwijderingNO2._min = VERWIJDERING_NO2.min * this._opp;
    this.jaarlijkseVerwijderingNO2._avg = VERWIJDERING_NO2.avg * this._opp;
    this.jaarlijkseVerwijderingNO2._max = VERWIJDERING_NO2.max * this._opp;
  }
  calculateJaarlijkseVerwijderingSO2() {
    this.jaarlijkseVerwijderingSO2 = new CalculationResult();
    this.jaarlijkseVerwijderingSO2._naam = 'Jaarlijks verwijdering SO2';
    this.jaarlijkseVerwijderingSO2._eenheid = 'g/m².jaar';
    this.jaarlijkseVerwijderingSO2._decimals = 0;
    this.jaarlijkseVerwijderingSO2._min = VERWIJDERING_SO2.min * this._opp;
    this.jaarlijkseVerwijderingSO2._avg = VERWIJDERING_SO2.avg * this._opp;
    this.jaarlijkseVerwijderingSO2._max = VERWIJDERING_SO2.max * this._opp;
  }

  calculateJaarlijkseVerwijderingOzon() {
    this.jaarlijkseVerwijderingOzon = new CalculationResult();
    this.jaarlijkseVerwijderingOzon._naam = 'Jaarlijks verwijdering Ozon';
    this.jaarlijkseVerwijderingOzon._eenheid = 'g/m².jaar';
    this.jaarlijkseVerwijderingOzon._decimals = 0;
    this.jaarlijkseVerwijderingOzon._min = VERWIJDERING_Ozon.min * this._opp;
    this.jaarlijkseVerwijderingOzon._avg = VERWIJDERING_Ozon.avg * this._opp;
    this.jaarlijkseVerwijderingOzon._max = VERWIJDERING_Ozon.max * this._opp;
  }

  calculateJaarlijkseBesparingDoorFijnStof() {
    this.jaarlijkseBesparingDoorFijnStof = new CalculationResult();
    this.jaarlijkseBesparingDoorFijnStof._naam =
      'Jaarlijks besparing gemeenschap voor fijn stof';
    this.jaarlijkseBesparingDoorFijnStof._eenheid = '€/g';
    this.jaarlijkseBesparingDoorFijnStof._decimals = 2;
    this.jaarlijkseBesparingDoorFijnStof._min =
      this.jaarlijkseVerwijderingFijnStof.min * KOST_GEMEENSCHAP_FIJNSTOF.min;
    this.jaarlijkseBesparingDoorFijnStof._avg =
      this.jaarlijkseVerwijderingFijnStof.avg * KOST_GEMEENSCHAP_FIJNSTOF.avg;
    this.jaarlijkseBesparingDoorFijnStof._max =
      this.jaarlijkseVerwijderingFijnStof.max * KOST_GEMEENSCHAP_FIJNSTOF.max;
  }

  calculateJaarlijkseBesparingDoorNO2() {
    this.jaarlijkseBesparingDoorNO2 = new CalculationResult();
    this.jaarlijkseBesparingDoorNO2._naam =
      'Jaarlijks besparing gemeenschap voor NO2';
    this.jaarlijkseBesparingDoorNO2._eenheid = '€/g';
    this.jaarlijkseBesparingDoorNO2._decimals = 2;
    this.jaarlijkseBesparingDoorNO2._min =
      this.jaarlijkseVerwijderingNO2.min * KOST_GEMEENSCHAP_NO2.min;
    this.jaarlijkseBesparingDoorNO2._avg =
      this.jaarlijkseVerwijderingNO2.avg * KOST_GEMEENSCHAP_NO2.avg;
    this.jaarlijkseBesparingDoorNO2._max =
      this.jaarlijkseVerwijderingNO2.max * KOST_GEMEENSCHAP_NO2.max;
  }

  calculateJaarlijkseBesparingDoorSO2() {
    this.jaarlijkseBesparingDoorSO2 = new CalculationResult();
    this.jaarlijkseBesparingDoorSO2._naam =
      'Jaarlijks besparing gemeenschap voor SO2';
    this.jaarlijkseBesparingDoorSO2._eenheid = '€/g';
    this.jaarlijkseBesparingDoorSO2._decimals = 2;
    this.jaarlijkseBesparingDoorSO2._min =
      this.jaarlijkseVerwijderingSO2.min * KOST_GEMEENSCHAP_SO2.min;
    this.jaarlijkseBesparingDoorSO2._avg =
      this.jaarlijkseVerwijderingSO2.avg * KOST_GEMEENSCHAP_SO2.avg;
    this.jaarlijkseBesparingDoorSO2._max =
      this.jaarlijkseVerwijderingSO2.max * KOST_GEMEENSCHAP_SO2.max;
  }

  calculateJaarlijkseBesparingDoorOzon() {
    this.jaarlijkseBesparingDoorOzon = new CalculationResult();
    this.jaarlijkseBesparingDoorOzon._naam =
      'Jaarlijks besparing gemeenschap voor Ozon';
    this.jaarlijkseBesparingDoorOzon._eenheid = '€/g';
    this.jaarlijkseBesparingDoorOzon._decimals = 2;
    this.jaarlijkseBesparingDoorOzon._min =
      this.jaarlijkseVerwijderingOzon.min * KOST_GEMEENSCHAP_OZON.min;
    this.jaarlijkseBesparingDoorOzon._avg =
      this.jaarlijkseVerwijderingOzon.avg * KOST_GEMEENSCHAP_OZON.avg;
    this.jaarlijkseBesparingDoorOzon._max =
      this.jaarlijkseVerwijderingOzon.max * KOST_GEMEENSCHAP_OZON.max;
  }

  calculateJaarlijksMinderPatienten() {
    this.jaarlijksMinderPatienten = new CalculationResult();
    this.jaarlijksMinderPatienten._naam =
      'Jaarlijks minder aantal patiënten per 1000 inwoners';
    this.jaarlijksMinderPatienten._eenheid = 'pers';
    this.jaarlijksMinderPatienten._decimals = 4;
    this.jaarlijksMinderPatienten._min =
      AFNAME_PATIENTEN_DOOR_GROENE_WOONOMGEVING.min;
    this.jaarlijksMinderPatienten._avg =
      AFNAME_PATIENTEN_DOOR_GROENE_WOONOMGEVING.avg;
    this.jaarlijksMinderPatienten._max =
      AFNAME_PATIENTEN_DOOR_GROENE_WOONOMGEVING.max;
  }
  calculateJaarlijksBesparingMinderPatienten() {
    this.jaarlijksBesparingMinderPatienten = new CalculationResult();
    this.jaarlijksBesparingMinderPatienten._naam =
      'Jaarlijkse besparing gemeenschap per 1000 inwoners';
    this.jaarlijksBesparingMinderPatienten._eenheid = '€/jaar';
    this.jaarlijksBesparingMinderPatienten._decimals = 2;
    this.jaarlijksBesparingMinderPatienten._min =
      KOSTPRIJS_PER_PATIENT.min * this.jaarlijksMinderPatienten.min;
    this.jaarlijksBesparingMinderPatienten._avg =
      KOSTPRIJS_PER_PATIENT.avg * this.jaarlijksMinderPatienten.avg;
    this.jaarlijksBesparingMinderPatienten._max =
      KOSTPRIJS_PER_PATIENT.max * this.jaarlijksMinderPatienten.max;
  }
  calculateJaarlijksExtraWerkkrachten() {
    this.jaarlijksExtraWerkkrachten = new CalculationResult();
    this.jaarlijksExtraWerkkrachten._naam =
      'Aantal extra werkkrachten per per 1000 inwoners';
    this.jaarlijksExtraWerkkrachten._eenheid = 'pers';
    this.jaarlijksExtraWerkkrachten._decimals = 4;
    this.jaarlijksExtraWerkkrachten._min = AANTAL_EXTRA_WERKKRACHTEN.min;
    this.jaarlijksExtraWerkkrachten._avg = AANTAL_EXTRA_WERKKRACHTEN.avg;
    this.jaarlijksExtraWerkkrachten._max = AANTAL_EXTRA_WERKKRACHTEN.max;
  }
  calculateJaarlijksVermedenZiektekost() {
    this.JaarlijksVermedenZiektekost = new CalculationResult();
    this.JaarlijksVermedenZiektekost._naam =
      'Vermeden ziektekost per 1000 inwoners';
    this.JaarlijksVermedenZiektekost._eenheid = '€';
    this.JaarlijksVermedenZiektekost._decimals = 2;
    this.JaarlijksVermedenZiektekost._min =
      this.jaarlijksExtraWerkkrachten.min *
      VERLIES_ECONOMIE_PER_ZIEKE_WERKNEMER.min;
    this.JaarlijksVermedenZiektekost._avg =
      this.jaarlijksExtraWerkkrachten.avg *
      VERLIES_ECONOMIE_PER_ZIEKE_WERKNEMER.avg;
    this.JaarlijksVermedenZiektekost._max =
      this.jaarlijksExtraWerkkrachten.max *
      VERLIES_ECONOMIE_PER_ZIEKE_WERKNEMER.max;
  }

  EnergieEffecten() {
    this.CO2Reductie = [];
    this.CO2Reductie.push({ groen: 'reductieC02DoorToenameIsolatie' });
    this.CO2Reductie.push({
      groen: 'reductieC02DoorMeerproductieZonnepanelen'
    });
    this.CO2Reductie.push({ groen: 'reductieCO2DoorVegetatie' });
    this.CO2Reductie.push({ groen: 'totaleCO2ReductieDoorGroen' });
    this.CO2Reductie.push({ groen: 'totaleCO2ReductieDoorGroenInAutoKm' });

    this.Waterhuishouding = [];
    this.Waterhuishouding.push({
      groen: 'jaarlijksAfgevoerdVolumeRegenwaterMetGroen'
    });
    this.Waterhuishouding.push({
      groen: 'jaarlijksUitgespaardeKostRioolwaterzuivering'
    });

    this.Luchtvervuiling = [];
    this.Luchtvervuiling.push({ groen: 'jaarlijkseVerwijderingFijnStof' });
    this.Luchtvervuiling.push({ groen: 'jaarlijkseVerwijderingNO2' });
    this.Luchtvervuiling.push({ groen: 'jaarlijkseVerwijderingSO2' });
    this.Luchtvervuiling.push({ groen: 'jaarlijkseVerwijderingOzon' });

    this.Gezondheidszorg = [];
    this.Gezondheidszorg.push({ groen: 'jaarlijkseBesparingDoorFijnStof' });
    this.Gezondheidszorg.push({ groen: 'jaarlijkseBesparingDoorNO2' });
    this.Gezondheidszorg.push({ groen: 'jaarlijkseBesparingDoorSO2' });
    this.Gezondheidszorg.push({ groen: 'jaarlijkseBesparingDoorOzon' });
    this.Gezondheidszorg.push({ groen: 'jaarlijksMinderPatienten' });
    this.Gezondheidszorg.push({ groen: 'jaarlijksBesparingMinderPatienten' });
    this.Gezondheidszorg.push({ groen: 'jaarlijksExtraWerkkrachten' });

    this.Totaal = [];
    this.Totaal.push({ groen: 'JaarlijksVermedenZiektekost' });
  }
}

export { EffectenVoorGemeenschap };
