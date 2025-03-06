<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputNumber</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <div class="input-group">
          <InputNumber field="numeroX" v-model="form" label inputGroup :onChange="handleChange" required/>
          <Btn @click="form.reset()" googleIcon="replay"></Btn>
          <Btn type="submit" @click="handleSubmit" googleIcon="send"></Btn>
        </div>
        <hr>
        <p class="">{{ form.numeroX }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputNumber from '../../personal_modules/form-validator/InputNumber.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputNumber, Btn },
  data() {
    return {
      form: new FormValidator({
        numeroX: null,
      }),

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
