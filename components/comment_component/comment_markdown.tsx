import React from "react";
import { MarkdownView } from "../markdown_component/markdown_view";
type Props = {
  content: string;
};

const CommentMarkdown = ({ content }: Props) => {
  return (
    <article className="prose max-w-full prose-gray ">
      <MarkdownView content={content} />
    </article>
  );
};

export default CommentMarkdown;
