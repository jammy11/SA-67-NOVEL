import './MM.css';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

interface CardProps {
    card: {
        name: string;
        imgUrl: string;
        views: string;
        like: string;
        tag: string;
        price: number;
        rate: string;
        writer: string;
        title: string;
    };
}

const Card: React.FC<CardProps> = ({ card }) => {
    const [show2, setShow2] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // สถานะใหม่สำหรับป๊อปอัพยืนยัน
    const [isLiked, setIsLiked] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleUnlock = () => setShowUnlock(true);
    const handleCloseUnlock = () => setShowUnlock(false);

    const handleConfirmPurchase = () => {
        setShowUnlock(false); // ปิดป๊อปอัพปลดล็อค
        setShowConfirmation(true); // เปิดป๊อปอัพยืนยัน
    };

    const handleCloseConfirmation = () => setShowConfirmation(false); // ปิดป๊อปอัพยืนยัน
    const toggleLike = () => setIsLiked(!isLiked);

    return (
        <>
        <div className='Mcard' onClick={handleShow2}>
            <img id='Mcard' src={card.imgUrl} alt={card.name} />
            <div className='tailbox'>
                <span id='htailb'><b>{card.name}</b></span>
                <div className='pb'>
                    <img id="ieyeb" src="/src/assets/0eye.png" alt="eye" />
                    <span id='view_likeb'>{card.views}</span>
                    <img id="ieyeb" src={isLiked ? "/src/assets/like.png" : "/src/assets/0heart.png"} 
                         alt="heart" onClick={toggleLike} />
                    <span id='view_likeb'>{isLiked ? parseInt(card.like) + 1 : card.like}</span>
                </div>
            </div>   
        </div>

        <Modal show={show2} onHide={handleClose2}>
          <div className='modal-content custom-modal'>
            <div className="page-product">
              <div onClick={handleClose2}>
                <img className="cancle" src="./src/assets/no.png" alt="cancel" />
              </div>
              
              <img id='Mcardnew' src={card.imgUrl} alt={card.name} />
              <img className="like1" src={isLiked ? "./src/assets/like.png" : "./src/assets/0heart.png"} 
                   alt="heart" onClick={toggleLike} />
              <div className="container-26">
                <div className="section">
                  <div className="column">
                    <div className="body">
                      <div className="title">
                        <div className="text-heading">
                          <span id='text-heading'>
                            <span className="text-heading-1 text-cut"><b>{card.name}</b></span>
                          </span>
                        </div>
                        <div className="container-11">
                          <div className="container-4">
                            <div className="price">
                              <div className="tag-1">
                                <span id='tag1'>
                                  <span className="tag2">
                                    <span id='tag2'>{card.tag}</span>
                                  </span>
                                </span>
                              </div>
                              <div className="tag">
                                <span id='tag'>
                                  <span className="tag-3">
                                    <span id='tag3'><b>{card.rate}</b></span>
                                  </span>
                                </span>
                              </div>
                              <div className="text-price">
                                <span className="container-9">
                                  <span id='price'>
                                    <span id='textprice'>{card.price}</span>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="component-13">
                            <span className="f-1">
                              <img id='coin' src="./src/assets/coin.png" alt="coin"></img>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text">
                        <span className="text-1">
                          <span id='writer'>By {card.writer}</span>
                        </span>
                      </div>
                    </div>
                    <div className="button">
                      <span className="button-1" onClick={handleUnlock}>
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
                          <span className='title2'>{card.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* ป๊อปอัพปลดล็อค */}
        <Modal show={showUnlock} onHide={handleCloseUnlock}>
          <div className='modal-contentnew custom-modal'>
              <div className='order'><b>ยืนยันการสั่งซื้อ</b></div>
              <img id='Mcardnew' src={card.imgUrl} alt={card.name} />
              <div className="text-heading">
                  <span id='text-heading'>
                    <span className="text-heading-2 text-cut"><b>{card.name}</b></span>
                  </span>
                  <span className="text-1">
                        <span id='writer2'>By {card.writer}</span>
                  </span>
                  <span id='text1'><b>จำนวนเงิน</b></span>
                  <span id='price2'>
                      <span id='textprice2'>{card.price}</span>
                  </span>
                  <span className="f-1">
                      <img id='coin2' src="./src/assets/coin.png" alt="coin"></img>
                  </span>
                  <div onClick={handleCloseUnlock}>
                    <span id='buttoncancle'>
                        <span id='button2'>ยกเลิก</span>
                        <img className="cancle2" src="./src/assets/no.png" alt="cancel" />
                    </span>
                  </div>
                  <div onClick={handleConfirmPurchase}> {/*เมื่อกดยืนยัน จะเปิดป๊อปอัพยืนยัน*/}
                  <div onClick={handleClose2}>
                    <span id='buttonsubmit'>
                        <span id='button2'>ยืนยัน</span>
                        <img className="submit" src="./src/assets/submit.png" alt="submit" />
                    </span>
                    </div>
                  </div>
              </div>
          </div>
        </Modal>

        {/* ป๊อปอัพยืนยัน */}
        

        <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
          <div className='modal-contentnew2 custom-modalnew'>
            <div className='confirmation-message'>
            <div onClick={handleCloseConfirmation}>
                <img className="cancle3" src="./src/assets/no.png" alt="cancel" />
              </div>
              <img className="ready" src="./src/assets/ready.png" alt="submit" />
              <span className='text2'><b>ทำการสั่งซื้อสำเร็จ</b></span>
              <span className="text-1">
                          <span id='ready2'>นิยายจะถูกนำไปไว้<br></br>ในชั้นหนังสือของคุณ</span>
                        </span>
              <span id='buttonbook' /*href="/Bookself" กดไปหน้าชั้นหนังสือ*/>
                  <span id='button3'>ชั้นหนังสือ</span>
                  </span>
            </div>
          </div>
        </Modal>
        </>
    );
};

export default Card;
