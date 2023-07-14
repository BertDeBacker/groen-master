const DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT = 0.282091429; // €/kWh
const DEFAULT_EENHEIDSPRIJS_AARDGAS = 0.055124678; // €/kWh
const DEFAULT_EENHEIDSPRIJS_STOOKOLIE = 0.0665445; // €/kWh

const INVESTERINGS_KOST = {
  GROENEGEVEL: { min: 250, avg: 420, max: 550 }, // intensief groen dak
  LIVINGWALL: { min: 600, avg: 1425, max: 2800 },
  KLASSIEK: { min: 80, avg: 110.83, max: 140 },
  NO: { min: 0, avg: 0, max: 0 }
};

const ONDERHOUDS_KOST = {
  GROENEGEVEL: { min: 2.81, avg: 21.77, max: 37.5 },
  LIVINGWALL: { min: 57.74, avg: 123.92, max: 280 },
  KLASSIEK: { min: 1, avg: 2, max: 3 },
  NO: { min: 0, avg: 0, max: 0 }
};

export {
  DEFAULT_EENHEIDSPRIJS_ELEKTRICTEIT, //const - eenheidsprijs EL
  DEFAULT_EENHEIDSPRIJS_AARDGAS, //const - eenheidsprijs GAS
  DEFAULT_EENHEIDSPRIJS_STOOKOLIE, //const - eenheidsprijs OLIE
  INVESTERINGS_KOST,
  ONDERHOUDS_KOST
};
