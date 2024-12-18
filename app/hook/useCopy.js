'use client'
import React, {useState} from 'react';

const useCopy = () => {
    const [copied, setCopied] = useState(false);
    const [copyLoading, setCopiesLoading] = useState(false);
    const debounce = () => {
        setTimeout(() => {
            setCopied(false)
        }, 1000);
    }
    const handleCopyClick = async (textValue) => {
        if (!navigator.clipboard) {
            // Clipboard API not available
            return
        }
        setCopied(true)
        try {
            const text = await navigator.clipboard.writeText(textValue);
            debounce();
        } catch (err) {
            debounce();
            console.error('Failed to copy!', err)
        }
    };
    return [copied, copyLoading, handleCopyClick]
};

export default useCopy;
