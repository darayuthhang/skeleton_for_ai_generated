import axios from '../../lib/axios/Axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserLoginTypes } from './UserLoginType';
import BackEndPoint from '@/app/lib/BackEndPoint';



export const userLogin = createAsyncThunk(
    `${UserLoginTypes.USER_LOGIN}/userLogin`,
    async (sendData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BackEndPoint.USER_LOGIN}`, sendData);
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
