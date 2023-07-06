/* eslint-disable react/no-children-prop */

import { CommentComponent } from "@/components/comment_component/comment_component";
import { ReactionPosts } from "@/components/reaction_button_component/reaction_posts";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

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
      <div className="mb-3">
        <h1 className=" text-2xl text-gray-700">{post.title}</h1>
      </div>
      <div className="flex w-full space-x-3">
        <div className="md:w-9/12 w-full">
          <div className="border border-gray-300 p-3 bg-white rounded-lg">
            <div className="flex justify-between mb-3">
              <div className=" flex items-center space-x-2">
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

            <article>
              <ReactMarkdown
                // @ts-ignore

                children={post.contents}
              />
            </article>
            <div className="mt-3">
              <ReactionPosts postsUUID={`${post.uuid}`} />
            </div>
          </div>

          <CommentComponent uuid={post.uuid!} />
        </div>
        <div className="md:block hidden md:w-3/12">
          <div className="pb-3 border-b">
            <h4 className="text-sm font-semibold text-gray-600">Danh mục</h4>
            <div className="flex items-center space-x-2 py-2">
              <div className=" h-12 w-12 border flex justify-center items-center rounded-md bg-gray-50">
                👨‍💻
              </div>
              <span className=" font-bold text-gray-700">
                {post.category.name}
              </span>
            </div>
          </div>
          <div className="py-3 border-b">
            <h4 className="text-sm font-semibold text-gray-600">Nhãn</h4>
            <div className="flex flex-wrap  i justify-start mt-3 ">
              {_.map(post.tags, (tag) => (
                <div className="py-0.5">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                    #{tag.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="py-3 border-b">
            <h4 className="text-sm font-semibold text-gray-600">
              Những người tham gia
            </h4>
            <div className="flex flex-wrap justify-start ">
              <img
                className="w-8 h-8 border-2 border-white rounded-full "
                src={post.author?.avatar}
                alt=""
              />
              {_.map(post.usersComment, (userComment) => {
                if (userComment.username !== post.author?.username)
                  return (
                    <img
                      className="w-8 h-8 border-2 border-white rounded-full "
                      src={userComment.avatar}
                      alt=""
                    />
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
