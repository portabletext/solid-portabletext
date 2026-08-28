import { Show } from 'solid-js'

import type { PortableTextTypeComponent } from '../../src'

export interface CurrencyAmountBlock {
  _type: 'currencyAmount'
  currency: string
  amount: number
}

interface CurrencySnapshotValue {
  flag: string
  currency: string
  rate: number
}

/**
 * Just a snapshot in time, don't use this for anything
 */
const snapshot: Record<string, CurrencySnapshotValue> = {
  DE: { flag: '🇩🇪', currency: 'EUR', rate: 0.879428 },
  ES: { flag: '🇪🇸', currency: 'EUR', rate: 0.879428 },
  FR: { flag: '🇫🇷', currency: 'EUR', rate: 0.879428 },
  GB: { flag: '🇬🇧', currency: 'GBP', rate: 0.733308 },
  JP: { flag: '🇯🇵', currency: 'JPY', rate: 115.232254 },
  NO: { flag: '🇳🇴', currency: 'NOK', rate: 8.765649 },
  SE: { flag: '🇸🇪', currency: 'SEK', rate: 9.030481 },
}

const CurrencyAmount: PortableTextTypeComponent<CurrencyAmountBlock> = props => {
  const currency = () => {
    const hasLanguages = typeof navigator !== 'undefined' && Array.isArray(navigator.languages)
    const languages: readonly string[] = hasLanguages ? navigator.languages : ['es']
    const withCurrency = languages
      .map(code => code.split('-').pop()!.toUpperCase())
      .find(lang => lang in snapshot)
    return withCurrency ? snapshot[withCurrency] : undefined
  }

  return (
    <>
      {props.value.amount} {props.value.currency}{' '}
      <Show when={currency()} keyed>
        {local => (
          <span style={{ background: '#eee' }}>
            (~ {(local.rate * props.value.amount).toFixed(2)} {local.currency} {local.flag})
          </span>
        )}
      </Show>
    </>
  )
}

export default CurrencyAmount
