import Vue from 'Vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const sessionStorageKey = 'StreamTvArray';
const session = sessionStorage.getItem(sessionStorageKey) || '{}';

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
}, JSON.parse(session));


const store = new Vuex.Store({
  state: initialState,
  getters: {
  },
  actions: {
  },
  mutations: {
  },
});

export default store;
