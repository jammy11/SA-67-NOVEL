import React, { useState } from 'react';
import './Withdraw.css'; 
import TOP from '../../compronents/Pubblic_components/header';
import { DollarCircleOutlined, DownOutlined } from '@ant-design/icons';
import CategoryNavWriter from '../../compronents/Writer_components/CatogoryNavWriter';

interface IncomeData {
  income: number;
  date: string; 
}

const Withdraw: React.FC = () => {
  const incomes: IncomeData[] = [
    { income: 666, date: '2023-12-25' },
    // ... more income data
  ];

  const [isOpen, setIsOpen] = useState(false); 
  const [selectedBank, setSelectedBank] = useState("เลือกธนาคาร"); 
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [netIncomeValue, setNetIncomeValue] = useState<string>("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
    setIsOpen(false); 
  };

  const banks = [
    "ธนาคารไทยพาณิชย์ (SCB)",
    "ธนาคารกรุงเทพ (BBL)",
    "ธนาคารกสิกรไทย (KBank)",
    "ธนาคารกรุงไทย (KTB)"
  ];

  const handleWithdraw = () => {
    if (selectedBank === "เลือกธนาคาร" || !accountNumber || !fullName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const incomeValue = incomes[0].income * 0.5;
    const taxValue = incomeValue * 0.03;
    const commissionValue = incomeValue * 0.4;
    const netIncomeValue = (incomeValue - taxValue - commissionValue).toFixed(2); // ปัดเศษทศนิยมตัวที่สาม

    setNetIncomeValue(netIncomeValue);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmWithdraw = () => {
    // TODO: ดำเนินการถอนเงินจริงที่นี่

    // แสดง alert หรือทำอย่างอื่นหลังจากบันทึกข้อมูลสำเร็จ
    alert("บันทึกข้อมูลการถอนเงินเรียบร้อยแล้ว");

    // เคลียร์ข้อมูลใน input
    setAccountNumber("");
    setFullName("");
    handleClosePopup();
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // อนุญาตเฉพาะตัวเลข
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(inputValue);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ไม่อนุญาตให้มีตัวเลข
    const inputValue = e.target.value.replace(/[0-9]/g, '');
    setFullName(inputValue);
  };

  return (
    <>
      <TOP />
      <CategoryNavWriter />
      <div className='lb'>
        <label className='work-text-withdraw'>WITHDRAW</label>
        {incomes.map((incomeData) => {
          const coinValue = 0.50; 
          const totalBaht = incomeData.income * coinValue;
          const tax = 0.03 * totalBaht;
          const commission = 0.40 * totalBaht;
          const netIncome = totalBaht - tax - commission;

          return (
            <div key={incomeData.date} className='work-text-incomeUser-withdraw' style={{ display: 'flex', alignItems: 'center' }}>
              <img src="..\src\assets\coin.png" alt="รายได้" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
              {incomeData.income} &nbsp; <span>เหรียญ</span> 
              &nbsp;{/* เพิ่มช่องว่าง */}
              ภาษี 3% และ คอมมิชชั่น =
              &nbsp;{/* เพิ่มช่องว่าง */}
              {netIncome.toFixed(2)} บาท
            </div>
          )
        })} 
        <div className="work-dropdown-item" onClick={handleClick}>
          <span>{selectedBank}</span>
          <DownOutlined style={{ float: 'right' }} rotate={isOpen ? 180 : 0} /> 
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {banks.map((bank, index) => (
              <div key={index} className="work-dropdown-item" onClick={() => handleSelectBank(bank)}>
                {bank}
              </div>
            ))}
          </div>
        )}

        <input 
          type="text" 
          className="input-field" 
          placeholder="เลขบัญชีผู้รับเงิน"
          value={accountNumber}
          onChange={handleAccountNumberChange} // ใช้ event handler ที่สร้างขึ้น
        />
        <input 
          type="text" 
          className="input-field" 
          placeholder="ชื่อนามสกุล"
          value={fullName}
          onChange={handleFullNameChange} // ใช้ event handler ที่สร้างขึ้น
        />
        <button className="work-button-withdraw-save" onClick={handleWithdraw}> 
          <DollarCircleOutlined style={{ fontSize: '30px' }} /> ยืนยันการถอนเงิน
        </button>

        {/* Popup */}
        {isPopupOpen && (
    <div className="popup-overlay">
        <div className="popup-content">
            <h2>ยืนยันการถอนเงิน</h2>
            <p>
                คุณต้องการถอนเงินจำนวน {netIncomeValue} บาท ไปยังบัญชี {selectedBank} ใช่หรือไม่?
            </p>
            <p>
                ชื่อผู้ถอน: {fullName}<br />
                เลขบัญชี: {accountNumber}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleClosePopup} style={{ marginRight: '10px'}}>ยกเลิก</button>
                <button onClick={handleConfirmWithdraw} >ยืนยัน</button>
            </div>
        </div>
    </div>
)}

      </div>
    </>
  );
};

export default Withdraw;
