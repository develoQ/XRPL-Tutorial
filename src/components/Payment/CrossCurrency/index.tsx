import { useCallback } from 'react'
import { Payment } from 'xrpl'

import { OnSubmitProps, OnSubmitReturnType, TransactionCodeEditor } from '@/components/TransactionEditor'
import { useWallet } from '@/hooks/useWallet'

/**
 * Pay Token to account
 */
export const CrossCurrency = () => {
  const { account } = useWallet()

  const checkCode = useCallback(async (tx: OnSubmitProps<Payment>): Promise<OnSubmitReturnType> => {
    if (tx.meta?.TransactionResult === 'tesSUCCESS') {
      // OK
      // TODO: check if DeliveredAmount is 10 USD
      const delivered_amount = tx.meta?.delivered_amount
      if (typeof tx.Amount !== 'object') {
        return {
          success: false,
          message: 'AmountにはUSDの額を指定しましょう。',
        }
      }
      if (typeof tx.SendMax !== 'string') {
        return {
          success: false,
          message: 'SendMaxにはXRP(drop)の額を指定しましょう。',
        }
      }
      if (
        typeof delivered_amount === 'object' &&
        delivered_amount.currency === 'USD' &&
        delivered_amount.value === '10'
      ) {
        return {
          success: true,
        }
      } else {
        return {
          success: false,
          message: '送金額が一致しません。',
        }
      }
    } else {
      // NG
      return {
        success: false,
        message: 'トランザクションが失敗しました。',
      }
    }
  }, [])

  return (
    <div>
      <TransactionCodeEditor<Payment>
        validTransactionType='Payment'
        json={{
          TransactionType: 'Payment',
          Account: account?.address || '',
          Destination: '',
          Amount: {
            issuer: 'rg2MAgwqwmV9TgMexVBpRDK89vMyJkpbC',
            currency: 'USD',
            value: '',
          },
          SendMax: '',
        }}
        onSubmit={(tx) => checkCode(tx)}
      />
    </div>
  )
}
