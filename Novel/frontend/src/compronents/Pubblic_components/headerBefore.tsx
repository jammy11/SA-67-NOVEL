// TOP2 Component (with swapped modal)
import React, { useState } from 'react';
import './header.css';
import { Dropdown, Image, Modal, Button } from 'react-bootstrap';
import { IoPersonCircleOutline } from "react-icons/io5";

const TOP2: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    // Show modal for login access to "งานเขียน"
    const handleWriterClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="topbar">
            <img id="Logo" src="/src/assets/Logo.png" alt="Logo" />

            <div className="login">
                <Button id='login' href="/login">เข้าสู่ระบบ</Button>
            </div>

            <div id='profile'>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-profile" as="div">
                        <IoPersonCircleOutline id='white' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu id='locks'>
                        <Dropdown.Item id='locks' href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                        <Dropdown.Item id='locks' onClick={handleWriterClick}>งานเขียน</Dropdown.Item>
                        <Dropdown.Item href="/bookself">ชั้นหนังสือ</Dropdown.Item>
                        <Dropdown.Item id='locks' href="/Payment">เหรียญ & ประวัติธุรกรรม</Dropdown.Item>
                        <Dropdown.Item id='locks' href="/settings">ตั้งค่า</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Modal for login */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>การเข้าถึงงานเขียน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    กรุณาเข้าสู่ระบบก่อนเข้าถึงงานเขียน
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                    <Button variant="primary" href="/login">
                        เข้าสู่ระบบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TOP2;
