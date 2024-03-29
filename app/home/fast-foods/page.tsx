import { PostList } from "@/components/post_components";
import { Paginate } from "@/models/paginate";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
export const metadata = {
  title: "Bài viết & Chia sẻ",
  description: "Generated by create next app",
};
async function getData() {
  const res = await appApi.get(`/posts?type=fast_food`, {
    revalidate: 60,
  });
  return res.json();
}
export default async function PostPage() {
  const data: Paginate<PostModel> = await getData();
  return (
    <>
      {data == undefined ? (
        <></>
      ) : (
        <PostList postList={data} type="fast_food" />
      )}
    </>
  );
}
