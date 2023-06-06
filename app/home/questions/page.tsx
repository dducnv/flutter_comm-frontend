import { PostList } from "@/components/post_components";
import { Paginate } from "@/models/paginate";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
export const metadata = {
  title: "Hỏi đáp & Giúp đỡ",
  description: "Generated by create next app",
};
async function getData() {
  const res = await appApi.get(
    `http://localhost:3000/api/posts?type=questions`,
    {
      revalidate: 60 * 60 * 24,
    }
  );
  return res.json();
}
export default async function QuestionPage() {
  const data: Paginate<PostModel> = await getData();
  return (
    <>
      {data == undefined ? (
        <></>
      ) : (
        <PostList postList={data} type="questions" />
      )}
    </>
  );
}
