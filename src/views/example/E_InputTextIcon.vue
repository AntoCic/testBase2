<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputTextIcon</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputTextIcon field="testo" v-model="form" :label='true' googleIcon="replay"
          :validation="{ validator: InputTextValidator, min: 5, max: 10 }" :onChange="handleChange" />
        <Btn @click="form.reset()" googleIcon="replay" class="w-100 my-3"></Btn>
        <Btn type="submit" @click="handleSubmit" class="w-100">send</Btn>
        <hr>
        <p>{{ form.testo }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputTextIcon from '../../personal_modules/form-validator/InputTextIcon.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputTextIcon, Btn },
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
