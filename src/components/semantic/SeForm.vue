<template lang="pug">
  form(class="ui form",action="javascript:void(0)")
    slot
</template>

<script>
export default {
  props: {
    validation: {
      type: Object,
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
      const $form = $(this.$el);

      if (this.validation) {
        $form.form(Object.assign({
          on: 'blur',
        }, this.validation));
      }
    },
    destroy() {
      const $form = $(this.$el);
      $form.form('destroy');
    },
  },
};
</script>
