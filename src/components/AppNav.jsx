import React from 'react';
import styles from './AppNav.module.css';
import { NavLink } from 'react-router';

const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="/app/cities">Cities</NavLink></li>
                <li><NavLink to="/app/countries">Countries</NavLink></li>
            </ul>
        </nav>
    );
}

export default AppNav;
