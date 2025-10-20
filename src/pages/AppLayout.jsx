import React from 'react';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import styles from './AppLayout.module.css';
import Spinner from '../components/Spinner';
import User from '../components/User';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

const AppLayout = () => {

    const { isAuthenticated } = useAuth();
    const navigator = useNavigate();

    if (!isAuthenticated) {
        navigator('/', { replace: true });
    }

    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;
