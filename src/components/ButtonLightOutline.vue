<template>
  <button :type="type ?? 'button'" class="btn btn-outline-light">
    <slot>
      ???
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false
    },
  },
};
</script>

<style lang="scss" scoped></style>
