import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Currency } from '@/types/currency'
import { getCurrencies } from '@/api/currencyExchange'

const DEFAULT_CURRENCY = 'USD'

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref(DEFAULT_CURRENCY)
  const currencies = ref<Currency[]>([])

  async function loadCurrencies() {
    currencies.value = await getCurrencies()
  }

  function setBaseCurrency(newCurrency: string) {
    baseCurrency.value = newCurrency
  }

  return { baseCurrency, currencies, loadCurrencies, setBaseCurrency }
})
