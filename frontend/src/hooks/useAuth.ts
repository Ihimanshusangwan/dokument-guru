import {useEffect, useState} from 'react';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type AuthState = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
};

// Helper function to decode JWT token
const decodeJWT = (token: string): User | null => {
    try {
        // The payload is the second part of the JWT
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        return {
            id: payload.sub || payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
        };
    } catch (error) {
        console.error('Failed to decode JWT', error);
        return null;
    }
};

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isLoggedIn: false,
        user: null,
        token: null,
    });

    useEffect(() => {
        checkAuthStatus();
        const handleStorageChange = () => checkAuthStatus();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = decodeJWT(token);
            if (user) {
                setAuthState({
                    isLoggedIn: true,
                    user,
                    token,
                });
                return;
            }
        }
        // window.location.href = '/';

    };

    const login = (token: string) => {
        console.log('called');
        const user = decodeJWT(token);
        if (!user) {
            throw new Error('Invalid token');
        }

        localStorage.setItem('token', token);
        setAuthState({
            isLoggedIn: true,
            user,
            token,
        });
        window.location.href = '/dashboard';
    };

    const logout = () => {
        clearAuth();
        window.location.href = '/';
    };

    const clearAuth = () => {
        localStorage.removeItem('token');
        setAuthState({
            isLoggedIn: false,
            user: null,
            token: null,
        });
    };

    return {
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        login,
        logout,
    };
};