import { ReactionResponse } from "../reactions/reaction";
import { BaseUserInfo } from "../user/user";

export interface Comment {
  uuid: string;
  content: string;
  user: BaseUserInfo;
  parentComment: any;
  replyCount: number;
  countReplyForParent: number;
  replies: Comment[];
  reactionResDto: ReactionResponse;
  createdAt: string;
  editedAt: any;
}
