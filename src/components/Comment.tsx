import { useState } from "react";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";

import CommentInput from "./CommentInput";
import { Comment, CommentProps } from "../utils/types";



const CommentComponent = ({
  comment,
  replies,
  handleDeleteComment,
  handleCommentSubmit,
  handleEditSubmit,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleReply = () => setIsReplying(!isReplying);

  const handleSubmit = (comment: Comment, isEdit: boolean = false) => {
    if (isEdit) {
      handleEditSubmit(comment);
    } else {
      handleCommentSubmit(comment);
    }
    setIsEditing(false);
    setIsReplying(false);
  };

  const renderActionButtons = () => (
    <div className="comment-footer">
      {replies && (
        <button onClick={toggleReply} className="reply-btn">
          Reply
        </button>
      )}
      <button onClick={toggleEdit} className="edit-btn">
        Edit
      </button>
    </div>
  );

  return (
    <>
      {isEditing ? (
        <CommentInput
          onSubmit={(comment) => handleSubmit(comment, true)}
          comment={comment}
          parentId={comment.parentId}
          isEdit
        />
      ) : (
        <div className="comment">
          <div className="comment-header">
            <p className="comment-name">{comment.name}</p>
            <p className="comment-date">
              {format(new Date(comment.updatedAt), "do MMM yyyy")}
            </p>
          </div>
          <span className="delete-btn" onClick={() => handleDeleteComment(comment.id)}>
            <RiDeleteBin6Line color="white" />
          </span>
          <p className="comment-text">{comment.text}</p>
          {renderActionButtons()}
        </div>
      )}

      <div className="comment-reply-input-container">
        {replies && (
          <div>
            {replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                handleCommentSubmit={handleCommentSubmit}
                handleDeleteComment={handleDeleteComment}
                handleEditSubmit={handleEditSubmit}
              />
            ))}
          </div>
        )}

        {isReplying && (
          <CommentInput
            onSubmit={(comment) => handleSubmit(comment)}
            parentId={comment.id}
            isReply
          />
        )}
      </div>
    </>
  );
};

export default CommentComponent;
