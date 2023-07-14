const GEMIDDELD_PIEKVERMOGEN_PER_PANEEL = 260;
const GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE = 0.86;
const GEMIDDELD_RENDEMENT_DOOR_OUDERDOM = 0.85;

const MEERPRODUCTIE_DOOR_GROEN = {
  min: 0,
  avg: 0,
  max: 0,
  eenheid: '%'
};

const VERSCHIL_IN_PIEKTEMPERATUUR = {
  GROENEGEVEL: { min: 3, avg: 6.03, max: 10.03 },
  LIVINGWALL: { min: 3, avg: 6.03, max: 10.03 },
  NO: { min: 3, avg: 6.03, max: 10.03 }
};

const EXTRA_AKOESTISCHE_ISOLATIE = {
  GROENEGEVEL: { min: 4, avg: 12, max: 17 },
  LIVINGWALL: { min: 4, avg: 12, max: 17 },
  NO: { min: 4, avg: 12, max: 17 }
};

export {
  GEMIDDELD_PIEKVERMOGEN_PER_PANEEL, //const - gemiddeld piekvermogen per paneel
  GEMIDDELD_RENDEMENT_DOOR_ORIENTATIE, //const - gemiddeld rendement door orientatie
  GEMIDDELD_RENDEMENT_DOOR_OUDERDOM, //const - gemiddeld rendement door ouderdom
  MEERPRODUCTIE_DOOR_GROEN, //const - gemiddelde meerproductie door groen dak
  VERSCHIL_IN_PIEKTEMPERATUUR, // const - gemiddeld verschil in piektemperatuur
  EXTRA_AKOESTISCHE_ISOLATIE // const - gemiddeld extra akoestische isolatie
};
