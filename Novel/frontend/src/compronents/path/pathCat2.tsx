import React from 'react';
import Card from '../Home_components/crad';

import '../Home_components/MM.css';

const fullcards = [
    {
        name: 'ตำนานศิษย์พี่เจ้าปฐพี',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/60d40b1e182559001b7b1719/61fbc8969mwBlcOM.jpeg',
        views: '12345',
        like: '1003',
        tag: 'ดราม่า',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: 'ในภูเขา "หลิงจิ๋ว" ที่มีความลับและการฝึกฝนในศิลปะการต่อสู้และศาสตร์ลึกลับซ่อนอยู่ "จางหย่ง" เป็นศิษย์พี่คนโตของ "สำนักปฐพี" สำนักที่มีชื่อเสียงในด้านการฝึกฝนและปกป้องดินแดนจากภัยคุกคามภายนอก จางหย่งมีความสามารถในการฝึกฝนที่เหนือชั้นและทักษะในการต่อสู้ที่ยอดเยี่ยม เขาเป็นที่เคารพรักจากศิษย์คนอื่น ๆ และได้รับตำแหน่งศิษย์พี่ด้วยความสามารถและความทุ่มเท',
    },
    {
        name: 'จอมเทพโอสถ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/5fd709d7900071001bcde581/5ff6eda98NfLzSXT.jpeg',
        views: '12345',
        like: '1003',
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
        name: 'เส้นทางเศรษฐีของ(ว่าที่)เชฟเหรียญทอง',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66793deac2ae43001c09913d/669f656f3ufOdRZX.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลี่ซิง" หนุ่มที่เติบโตในครอบครัวธรรมดาและมีความฝันที่จะเป็นเชฟระดับโลก เขามีความหลงใหลในศิลปะการทำอาหารและตั้งใจจะเรียนรู้และสร้างสรรค์เมนูใหม่ ๆ แต่ด้วยข้อจำกัดทางการเงินและความท้าทายที่เขาต้องเผชิญ เขาต้องเริ่มต้นจากการทำงานในร้านอาหารเล็ก ๆ และเรียนรู้เทคนิคการทำอาหารจากประสบการณ์จริง',
    },
    {
        name: 'ย้อนเวลากลับมาสร้างเซฟเฮาส์ในวันสิ้นโลก',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6698c7be28dd6b001cc17e1c/66ac6d1dTMtaeVLw.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลินซี" วิศวกรสาวที่มีความเชี่ยวชาญในด้านการออกแบบและสร้างโครงสร้างที่มีความปลอดภัยสูง เธออาศัยอยู่ในโลกที่เต็มไปด้วยความขัดแย้งและวิกฤตการณ์ทั่วโลก วันหนึ่งเขาได้รับโอกาสที่ไม่ธรรมดา การย้อนเวลากลับไปในอดีตก่อนวันสิ้นโลกที่เกิดขึ้นในอนาคต',
    },
    {
        name: 'ซูเปอร์ดอกเตอร์แห่งห้องพยาบาล',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/653b8f937d802b001ccea7ef/653b94a1DVY0fway.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หวังหลิง" ชายหนุ่มที่มีความสามารถพิเศษในการรักษาและความรู้ด้านการแพทย์ แต่ชีวิตของเขากลับไม่ได้ราบรื่นในอาชีพแพทย์ เขาเคยประสบปัญหาจากการทำงานในโรงพยาบาลที่เต็มไปด้วยความขัดแย้งและการเมืองของแพทย์ ทำให้เขารู้สึกท้อแท้และคิดจะออกจากอาชีพนี้',
    },
    {
        name: 'เคล็ดกายานาดารา',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/5bbb4e5dfe2aa50028100f70/622ef7239mOtuB4f.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: 'ในโลกแห่งเวทมนตร์และการต่อสู้ "เจียงหลิน" นักเรียนธรรมดาที่อาศัยอยู่ในหมู่บ้านเล็ก ๆ ค้นพบว่าเขามีความสามารถพิเศษในการสัมผัสและฝึกฝน "กายานาดารา" ศาสตร์ลึกลับที่มีความเกี่ยวข้องกับการควบคุมพลังงานภายในร่างกายและจักรวาล',
    },
    {
        name: 'CATCH! คว้าใจ ไว้ลุ้นรัก',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/5fa1371e45a191001bb860f6/5fa138ebGYQbcGS1.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"ชานเซ" นักกีฬาเบสบอลดาวรุ่งที่มีอนาคตสดใส เขามีเสน่ห์และความสามารถที่ทำให้เขาเป็นที่ชื่นชมในวงการกีฬา แต่ในชีวิตส่วนตัวเขากลับมีความรู้สึกว่าขาดอะไรบางอย่าง เขาต้องการความรักและความสัมพันธ์ที่แท้จริง ในขณะที่ชานเซกำลังมุ่งมั่นในการฝึกซ้อมและการแข่งขัน เขาพบกับ "เลโอ" ชายหนุ่มที่ทำงานเป็นผู้จัดการทีม',
    },
    {
        name: 'วาดชีวิต ลิขิตชะตา #เกิดใหม่ครั้งหน้า ขอข้าเป็นนางเอก',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/64b6694b0edd99001dd37213/64b66b4bRMSeq2Pu.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลินซี" หญิงสาวที่มีชีวิตปกติในยุคปัจจุบัน แต่เมื่อเธอประสบอุบัติเหตุร้ายแรงและเสียชีวิต ชีวิตของเธอกลับไม่จบลงที่นั่น เพราะเธอได้รับโอกาสในการเกิดใหม่ในโลกแฟนตาซีที่เธอเคยอ่านในนิยายเล่มหนึ่ง',
    },
    {
        name: 'เสน่หาชั่วกัลป์',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/62f90b5e408c12001caa7cb5/633540b1ApPZB4z3.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '15+',
        writer: 'MaeMae',
        title: 'ในโลกที่เต็มไปด้วยเวทมนตร์และตำนานโบราณ "เสี่ยวเหยา" สาวน้อยผู้เกิดมาพร้อมกับพรสวรรค์ในการทำเวทมนตร์ ได้ใช้ชีวิตอยู่ในหมู่บ้านเล็ก ๆ ที่สงบสุข แต่เธอกลับมีความรู้สึกว่าเธอถูกกำหนดให้มีบทบาทที่ยิ่งใหญ่กว่านั้น',
    }
];

const CardList2: React.FC = () => {
    return (
        <div className='card-list'>
            {fullcards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default CardList2;
