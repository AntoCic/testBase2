<template>
  
  <BtnModal name="test" @onConfirm="elimina" @onHide="annulla" />
</template>

<script>
import BtnModal from './BtnModal.vue';

export default {
  name: 'DeveloperModeHome',
  components: { BtnModal },
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
