import { getAccount } from '@wagmi/core'
import { config } from './wagmi'
import { Address } from '@/types/address'

export function getUserAddress(): Address {
  const account = getAccount(config)
  return account.address as Address
}
