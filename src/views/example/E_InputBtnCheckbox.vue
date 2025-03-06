<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputBtnCheckbox</h1>
      </div>
      <div class="col-12 text-start">

        <hr>
        <div class="input-group">
          <span class="input-group-text bg-transparent px-1">
            <InputBtnCheckbox field="checkA" class="btn btn-outline-light" v-model="form" :label="true" required
              :onChange="handleChange" />
          </span>
          <Btn @click="form.reset()" googleIcon="replay"></Btn>
          <Btn type="submit" @click="handleSubmit" googleIcon="send"></Btn>


        </div>

        <hr>
        <p>{{ form.checkA }}</p>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputBtnCheckbox from '../../personal_modules/form-validator/InputBtnCheckbox.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputBtnCheckbox, Btn },
  data() {
    return {
      form: new FormValidator({ checkA: false }),
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
