<template>
  <div class="v-spinner" />
</template>

<style lang="scss">
.v-spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top-color: #006fe8;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
