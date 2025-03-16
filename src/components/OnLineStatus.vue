<template>
  <span v-if="$s.onLine" class="material-symbols-outlined" :class="$attrs.class" :style="$attrs.style"> cloud </span>
  <span v-else class="material-symbols-outlined" :class="$attrs.class" :style="$attrs.style"> cloud_off </span>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped></style>
