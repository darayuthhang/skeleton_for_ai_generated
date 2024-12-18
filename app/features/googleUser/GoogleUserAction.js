import axios from '../../lib/axios/Axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { GoogleUserTypes } from './GoogleUserType';
import BackEndPoint from '@/app/lib/BackEndPoint';


export const createGoogleUser = createAsyncThunk(
    `${GoogleUserTypes.GOOGLE_SIGN_UP}/createGoogleUser`,
    async (sendData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BackEndPoint.GOOGLE_USER}`, sendData);
            //@note dont delete custom cookie because we need it for email
            // Cookie.setTokenCookie(response?.data?.data);
            return response.data?.data;
        } catch (error) {
            //respone status code
            //response.data
            // response act as serialization
            return rejectWithValue({
                status: error.response.status,
                message: error.response.data
            });
        }

    }
);
