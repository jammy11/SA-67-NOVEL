// saveButton.tsx
import React from 'react';
import './saveButtonNovel.css' ;

const SaveButton: React.FC = () => {
  const handleSaveData = () => {
    // ตรรกะสำหรับการบันทึกข้อมูลของคุณ
    console.log('บันทึกข้อมูล!'); 
  };

  return (
    <button className="submit-button" onClick={handleSaveData}> 
      บันทึกข้อมูล
    </button>
  );
};

export default SaveButton;
