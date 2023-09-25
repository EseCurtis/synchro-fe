import axios from "axios"
export const axiosFetcher = (args: any) => {
    //@ts-ignore
    const fetcher = axios.get(...args); 
    return fetcher; 
}