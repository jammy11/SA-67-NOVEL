import React, { useState } from 'react';
import History from '../../compronents/Trasaction_compnents/history_tran';
import '../CoinsAndTransaction/CoinsAndTransaction.css';
import Popup1 from '../../compronents/Trasaction_compnents/pop_PP1';
import Popup2 from '../../compronents/Trasaction_compnents/pop_WL1';
import Popup3 from '../../compronents/Trasaction_compnents/pop_CD1';
import Headers from '../../compronents/Pubblic_components/headerselect';
import YourComponent from '../../compronents/Test_compnests/Buytest';
const Test: React.FC = () => {
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
          
                <YourComponent/>
                
            </div>
        </>
    );
};

export default Test;