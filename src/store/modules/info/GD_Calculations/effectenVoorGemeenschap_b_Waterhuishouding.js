import { Base } from '@/store/modules/info/Calculations/base';

const GEMIDDELDE_JAARLIJKSE_NEERSLAG_BELGIE = 855.32; // mm/m²/jaar
const GEMIDDELDE_KOSTPRIJS_WATERZUIVERING = 1.202619; // Euro/m³

const WATERRETENTIE = {
  INTENSIEF: {
    min: 75,
    avg: 88,
    max: 100
  },
  EXTENSIEF: {
    min: 40,
    avg: 59,
    max: 70
  },
  NO: {
    min: 0,
    avg: 0,
    max: 0
  },
  eenheid: '%'
};

//Jaarlijks volume neerslag op dak
class A2 extends Base {
  constructor(opp) {
    super();
    this._opp = opp;
    this._eenheid = 'mm';
    this._decimals = 0;
    this._naam = 'Jaarlijks volume neerslag op dak';
    this._min = opp * GEMIDDELDE_JAARLIJKSE_NEERSLAG_BELGIE;
    this._avg = opp * GEMIDDELDE_JAARLIJKSE_NEERSLAG_BELGIE;
    this._max = opp * GEMIDDELDE_JAARLIJKSE_NEERSLAG_BELGIE;
    this.calculate();
  }
  calculate() {
    this._min = this._min / 1000;
    this._avg = this._avg / 1000;
    this._max = this._max / 1000;
  }
}

export {
  A2 as JaarlijksVolumeNeerslagOpDak,
  WATERRETENTIE,
  GEMIDDELDE_KOSTPRIJS_WATERZUIVERING
};
