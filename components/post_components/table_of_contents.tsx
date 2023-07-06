"use client";
import { getHeadings } from "@/untils/common/heading_post_tree";
import { get } from "lodash";
import React from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  content: any;
};

export const TableOfContents = ({ content }: Props) => {
  const [headings, setHeadings] = React.useState<any>([]);
  useEffect(() => {
    getHeadings(content).then((res) => {
      setHeadings(res);
    });
  }, [content]);

  return <div>{renderNodes(headings)}</div>;
};

function renderNodes(nodes: any) {
  if (nodes.length === 0)
    return (
      <div className="text-gray-500 text-center text-sm">
        Bài viết không có mục lục
      </div>
    );
  return (
    <ol className=" ml-2 table-of-content">
      {nodes.map((node: any) => (
        <li className="table-of-content-item" key={node.data.hProperties.id}>
          <TOCLink node={node} />
          {node.children?.length > 0 && renderNodes(node.children)}
        </li>
      ))}
    </ol>
  );
}
function useHighlighted(id: any) {
  const observer: any = useRef();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObserver = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -35% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4, h5, h6");
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return [activeId === id, setActiveId];
}
const TOCLink = ({ node, parentIndex }: any) => {
  const fontSizes: any = { 2: "base", 3: "sm", 4: "xs" };
  const marginLeft: any = { 2: "", 3: "ml-2", 4: "ml-4", 5: "ml-6" };
  const id: string = node.data.hProperties.id;
  const [highlighted, setHighlighted] = useHighlighted(id);
  return (
    <a
      href={`#${id}`}
      className={`block text-${fontSizes[node.depth]} ${marginLeft[node.depth]} 
       ${highlighted && "font-bold underline"}
      hover:accent-color py-1`}
      onClick={(e) => {
        e.preventDefault();
        // @ts-ignore
        setHighlighted(id);
        document.getElementById(id)!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          //top 10px
        });
      }}
    >
      {node.value}
    </a>
  );
};
