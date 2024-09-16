// components/Withdraw.tsx

import React, { useEffect, useState } from 'react';
import './Withdraw.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import { DollarCircleOutlined, DownOutlined } from '@ant-design/icons';
import CategoryNavWriter from '../../compronents/WriterComponents/CatogoryNavWriter';
import WithdrawConfirm from '../../compronents/WriterComponents/withdraw/WithdrawConfirmPopup';
import SuccessPopup from '../../compronents/WriterComponents/withdraw/SuccessPopup_withdraw';
import { GetUsersById, updateIncomeReduce } from '../../services/https/User/user';
import { CreateTransaction } from '../../services/https/Transaction/transaction';

const Withdraw: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedBank, setSelectedBank] = useState("เลือกธนาคาร"); 
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>(""); // State for withdrawal amount
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); 
  const [income, setIncome] = useState<number | null>(null); // State for income
  const [netIncomeValue, setNetIncomeValue] = useState<string>("");
  const userId = localStorage.getItem('id');
  useEffect(() => {
    const fetchIncome = async () => {
      try {
       
        if (userId) {
          const userData = await GetUsersById(String(userId));
          setIncome(userData.data.income);
        }
      } catch (error) {
        console.error('Error fetching user income:', error);
      }
    };

    fetchIncome();
  }, []);

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
    if (selectedBank === "เลือกธนาคาร" || !accountNumber || !fullName || !withdrawAmount) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (income === null) {
      alert("กรุณารอให้ข้อมูลรายได้ถูกโหลด");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }

    const incomeValue = amount;
    const taxValue = incomeValue * 0.03;
    const commissionValue = incomeValue * 0.4;
    const netIncomeValue = (incomeValue - taxValue - commissionValue).toFixed(2);

    setNetIncomeValue(netIncomeValue);
    setIsPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmWithdraw = async () => {
    if (income === null) {
      alert("Error: Income data is not available.");
      return;
    }

    await updateIncomeReduce(parseFloat(withdrawAmount), localStorage.getItem('id') || '', setIncome);
    const transactionResponse = await CreateTransaction({
        trans_type: "ถอน",
        payment: selectedBank,
        amount_t: Number(withdrawAmount),
        user_id:Number(userId)
      });
        

    alert("บันทึกข้อมูลการถอนเงินเรียบร้อยแล้ว");
    setAccountNumber("");
    setFullName("");
    setWithdrawAmount("");
    handleClosePopup();
    setIsSuccessPopupOpen(true); 
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(inputValue);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[0-9]/g, '');
    setFullName(inputValue);
  };

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value);
  };

  return (
    <>
      <Headers />
      <CategoryNavWriter />
      <div className='bg-withdraw'>
        <label className='work-text-income'>WITHDRAW</label>
        <div className='work-text-incomeUser' style={{ display: 'flex', alignItems: 'center' }}>
          <img src="..\src\assets\coin.png" style={{ marginRight: '10px', width: '80px', height: '80px' }} />
          {income !== null ? `${income} เหรียญ` : 'Loading...'}
          &nbsp; = &nbsp;
          {income !== null ? `${(income * 0.5 - income * 0.5 * 0.03 - income * 0.5 * 0.4).toFixed(2)} บาท` : 'Calculating...'}
        </div>

       const a = <input 
          type="text" 
          className="input-field" 
          placeholder="กรอกจำนวนเงินที่ต้องการถอน"
          value={withdrawAmount}
          onChange={handleWithdrawAmountChange} 
        />

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
