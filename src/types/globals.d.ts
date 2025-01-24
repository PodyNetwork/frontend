interface BaseResponse {
    message: string;
}

interface Response extends BaseResponse {
    data: object
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
interface ResponseError extends BaseResponse {}

export type { Response, ResponseError, BaseResponse }
