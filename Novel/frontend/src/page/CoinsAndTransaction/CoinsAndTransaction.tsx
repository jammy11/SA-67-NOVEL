import React, { useState } from 'react';
import Demo from '../../compronents/path/ExampleData';
import './CoinsAndTransaction.css';
import Popup1 from '../../compronents/pop_PP1';
import Popup2 from '../../compronents/pop_WL1';
import Popup3 from '../../compronents/pop_CD1';
import TOP from '../../compronents/header';

const Payment: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleCardClick = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    return (
        <>
        <TOP/>
        <div className="g2">
      
            <div className="g2_1">
                <a className="backicon" href="/" >
                    <img src="./src/assets/back.png" alt="back" />
                </a>
                <h3>เลือกช่องทางการชำระเงิน</h3>
            </div>
            <div className="g2_2">
            <Popup1/>
            <Popup2/>
            <Popup3/>
            </div>
            <hr width='90%' />
            <div className="g2_1">
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ประวัติการทำธุรกรรม</h3>
            </div>
            <div className="table">
                <Demo />
            </div>
        </div>
        </>
    );
};

export default Payment;
