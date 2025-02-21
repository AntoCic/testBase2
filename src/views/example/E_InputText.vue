<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>InputText</h1>
      </div>
      <div class="col-12">
        <hr>
        <InputText field="testo" v-model="form" />
        <hr>
        <p class="">{{ form.searchText }}</p>
        <ButtonLightOutline @click="form.reset()">Resetta input</ButtonLightOutline>
        <ButtonLightOutline type="submit" @click="form.get()">submit</ButtonLightOutline>
        <hr>
        <pre class="bg-light text-dark text-start">
          form:{{ form }}
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
        testo: 'a',
      }),
    };
  },
  methods: {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
