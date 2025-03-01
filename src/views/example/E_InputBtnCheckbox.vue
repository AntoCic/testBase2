<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputText</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <div class="input-group">
          <InputText field="testo" v-model="form" label='<span class="material-symbols-outlined">person</span> Username'
            inputGroup :validation="{ validator: InputTextValidator, min: 5, max: 10 }" :onChange="handleChange" />
        </div>

        <hr>
        <p class="">{{ form.searchText }}</p>
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
import InputText from '../../personal_modules/form-validator/InputText.vue';

import Btn from '../../components/Btn.vue';
export default {
  components: { InputText, Btn },
  data() {
    return {
      form: new FormValidator({
        testo: 'abc',
      }),

      onChangeData: {},
    };
  },
  methods: {
    InputTextValidator(value, { min, max }) {
      console.log(value, { min, max });
      return value.length <= max && value.length >= min
    },
    handleChange(value, field) {
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
