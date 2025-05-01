<template>
  <div class="container my-auto text-white">
    <div class="row justify-content-center text-center">
      <div class="col-12 mb-3">
        <h1>Call</h1>
      </div>
      <div class="col-12">
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
    async callGet() {
      await axios.get('/api/public/test')
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
      await axios.get('/api/auth/test', { params: { test: 'hola' }, headers: { authorization: this.$s.accessToken } })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosError(err));
        });
    },


    async postSender() {
      await axios.post('/api/public/test/bb/cc', {
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
          this.response.push(this.$s.axiosError(err));
        });
    },
    async putSender() {
      await axios.put('/api/public/test/bb/cc', { msg: 'PUT' }, {
        params: {
          ID: 12345
        },
      })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosError(err));
        });
    },
    async patchSender() {
      await axios.patch('/api/public/test/bb/cc', { msg: 'PATCH' }, {
        params: {
          ID: 12345
        },
      })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosError(err));
        });
    },
    async deleteSender() {
      await axios.delete('/api/public/test/bb/cc', { params: { chiave: 1234567890000999 }, headers: { holla: 'pippo' } })
        .then((res) => {
          this.response.push(res.data);
        })
        .catch((err) => {
          this.response.push(this.$s.axiosError(err));
        });
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
