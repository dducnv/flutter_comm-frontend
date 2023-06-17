/* eslint-disable react/no-children-prop */
"use client";
import React, { useRef } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import remarkGfm from "remark-gfm";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Refs } from "react-mde/lib/definitions/refs";
import { BaseUserInfo } from "@/models/user/user";
import classNames from "classnames";
type Props = {
  blackWord?: string;
  isBlackWord?: boolean;
  onChange: (value: string) => void;
  onClick: () => void;
  userSuggestion: BaseUserInfo[];
  value: string;
  loading: boolean;
  isButtonClose?: boolean;
  onClose?: () => void;
};

function loadSuggestions(text: string) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
export const CommentEditor = ({
  blackWord,
  isBlackWord,
  onChange,
  onClick,
  userSuggestion,
  value,
  loading,
  isButtonClose,
  onClose,
}: Props) => {
  const [selectedTab, setSelectedTab] = React.useState<any>("write");
  React.useEffect(() => {
    const spanElement = document.querySelector(".image-tip span");
    if (spanElement) {
      spanElement.textContent =
        "Click vào đây hoặc kéo ảnh từ tệp vào ô bình luận để tải ảnh lên.";
    }
  }, []);
  const save = async function* (data: any) {
    console.log(data);
    // Promise that waits for "time" milliseconds
    const wait = function (time: any) {
      return new Promise((a: any, r) => {
        setTimeout(() => a(), time);
      });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield data;
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  return (
    <div
      className={classNames(
        "pb-3 p-2 border editor-container mb-3 rounded-lg bg-[#f9f9f9]",
        isBlackWord ? "border-red-500" : "border-gray-300 "
      )}
    >
      {isBlackWord && (
        <div className="flex items-center">
          <span className="text-gray-600 font-semibold text-sm mr-2">
            Bình luận chứa từ cấm:{" "}
          </span>
          <span className="text-red-500 text-sm">{blackWord}</span>
        </div>
      )}
      <ReactMde
        minEditorHeight={150}
        heightUnits="px"
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        // @ts-ignore
        loadSuggestions={loadSuggestions}
        generateMarkdownPreview={(markdown) => {
          console.log(markdown);
          // @ts-ignore
          if (markdown == "")
            return Promise.resolve(
              <p className="text-gray-500">Không có gì để hiển thị</p>
            );
          return Promise.resolve(
            <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
          );
        }}
        childProps={{
          textArea: {
            placeholder: "Viết bình luận của bạn",
          },
        }}
        paste={{
          accept: "image/*",
          multiple: false,
          saveImage: save,
        }}
      />
      <div className="flex justify-end">
        <div className="flex space-x-2 items-center">
          {isButtonClose && (
            <button
              onClick={loading ? undefined : onClose}
              className={classNames(
                "bg-gray-400 text-white px-3 py-1 rounded-md",
                {
                  "opacity-50 cursor-not-allowed": loading,
                }
              )}
            >
              Đóng
            </button>
          )}

          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4  text-blue-500 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          <button
            onClick={loading ? undefined : onClick}
            className={classNames(
              "bg-blue-500 text-white px-3 py-1 rounded-md",
              {
                "opacity-50 cursor-not-allowed": loading,
              }
            )}
          >
            Đăng tải
          </button>
        </div>
      </div>
    </div>
  );
};
