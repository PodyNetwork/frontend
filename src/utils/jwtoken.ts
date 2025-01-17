const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token)
}

const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token)
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
};

const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
};

export { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken, removeAccessToken, removeRefreshToken }