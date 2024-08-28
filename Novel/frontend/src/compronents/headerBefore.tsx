import React from 'react';
import './header.css';
import { Dropdown, Image } from 'react-bootstrap';


const TOP2: React.FC = () => {
    return (
        <div className="topbar">
            <img id="HLogo" src="/src/assets/HLogo.png" alt="HLogo" />
            <img id="Logo" src="/src/assets/Logo.png" alt="Logo" />
       
            <div className="wrapcoin">
                <div className="coin">
                <div className="login">
            <button id='login'>เข้าสู่ระบบ</button>
            </div>
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
                    <Dropdown.Item id='locks' href="/profile">โปรไฟล์ของฉัน</Dropdown.Item>
                    <Dropdown.Item id='locks' href="/writer">งานเขียน</Dropdown.Item>
                    <Dropdown.Item id='locks' href="/bookself">ชั้นหนังสือ</Dropdown.Item>
                    <Dropdown.Item id='locks' href="/Payment">เหรียญ  & ประวัติธุรกรรม</Dropdown.Item>
                    <Dropdown.Item id='locks' href="/settings">ตั้งค่า</Dropdown.Item>
                   
                </Dropdown.Menu>
            </Dropdown>  
             </div>
        </div>
    );
};

export default TOP2;
