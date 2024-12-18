import axios from '../../lib/axios/Axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { VerifyUserType } from './VerifyUsertype';
import BackEndPoint from '@/app/lib/BackEndPoint';

export const createVerifyUser = createAsyncThunk(
    `${VerifyUserType.CREATE_VERIFY_USER}/createVerifyUser`,
    async (sendData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BackEndPoint.VERIFY_USER}`, sendData);
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
