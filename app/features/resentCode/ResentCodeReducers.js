
import { createSlice } from '@reduxjs/toolkit'
import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { createResentCode } from './ResentCodeAction';
import { ResentcodeTypes } from './ResentCodeType';

const initialState = {
    resentCodeStatus: '',
    resentCodeRequest: false,
    resentCodeError: null,
};
const resentCodeSlice = createSlice({
    name: ResentcodeTypes.RESENT_CODE,
    initialState,
    reducers: {
        //update normal state and pure function
        resetresentCodeError: (state) => {
            state.resentCodeError = null;
            state.resentCodeStatus = null;
        },
        resetresentCodeStatus: (state) => {
            state.resentCodeStatus = null;
        },
    },
    extraReducers: builder => {
        // Use `extraReducers` to handle actions that were generated
        // _outside_ of the slice, such as thunks or in other slices
        builder
            .addCase(createResentCode.pending, (state) => {
                state.resentCodeStatus = constants.LOADING;
                state.resentCodeRequest = true
            })
            // // Pass the generated action creators to `.addCase()`
            .addCase(createResentCode.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.resentCodeStatus = constants.SUCCESS
                state.resentCodeRequest = false
            })
            .addCase(createResentCode.rejected, (state, action) => {
                state.resentCodeStatus = constants.FAILED
                state.resentCodeRequest = false
                state.resentCodeError = {
                    status: action.payload?.status,
                    message: helpers.mapResentCodeStatusCodeToMessage(action.payload?.status), // Custom function to map status code to user-friendly message
                    error: action.error, // You might want to store additional error data for debugging or analytics
                };
            })
    }
});

export const { resetresentCodeError, resetresentCodeStatus } = resentCodeSlice.actions
export default resentCodeSlice.reducer;
