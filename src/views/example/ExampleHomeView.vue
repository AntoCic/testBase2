<template>
  <div class="container my-auto text-white">

    <div class="row justify-content-center align-items-center text-center">
      <div class="col-12">
        <h1>PAGINE ESEMPIO</h1>
      </div>
      <template v-for="(page, index) in pages" :key="page.name?? page.hrKey">
        <div v-if="page.hrKey" class="col-12 mt-3">
          <h3 v-if="page.description" class="mb-0">
            {{ page.description }}
          </h3>
          <hr class="mt-1">
        </div>
        <div v-else class="col-12 col-md-6 col-lg-4 my-2">
          <RouterLink :to="{ name: 'example.' + page.name }">
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

      </template>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { hrKey: '1', description: 'Esempio di tutte le chiamate axios' },
        { name: 'call', description: 'GET POST PUT PATCH DELETE' },

        { hrKey: '2', description: 'Input' },
        { name: 'InputText' },
        { name: 'InputTextIcon' },
        { name: 'InputEmail' },
        { name: 'InputPassword' },
        { hrKey: '3' },
        { name: 'InputNumber' },
        { name: 'InputPrice' },
        { name: 'InputRange' },
        { hrKey: '4' },
        { name: 'InputSelect' },
        { name: 'InputCheckbox' },
        { name: 'InputBtnCheckbox' },
        { name: 'InputRadio' },
        { hrKey: '5' },
        { name: 'InputDate' },
        { name: 'InputTime' },
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
