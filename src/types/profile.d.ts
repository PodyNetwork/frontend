import type { BaseResponse } from './globals'

interface Profile {
    id: string;
    username: string;
    walletAddress: string;
    email?: string;
    isEmailVerified?: boolean
}

interface ProfileResponse extends BaseResponse {
    data: Profile;
}

export { Profile, ProfileResponse}