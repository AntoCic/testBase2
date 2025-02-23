<template>
  <div class="container my-auto">
    <div class="row text-center p-3">
      <div class="col">
        <img :src="user.photoURL" alt="User Photo" class="rounded-circle">
        <p>{{ user.displayName }}</p>
        <p v-if="user.personalInfo?.userName">{{ user.personalInfo.userName }}</p>
        <InputText field="name" :label="true" inline v-model="form" /> <br>
        <InputText field="surname" :label="true" inline v-model="form" /><br>
        <InputText field="gender" :label="true" inline v-model="form" /><br>
        <InputText field="dateOfBirth" :label="true" inline v-model="form" /><br>
        <InputText field="birthHideYear" :label="true" inline v-model="form" /><br>
        <InputText field="email" :label="true" inline v-model="form" /><br>
        <InputText field="phonePrefix" :label="true" inline v-model="form" /><br>
        <InputText field="phoneNumber" :label="true" inline v-model="form" /><br>
        <InputText field="photoURL" :label="true" inline v-model="form" />
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
import { user } from '../stores/user.js'
import InputText from '../components/formCmp/InputText.vue';
import { FormValidator } from '../personal_modules/FormValidator.js';

export default {
  components: { InputText },
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
