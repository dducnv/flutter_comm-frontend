import { useAuth } from "@/hooks/use_auth";
import React from "react";
import {
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
type Props = {};

export function BottonAppbar({}: Props) {
  const { profile, logout, isLoading, isLogin } = useAuth();
  return (
    <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 ">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 "
        >
          <svg
            className="w-6 h-6 mb-1 text-gray-500  group-hover:text-blue-600 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="sr-only">Home</span>
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
        <button
          data-tooltip-target="tooltip-bookmark"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group"
        >
          <svg
            className="w-6 h-6 mb-1 text-gray-500  group-hover:text-blue-600 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="sr-only">Bookmark</span>
        </button>
        <div
          id="tooltip-bookmark"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
        >
          Bookmark
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
        <button
          data-tooltip-target="tooltip-post"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group"
        >
          <svg
            className="w-6 h-6 mb-1 text-gray-500  group-hover:text-blue-600 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            />
          </svg>
          <span className="sr-only">New post</span>
        </button>
        <div
          id="tooltip-post"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
        >
          New post
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
        <button
          data-tooltip-target="tooltip-search"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50  group"
        >
          <svg
            className="w-6 h-6 mb-1 text-gray-500  group-hover:text-blue-600 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div
          id="tooltip-search"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
        >
          Search
          <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
        <button
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50  group"
        >
          <img
            src={profile?.avatar}
            className="w-8 h-8 rounded-full"
            alt={profile?.name}
          />
        </button>
      </div>
    </div>
  );
}
