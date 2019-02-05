<template lang="pug">
  button.ui.button(@click="onClick")
    slot
    | Button
</template>

<script>
export default {
  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
