import React, { useState } from "react";
import './comment.css';
import CPagination from "./c_pagi";
import CommentModal from "./commentModal";
import Abutton from "./animatedbutton";

interface CommentProps {
  username: string;
  comment_text: string;
  pro_pic: string;
}

const Commentsb: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState<CommentProps[]>([
    { username: "User1", comment_text: "สนุกมาก", pro_pic: "" },
    { username: "User2", comment_text: "น่าสนใจ", pro_pic: "" },
    { username: "User3", comment_text: "เยี่ยมมาก", pro_pic: "" },
    { username: "User4", comment_text: "ชอบมาก", pro_pic: "" },
    { username: "User5", comment_text: "ดีมาก", pro_pic: "" },
    { username: "User6", comment_text: "สุดยอด", pro_pic: "" },
    
    // Add more comments as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxCommentsPerPage = 4;
  const totalPages = Math.ceil(comments.length / maxCommentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * maxCommentsPerPage;
  const selectedComments = comments.slice(startIndex, startIndex + maxCommentsPerPage);

  const handleAddComment = (newComment: CommentProps) => {
    setComments([newComment, ...comments]);
  };

  return (
    <>
      <button className="write-comment-button" onClick={() => setIsModalOpen(true)}>
        Write a Comment
      </button>

      {selectedComments.map((comment, index) => (
        <div className='comment_base' key={index}>
          <div className='header'>
            <div className='profile_a'> </div>
            <div className='des'>
              <div className='username'><div className='userstyle'> {comment.username} </div> </div>
              <div className='comment_text'> {comment.comment_text} </div>
            </div>
          </div>
        </div>
      ))}
      <CPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <CommentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddComment} 
      />
    </>
  );
};

export default Commentsb;