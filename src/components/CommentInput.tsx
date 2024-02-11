import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Comment, CommentInputProps } from "../utils/types";

const CommentInput = ({
  onSubmit,
  parentId,
  isReply = false,
  comment,
  isEdit = false,
}: CommentInputProps) => {
  const [name, setName] = useState(comment && isEdit ? comment.name : "");
  const [text, setText] = useState(comment && isEdit ? comment.text : "");

  const onSubmitHandler = () => {
    if (!name.trim() || !text.trim()) {
      alert("Name and Text cannot be empty");
      return;
    }
    const newComment: Comment = {
      id: isEdit && comment ? comment.id : uuidv4(),
      parentId,
      name,
      text,
      createdAt: comment && isEdit ? comment.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(newComment);
    if (!isEdit) {
      // Reset only if it's not an edit action
      setName("");
      setText("");
    }
  };

  return (
    <div className="comment-input">
      <label className="comment-input__label">
        {isEdit ? "Edit" : isReply ? "Reply" : "Comment"}
      </label>
      <input
        className="comment-input__input"
        placeholder="Name"
        type="text"
        value={name}
        disabled={isEdit} // Name field is disabled when editing
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="comment-input__input"
        placeholder="Comment"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="comment-input__button"
        type="button"
        onClick={onSubmitHandler}
      >
        {isEdit ? "Edit" : "Post"}
      </button>
    </div>
  );
};

export default CommentInput;
