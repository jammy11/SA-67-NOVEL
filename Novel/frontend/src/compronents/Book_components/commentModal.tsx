import React, { useState } from "react";
import './commentModal.css';
import { CreateComment } from "../../services/https/Comment/comment";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  novelId: number;
  onSubmit: (comment: {
    ID: number;
    description: string;
    user_id: number;
    novel_id: number;
    User: {
      user_name: string;
      profile?: string;
    };
  }) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, novelId, onSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(""); // To store error message
  const userId = Number(localStorage.getItem("id"));
  const userName = localStorage.getItem("username") || "";

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      setError("Comment cannot be blank."); // Set error message if blank
      return;
    }

    if (!userId || !novelId) {
      console.error("Missing user or novel ID");
      return;
    }

    const newComment = {
      ID: Date.now(), // Temporary ID (or backend can provide)
      description: commentText,
      user_id: userId,
      novel_id: novelId,
      User: {
        user_name: userName,
        profile: "", // You can add profile information if needed
      },
    };

    try {
      await CreateComment({
        description: commentText,
        user_id: userId,
        user_name: userName,
        novel_id: novelId,
      });

      onSubmit(newComment); // Notify parent component
      setCommentText(""); // Reset comment field
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-comment ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-comment">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Write a Comment</h2>
        <textarea
          placeholder="Your Comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            setError(""); // Clear error when user types
          }}
        />
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CommentModal;
