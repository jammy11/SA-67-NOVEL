import React, { useState } from 'react';
import './Withdraw.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import { DollarCircleOutlined, DownOutlined } from '@ant-design/icons';
import CategoryNavWriter from '../../compronents/WriterComponents/CatogoryNavWriter';
import WithdrawConfirm from '../../compronents/WriterComponents/withdraw/WithdrawConfirmPopup';
import SuccessPopup from '../../compronents/WriterComponents/withdraw/SuccessPopup_withdraw';
import { InterfaceWriter } from '../../interface/writer_interface/writerPersonalInterface';

interface WithdrawProps extends Pick<InterfaceWriter, 'WriterID' | 'Income'> {}

const Withdraw: React.FC<WithdrawProps> = ({ WriterID, Income }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedBank, setSelectedBank] = useState("เลือกธนาคาร"); 
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // For success popup
  const [netIncomeValue, setNetIncomeValue] = useState<string>("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
    setIsOpen(false); 
  };

  const banks = [
    { name: "ธนาคารไทยพาณิชย์ (SCB)", logo: "../src/assets/scb-logo.png" },
    { name: "ธนาคารกรุงเทพ (BBL)", logo: "../src/assets/bbl-logo.png" },
    { name: "ธนาคารกสิกรไทย (KBank)", logo: "../src/assets/kbank-logo.png" },
    { name: "ธนาคารกรุงไทย (KTB)", logo: "../src/assets/ktb-logo.png" }
  ];

  const handleWithdraw = () => {
    if (selectedBank === "เลือกธนาคาร" || !accountNumber || !fullName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const incomeValue = Income * 0.5;
    const taxValue = incomeValue * 0.03;
    const commissionValue = incomeValue * 0.4;
    const netIncomeValue = (incomeValue - taxValue - commissionValue).toFixed(2);

    setNetIncomeValue(netIncomeValue);
    setIsPopupOpen(true); // Open confirmation popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmWithdraw = () => {
    alert("บันทึกข้อมูลการถอนเงินเรียบร้อยแล้ว");
    setAccountNumber("");
    setFullName("");
    handleClosePopup();
    setIsSuccessPopupOpen(true); // Open success popup after confirmation
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupOpen(false); // Close success popup
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(inputValue);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[0-9]/g, '');
    setFullName(inputValue);
  };

  return (
    <>
      <Headers />
      <CategoryNavWriter />
      <div className='bg-withdraw'>
        <label className='work-text-income'>WITHDRAW</label>
        <div className='work-text-incomeUser' style={{ display: 'flex', alignItems: 'center' }}>
          <img src="..\src\assets\coin.png"  style={{ marginRight: '10px', width: '80px', height: '80px' }} />
          {Income} &nbsp; <span>เหรียญ</span>
          &nbsp; = &nbsp;
          {(Income * 0.5 - Income * 0.5 * 0.03 - Income * 0.5 * 0.4).toFixed(2)} บาท
        </div>
        <div className="work-dropdown-item" onClick={handleClick}>
          <span>{selectedBank}</span>
          <DownOutlined style={{ float: 'right' }} rotate={isOpen ? 180 : 0} /> 
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {banks.map((bank, index) => (
              <div key={index} className="work-dropdown-item" onClick={() => handleSelectBank(bank.name)}>
                <img src={bank.logo} alt={bank.name} style={{ width: '30px', marginRight: '10px' }} />
                {bank.name}
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
        <div className='withdrawButton-container'>
          <button className="button-withdraw-save" onClick={handleWithdraw}> 
            <DollarCircleOutlined style={{ fontSize: '30px' }} /> ยืนยันการถอนเงิน
          </button>
        </div>

        {/* Withdraw Confirm Popup */}
        <WithdrawConfirm 
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          netIncomeValue={netIncomeValue}
          selectedBank={selectedBank}
          fullName={fullName}
          accountNumber={accountNumber}
          onConfirm={handleConfirmWithdraw}
        />

        {/* Success Popup */}
        <SuccessPopup 
          isOpen={isSuccessPopupOpen} 
          onClose={handleCloseSuccessPopup} 
        />
      </div>
    </>
  );
};

export default Withdraw;
