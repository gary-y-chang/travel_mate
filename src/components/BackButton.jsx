import React from 'react';
import { useNavigate } from 'react-router';
import Button from './Button';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button type="back" 
          handleclick={(e) => { 
            e.preventDefault();
            navigate(-1); } }>&larr; Back</Button>
    );
}

export default BackButton;
