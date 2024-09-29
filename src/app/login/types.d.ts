import type { Response } from './globals';
interface LoginCredentials {
    walletAddress: string;
    signature: string;
    timestamp: number;
}


export type { LoginCredentials }