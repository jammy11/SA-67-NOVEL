import React, { useState } from "react";
import './commentModal.css';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: { username: string; comment_text: string; pro_pic: string }) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    onSubmit({ username, comment_text: commentText, pro_pic: "" });
    setUsername("");
    setCommentText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-comment ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-comment">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Write a Comment</h2>
        {/* <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        /> */}
        <textarea 
          placeholder="Your Comment" 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CommentModal;
