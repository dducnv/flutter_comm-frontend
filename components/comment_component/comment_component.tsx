"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "@/models/comments/comments";
import { commentApi } from "@/untils/configs/api_client/comment_api";
import _ from "lodash";
import { CommentItem } from "./comment_item";
import { CommentEditor } from "../markdown_component/comment_editor";
import { RequiredAuthcomponent } from "../auth_component/required_auth_component";
import classNames from "classnames";

type Props = {
  uuid: string;
};

export const CommentComponent = ({ uuid }: Props) => {
  const [comments, setComments] = useState<any>({
    latest: [],
    outstanding: [],
    totalComments: 0,
    isLatest: false,
  });
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [blackWord, setBlackWord] = useState<string>();
  const [isBlackWord, setIsBlackWord] = useState<boolean>(false);
  const [loadingGetComments, setLoadingGetComments] = useState<boolean>(true);
  const [loadingUpComments, setLoadingUpComments] = useState<boolean>(true);

  useEffect(() => {
    setLoadingGetComments(true);
    const getCommentsOfPost = async () => {
      try {
        const res: any = await commentApi.getAllCommentsOfPost(uuid);
        setComments({
          latest: res?.data?.commentsLatest ?? [],
          outstanding: res?.data?.commentsOutstanding ?? [],
          totalComments: res?.data?.totalComments ?? 0,
          isLatest: res?.data?.lastComments ?? false,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingGetComments(false);
        setLoadingUpComments(false);
      }
    };
    getCommentsOfPost();
  }, [uuid]);

  function handleUpComment() {
    setLoadingUpComments(true);
    if (value.length > 0) {
      commentApi.postCommentForPost(uuid, value).then((res: any) => {
        if (res?.message === "Bài đăng chứa các từ ngữ cấm!") {
          setBlackWord(res?.data?.blackWords);
          setIsBlackWord(true);
          setLoadingUpComments(false);
          return;
        }
        setBlackWord("");
        setIsBlackWord(false);
        const newComment: Comment = {
          uuid: res?.data?.uuid,
          content: res?.data?.content,
          createdAt: res?.data?.createdAt,
          reactionResDto: {
            totalReaction: 0,
            reactions: [],
            myReactions: [],
          },
          createdBy: res?.data?.createdBy,
          parentComment: res?.data?.parentComment,
          replyCount: res?.data?.replyCount,
          countReplyForParent: res?.data?.countReplyForParent,
          replies: res?.data?.replies,
          editedAt: res?.data?.editedAt,
          deleted: false,
        };
        setComments((prevComments: any) => {
          return {
            latest: [...prevComments.latest, newComment],
            outstanding: [...prevComments.outstanding, newComment],
            totalComments: prevComments.totalComments + 1,
            isLatest: comments.isLatest,
          };
        });
        setValue("");
        setLoadingUpComments(false);
      });
    }
  }
  return (
    <>
      <div className="">
        <div className="flex justify-between my-3 items-center">
          <span className=" font-semibold">
            {comments.totalComments} Bình luận
          </span>
          <div className="bg-gray-200 p-1 rounded-md">
            <button
              onClick={() => {
                setIsLatest(true);
              }}
              className={classNames(
                " text-sm text-gray-700 p-1 mr-1 rounded-md",
                isLatest
                  ? "bg-gray-50  border border-gray-300  font-semibold"
                  : "hover:bg-gray-100 "
              )}
            >
              Mới nhất
            </button>
            <button
              onClick={() => {
                setIsLatest(false);
              }}
              className={classNames(
                "text-sm p-1 rounded-md text-gray-700",
                !isLatest
                  ? "bg-gray-50  border border-gray-300  font-semibold"
                  : "hover:bg-gray-100 "
              )}
            >
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
            <>
              {isLatest
                ? comments.latest.map((comment: Comment) => (
                    <CommentItem
                      postUUID={uuid}
                      comment={comment}
                      key={comment.uuid + uuidv4()}
                    />
                  ))
                : comments.outstanding.map((comment: Comment) => (
                    <CommentItem
                      postUUID={uuid}
                      comment={comment}
                      key={comment.uuid + uuidv4()}
                    />
                  ))}
            </>
          )}
        </div>
        <hr className="mb-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 " />
        <RequiredAuthcomponent>
          <CommentEditor
            blackWord={blackWord}
            isBlackWord={isBlackWord}
            onChange={setValue}
            onClick={() => {
              handleUpComment();
            }}
            userSuggestion={[]}
            value={value}
            loading={loadingUpComments}
          />
        </RequiredAuthcomponent>
      </div>
    </>
  );
};
