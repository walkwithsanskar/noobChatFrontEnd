const BASE_URL = process.env.REACT_APP_BASE_URL || "https://noobchatbackend.onrender.com/api/v1"


// auth endpoints

export const authEndpoints = {
    signUpApi : BASE_URL + "/auth/signUp",
    logInApi : BASE_URL + "/auth/logIn",
    sendOtp: BASE_URL + "/auth/sendOtp",
    searchByMail : BASE_URL + "/chat/getUsersByEmail/"
}


// chat endpoints 

export const chatEndpoints = {

    createChatApi : BASE_URL + "/chat/createChat",
    createMessageApi: BASE_URL + "/chat/createMessage",
    getChatApi : BASE_URL + "/chat/getChat/",
    deleteChat : BASE_URL + "/chat/deleteChat/",
    




}