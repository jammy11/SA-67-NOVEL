import React from 'react';
import './profile.css'
import TOP from '../../compronents/header';
import { Link } from 'react-router-dom';

const profile: React.FC = () => {
    return (
        <><TOP/>
        <div className="profile-container">
            <div className="return">
                    <span className='return'>กลับ</span>
                <Link to ="/Home" className="Home"></Link>
            </div>
            <div className="profile-header">
                <div className="profile-picture"></div>
            </div>
            <div className="box">
                <div className="item">
                    <span className="label">ชื่อผู้ใช้</span>
                    <span className="value">: -------</span>
                </div>
                <div className="item">
                    <span className="label">อีเมล</span>
                    <span className="value">: ---------</span>
                </div>
                <div className="item">
                    <span className="label">เพศ</span>
                    <span className="value">: ไม่ระบุ</span>
                </div>
                <div className="item">
                    <span className="label">วันเกิด</span>
                    <span className="value">: </span>
                </div>
            </div>
            <Link to="/editProfile" className="editProfile">แก้ไขข้อมูลส่วนตัว</Link>
        </div></>
    );
}

export default profile;