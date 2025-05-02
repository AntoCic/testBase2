<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>Slack Msg</h1>
      </div>
      <div class="col-12">
        <div class="input-group">
          <InputText field="textLog" v-model="form" />
          <Btn btn="outline-light" @click="log(form.textLog)">LOG (info)</Btn>
        </div>
        <div class="input-group">
          <InputText field="textError" v-model="form" />
          <Btn btn="outline-light" @click="sendError(form.textError)">ERROR</Btn>
        </div>
        <div class="input-group">
          <InputText field="textWarning" v-model="form" />
          <Btn btn="outline-light" @click="sendWarning(form.textWarning)">WARNING</Btn>
        </div>
        <div class="input-group">
          <InputText field="textInfo" v-model="form" />
          <Btn btn="outline-light" @click="sendInfo(form.textInfo)">INFO</Btn>
        </div>
      </div>
      <div v-if="response.length" class="col-12">
        <pre class="bg-light text-dark">{{ response }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import FormValidator from '../../personal_modules/form-validator/FormValidator.js';
import InputText from '../../personal_modules/form-validator/InputText.vue';
import Btn from '../../components/Btn.vue';
export default {
  components: { InputText, Btn },
  data() {
    return {
      response: '',
      form: new FormValidator({
        textLog: '',
        textError: '',
        textWarning: '',
        textInfo: '',
      }),
    };
  },
  methods: {
    async log(content) {
      this.$u.log(content).then((res) => {
        if (res) {
          this.response = 'msg sended (sendError)';
        } else {
          this.response = 'error NON inviato';
        }
      });
    },
    async sendError(content) {
      this.$u.log.error(content).then((res) => {
        if (res) {
          this.response = 'msg sended (sendError)';
        } else {
          this.response = 'error NON inviato';
        }
      });
    },
    async sendWarning(content) {
      this.$u.log.warning(content).then((res) => {
        if (res) {
          this.response = 'msg sended (sendWarning)';
        } else {
          this.response = 'error NON inviato';
        }
      });
    },
    async sendInfo(content) {
      this.$u.log.info(content).then((res) => {
        if (res) {
          this.response = 'msg sended (sendInfo)';
        } else {
          this.response = 'error NON inviato';
        }
      });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
