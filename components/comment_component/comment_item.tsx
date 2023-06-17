import { Comment } from "@/models/comments/comments";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React from "react";
import { SmileEmoji } from "../icon_custom";
import { CommentReplyItem } from "./comment_reply_item";
import _ from "lodash";
import { ReactionComment } from "../reaction_button_component/reaction_comment";
import classNames from "classnames";
import { CommentEditor } from "../markdown_component/comment_editor";
import { commentApi } from "@/untils/configs/api_client/comment_api";

type Props = {
  comment: Comment;
  postUUID: string;
};

export const CommentItem = ({ postUUID, comment: data }: Props) => {
  const [comment, setComment] = React.useState<Comment>(data);
  const [activeFormReply, setActiveFormReply] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [blackWord, setBlackWord] = React.useState<string>();
  const [isBlackWord, setIsBlackWord] = React.useState<boolean>(false);
  const [loadingUpComments, setLoadingUpComments] =
    React.useState<boolean>(false);

  function handlePostCommentReply() {
    setLoadingUpComments(true);
    if (value.length > 0) {
      commentApi
        .postCommentReplyForPost(postUUID, value, comment.uuid)
        .then((res: any) => {
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
            if (res?.message === "Bài đăng chứa các từ ngữ cấm!") {
              setBlackWord(res?.data?.blackWords);
              setIsBlackWord(true);
              setLoadingUpComments(false);
              return;
            }
            setBlackWord("");
            setIsBlackWord(false);

            setValue("");
            setLoadingUpComments(false);
            setComment((prevComments: any) => {
              if (!prevComments || !prevComments.replies) {
                return { data: [newComment] };
              }
              return {
                ...prevComments,
                replies: [...prevComments.replies, newComment],
              };
            });
          }
        });
    }
  }
  return (
    <div className="border border-gray-300 bg-white rounded-lg overflow-hidden mb-3">
      <div className="p-3">
        <div className="flex justify-between mb-3 ">
          <div className=" flex items-center space-x-2">
            <img
              src={comment.user.avatar}
              className="w-8 h-8 rounded-full"
              alt="Bonnie image"
            />
            <span className=" font-semibold">{comment.user.name}</span>
            <span className="text-gray-600 text-xs">{comment.createdAt}</span>
          </div>
          <button>
            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <article>{comment.content}</article>
        <div className="mt-3">
          <ReactionComment
            commentUUID={comment.uuid}
            reactionsOfComment={comment.reactionResDto}
          />
        </div>
      </div>
      <div
        className={classNames(
          `bg-gray-100 `,
          (comment?.replies?.length || 0) > 0 && "pt-3 border-t"
        )}
      >
        <div className="pl-7 pr-3">
          <ol className="relative border-l border-gray-300 ">
            {_.map(comment.replies, (commentReply: Comment) => (
              <CommentReplyItem commentReply={commentReply} />
            ))}
          </ol>
        </div>
        <div className="px-3 pt-3 pb-3  border-t border-gray-300">
          {activeFormReply ? (
            <CommentEditor
              blackWord={blackWord}
              isBlackWord={isBlackWord}
              value={value}
              onChange={setValue}
              loading={loadingUpComments}
              onClick={() => {
                handlePostCommentReply();
              }}
              isButtonClose={true}
              onClose={() => setActiveFormReply(false)}
              userSuggestion={[]}
            />
          ) : (
            <input
              onClick={() => setActiveFormReply(true)}
              className="w-full bg-white p-2 border rounded-md"
              placeholder="Trả lời bình luận"
            />
          )}
        </div>
      </div>
    </div>
  );
};
