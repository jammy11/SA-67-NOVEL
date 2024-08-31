import React, { useState } from 'react';
import './Home.css';
import TOP from '../../compronents/header';
import 'bootstrap/dist/css/bootstrap.min.css'
import Slider from '../../compronents/slideshow';
import CardList1 from '../../compronents/path/pathCat1';
import CardList2 from '../../compronents/path/pathCat2';
import CardList3 from '../../compronents/path/pathCat3';
import CardList4 from '../../compronents/path/pathCat4';
import CardList5 from '../../compronents/path/pathCat5';
import CategoryNav from '../../compronents/CategoryNav';
import TOP2 from '../../compronents/headerBefore';
import { HiMiniShoppingCart } from "react-icons/hi2";

const Home: React.FC = () => {
  

    return (
        <>
        <TOP2/>
        <a id='cat1' className='hide'>1</a>
        <CategoryNav/>
    <div className='l1'>
    <div className='l1_1'>

    <div className='l1_1_1' >
    <h2 id='New'>แนะนำ
        <img width="20px" style={{ transform: "translate(0, -5px)" }} src="/src/assets/star.png" alt="star" />
    </h2>

    <Slider />
        
    </div>
    <div className='l1_1_2'>
    <h2 id='Treding'>มาแแรง
    <img width="20px" style={{ transform: "translate(0, -5px)" }} src="/src/assets/star.png" alt="star" />
    </h2>
        <div className='l1_1_2_1'>
            
        <div className='l1_1_2_1_x'>
            <span id="number" ><b>01</b></span>
            <img id="minicard" src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/669b7b504aa1ea001b3127d8/66a233d13m9gmoQM.jpeg" alt="01" />
            <div className='tail'>
                <span id='htail'><b>ฝืนชะตาท้าสามภพ</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart' /><span id='view_like'>200,000</span>
                <img id="ieye" src="/src/assets/0heart.png" alt="0eye" /><span id='view_like'>200,000</span>
                </div>
            </div>
            

        </div>
        <div className='l1_1_2_1_x'>
        <span id="number" ><b>02</b></span>
            <img id="minicard" src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/5fd709d7900071001bcde581/5ff6eda98NfLzSXT.jpeg" alt="01" />
            <div className='tail'>
                <span id='htail'><b>จอมเทพโอสถ</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart' /><span id='view_like'>200,000</span>
                <img id="ieye" src="/src/assets/0heart.png" alt="0eye" /><span id='view_like'>200,000</span>
                </div>
                <a id='cat1_2' className='hide' >1_2</a>
            </div>
         
        </div>
        <div className='l1_1_2_1_x' > 
        <span id="number" ><b>03</b></span>
            <img id="minicard" src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66aaebdca5f59d001c62f63c/66aaecfawo8DIFuK.jpeg" alt="01" />
            <div className='tail'>
                <span id='htail'><b>ฟู่เยี่ยน สาวน้อยเนตรสวรรค์ (นิยายแปล)</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart' /><span id='view_like'>200,000</span>
                <img id="ieye" src="/src/assets/0heart.png" alt="0eye" /><span id='view_like'>200,000</span>
                </div>
             
            </div>

            

        </div>
        <div className='l1_1_2_1_x'>
        <span id="number" ><b>04</b></span>
            <img id="minicard" src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6661884a6671e0001cbc17bf/666193cbP0vtEoxD.jpeg" alt="01" />
            <div className='tail'>
                <span id='htail'><b>เมื่อสุดยอดนักฆ่ามาเป็นหนุ่มออฟฟิศ</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart' /><span id='view_like'>200,000</span>
                <img id="ieye" src="/src/assets/0heart.png" alt="0eye" /><span id='view_like'>200,000</span>
                </div>
            </div>
            

        </div>
        <div className='l1_1_2_1_x'>
        <span id="number" ><b>05</b></span>
            <img id="minicard" src="https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66a8955d53f595001c16c9b8/66a898c0UzkZ3S1E.jpeg" alt="01" />
            <div className='tail'>
                <span id='htail'><b>ปลดล็อคระบบอัพพลังไร้ขอบเขต</b></span>
                <div className='p'>
                <HiMiniShoppingCart id='icart' /><span id='view_like'>200,000</span>
                <img id="ieye" src="/src/assets/0heart.png" alt="0eye" /><span id='view_like'>200,000</span>
                </div>
            </div>
            

        </div>

        </div>
        
    </div>
   
    
    
    </div>

    <img decoding="async" style={{ marginLeft: '100px' }}src="/src/assets/fafa102c1.gif" alt="PGSLOTเว็บตรง"></img>
    <a id='cat2'  className='hide'>2</a>
    <div className='l1_2' >
        <div className='headder'>
    <h2>นิยายใหม่</h2>
    </div>
    
    <CardList1 />
    
   </div>
   <a id='cat3'  className='hide'>3</a>
   <div className='l1_2' >
        <div className='headder'>
    <h2>สุดฮิต</h2>
    </div>
    <CardList2 />
    </div> 

    <a id='cat4'  className='hide'>4</a>
   <div className='l1_2'>
        <div className='headder'>
    <h2>โรแมนติก</h2>
    </div>
    <CardList3 />
   </div>
   <a id='cat5'  className='hide'>5</a>
   <div className='l1_2' >
        <div className='headder'>
    <h2>แฟนตาซี</h2>
    </div>
         <CardList4 />
   </div>

   <a id='cat6'  className='hide'>6</a>
    <div className='l1_2' >
        <div className='headder'>
    <h2>สืบสวน</h2>
    </div>
    <CardList5 />
    
   </div>
</div>


        
        </>
    );
};


export default Home;
