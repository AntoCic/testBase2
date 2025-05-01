<template>
  <BtnModal name="test" @onConfirm="cleanLocalStorage" @onHide="annulla" icon="autorenew" body="Sei sicuro di voler cancellare tutto il contenuto del local storage?" header="Clean localStorage" />
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
    cleanLocalStorage() {
      localStorage.removeItem('user_personalInfo');
      localStorage.removeItem('auth_todo');
      localStorage.removeItem('auth_todoType');
      localStorage.removeItem('dbSync');
      this.response.push('Local Storage pulito');
      
    },
    annulla() {
      console.log('annulla');
    }
  },
};
</script>

<style lang="scss"></style>
