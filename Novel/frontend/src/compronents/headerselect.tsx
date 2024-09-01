import React, { useEffect, useState } from 'react';
import TOP from './header';  // นำเข้าคอมโพเนนต์ที่แสดงเมื่อผู้ใช้ล็อกอินแล้ว
import TOP2 from './headerBefore'; // นำเข้าคอมโพเนนต์ที่แสดงเมื่อผู้ใช้ยังไม่ล็อกอิน
import axios from 'axios';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    // ทดสอบการเข้าถึง API ด้วย token
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

    return (
        <div>
            {isLoggedIn ? <TOP /> : <TOP2 />}
        </div>
    );
};

export default Header;
