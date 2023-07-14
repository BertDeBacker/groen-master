//Base class for all other classes to inherit from.
class Base {
  constructor(
    naam = '',
    type = '',
    decimals = 0,
    min = 0,
    avg = 0,
    max = 0,
    eenheid = ''
  ) {
    this._naam = naam;
    this._type = type;
    this._decimals = decimals;
    this._min = min;
    this._avg = avg;
    this._max = max;
    this._eenheid = eenheid;
  }

  get naam() {
    return this._naam;
  }

  get min() {
    return this._min;
  }
  get avg() {
    return this._avg;
  }
  get max() {
    return this._max;
  }
  get eenheid() {
    return this._eenheid;
  }
  get type() {
    return this._type;
  }
  get decimals() {
    return this._decimals;
  }
}
//CalculationResult: this class is the same as the base class, we only define it for clearity.
class A extends Base {
  constructor(
    naam = '',
    type = '',
    decimals = 0,
    min = 0,
    avg = 0,
    max = 0,
    eenheid = ''
  ) {
    super(naam, type, decimals, min, avg, max, eenheid);
  }
}

//Eenheidsprijs
class B extends Base {
  constructor(val, type, eenheid, decimals = 0) {
    super();
    this._naam = 'Eenheidsprijs';
    this._type = type;
    this._decimals = decimals;
    this._min = val;
    this._avg = val;
    this._max = val;
    this._eenheid = eenheid;
  }
}

export { A as CalculationResult, B as EenheidsPrijs, Base };
