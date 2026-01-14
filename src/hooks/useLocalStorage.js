import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const jsonValue = localStorage.getItem(key);
            if (jsonValue != null) return JSON.parse(jsonValue);
        } catch (error) {
            console.error('Error reading from localStorage', error);
        }
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
