"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { Paginate } from "@/models/paginate";
import { PostModel } from "@/models/posts/post";
import { PostItem } from "./post_item";
import { postApi } from "@/untils/configs/api_client/post_api";
import { PostItemSkeletonLoaders } from "./post_item_skeleton_loaders";
import { appApi } from "@/untils/configs/api_client/app_api";

interface PostListProps {
  type?: string;
  sort?: string;
  postList: Paginate<PostModel>;
}

export const PostList = ({ type, postList }: PostListProps) => {
  const [posts, setPosts] = useState(postList.content);
  const [pageOfPosts, setPageOfPosts] = useState<number>(2);
  const [isSearch, setItSearch] = useState(false);
  const [isFilterTags, setFilterTags] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const path = usePathname();
  const { get } = useSearchParams();
  const keyword = get("q");
  const tags = get("tags");

  useEffect(() => {
    setPosts([]);
    setPageOfPosts(2);
    setItSearch(!!keyword);
    setFilterTags(!!tags);
  }, [keyword, tags, path]);

  //filter by tags
  useEffect(() => {
    if (tags || keyword) {
      if (isFilterTags) {
        const delayDebounceFn = setTimeout(async () => {
          setPosts([]);
          await handleTags(1);
        }, 700);
        return () => clearTimeout(delayDebounceFn);
      }
      if (isSearch) {
        const delayDebounceFn = setTimeout(async () => {
          setPosts([]);
          await handleSearch(1);
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
      }
    } else {
      const delayDebounceFn = setTimeout(async () => {
        setPosts([]);
        setPosts(postList.content);
        setFilterTags(false);
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch, isFilterTags, keyword, tags, path]);

  const handleTags = async (pageNum: number) => {
    const res: any = await postApi.getAllPost(pageNum, type, tags!);
    setPosts((prevPosts) => prevPosts.concat(res.content));
    setHasMore(!res.empty);
  };

  async function handleSearch(pageNum: number) {
    const res: any = await appApi.search(pageNum, keyword);
    setPosts((prevPosts) => prevPosts.concat(res.content));
    setHasMore(!res.empty);
  }

  const getMorePost = async () => {
    if (isSearch) {
      await handleSearch(pageOfPosts);
      setPageOfPosts((prevPageOfPosts) => prevPageOfPosts + 1);
      return;
    }
    if (isFilterTags) {
      await handleTags(pageOfPosts);
      setPageOfPosts((prevPageOfPosts) => prevPageOfPosts + 1);
      return;
    }
    const res: any = await postApi.getAllPost(pageOfPosts + 1, type, tags!);
    setPosts((prevPosts) => prevPosts.concat(res.content));
    setPageOfPosts((prevPageOfPosts) => prevPageOfPosts + 1);
    setHasMore(!res.empty);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={Array.from(Array(5), (e, i) => (
          <PostItemSkeletonLoaders key={i} />
        ))}
        endMessage={
          <h4 className="text-center text-gray-500 font-semibold">
            Không còn gì để hiển thị
          </h4>
        }
      >
        {posts?.map((item: PostModel) => (
          <PostItem key={item.uuid} {...item} description="description" />
        ))}
      </InfiniteScroll>
    </>
  );
};
