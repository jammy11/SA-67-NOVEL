import React, { useState } from 'react';
import './header.css';
import { Dropdown, Image } from 'react-bootstrap';
import { message, theme } from 'antd';  // Ensure this import matches your actual setup
import logo from '../assets/Logo.png';
import coinImage from '../assets/coin-50.png';
import profileImage from '../assets/p1.jpeg';
import Balance from './showblance';
const TOP: React.FC = () => {
    const page = localStorage.getItem("page");
    const [messageApi, contextHolder] = message.useMessage();
    const [collapsed, setCollapsed] = useState(false);

    const { token: { colorBgContainer } } = theme.useToken();

    const setCurrentPage = (val: string) => {
        localStorage.setItem("page", val);
    };

    const Logout = () => {
        localStorage.clear();
        messageApi.success("Logout successful");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
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
                        <Dropdown.Item href="/writer">งานเขียน</Dropdown.Item>
                        <Dropdown.Item href="/bookself">ชั้นหนังสือ</Dropdown.Item>
                        <Dropdown.Item href="/Payment">เหรียญ  & ประวัติธุรกรรม</Dropdown.Item>
                        <Dropdown.Item href="/settings">ตั้งค่า</Dropdown.Item>
                        <Dropdown.Item onClick={Logout}>ออกจากระบบ</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default TOP;
