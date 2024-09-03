import React from 'react';
import './profile.css'
import Headers from '../../compronents/headerselect';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    return (
        <><Headers/>
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture"></div>
                <div className="profile-username">@ชื่อผู้ใช้</div>
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
                    <span className="label">รหัสผ่าน</span>
                    <span className="value">: ********</span>
                </div>
                <div className="item">
                    <span className="label">เพศ</span>
                    <span className="value">: ไม่ระบุ</span>
                </div>
            </div>
            <Link to="/editProfile" className="editProfile">แก้ไขข้อมูลส่วนตัว</Link>
        </div></>
    );
}

export default Profile;