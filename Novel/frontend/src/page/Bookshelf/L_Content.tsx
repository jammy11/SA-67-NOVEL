import React, { useState } from 'react';
import TOP from '../../compronents/header';
import './L_Content.css';
import Button_s from '../../compronents/Book_components/return_button';
import { FaHeart, FaComment, FaBookmark } from 'react-icons/fa';
import Off_comment from '../../compronents/Book_components/off_comment';
import { end } from '@popperjs/core';


const L_Content: React.FC = () => {

    return(
        <>
        <TOP/>
        <div className='top-box'>
        <a href='/L_Bookshelf'> <Button_s/> </a>
        <Off_comment/> 
        </div>
            <div className='lc'>
                <div className='header-box'>
                    <div className='titlebox'> 
                        <div className='c_title'> The color of Hope </div>
                    </div>
                    <div className='con_interactions'>
                        <div className='icon-text-bc'>
                            <FaHeart className='icon-text-icon_h'/>
                            </div>
                        <div className='icon-text-bc'>
                                <span>2345</span>
                            </div>
                        <div className='icon-text-bc'>
                            <FaComment className='icon-text-icon_c'/>
                        </div>
                        <div className='icon-text-bc'>
                                <span>15</span>
                            </div>
                        <div className='icon-text-bc'>
                            <FaBookmark className='icon-text-icon_h'/>
                        </div>
                    </div>
                    
                </div>
                <div className='textbox'>
                <p className='text-style'>กาลครั้งหนึ่ง ในหมู่บ้านเล็กๆ แห่งหนึ่งที่ซ่อนตัวอยู่ท่ามกลางเนินเขาและทุ่งหญ้าเขียวขจี มีเด็กผู้หญิงคนหนึ่งชื่อลิลา ลิลามีจินตนาการล้ำเลิศและหัวใจที่เต็มไปด้วยความฝัน เธอใช้เวลาทั้งวันไปกับการเดินเล่นในทุ่งหญ้า เก็บดอกไม้ป่า และไล่จับผีเสื้อ แต่กิจกรรมยามว่างที่เธอชอบที่สุดคือการมองดูสายรุ้งบนท้องฟ้า

ลิลาหลงใหลในสายรุ้งมาโดยตลอด เธอชอบที่สายรุ้งดูเหมือนจะเป็นสะพานเชื่อมระหว่างโลกกับท้องฟ้า เป็นสีสันที่นำมาซึ่งความสุขหลังพายุ เธอเชื่อว่าแต่ละสีมีความหมายพิเศษ สีแดงหมายถึงความรัก สีส้มหมายถึงความกล้าหาญ สีเหลืองหมายถึงความสุข สีเขียวหมายถึงการเติบโต สีน้ำเงินหมายถึงสันติภาพ สีครามหมายถึงสัญชาตญาณ aและสีม่วงหมายถึงแรงบันดาลใจ ทุกครั้งที่สายรุ้งปรากฏขึ้น ลิลาจะรู้สึกเหมือนมีเวทมนตร์มาสัมผัสโลก

บ่ายวันหนึ่งที่อากาศแจ่มใส หลังจากฝนตกกะทันหัน ลิลาก็รีบวิ่งออกไปข้างนอก หัวใจของเธอเต้นแรงด้วยความตื่นเต้น พายุผ่านไปแล้ว และดวงอาทิตย์ก็โผล่ออกมา ส่องแสงอันอบอุ่นลงบนพื้นดินที่เปียกโชก เธอมองดูท้องฟ้าด้วยตาที่เบิกกว้างด้วยความคาดหวัง และแล้วเธอก็เห็นมัน: สายรุ้งอันงดงามโค้งอย่างสง่างามบนขอบฟ้า ระบายสีเมฆด้วยเฉดสีที่สดใส

ลิลาวิ่งไปที่ปลายสายรุ้งโดยไม่ลังเลแม้แต่วินาทีเดียว โดยเหยียบย่างไปบนหญ้า เธอเคยได้ยินเรื่องราวเก่าๆ เกี่ยวกับสมบัติที่รออยู่ที่ปลายสายรุ้ง และหัวใจของเธอเต้นแรงด้วยความเป็นไปได้ที่จะพบสิ่งที่พิเศษ ในขณะที่เธอวิ่งไป สีสันต่างๆ ดูเหมือนจะโอบล้อมเธอไว้ ทำให้เธอเต็มไปด้วยความหวังและความประหลาดใจ

ในที่สุด ลิลาก็มาถึงปลายสายรุ้ง ซึ่งมันลงจอดที่หลังดงไม้โบราณ เธอหายใจแรงแต่ก็มีความสุข ก้าวเข้าไปในดงไม้ แสงแดดส่องผ่านใบไม้สร้างการเต้นรำของสีสันที่ระยิบระยับบนพื้นดิน แต่ไม่มีหม้อทองคำหรืออัญมณีที่แวววาวอยู่เลย เธอกลับพบกระท่อมหลังเล็กๆ ทรุดโทรม แทบจะซ่อนตัวอยู่ท่ามกลางต้นไม้เขียวขจี

ความอยากรู้อยากเห็นกระตุ้น ลิลาเดินไปที่กระท่อมและเคาะประตูเบาๆ ด้วยความประหลาดใจของเธอ บานประตูเปิดออกเผยให้เห็นหญิงชราผู้มีใบหน้าใจดีและดวงตาเป็นประกายที่สะท้อนสีสันของสายรุ้ง “ยินดีต้อนรับที่รัก” หญิงคนนั้นกล่าวอย่างอบอุ่น “ฉันรอคอยใครสักคนอย่างคุณมาตลอด”

“กำลังรอฉันอยู่เหรอ” ลิลาอุทานด้วยหัวใจที่เต้นระรัวด้วยความสุข “แต่ทำไมล่ะ”

หญิงคนนั้นยิ้มอย่างอ่อนโยนและเรียกลิลาเข้าไปข้างใน กระท่อมหลังนี้อบอุ่น เต็มไปด้วยเครื่องประดับและภาพวาดสีสันสดใสที่ดูเหมือนจะเต้นรำไปตามผนัง “คุณเห็นไหมว่าสายรุ้งทุกอันมีจุดประสงค์” หญิงคนนั้นอธิบาย “มันนำพาผู้คนที่แสวงหาความงามและความสุขในโลกมารวมกัน ฉันคือผู้พิทักษ์สายรุ้ง และฉันต้องการความช่วยเหลือจากคุณ”

ดวงตาของลิลาเบิกกว้าง “ฉันจะช่วยอะไรได้บ้าง”

“มีความฝันที่สูญหายไปมากมายในโลก ความฝันที่เลือนลางไปเพราะผู้คนลืมที่จะเชื่อมั่นในตัวเอง ฉันต้องการใครสักคนที่มีหัวใจเต็มไปด้วยความหวังที่จะนำสีสันเหล่านั้นกลับคืนมา ด้วยจินตนาการและความรักของคุณ เราจะสามารถวาดท้องฟ้าใหม่ได้”

ลิลารู้สึกตื่นเต้นมาก เธอมีความปรารถนาที่จะมอบความสุขให้กับผู้อื่นเสมอมา และตอนนี้เธอก็มีโอกาสที่จะทำบางสิ่งที่วิเศษอย่างแท้จริงแล้ว “ฉันต้องทำอย่างไร” เธอถามอย่างกระตือรือร้น

The Guardian ยื่นแปรงขนาดเล็กให้กับลิลา ซึ่งแวววาวราวกับสีของสายรุ้ง “เมื่อใดก็ตามที่คุณพบใครสักคนที่สูญเสียความฝัน ให้ใช้แปรงนี้เพื่อวาดท้องฟ้าด้วยสีสันอีกครั้ง ให้พวกเขาได้เห็นความงามภายในตัวเอง แล้วพวกเขาจะหาทางกลับคืนมาได้”

ด้วยรอยยิ้มที่มุ่งมั่น ลิลาหยิบแปรงแล้วออกจากกระท่อม หัวใจของเธอเปี่ยมล้นไปด้วยเป้าหมาย เธอเดินทางกลับไปยังหมู่บ้านของเธอและเริ่มต้นการผจญภัยครั้งใหม่ เธอวาดภาพจิตรกรรมฝาผนังในจัตุรัสกลางเมือง สร้างแปลงดอกไม้ที่สดใส และแบ่งปันเรื่องราวแห่งความหวังกับทุกคนที่ยินดีรับฟัง

เธอเฝ้าดูสีสันแห่งเสียงหัวเราะและความสุขกลับคืนมาในชีวิตของผู้คนในทุกย่างก้าว เธอสร้างแรงบันดาลใจให้กับศิลปิน จุดประกายมิตรภาพขึ้นใหม่ และยังช่วยให้ชายชราค้นพบความรักในการวาดภาพอีกครั้ง ทั้งหมดนี้ผ่านเวทมนตร์ของแปรงและความอบอุ่นในหัวใจของเธอ

หลายปีผ่านไป และลิลาก็เติบโตเป็นหญิงสาวที่ฉลาด หมู่บ้านแห่งนี้เต็มไปด้วยสีสันและความคิดสร้างสรรค์ และไม่มีใครลืมความงดงามของความฝันของตนเอง และทุกครั้งที่มีสายรุ้งประดับบนท้องฟ้า ก็เป็นการเตือนใจถึงการเดินทางของไลลา และเตือนใจว่าหัวใจดวงเดียวที่เต็มไปด้วยความหวังสามารถเปลี่ยนแปลงโลกได้อย่างไร

ไลลาจึงรู้ว่าสายรุ้งไม่ใช่แค่เส้นโค้งของสีเท่านั้น แต่ยังเป็นสะพานเชื่อมไปสู่วันพรุ่งนี้ที่สดใสกว่า ซึ่งรอคอยใครสักคนที่กล้าหาญพอที่จะไล่ตามสายรุ้งเหล่านั้น </p>
                    </div>
            </div>
        </>
    )
}

export default L_Content;