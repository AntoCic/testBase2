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

    <div class="row">
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">
          {{ $s.appName }} - {{ $s.appShortName }} - {{ $s.appVersion }}
        </h1>
        <p class="mb-1">{{ $s.appDescription }}</p>
      </div>
      <div class="col">
        <button type="button" class="btn btn-outline-light" @click="getSender1">GET1</button>
        <button type="button" class="btn btn-outline-light" @click="getSender2">GET2</button>
        <button type="button" class="btn btn-outline-light" @click="getSender3">GET3</button>
        <button type="button" class="btn btn-outline-light" @click="getEnv">getEnv</button>
        <button type="button" class="btn btn-outline-light" @click="postSender">POST</button>
        <button type="button" class="btn btn-outline-light" @click="putSender">PUT</button>
        <button type="button" class="btn btn-outline-light" @click="patchSender">PATCH</button>
        <button type="button" class="btn btn-outline-light" @click="deleteSender">DELETE</button>
      </div>
      <div v-if="$s.userJWT" class="col-12 mt-3">
        <h2>logged</h2>
      </div>
      <div class="col-12 mt-3">
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
      env:''
    };
  },
  methods: {
    async getSender1() {
      await axios.get('/api/', {
        params: {
          ID: 12345
        },
        headers:{
          authorization:this.$s.userJWT
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getSender2() {
      await axios.get('/api/test', {
        params: {
          ID: 12345
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getSender3() {
      await axios.get('/api/test3/pippo/cc?name=st%C3%A5le&car=saab', {
        params: {
          ID: 12345
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getEnv() {
      await axios.get('/api/getEnv')
        .then((res) => {
          console.log(res.data);
          this.env = res.data
        })
        .catch((err) => {
          console.log(err);
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async putSender() {
      await axios.put('/api/aa/bb/cc', { msg: 'PUT' })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async patchSender() {
      await axios.patch('/api/aa/bb/cc', { msg: 'PATCH' })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteSender() {
      await axios.delete('/api/aa/bb/cc', { msg: 'DELETE' })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
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
