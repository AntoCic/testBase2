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
      <div v-if="$s.userJWT" class="col-12 col-md-8 mx-auto">
        <h2>logged</h2>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
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
