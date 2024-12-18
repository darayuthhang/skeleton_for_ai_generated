
import { createSlice } from '@reduxjs/toolkit'
import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { GoogleUserTypes } from './GoogleUserType';
import { createGoogleUser } from './GoogleUserAction';
const initialState = {
    googleUserStatus: '',
    googleUserRequest: false,
    googleUserError: null,
};
/**
 * Google Signup and Google login go to the same
 * route ===> GOOGEL BCK-end
 */
const createGoogleUserSlice = createSlice({
    name: GoogleUserTypes.GOOGLE_SIGN_UP,
    initialState,
    reducers: {
        //update normal state and pure function
        resetgoogleUserError: (state) => {
            state.googleUserError = null;
            state.googleUserStatus = null
        },
    },
    extraReducers: builder => {
        // Use `extraReducers` to handle actions that were generated
        // _outside_ of the slice, suchss as thunks or in other slices
        builder
            .addCase(createGoogleUser.pending, (state) => {
                state.googleUserStatus = constants.LOADING;
                state.googleUserRequest = true
            })
            // // Pass the generated action creators to `.addCase()`
            .addCase(createGoogleUser.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.googleUserStatus = constants.SUCCESS
                state.googleUserRequest = false
            })
            .addCase(createGoogleUser.rejected, (state, action) => {
                state.googleUserStatus = constants.FAILED
                state.googleUserRequest = false
                state.googleUserError = {
                    status: action.payload?.status,
                    message: helpers.mapGoogleUserStatusCodeToMessage(action.payload?.status), // Custom function to map status code to user-friendly message
                    error: action.error, // You might want to store additional error data for debugging or analytics
                };
            })
    }
});

export const { resetgoogleUserError } = createGoogleUserSlice.actions
export default createGoogleUserSlice.reducer;
