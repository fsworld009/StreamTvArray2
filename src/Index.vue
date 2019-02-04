<template lang="pug">
div#app
  span.hello
    | Hello World {{ test }}
    i.ui.large.icon.github
  div.text.blue
    | Semantic test
  OptionsWindow

</template>

<style lang="less">


</style>


<script>
import OptionsWindow from 'components/OptionsWindow';

export default {
  components: {
    OptionsWindow,
  },
  data() {
    return {
      test: 'Test',
    };
  },
};
</script>
