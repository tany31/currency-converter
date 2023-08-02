<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { convert } from '@/api/currencyExchange'
import { type Currency } from '@/types/currency'
import { useCurrencyStore } from '@/stores/currencies'

import VCard from '@/components/VCard.vue'
import VInput from '@/components/VInput.vue'
import VSelect from '@/components/VSelect.vue'
import VButton from '@/components/VButton.vue'
import IconArrows from '@/components/icons/IconArrows.vue'
import VSpinner from '@/components/VSpinner.vue'

const currencyStore = useCurrencyStore()
const { loadCurrencies } = currencyStore
const baseCurrency = computed(() => currencyStore.baseCurrency)
const currencies = computed(() => currencyStore.currencies)
const amountFrom = ref('')
const amountTo = ref('')
const from = ref(baseCurrency.value)
const to = ref('')
const loading = ref(false)

onBeforeMount(() => {
  loadCurrencies()
})

const formattedCurrencies = computed(() => {
  return currencies.value.map((currency) => ({ name: currency.code, value: currency.code }))
})

const getCurrencyValue = (currency: Currency): string => {
  return currency.code
}

const disabledConvertButton = computed(() => {
  return !from.value || !to.value || !amountFrom.value
})

const switchСurrencies = () => {
  const tempCurrency = to.value
  to.value = from.value
  from.value = tempCurrency
}

const handleConvert = () => {
  loading.value = true

  convert({ from: from.value, to: to.value, amount: Number(amountFrom.value) })
    .then(({ value }) => {
      amountTo.value = value.toFixed(2)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <form class="exchange-form" @submit.prevent="handleConvert">
    <VCard>
      <div class="exchange-form__row">
        <div class="exchange-form__currency">
          <VSelect
            v-model="from"
            :options="formattedCurrencies"
            :get-value="getCurrencyValue"
            placeholder="From"
          />
          <VInput v-model.value="amountFrom" placeholder="Amount" />
        </div>
        <VButton text icon @click="switchСurrencies">
          <IconArrows class="exchange-form__icon-arrows" />
        </VButton>
        <div class="exchange-form__currency">
          <VSelect
            v-model="to"
            :options="formattedCurrencies"
            :get-value="getCurrencyValue"
            placeholder="To"
          />
          <VInput :model-value="amountTo" readonly placeholder="Amount" />
        </div>
      </div>
      <div class="exchange-form__footer">
        <VSpinner v-if="loading" />
        <VButton
          class="exchange-form__button"
          :disabled="loading || disabledConvertButton"
          type="submit"
          >Convert</VButton
        >
      </div>
    </VCard>
  </form>
</template>

<style lang="scss">
.exchange-form {
  &__row {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  &__footer {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    margin-top: 24px;
  }

  &__currency {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
  }

  &__icon-arrows {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .exchange-form {
    &__row {
      flex-direction: column;
    }

    &__icon-arrows {
      transform: rotate(90deg);
    }
  }
}
</style>
