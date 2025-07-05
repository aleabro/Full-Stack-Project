import {Navigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import React, { useState, useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const hasAllowedRole = (decoded) => {
    return allowedRoles.length === 0 || allowedRoles.includes(decoded.user_type);
    };


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }
        try{
            const res = await api.post('/auth/token/refresh/', {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                const decoded = jwtDecode(res.data.access);
                
                if (!hasAllowedRole(decoded)) {
                    setIsAuthorized(false);
                    return;
                }
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp
        const now = Math.floor(Date.now() / 1000);

        if(tokenExpiration < now) {
            await refreshToken();
        }
        if (!hasAllowedRole(decoded)) {
            setIsAuthorized(false);
            return;
        }
        else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;

}