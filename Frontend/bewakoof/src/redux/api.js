import axios from "axios";

export const api = axios.create({
    baseURL : "https://bewakoof-lh34.onrender.com/api",
    headers : {
        "Content-Type" : "application/json",
    },
})