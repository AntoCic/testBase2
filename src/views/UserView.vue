<template>
  <div class="container my-auto">
    <div class="row text-center p-3">
      <div class="col">
        <img :src="user.photoURL" alt="User Photo" class="rounded-circle">
        <p>{{ user.name }}</p>
        <div class="input-group">
          <InputText inputGroup field="name" label lazy v-model="form" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="surname" label lazy v-model="form" />
        </div>
        <div class="input-group">
          <InputSelect inputGroup field="gender" label v-model="form" :options="$u.genderOptions"
            emptyOption="Prefer not to say" />
        </div>
        <div class="input-group">
          <InputDate inputGroup field="dateOfBirth" label v-model="form" />
          <InputCheckbox inputGroup field="birthHideYear" v-model="form" label="Nascondi anno di nascita" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="email" lazy label v-model="form" />
        </div>
        <div class="input-group">
          <InputText inputGroup field="phoneNumber" lazy label v-model="form" />
        </div>
        <!-- <div class="input-group">
          <InputText inputGroup field="photoURL" label v-model="form" />
        </div> -->

        <p>{{ user.uid }}</p>
        <button v-if="user.accessToken" @click="user.logout()" class="btn btn-outline-danger px-2">
          <span v-if="user.name" class="me-1">{{ user.name }}</span>
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
    };
  },
  methods: {
  },
  mounted() {
    console.log('personalInfo ', this.user.personalInfo);
    this.form.onChange = (trigger) => {
      if (trigger.check) {
        user.personalInfo.updateAndSyncLocal({ [trigger.field]: trigger.value })
      }
    }
    this.form.state.logsOn = true
  }
};
</script>

<style lang="scss" scoped></style>
