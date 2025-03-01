<template>
  <div class="container my-auto">
    <div class="row text-center p-3">
      <div class="col">
        <img :src="user.photoURL" alt="User Photo" class="rounded-circle">
        <p>{{ user.displayName }}</p>
        <p v-if="user.personalInfo?.userName">{{ user.personalInfo.userName }}</p>
        <div class="input-group"><InputText inputGroup field="name" :label="true" v-model="form" /></div>
        <div class="input-group"><InputText inputGroup field="surname" :label="true" v-model="form" /></div>
        <div class="input-group"><InputText inputGroup field="gender" :label="true" v-model="form" /></div>
        <div class="input-group">
          <InputText inputGroup field="dateOfBirth" :label="true" v-model="form" />
          <InputCheckbox inputGroup field="birthHideYear" v-model="form" label="Nascondi anno di nascita" />
        </div>
        <div class="input-group"><InputText inputGroup field="email" :label="true" v-model="form" /></div>
        <div class="input-group"><InputText inputGroup field="phonePrefix" :label="true" v-model="form" /></div>
        <div class="input-group"><InputText inputGroup field="phoneNumber" :label="true" v-model="form" /></div>
        <div class="input-group"><InputText inputGroup field="photoURL" :label="true" v-model="form" /></div>

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
import { user } from '../stores/user.js'
export default {
  components: { InputText, InputCheckbox },
  data() {
    return {
      user,
      form: new FormValidator({ ...user.personalInfo }),
    };
  },
  methods: {

  },
  mounted() {
    console.log('personalInfo ', this.user.personalInfo)
  }
};
</script>

<style lang="scss" scoped></style>
