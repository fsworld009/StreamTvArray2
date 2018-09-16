import Vue from 'vue';
import Index from './Index.vue';
// import store from './store.js';
// import VueLang from './plugins/vue-lang.js';

require('./semantic/semantic.css');
require('./semantic/semantic.js');
require('./index.less');

window.onbeforeunload = function _beforeload() { return ''; };

/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  // store,
  template: '<Index/>',
  components: { Index },
});

// VueLang.setAppRoot(app);
