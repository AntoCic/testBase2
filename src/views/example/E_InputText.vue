<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputText</h1>
      </div>
      <div class="col-12 text-start">
        <hr>
        <InputText field="testo" v-model="form" label="ciao"
          :validation="{ validator: InputTextValidator, min: 5, max: 10 }" inline
          :onChange="(value, field) => { onChangeData = { field, value } }" />
        <hr>
        <p class="">{{ form.searchText }}</p>
        <ButtonLightOutline @click="form.reset()">Resetta input</ButtonLightOutline>
        <ButtonLightOutline type="submit" @click="form.get()">submit</ButtonLightOutline>
        <hr>
        <pre class="bg-light text-dark text-start">
          form:{{ form }}
          onChangeData:{{ onChangeData }}
        </pre>
      </div>
    </div>

  </div>
</template>

<script>
import { FormValidator } from '../../personal_modules/FormValidator';
import InputText from '../../components/formCmp/InputText.vue';
import ButtonLightOutline from '../../components/ButtonLightOutline.vue';
export default {
  components: { InputText, ButtonLightOutline },
  data() {
    return {
      form: new FormValidator({
        testo: 'aff',
      }),

      onChangeData: { field: '', value: '' },
    };
  },
  methods: {
    InputTextValidator(value, { min, max }) {
      console.log(value, { min, max });
      return value.length <= max && value.length >= min
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
