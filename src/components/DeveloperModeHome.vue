<template>

  <BtnModal name="test" @onConfirm="elimina" @onHide="annulla" />
  <hr>
  <button type="button" class="btn btn-primary" @click="dbSyncGet"> call </button>
  <div v-if="response.length" class="col-12">
    <pre class="bg-light text-dark">{{ response }}</pre>
  </div>
  <hr>
</template>

<script>
import { dbSync } from '../stores/dbSync';
import BtnModal from './BtnModal.vue';

export default {
  name: 'DeveloperModeHome',
  components: { BtnModal },
  data() { return { dbSync, response: [], }; },
  methods: {
    dbSyncGet() {
      dbSync.get()
        .then((res) => { this.response.push(res); })
        .catch((err) => { this.response.push(this.$s.axiosError(err)); });
    },
    elimina() {
      console.log('elimino');
    },
    annulla() {
      console.log('annulla');
    }
  },
};
</script>

<style lang="scss"></style>
