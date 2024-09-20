import React from 'react';
import { DollarCircleOutlined } from '@ant-design/icons';

interface WithdrawFormProps {
  accountNumber: string;
  fullName: string;
  onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ accountNumber, fullName, onAccountNumberChange, onFullNameChange, onSubmit }) => {
  return (
    <div>
      <input 
        type="text" 
        className="input-field" 
        placeholder="เลขบัญชีผู้รับเงิน"
        value={accountNumber}
        onChange={onAccountNumberChange}
      />
      <input 
        type="text" 
        className="input-field" 
        placeholder="ชื่อนามสกุล"
        value={fullName}
        onChange={onFullNameChange}
      />
      <button className="work-button-withdraw-save" onClick={onSubmit}>
        <DollarCircleOutlined style={{ fontSize: '30px' }} /> ยืนยันการถอนเงิน
      </button>
    </div>
  );
};

export default WithdrawForm;
