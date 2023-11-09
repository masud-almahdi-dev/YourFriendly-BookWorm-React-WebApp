import axios from "axios";
import { useAuth } from "./Authentication";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URI}`,
    withCredentials: true
})

const useAxiosSecure = () => {
    const {logOut} = useAuth()
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked in the interceptor', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
            }
        })
    })
    return axiosSecure;
}
export default useAxiosSecure;