const VERWIJDERING_FIJNSTOF = {
  GROENEGEVEL: { min: 0.18333333, avg: 2.64666667, max: 5.49 },
  LIVINGWALL: { min: 0.18333333, avg: 2.64666667, max: 5.49 },
  NO: { min: 0, avg: 0, max: 0 },
  eenheid: 'g/m²/jaar'
};

const VERWIJDERING_NO2 = {
  min: 0.37,
  avg: 2.188571429,
  max: 3.57,
  eenheid: 'g/m².jaar'
};

const VERWIJDERING_SO2 = {
  min: 0.1,
  avg: 0.637142857,
  max: 1.01,
  eenheid: 'g/m².jaar'
};

const VERWIJDERING_Ozon = {
  min: 1.2,
  avg: 4.11,
  max: 7.17,
  eenheid: 'g/m².jaar'
};

const BIODIVERSITEITSWAARDE = {
  GROENEGEVEL: { min: 0, avg: 0, max: 0 },
  LIVINGWALL: { min: 0, avg: 5, max: 10 },
  KLASSIEK: { min: 20, avg: 30, max: 40 }
};

export {
  VERWIJDERING_FIJNSTOF,
  VERWIJDERING_NO2,
  VERWIJDERING_SO2,
  VERWIJDERING_Ozon
};
