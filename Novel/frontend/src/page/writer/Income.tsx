import React from 'react';
import './Income.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import CategoryNavWriter from '../../compronents/WriterComponents/CatogoryNavWriter';
import { DollarCircleOutlined } from '@ant-design/icons';
import { InterfaceWriter } from '../../interface/writer_interface/writerPersonalInterface'; 

type IncomeData = Pick<InterfaceWriter, 'WriterID' | 'Income'>;

const Income: React.FC = () => {
    const loggedInWriterId = "2"; // สมมติว่า writerId ของผู้ใช้ที่ล็อกอินคือ "1"

    const incomes: IncomeData[] = [
        { WriterID: "1", Income: 5555 },
        { WriterID: "2", Income: 6666 }
    ];

    // กรองข้อมูลที่ตรงกับ WriterID ของผู้ใช้ที่ล็อกอิน
    const filteredIncomes = incomes.filter(incomeData => incomeData.WriterID === loggedInWriterId);

    return (
        <>
            <Headers />
            <CategoryNavWriter />
            <div className='bg-Income'>
                <div className="text-income-container">
                <label className='text-income'>รายได้ของคุณ</label>
                </div>
                {filteredIncomes.map((incomeData, index) => (
                <div key={index} className='work-text-incomeUser' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="..\..\src\assets\coin.png"  style={{ marginRight: '10px' }} />
                    {incomeData.Income}&nbsp; <span style={{ color: '#FFB800' }}>เหรียญ</span>
                </div>
                ))}
                <div className='withdraw-button-container'>
                <a href='/Withdraw' style={{ textDecoration: 'none' }}>      
                <button className="work-button-withdraw">
                        <DollarCircleOutlined style={{ fontSize: '60px' }} /> WITHDRAW
                    </button>
              
                </a>
                </div>
            </div>
        </>
    );
};

export default Income;