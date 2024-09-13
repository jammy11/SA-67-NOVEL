import React, { useState } from 'react';
import './deleteNovel.css';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteNovelById } from '../../../../services/https/Novel/novel'; // ฟังก์ชันลบจาก API

interface DeleteNovelButtonProps {
    novelId: number; // รับ ID ของนิยายเข้ามา
    onDeleteSuccess: () => void; // ฟังก์ชัน callback เมื่อทำการลบสำเร็จ
}

const DeleteNovelButton: React.FC<DeleteNovelButtonProps> = ({ novelId, onDeleteSuccess }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsPopupOpen(true); // เปิด popup ยืนยันการลบ
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false); // ปิด popup เมื่อกดปุ่มยกเลิก
    };

    const handleConfirmDelete = async () => {
        if (novelId === undefined) {
            console.error("Error: novelId is undefined");
            return;
        }

        try {
            console.log(`Deleting novel with ID: ${novelId}`);
            const response = await DeleteNovelById(novelId.toString()); // ลบจาก API
            if (response.status === 200) {
                setIsPopupOpen(false);
                setIsSuccessPopupOpen(true);
                setTimeout(() => {
                    setIsSuccessPopupOpen(false);
                    onDeleteSuccess(); // เรียก callback เมื่อสำเร็จ
                }, 2000);
            } else {
                console.error("Error deleting novel:", response);
            }
        } catch (error) {
            console.error("Error deleting novel:", error);
        }
    };

    return (
        <>
            <button className="delete-Novel-button" onClick={handleDeleteClick}>
                <DeleteOutlined className="delete-icon" />
            </button>

            {/* Confirmation Popup */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>ยืนยันการลบ</h2>
                        <p>คุณแน่ใจหรือว่าต้องการลบนิยายนี้?</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={handleClosePopup} className="popup-cancel-button">ยกเลิก</button>
                            <button onClick={handleConfirmDelete} className="popup-confirm-button">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {isSuccessPopupOpen && (
                <div className="success-popup-overlay">
                    <div className="success-popup-content">
                        <h2>สำเร็จ</h2>
                        <p>ข้อมูลถูกลบเรียบร้อยแล้ว</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteNovelButton;
