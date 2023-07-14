const GEMIDDELD_PIEKVERMOGEN_PER_PANEEL = 260;
const GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE = 0.86;
const GEMIDDELD_RENDEMENT_DOOR_OUDERDOM = 0.85;

const MEERPRODUCTIE_DOOR_GROEN = {
  min: 2,
  avg: 6.67,
  max: 12,
  eenheid: '%'
};

const VERSCHIL_IN_PIEKTEMPERATUUR = {
  INTENSIEF: { min: 1, avg: 2.967, max: 4.4 }, // intensief groen dak
  EXTENSIEF: { min: 0.5, avg: 0.8, max: 1.4 }, //extensief groen dak
  NO: { min: 0, avg: 0, max: 0 } //extensief groen dak
};

const EXTRA_AKOESTISCHE_ISOLATIE = {
  INTENSIEF: { min: 2, avg: 8, max: 13 },
  EXTENSIEF: { min: 5, avg: 5, max: 5 },
  NO: { min: 0, avg: 0, max: 0 }
};

export {
  GEMIDDELD_PIEKVERMOGEN_PER_PANEEL, //const - gemiddeld piekvermogen per paneel
  GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE, //const - gemiddeld rendement door orientatie
  GEMIDDELD_RENDEMENT_DOOR_OUDERDOM, //const - gemiddeld rendement door ouderdom
  MEERPRODUCTIE_DOOR_GROEN, //const - gemiddelde meerproductie door groen dak
  VERSCHIL_IN_PIEKTEMPERATUUR, // const - gemiddeld verschil in piektemperatuur
  EXTRA_AKOESTISCHE_ISOLATIE // const - gemiddeld extra akoestische isolatie
};
