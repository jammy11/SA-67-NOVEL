import './MM.css';
import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { useAuth } from '../Pubblic_components/AuthContextType'; // Import useAuth สำหรับดึงสถานะการล็อกอิน
import { GetCoinById, updateCoinBalanceReduce } from '../../services/https/Coin/coin';
import { CreateOrder } from '../../services/https/Order/order';
import { CreateTransaction } from '../../services/https/Transaction/transaction';
import { updateIncome } from '../../services/https/User/user';
import { useBalanceContext } from './BalanceContext';
import { CreateBookshelfList ,GetBookshelfListById,checkNovelIdInBookshelf} from '../../services/https/Bookshelf/bookshelf';
interface Novel {
  ID: number;
  novel_name: string;
  content: string;
  description: string;
  novel_type1: string;
  novel_type2: string;
  rate: string;
  writername: string;
  cover: string;
  novel_price: number;
  novel_like: number;
  buy_amount: number;
  writer_id: string;
  Writer: {
    user_name: string;
    email: string;
  };
 
}

interface CardProps {
  novel: Novel;

}

const Card: React.FC<CardProps> = ({ novel }) => {
  const [show2, setShow2] = useState(false);
  const [showNotLogin, setshowNotLogin] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showCoinAlert, setShowCoinAlert] = useState(false);
  const [showToShelf,setshowToShelf] = useState(false);
  const [showCanRead,setshowCanRead] = useState(false)

  const handlCloseCanRead = () => setshowCanRead(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const handleCloseUnlock = () => setshowNotLogin(false);
  const closeCoinAlert = () => setShowCoinAlert(false);
  const CloseshowToShelf  = () => setshowToShelf(false);
  const CloseConfirmation = () => setShowConfirmation(false);

  const [income, setIncome] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await GetCoinById(userId);
        setBalance(response.data.balance); 
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userId]);
  // ใช้ useAuth เพื่อตรวจสอบการล็อกอิน
  const { isLoggedIn } = useAuth(); // ใช้ useAuth เพื่อดึงสถานะการล็อกอิน
  const { triggerRefresh } = useBalanceContext(); 

  const checkLogin = async () => {
    console.log("checkLogin called");
    if (isLoggedIn) {
      console.log("User is logged in");
      console.log("Current balance:", balance);
      console.log("Novel price:", novel.novel_price);
      if(balance !== null && novel.novel_price < balance) {
            console.log("Balance is insufficient");
            setShow2(false);
            setShowConfirmation(true);
      }else {
            console.log("Balance is sufficient or null");
            setShow2(false);
            setShowCoinAlert(true);
        }
    }else {
      console.log("User is not logged in");
      setShow2(false);
      setshowNotLogin(true);
    }
  };


  const cheackHave = async () => {
    const HaveNovel = await checkNovelIdInBookshelf(userId,novel.ID);
    if(HaveNovel ===  "true"){
        setshowCanRead(true);
    }else{
        setShow2(true);

  }
  }
  const verifyPurchase = async () => {
    setShowConfirmation(false);
    try {
      console.log("Creating order...");
      const newOrder = await CreateOrder({
        user_id: Number(userId),
        novel_id: novel.ID,
      });
      
      console.log("Order response:", newOrder);  // Log the entire response
      const orderId = newOrder?.ID;
      console.log("Order ID:", orderId); 
      
      console.log("Creating income transaction...");
      await CreateTransaction({
        trans_type: "รายได้",
        user_id: Number(novel.writer_id),
        order_id: orderId,
        amount_t: novel.novel_price,
      });
  
      console.log("Creating purchase transaction...");
      await CreateTransaction({
        trans_type: "ซื้อนิยาย",
        user_id: Number(userId),
        order_id: orderId,
        amount_t: novel.novel_price,
      });
  
    
      await updateCoinBalanceReduce(novel.novel_price, setBalance); // Wait for this to complete
      triggerRefresh(); // Trigger refresh after balance is updated
  
      // Continue with updating income and showing to shelf
      await updateIncome(novel.novel_price, novel.writer_id, setIncome);
      setshowToShelf(true);
      CreateBookshelfList({bookshelf_id:Number(userId),novel_id:novel.ID});
    } catch (error) {
      console.error("Error creating order or transaction:", error);
  }
    setshowToShelf(true);
  };



  const toggleLike = () => setIsLiked(!isLiked);


  return (
    <>
      <div className='Mcard' onClick={cheackHave}>
        <img id='Mcard' src={novel.cover} alt={novel.novel_name} />
        <div className='tailbox'>
          <span id='htailb'><b>{novel.novel_name}</b></span>
          <div className='pb'>
            <div className='ffffx'>
            <HiMiniShoppingCart id='icart' />
            <span id='view_likeb'>{novel.buy_amount}</span>
            </div>
            
            <div className='ffffx'>
            <img
              id="ieyeb"
              src={isLiked ? "/src/assets/like.png" : "/src/assets/0heart.png"}
              alt="heart"
              onClick={toggleLike}
            />
            <span id='view_likeb'>{isLiked ? novel.novel_like + 1 : novel.novel_like}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showCanRead} onHide={handlCloseCanRead}>
        <div className='modal-content custom-modal'>
          <div className="page-product">
            <div onClick={handlCloseCanRead}>
              <img className="cancle" src="./src/assets/no.png" alt="cancel" />
            </div>
            
            <img id='Mcardnew' src={novel.cover} alt={novel.novel_name} />
            <img
              className="like1"
              src={isLiked ? "./src/assets/like.png" : "./src/assets/0heart.png"}
              alt="heart"
              onClick={toggleLike}
            />
            <div className="container-26">
              <div className="section">
                <div className="column">
                  <div className="body">
                    <div className="title">
                      <div className="text-heading">
                        <span id='text-heading'>
                          <span className="text-heading-1 text-cut"><b>{novel.novel_name}</b></span>
                        </span>
                      </div>
                      <div className="container-11">
                        <div className="container-4">
                          <div className="price">
                            <div className="tag-1">
                              <span id='tag1'>
                                <span className="tag2">
                                  <span id='tag2'>{novel.novel_type1}</span>
                                </span>
                              </span>
                            </div>
                            <div className="tag-1">
                              <span id='tag4'>
                                <span className="tag2">
                                  <span id='tag2'>{novel.novel_type2}</span>
                                </span>
                              </span>
                            </div>
                            <div className="tag">
                              <span id='tag'>
                                <span className="tag-3">
                                  <span id='tag3'><b>{novel.rate}</b></span>
                                </span>
                              </span>
                            </div>
                            <div className="text-price">
                              <span className="container-9">
                                <span id='price'>
                                  <span id='textprice'>{novel.novel_price}</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="component-13">
                          <span className="f-1">
                            <img id='coin' src="./src/assets/coin.png" alt="coin" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text">
                      <span className="text-1">
                        <span id='writer'>By {novel.writername}</span>
                      </span>
                    </div>
                  </div>
                 <a href='/bookshelf'> <div className="button" >
                    <span className="button-1" >
                      <span id='buttonlock'style={{display:'flex',alignItems:'center', justifyContent:'center',width: '153px'}}>
                        <span id='button1'>อ่าน</span>
                      </span>
                 
                    </span>
                  </div></a>
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="title1">
                        <span className="title1">เรื่องย่อ</span>
                      </div>
                      <div className="accordion-content">
                        <span className='title2'>{novel.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <div className='modal-content custom-modal'>
          <div className="page-product">
            <div onClick={handleClose2}>
              <img className="cancle" src="./src/assets/no.png" alt="cancel" />
            </div>
            
            <img id='Mcardnew' src={novel.cover} alt={novel.novel_name} />
            <img
              className="like1"
              src={isLiked ? "./src/assets/like.png" : "./src/assets/0heart.png"}
              alt="heart"
              onClick={toggleLike}
            />
            <div className="container-26">
              <div className="section">
                <div className="column">
                  <div className="body">
                    <div className="title">
                      <div className="text-heading">
                        <span id='text-heading'>
                          <span className="text-heading-1 text-cut"><b>{novel.novel_name}</b></span>
                        </span>
                      </div>
                      <div className="container-11">
                        <div className="container-4">
                          <div className="price">
                            <div className="tag-1">
                              <span id='tag1'>
                                <span className="tag2">
                                  <span id='tag2'>{novel.novel_type1}</span>
                                </span>
                              </span>
                            </div>
                            <div className="tag-1">
                              <span id='tag4'>
                                <span className="tag2">
                                  <span id='tag2'>{novel.novel_type2}</span>
                                </span>
                              </span>
                            </div>
                            <div className="tag">
                              <span id='tag'>
                                <span className="tag-3">
                                  <span id='tag3'><b>{novel.rate}</b></span>
                                </span>
                              </span>
                            </div>
                            <div className="text-price">
                              <span className="container-9">
                                <span id='price'>
                                  <span id='textprice'>{novel.novel_price}</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="component-13">
                          <span className="f-1">
                            <img id='coin' src="./src/assets/coin.png" alt="coin" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text">
                      <span className="text-1">
                        <span id='writer'>By {novel.writername}</span>
                      </span>
                    </div>
                  </div>
                  <div className="button">
                    <span className="button-1" onClick={checkLogin}>
                      <span id='buttonlock'>
                        <span id='button1'>ปลดล็อคเล่มนี้</span>
                      </span>
                      <div id="unlock">
                        <img className="lock" src="./src/assets/unlock.png" alt="unlock" />
                      </div>
                    </span>
                  </div>
                  <div className="accordion">
                    <div className="accordion-item">
                      <div className="title1">
                        <span className="title1">เรื่องย่อ</span>
                      </div>
                      <div className="accordion-content">
                        <span className='title2'>{novel.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>


      {/* ป๊อปอัพเหรียญไม่พอ */}
      <Modal show={showCoinAlert} onHide={closeCoinAlert}>
        <div className='modal-contentnew2 custom-modalnew'>
          <div className='confirmation-message'>
            <div onClick={closeCoinAlert}>
              <img className="cancle3" src="./src/assets/no.png" alt="cancel" />
            </div>
            <img className="ready" src="./src/assets/error.png" alt="submit" />
            <span className='text2'><b>เกิดข้อผิดพลาด</b></span>
            <span className="text-1">
              <span id='nocoin'>จำนวนเหรียญไม่เพียงพอ<br />กรุณาเติมเหรียญ</span>
            </span>
            <span id='buttoncoin'>
            <a href="/Payment"><span id='button3'>เติมเหรียญ</span></a>
            </span>
          </div>
        </div>
      </Modal>

      {/* ป๊อปอัพยังไม่เข้าสู่ระบบ */}
      <Modal show={showNotLogin} onHide={handleCloseUnlock}>
        <div className='modal-contentnew2 custom-modalnew'>
          <div className='confirmation-message'>
            <div onClick={handleCloseUnlock}>
              <img className="cancle3" src="./src/assets/no.png" alt="cancel" />
            </div>
            <img className="ready" src="./src/assets/error.png" alt="submit" />
            <span className='text2'><b>เกิดข้อผิดพลาด</b></span>
            <span className="text-1">
              <span id='ready2'>กรุณาเข้าสู่ระบบ</span>
            </span>
            <div onClick={handleCloseUnlock}>
              <span id='buttonin'>
                <a href="/login"><span id='button3'>เข้าสู่ระบบ</span></a>
              </span>
            </div>
          </div>
        </div>
      </Modal>

           {/* ป๊อปอัพปลดล็อค */}

           <Modal show={showConfirmation} onHide={CloseConfirmation}>
        <div className='modal-contentnew custom-modal'>
          <div className='order'><b>ยืนยันการสั่งซื้อ</b></div>
          <img id='Mcardnew' src={novel.cover} alt={novel.novel_name} />
          <div className="text-heading">
            <span id='text-heading'>
              <span className="text-heading-2 text-cut"><b>{novel.novel_name}</b></span>
            </span>
            <span className="text-1">
              <span id='writer2'>By {novel.writername}</span>
            </span>
            <span id='text1'><b>จำนวนเงิน</b></span>
            <span id='price2'>
              <span id='textprice2'>{novel.novel_price}</span>
            </span>
            <span className="f-1">
              <img id='coin2' src="./src/assets/coin.png" alt="coin" />
            </span>
            <div onClick={CloseConfirmation}>
              <span id='buttoncancle'>
                <span id='button2'>ยกเลิก</span>
                <img className="cancle2" src="./src/assets/no.png" alt="cancel" />
              </span>
            </div>
            <div onClick={verifyPurchase}>
              <span id='buttonsubmit'>
                <span id='button2'>ยืนยัน</span>
                <img className="submit" src="./src/assets/submit.png" alt="submit" />
              </span>
            </div>
          </div>
        </div>
      </Modal>

        <Modal show={showToShelf} onHide={CloseshowToShelf}>
          <div className='modal-contentnew2 custom-modalnew'>
            <div className='confirmation-message'>
            <div onClick={CloseshowToShelf}>
            <div onClick={CloseshowToShelf}>
                <img className="cancle3" src="./src/assets/no.png" alt="cancel" />
              </div>
              </div>
              <img className="ready" src="./src/assets/ready.png" alt="submit" />
              <span className='text2'><b>ทำการสั่งซื้อสำเร็จ</b></span>
              <span className="text-1">
                          <span id='ready2'>นิยายจะถูกนำไปไว้<br></br>ในชั้นหนังสือของคุณ</span>
                        </span>
              <div onClick={CloseshowToShelf}>
              <span id='buttonbook'>
                <a href="/bookself"><span id='button3'>ชั้นหนังสือ</span></a>
                  </span>
              </div>
            </div>
          </div>
        </Modal>
        </>
    );
};

export default Card;