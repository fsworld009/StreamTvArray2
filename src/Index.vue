<template lang="pug">
div#app
  span.hello
    | Hello World {{ test }}
    i.ui.large.icon.github
  div.text.blue
    | Semantic test
  Options

</template>

<style lang="less">


</style>


<script>
import Options from 'components/Options';

export default {
  components: {
    Options,
  },
  data() {
    return {
      test: 'Test',
    };
  },
};
</script>
