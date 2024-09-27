
interface LoginCredentials {
    walletAddress: string;
    signature: string;
    timestamp: number;
}

interface LoginErrorResponse {
    message: string;
}

interface LoginResponseData {
    message: string,
    data: {
        accessToken: string,
        refreshToken: string,
    }
}

interface LoginErrorResponse {
    message: string;
}

export { LoginCredentials, LoginErrorResponse, LoginResponseData }