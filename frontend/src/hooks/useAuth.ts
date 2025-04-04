import {useEffect, useState} from 'react';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for token on initial load
        checkAuthStatus();

        // Listen for storage events (for cross-tab sync)
        const handleStorageChange = () => checkAuthStatus();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    };

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        login,
        logout,
        checkAuthStatus
    };
};