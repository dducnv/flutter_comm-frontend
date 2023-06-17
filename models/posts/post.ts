import { BaseUserInfo } from "../user/user";

export interface PostModel {
  uuid?: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  tags: Tag[];
  reactions: any[];
  author?: BaseUserInfo;
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  usersComment: BaseUserInfo[];
  createdAt: string;
  contents?: string;
  public?: boolean;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}
