import Vue from 'vue';

import './semantic/semantic.css';
import './semantic/semantic.js';
import './index.less';

import store from 'store';
import Index from './Index.vue';

import VueLang from './plugins/vue-lang';

Vue.use(VueLang);

window.onbeforeunload = function _beforeload() { return ''; };

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  store,
  lang: {
    defaultLangCode: 'en',
  },
  template: '<Index/>',
  components: { Index },
});

window.vm = app;

// VueLang.setAppRoot(app);
