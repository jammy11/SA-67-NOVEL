import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Alert } from 'antd';
import './pop.css';
import './pop_PP1.css';
import { Package } from '../interface/interface';
import { GetPackages } from '../services/https';
import CoinCard from './coinCard';
import { updateCoinBalance } from '../services/https';
import { CreateTransaction } from '../services/https';

const Popup1: React.FC = () => {
  const [Package, setPackage] = useState(false);
  const closePackage = () => setPackage(false);
  const showPackages = () => setPackage(true);
  
  const [PromPay, setPromPay] = useState(false);
  const closePromPay = () => setPromPay(false);


  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);

  const [Price, setPrice] = useState(0);
  const [Amount, setAmount] = useState(0);
  const [Key, setKey] = useState(0);
  const [balance, setBalance] = useState<number>(0);
  const userIdstr = localStorage.getItem("id");
  const userId = Number(userIdstr || 0);
  const refresh = () => {
    window.location.reload();
};


  const ConfirmPackage = (amount: number,price: number,key: number ) => {
    setAmount(amount);
    setPrice(price);
    setKey(key)
    setPackage(false);
    setPromPay(true);
  };


  const confirmPayment = () => {
    
    setPromPay(false);
    updateCoinBalance(Amount,setBalance);
    CreateTransaction({
      trans_type: "เติมเหรียญ",
      payment: "พร้อมเพย์",
      user_id: userId,
      package_id: Key
    });
    // refresh();

    const newAlert = {
      id: Date.now(),
      message: `เสร็จสิ้น , คุณได้รับเหรียญ ${Amount} คอยน์`,
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 1)]); // Add new alert, keep only 2 in the list
  };

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(prev => prev.slice(0, -1)); // Remove the last alert after 15 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await GetPackages();
      const data = response.data; // Extract the data array from the response
      setPackages(data);
    };

    fetchPackages();
  }, []);

  return (
    <>
      <div className="cardPayment" onClick={showPackages}>
        <div className="box2">
          <div className="box1"></div>
          <img id="imgC" src="./src/assets/prompt-pay.png" alt="prompt-pay" />
          <div className="box1">
            <span><b>พร้อมเพย์</b></span>
          </div>
        </div>
      </div>

      
      <Modal show={Package} onHide={closePackage}>
  <div className='aap'>
    <div className='prop'>คุ้มสุด!</div>
    <div className="g2p">
      <div className="g2_1p">
        <h3>แพ็กเกจ</h3>
        <div className="cancelIconp" onClick={closePackage}>
          <img src="./src/assets/cancel-svgrepo-com.svg" alt="Cancel" />
        </div>
      </div>
      <div className="g2_2p">
      {/* Mapping through the packages array */}
      {packages.filter(data => [1,2,3,4,5,6].includes(data.ID)).map((data) => (
        <CoinCard 
          key={data.ID}
          amount={data.pack_amount} 
          price={data.pack_price}  
          imgSrc={data.pack_pic} 
          sendData={() => ConfirmPackage(data.pack_amount, data.pack_price, data.ID)}
        />
      ))}
      </div>
    </div>
  </div>
</Modal>


      <Modal show={PromPay} onHide={closePromPay}>
        <div className="g2r">
          <div className="g2_1x">
            <h3>ดำเนินการชำระเงิน</h3>
            <div className="cancelIcon" onClick={closePromPay}>
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
                <span id='sp'>{Price}</span>
              </div>
              <button className='submitPP' onClick={confirmPayment}>
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
