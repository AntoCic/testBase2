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
      <div v-if="response.length" class="col-12">
        <pre class="bg-light text-dark">{{ response }}</pre>
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
      response: [],
    };
  },
  methods: {
    async callGet() {
      await axios.get('/api/')
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.error) {
            this.response.push(err.response.data);
          } else {
            this.response.push(err);
          }
        });
    },

    async callGetAuth() {
      await axios.get('/api/', { params: { test: 'hola' }, headers: { authorization: this.$s.accessToken } })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosErrror(err));
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
      }
      )
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosErrror(err));
        });
    },
    async putSender() {
      await axios.put('/api/aa/bb/cc', { msg: 'PUT' },{
        params: {
          ID: 12345
        },
      })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosErrror(err));
        });
    },
    async patchSender() {
      await axios.patch('/api/aa/bb/cc', { msg: 'PATCH' },{
        params: {
          ID: 12345
        },
      })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosErrror(err));
        });
    },
    async deleteSender() {
      await axios.delete('/api/aa/bb/cc', { params: { chiave: 1234567890000999 }, headers: { holla: 'pippo'} })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.this.$s.axiosErrror(err));
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
