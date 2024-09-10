import React, {useState} from "react";
import styled from "styled-components";
import './Novelbasev2.css';
import { FaHeart, FaComment } from "react-icons/fa";
import { NCardPropsv } from "../../interface/bookey/bookshelfs";

const NCardv2: React.FC<NCardPropsv> = ({ ncardv }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(ncardv.likes);
  const handleLikeClick = () => {
    // Toggle like status and update likes count accordingly
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };
  
    const handleReadClick = () => {
        // Replace this with the desired navigation logic
        window.location.href = '/L_content';
      };
  return (
    <StyledWrapper>
      <div className="book">
      <div className='contentv'>
        <h3 className='titlev'>{ncardv.title}</h3>
        <p className='descriptionv'>{ncardv.description}</p>
        <button className='read-buttonv' onClick={handleReadClick}>
          อ่าน
        </button>
        <div className='interactionsv'>
          <div className='icon-textv' onClick={handleLikeClick} >
            <FaHeart
              className='icon-text-hv'
              style={{ color: isLiked ? 'red' : 'black' }} // Change color based on like status
            />
            <span>{ncardv.likes}</span>
          </div>
          <div className='icon-textv'>
            <FaComment className='icon-text-bv' />
            <span>{ncardv.comments}</span>
          </div>
        </div>
        <div className='tagsv'>
          <button className='tagv'>{ncardv.writer}</button>
          <button className='tagv'>{ncardv.rate}</button>
          <button className='tagv'>{ncardv.type_1}</button>
          <button className='tagv'>{ncardv.type_2}</button>
        </div>
      </div>
        <div className="cover">
        <div className='image-placeholderv'>
        <img id='image-placeholderv' src={ncardv.cover} alt={ncardv.title} />
      </div>
        </div>
      </div>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  .book {
  position: relative;
  border-radius: 10px;
  width: 220px;
  height: 300px;
  background-color: whitesmoke;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-content:
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;
}

.cover {
  top: 0;
  position: absolute;
  background-color: lightgray;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-90deg);
  -ms-transform: rotatey(-90deg);
  transform: rotatey(-90deg);
}

p {
  font-size: 10px;
  font-weight: bolder;
}
`;

export default NCardv2;
