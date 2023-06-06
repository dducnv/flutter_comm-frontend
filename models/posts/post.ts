export interface PostModel {
  uuid?: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  tags: Tag[];
  reactions: any[];
  author?: UserInfoPost;
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  usersComment: UserInfoPost[];
  createdAt: string;
  contents?: string;
  public?: boolean;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface UserInfoPost {
  name: string;
  avatar: string;
  username: string;
}
export interface Category {
  name: string;
  slug: string;
}
