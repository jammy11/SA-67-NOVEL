import React from 'react';
import './Novelbase.css';
import { FaHeart, FaComment, FaBookmark } from 'react-icons/fa';


interface NCardProps {
  ncard: {
      title: string;
      description: string;
      likes: number;
      comments: number;
      writer: string;
      rate: string;
      type: string;
  };
}
const NCard: React.FC<NCardProps> = ({ ncard }) =>{
  return (
    <div className='card'>
      <div className='image-placeholder'>
        <img id='' src='' alt='' />
      </div>
      <div className='content'>
        <h3 className='title'>{ncard.title}</h3>
        <p className='description'>{ncard.description}</p>
        <a href= '/L_Content'><button className='read-button'>อ่าน</button> </a>
        <div className='interactions'>
          <div className='icon-text'>
            <FaHeart className='icon-text-b' />
            <span>{ncard.likes}</span>
          </div>
          <div className='icon-text'>
            <FaComment className='icon-text-b' />
            <span>{ncard.comments}</span>
          </div>
        </div>
        <div className='tags'>
          <button className='tag'>{ncard.writer}</button>
          <button className='tag'>{ncard.rate}</button>
          <button className='tag'>{ncard.type}</button>
        </div>
      </div>
      <FaBookmark className='bookmark-icon' />
    </div>
  );
};

export default NCard;