'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetdashboardError } from '../features/dashboard/StockMarket/CreateSymbolByUserId';
const useDashBoardForm = () => {
    const dispatch = useDispatch();
    const [statusCode, setStatusCode] = useState('');
    const [loading, setLoading] = useState('');
    const [val, setValue] = useState('');
    const onChange = (e) => {
        if (statusCode) setStatusCode('');
        dispatch(resetdashboardError());
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

export default useDashBoardForm;
