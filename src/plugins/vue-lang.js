
/* eslint-disable */

const VueLang = {

  _$lang() {
    const $lang = function (messageId, substitutions) {
      /* eslint-disable-next-line */
      messageId = String(messageId);
      const messageMap = this.messageMap || this.$root.$lang.messageMap;
      if (!messageMap) {
        return '';
      }

      const langCode = this.langCode || this.$root.$lang.langCode;

      const messages = messageMap[langCode];
      if (!messages) {
        return '';
      }
      let returnMsg = '';

      if (messages[messageId]) {
        returnMsg = messages[messageId];
      } else {
        returnMsg = '';
      }

      returnMsg = String(returnMsg);

      if (substitutions) {
        returnMsg = returnMsg.replace(/\{([A-Za-z0-9]+)\}/g, (match, $1) => {
          if (typeof substitutions[$1] !== 'undefined') {
            return substitutions[$1];
          }
          return match;
        });
      }

      return returnMsg;
    };

    $lang.changeLangCode = function (langCode) {
      this.langCode = langCode;
      this._$forceUpdate();
    };

    const processMessages = function(returnMsgObj, currentMsgObj, prefixes) {
      const keys = Object.keys(currentMsgObj);
      const msgPrefix = prefixes.join('.');
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const message = currentMsgObj[key];
        if (typeof message === 'object') {
          prefixes.push(key);
          processMessages(returnMsgObj, message, prefixes);
          prefixes.pop();
        } else {
          returnMsgObj[`${msgPrefix}.${key}`] = message;
        }
      }
    };

    $lang.updateMessageMap = function(langCode, messageMap) {
      const returnMsg = {};
      processMessages(returnMsg, messageMap, []);
      this.messageMap[langCode] = Object.assign(
        {}, this.messageMap[this.defaultLangCode], returnMsg,
      );
    };

    $lang._$forceUpdate = function() {
      // https://github.com/kvdmolen/vue-lang/blob/master/index.js
      const vm = this.$root;
      let i;
      for (i = 0; i < vm._watchers.length; i += 1) {
        vm._watchers[i].update();
      }
      vm.$forceUpdate();
      for (i = 0; i < vm._watchers.length; i += 1) {
        this._$forceUpdate(vm.$children[i]);
      }
    };

    $lang.loaded = function(langCode) {
      return typeof this.messageMap[langCode] !== 'undefined';
    }

    return $lang;
  },

  install(Vue) {
    Vue.prototype.$lang = VueLang._$lang();

    Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.lang) {
          const langOptions = Object.assign({
            messageMap: {},
            defaultLangCode: 'en',
          }, options.lang);
          Object.assign(this.$lang, {
            langCode: langOptions.defaultLangCode,
            messageMap: langOptions.messageMap,
          });

          const { defaultLangCode } = langOptions;
          if (!this.$lang.messageMap[defaultLangCode]) {
            this.$lang.messageMap[defaultLangCode] = {};
          }
        }
      },
      mounted() {
        this.$lang.$root = this.$root;
      },
    });

  },

};

export default VueLang;
