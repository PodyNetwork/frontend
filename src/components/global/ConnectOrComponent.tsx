import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ActiveNetwork } from "@/utils/config";
import { getChainId } from "@wagmi/core";
import { config } from '@/utils/wagmi';
import { toast } from 'sonner';
import { switchToDefaultChain } from '@/utils/chain';
import useLoading from '@/hooks/useLoading';


const ConnectOrComponent = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()
  const {loading, startLoading, stopLoading } = useLoading()
  
  const chainId = getChainId(config)

  console.log(chainId, ActiveNetwork.id)

  if (!isConnected) {
    return <div className='__pd_wallet_cnt'><ConnectButton /></div>
  }

  if(chainId !== ActiveNetwork.id) {
    return  <button
    className="text-xs px-4 py-1.5 bg-pody-primary text-slate-900 rounded-md hover:bg-pody-primary/80 hover:transition-all w-full xs:w-auto"
    onClick={async () => {
      try{
        startLoading();
        await switchToDefaultChain();
      } catch {
        toast("Error", {
          description: "Could not switch chain",
        });
      } finally {
        stopLoading();
      }
    }}
  >
    {loading ? "Loading..." : "Switch Chain"}
  </button>
  }

  return <>{children}</>
}

export default ConnectOrComponent