interface BaseResponse {
    message: string;
}

interface Response extends BaseResponse {
    data: object
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResponseError extends BaseResponse {}

export type { Response, ResponseError, BaseResponse }