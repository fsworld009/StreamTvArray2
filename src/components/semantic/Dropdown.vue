<template lang="pug">
  div.field
    label
      h5(v-if="label", v-html="label")
    div(class="ui search fluid selection dropdown",
        :class="{disabled: disabled}")
      input(:name="name", type="hidden", :value="value")
      i.dropdown.icon
      div.default.text {{placeholder}}
      div.menu
        template(v-for="(item, index) in items")
          div.item(:key="index", :data-value="item.value")
            | {{item.text}}
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      default: '',
    },
    items: {
      type: Array,
      default() { return []; },
    },
    placeholder: {
      default: '',
    },
    options: {
      type: Object,
    },
    label: {
    },
    disabled: {

    },
  },
  mounted() {
    this.create();
  },
  updated() {
    this.destroy();
    this.create();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    create() {
      const $dropdown = $(this.$el).find('.ui.dropdown');

      const options = Object.assign({
        onChange: (value, text, $choice) => {
          this.$emit('change', value, text, $choice);
        },
      }, this.options);
      $dropdown.dropdown(options);
    },
    destroy() {
      const $dropdown = $(this.$el).find('.ui.dropdown');
      $dropdown.dropdown('destroy');
    },
  },
};
</script>
