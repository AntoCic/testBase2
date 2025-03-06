<template>
  <div class="container my-auto">
    <div class="row text-center p-3">
      <div class="col-12">
        <h1 class="text-danger">NEED FIX (remove) onChange from all input an use form.onChange</h1>
      </div>
      <div class="col">
        <img :src="user.photoURL" alt="User Photo" class="rounded-circle">
        <p>{{ user.displayName }}</p>
        <p v-if="user.personalInfo?.userName">{{ user.personalInfo.userName }}</p>
        <div class="input-group">
          <InputText inputGroup field="name" label v-model="form" :onChange="handeleChangeValue" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="surname" label v-model="form" :onChange="handeleChangeValue" />
        </div>
        <div class="input-group">
          <InputSelect inputGroup field="gender" label v-model="form" :options="genderOptions"
            emptyOption="Prefer not to say" :onChange="handeleChangeValue" />
        </div>
        <div class="input-group">
          <InputDate inputGroup field="dateOfBirth" label v-model="form" :onChange="handeleChangeValue" />
          <InputCheckbox inputGroup field="birthHideYear" v-model="form" label="Nascondi anno di nascita"
            :onChange="handeleChangeValue" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="email" label v-model="form" :onChange="handeleChangeValue" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="phoneNumber" label v-model="form" :onChange="handeleChangeValue" />
        </div>
        <!-- <div class="input-group">
          <InputText inputGroup field="photoURL" label v-model="form" />
        </div> -->

        <p>{{ user.uid }}</p>
        <button v-if="user.accessToken" @click="user.logout()" class="btn btn-outline-danger px-2">
          <span v-if="user.displayName" class="me-1">{{ user.displayName }}</span>
          <span class="material-symbols-outlined align-top">
            logout
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FormValidator from '../personal_modules/form-validator/FormValidator.js';
import InputCheckbox from '../personal_modules/form-validator/InputCheckbox.vue';
import InputText from '../personal_modules/form-validator/InputText.vue';
import InputSelect from '../personal_modules/form-validator/InputSelect.vue';
import InputDate from '../personal_modules/form-validator/InputDate.vue';
import { user } from '../stores/user.js'
export default {
  components: { InputText, InputCheckbox, InputSelect, InputDate },
  data() {
    return {
      user,
      form: new FormValidator({ ...user.personalInfo }),

      genderOptions: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
        { value: 'non-binary', text: 'Non-Binary' },
        { value: 'genderfluid', text: 'Genderfluid' },
        { value: 'agender', text: 'Agender' },
        { value: 'bigender', text: 'Bigender' },
        { value: 'demiboy', text: 'Demiboy' },
        { value: 'demigirl', text: 'Demigirl' },
        { value: 'two-spirit', text: 'Two-Spirit' },
        { value: 'pangender', text: 'Pangender' },
        { value: 'androgyne', text: 'Androgyne' },
        { value: 'trans-male', text: 'Trans Male' },
        { value: 'trans-female', text: 'Trans Female' },
        { value: 'other', text: 'Other' }
      ]
    };
  },
  methods: {
    handeleChangeValue() {
      console.log('form ', this.form);
      console.log('form check', this.form.check());
      console.log('form get', this.form.get());
    }

  },
  mounted() {
    console.log('personalInfo ', this.user.personalInfo)
  }
};
</script>

<style lang="scss" scoped></style>
