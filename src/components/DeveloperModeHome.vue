<template>
  
  <BtnModalConfirm name="test" @onConfirm="elimina" @onHide="annulla" />
</template>

<script>
import BtnModalConfirm from './BtnModalConfirm.vue';

export default {
  name: 'DeveloperModeHome',
  components: { BtnModalConfirm },
  methods: {
    elimina() {
      console.log('elimino');

    },
    annulla() {
      console.log('annulla');

    }
  },
  data() { return {}; }
};
</script>

<style lang="scss"></style>
