import { CommentComponent } from "@/components/comment_component/comment_component";
import { ReactionPosts } from "@/components/reaction_button_component/reaction_posts";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
import EllipsisHorizontalIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import React from "react";

type Props = {};
async function getFastFoodDetails(slug: string) {
  const res = await appApi.get(`/posts/${slug}/details`, {
    revalidate: 60 * 60 * 24,
  });
  return res.json();
}

const FastFoodDetails = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const post: PostModel = await getFastFoodDetails(slug);

  return (
    <>
      <div className=" max-w-5xl m-auto p-3">
        <div className="p-3 border rounded-lg bg-white mb-3">
          <div>
            <h1 className=" text-2xl">{post.title}</h1>
            <div className="flex justify-between mb-3">
              <div className=" flex items-center space-x-2">
                <img
                  src={post.author?.avatar}
                  className="w-8 h-8 rounded-full"
                  alt={post.author?.name}
                />
                <div className="flex flex-col">
                  <span className=" font-semibold">{post.author?.name}</span>
                  <span className="text-gray-600 text-xs">
                    {post.createdAt}
                  </span>
                </div>
              </div>
              <button>
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <iframe
            className="border"
            style={{ width: "100%", height: "600px" }}
            src={`https://dartpad.dev/embed-flutter.html?id=${post.contents}&split=60&run=true&theme=light`}
          ></iframe>
          <div className="mt-3">
            <ReactionPosts postsUUID={`${post.uuid}`} />
          </div>
        </div>
        <CommentComponent uuid={post.uuid!} />
      </div>
    </>
  );
};

export default FastFoodDetails;
