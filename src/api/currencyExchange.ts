import axiosClient from './client'
import { type Currency } from '@/types/currency'
const BASE_URL = 'https://api.freecurrencyapi.com/v1'
const API_KEY = 'fca_live_PkxAHS6EiObaekPza3LPENwG56IwdYxBaAO8828r'

type ResponceCurrencyType = {
  code: string
  name: string
  symbol: string
}

type ResponceCurrencyDataType = {
  data: Record<string, ResponceCurrencyType>
}

type ResponceLatestType = {
  data: Record<string, number>
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
        apikey: API_KEY
      }
    })
    .then(({ data }: { data: ResponceCurrencyDataType }) => {
      return Object.values(data.data).map((currency: ResponceCurrencyType) => ({
        symbol: currency.symbol,
        name: currency.name,
        code: currency.code
      }))
    })
}

export function convert({ from, to, amount }: ConvertParams) {
  return axiosClient
    .get(`${BASE_URL}/latest/`, {
      params: {
        apikey: API_KEY,
        base_currency: from,
        currencies: to
      }
    })
    .then(({ data }) => {
      return (data.data[to] * amount).toPrecision(2)
    })
}

export function latest({ base, symbols = [] }: LatestParams) {
  return axiosClient
    .get(`${BASE_URL}/latest/`, {
      params: {
        apikey: API_KEY,
        base_currency: base,
        currencies: symbols
      }
    })
    .then(({ data }: { data: ResponceLatestType }) => {
      return Object.entries(data.data).map(([code, rate]) => ({
        code,
        rate: Number(rate.toPrecision(2))
      }))
    })
}
