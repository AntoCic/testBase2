<!-- App.vue -->
<template>
  <CmpLoading v-if="$loading.state || user.accessToken === null" />

  <template v-if="user.accessToken !== null">
    <AppHeader />
    <main class="d-flex">
      <RouterView />
    </main>
    <AppFooter />
  </template>
  <p v-else>.</p>
</template>

<script>
import { user } from './stores/user.js';
import { routes } from './router.js';
import AppHeader from './layout/AppHeader.vue'
import AppFooter from './layout/AppFooter.vue'
import CmpLoading from './components/CmpLoading.vue'
export default {
  components: { AppHeader, AppFooter, CmpLoading },
  data() {
    return {
      user,
      routes,
    }
  },
  
  watch: {
    'user.accessToken'(newLog, oldLog) {
      if (newLog !== oldLog) {
        this.$s.userJWT = newLog
        if (newLog) {
          this.$s.onLogin()
        } else {
          this.$s.onLogout()
        }
        this.checkRoute()
      }
    },
    '$route.name'(newRoute, oldRoute) {
      if (newRoute && newRoute !== oldRoute && user.accessToken !== null) {
        this.checkRoute()
      }
    },
  },

  methods: {
    checkRoute() {
      // se this.$s.userJWT non é null o false l'utente é loggato
      // dunque se loggato this.$s.userJWT sará considerato true
      if (this.$s.userJWT) {
        if (this.routes.notAuth.includes(this.$route.name)) {
          this.$router.push({ name: 'home' });
        }
      } else {
        if (this.routes.auth.includes(this.$route.name)) {
          this.$router.push({ name: 'home' });
        }
      }
    }
  },

  async mounted() {
    await this.$s.start()
    this.user.checkLogged()
  },
}
</script>

<style lang="scss">
/*
@use './style/partials/_variables.scss' as *;
@use '../style/partials/_variables.scss' as *;
*/
</style>