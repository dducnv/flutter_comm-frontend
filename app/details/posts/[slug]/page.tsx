import _ from "lodash";
import { CommentComponent } from "@/components/comment_component/comment_component";
import { ReactionPosts } from "@/components/reaction_button_component/reaction_posts";
import { PostModel } from "@/models/posts/post";
import { appApi } from "@/untils/configs/app_api_config";
import { TableOfContents } from "@/components/post_components/table_of_contents";
import { MarkdownView } from "@/components/markdown_component/markdown_view";

async function getPostDetails(slug: string) {
  const res = await appApi.get(`/posts/${slug}/details`, {
    revalidate: 60 * 60 * 24,
    // 60 * 60 * 24
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
        <div className="flex space-x-3">
          <div className="md:w-9/12 w-full bg-white  min-h-screen md:rounded-lg overflow-hidden">
            <div>
              <img
                className="w-full h-96 object-cover"
                src={
                  "https://static.mbpedia.com/mb-cdn/v3/thumbnails/11-05-2021/1636219052024-large.jpg"
                }
              />
            </div>
            <div className=" md:p-12 p-3">
              <div className="mb-3 text-sm">
                <div className="flex space-x-2">
                  <img
                    src={post.author?.avatar}
                    className=" w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className=" font-semibold author">
                      {post.author?.name}
                    </span>
                    {/* <span>cho danh mục</span> */}
                    <div className="text-sm">
                      <span>Đăng tải vào {post.createdAt}</span>
                      <span> • </span>
                      <span>danh mục </span>
                      <span className=" font-semibold text-sm">
                        {post.category.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-extrabold">{post.title}</h1>
              <div className="mt-3">
                <ReactionPosts postsUUID={`${post.uuid}`} />
              </div>
              <div className="flex flex-wrap  i justify-start mt-3 ">
                {_.map(post.tags, (tag) => (
                  <div className="py-0.5">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                      #{tag.name}
                    </span>
                  </div>
                ))}
              </div>
              <article className="mt-5 prose lg:prose-xl max-w-full">
                <MarkdownView content={post.contents} />
              </article>
            </div>
          </div>
          <div className="md:w-3/12 md:block hidden">
            <div className="  bg-white w-full rounded-lg sticky top-5 p-3">
              <h2 className="font-bold">Mục lục</h2>
              <div className="p-2">
                <TableOfContents content={post.contents} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-9/12 w-full">
          <CommentComponent uuid={post.uuid!} />
        </div>
      </div>
    </>
  );
}
