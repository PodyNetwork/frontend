import { BaseResponse } from "@/types/globals"

interface Call {
    id: string,
    userId: string,
    scheduledTime: string,
    type: string,   
    title: string,
    permissions: string,
    createdAt: string,
    updatedAt: string
}

interface CallResponse extends BaseResponse {
    data: Call
}

export type {Call, CallResponse }