import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

async function getPostDetails(slug: string) {
  const res = await appApi.get(`/posts/${slug}/details`, {
    revalidate: 60 * 60 * 24,
  });
  return res.json();
}
export default async function DetailsPost({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post: PostModel = await getPostDetails(slug);
  return (
    <>
      <div>
        <h1 className=" text-2xl text-gray-700">{post.title}</h1>
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-9/12">
          <div className="border border-gray-500 my-3" />
          <div className="border p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-3">
              <div className="py-2 flex items-center space-x-2">
                <img
                  src={post.author?.avatar}
                  className="w-8 h-8 rounded-full"
                  alt={post.author?.name}
                />
                <span className=" font-semibold">{post.author?.name}</span>
                <span className="text-gray-600 text-xs">{post.createdAt}</span>
              </div>
              <button>
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <article>{post.contents}</article>
          </div>
        </div>
        <div className="w-3/12">
          <h4>Danh mục</h4>
          <p>{post.category.name}</p>
        </div>
      </div>
    </>
  );
}
