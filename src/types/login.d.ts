import type { Response } from './globals';
interface LoginCredentials {
    walletAddress: string;
    signature: string;
    timestamp: number;
}

interface LoginResponseError {
    message: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LoginResponse extends Response {}


export { LoginCredentials, LoginResponseError, LoginResponse }