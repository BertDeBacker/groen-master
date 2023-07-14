class Afschrijving {
  constructor(obj) {
    this.jaar = obj ? obj.jaar : { waarde: 20, eenheid: 'jaar' };
    this.jaarOverig = obj ? obj.jaarOverig : { waarde: '', eenheid: 'jaar' };
  }
}

Afschrijving.prototype.validate = function() {
  let result = true;
  let errors = [];

  if (!this.jaar.waarde) {
    errors.push('Afschrijvingstermijn ontbreekt.');
    result = false;
  }

  if (this.jaar.waarde === 'overig' && !this.jaarOverig.waarde) {
    errors.push('Afschrijvingstermijn ontbreekt.');
    result = false;
  }

  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

Afschrijving.prototype._prepareForCalculation = function() {
  if (this.jaar === 'overig') {
    this.jaar.waarde = this.jaarOverig.waarde;
  } else {
    this.jaarOverig.waarde = '';
  }
};

Afschrijving.clone = function(obj) {
  let test = new Afschrijving(obj);
  return test;
};

Afschrijving.AFSCHRIJVINGSPERIODES = ['1', '3', '5', '10', '20', 'overig'];

export default Afschrijving;
