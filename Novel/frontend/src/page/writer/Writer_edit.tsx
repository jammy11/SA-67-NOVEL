import React, { useState, useRef } from 'react';
import './Writer_edit.css'; 
import Header from '../../compronents/headerselect';
import CategoryNavWriter from '../../compronents/CatogoryNavWriter';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

interface Novel {
  title: string;
  author: string;
  reads: number;
  likes: number;
  comments: number;
  imageUrl?: string; 
  description?: string;
  visibility?: string;
  type1?: string;
  rate?: string;
  isFinished?: boolean;
  price: number; 
}

const Writer_edit: React.FC = () => {
  const [novelTitle, setNovelTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rate, setRate] = useState('');
  const [tag, setTag] = useState('');
  const [visibility, setVisibility] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [content, setContent] = useState(''); 
  const [price, setPrice] = useState(0); 

  const [isModalVisible, setIsModalVisible] = useState(false);

  const coverImageInputRef = useRef<HTMLInputElement | null>(null);

  const handleCoverImageClick = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = ''; 
      coverImageInputRef.current.click(); 
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleSave = () => {
    // ในส่วนของการบันทึกข้อมูล อาจจะต้องส่ง content ไปพร้อมกับข้อมูลอื่นๆ 
    // ... (logic การบันทึกข้อมูล)

    setIsModalVisible(true); // แสดง Modal หลังจากบันทึกข้อมูลสำเร็จ
  };

  const handleDelete = () => {
    // ในส่วนของการลบข้อมูล อาจจะต้องส่ง ID ของนิยายไปลบในฐานข้อมูล
    alert('ข้อมูลถูกลบแล้ว');
  };

  const handleOk = () => {
    setIsModalVisible(false); // ปิด Modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // ปิด Modal
  };

  return (
    <>
      <Header />
      <CategoryNavWriter />
      <div className='wtee-lb'> 
        <div className="wtee-left-section"> 
          <label 
            htmlFor="coverImage" 
            className="wtee-upload-label" 
            onClick={handleCoverImageClick}
          >
            ปกนิยาย
            <br /> 
            <UploadOutlined /> 
          </label>
          <input 
            type="file" 
            id="coverImage" 
            accept="image/*" 
            onChange={handleCoverImageChange} 
            style={{ display: 'none' }}
            ref={coverImageInputRef} 
          />
        </div>

        <div className="wtee-right-section"> 
          <div className="wtee-input-row"> 
            <input 
              type="text" 
              placeholder="ชื่อนิยาย" 
              value={novelTitle}
              onChange={(e) => setNovelTitle(e.target.value)} 
              className="wtee-input-field"
            />
            <input 
              type="text" 
              placeholder="นามปากกา" 
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)} 
              className="wtee-input-field"
            />
          </div>

          <input 
            type="text" 
            placeholder="คำโปรย" 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            className="wtee-input-field wtee-full-width"
          />

          <div className="wtee-input-row"> 
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
              className="wtee-input-field"
            >
              <option value="">ประเภท</option>
              <option value="fantasy">แฟนตาซี</option>
              <option value="romance">โรแมนติก</option>
              <option value="horror">สยองขวัญ</option>
            </select>

            <select 
              value={rate}
              onChange={(e) => setRate(e.target.value)} 
              className="wtee-input-field"
            >
              <option value="">ระดับ (rate)</option>
              <option value="g">13+</option>
              <option value="pg">15+</option>
              <option value="r">18+</option>
            </select>

            <input 
              type="text" 
              placeholder="แท็ก (Tag)" 
              value={tag}
              onChange={(e) => setTag(e.target.value)} 
              className="wtee-input-field"
            />

            <div className="wtee-price-input"> 
              <span className="wtee-price-label">ราคา</span> 
              <input 
                type="number" 
                placeholder="" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))} 
                className="wtee-input-field"
              />
            </div>
          </div>

          <select 
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)} 
            className="wtee-input-field wtee-full-width"
          >
            <option value="">การเผยแพร่</option>
            <option value="public">สาธารณะ</option>
            <option value="private">ส่วนตัว</option>
          </select>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เขียนเนื้อหาของคุณที่นี่"
            className="wtee-input-field wtee-full-width" 
            rows={10} 
          />

          <button onClick={handleSave} className="wtee-save-button">บันทึกข้อมูล</button>
          <button onClick={handleDelete} className="wtee-delete-button">
            <DeleteOutlined /> ลบข้อมูล 
          </button> 

          <Modal 
            title="บันทึกข้อมูลนิยายเรียบร้อยแล้ว ขอให้เพลิดเพลินครับ" 
            open={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
              <button key="ok" onClick={handleOk} className="wtee-save-button">
                ตกลง
              </button>
            ]}
          >
            <p>บันทึกข้อมูลนิยายเรียบร้อย</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Writer_edit;