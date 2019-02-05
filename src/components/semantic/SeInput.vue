<template lang="pug">
  div.field
    label
      h5(v-if="label", v-html="label")
    div(class="ui input", :class="inputWrapperClass")
      input(:class="{disabled: disabled}", :name="name", :value="value",
            :type="type", :placeholder="placeholder", :size="size")
      div(v-if="hasSuffix", class="ui basic label", v-html="suffix")
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
    },
    value: {
      default: '',
    },
    options: {
      type: Object,
    },
    type: {
      default: 'text',
    },
    label: {

    },
    placeholder: {

    },
    suffix: {
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasSuffix() {
      return typeof suffix !== 'undefined';
    },
    inputWrapperClass() {
      return {
        'ui input': !this.hasSuffix,
        'ui right labeled input': this.hasSuffix,
        disabled: this.disabled,
      };
    },
  },
};
</script>
