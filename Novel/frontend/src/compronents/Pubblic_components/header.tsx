import React, { useState, useEffect } from 'react';   
import './header.css';
import { Dropdown, Image, Modal, Button } from 'react-bootstrap';
import { message, theme } from 'antd';  
import logo from '../../assets/Logo.png';
import coinImage from '../../assets/coin-50.png';
import Balance from '../Home_components/showblance';
import { GetUsersById, UpdateStatusWriterById } from '../../services/https/User/user';
import { UsersInterface } from '../../interface/profile_interface/IProfile';

const TOP: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);
    const [isWriter, setIsWriter] = useState<boolean | null>(null);
    const [users, setUser] = useState<UsersInterface | null>(null);

    const { token: { colorBgContainer } } = theme.useToken();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (userId) {
                    const userData = await GetUsersById(userId);
                    setUser(userData.data); // Set user data
                    if (userData.status === 200) {
                        setIsWriter(userData.data.writer);
                    }
                }
            } catch (error) {
                messageApi.error("Error fetching user data");
            }
        };

        fetchUserData();
    }, [messageApi]);

    useEffect(() => {
        const checkWriterStatus = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (userId) {
                    const userData = await GetUsersById(String(userId));
                    if (userData.status === 200) {
                        setIsWriter(userData.data.writer);
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

                // เปลี่ยนเส้นทางไปยังหน้า writer
                window.location.href = '/writer';
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
            case 'bookshelf':
                if (isWriter) {
                    window.location.href = '/bookshelf';
                } else {
                    setShowModal(true);
                }
                break;
            case 'writer':
                if (isWriter) {
                    window.location.href = '/writer';
                } else {
                    setShowModal(true);
                }
                break;
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
            <a href="/"><img id="Logo" src={logo} alt="Logo" /></a>
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
                                src={users?.profile}
                                roundedCircle
                                alt="profile"
                                style={{ borderRadius: '100%', width: '45px', height: '45px' }}
                            />
                        </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                        <Dropdown.Item eventKey="writer">งานเขียน</Dropdown.Item> {/* เพิ่มงานเขียนกลับมา */}
                        <Dropdown.Item eventKey="bookshelf">ชั้นหนังสือ</Dropdown.Item>
                        <Dropdown.Item href="/Payment">เหรียญ & ประวัติธุรกรรม</Dropdown.Item>
                        <Dropdown.Item href="/settings">ตั้งค่า</Dropdown.Item>
                        <Dropdown.Item onClick={Logout}>ออกจากระบบ</Dropdown.Item>
                    </Dropdown.Menu> 
                </Dropdown>
            </div>

        
            <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
                <div className='modal-contentnew2 custom-modalnew'>
                    <div className='confirmation-message'>
                        <div onClick={handleCloseModal}>
                            <img className="cancle3" src="./src/assets/no.png" alt="cancel" />
                        </div>
                        <div style={{ transform: 'translate(-50px, -40px)' ,width:'300%'}}>
                        <img className="ready" src="./src/assets/error.png" alt="submit" />
                        <span className='text2'><b>คุณต้องเป็นนักเขียนก่อน</b></span>
                        </div>
                        <span className="text-1">
                            <span id='ready2'style={{ transform: 'translate(-20px, 0)' }}>สมัครเข้าร่วมเป็นนักเขียน</span>
                        </span>
                        <div>
                     
                            <span id='buttonin'  onClick={handleWriterClick} style={{cursor:'pointer'}}>
                                <span id='button3'>&nbsp;&nbsp;&nbsp;&nbsp;สมัคร</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TOP;