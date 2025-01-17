import { Address } from './address';

interface SignupCredentials {
    walletAddress: Address;
    signature: string;
    timestamp: number;
    username: string;
    referralCode?: string | null;
}

export type { SignupCredentials };