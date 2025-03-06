<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputTime</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputTime field="timeX" lable="Time" v-model="form" required min="15:00" max="19:00"  :onChange="handleChange" />
        <Btn @click="form.reset()" class="w-100" googleIcon="replay"></Btn>
        <Btn type="submit"  class="w-100" @click="handleSubmit" googleIcon="send"></Btn>

        <hr>
        <p class="">{{ form.timeX }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputTime from '../../personal_modules/form-validator/InputTime.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputTime, Btn },
  data() {
    return {
      form: new FormValidator({
        timeX: '',
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
  computed: {
  }
}
</script>

<style lang="scss" scoped></style>
