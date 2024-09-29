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

interface ActionResponse {
    message: string;
  }

interface CallResponse extends ActionResponse {
    data: Call
}

export type {Call, CallResponse, ActionResponse}