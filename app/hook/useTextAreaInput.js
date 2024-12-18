'use client'
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCodeAnalyzeData, resetCodeAnalyzeError } from '../features/codeAnalyze/CodeAnalyzeReducer';
import { resetCodeOptimizeData, resetcodeOptimizeError } from '../features/codeOptimizer/CodeOptimizeReducer';
// import { resetErrorState } from '../redux/action/defaultAction';
import { useSession } from "next-auth/react";
const useTextAreaInput = (initialValue) => {
    const dispatch = useDispatch();
    const {codeAnalyzeError, codeAnalyzeData} = useSelector((state) => state.codeAnalyzeReducers);
    const { codeOptimizeError, codeOptimizeData } = useSelector((state) => state.codeOptimizeReducers);
    const [val, setValue] = useState(initialValue);
    const { data: session, update: sessionUpdate } = useSession()
    // const { data: session, status, error } = useSession(); 
   
    const onChange= (e) => {
        resetData()
        errorChoice();
        setValue(e)
    }
    const errorChoice = () => {
        if (codeAnalyzeError) dispatch(resetCodeAnalyzeError())
        if (codeOptimizeError) dispatch(resetcodeOptimizeError())
    }
    const resetData = () => {
        if(codeAnalyzeData) dispatch(resetCodeAnalyzeData())
        if (codeOptimizeData) dispatch(resetCodeOptimizeData())
        if (session?.message) sessionUpdate()
    }
  
    return [val, onChange, errorChoice, resetData]
};

export default useTextAreaInput;
