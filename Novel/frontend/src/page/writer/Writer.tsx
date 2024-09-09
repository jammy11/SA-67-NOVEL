import React from 'react';
import './Writer.css'; 
import Headers from '../../compronents/Pubblic_components/headerselect';
import CategoryNavWriter from '../../compronents/Writer_components/CatogoryNavWriter';
import { PlusCircleOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';
import { CommentOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';

interface Work {
  title: string;
  author: string;
  reads: number;
  likes: number;
  comments: number;
  imageUrl?: string; 
  description?: string;
  visiblity?: string;
  type1?: string;
  rate?: string;
  isFinished?: boolean;
}

const Writer: React.FC = () => {
  const works: Work[] = [
    {
      title: "LOVE AT FIRST SIGHT", 
      author: "Claudia Wilson",
      reads: 234556,
      likes: 2564,
      comments: 100658,
      imageUrl: "./src/assets/cover1.png", 
      description: "เมื่อความรักเกิดขึ้นในครั้งแรกที่พบ เจออะไรที่คาดไม่ถึง คนธรรมดากลายเป็นคนพิเศษได้หรือไม่? ร่วมลุ้นและหัวเราะไปกับเรื่องราวสุดฮาและอบอุ่นใจของพวกเขา",
      visiblity: "เผยแพร่",
      type1: "Romance",

      rate: "13+",
      isFinished: true
    },
    {
      title: "MY LONELY HOLIDAY",
      author: "Claudia Wilson",
      reads: 524661,
      likes: 2014,
      comments: 220758,
      imageUrl: "./src/assets/cover2.png", 
      description: "เมื่อวันหยุดพักผ่อนแสนเหงากลายเป็นจุดเริ่มต้นของความรัก เมื่อคนธรรมดาพบกับเหตุการณ์ไม่คาดฝัน พวกเขาจะเปลี่ยนแปลงตัวเองและหัวใจของกันและกันได้อย่างไร? เตรียมพบกับเรื่องราวความรักสุดป่วนชวนหัวเราะ ที่จะทำให้คุณอบอุ่นหัวใจไปพร้อมกับพวกเขา!",
      visiblity: "เผยแพร่",
      type1: "Romance",
      rate: "13+",
      isFinished: false
    },
  ];

  return (
    <>
      <Headers />
      <CategoryNavWriter />
      <div className='lb'>
        <a href = '/Writer_edit'>
        <button className="add-Novel-button">
          <PlusCircleOutlined style={{ fontSize: '20px' }} /> เพิ่มงานเขียน
        </button>
        </a>
        <div className="work-list"> 
          {works.map((work) => (
            <div key={work.title} className="work-item">
              <div className="work-image-container">
                <img src={work.imageUrl} alt={work.title} className="work-image" /> 

                {/* เพิ่มคอนเทนเนอร์สำหรับปุ่ม */}
                  <a href= '/Writer_edit'>
                  <button className="edit-button"><EditOutlined/></button>
                  {work.isFinished && <label className="finish-button">จบ</label>}
                  </a>
              </div>

              <div className="work-details">
                <h3 className="work-title">{work.title}</h3>
                <p className="work-author"><UserOutlined /> {work.author}</p>
                <div className="work-stats">
                  <span><EyeOutlined /> {work.reads.toLocaleString()}</span> 
                  <span><HeartOutlined />{work.likes}</span>
                  <span><CommentOutlined />{work.comments}</span>
                </div>
                <div className="work-tags">
                  <span><label className='work-type'>{work.type1}</label></span>
                  <span><label className='work-rate'>{work.rate}</label></span>
                </div>
                <p className="work-description">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Writer;
