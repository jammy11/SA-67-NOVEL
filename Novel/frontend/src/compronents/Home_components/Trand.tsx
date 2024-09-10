import React, { useState } from 'react';
import './slideshow.css';
import Card2 from './crad2';
import { HiMiniShoppingCart } from "react-icons/hi2";

function Trand() {
  // สร้าง state สำหรับจัดการข้อมูลนิยายที่ถูกเลือกและแสดงป๊อปอัพ
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (card: any) => {
    setSelectedCard(card);
    setShowModal(true); // แสดงป๊อปอัพ
  };

  const handleCloseModal = () => {
    setShowModal(false); // ปิดป๊อปอัพ
    setSelectedCard(null); // ล้างข้อมูลนิยายที่ถูกเลือก
  };

  // สมมุติข้อมูลนิยายที่จะแสดงในหน้า Trand
  const cards = [
    {
        name: 'ฝืนชะตาท้าสามภพ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/669b7b504aa1ea001b3127d8/66a233d13m9gmoQM.jpeg',
        views: '12345',
        like: '13',
        tag: 'ดราม่า',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: 'เรื่องราวของ "หลิงซือหลาน" หญิงสาวที่เกิดมาพร้อมชะตาชีวิตอันแปลกประหลาด ถูกทำนายว่าจะเป็นผู้ที่มีอิทธิพลต่อชะตากรรมของทั้งสามภพ ได้แก่ ภพมนุษย์ ภพสวรรค์ และภพปีศาจ หลังจากสูญเสียครอบครัวในเหตุการณ์การโจมตีของปีศาจ หลิงซือหลานได้ออกเดินทางเพื่อตามหาความจริงเกี่ยวกับชะตาของตัวเองและล้างแค้นให้กับคนที่เธอรัก',
    },
    {
        name: 'จอมเทพโอสถ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/5fd709d7900071001bcde581/5ff6eda98NfLzSXT.jpeg',
        views: '12345',
        like: '10334',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลี่เทียนเฉิน" ชายหนุ่มผู้เกิดในตระกูลนักปรุงโอสถที่เคยรุ่งเรืองแต่ล่มสลายลงด้วยเหตุการณ์ลึกลับในอดีต ทำให้เขาและครอบครัวต้องใช้ชีวิตอย่างยากลำบาก แม้จะเกิดในตระกูลที่มีชื่อเสียงเรื่องการปรุงโอสถ แต่หลี่เทียนเฉินกลับไร้พลังวิญญาณ ทำให้ถูกดูหมิ่นจากคนรอบข้าง',
    },
    {
        name: 'ฟู่เยี่ยน สาวน้อยเนตรสวรรค์',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66aaebdca5f59d001c62f63c/66aaecfawo8DIFuK.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"ฟู่เยี่ยน" เด็กสาวผู้เกิดมาพร้อมดวงตาเนตรสวรรค์ พลังพิเศษที่สามารถมองเห็นสิ่งที่คนธรรมดาไม่สามารถเห็นได้ ทั้งพลังวิญญาณ เส้นทางพลังชีวิต รวมถึงอดีตและอนาคตอันคลุมเครือของผู้คน แต่พลังนี้กลับนำเธอไปสู่ชะตากรรมอันซับซ้อนที่เธอไม่อาจหลีกเลี่ยง',
    },
    {
        name: 'เมื่อสุดยอดนักฆ่ามาเป็นหนุ่มออฟฟิศ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6661884a6671e0001cbc17bf/666193cbP0vtEoxD.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลี่เจี้ยน" สุดยอดนักฆ่าผู้มีชื่อเสียงโด่งดังในโลกใต้ดิน มีทักษะการต่อสู้และสังหารที่ไม่มีใครเทียบได้ แม้จะประสบความสำเร็จในทุกภารกิจ แต่ชีวิตของหลี่เจี้ยนกลับเต็มไปด้วยความโดดเดี่ยวและความเบื่อหน่าย เขาตัดสินใจถอนตัวจากโลกนักฆ่าและหวังจะใช้ชีวิตอย่างคนธรรมดาในฐานะ "หนุ่มออฟฟิศ" ที่ทำงานในบริษัทธรรมดา ๆ แห่งหนึ่ง',
    },
    {
        name: 'ปลดล็อคระบบอัพพลังไร้ขอบเขต',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66a8955d53f595001c16c9b8/66a898c0UzkZ3S1E.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลินเทียน" เด็กหนุ่มธรรมดาที่ชีวิตต้องเผชิญกับความยากลำบากตั้งแต่เด็ก ถูกดูหมิ่นและเหยียดหยามจากผู้คนรอบข้างเพราะไม่มีพลังวิญญาณเหมือนคนอื่น แต่ชีวิตของเขากลับเปลี่ยนแปลงไปอย่างสิ้นเชิงเมื่อเขาได้ปลดล็อค "ระบบอัพพลังไร้ขอบเขต" ซึ่งเป็นพลังวิเศษที่สามารถทำให้เขาเพิ่มพูนพลังได้อย่างไม่มีขีดจำกัด ผ่านการฝึกฝนและการทำภารกิจต่าง ๆ',
    },
  ];

  return (
    <>
      <div className='l1_1_2'>
        <h2 id='Treding'>
          ยอดฮิต
          <img width="20px" style={{ transform: 'translate(0, -5px)' }} src="/src/assets/star.png" alt="star" />
        </h2>
        <div className='l1_1_2_1'>
          {cards.map((card, index) => (
            <div key={index} className='l1_1_2_1_x' onClick={() => handleShowModal(card)}>
              <img id="number" src={`/src/assets/0${index + 1}.png`} alt={`0${index + 1}`} />
              <img id="minicard" src={card.imgUrl} alt={card.name} />
              <div className='tail'>
                <span id='htail'><b>{card.name}</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart'/>
                  <span id='view_like'>{card.views}</span>
                  <img id="ieye" src="/src/assets/0heart.png" alt="heart" />
                  <span id='view_like'>{card.like}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* แสดงป๊อปอัพเมื่อมีการเลือกนิยาย */}
      {selectedCard && (
        <Card2
        card={selectedCard}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      )}
    </>
  );
}

export default Trand;