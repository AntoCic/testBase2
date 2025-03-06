<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputDateTime</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputDatetime field="dateX" v-model="form" label='Data di nascita' required min="2025-03-03T12:00" max="2025-03-06T15:00" :onChange="handleChange"
          />
        <Btn @click="form.reset()" class="w-100" googleIcon="replay"></Btn>
        <Btn type="submit"  class="w-100" @click="handleSubmit" googleIcon="send"></Btn>

        <hr>
        <p class="">{{ form.dateX }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputDatetime from '../../personal_modules/form-validator/InputDatetime.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputDatetime, Btn },
  data() {
    return {
      form: new FormValidator({
        dateX: new Date(),
      }),

      onChangeData: {},

    };
  },
  methods: {
    InputDateValidator(value, { min, max }) {
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
  computed: {
    yesterday() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      return yesterday;
    },
    tomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow;
    }
  }
}
</script>

<style lang="scss" scoped></style>
