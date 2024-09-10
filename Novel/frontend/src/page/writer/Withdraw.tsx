import React, { useState } from 'react';
import './Withdraw.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import { DollarCircleOutlined, DownOutlined } from '@ant-design/icons';
import CategoryNavWriter from '../../compronents/WriterComponents/CatogoryNavWriter';
import { InterfaceWriter } from '../../interface/writer_interface/writerPersonalInterface';

interface WithdrawProps extends Pick<InterfaceWriter, 'WriterID' | 'Income'> {}

const Withdraw: React.FC<WithdrawProps> = ({ WriterID, Income }) => {
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

    const incomeValue = Income * 0.5;
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
      <Headers />
      <CategoryNavWriter />
      <div className='lb'>
        <label className='work-text-income'>WITHDRAW</label>
        <div className='work-text-incomeUser' style={{ display: 'flex', alignItems: 'center' }}>
          <img src="..\src\assets\coins.png" alt="รายได้" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
          {Income} &nbsp; <span>เหรียญ</span>
          &nbsp;{/* เพิ่มช่องว่าง */}
          ภาษี 3% และ คอมมิชชั่น =
          &nbsp;{/* เพิ่มช่องว่าง */}
          {(Income * 0.5 - Income * 0.5 * 0.03 - Income * 0.5 * 0.4).toFixed(2)} บาท
        </div>
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
          onChange={handleAccountNumberChange} 
        />
        <input 
          type="text" 
          className="input-field" 
          placeholder="ชื่อนามสกุล"
          value={fullName}
          onChange={handleFullNameChange} 
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
