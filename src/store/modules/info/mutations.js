const SET_VERWARMING = (state, payload) => {
  state.info.verwarming = payload;
};

const SET_ZONNEPANELEN = (state, payload) => {
  state.info.zonnepanelen = payload;
};

const SET_ALGEMEEN = (state, payload) => {
  state.info.algemeen = payload;
};

const SET_PROJECTINFO = (state, payload) => {
  state.info.projectInfo = payload;
};

const SET_WONING = (state, payload) => {
  state.info.woning = payload;
};
const SET_AFSCHRIJVING = (state, payload) => {
  state.info.afschrijving = payload;
};

const SET_GDRESULTAATVOORKLANT = (state, payload) => {
  state.GDResultaatVoorKlant = payload;
};

const SET_GDRESULTAATVOORGEMEENSCHAP = (state, payload) => {
  state.GDResultaatVoorGemeenschap = payload;
};

const SET_GGRESULTAATVOORKLANT = (state, payload) => {
  state.GGResultaatVoorKlant = payload;
};

const SET_GGRESULTAATVOORGEMEENSCHAP = (state, payload) => {
  state.GGResultaatVoorGemeenschap = payload;
};

//isAkkoord and Wie are part of Algemeen
//However they are used on different screens
const SET_ISAKKOORD = (state, payload) => {
  state.info.algemeen.isAkkoord = payload;
};
const SET_WIE = (state, payload) => {
  state.info.algemeen.wie = payload;
};

export default {
  SET_AFSCHRIJVING,
  SET_ALGEMEEN,
  SET_VERWARMING,
  SET_WONING,
  SET_ZONNEPANELEN,
  SET_PROJECTINFO,
  SET_ISAKKOORD,
  SET_WIE,

  //Groen Dak
  SET_GDRESULTAATVOORKLANT,
  SET_GDRESULTAATVOORGEMEENSCHAP,

  //Groene Gevel
  SET_GGRESULTAATVOORKLANT,
  SET_GGRESULTAATVOORGEMEENSCHAP
};
