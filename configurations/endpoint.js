import { ENV } from "../configurations/environments";
export const api_key = "5ET4NH9-4M64SNC-J3X5MGD-7MHPYZB";
export const ASYNC_CALLER_URL = () => {
    return ENV === "prod" ?
        "http://ec2-13-233-236-190.ap-south-1.compute.amazonaws.com:3000/api/" +
        api_key +
        "/" :
        "http://localhost:8000/api/" + api_key + "/";
};