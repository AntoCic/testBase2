<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputDate</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <div class="input-group">
          <InputDate field="dateX" v-model="form" label='Data di nascita' min="2025-03-03" max="2025-03-06"  inputGroup required :onChange="handleChange" :validation="{max : tomorrow}" />
          <Btn @click="form.reset()" googleIcon="replay"></Btn>
          <Btn type="submit" @click="handleSubmit" googleIcon="send"></Btn>
        </div>
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
import InputDate from '../../personal_modules/form-validator/InputDate.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputDate, Btn },
  data() {
    return {
      form: new FormValidator({
        dateX: '',
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
