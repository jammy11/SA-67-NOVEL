import React from 'react';
import Card from '../Home_components/crad';

import '../MM.css';

const fullcards = [
    {
        name: 'ฝืนชะตาท้าสามภพ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/669b7b504aa1ea001b3127d8/66a233d13m9gmoQM.jpeg',
        views: '12345',
        like: '1003',
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
    {
        name: 'เซียนคีย์บอร์ด',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/614c1f1ddb22cf001cbe0e55/6192208aBy6WoSao.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หลิวเฉิน" หนุ่มวัยรุ่นธรรมดาที่มีความหลงใหลในการเล่นเกมและการเขียนโปรแกรมคอมพิวเตอร์มาตั้งแต่เด็ก เขามักใช้เวลาส่วนใหญ่หมกมุ่นอยู่หน้าจอคอมพิวเตอร์ เพื่อฝึกฝนทักษะการเล่นเกมออนไลน์และพัฒนาความสามารถในการเขียนโค้ดของตัวเอง อย่างไรก็ตาม ความสามารถของหลิวเฉินกลับไม่ได้รับการยอมรับจากครอบครัวและเพื่อนฝูงที่มองว่าเขาเสียเวลากับสิ่งไร้สาระ',
    },
    {
        name: 'ระบบแหวนสุดโกงสร้างตำนานในสองโลก',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/646f0c6165727b001d86663b/65fbecf5aI15cAnp.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"หยางเฉิน" ชายหนุ่มธรรมดาที่ใช้ชีวิตเรียบง่ายในโลกปัจจุบัน จู่ ๆ วันหนึ่งเขาก็ได้รับ "แหวนลึกลับ" ที่มาพร้อมกับระบบสุดโกงที่สามารถเพิ่มพูนพลังและทักษะได้อย่างไร้ขีดจำกัด เมื่อหยางเฉินสวมแหวนเข้าไป เขาพบว่ามันสามารถนำเขาไปยังโลกอีกใบหนึ่ง ซึ่งเป็นโลกแห่งการฝึกยุทธ์และเวทมนตร์ ที่เต็มไปด้วยสัตว์อสูร เซียนผู้ทรงพลัง และสงครามระหว่างอาณาจักรต่าง ๆ',
    },
    {
        name: 'บ้านนี้โชคดีมีลูกสาวเป็นหมอดูอัฉริยะแห่งลัทธิเต๋า',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6698c1b8a2d127001ce14d1e/66ac6d6bQJ1LOG1e.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: 'ในตระกูล "ซู" ที่ธรรมดาและใช้ชีวิตอย่างเรียบง่าย ท่ามกลางครอบครัวที่ไม่ค่อยเชื่อเรื่องลี้ลับหรือโชคลาง "ซูเสี่ยวเหยา" ลูกสาวคนเล็กกลับเกิดมาพร้อมพรสวรรค์พิเศษในการทำนายชะตาและพลังวิญญาณที่เชื่อมโยงกับลัทธิเต๋า เธอสามารถมองเห็นอนาคต คำทำนาย และพลังลี้ลับของฟ้าและดินได้อย่างแม่นยำตั้งแต่อายุยังน้อย',
    },
    {
        name: 'ผมย้อนอดีตมาเปลี่ยนชะตายุค 80',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66178eeec51323001c3c08b0/66178ffaiqW0Pk8X.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"เฉินหาว" ชายหนุ่มวัยกลางคนผู้ใช้ชีวิตในโลกปัจจุบันที่เต็มไปด้วยความล้มเหลวและความผิดหวัง ไม่ว่าจะเป็นเรื่องงานหรือชีวิตครอบครัว เขารู้สึกเสียดายโอกาสในชีวิตที่ผ่านไป และคิดอยู่เสมอว่าหากได้ย้อนเวลากลับไป เขาจะเปลี่ยนแปลงชะตาชีวิตของตนเองใหม่',
    },
    {
        name: 'ผู้พิทักษ์รัตติกาลแห่งต้าฟ่ง',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/61e0df9f727d71001ca5d819/621cd023vXb6rpv0.jpeg',
        views: '12345',
        like: '1003',
        tag: 'แอ็คชั่น',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: 'ในอาณาจักรต้าฟ่งที่ยิ่งใหญ่และรุ่งเรือง เต็มไปด้วยความสงบสุขภายนอก ทว่าภายในกลับมีความลับที่ซ่อนเร้นเกี่ยวกับอำนาจมืดที่คอยแฝงตัวอยู่ในรัตติกาล "หลี่เหยียน" ชายหนุ่มผู้เป็นทหารในกองทัพของต้าฟ่ง เขาใช้ชีวิตตามหน้าที่ประจำวัน โดยไม่เคยรู้ว่าตนเองถูกเลือกให้เป็นหนึ่งใน "ผู้พิทักษ์รัตติกาล" องค์กรลับที่ทำหน้าที่ปกป้องอาณาจักรจากพลังมืดที่คอยคุกคามในยามค่ำคืน',
    },
    {
        name: 'ย้อนเวลามาเป็นภรรยาท่านนายพลสุดโหดในยุค 70',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66ace1ad757f3d001ce5ae1f/66ace2adZ36qsEOI.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"จางหยู่หาน" หญิงสาวที่ประสบความสำเร็จในชีวิตการทำงานและมีครอบครัวที่อบอุ่นในปัจจุบัน แต่ชีวิตของเธอกลับเปลี่ยนไปเมื่อเกิดอุบัติเหตุที่ทำให้เธอย้อนเวลากลับไปในปี 1970 สู่โลกแห่งอดีตที่เต็มไปด้วยความวุ่นวายและการเปลี่ยนแปลงทางสังคมในยุคที่เธอไม่เคยรู้จัก',
    },
    {
        name: 'เส้นทางสู่หมอดูผู้เกรียงไกรของเด็กน้อยจอมตะกละ',
        imgUrl: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66acd5d4a5f59d001c62f79b/66acd6bdNQDcceYA.jpeg',
        views: '12345',
        like: '1003',
        tag: 'โรแมนติก',
        price: 30,
        rate: '13+',
        writer: 'MaeMae',
        title: '"อี้เจีย" เด็กน้อยที่เติบโตในหมู่บ้านเล็ก ๆ ของชนบทจีนยุคโบราณ เขามีชีวิตเรียบง่ายแต่เต็มไปด้วยความฝันที่จะเป็นหมอดูที่เก่งกาจ ไม่เพียงแต่เพราะความสนใจในศาสตร์ลึกลับของลัทธิเต๋าและการทำนาย แต่ยังเพราะเขามีความสามารถในการมองเห็นสัญญาณและพลังลึกลับที่ไม่ธรรมดา',
    }
];

const CardList6: React.FC = () => {
    return (
        <div className='card-list'>
            {fullcards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default CardList6;
