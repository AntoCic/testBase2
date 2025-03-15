<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>Call</h1>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-outline-light" @click="sendError">ERROR</button>
        <button type="button" class="btn btn-outline-light" @click="sendWarning">WARNING</button>
        <button type="button" class="btn btn-outline-light" @click="sendInfo">INFO</button>
      </div>
      <div v-if="response.length" class="col-12">
        <pre class="bg-light text-dark">{{ response }}</pre>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      response: [],
    };
  },
  methods: {
    async sendError() {
      await axios.post('/api/slackMsg', { msg: 'TEST oggi 123456' })
        .then((res) => { this.response.push(res.data); })
        .catch((err) => { this.response.push(this.$s.axiosError(err)); });
    },
    async sendWarning() {
      await axios.post('/api/slackMsg', { type: 'warning', msg: 'TEST oggi 123456' })
        .then((res) => { this.response.push(res.data); })
        .catch((err) => { this.response.push(this.$s.axiosError(err)); });
    },
    async sendInfo() {
      await axios.post('/api/slackMsg', { type: 'info', msg: 'TEST oggi 123456' })
        .then((res) => { this.response.push(res.data); })
        .catch((err) => { this.response.push(this.$s.axiosError(err)); });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
