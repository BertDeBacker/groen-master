class Algemeen {
  constructor() {
    this.wie = ''; //particulier or architect
    this.isAkkoord = false;
  }
}

//Return true or throw an error
Algemeen.prototype.validate = function() {
  let result = true;
  let errors = [];

  if (this.wie) {
    errors.push('Doelpubliek (architect/particulier) ontbreekt.');
    result = false;
  }

  if (this.wie !== 'architect' || this.wie !== 'particulier') {
    errors.push(`Doelpubliek '${this.wie}' is niet geldig.`);
    result = false;
  }

  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

Algemeen.prototype._prepareForCalculation = function() {
  //Nothing to do
};

Algemeen.clone = function(obj) {
  let test = new Algemeen(obj);
  return test;
};

export default Algemeen;
