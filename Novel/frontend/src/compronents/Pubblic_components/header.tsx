import React, { useState, useEffect } from 'react';   
import './header.css';
import { Dropdown, Image, Modal, Button } from 'react-bootstrap';
import { message, theme } from 'antd';  
import logo from '../../assets/Logo.png';
import coinImage from '../../assets/coin-50.png';
import profileImage from '../../assets/p1.jpeg';
import Balance from '../Home_components/showblance';
import { GetUsersById, UpdateStatusWriterById } from '../../services/https/User/user';

const TOP: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);
    const [isWriter, setIsWriter] = useState<boolean | null>(null);

    const { token: { colorBgContainer } } = theme.useToken();

    useEffect(() => {
        const checkWriterStatus = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (userId) {
                    const userData = await GetUsersById(String(userId));
                    if (userData.status === 200) {
                        setIsWriter(userData.data.writer);
                        if (userData.data.writer) {
                            // Optionally, redirect if it's the initial load
                            // window.location.href = '/bookself'; // Uncomment this if you want initial load redirection
                        }
                    }
                }
            } catch (error) {
                messageApi.error("Error fetching user data");
            }
        };

        checkWriterStatus();
    }, [messageApi]);

    const handleWriterClick = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (userId) {
                // อัปเดตสถานะนักเขียนในฐานข้อมูล
                await UpdateStatusWriterById(String(userId), { writer: true });
                
                // อัปเดตสถานะใน localStorage และ state
                localStorage.setItem('isWriter', 'true');
                setIsWriter(true);

                // เปลี่ยนเส้นทางไปยังหน้า bookshelf
                window.location.href = '/bookself';
            }
        } catch (error) {
            messageApi.error("Error updating writer status");
        }
    };

    const Logout = () => {
        localStorage.clear();
        messageApi.success("Logout successful");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };

    const handleDropdownSelect = async (eventKey: string | null) => {
        switch (eventKey) {
            case 'bookself':
                if (isWriter) {
                    window.location.href = '/bookself';
                } else {
                    setShowModal(true);
                }
                break;
            // handle other dropdown options if necessary
            default:
                break;
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="topbar">
            {contextHolder}
            <img id="Logo" src={logo} alt="Logo" />
            <div className="wrapcoin">
                <div className="cointop">
                    <img id="cointop" src={coinImage} alt="coin" />
                    <span id="cointxt"><Balance /></span>
                </div>
            </div>
            <div id='profile'>
                <Dropdown align="end" onSelect={handleDropdownSelect}>
                    <div className='hindesometing'>
                        <Dropdown.Toggle variant="light" id="dropdown-profile" as="div">
                            <Image
                                src={profileImage}
                                roundedCircle
                                alt="profile"
                                style={{ borderRadius: '100%', width: '45px', height: '45px' }}
                            />
                        </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                        <Dropdown.Item eventKey="bookself">ชั้นหนังสือ</Dropdown.Item>
                        <Dropdown.Item href="/Payment">เหรียญ & ประวัติธุรกรรม</Dropdown.Item>
                        <Dropdown.Item href="/settings">ตั้งค่า</Dropdown.Item>
                        <Dropdown.Item onClick={Logout}>ออกจากระบบ</Dropdown.Item>
                    </Dropdown.Menu> 
                </Dropdown>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>การสมัครเป็นนักเขียน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    คุณไม่ใช่นักเขียน กรุณาสมัครเป็นนักเขียนเพื่อเข้าถึงงานเขียน
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                    <Button variant="primary" onClick={handleWriterClick}>
                        สมัครเป็นนักเขียน
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TOP;
