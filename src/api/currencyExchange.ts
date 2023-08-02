import axiosClient from './client'
import { type Currency } from '@/types/currency'
const BASE_URL = '/v1'
const API_KEY = 'sCgz1CNDkwJvndDqnvMp23g5J9y9Vc10'

type ResponceCurrencyType = {
  code: string
  name: string
  symbol: string
  short_code: string
}

type ConvertParams = {
  from: string
  to: string
  amount: number
}

type LatestParams = {
  base: string
  symbols?: string[]
}

export function getCurrencies(): Promise<Currency[]> {
  return axiosClient
    .get(`${BASE_URL}/currencies/`, {
      params: {
        api_key: API_KEY
      }
    })
    .then(({ data }: { data: Record<string, ResponceCurrencyType> }) => {
      return Object.values(data).map((currency: ResponceCurrencyType) => ({
        symbol: currency.symbol,
        name: currency.name,
        code: currency.short_code
      }))
    })
}

export function convert({ from, to, amount }: ConvertParams) {
  return axiosClient
    .get(`${BASE_URL}/convert/`, {
      params: {
        api_key: API_KEY,
        from,
        to,
        amount
      }
    })
    .then(({ data }) => {
      return data
    })
}

export function latest({ base, symbols = [] }: LatestParams) {
  return axiosClient
    .get(`${BASE_URL}/latest/`, {
      params: {
        api_key: API_KEY,
        base,
        symbols
      }
    })
    .then(({ data }) => {
      return data.rates
    })
}
