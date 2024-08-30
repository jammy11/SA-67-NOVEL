import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Alert } from 'antd';
import './pop.css';
import './pop_PP1.css';
import { CoinCardProps } from '../interface/interface';

const CoinCard = ({ amount, price, imgSrc, showButton = true, handleCloseParent }: CoinCardProps) => (
  <div className="cardCoinp">
    <div className="box11p">
      <img id='iconp' src='./src/assets/coin-50.png' alt="Gold Coin" />
      <span><b>{amount.toFixed(2)}</b></span>
    </div>
    <div className="box22p">
      <img id='imgCp' src={imgSrc} alt={`coin-${amount}`} />
    </div>
    <div className="box33p">
      {showButton ? (
        <button className='thbp' onClick={() => handleCloseParent(price)}>
          <b>{price.toFixed(2)}</b>
        </button>
      ) : (
        <button className='thbp'><b>{price.toFixed(2)}</b></button>
      )}
    </div>
  </div>
);

const Popup1: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [popup2Price, setPopup2Price] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePopup1Confirm = (price: number) => {
    setSelectedAmount(price);
    setPopup2Price(price);
    setShow(false);
    setShowPopup2(true);
  };

  const handleClosePopup2 = () => setShowPopup2(false);

  const handleConfirmPayment = () => {
    setShowPopup2(false);
    const newAlert = {
      id: Date.now(),
      message: `เสร็จสิ้น , คุณได้รับเหรียญ ${selectedAmount} คอยน์`,
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 1)]); // Add new alert, keep only 2 in the list
  };

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(prev => prev.slice(0, -1)); // Remove the last alert after 15 seconds
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  return (
    <>
      <div className="cardPayment" onClick={handleShow}>
        <div className="box2">
          <div className="box1"></div>
          <img id="imgC" src="./src/assets/prompt-pay.png" alt="prompt-pay" />
          <div className="box1">
            <span><b>พร้อมเพย์</b></span>
          </div>
        </div>
      </div>

      {/* Popup 1 */}
      <Modal show={show} onHide={handleClose}>
        <div className='aap'>
          <div className='prop'>คุ้มสุด!</div>
          <div className="g2p">
            <div className="g2_1p">
              <h3>แพ็กเกจ</h3>
              <div className="cancelIconp" onClick={handleClose}>
                <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
              </div>
            </div>

            <div className="g2_2p">
              <CoinCard amount={70} price={50} imgSrc="./src/assets/coin-50.png" handleCloseParent={handlePopup1Confirm} />
              <CoinCard amount={120} price={100} imgSrc="./src/assets/coin-100.png" handleCloseParent={handlePopup1Confirm} />
              <CoinCard amount={240} price={200} imgSrc="./src/assets/coin-200.png" handleCloseParent={handlePopup1Confirm} />
              <CoinCard amount={360} price={300} imgSrc="./src/assets/coin-300.png" handleCloseParent={handlePopup1Confirm} />
              <CoinCard amount={699} price={500} imgSrc="./src/assets/coin-500.png" handleCloseParent={handlePopup1Confirm} />
              <CoinCard amount={1200} price={1000} imgSrc="./src/assets/coin-1000.png" handleCloseParent={handlePopup1Confirm} />
            </div>
          </div>
        </div>
      </Modal>

      {/* Popup 2 */}
      <Modal show={showPopup2} onHide={handleClosePopup2}>
        <div className="g2r">
          <div className="g2_1x">
            <h3>ดำเนินการชำระเงิน</h3>
            <div className="cancelIcon" onClick={handleClosePopup2}>
              <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
            </div>
          </div>
          <div className="g23">
            <div className="CardPromptPayP">
              <div className="box1">
                <span><b>สแกนโลด </b></span>
              </div>
              <div className="box2">
                <img id='imgqr' src="./src/assets/qr1000.jpg" alt="prompt-pay" />
              </div>
              <div className="box1">
                <span>ยอดรวม </span>
                <span id='sp'>{popup2Price.toFixed(2)}</span>
              </div>
              <button className='submitPP' onClick={handleConfirmPayment}>
                <b>เสร็จสิ้น</b>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Alerts */}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            message={alert.message}
            type="success"
            showIcon
            closable
            className="custom-alert"
          />
        ))}
      </div>
    </>
  );
};

export default Popup1;
