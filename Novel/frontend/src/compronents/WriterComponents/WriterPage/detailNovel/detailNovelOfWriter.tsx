import React, { useEffect, useState } from 'react';
import './detailNovelOfWriter.css';
import { HeartOutlined, CommentOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { HiMiniShoppingCart } from "react-icons/hi2";
import DeleteNovelButton from '../DeleteButton/deleteNovel'; // ปุ่มลบ
import { InterfaceNovelOfWriter } from '../../../../interface/writer_interface/writerPageInterface';
import { GetNovelByUser } from '../../../../services/https/Novel/novel';

const DetailNovelOfWriter: React.FC = () => {
  const [detailNovels, setDetailNovels] = useState<InterfaceNovelOfWriter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      fetchNovels(userId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchNovels = async (id: string) => {
    try {
      const response = await GetNovelByUser(id);
      if (response && response.data && Array.isArray(response.data.novel)) {
        const novels = response.data.novel.map((novel: any) => ({
          ID: novel.id, // กำหนดค่า ID ของนิยาย
          novel_name: novel.novel_name || 'Unknown',
          Cover: novel.cover || 'default-cover.jpg',
          Description: novel.description || 'No description available',
          WriterName: novel.writername || 'Unknown',
          Visibility: novel.visibility || false,
          BuyAmount: novel.buy_amount || 0,
          Like: novel.novel_like || 0,
          Rate: novel.rate || 'Not rated',
          Type: `${novel.novel_type1}, ${novel.novel_type2}` || ''
        }));
        setDetailNovels(novels);
      } else {
        setDetailNovels([]);
      }
    } catch (error) {
      console.error("Error fetching novels:", error);
      setDetailNovels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = (deletedNovelId: number) => {
    // อัปเดตรายการนิยายเมื่อทำการลบสำเร็จ
    setDetailNovels((prevNovels) => prevNovels.filter(novel => novel.ID !== deletedNovelId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MyNovel"> 
      {detailNovels.length > 0 ? (
        detailNovels.map((detailNovel) => (
          <div key={detailNovel.ID} className="MyNovel-item">
            <div className="MyNovel-image-container">
              <img src={detailNovel.Cover} alt={detailNovel.novel_name} className="MyNovel-image" /> 
              <a href='/Writer_edit'>
                <button className="MyNovel-edit-button"><EditOutlined /></button>
              </a>
              {detailNovel.Visibility && <label className="MyNovel-finish-button">เผยแพร่</label>}
            </div>
            
            <div className="MyNovel-details">
              <h3 className="MyNovel-title">{detailNovel.novel_name}</h3>
              <p className="MyNovel-author"><UserOutlined /> ผู้แต่ง: {detailNovel.WriterName}</p>
              <div className="MyNovel-stats">
                <span><HiMiniShoppingCart /> {detailNovel.BuyAmount.toLocaleString()}</span> 
                <span><HeartOutlined /> {detailNovel.Like}</span>
                <span><CommentOutlined /> ความคิดเห็น</span>
              </div>
              <div className="MyNovel-tags">
                {detailNovel.Type?.split(', ').map((type, index) => (
                  <span key={index}><label className='MyNovel-type'>{type}</label></span>
                ))}
                <span><label className='MyNovel-rate'>{detailNovel.Rate}</label></span>
                <span><label className='MyNovel-hashtag'>#{detailNovel.novel_name}</label></span>
                <span><label className='MyNovel-hashtag'>#{detailNovel.WriterName}</label></span>
              </div>
              <p className="MyNovel-description" dangerouslySetInnerHTML={{ __html: detailNovel.Description||'' }} />
            </div>

            {/* ส่ง novelId เข้าไปใน DeleteNovelButton */}
            <DeleteNovelButton 
              novelId={detailNovel.ID} // ส่งค่า ID ของนิยายเพื่อทำการลบ
              onDeleteSuccess={() => handleDeleteSuccess(detailNovel.ID)} // เมื่อสำเร็จ อัปเดต state
            />
          </div>
        ))
      ) : (
        <div>No novels available</div>
      )}
    </div>
  );
};

export default DetailNovelOfWriter;
