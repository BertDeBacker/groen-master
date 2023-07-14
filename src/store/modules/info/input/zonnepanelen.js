class Zonnepanelen {
  constructor(obj = undefined) {
    this.zonnepanelen = obj ? obj.zonnepanelen : 'nee';
    this.aantal = obj ? obj.aantal : { waarde: '', eenheid: 'stuks' };
    this.orientatie = obj ? obj.orientatie : { waarde: '', eenheid: '' };
    this.gezamelijkVermogen = obj
      ? obj.gezamelijkVermogen
      : { waarde: '', eenheid: 'kW' };
    this.gezamelijkVermogenWeetNiet = obj
      ? obj.gezamelijkVermogenWeetNiet
      : true;
    this.jaarlijkseProductie = obj
      ? obj.jaarlijkseProductie
      : { waarde: '', eenheid: 'kWh/jaar' };
    this.jaarlijkseProductieWeetNiet = obj
      ? obj.jaarlijkseProductieWeetNiet
      : true;
    this.groenestroomcertificaten = obj ? obj.groenestroomcertificaten : '';
    this.groenestroomcertificatenPrijs = obj
      ? obj.groenestroomcertificatenPrijs
      : { waarde: '', eenheid: '€/1000KWh' };
  }
}

//Return true or throw an error
Zonnepanelen.prototype.validate = function() {
  let result = true;
  let errors = [];

  //Geen zonnepanelen, skip rest
  if (this.zonnepanelen === 'nee') {
    return { result, errors };
  }

  if (!this.aantal.waarde) {
    errors.push(`Het veld <aantal zonnepanelen> is leeg.`);
    result = false;
  }
  if (!this.orientatie.waarde) {
    errors.push(`Het veld <oriëntatie> is leeg.`);
    result = false;
  }

  if (!this.gezamelijkVermogenWeetNiet && !this.gezamelijkVermogen.waarde) {
    errors.push(
      `Selecteer de optie 'ik weet het niet' indien het gezamelijk vermogen onbekend is.`
    );
    result = false;
  }

  if (!this.jaarlijkseProductieWeetNiet && !this.jaarlijkseProductie.waarde) {
    errors.push(
      `Selecteer de optie 'ik weet het niet' indien de jaarlijkse productie onbekend is.`
    );
    result = false;
  }

  if (
    this.groenestroomcertificaten === 'ja' &&
    !this.groenestroomcertificatenPrijs.waarde
  ) {
    errors.push(`Het veld <waarde> is leeg.`);
    result = false;
  }

  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

Zonnepanelen.prototype._prepareForCalculation = function() {
  //Nothing to do
};

Zonnepanelen.clone = function(obj) {
  let test = new Zonnepanelen(obj);
  return test;
};

Zonnepanelen.ZONNEPANELEN = ['ja', 'nee'];
Zonnepanelen.ORIENTATIE = ['Noord', 'Oost', 'Zuid', 'West'];

export default Zonnepanelen;
