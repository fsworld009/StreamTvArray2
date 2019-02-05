<template lang="pug">
div#app
  div(v-if="!loaded")
    h1 Loading...
  div(v-else)
    span.hello
      | Hello World {{ test }}
      i.ui.large.icon.github
    div.text.blue
      | Semantic test
  Options(ref="options", @langChangeStart="onLangChangeStart",
          @langChangeDone="onLangChangeDone")

</template>

<style lang="less">


</style>


<script>
import Options from 'components/Options';
import {mapState} from 'vuex';

export default {
  components: {
    Options,
  },
  data() {
    return {
      test: 'Test',
      loaded: false,
    };
  },
  computed: mapState({
    hasStream(state) {
      return Object.keys(state.streams).length > 0;
    },
  }),
  mounted() {
    this.$store.dispatch({
      type: 'initLang',
    }).then(() => {
      this.loaded = true;
      this.$refs.options.modalShow = !this.hasStream;
    });
  },
  methods: {
    onLangChangeStart() {
      this.loaded = false;
    },
    onLangChangeDone() {
      this.loaded = true;
    },
  },
};
</script>
