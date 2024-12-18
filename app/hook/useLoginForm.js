'use client'
import React, {useState} from 'react';

const useLoginForm = () => {
    const [statusCode, setStatusCode] = useState('');
    const [loading, setLoading] = useState('');
    const [val, setValue] = useState('');
    const onChange = (e) => {
        if(statusCode) setStatusCode('');
        setValue(e.target.value);
    }
    return [
        val, 
        onChange, 
        loading,  
        setLoading,
        statusCode,
        setStatusCode]
};

export default useLoginForm;
