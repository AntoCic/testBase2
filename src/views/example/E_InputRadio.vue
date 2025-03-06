<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputRadio</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputRadio field="selectedRadio" v-model="form" label required :options="optionsSelect" :onChange="handleChange" />
        <hr>
        <p>{{ form.selectedRadio }}</p>
        <Btn @click="form.reset()">Resetta input</Btn>
        <Btn type="submit" @click="handleSubmit">submit</Btn>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputRadio from '../../personal_modules/form-validator/InputRadio.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputRadio, Btn },
  data() {
    return {
      form: new FormValidator({ selectedRadio: null}),
      onChangeData: {},
      optionsSelect: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ], 
    };
  },
  methods: {
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
