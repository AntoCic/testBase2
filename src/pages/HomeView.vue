<template>
  <div class="container my-auto text-white">
    <div class="row">
      <div class="col-6">
        <a class="logo text-end" href="https://getbootstrap.com/docs/5.3/getting-started/introduction" target="_blank">
          <img src="../assets/img/bootstrap.svg" alt="logo Bootstrap">
        </a>
      </div>
      <div class="col-6">
        <a class="logo" href="https://vuejs.org/guide/quick-start.html" target="_blank">
          <img src="../assets/img/vue.svg" alt="logo Vue">
        </a>
      </div>
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">
          {{ $s.appName }} - {{ $s.appShortName }} - {{ $s.appVersion }}
        </h1>
        <p class="mb-1">{{ $s.appDescription }}</p>
      </div>



      <div v-if="store.userJWT" class="col-12 col-md-8 mx-auto">
        <h2>logged</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  width: 100%;

  img {
    width: 100%;
    max-width: 100px;
  }
}
</style>
