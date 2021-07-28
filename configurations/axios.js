import axios from "axios";
import { ASYNC_CALLER_URL } from "../configurations/endpoint";

/***
 * base url to make requests to the aws s3 database
 */

const instance = axios.create({
    baseURL: ASYNC_CALLER_URL(),
});

export default instance;