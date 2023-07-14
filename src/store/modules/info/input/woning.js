import {
  EPC_BOUWJAAR //const - geeft EPC op basis van type (WONING of APPARTEMENT) en jaartal
} from '../GD_Calculations/effectenVoorDeKlant_a_Energie';

class Woning {
  constructor(obj = undefined) {
    this.type = obj ? obj.type : '';
    this.bouwjaar = obj ? obj.bouwjaar : { waarde: '', eenheid: 'jaar' };
    this.bewoonbareOppervlakte = obj
      ? obj.bewoonbareOppervlakte
      : { waarde: '', eenheid: 'm²' };

    this.isolatieDak = obj ? obj.isolatieDak : 'Ik weet het niet';

    this.EPCLabel = obj ? obj.EPCLabel : 'Ik weet het niet';
    this.EPCLabel_Waarde = obj
      ? obj.EPCLabel_Waarde
      : { waarde: '', eenheid: 'jaar' };
  }
}

//Waardes ivm woning
Woning.prototype.validate = function() {
  let result = true;
  let errors = [];

  if (!this.type) {
    errors.push(`Het veld <woning type> is leeg.`);
    result = false;
  }

  if (!this.bouwjaar.waarde) {
    errors.push(`Het veld <bouwjaar> is leeg.`);
    result = false;
  }

  if (!this.bewoonbareOppervlakte.waarde) {
    errors.push(`Het veld <bewoonbare opp> is leeg.`);
    result = false;
  }

  if (this.EPCLabel === 'ja' && !this.EPCLabel_Waarde.waarde) {
    errors.push(`Het veld <EPC> is leeg.`);
    result = false;
  }

  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

Woning.prototype._prepareForCalculation = function() {
  if (this.EPCLabel !== 'ja') {
    //TODO: bereken EPC op basis van van bouwjaar

    let bouwjaar = this.bouwjaar.waarde;
    let type = this.type === 'Eéngezinswoning' ? 'WONING' : 'APPARTEMENT';
    let epc = EPC_BOUWJAAR[type](bouwjaar);

    this.EPCLabel_Waarde.waarde = epc;
  }
};

Woning.WONINGTYPE = ['Eéngezinswoning', 'Appartement'];

Woning.DAKISOLATIE = [
  'Geen isolatie',
  'Gedeeltelijk geïsoleerd',
  'Volledig geïsoleerd',
  'Ik weet het niet'
];

Woning.EPCENERGIELABEL = ['ja', 'nee', 'Ik weet het niet'];

Woning.clone = function(obj) {
  let test = new Woning(obj);
  return test;
};

export default Woning;
