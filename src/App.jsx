import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAndRefreshTokens } from './components/Auth/Auth';

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        checkAndRefreshTokens(navigate);
    }, [navigate]);

    return <></>;
}
