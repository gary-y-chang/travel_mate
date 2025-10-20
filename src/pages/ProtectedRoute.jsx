import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router'; 

const ProtectedRoute = ({children}) => {

    const { isAuthenticated } = useAuth();
    const navigator = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/', { replace: true });
        }
    }, [isAuthenticated, navigator]);

    return isAuthenticated? children : null;
}

export default ProtectedRoute;
