<script setup lang="ts">
import { onBeforeMount, ref, computed, unref, watch } from 'vue'
import { latest } from '@/api/currencyExchange'
import { useCurrencyStore } from '@/stores/currencies'
import VCard from '@/components/VCard.vue'
import PageLoader from '@/components/PageLoader.vue'

type Rate = {
  code: string
  rate: number
}

const latestRates = ref<Rate[]>([])
const loading = ref(false)
const currencyStore = useCurrencyStore()
const baseCurrency = computed(() => currencyStore.baseCurrency)

const normalizeRates = (rates: Record<string, number>): Rate[] => {
  return Object.entries(rates).map(([code, rate]) => ({ code, rate: Number(rate.toFixed(2)) }))
}

const loadRates = () => {
  loading.value = true

  latest({ base: unref(baseCurrency) })
    .then((rates) => {
      latestRates.value = normalizeRates(rates)
    })
    .finally(() => {
      loading.value = false
    })
}

watch(baseCurrency, () => loadRates())
onBeforeMount(() => loadRates())
</script>

<template>
  <main class="currencies-view container">
    <PageLoader v-if="loading" />
    <h1 class="currencies-view__title">Currencies</h1>
    <div class="currencies-view__rates">
      <VCard
        v-for="{ rate, code } in latestRates"
        :key="code"
        class="currencies-view__currency-card"
      >
        <p class="currencies-view__currency">{{ code }}</p>
        <p class="currencies-view__currency-rate">{{ `1 ${baseCurrency} = ${rate} ${code}` }}</p>
      </VCard>
    </div>
  </main>
</template>

<style lang="scss">
.currencies-view {
  &__title {
    margin-top: 32px;
    margin-bottom: 24px;
  }

  &__rates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  &__currency {
    font-size: 18px;
    font-weight: 500;
  }

  &__currency-rate {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .currencies-view {
    &__title {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    &__rates {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media (max-width: 428px) {
  .currencies-view {
    &__rates {
      grid-template-columns: 1fr;
    }
  }
}
</style>
