<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputSearch</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <div class="input-group">
          <InputSearch field="search" v-model="form" label inputGroup :onChange="handleChange" />
          <Btn @click="form.reset()" googleIcon="replay"></Btn>
          <Btn type="submit" @click="handleSubmit" googleIcon="send"></Btn>
        </div>
        <hr>
        <p class="">{{ form.search }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputSearch from '../../personal_modules/form-validator/InputSearch.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputSearch, Btn },
  data() {
    return {
      form: new FormValidator({
        search: null,
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
