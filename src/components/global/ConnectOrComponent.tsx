import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectOrComponent = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return <ConnectButton />
  }

  return <>{children}</>
}

export default ConnectOrComponent