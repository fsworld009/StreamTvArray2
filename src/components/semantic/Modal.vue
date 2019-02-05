<template lang="pug">
  div.ui.modal
    i.close.icon(v-if="options.closeIcon")
    div.header(v-if="options.title")
      h2.ui.header.blue {{options.title}}
    div.content
      slot
    div.actions
      template(v-for="(button, index) in options.actions")
        SeButton(:key="index", :class="button.styleClasses",
                @click="onAction(button.action)")
          | {{button.text}}
</template>


<script>
import SeButton from './SeButton.vue';

export default {
  components: {
    SeButton,
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      created: false,
    };
  },
  mounted() {
    if (this.show && !this.created) {
      this.createModal();
      this.created = true;
    }
    this.toggleModal();
  },
  updated() {
    if (this.show && !this.created) {
      this.createModal();
      this.created = true;
    }
    this.toggleModal();
  },
  beforeDestroy() {
    const $modal = $(this.$el);
    $modal.modal('hide');
    $modal.modal('destroy');
  },
  methods: {
    toggleModal() {
      const $modal = $(this.$el);
      $modal.modal(this.show ? 'show' : 'hide');
    },

    createModal() {
      const $modal = $(this.$el);
      const options = Object.assign({
        onHidden: () => {
          this.$emit('close');
        },
      }, this.options);
      $modal.modal(options);
    },

    onAction(action) {
      if (typeof action === 'function') {
        action();
      }
    },
  },
};
</script>
