import React, { useEffect, useState } from 'react';
import './Income.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import { DollarCircleOutlined, DownOutlined } from '@ant-design/icons';
import CategoryNavWriter from '../../compronents/Writer_components/CatogoryNavWriter';
import WithdrawConfirm from '../../compronents/Writer_components/withdraw/WithdrawConfirmPopup';
import SuccessPopup from '../../compronents/Writer_components/withdraw/SuccessPopup_withdraw';
import { GetUsersById, updateIncomeReduce } from '../../services/https/User/user';
import { CreateTransaction } from '../../services/https/Transaction/transaction';

const Withdraw: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedBank, setSelectedBank] = useState("เลือกธนาคาร"); 
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>(""); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); 
  const [income, setIncome] = useState<number | null>(null); 
  const [error, setError] = useState<string | null>(null); // สำหรับแสดงข้อความเตือนในช่องกรอกจำนวนเงิน
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
  }, [userId]);

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
    setError(null); // รีเซ็ตข้อผิดพลาดก่อนการตรวจสอบ

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
      setError("กรุณากรอกจำนวนเงินที่ถูกต้อง"); // แสดงข้อผิดพลาดที่ช่องกรอก
      return;
    }

    if (amount < 100) {
      setError("จำนวนเงินถอนขั้นต่ำคือ 100 บาท"); // แสดงข้อผิดพลาดที่ช่องกรอก
      return;
    }

    if (amount > income) {
      setError("ยอดเงินไม่เพียงพอ"); // แสดงข้อผิดพลาดที่ช่องกรอก
      return;
    }

    const incomeValue = amount;
    const taxValue = incomeValue * 0.03;
    const commissionValue = incomeValue * 0.4;
    const netIncomeValue = (incomeValue - taxValue - commissionValue).toFixed(2);

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
    await CreateTransaction({
      trans_type: "ถอน",
      payment: selectedBank,
      amount_t: Number(withdrawAmount),
      user_id: Number(userId)
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

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // อนุญาตเฉพาะตัวเลข
    setWithdrawAmount(value);
    setError(null); // รีเซ็ตข้อผิดพลาดเมื่อมีการเปลี่ยนค่า
  };

  return (
    <>
      <Headers />
      <CategoryNavWriter />
      <div className='layout-bg-Withdraw'>
        <div className='bg-withdraw'>
        <label className='work-text-income'>WITHDRAW</label>
        <div className='work-text-incomeUser' style={{ display: 'flex', alignItems: 'center' }}>
          <img src="..\src\assets\coin.png" style={{ marginRight: '10px', width: '80px', height: '80px' }} />
          {income !== null ? `${income} เหรียญ` : 'Loading...'}
          &nbsp; = &nbsp;
          {income !== null ? `${(income * 0.5 - income * 0.5 * 0.03 - income * 0.5 * 0.4).toFixed(2)} บาท` : 'Calculating...'}
        </div>

        <input 
          type="text" 
          className={`input-field ${error ? 'error' : ''}`} 
          placeholder="กรอกจำนวนเงินที่ต้องการถอน"
          value={withdrawAmount}
          onChange={handleWithdrawAmountChange} 
        />
        {error && <p className="error-message-withdraw">{error}</p>} {/* แสดงข้อความเตือนถ้ามีข้อผิดพลาด */}

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
          onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))} // อนุญาตเฉพาะตัวเลข
        />

        <input 
          type="text" 
          className="input-field" 
          placeholder="ชื่อนามสกุล"
          value={fullName}
          onChange={(e) => setFullName(e.target.value.replace(/[0-9]/g, ''))} // ไม่อนุญาตให้ใส่ตัวเลข
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
                  selectedBank={selectedBank}
                  fullName={fullName}
                  accountNumber={accountNumber}
                  onConfirm={handleConfirmWithdraw} netIncomeValue={''}        />

        {/* Success Popup */}
        <SuccessPopup 
          isOpen={isSuccessPopupOpen} 
          onClose={handleCloseSuccessPopup} 
        />
</div>
</div>
    </>
  );
};

export default Withdraw;
