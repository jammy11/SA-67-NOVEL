import React from 'react';
import './login.css';
import TOP from '../../../compronents/header';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const Signup = () => {
        navigate('/register'); 
    };

    return (
    <><TOP/>
        <div className="container">
            <h1 className="title">เข้าสู่ระบบ</h1>
            <form>
                <div className="form-group">
                    <label>อีเมล</label>
                    <input type="email" />
                </div>
                <div className="form-group">
                    <label>รหัสผ่าน</label>
                    <input type="password" />
                </div>
                <div className="button-group">
                    <button type="submit" className="login-btn">เข้าสู่ระบบ</button>
                    <button type="button" className="signup-btn" onClick={Signup}>สมัครสมาชิก</button>
                    </div>
                </form>
            </div>
    </>
    );
};

export default Login;
