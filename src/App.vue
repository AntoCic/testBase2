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
import { dbSync } from './stores/dbSync.js';
import AppHeader from './layout/AppHeader.vue';
import AppFooter from './layout/AppFooter.vue';
import CmpLoading from './components/CmpLoading.vue';
import DeveloperMode from './components/DeveloperMode.vue';
import { todos } from './stores/todos.js';
import { todoTypes } from './stores/todos.js';
import log from './personal_modules/log.js';
export default {
  components: { AppHeader, AppFooter, CmpLoading, DeveloperMode },
  data() {
    return {
      user,
      routes,
      dbSync,
      todos,
      todoTypes,

      pingInterval: null,
      failedPings: 0,
    }
  },
  watch: {
    'user.isLogged'(newLog, oldLog) {
      if (newLog !== oldLog) {
        this.$s.accessToken = user.accessToken;
        this.$s.isLogged = newLog;
        if (newLog) {
          this.$s.onLogin();
          this.startPingLoop();
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
    updateOnlineStatus() {
      this.$s.onLine = navigator.onLine;

      if (this.$s.onLine) {
        this.user.checkLogged();
        if (this.$s.pingSyncMS && this.$s.pingSyncMS > 0) {
          this.startPingLoop();
        } else {
          console.warn('PingSync non settato o 0.');
        }
      } else {
        this.stopPingLoop();
      }
    },
    setupOnlineListeners() {
      this.updateOnlineStatus();
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    },
    forceGetTabs(tabsName) {
      if (!tabsName.length) return;
      console.log('Tabs to get and sync', tabsName);

      const catchGetTab = (error, tabNameToGet) => {
        console.log('Errore nel recupero della tab ' + tabNameToGet, error);
        this.dbSync.deleteLocal(tabNameToGet);
      };

      for (const tabNameToGet of tabsName) {
        switch (tabNameToGet) {
          case 'auth_todo':
            todos.getAndSyncLocal().catch((error) => { catchGetTab(error, tabNameToGet); });
            break;

          case 'auth_todoType':
            todoTypes.getAndSyncLocal().catch((error) => { catchGetTab(error, tabNameToGet); });
            break;

          case 'user_personalInfo':
            user.personalInfo.getAndSyncLocal().catch((error) => { catchGetTab(error, tabNameToGet); });
            break;

          default:
            log.warn(`Sync tab ${tabNameToGet} non gestito`);
            break;
        }

      }
    },

    startPingLoop() {
      if (this.pingInterval || this.$s.pingSyncMS <= 0 || !this.$s.isLogged) return;
      this.dbSync.tableToUpdate()
        .then((res) => { this.forceGetTabs(res); this.failedPings = 0; })
        .catch((error) => { console.warn('Ping falliti', error); })
      this.pingInterval = setInterval(async () => {
        if (this.failedPings > 0) {
          this.failedPings++;
          if (this.failedPings >= 3) {
            console.warn(`Ping Falliti ${this.failedPings} volte.`);
          }
          return;
        }

        this.failedPings = 1;

        await this.dbSync.tableToUpdate()
          .then((res) => { this.forceGetTabs(res); this.failedPings = 0; })
          .catch((error) => { console.warn('Ping falliti', error); })

      }, this.$s.pingSyncMS);
    },
    stopPingLoop() {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
        this.failedPings = 0;
      }
    },
  },

  async mounted() {
    this.setupOnlineListeners();
    await this.$s.start();
  },
}
</script>

<style lang="scss">
/*
@use './style/partials/_variables.scss' as *;
@use '../style/partials/_variables.scss' as *;
*/
</style>