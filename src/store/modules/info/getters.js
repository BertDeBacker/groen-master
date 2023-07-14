const getInfo = state => state.info;
const getAlgemeen = state => state.info.algemeen;
const getProjectInfo = state => state.info.projectInfo;
const getWoning = state => state.info.woning;
const getVerwarming = state => state.info.verwarming;
const getZonnepanelen = state => state.info.zonnepanelen;
const getAfschrijving = state => state.info.afschrijving;

const getGDResultaatVoorKlant = state => state.GDResultaatVoorKlant;
const getGDResultaatVoorGemeenschap = state => state.GDResultaatVoorGemeenschap;

const getGGResultaatVoorKlant = state => state.GGResultaatVoorKlant;
const getGGResultaatVoorGemeenschap = state => state.GGResultaatVoorGemeenschap;

const getState = state => state;

export default {
  getInfo,
  getAfschrijving,
  getAlgemeen,
  getProjectInfo,
  getVerwarming,
  getWoning,
  getZonnepanelen,
  getState,
  getGDResultaatVoorKlant,
  getGDResultaatVoorGemeenschap,
  getGGResultaatVoorKlant,
  getGGResultaatVoorGemeenschap
};
