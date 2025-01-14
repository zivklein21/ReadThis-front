export interface PostProps {
  id: string;
  text: string;
  imagePath: string;
  usersWhoLiked: string[];
  createdBy: {
    _id: string;
    name: string;
    image: string;
  };
  date: Date;
  commentsAmount: number;
  onClick?: () => void;
  postPage?: boolean;
  reloadPosts?: () => void;
}
