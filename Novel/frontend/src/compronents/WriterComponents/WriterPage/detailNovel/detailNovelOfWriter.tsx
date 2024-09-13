import React from 'react';
import './detailNovelOfWriter.css'; 
import { HeartOutlined, CommentOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { HiMiniShoppingCart } from "react-icons/hi2";
import Delete_novel_button from '../DeleteButton/deleteNovel';
import { InterfaceNovelOfWriter } from '../../../../interface/writer_interface/writerPageInterface';
const DetailNovelOfWriter: React.FC = () => {
    const detailNovels: InterfaceNovelOfWriter[] = [
      {
        ID: 1,
        WriterName : "jacob", 
        Name: "LOVE AT FIRST SIGHT", 
        Description: "เมื่อความรักเกิดขึ้นในครั้งแรกที่พบเจออะไรที่คาดไม่ถึง คนธรรมดากลายเป็นคนพิเศษได้หรือไม่? ร่วมลุ้นและหัวเราะไปกับเรื่องราวสุดฮาและอบอุ่นใจของพวกเขา",
        Content: "",
        Type: "Romance, Comedy",
        Rate: "13+",
        Cover: "./src/assets/cover1.png",
        WriterID: 1,
        Visibility: true,
        Price: 0,
        Like: 2564,
        BuyAmount: 234556,
      },
      {
        ID: 2,
        WriterName : "jacob",
        Name: "MY LONELY HOLIDAY",
        Description: "เมื่อวันหยุดพักผ่อนแสนเหงากลายเป็นจุดเริ่มต้นของความรัก เมื่อคนธรรมดาพบกับเหตุการณ์ไม่คาดฝัน พวกเขาจะเปลี่ยนแปลงตัวเองและหัวใจของกันและกันได้อย่างไร?",
        Content: "",
        Type: "Romance, Comedy",
        Rate: "13+",
        Cover: "./src/assets/cover2.png",
        WriterID: 1,
        Visibility: true,
        Price: 0,
        Like: 2014,
        BuyAmount: 524661,
      },
    ];

    const formatDescription = (description: string | undefined): string => {
        if (!description) return '';  
        return description.split(' ').join('<br>');
    };

    return (
        <>
        <div className="MyNovel"> 
        {detailNovels.map((detailNovel) => (
            <div key={detailNovel.ID} className="MyNovel-item">
              <div className="MyNovel-image-container">
                <img src={detailNovel.Cover} alt={detailNovel.Name} className="MyNovel-image" /> 

                <a href= '/Writer_edit'>
                  <button className="MyNovel-edit-button"><EditOutlined/></button>
                </a>
                {detailNovel.Visibility && <label className="MyNovel-finish-button">เผยแพร่</label>}
              </div>
              
                <div className="MyNovel-details">
                  <h3 className="MyNovel-title">{detailNovel.Name}</h3>
                  <p className="MyNovel-author"><UserOutlined /> ผู้แต่ง: {detailNovel.WriterName}</p>
                <div className="MyNovel-stats">
                  <span><HiMiniShoppingCart /> {detailNovel.BuyAmount.toLocaleString()}</span> 
                  <span><HeartOutlined />{detailNovel.Like}</span>
                  <span><CommentOutlined />ความคิดเห็น</span>
                </div>
                <div className="MyNovel-tags">
                  {detailNovel.Type.split(', ').map((type, index) => (
                    <span key={index}><label className='MyNovel-type'>{type}</label></span>
                  ))}
                  <span><label className='MyNovel-rate'>{detailNovel.Rate}</label></span>
                  <span><label className='MyNovel-hashtag'>#{detailNovel.Name} </label></span>
                  <span><label className='MyNovel-hashtag'>#{detailNovel.WriterName}</label></span>
                </div>
                <p className="MyNovel-description" dangerouslySetInnerHTML={{ __html: formatDescription(detailNovel.Description) }} />
              </div>
              <Delete_novel_button/>
            </div>
          ))}
        </div>
       </> 
    );
}

export default DetailNovelOfWriter;

