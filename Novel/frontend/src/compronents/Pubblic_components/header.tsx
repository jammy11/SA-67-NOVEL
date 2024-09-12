import React, { useState } from 'react';   
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
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { token: { colorBgContainer } } = theme.useToken();

    const Logout = () => {
        localStorage.clear();
        messageApi.success("Logout successful");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    };

    // Check if the user is a writer
    const checkIfWriter = async () => {
        const userId = localStorage.getItem('id');
        if (userId) {
            try {
                const result = await GetUsersById(userId);
                if (result.status === 200) {
                    if (result.data.Writer) {
                        window.location.href = '/writer'; // Automatically redirects
                    } else {
                        // Update writer status immediately without showing a modal
                        await handleWriterClick(); // Trigger the writer update immediately
                    }
                } else {
                    messageApi.error("Failed to get user status");
                }
            } catch (error) {
                messageApi.error("Error checking user status");
            }
        } else {
            messageApi.error("User not logged in");
        }
    };
    

    const handleWriterClick = async () => {
        const userId = localStorage.getItem('id');
        if (userId) {
            try {
                const result = await UpdateStatusWriterById(userId, { Writer: true });
                if (result.status === 200) {
                    messageApi.success("Successfully updated writer status");
                    window.location.href = '/writer'; // Redirect after successful update
                } else {
                    messageApi.error("Failed to update writer status");
                }
            } catch (error) {
                messageApi.error("Error updating writer status");
            }
        } else {
            messageApi.error("User not logged in");
        }
        setShowModal(false); // Close the modal
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="topbar">
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

            {/* Modal for "สมัครเป็นนักเขียน" */}
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
