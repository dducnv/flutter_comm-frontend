"use client";
import React, { useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { SmileEmoji } from "../icon_custom";
import { CommentReplyItem } from "./comment_reply_item";
import { BaseResponseModel } from "@/models/base_response";
import { Comment } from "@/models/comments/comments";
import { commentApi } from "@/untils/configs/api_client/comment_api";
import _ from "lodash";
import { CommentItem } from "./comment_item";
import { CommentEditor } from "../markdown_component/comment_editor";

type Props = {
  uuid: string;
};

export const CommentComponent = ({ uuid }: Props) => {
  const [comments, setComments] = useState<BaseResponseModel<Comment[]>>();
  const [value, setValue] = useState<string>("");

  const [loadingGetComments, setLoadingGetComments] = useState<boolean>(true);
  const [loadingUpComments, setLoadingUpComments] = useState<boolean>(true);

  useEffect(() => {
    setLoadingGetComments(true);
    const getCommentsOfPost = async () => {
      const res: any = await commentApi.getAllCommentsOfPost(uuid);
      setComments(res);
      setLoadingGetComments(false);
      setLoadingUpComments(false);
    };
    getCommentsOfPost();
  }, [uuid]);

  function handleUpComment() {
    setLoadingUpComments(true);
    if (value.length > 0) {
      commentApi.postCommentForPost(uuid, value).then((res) => {
        const newComment: Comment = {
          uuid: res?.data?.uuid,
          content: res?.data?.content,
          createdAt: res?.data?.createdAt,
          reactionResDto: {
            totalReaction: 0,
            reactions: [],
            myReactions: [],
          },
          user: res?.data?.user,
          parentComment: res?.data?.parentComment,
          replyCount: res?.data?.replyCount,
          countReplyForParent: res?.data?.countReplyForParent,
          replies: res?.data?.replies,
          editedAt: res?.data?.editedAt,
        };

        if (res) {
          console.log(res);
          setValue("");
          setLoadingUpComments(false);
          setComments((prevComments: any) => {
            if (!prevComments || !prevComments.data) {
              return { data: [newComment] };
            }
            return {
              ...prevComments,
              data: [...prevComments.data, newComment],
            };
          });
        }
      });
    }
  }
  return (
    <>
      <div className="">
        <div className="flex justify-between my-3 items-center">
          <span className=" font-semibold">{10} Bình luận</span>
          <div className="bg-gray-200 p-1 rounded-md">
            <button className="bg-gray-50 p-1 mr-1 rounded-md border border-gray-300 text-sm font-semibold text-gray-700">
              Mới nhất
            </button>
            <button className="text-sm p-1 hover:bg-gray-100 rounded-md text-gray-700">
              Nổi bật
            </button>
          </div>
        </div>
        <div>
          {loadingGetComments ? (
            <div className="animate-pulse flex space-x-4 mb-3">
              <div className="flex-1 space-y-4 py-1">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/6"></div>
                  <div className="h-4 bg-gray-600 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ) : (
            _.map(comments?.data, (comment: Comment) => (
              <CommentItem
                postUUID={uuid}
                comment={comment}
                key={comment.uuid}
              />
            ))
          )}
        </div>
        <hr className="mb-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100" />
        <CommentEditor
          onChange={setValue}
          onClick={() => {
            handleUpComment();
          }}
          userSuggestion={[]}
          value={value}
          loading={loadingUpComments}
        />
      </div>
    </>
  );
};
