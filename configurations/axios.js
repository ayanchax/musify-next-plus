import axios from "axios";
import { ENV } from "../configurations/environments";
/***
 * base url to make requests to the aws s3 database
 */
const api_key = "5ET4NH9-4M64SNC-J3X5MGD-7MHPYZB";
const getURL = () => {
    return ENV === "prod" ?
        "https://ec2-13-126-109-226.ap-south-1.compute.amazonaws.com/api/" +
        api_key +
        "/" :
        "http://localhost:7000/api/" + api_key + "/";
};
const instance = axios.create({
    baseURL: getURL(),
});

export default instance;