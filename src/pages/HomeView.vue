<template>
  <div class="container my-auto text-white">

    <div class="row justify-content-center">
      <div class="col-3">
        <a href="https://vuejs.org/guide/quick-start.html" target="_blank">
          <img class="logo-shadows" src="/img/home/vue.svg" alt="logo Vue">
        </a>
      </div>
      <div class="col-3">
        <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction" target="_blank">
          <img class="logo-shadows" src="/img/home/bootstrap.svg" alt="logo Bootstrap">
        </a>
      </div>
      <div class="col-3">
        <a href="https://console.firebase.google.com/" target="_blank">
          <img class="logo-shadows" src="/img/home/firebase.svg" alt="logo Vue">
        </a>
      </div>
      <div class="col-3">
        <a href="https://app.netlify.com/" target="_blank">
          <img class="logo-shadows" src="/img/home/netlify.svg" alt="logo Vue">
        </a>
      </div>
    </div>

    <div class="row justify-content-center ">
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">
          {{ $s.appName }} - {{ $s.appShortName }} - {{ $s.appVersion }}
        </h1>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-light" @click="callGet">test call GET</button>
        <button type="button" class="btn btn-outline-light" @click="callGetAuth">test call GET AUTH</button>
        <button type="button" class="btn btn-outline-light" @click="postSender">POST</button>
        <button type="button" class="btn btn-outline-light" @click="putSender">PUT</button>
        <button type="button" class="btn btn-outline-light" @click="patchSender">PATCH</button>
        <button type="button" class="btn btn-outline-light" @click="deleteSender">DELETE</button>
      </div>
      <div v-if="responce.length" class="col-12">
        <pre class="bg-light text-dark">{{ responce }}</pre>
      </div>
      <div class="col-12 mt-3">
        <p class="mb-1">{{ $s.appDescription }}</p>
        <CmpConvertEnv />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import CmpConvertEnv from '../components/CmpConvertEnv.vue';
export default {
  components: { CmpConvertEnv },
  data() {
    return {
      responce: [],
    };
  },
  methods: {
    async callGet() {
      await axios.get('/api/')
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },

    async callGetAuth() {
      await axios.get('/api/', { params: { test: 'hola' }, headers: { authorization: this.$s.userJWT } })
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },


    async postSender() {
      await axios.post('/api/aa/bb/cc', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }, {
        params: {
          ID: 12345
        },
        headers: {
          authorization: "pippo",
          'Content-Type': "application/json"
        }
      }
      )
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },
    async putSender() {
      await axios.put('/api/aa/bb/cc', { msg: 'PUT' })
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },
    async patchSender() {
      await axios.patch('/api/aa/bb/cc', { msg: 'PATCH' })
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },
    async deleteSender() {
      await axios.delete('/api/aa/bb/cc', { msg: 'DELETE' })
        .then((res) => {
          this.responce.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          this.responce.push(err);
        });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.logo-shadows {
  width: 100%;
  max-width: 100px;
}
</style>
