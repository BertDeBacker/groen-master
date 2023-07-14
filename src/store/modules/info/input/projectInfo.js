class ProjectInfo {
  constructor(obj = undefined) {
    this.groenDakInfo = obj ? obj.groenDakInfo : false;
    this.groenDakOppervlak = obj
      ? obj.groenDakOppervlak
      : { waarde: 0, eenheid: 'm²' };
    this.groenDakTotaalOppervlak = obj
      ? obj.groenDakTotaalOppervlak
      : { waarde: 0, eenheid: 'm²' };
    this.groenDakPercentage = obj
      ? obj.groenDakPercentage
      : { waarde: 0, eenheid: '%' };
    this.groenDakType = obj ? obj.groenDakType : '';

    this.groeneGevelInfo = obj ? obj.groeneGevelInfo : false;
    this.groeneGevelOppervlak = obj
      ? obj.groeneGevelOppervlak
      : { waarde: 0, eenheid: 'm²' };
    this.groeneGevelType = obj ? obj.groeneGevelType : '';
  }
}

//Waardes voor groendak type
ProjectInfo.GROENDAKTYPE = [
  {
    id: 1,
    waarde: 'Extensief groendak met sedumplanten (d = 8cm)',
    type: 'extensief'
  },
  {
    id: 2,
    waarde: 'Intensief groendak met planten naar keuze (d = 40cm)',
    type: 'intensief'
  }
];

//Waardes voor groenegevel type
ProjectInfo.GROENGEVELTYPE = [
  {
    id: 1,
    waarde: 'Groene gevel met grondgebonden beplanting',
    type: 'GROENEGEVEL'
  },
  { id: 2, waarde: 'Living wall met planten naar keuze', type: 'LIVINGWALL' }
];

//Validate user input
//If input OK then Return { result = true, errors = []}
ProjectInfo.prototype.validate = function() {
  let result = true;
  let errors = [];

  //Indien geen selectie gemaakt
  if (this.groenDakInfo === false && this.groeneGevelInfo === false) {
    errors.push(
      `Wenst U informatie voor een Groendak, Groene Gevel of beiden? Maak aub een selectie.`
    );
    result = false;
  }

  //Indien groen dak info gevraagd
  if (this.groenDakInfo) {
    if (!this.groenDakOppervlak.waarde) {
      errors.push(`Het veld <oppervlak groendak> is leeg.`);
      result = false;
    }

    if (!this.groenDakTotaalOppervlak.waarde) {
      errors.push(`Het veld <totale dak oppervlakte> is leeg.`);
      result = false;
    }
    if (!this.groenDakType) {
      errors.push(`Het veld <type groendak> is leeg.`);
      result = false;
    }
  }

  //Indien groene gevel info gevraagd
  if (this.groeneGevelInfo) {
    if (!this.groeneGevelOppervlak.waarde) {
      errors.push(`Groene gevel oppervlak ontbreekt.`);
      errors.push(`Het veld <oppervlakte> is leeg.`);
      result = false;
    }
    if (!this.groeneGevelType) {
      errors.push(`Het veld <type groenegevel> is leeg.`);
      result = false;
    }
  }

  //User inpup = OK, prepare data for calculations
  if (result) {
    this._prepareForCalculation();
  }

  return { result, errors };
};

//Set, Reset, Calculate specific values if needed.
ProjectInfo.prototype._prepareForCalculation = function() {
  //Indien geen groen dak informatie gevraagd, reset alle groen dak parameters.
  if (!this.groenDakInfo) {
    this.groenDakOppervlak.waarde = 0;
    this.groenDakTotaalOppervlak.waarde = 0;
    this.groenDakType = '';
  }

  //Indien groen dak informatie gevraagd, bereken groen dak percentage tgv het gehele dak oppervlak.
  if (this.groenDakInfo) {
    this.groenDakPercentage.waarde =
      (this.groenDakOppervlak.waarde / this.groenDakTotaalOppervlak.waarde) *
      100;
  }

  //Indien geen groene gevel info gevraagd, reset all groene gevel parameters.
  if (!this.groeneGevelInfo) {
    this.groeneGevelOppervlak = 0;
    this.groeneGevelType = '';
  }
};

//Function to clone the object
ProjectInfo.clone = function(obj) {
  let test = new ProjectInfo(obj);
  return test;
};

export default ProjectInfo;
