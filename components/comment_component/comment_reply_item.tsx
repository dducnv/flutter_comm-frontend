import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Comment } from "@/models/comments/comments";
import { ReactionComment } from "../reaction_button_component/reaction_comment";
import { MarkdownView } from "../markdown_component/markdown_view";
import CommentMarkdown from "./comment_markdown";
type Props = {
  commentReply: Comment;
};

export const CommentReplyItem = ({ commentReply }: Props) => {
  return (
    <li className=" ml-6 pb-3">
      <span className="absolute flex items-center justify-center w-8 h-8  rounded-full -left-4">
        <img
          className="rounded-full shadow-lg"
          src={commentReply.createdBy.avatar}
          alt={commentReply.createdBy.name}
        />
      </span>
      <div className="flex justify-between mb-3 ">
        <div className=" flex items-center space-x-2">
          <span className=" font-semibold">{commentReply.createdBy.name}</span>
          <span className="text-gray-600 text-xs">
            {commentReply.createdAt}
          </span>
        </div>
        <button>
          <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <div className=" p-3 bg-white border border-gray-200 rounded-md ">
        <CommentMarkdown content={commentReply.content} />
        <div className="mt-3 ">
          <ReactionComment
            commentUUID={commentReply.uuid}
            reactionsOfComment={commentReply.reactionResDto}
          />
        </div>
      </div>
    </li>
  );
};
