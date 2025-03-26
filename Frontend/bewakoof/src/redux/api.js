import axios from "axios";

export const api = axios.create({
    baseURL : "https://bewakoof-lh34.onrender.com/",
    headers : {
        "Content-Type" : "application/json",
    },
})