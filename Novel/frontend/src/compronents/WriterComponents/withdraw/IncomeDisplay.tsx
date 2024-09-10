import React from 'react';

interface IncomeDisplayProps {
  income: number;
}

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({ income }) => {
  const coinValue = 0.50;
  const totalBaht = income * coinValue;
  const tax = 0.03 * totalBaht;
  const commission = 0.40 * totalBaht;
  const netIncome = totalBaht - tax - commission;

  return (
    <div className='work-text-incomeUser-withdraw' style={{ display: 'flex', alignItems: 'center' }}>
      <img src="..\src\assets\coin.png" alt="รายได้" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
      {income} &nbsp; <span>เหรียญ</span> 
      &nbsp; ภาษี 3% และ คอมมิชชั่น = {netIncome.toFixed(2)} บาท
    </div>
  );
};

export default IncomeDisplay;
