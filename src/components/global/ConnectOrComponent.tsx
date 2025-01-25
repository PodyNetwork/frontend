import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'


const ConnectOrComponent = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()
  
  if (!isConnected) {
    return <div className='__pd_wallet_cnt'><ConnectButton /></div>
  }

  return <>{children}</>
}

export default ConnectOrComponent