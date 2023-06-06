import { Paginate } from "@/models/paginate";
import axiosConfig from "../axios_config";
import { PostModel } from "@/models/posts/post";

export const postApi = {
  async getAllPost(page: number, type?: string, tags?: string) {
    return await axiosConfig.get<Paginate<PostModel>>(
      `/posts?page=${page}` +
        (type ? `&type=${type}` : "") +
        (tags ? `&tags=${tags}` : "")
    );
  },
};
