import { Paginate } from "@/models/paginate";
import axiosConfig from "../axios_config";
import { PostModel } from "@/models/posts/post";
import { Reaction } from "@/models/reactions/reaction";

export const postApi = {
  async getAllPost(page: number, type?: string, tags?: string) {
    return await axiosConfig.get<Paginate<PostModel>>(
      `/posts?page=${page}` +
        (type ? `&type=${type}` : "") +
        (tags ? `&tags=${tags}` : "")
    );
  },
  async getPostsReactions(uuid: string) {
    return await axiosConfig.get(`/posts/reactions/${uuid}`);
  },
  async addReactionForPosts(uuid: string, body: Reaction) {
    return await axiosConfig.post<any>(`/posts/reactions/${uuid}`, body);
  },
};
