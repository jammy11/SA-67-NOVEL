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
    const [isWriter, setIsWriter] = useState(false);

    const { token: { colorBgContainer } } = theme.useToken();

    useEffect(() => {
        checkWriterStatus();
    }, []);

    const checkWriterStatus = async () => {
        console.log("Checking writer status...");
        const userId = localStorage.getItem('id');
        if (userId) {
            try {
                const result = await GetUsersById(userId);
                if (result.status === 200) {
                    const writerStatus = result.data.Writer;
                    console.log("Writer status from API:", writerStatus);
                    localStorage.setItem('isWriter', writerStatus.toString());
                    setIsWriter(writerStatus);
                    console.log("isWriter state and localStorage updated:", writerStatus);
                }
            } catch (error) {
                console.error("Error checking writer status:", error);
            }
        } else {
            console.log("User ID not found in localStorage");
        }
    };

    const Logout = () => {
        localStorage.clear();
        setIsWriter(false);
        messageApi.success("Logout successful");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };

    const checkIfWriter = () => {
        const storedWriterStatus = localStorage.getItem('isWriter') === 'true';
        console.log("Stored writer status:", storedWriterStatus);
        console.log("Current isWriter state:", isWriter);
        
        if (storedWriterStatus || isWriter) {
            console.log("User is a writer, redirecting to /writer");
            window.location.href = '/writer';
        } else {
            console.log("User is not a writer, showing modal");
            setShowModal(true);
        }
    };

    const handleWriterClick = async () => {
        console.log("Attempting to update writer status...");
        const userId = localStorage.getItem('id');
        if (userId) {
            try {
                const result = await UpdateStatusWriterById(userId, { Writer: true });
                if (result.status === 200) {
                    console.log("Writer status successfully updated in the backend");
                    localStorage.setItem('isWriter', 'true');
                    setIsWriter(true);
                    messageApi.success("Successfully updated writer status");
                    setShowModal(false);
                    console.log("Redirecting to /writer");
                    window.location.href = '/writer';
                } else {
                    console.error("Failed to update writer status:", result);
                    messageApi.error("Failed to update writer status");
                }
            } catch (error) {
                console.error("Error updating writer status:", error);
                messageApi.error("Error updating writer status");
            }
        } else {
            console.error("User ID not found in localStorage");
            messageApi.error("User not logged in");
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
                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-profile" as="div">
                        <Image
                            src={profileImage}
                            roundedCircle
                            alt="profile"
                            style={{ borderRadius: '100%', width: '45px', height: '45px' }}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                        <Dropdown.Item onClick={checkIfWriter}>งานเขียน</Dropdown.Item>
                        <Dropdown.Item href="/bookself">ชั้นหนังสือ</Dropdown.Item>
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