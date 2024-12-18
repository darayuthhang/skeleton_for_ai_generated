
import { createSlice } from '@reduxjs/toolkit'
import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { UserSignupTypes } from './UserSignupType';
import { createUser } from './UserSignupAction';
const initialState = {
    userSignupStatus: '',
    userSignupRequest: false,
    userSignupError: null,
};
const createUserSlice = createSlice({
    name: UserSignupTypes.SIGN_UP,
    initialState,
    reducers: {
        //update normal state and pure function
        resetuserSignupError: (state) => {
            state.userSignupError = null;
            state.userSignupStatus = null;
        },
    },
    extraReducers: builder => {
        // Use `extraReducers` to handle actions that were generated
        // _outside_ of the slice, such as thunks or in other slices
        builder
            .addCase(createUser.pending, (state) => {
                state.userSignupStatus = constants.LOADING;
                state.userSignupRequest = true
            })
            // // Pass the generated action creators to `.addCase()`
            .addCase(createUser.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.userSignupStatus = constants.SUCCESS
                state.userSignupRequest = false
            })
            .addCase(createUser.rejected, (state, action) => {
                state.userSignupStatus = constants.FAILED
                state.userSignupRequest = false
                state.userSignupError = {
                    status: action.payload?.status,
                    message: helpers.mapUserStatusCodeToMessage(action.payload?.status), // Custom function to map status code to user-friendly message
                    error: action.error, // You might want to store additional error data for debugging or analytics
                };
            })
    }
});

export const { resetuserSignupError } = createUserSlice.actions
export default createUserSlice.reducer;
