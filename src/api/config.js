const baseUrl = 'http://localhost:8080'

const setUserId = userId => {
    return localStorage.setItem('userId', userId);
}

const getUserId = () => {
    return localStorage.getItem('userId');
}

export {
    baseUrl,
    setUserId,
    getUserId
}