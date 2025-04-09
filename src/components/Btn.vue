<template>
  <button :type="type ?? 'button'" :class="`btn btn-${btn}`" :disabled="isDisabled">
    <span v-if="loading" :class="`spinner-grow spinner-grow-sm${isShowTextLoading ? ' me-1' : ''}`"></span>
    <template v-else>
      <span v-if="!!googleIcon" :class="`material-symbols-outlined${!!$slots.default ? ' me-1' : ''}`">
        {{ googleIcon }}
      </span>
      <slot v-if="!!$slots.default ? true : !googleIcon">
        <span class="material-symbols-outlined">
          warning
        </span>
      </slot>

    </template>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    type: {
      type: String,
      required: false
    },
    btn: {
      type: String,
      default: 'outline-primary'
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    showTextLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    googleIcon: {
      type: String,
      default: false
    },
  },
  computed: {
    isDisabled() {
      return this.disabled !== undefined ? this.disabled : !!this.loading
    },
    isShowTextLoading() {
      return this.loading !== undefined ? (this.loading && this.showTextLoading) : true
    },
  },
};
</script>

<style lang="scss" scoped></style>
