import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAndRefreshTokens } from '../Auth/Auth';

export default function Checker() {
    const navigate = useNavigate();

    useEffect(() => {
        checkAndRefreshTokens(navigate);
    }, [navigate]);

    return (
        <>
            MAIN!!!!!!!!!!!!!
        </>
    );
}
