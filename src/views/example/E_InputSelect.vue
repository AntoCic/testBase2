<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputSelect</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputSelect :options="optionsSelect" field="selectedField" v-model="form" label emptyOption="(nessun elemento selezionato)"
          :onChange="handleChange" />
        <Btn @click="form.reset()" googleIcon="replay"></Btn>
        <Btn type="submit" @click="handleSubmit" googleIcon="send"></Btn>
        <hr>
        <p class="">{{ form.selectedField }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputSelect from '../../personal_modules/form-validator/InputSelect.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputSelect, Btn },
  data() {
    return {
      form: new FormValidator({
        selectedField: null,
      }),

      onChangeData: {},

      optionsSelect: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ], 
    };
  },
  methods: {
    InputSelectValidator(value, { min, max }) {
      console.log(value, { min, max });
      return value.length <= max && value.length >= min
    },
    handleChange(value) {
      this.onChangeData = { [field]: value }
    },
    handleSubmit() {
      console.log(this.form.check());
      console.log(this.form.get());
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
