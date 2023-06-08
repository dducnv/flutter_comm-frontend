import { Paginate } from "@/models/paginate";
import axiosConfig from "../axios_config";
import { PostModel } from "@/models/posts/post";

export const appApi = {
  async search(page: number, keyword: any, type?: string) {
    return await axiosConfig.get<Paginate<PostModel>>(
      `/search?q=${keyword}&page=${page}${type ? `&type=${type}` : ""}`
    );
  },
};
