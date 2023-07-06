"use client";
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SyntaxHighlighterComponent } from "./syntax_highlighter";
const renderCodeBlock = ({ children }: any) => {
  return <SyntaxHighlighterComponent content={children} />;
};

function flatten(text: any, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props: any) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.split(" ").join("-").toLowerCase();
  const hLevel: any = {
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-sm",
  };
  return React.createElement(
    "h" + props.level,
    {
      id: slug,
      className: ` ${hLevel[props.level]}`,
    },
    props.children
  );
}

export const MarkdownView = ({ content }: { content: any }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: HeadingRenderer,
        h2: HeadingRenderer,
        h3: HeadingRenderer,
        h4: HeadingRenderer,
        h5: HeadingRenderer,
        h6: HeadingRenderer,
        code: renderCodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
