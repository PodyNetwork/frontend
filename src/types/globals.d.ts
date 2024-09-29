interface Response {
    message: string;
    accessToken: string;
    refreshToken: string;
}

interface ResponseError {
    message: string;
}

export type { Response, ResponseError }