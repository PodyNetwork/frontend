import { getAccount } from '@wagmi/core'
import { config } from './wagmi'

export function getUserAddress(): string | undefined {
  const account = getAccount(config)
  return account.address
}
