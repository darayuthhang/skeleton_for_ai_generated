'use client';
import { configureStore } from '@reduxjs/toolkit'

import UserSignupReducers from './features/userSignup/UserSignupReducers';
import ResentCodeReducers from './features/resentCode/ResentCodeReducers';
import GoogleUserReducers from './features/googleUser/GoogleUserReducers';
import VerifyUserReducers from './features/verifyUser/VerifyUserReducers';
import UserLoginReducers from './features/userLogin/UserLoginReducers';


// let composeEnhancers = null;

// if (process.env.NODE_ENV === 'development') {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// } else {
//     composeEnhancers = compose;
// }



const store = configureStore({
    reducer: {
        UserSignupReducers,
        ResentCodeReducers,
        GoogleUserReducers,
        VerifyUserReducers,
        UserLoginReducers,
        // ...other reducers if you have more slices
    },
    
    
});

export default store;
