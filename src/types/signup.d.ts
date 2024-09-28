import { Address } from './address';
import type { Response } from './globals';

interface SignupCredentials {
    walletAddress: Address;
    signature: string;
    timestamp: number;
    username: string;
}

interface SignupResponseError {
    message: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SignupResponse extends Response {}

export { SignupCredentials, SignupResponseError, SignupResponse };