import { PostList } from "@/components/post_components";
import { Paginate } from "@/models/paginate";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
export const metadata = {
  title: "Thảo luận",
  description: "Generated by create next app",
};
async function getData() {
  const res = await appApi.get(`/posts?type=discussion`, {
    revalidate: 60,
  });
  return res.json();
}
export default async function DiscustionPage() {
  const data: Paginate<PostModel> = await getData();
  return (
    <>
      {data == undefined ? (
        <></>
      ) : (
        <PostList postList={data} type="discussion" />
      )}
    </>
  );
}
