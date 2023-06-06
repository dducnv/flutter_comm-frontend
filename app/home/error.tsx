"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error", error);
  }, [error]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col justify-center">
        <h2 className="text-lg text-gray-700  font-mono">
          Gặp lỗi khi lấy dữ liệu!
        </h2>
        <button
          className="px-3 py-2 m-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  rounded-md mt-3 text-gray-200"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
