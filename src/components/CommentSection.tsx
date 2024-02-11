import React, { useState, useEffect, useRef } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6"; // Simplified import

import "./CommentsSection.css";
import { Comment } from "../utils/types";
import CommentComponent from "./Comment";
import CommentInput from "./CommentInput";

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>(() => JSON.parse(localStorage.getItem("comments") || '[]'));
  const sortOrder = useRef("asc");

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (comment: Comment) => {
    setComments(prevComments => 
      sortOrder.current === "desc" ? [comment, ...prevComments] : [...prevComments, comment]
    );
  };

  const handleEditSubmit = (comment: Comment) => {
    setComments(prevComments =>
      sortOrder.current === "desc"
        ? [comment, ...prevComments.filter(c => c.id !== comment.id)]
        : [...prevComments.filter(c => c.id !== comment.id), comment],
    );
  };

  const handleDeleteComment = (id: string) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id && comment.parentId !== id));
  };

  const handleSortComments = () => {
    sortOrder.current = sortOrder.current === "asc" ? "desc" : "asc";
    setComments(prevComments =>
      [...prevComments].sort((a, b) =>
        sortOrder.current === "asc"
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    );
  };

  const getCommentReplies = (parentId: string): Comment[] =>
    comments
      .filter(comment => comment.parentId === parentId)
      .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

  return (
    <div className="comments-section">
      <CommentInput onSubmit={handleCommentSubmit} parentId="" isReply={false} />

      <button className="comments-section__button" onClick={handleSortComments}>
        Sort By: Date & Time
        {sortOrder.current === "asc" ? <FaArrowDown /> : <FaArrowUp />}
      </button>

      <div className="comments">
        {comments.filter(comment => comment.parentId === "").map(comment => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            replies={getCommentReplies(comment.id)}
            handleCommentSubmit={handleCommentSubmit}
            handleDeleteComment={handleDeleteComment}
            handleEditSubmit={handleEditSubmit}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
