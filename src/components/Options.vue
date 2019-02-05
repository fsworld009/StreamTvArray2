<template lang="pug">
  Modal.options(ref="modal", :options="modalOptions", :show="modalShow")
    div.two.column.ui.grid.container
      div.row
        div.column
          | Language
        div.column
          Dropdown(name="langCode", :value="$lang.langCode()",
                   :items="langCodes", @change="onChangeLangCode")
      div.row
        div.column
          | {{ $lang('arrayOptions.arraySize') }}
        div.column
          SeForm
            div.fields
              SeInput.four.wide.field(size="4")
              div.one.wide.field
                div(style="position:relative;top:35%;") x
              SeInput.four.wide.field(size="4")

</template>

<style lang="less">
.options {
  color: black;
  width: 500px !important;
}
</style>

<script>
import Modal from 'components/semantic/Modal';
import SeForm from 'components/semantic/SeForm';
import SeInput from 'components/semantic/SeInput';
import Dropdown from 'components/semantic/Dropdown';

import langCodes from 'languages/langCodes.json';


export default {
  components: {
    Modal,
    SeForm,
    SeInput,
    Dropdown,
  },
  props: {
  },
  data() {
    return {
      modalOptions: {
        closable: false,
        closeIcon: true,
        title: 'Stream TV Array',
        actions: [
          {},
        ],
      },
      modalShow: false,
      langCodes,
    };
  },
  methods: {
    onChangeLangCode(value, text, $choice) {
      this.$emit('langChangeStart');
      this.modalShow = false;
      this.$store.dispatch({
        type: 'loadLanguage',
        langCode: value,
      }).then(() => {
        this.$store.commit({
          type: 'changeLangCode',
          langCode: value,
        });
        this.modalShow = true;
        this.$emit('langChangeDone');
      });
    },
  },
};


</script>