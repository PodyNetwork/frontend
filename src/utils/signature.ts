import { signMessage as sign} from '@wagmi/core'
import { config } from '@/utils/wagmi'

export async function signMessage(message: string): Promise<string> {
    const signature = await sign(config, { message })
    return signature
}