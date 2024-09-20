import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Card, Space, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Headers from '../../compronents/Pubblic_components/headerselect'; 
import { UsersInterface } from '../../interface/profile_interface/IProfile';
import { GetUsersById, UpdateUsersById } from '../../services/https/User/user';
import dayjs from 'dayjs';
import './editProfile.css'; 

const { Option } = Select;

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { id } = useParams<{ id: any }>();
    const [password, setPassword] = useState<string>('');

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
};

    useEffect(() => {
        const fetchUser = async () => {
            const id = localStorage.getItem('id'); // Get the logged-in user's ID
            if (id) {
                try {
                    const res = await GetUsersById(id); // Use the ID from localStorage
                    if (res.status === 200) {
                        form.setFieldsValue({
                            user_name: res.data.user_name,
                            email: res.data.email,
                            first_name: res.data.first_name,
                            last_name: res.data.last_name,
                            gender: res.data.gender,
                            BirthDate: dayjs(res.data.birth_date), 
                        });
                    } else {
                    }
                } catch (error) {
                    messageApi.open({
                        type: 'error',
                        content: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
                    });
                }
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'ไม่พบ ID ของผู้ใช้',
                });
                navigate('/profile');
            }
        };

        fetchUser();
    }, [form, messageApi, navigate]);

    const onFinish = async (values: UsersInterface) => {
        const id = localStorage.getItem('id'); // Get the logged-in user's ID
        if (!id) {
            messageApi.open({
                type: 'error',
                content: 'ไม่พบ ID ของผู้ใช้',
            });
            return;
        }

        let payload = {
            ...values,
            BirthDate: values.birth_date ? dayjs(values.birth_date).format('YYYY-MM-DD') : undefined, // Format the date
            password: password, // Ensure password is included
        };

        try {
            const res = await UpdateUsersById(id, payload); // Use the correct ID parameter
            if (res.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: res.data.message,
                });
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล',
            });
        }
    };

    return (
        <div className="edit-profile-container">
            {contextHolder}
            <Headers />
            <a className="backiconE" href="/profile">
                <img id='ibackE' src="./src/assets/back1.png" alt="back" />
            </a>
            <div className="head">
                <span className="current">Profile → แก้ไขข้อมูลส่วนตัว</span>
            </div>
            <div className="profile-summary">
                <div className="profile-picture"></div>
                <a href="#" className="edit-profile">แก้ไขรูปโปรไฟล์</a>
            </div>
            <div className="content">
                <div className="edit-box">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="ชื่อผู้ใช้"
                                    name="user_name"
                                    className="edit-item"
                                >
                                    <Input className="input-field" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="รหัสผ่าน"
                                    name="password"
                                    className="edit-item"
                                >
                                    <Input.Password value={password} onChange={handlePasswordChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="อีเมล"
                                    name="email"
                                    className="edit-item"
                                >
                                    <Input className="input-email" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="ชื่อ"
                                    name="first_name"
                                    className="edit-item"
                                >
                                    <Input className="input-field" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="นามสกุล"
                                    name="last_name"
                                    className="edit-item"
                                >
                                    <Input className="input-field" />
                                </Form.Item>
                            </Col>
                        </Row>
                            <Col span={12}>
                                <Form.Item
                                    label="เพศ"
                                    name="gender"
                                    className="edit-item"
                                >
                                    <Select placeholder="เลือกเพศ" className="input-field">
                                        <Option value="ชาย">ชาย</Option>
                                        <Option value="หญิง">หญิง</Option>
                                        <Option value="ไม่ระบุ">ไม่ระบุ</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="วันเกิด"
                                    name="birth_date"
                                    className="edit-item"
                                >
                                    <DatePicker style={{ width: '80%' }} className="input-field" />
                                </Form.Item>
                            </Col>
                        <Form.Item>
                            <div className="buttons">
                                <a href="/profile">
                                    <Button className="cancel-button">ยกเลิก</Button>
                                </a>
                                <Button type="primary" htmlType="submit" className="save-button">
                                    บันทึก
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;