<template>
  <div class="container my-auto">
    <div class="row text-center p-3">
      <div class="col">
        <img :src="user.photoURL" alt="User Photo" class="rounded-circle">
        <p>{{ user.displayName }}</p>
        <p v-if="user.personalInfo?.userName">{{ user.personalInfo.userName }}</p>
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
export default {
  data() {
    return {
      user,
    };
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped></style>
