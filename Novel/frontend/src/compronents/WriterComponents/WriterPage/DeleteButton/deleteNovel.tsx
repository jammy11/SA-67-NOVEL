import React, { useState } from 'react';
import './deleteNovel.css';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteNovelButton: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmDelete = () => {
        // TODO: Implement the delete logic here
        setIsPopupOpen(false);
        setIsSuccessPopupOpen(true);
        setTimeout(() => {
            setIsSuccessPopupOpen(false);
        }, 2000); // Auto-close success popup after 2 seconds
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
