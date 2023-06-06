import React from "react";

type Props = {
  className?: string;
};

export function SmileEmoji({ className }: Props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
      >
        <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
        <path
          fill="currentColor"
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"
        />
      </svg>
    </>
  );
}
