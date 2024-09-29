interface Response {
    message: string;
    data: object
}

interface BaseResponse {
    message: string;
  }

interface ResponseError {
    message: string;
}



export type { Response, ResponseError, BaseResponse }