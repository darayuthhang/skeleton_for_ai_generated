import axios from '../../lib/axios/Axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserSignupTypes } from './UserSignupType';
import BackEndPoint from '@/app/lib/BackEndPoint';


export const createUser = createAsyncThunk(
    `${UserSignupTypes.SIGN_UP}/createUser`,
    async (sendData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BackEndPoint.SIGN_UP}`, sendData);
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
