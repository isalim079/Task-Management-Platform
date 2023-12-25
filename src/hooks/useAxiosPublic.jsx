import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:2900'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;