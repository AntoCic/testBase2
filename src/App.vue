<!-- App.vue -->
<template>
  <CmpLoading v-if="$s.isLogged !== null ? $loading.state : false" />

  <template v-if="$s.isLogged !== null">
    <AppHeader />
    <main class="d-flex">
      <RouterView />
    </main>
    <AppFooter />
  </template>
  <div v-else class="starter-loader"></div>
  <DeveloperMode />
</template>

<script>
import { user } from './stores/user.js';
import { routes } from './router.js';
import AppHeader from './layout/AppHeader.vue';
import AppFooter from './layout/AppFooter.vue';
import CmpLoading from './components/CmpLoading.vue';
import DeveloperMode from './components/DeveloperMode.vue';
export default {
  components: { AppHeader, AppFooter, CmpLoading, DeveloperMode },
  data() {
    return {
      user,
      routes,
    }
  },
  watch: {
    'user.isLogged'(newLog, oldLog) {
      if (newLog !== oldLog) {
        this.$s.accessToken = user.accessToken;
        this.$s.isLogged = newLog;
        if (newLog) {
          this.$s.onLogin();
        } else {
          this.$s.onLogout();
        }
        this.checkRoute();
      }
    },
    '$route.name'(newRoute, oldRoute) {
      if (newRoute && newRoute !== oldRoute) {
        this.checkRoute();
      }
    },
  },

  methods: {
    checkRoute() {
      if (this.$s.isLogged) {
        if (this.routes.notAuth.includes(this.$route.name)) {
          this.$router.push({ name: 'home' });
        }
      } else {
        if (this.routes.auth.includes(this.$route.name)) {
          this.$router.push({ name: 'home' });
        }
      }
    },
    updateOnlineStatus() { this.$s.onLine = navigator.onLine; },
  },

  async mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

    await this.$s.start();
    this.user.checkLogged();
  },
}
</script>

<style lang="scss">
/*
@use './style/partials/_variables.scss' as *;
@use '../style/partials/_variables.scss' as *;
*/
</style>