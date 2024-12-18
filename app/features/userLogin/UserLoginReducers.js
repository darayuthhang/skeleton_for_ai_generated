
import { createSlice } from '@reduxjs/toolkit'
import constants from '@/app/lib/constants';
import helpers from '@/app/lib/helpers';
import { UserLoginTypes } from './UserLoginType';
import { userLogin } from './UserLoginAction';

const initialState = {
    userLoginStatus: '',
    userLoginRequest: false,
    userLoginError: null,
    userLoginInfo:  null,
    isLoggedIn:false
    
};
//logout create
const userLoginSlice = createSlice({
    name: UserLoginTypes.USER_LOGIN,
    initialState,
    reducers: {
        //update normal state and pure function
        resetuserLoginError: (state) => {
            state.userLoginError = null;
        },
        isLoggedInState:(state) => {
            state.userLoginInfo = Cookie.getUser();
        },
        isLoggedOutState:(state) => {
            state.isLoggedIn = false;
        }
    },
    extraReducers: builder => {
        // Use `extraReducers` to handle actions that were generated
        // _outside_ of the slice, such as thunks or in other slices
        builder
            .addCase(userLogin.pending, (state) => {
                state.userLoginStatus = constants.LOADING;
                state.userLoginRequest = true
            })
            // // Pass the generated action creators to `.addCase()`
            .addCase(userLogin.fulfilled, (state, action) => {
                // Same "mutating" update syntax thanks to Immer
                state.userLoginStatus = constants.SUCCESS
                state.userLoginRequest = false
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userLoginStatus = constants.FAILED
                state.userLoginRequest = false
                state.userLoginError = {
                    status: action.payload?.status,
                    message: helpers.mapUserLoginStatusCodeToMessage(action.payload?.status), // Custom function to map status code to user-friendly message
                    error: action.error, // You might want to store additional error data for debugging or analytics
                };
            })
    }
});

export const { isLoggedOutState, resetuserLoginError, isLoggedInState } = userLoginSlice.actions
export default userLoginSlice.reducer;
