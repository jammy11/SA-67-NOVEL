import React from 'react';
import { Form, Input, Button, Radio, DatePicker, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import TOP from '../../../compronents/header'; // Adjust this path if needed
import './register.css';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log(values);
        setTimeout(() => {
            navigate('/login'); 
        }, 1000); 
    };

    return (
        <>
            <TOP />
            <div className="container">
                <Card className="card-register" style={{ width: '100%', maxWidth: 600 }}>
                    <h1 className="title">สมัครสมาชิก</h1>
                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="ชื่อจริง"
                                    name="firstName"
                                    rules={[{ required: true, message: 'กรุณากรอกชื่อจริง!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="นามสกุล"
                                    name="lastName"
                                    rules={[{ required: true, message: 'กรุณากรอกนามสกุล!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item
                                    label="ชื่อผู้ใช้"
                                    name="username"
                                    rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="รหัสผ่าน"
                                    name="password"
                                    rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="อีเมล"
                            name="email"
                            rules={[
                                { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง!' },
                                { required: true, message: 'กรุณากรอกอีเมล!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="เพศ"
                            name="gender"
                            rules={[{ required: true, message: 'กรุณาเลือกเพศ!' }]}
                        >
                            <Radio.Group>
                                <Radio value="male">ชาย</Radio>
                                <Radio value="female">หญิง</Radio>
                                <Radio value="other">ไม่ระบุ</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="วันเกิด"
                            name="birthDate"
                            rules={[{ required: true, message: 'กรุณาเลือกวันเกิด!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-btn">
                                ยืนยันการสมัคร
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Register;
