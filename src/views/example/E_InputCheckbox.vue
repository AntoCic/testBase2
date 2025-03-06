<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputCheckbox</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputCheckbox field="checkA" v-model="form" :label="true" :onChange="handleChange" />
        <hr>
        <p>{{ form.checkA }}</p>
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
import InputCheckbox from '../../personal_modules/form-validator/InputCheckbox.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputCheckbox, Btn },
  data() {
    return {
      form: new FormValidator({ checkA: false}),
      onChangeData: {},
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
