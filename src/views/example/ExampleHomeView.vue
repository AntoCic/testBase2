<template>
  <div class="container my-auto text-white">

    <div class="row justify-content-center text-center">
      <div class="col-12">
        <h1>PAGINE ESEMPIO</h1>
      </div>
      <div v-for="page in pages" :key="page.name" class="col-12 my-2">
        <RouterLink :to="{ name: 'example.'+page.name }">
          <button type="button" class="btn btn-outline-light w-100">
            {{ page.name }}
            <template v-if="page.description">
              <hr class="my-1 mx-3">
              <span v-if="page.description" class="text-small text-secondary">
                {{ page.description }}
              </span>
            </template>
          </button>
        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { name: 'call', description: 'Esempio di tutte le chiamate axios' },
        { name: 'inputText' }
      ],
    };
  },
  methods: {
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>
