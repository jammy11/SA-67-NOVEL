import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Alert } from 'antd';
import './pop.css';
import './pop_CD1.css';

interface CoinCardProps {
  amount: number;
  price: number;
  imgSrc: string;
  onClick: () => void;
}
const CoinCard = ({ amount, price, imgSrc, onClick } : CoinCardProps )=>(
// const CoinCard: React.FC<CoinCardProps> = ({ amount, price, imgSrc, onClick }) => (
  <div className="cardCoinp" onClick={onClick}>
    <div className="box11p">
      <img id='iconp' src='./src/assets/coin-refill-50.svg' alt="Gold Coin" />
      <span><b>{amount.toFixed(2)}</b></span>
    </div>
    <div className="box22p">
      <img id='imgCp' src={imgSrc} alt={`coin-refill-${amount}`} />
    </div>
    <div className="box33p">
      <button className='thbp'><b>{price.toFixed(2)}</b></button>
    </div>
  </div>
);

const Popup3: React.FC = () => {

  const [show, setShow] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showPopup2_2, setShowPopup2_2] = useState<boolean>(false);
  const [showVerifyPopup, setShowVerifyPopup] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShowPopup2_2(true); // Show coin package popup first
  const handleClosePopup2_2 = () => setShowPopup2_2(false);
  
  const handleCloseVerify = () => setShowVerifyPopup(false);
  const handleCloseAlert = () => setShowAlert(false);

  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    setIsFormValid(form.checkValidity());
  };

  const handleConfirm = () => {
    setShow(false);
    setTimeout(() => setShowVerifyPopup(true), 300);
  };

  const handleCoinCardClick = (amount: number, price: number) => {
    setSelectedAmount(amount);
    setSelectedPrice(price);
    setShowPopup2_2(false);
    setTimeout(() => setShow(true), 300); // Show credit card form after selecting a package
  };

  const handleVerifyConfirm = () => {
    setShowVerifyPopup(false);
    setTimeout(() => setShowAlert(true), 300);
  };

  const cursorStyle = isFormValid ? {} : { cursor: 'not-allowed' };

  return (
    <>
      <div className="cardPayment" onClick={handleShow}>
        <div className="box2">
          <div className="box1"></div>
          <img id="imgC" src="./src/assets/credit-card.png" alt="credit-card" />
          <div className="box1">
            <span><b>เครดิต/เดบิต</b></span>
          </div>
        </div>
      </div>

      {/* Popup 2 */}
      <Modal show={showPopup2_2} onHide={handleClosePopup2_2}>
        <div className='aap'>
          <div className='prop'>คุ้มสุด!</div>
          <div className="g2p">
            <div className="g2_1p">
              <h3>แพ็กเกจ</h3>
              <div className="cancelIconp" onClick={handleClosePopup2_2}>
                <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
              </div>
            </div>
            <div className="g2_2p">
              <CoinCard amount={70} price={50} imgSrc="./src/assets/coin-refill-50.svg" onClick={() => handleCoinCardClick(70, 50)} />
              <CoinCard amount={120} price={100} imgSrc="./src/assets/coin-refill-100.svg" onClick={() => handleCoinCardClick(120, 100)} />
              <CoinCard amount={240} price={200} imgSrc="./src/assets/coin-refill-200.svg" onClick={() => handleCoinCardClick(240, 200)} />
              <CoinCard amount={360} price={300} imgSrc="./src/assets/coin-refill-300.svg" onClick={() => handleCoinCardClick(360, 300)} />
              <CoinCard amount={699} price={500} imgSrc="./src/assets/coin-refill-500.svg" onClick={() => handleCoinCardClick(699, 500)} />
              <CoinCard amount={1200} price={1000} imgSrc="./src/assets/coin-refill-1000.svg" onClick={() => handleCoinCardClick(1200, 1000)} />
            </div>
          </div>
        </div>
      </Modal>

      {/* Popup 1 */}
      <Modal show={show} onHide={handleClose}>
        <div className="aapx">
        <div className="g2tx">
          <div className="g2_1w">
            <h3>ดำเนินการชำระเงิน</h3>
            <div className="cancelIcon" onClick={handleClose}>
              <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
            </div>
          </div>
          <div className="g23">
            <div className="CardCreditCart">
              <form action="/submit-credit-card" method="POST" onChange={handleFormChange}>
                <div className="o1">
                  <label htmlFor="credit-card">หมายเลขบัตรเครดิต</label><br/>
                  <input type="text" id="credit-card" name="credit-card" pattern="\d{4}-\d{4}-\d{4}-\d{4}" placeholder="xxxx-xxxx-xxxx-xxxx" required /><br /><br />
                  <img id='imgcredit' src="./src/assets/credit-card.png" alt="credit-card" />
                </div>
                <div className="o2">
                  <label htmlFor="cardholder-name">ชื่อผู้ถือบัตร</label><br/>
                  <input type="text" id="cardholder-name" name="cardholder-name" placeholder="ชื่อผู้ถือบัตร" required /><br /><br />
                </div>
                <div className="o3">
                  <div className="exp">
                    <label htmlFor="expiry-date">วันหมดอายุ</label><br/>
                  </div>
                  <input type="text" id="expiry-date" name="expiry-date" pattern="\d{2}" placeholder="MM" required /><br /><br />
                  <input type="text" id="expiry-date" name="expiry-date" pattern="\d{2}" placeholder="YY" required /><br /><br />
                </div>
                <div className="o4">
                  <label htmlFor="cvc">CVC/CVV</label><br/>
                  <input type="text" id="cvc" name="cvc" pattern="\d{3}" placeholder="xxx" required /><br /><br />
                </div>
                <div className="o5">
                  <div className="o5_2">
                    <img id='imgSecureP' src="./src/assets/SecurePayment.png" alt="SecurePayment" /> &nbsp;SECURE PAYMENT
                  </div>
                </div>
              </form>
              <div className="o5_3">
                <button 
                  className='submitCD' 
                  onClick={handleConfirm} 
                  style={cursorStyle} 
                  disabled={!isFormValid}
                >
                  <b>ยืนยัน</b>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
      </Modal>

      {/* Popup Verify */}
      <Modal show={showVerifyPopup} onHide={handleCloseVerify}>
        <div className='aap'>
          <div className="g2q">
            <div className="g2_1p">
                <h3>ยืนยันการชำระเงิน</h3>
              <div className="cancelIconpForVerify" onClick={handleCloseVerify}>
              <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
              </div>
            </div>
            <div className="g2_2p">
              <div className='baseP'>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คุณกำลังซื้อ {selectedAmount} คอยน์ ในราคา {selectedPrice} บาท ยอดเงินจะถูกชำระผ่านช่องทาง บัตรเครดิต/เดบิต กรุณากดปุ่ม "ยืนยัน" เพื่อดำเนินการ  </p>
            </div>  
            <div className='bottonBox'>
              <button className='no' onClick={handleCloseVerify}><b>ยกเลิก</b></button>
              <button className='yes' onClick={handleVerifyConfirm}><b>ยืนยัน</b></button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Alert */}
      {showAlert && (
        <Alert
          message={`เสร็จสิ้น , คุณได้รับเหรียญ ${selectedAmount} คอยน์`}
          type="success"
          showIcon
          closable
          onClose={handleCloseAlert}
          className="custom-alert"
        />
      )}
    </>
  );
};

export default Popup3;
