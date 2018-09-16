<template lang="pug">
div
  span.hello
    | Hello World {{ test }}
    i.ui.large.icon.github
  div.text.blue
    | Semantic test

</template>

<style lang="less">
@text-color: white;

.hello {
  color: @text-color;
}

</style>


<script>
export default {
  components: {
  },
  data() {
    return {
      test: 'Test',
    };
  },
};
</script>
