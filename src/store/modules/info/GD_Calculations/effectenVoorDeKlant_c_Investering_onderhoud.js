const DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT = 0.282091429; // €/kWh
const DEFAULT_EENHEIDSPRIJS_AARDGAS = 0.055124678; // €/kWh
const DEFAULT_EENHEIDSPRIJS_STOOKOLIE = 0.0665445; // €/kWh

const INVESTERINGS_KOST_DAK = {
  INTENSIEF: { min: 39.9, avg: 136.18, max: 200 }, // intensief groen dak
  EXTENSIEF: { min: 13.43, avg: 59.16, max: 113.99 },
  KLASSIEK: { min: 15, avg: 15, max: 15 },
  NO: { min: 0, avg: 0, max: 0 }
};

const ONDERHOUDS_KOST_DAK = {
  INTENSIEF: { min: 0.63, avg: 1.16, max: 1.5 },
  EXTENSIEF: { min: 0.09, avg: 0.55, max: 1.15 },
  KLASSIEK: { min: 0.58, avg: 0.58, max: 0.58 },
  NO: { min: 0, avg: 0, max: 0 }
};

export {
  DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT, //const - eenheidsprijs EL
  DEFAULT_EENHEIDSPRIJS_AARDGAS, //const - eenheidsprijs GAS
  DEFAULT_EENHEIDSPRIJS_STOOKOLIE, //const - eenheidsprijs OLIE
  INVESTERINGS_KOST_DAK,
  ONDERHOUDS_KOST_DAK
};
