import React from 'react';
import Card from '../Home_components/crad';

import '../Home_components/MM.css';


const fullcards = [
    
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

const CardList1: React.FC = () => {
    return (
        <div className='card-list'>
            {fullcards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};


export default CardList1;
