<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputText</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputCheckbox field="checkA" v-model="form" :label="true" :onChange="handleChange" />
        <hr>
        <p>{{ form.checkA }}</p>
        <ButtonLightOutline @click="form.reset()">Resetta input</ButtonLightOutline>
        <ButtonLightOutline type="submit" @click="handleSubmit">submit</ButtonLightOutline>
        <hr>
        <pre class="bg-light text-dark text-start">form:{{ form }}<br/>onChangeData:{{ onChangeData }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import { FormValidator, InputCheckbox } from '../../personal_modules/form-validator/formValidator';

import ButtonLightOutline from '../../components/ButtonLightOutline.vue';
export default {
  components: { InputCheckbox, ButtonLightOutline },
  data() {
    return {
      form: new FormValidator({ checkA: false}),
      onChangeData: {},
    };
  },
  methods: {
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
