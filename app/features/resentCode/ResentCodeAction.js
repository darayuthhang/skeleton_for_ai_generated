import axios from '../../lib/axios/Axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResentcodeTypes } from './ResentCodeType';
import BackEndPoint from '@/app/lib/BackEndPoint';

export const createResentCode = createAsyncThunk(
    `${ResentcodeTypes.RESENT_CODE}/createCode`,
    async (sendData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BackEndPoint.RESENT_CODE}`, sendData);
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
