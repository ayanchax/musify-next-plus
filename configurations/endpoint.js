import { ENV } from "../configurations/environments";
export const api_key = "5ET4NH9-4M64SNC-J3X5MGD-7MHPYZB";
export const ASYNC_CALLER_URL = () => {
    return ENV === "prod" ?
        "https://musify-api.com/api/" +
        api_key +
        "/" :
        "http://localhost:8000/api/" + api_key + "/";
};