import Vue from 'vue';

import './semantic/semantic.css';
import './semantic/semantic.js';
import './index.less';

import Index from './Index.vue';

window.onbeforeunload = function _beforeload() { return ''; };

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  // store,
  template: '<Index/>',
  components: { Index },
});

// VueLang.setAppRoot(app);
