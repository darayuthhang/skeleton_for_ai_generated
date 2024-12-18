'use client'
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetgoogleUserError } from '../features/googleUser/GoogleUserReducers';
import { resetuserSignupError } from '../features/userSignup/UserSignupReducers';
import { resetresentCodeError } from '../features/resentCode/ResentCodeReducers';
const useUserForm = (intialValue) => {
    const dispatch = useDispatch();
    const { resentCodeRequest, resentCodeError, resentCodeStatus } = useSelector((state) => state.ResentCodeReducers);

    const { userSignupError } = useSelector((state) => state.UserSignupReducers)
    const { googleUserError } = useSelector((state) => state.GoogleUserReducers);
    const [val, setVal] = useState(intialValue);
    const [error, setError] = useState('');
    const onChangeVal = (e) => {
        if (error){
            setError('');
        }
        if(userSignupError){
            dispatch(resetuserSignupError())
        }
        if (googleUserError){
            dispatch(resetgoogleUserError());
        }
        if (resentCodeError || resentCodeStatus) dispatch(resetresentCodeError());
        setVal(e.target.value)
    }
    return [val, onChangeVal, error, setError]
};

export default useUserForm;
