import React from 'react';
import './header.css';
import { Dropdown, Image } from 'react-bootstrap';


const TOP: React.FC = () => {
    return (
        <div className="topbar">
            <img id="HLogo" src="/src/assets/HLogo.png" alt="HLogo" />
            <img id="Logo" src="/src/assets/Logo.png" alt="Logo" />
       
            <div className="wrapcoin">
                <div className="coin">
                    <img id="coin" src="/src/assets/coin.png" alt="coin" />
                    <span id="cointxt">500.00</span>
                </div>
            </div>

             <div id='profile'>
            <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-profile" as="div">
                   
                    <Image
                        src="/src/assets/p1.jpeg"
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
                    <Dropdown.Item href="/logout">ออกจากระบบ</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>  
             </div>
        </div>
    );
};

export default TOP;
