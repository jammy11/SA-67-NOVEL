import React from 'react';
import './EditProfile.css';
import TOP from '../../compronents/header';
import { Link } from 'react-router-dom';

const editProfile: React.FC = () => {
    return (
        <><TOP/>
        <div className="edit-profile-container">
            <div className="head">
                Profile → <span className="current">แก้ไขข้อมูลส่วนตัว</span>
            </div>
            <div className="content">
                <div className="edit-box">
                    <div className="edit-item">
                        <span className="label">ชื่อผู้ใช้</span>
                        <span className="value">: pat01</span>
                    </div>
                    <div className="edit-item">
                        <span className="label">รหัสผ่าน</span>
                        <span className="value">: ********</span>
                        <a href="#" className="change">เปลี่ยนรหัสผ่าน</a>
                    </div>
                    <div className="edit-item">
                        <span className="label">อีเมล</span>
                        <span className="value">: pat2@gmail.com</span>
                        <a href="#" className="change">เปลี่ยนอีเมล</a>
                    </div>
                    <div className="edit-item">
                        <span className="label">ชื่อ นามสกุล</span>
                        <span className="value">: </span>
                        <a href="#" className="change">เปลี่ยนชื่อ-นามสกุล</a>
                    </div>
                    <div className="edit-item">
                        <span className="label">เพศ</span>
                        <span className="value">: ไม่ระบุ</span>
                    </div>
                    <div className="edit-item">
                        <span className="label">วันเกิด</span>
                        <span className="value">:</span>
                    </div>
                    <div className="buttons">
                    <Link to="/profile"className="cancel-button">ยกเลิก</Link>
                        <button className="save-button">บันทึก</button>
                    </div>
                </div>
                <div className="profile-summary">
                <div className="profile-picture"></div>
                    <a href="#" className="edit-profile">แก้ไขรูปโปรไฟล์</a>
                </div>
            </div>
        </div></>
    );
}

export default editProfile;