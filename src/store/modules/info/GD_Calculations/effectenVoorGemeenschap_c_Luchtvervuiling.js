const VERWIJDERING_FIJNSTOF = {
  INTENSIEF: {
    min: 2.16,
    avg: 6.29,
    max: 9.21
  },
  EXTENSIEF: {
    min: 0.15,
    avg: 1.55875,
    max: 5
  },
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

export {
  VERWIJDERING_FIJNSTOF,
  VERWIJDERING_NO2,
  VERWIJDERING_SO2,
  VERWIJDERING_Ozon
};
