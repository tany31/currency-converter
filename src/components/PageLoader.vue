<script setup lang="ts">
import VSpinner from '@/components/VSpinner.vue'
</script>

<template>
  <div class="page-loader">
    <VSpinner class="page-loader__spinner" />
  </div>
</template>

<style lang="scss">
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000ab;

  &__spinner {
    width: 40px;
    height: 40px;
  }
}
</style>
