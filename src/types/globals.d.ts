interface Response {
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}

export { Response }