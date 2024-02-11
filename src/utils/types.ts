export interface Comment {
  id: string;
  text: string;
  name: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentProps {
  comment: Comment;
  replies?: Comment[];
  handleDeleteComment: (id: string) => void;
  handleCommentSubmit: (comment: Comment) => void;
  handleEditSubmit: (comment: Comment) => void;
}

export interface CommentInputProps {
  onSubmit: (comment: Comment) => void;
  parentId: string;
  isReply?: boolean;
  comment?: Comment;
  isEdit?: boolean;
}