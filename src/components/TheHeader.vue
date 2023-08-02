<script setup lang="ts">
import { onBeforeMount, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCurrencyStore } from '@/stores/currencies'
import VSelect from '@/components/VSelect.vue'

const currencyStore = useCurrencyStore()
const { loadCurrencies, setBaseCurrency } = currencyStore
const currencies = computed(() => currencyStore.currencies)
const baseCurrency = computed(() => currencyStore.baseCurrency)

const formattedCurrencies = computed(() => {
  return currencies.value.map((currency) => ({ name: currency.code, value: currency.code }))
})

onBeforeMount(() => {
  loadCurrencies()
})
</script>

<template>
  <header class="the-header">
    <div class="container the-header__container">
      <nav class="the-header__nav">
        <RouterLink class="the-header__link" to="/">Convert</RouterLink>
        <RouterLink class="the-header__link" to="/currencies">Currencies</RouterLink>
      </nav>
      <VSelect
        class="the-header__currency-select"
        :model-value="baseCurrency"
        :options="formattedCurrencies"
        @update:model-value="setBaseCurrency"
      />
    </div>
  </header>
</template>

<style lang="scss">
.the-header {
  position: sticky;
  height: 64px;
  top: 0;
  width: 100%;
  background: #0a146e;
  color: #fff;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
  }

  &__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }

  &__link {
    color: #fff;
    text-decoration: none;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: transparent;
      transition: background-color 0.2s;
    }

    &.router-link-active,
    &:hover {
      &:after {
        background-color: currentColor;
      }
    }
  }

  &__currency-select {
    margin-left: auto;
    width: 80px;
    height: 42px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    background-color: transparent;
    color: #fff;
    border-color: transparent;
  }
}
</style>
