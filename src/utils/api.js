import axios from "axios";
import {URL} from "./constanta";

const apiClient = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export default apiClient;
