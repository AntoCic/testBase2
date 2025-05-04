<!-- App.vue -->
<template>
  <CmpLoading v-if="$s.isLogged !== null ? $loading.state : false" />

  <Toast />
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
import Toast from './components/toast/Toast.vue';

export default {
  components: { AppHeader, AppFooter, CmpLoading, DeveloperMode, Toast },
  data() {
    return {
      user,
      routes,
      dbSync,
      todos,
      todoTypes,

      pingInterval: null,
      isPinging: false,
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

    async drainOfflineActions() {
      localStorage.setItem('offlineActions', JSON.stringify(appointmentLocalToPush));
    },

    async forceGetTabs(tabsName) {
      if (tabsName.length) {
        const catchGetTab = (error, tabNameToGet) => {
          console.log('Errore nel recupero della tab ' + tabNameToGet, error);
          this.dbSync.deleteLocal(tabNameToGet);
        };

        const promises = tabsName.map((tabNameToGet) => {
          switch (tabNameToGet) {
            case 'auth_todo':
              return todos.getAndSyncLocal()
                .catch((error) => catchGetTab(error, tabNameToGet));

            case 'auth_todoType':
              return todoTypes.getAndSyncLocal()
                .catch((error) => catchGetTab(error, tabNameToGet));

            case 'user_personalInfo':
              return user.personalInfo.getAndSyncLocal()
                .catch((error) => catchGetTab(error, tabNameToGet));

            default:
              log.warn(`Sync tab ${tabNameToGet} non gestito`);
              return Promise.resolve();
          }
        });
        await Promise.allSettled(promises);
      }
      await this.$s.offlineActions.drain();
    },

    startPingLoop() {
      if (this.pingInterval || this.$s.pingSyncMS <= 0 || !this.$s.isLogged) return;
      this.isPinging = true;
      this.dbSync.tableToUpdate()
        .then(async (res) => { await this.forceGetTabs(res); this.isPinging = false; this.failedPings = 0; })
        .catch((error) => { console.warn('Ping falliti', error); this.isPinging = false; })

      this.pingInterval = setInterval(async () => {
        if (this.isPinging === false) {
          this.isPinging = true;

          return await this.dbSync.tableToUpdate()
            .then(async (res) => {
              await this.forceGetTabs(res);
              this.isPinging = false;
              this.failedPings = 0;
            })
            .catch((error) => {
              this.failedPings++;
              this.isPinging = false;

              if (this.failedPings === 1) {
                console.warn('Ping falliti', error);
                this.$toast.warning({ title: 'Ops! Ritardo sincronizzazione', message: 'Stiamo incontrando qualche difficoltà a recuperare i dati. Riproviamo...' });
              } else if (this.failedPings % 10 === 0) {
                console.warn(`Ancora problemi dopo ${this.failedPings} tentativi:`, error);
                this.$toast.error({ title: 'Problema persistente. Aggiorna!!', message: `Non riusciamo a sincronizzare i dati dopo ${this.failedPings} tentativi. Prova a ricaricare la pagina o controlla la connessione.` });
              }

            })
        }

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