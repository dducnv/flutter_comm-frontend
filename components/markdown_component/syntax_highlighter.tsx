"use cilent";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
type Props = {
  content: string;
};

export const SyntaxHighlighterComponent = ({ content }: Props) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        fontSize: "16px",
        background: "none",
      }}
      language="dart"
      style={a11yDark}
    >
      {content}
    </SyntaxHighlighter>
  );
};
