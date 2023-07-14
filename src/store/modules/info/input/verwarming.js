class Verwarming {
  constructor(obj) {
    this.verwarming = obj ? obj.verwarming : '';

    this.elektriciteitVerbruik = obj
      ? obj.elektriciteitVerbruik
      : { waarde: '', eenheid: 'kWh/jaar' };
    this.elektriciteitVerbruikWeetNiet = obj
      ? obj.elektriciteitPrijsWeetNiet
      : true;
    this.elektriciteitPrijs = obj
      ? obj.elektriciteitPrijs
      : { waarde: '', eenheid: '€/jaar' };
    this.elektriciteitPrijsWeetNiet = obj
      ? obj.elektriciteitPrijsWeetNiet
      : true;
    this.elektriciteitsPrijsPerKWH = obj ? obj.elektriciteitsPrijsPerKWH : 0;

    this.aardgasVerbruik = obj
      ? obj.aardgasVerbruik
      : { waarde: '', eenheid: 'm³/jaar' };
    this.aardgasVerbruikWeetNiet = obj ? obj.aardgasVerbruikWeetNiet : true;
    this.aardgasPrijs = obj
      ? obj.aardgasPrijs
      : { waarde: '', eenheid: '€/jaar' };
    this.aardgasPrijsWeetNiet = obj ? obj.aardgasPrijsWeetNiet : true;
    this.aardgasPrijsPerKWH = obj ? obj.aardgasPrijsPerKWH : 0;

    this.stookolieVerbruik = obj
      ? obj.stookolieVerbruik
      : { waarde: '', eenheid: 'l/jaar' };
    this.stookolieVerbruikWeetNiet = obj ? obj.stookolieVerbruikWeetNiet : true;
    this.stookoliePrijs = obj
      ? obj.stookoliePrijs
      : { waarde: '', eenheid: '€/jaar' };
    this.stookoliePrijsWeetNiet = obj ? obj.stookoliePrijsWeetNiet : true;
    this.stookoliePrijsPerLiter = obj ? obj.stookoliePrijsPerLiter : 0;
  }
}

Verwarming.prototype.validate = function() {
  let result = true;
  let errors = [];

  //elektriciteit
  if (this.verwarming === 'Elektriciteit') {
    if (!this.elektriciteitVerbruikWeetNiet) {
      if (!this.elektriciteitVerbruik.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige elektriciteitsverbruik onbekend is.`
        );
        result = false;
      }
    }

    if (!this.elektriciteitPrijsWeetNiet) {
      if (!this.elektriciteitPrijs.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige elektriciteitsprijs onbekend is.`
        );
        result = false;
      }
    }
  }

  //aardgas
  if (this.verwarming === 'Aardgas') {
    if (!this.aardgasVerbruikWeetNiet) {
      if (!this.aardgasVerbruik.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige aardgasverbruik onbekend is.`
        );
        result = false;
      }
    }

    if (!this.aardgasPrijsWeetNiet) {
      if (!this.aardgasPrijs.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige aardgasprijs onbekend is.`
        );
        result = false;
      }
    }
  }

  //stookolie
  if (this.verwarming === 'Stookolie') {
    if (!this.stookolieVerbruikWeetNiet) {
      if (!this.stookolieVerbruik.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige stookolieverbruik onbekend is.`
        );
        result = false;
      }
    }

    if (!this.stookoliePrijsWeetNiet) {
      if (!this.stookoliePrijs.waarde) {
        errors.push(
          `Selecteer de optie 'ik weet het niet' indien uw huidige stookolieprijs onbekend is.`
        );
        result = false;
      }
    }
  }

  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

Verwarming.prototype._prepareForCalculation = function() {
  if (this.elektriciteitPrijs && this.elektriciteitVerbruik) {
    this.elektriciteitsPrijsPerKWH =
      this.elektriciteitPrijs / this.elektriciteitVerbruik;
  }

  if (this.aardgasPrijs && this.aardgasVerbruik) {
    this.aardgasPrijsPerKWH = this.aardgasPrijs / this.aardgasVerbruik;
  }

  if (this.stookoliePrijs && this.stookolieVerbruik) {
    this.stookoliePrijsPerLiter = this.stookoliePrijs / this.stookolieVerbruik;
  }
};

Verwarming.clone = function(obj) {
  let test = new Verwarming(obj);
  return test;
};

Verwarming.VERWARMING = ['Elektriciteit', 'Aardgas', 'Stookolie'];

export default Verwarming;
