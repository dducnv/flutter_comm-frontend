"use client";
import { PostModel } from "@/models/posts/post";
import React from "react";
import { ChatBubbleLeftRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { SmileEmoji } from "../icon_custom";
import _ from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import { routerPathChange } from "@/untils/route/route_config";
import { abbrNum } from "@/untils/common/format_numb";
type Props = {};

export function PostItem({
  title,
  slug,
  description,
  category,
  author,
  usersComment,
  viewCount,
  tags,
  reactionCount,
  commentCount,
  createdAt,
}: PostModel) {
  const { get } = useSearchParams();
  const tagsParams = get("tags");
  return (
    <article className="w-full rounded-lg  border bg-gray-50  md:hover:border-2 border-gray-300  hover:bg-gray-100   cursor-pointer mb-2">
      <div className="flex items-center justify-between h-full py-2">
        <div className="md:flex w-1/12 hidden   items-center px-3">
          <div className="border px-1 py-1 max-w-[100px] flex justify-center items-center rounded-full">
            <SmileEmoji className=" h-5 w-5 text-gray-700" />
            <span className="text-gray-700  text-xs ml-1">{reactionCount}</span>
          </div>
        </div>
        <div className="md:w-8/12 w-full px-3">
          <Link
            href={`/details/${routerPathChange({
              categorySlug: category.slug,
            })}/${slug}`}
          >
            <h3 className="text-gray-700 text-[16px] font-[600] inline-block  hover:text-blue-600 ">
              {title}
            </h3>
          </Link>

          <div className="flex">
            <div className="h-3 w-5 border-l-2 border-b-2  mr-1 rounded-bl-md" />
            <ul className=" flex space-x-1 flex-wrap mb-1 overflow-hidden">
              <li className="text-gray-500  text-xs">#{category?.slug}</li>
              {tags?.map((tag) => {
                const isContainTag = tagsParams?.includes(tag.slug);
                return (
                  <li key={tag.slug} className={`text-gray-500  text-xs`}>
                    <span
                      className={classNames(
                        isContainTag && "bg-blue-300 text-blue-800"
                      )}
                    >
                      #{tag.slug}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <span className="text-gray-500 text-xs ">
              Được tạo bởi {author?.name} lúc {createdAt}
            </span>
          </div>
        </div>
        <div className="md:block hidden">
          <div className="flex -space-x-1 hover:space-x-0.5 ">
            <img
              className="inline-block h-5 w-5 rounded-full ring-2 ring-white "
              src={author?.avatar}
              title={author?.name}
            />
            {_.map(usersComment.slice(0, 3), (item) => {
              if (item.username !== author?.username)
                return (
                  <img
                    key={item.username}
                    className="inline-block h-5 w-5 rounded-full ring-2 ring-white "
                    src={item?.avatar}
                    title={item?.name}
                  />
                );
            })}
            {usersComment.length > 3 ? (
              <div className="h-5 w-5 rounded-full ring-2 ring-white backdrop-blur-xl bg-gray-300/10 flex justify-center items-center text-[10px]">
                + {usersComment.length - 3}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center px-3">
          <EyeIcon className="w-5 h-5 text-gray-700 " />
          <span className="text-gray-700 text-xs ml-2 ">
            {abbrNum({
              number: viewCount,
              decPlaces: 2,
            })}
          </span>
        </div>
        <div className="flex justify-center items-center px-3">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-700 " />
          <span className="text-gray-700 text-xs ml-2 ">
            {abbrNum({
              number: commentCount,
              decPlaces: 2,
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
