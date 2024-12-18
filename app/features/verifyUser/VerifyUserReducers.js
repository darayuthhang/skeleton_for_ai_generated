
import { createSlice } from '@reduxjs/toolkit'
import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { VerifyUserType } from './VerifyUsertype';
import { createVerifyUser } from './VerifyUserAction';

const initialState = {
    verifyUserStatus: '',
    verifyUserRequest: false,
    verifyUserError: null,
};
const createVerifyUserSlice = createSlice({
    name: VerifyUserType.CREATE_VERIFY_USER,
    initialState,
    reducers: {
        //update normal state and pure function
        resetverifyUserError: (state) => {
            state.verifyUserError = null;
        },
        resetverifyUserStatus: (state) => {
            state.verifyUserStatus = null;
        }
    },
    extraReducers: builder => {
        // Use `extraReducers` to handle actions that were generated
        // _outside_ of the slice, such as thunks or in other slices
        builder
            .addCase(createVerifyUser.pending, (state) => {
                state.verifyUserStatus = constants.LOADING;
                state.verifyUserRequest = true
            })
            // // Pass the generated action creators to `.addCase()`
            .addCase(createVerifyUser.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.verifyUserStatus = constants.SUCCESS
                state.verifyUserRequest = false
            })
            .addCase(createVerifyUser.rejected, (state, action) => {
                state.verifyUserStatus = constants.FAILED
                state.verifyUserRequest = false
                state.verifyUserError = {
                    status: action.payload?.status,
                    message: helpers.mapUserVerifyUserStatusCodeToMessage(action.payload?.status), // Custom function to map status code to user-friendly message
                    error: action.error, // You might want to store additional error data for debugging or analytics
                };
            })
    }
});

export const { resetverifyUserError, resetverifyUserStatus } = createVerifyUserSlice.actions
export default createVerifyUserSlice.reducer;
