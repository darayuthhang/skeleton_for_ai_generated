import axios from 'axios';


import { getSession } from 'next-auth/react'
import constants from '@/app/lib/constants';

let url = `${constants.DOMAIN_NAME_WITH_HTTPS}/api`

// https://time-tracking-tool.herokuapp.com
if (process.env.NEXT_PUBLIC_LOCAL_STAGE === 'local') url = 'http://localhost:3000/api'
const instance = axios.create({
    baseURL: url,
});
instance.interceptors.request.use(
    async (config) => {
        const session =  await getSession();
        const accessToken = session?.accessToken;
        if (accessToken) {
            config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return res;
    },

);
export default instance;
