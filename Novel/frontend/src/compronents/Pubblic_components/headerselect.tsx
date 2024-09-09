import React, { useEffect, useState } from 'react';
import TOP from './header';
import TOP2 from './headerBefore';
import axios from 'axios';

const Headers: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // แก้ไขตรงนี้

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const tokenType = localStorage.getItem('token_type');
            
            if (token && tokenType) {
                const requestOptions = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${tokenType} ${token}`,
                    },
                };

                try {
                    const response = await axios.get('http://localhost:8000/users', requestOptions);
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoggedIn === null) {
        return null; // หรือสามารถแสดง Loading Spinner ระหว่างรอตรวจสอบได้
    }

    return (
        <div>
            {isLoggedIn ? <TOP /> : <TOP2 />}
        </div>
    );
};

export default Headers;
