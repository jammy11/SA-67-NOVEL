import React, { useState } from 'react';
import Demo from '../../compronents/path/ExampleData';
import './CoinsAndTransaction.css';
import Popup1 from '../../compronents/pop_PP1';
import Popup2 from '../../compronents/pop_WL1';
import Popup3 from '../../compronents/pop_CD1';

import Headers from '../../compronents/headerselect';

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
         <Headers/>
        
        <div className="g2">
     
            <div className="g2_1">
                <a className="backicon" href="/" >
                    <img id='iback' src="./src/assets/back.png" alt="back" />
                </a>
                <h3>&nbsp;&nbsp;เลือกช่องทางการชำระเงิน</h3>
            </div>
            <div className="g2_2">
            <Popup1/>
            <Popup2/>
            <Popup3/>
            </div>
            <hr width='98%' />
            <div className="g2_1">
               
                <h3>&nbsp; <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ประวัติการทำธุรกรรม</h3>
            </div>
            <div className="table">
                
                <Demo />
                
            </div>
        </div>
        </>
    );
};

export default Payment;