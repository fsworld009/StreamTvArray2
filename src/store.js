import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const sessionStorageKey = 'StreamTvArray';
const session = sessionStorage.getItem(sessionStorageKey) || '{}';

function loadLang(langCode, commit) {
  return $.getJSON(`./languages/${langCode}.json`, (messages) => {
    commit({
      type: 'updateLanguage',
      langCode,
      messages,
    });
  });
}


const defaultLangCode = 'en';

const initialState = Object.assign({
  arrayOptions: {
    width: 2,
    height: 2,
  },
  defaultStreamOptions: {
    chatPosition: 'left', // left, right
    chatAboveStream: true,
    chatWidth: 25,
    chatTransparency: 50,
    // only available when choosing above stream
    chatWidthOnHover: 50,
    chatTransparencyOnHover: 50,
  },
  streams: {

  },
  optionsModal: {
    enabled: true,
    option: 'main', // main, stream
    streamId: null,
  },
  langCode: defaultLangCode,
}, JSON.parse(session));

const store = new Vuex.Store({
  state: initialState,
  getters: {
  },
  actions: {
    initLang({ dispatch, state }) {
      return dispatch({
        type: 'loadLanguage',
        langCode: state.langCode,
      });
    },
    loadLanguage({ commit }, payload) {
      let $defaultLangPromise;


      if (!Vue.$lang.loaded(defaultLangCode)) {
        $defaultLangPromise = loadLang(defaultLangCode, commit);
      } else {
        $defaultLangPromise = $.Deferred().resolve();
      }
      return $defaultLangPromise.then(() => {
        const { langCode } = payload;
        if (langCode && !Vue.$lang.loaded(langCode)) {
          return loadLang(langCode, commit);
        }
        return $.Deferred().resolve();
      });
    },
  },
  mutations: {
    updateLanguage(state, payload) {
      Vue.$lang.update(payload.langCode, payload.messages);
    },

    changeLangCode(state, payload) {
      state.langCode = payload.langCode;
      Vue.$lang.changeLangCode(payload.langCode);
    },
  },
});

export default store;
