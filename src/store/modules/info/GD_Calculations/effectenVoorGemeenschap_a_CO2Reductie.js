import { Base } from '@/store/modules/info/Calculations/base';

const CO2REDUCTIE = {
  ELEKTRICITEIT: { min: 0.285, avg: 0.5225, max: 0.76, eenheid: 'kg CO2' },
  AARDGAS: { min: 0.1834, avg: 0.1834, max: 0.1834, eenheid: 'kg CO2' },
  STOOKOLIE: { min: 2.6435, avg: 2.6435, max: 2.6435, eenheid: 'kg CO2/l' }
};

const CO2CAPTATIE = {
  INTENSIEF: { min: 1.65, avg: 2.27, max: 2.897 },
  EXTENSIEF: { min: 0.147, avg: 0.165, max: 0.183 },
  NO: { min: 0, avg: 0, max: 0 }
};

const EMISSIE_AUTORIT = {
  min: 0.095,
  avg: 0.1185,
  max: 0.143
};

//ReductieC02DoorToenameIsolatie
class A1 extends Base {
  constructor(type, totaleEnergieBesparing) {
    super();
    this._naam = 'Reductie CO2 door toename isolatie';
    this._eenheid = 'kg CO2/jaar';
    this._decimals = 0;

    this._totaleEnergieBesparing = totaleEnergieBesparing;
    this._type = type;

    this._min = 0;
    this._avg = 0;
    this._max = 0;

    this.energiewaardePerLiterStookolie = 10.641; // kWh/l

    this.calculate();
  }

  calculate() {
    if (this._type === 'Elektriciteit') {
      this._min =
        CO2REDUCTIE.ELEKTRICITEIT.min * this._totaleEnergieBesparing.min;
      this._avg =
        CO2REDUCTIE.ELEKTRICITEIT.avg * this._totaleEnergieBesparing.avg;
      this._max =
        CO2REDUCTIE.ELEKTRICITEIT.max * this._totaleEnergieBesparing.max;
    }

    if (this._type === 'Aardgas') {
      this._min = CO2REDUCTIE.AARDGAS.min * this._totaleEnergieBesparing.min;
      this._avg = CO2REDUCTIE.AARDGAS.avg * this._totaleEnergieBesparing.avg;
      this._max = CO2REDUCTIE.AARDGAS.max * this._totaleEnergieBesparing.max;
    }

    if (this._type === 'Stookolie') {
      this._min = CO2REDUCTIE.STOOKOLIE.min * this._totaleEnergieBesparing.min;
      this._avg = CO2REDUCTIE.STOOKOLIE.avg * this._totaleEnergieBesparing.avg;
      this._max = CO2REDUCTIE.STOOKOLIE.max * this._totaleEnergieBesparing.max;
    }
  }
}

//ReductieC02DoorMeerproductieZonnepanelen
class B1 extends Base {
  constructor(jaarlijkseEXTRAProductieZonnepanelen) {
    super();
    this._naam = 'Reductie CO2 door méérproductie zonnepanelen';
    this._eenheid = 'kg CO2/jaar';
    this._decimals = 0;
    this._type = '';
    this._min = 0;
    this._avg = 0;
    this._max = 0;

    this._jaarlijkseEXTRAProductieZonnepanelen = jaarlijkseEXTRAProductieZonnepanelen;
    this.calculate();
  }

  calculate() {
    this._min =
      this._jaarlijkseEXTRAProductieZonnepanelen.min *
      CO2REDUCTIE.ELEKTRICITEIT.min;
    this._avg =
      this._jaarlijkseEXTRAProductieZonnepanelen.avg *
      CO2REDUCTIE.ELEKTRICITEIT.avg;
    this._max =
      this._jaarlijkseEXTRAProductieZonnepanelen.max *
      CO2REDUCTIE.ELEKTRICITEIT.max;
  }
}

//ReductieCO2DoorVegetatie
class C1 extends Base {
  constructor(type, opp) {
    super();
    this._naam = 'Reductie CO2 door vegetatie';
    this._eenheid = 'kg C02/jaar';
    this._decimals = 0;
    //this._type = type.substr(0, 9).toLowerCase();

    this._type = type;
    this._opp = opp;
    this._min = 0;
    this._avg = 0;
    this._max = 0;
    this.calculate();
  }

  calculate() {
    this._min = CO2CAPTATIE[this._type.toUpperCase()].min * this._opp;
    this._avg = CO2CAPTATIE[this._type.toUpperCase()].avg * this._opp;
    this._max = CO2CAPTATIE[this._type.toUpperCase()].max * this._opp;
  }
}

export {
  A1 as ReductieC02DoorToenameIsolatie,
  B1 as ReductieC02DoorMeerproductieZonnepanelen,
  C1 as ReductieCO2DoorVegetatie,
  EMISSIE_AUTORIT
};
