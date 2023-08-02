<script setup lang="ts">
import ExchangeForm from '@/components/ExchangeForm.vue'
</script>

<template>
  <main class="convert-view container">
    <h1 class="convert-view__title">Convert</h1>
    <ExchangeForm class="convert-view__form" />
  </main>
</template>

<style lang="scss">
.convert-view {
  &__form {
    width: 100%;
  }

  &__title {
    margin-top: 32px;
    margin-bottom: 24px;
  }
}
</style>
