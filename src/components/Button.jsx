import React from 'react';
import styles from './Button.module.css';

const Button = ({children, type, handleclick}) => {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={handleclick}>{children}</button>
    );
}

export default Button;
