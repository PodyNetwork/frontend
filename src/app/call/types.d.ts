import { BaseResponse } from "@/types/globals"

interface Call {
    _id: string,
    userId: string,
    scheduledTime?: number,
    type: "instant" | "scheduled",
    status:"pending" | "ongoing"| 'ended' | "cancelled", 
    title: string,
    permissions: {
        canPublish: boolean,
        canSubscribe: boolean,
        roomJoin: boolean,
    },
    createdAt: string,
    updatedAt: string,
    url: string
}

interface CallResponse extends BaseResponse {
    data: Call
}

export type {Call, CallResponse }