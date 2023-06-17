import { Paginate } from "@/models/paginate";
import axiosConfig from "../axios_config";
import { BaseResponseModel } from "@/models/base_response";
import { Reaction } from "@/models/reactions/reaction";
import { Comment } from "@/models/comments/comments";

export const commentApi = {
  async getAllCommentsOfPost(posts_uuid: string) {
    return await axiosConfig.get<BaseResponseModel<Comment>>(
      `/comments/${posts_uuid}`
    );
  },
  async postCommentForPost(posts_uuid: string, content: string) {
    return await axiosConfig.post<any>(`/comments/${posts_uuid}`, {
      content,
    });
  },
  async postCommentReplyForPost(
    posts_uuid: string,
    content: string,
    parent_uuid: string
  ) {
    return await axiosConfig.post<any>(`/comments/${posts_uuid}/reply`, {
      content,
      parent_uuid,
    });
  },
  async addReactionForComment(comment_uuid: string, body: Reaction) {
    return await axiosConfig.post<any>(
      `/comments/reactions/${comment_uuid}`,
      body
    );
  },
};
