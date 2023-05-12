import axios from "axios";

export const registerService = async (user) => {
    const res = await axios.post(`${process.env.HOST}/api/v1/auth/register`,user);
    return res;
};

export const loginService = async (credentials) => {
    const res = await axios.post(`${process.env.HOST}/api/v1/auth/login`,credentials,{ withCredentials: true});
    return res;
};

export const addSigninGoogle = async(user)=>{
    const res = await axios.post(`${process.env.HOST}/api/v1/auth/addSigninGoogle`,user);
    return res;
}
