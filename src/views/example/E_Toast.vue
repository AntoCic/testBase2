<template>
  <div class="container text-white py-5">
    <h1 class="mb-4 text-center">📢 Toast Demo</h1>

    <div class="row g-3">
      <div class="col-12 col-md-6 p-3">
        <h5>Toast semplici</h5>
        <button class="btn btn-info w-100 mb-2" @click="showToast('info')">Info</button>
        <button class="btn btn-success w-100 mb-2" @click="showToast('success')">Success</button>
        <button class="btn btn-warning w-100 mb-2" @click="showToast('warning')">Warning</button>
        <button class="btn btn-danger w-100 mb-2" @click="showToast('error')">Error</button>
        <button class="btn btn-secondary w-100 mb-2" @click="showToast('secondary')">Secondary</button>
        <button class="btn btn-primary w-100 mb-2" @click="showToast('primary')">Primary</button>
      </div>

      <div class="col-12 col-md-6 p-3">
        <h5>Toast con messaggio e durata personalizzata</h5>
        <button class="btn btn-outline-light w-100 mb-2"
          @click="showToast('success', 'Operazione completata!', 'Con successo, Metodo toast non disponibile Metodo toast non disponibile', 7000)">
          Success 7s con messaggio
        </button>
        <button class="btn btn-outline-warning w-100 mb-2"
          @click="showToast('warning', 'Attenzione!', 'Controlla i dati', 8000)">
          Warning 8s con descrizione
        </button>
      </div>

      <div class="col-12 p-3">
        <h5>Toast con icona personalizzata (SVG)</h5>
        <button class="btn btn-outline-info w-100 mb-2" @click="customLogoToast">
          Info con logo custom (SVG)
        </button>
      </div>

      <div class="col-12 p-3">
        <h5>Toast da offlineActions</h5>
        <button class="btn btn-outline-info w-100 mb-2" @click="offlineActionsToast">offlineActions</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastDemo',
  methods: {
    showToast(type, title = '', message = '') {
      if (!this.$toast || typeof this.$toast[type] !== 'function') {
        console.error('Metodo toast non disponibile:', type);
        return;
      }

      if (title === '') title = `Notifica ${type}`;

      this.$toast[type]({ title, message });
    },
    customLogoToast() {
      this.$toast.info({
        title: 'Info Custom',
        message: 'Con una tua icona SVG!',
        logo: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
        `
      }, 6000);
    },
    offlineActionsToast() {
      this.$s.offlineActions.push('test', null, 'test offlineAction');
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #121212;
  border-radius: 12px;
}

h1,
h5 {
  color: #ffffff;
}
</style>
