import { ENV } from "../configurations/environments";
export const api_key = "5ET4NH9-4M64SNC-J3X5MGD-7MHPYZB";
export const ASYNC_CALLER_URL = () => {
    return ENV === "prod" ?
        "https://ec2-13-126-109-226.ap-south-1.compute.amazonaws.com/api/" +
        api_key +
        "/" :
        "http://localhost:7000/api/" + api_key + "/";
};