import React from "react";

export const PostItemSkeletonLoaders = () => {
  return (
    <div className="border  bg-gray-50   rounded-md p-4  w-full mx-auto mb-2">
      <div className="animate-pulse flex space-x-4 justify-center items-center">
        <div className="rounded-full bg-slate-700  h-7 w-14" />
        <div className="w-8/12">
          <div className="">
            <div className="h-2 bg-slate-700  rounded mb-3 col-span-2" />
            <div className="grid w-[30%] grid-cols-4 gap-2 mb-3">
              <div className="h-2 bg-slate-700  rounded  col-span-2" />
              <div className="h-2 bg-slate-700  rounded col-span-1" />
              <div className="h-2 bg-slate-700  rounded col-span-1" />
            </div>
            <div className="h-2 bg-slate-700  rounded col-span-1 w-[40%]" />
          </div>
        </div>
        <div className="md:flex -space-x-1 overflow-hidden hidden">
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white   border-white  bg-slate-700  " />
          <div className="inline-block h-5 w-5 rounded-full  ring-2 ring-white  border-white  bg-slate-700  " />
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white  border-white  bg-slate-700  " />
          <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white  border-white   bg-slate-700 " />
        </div>
        <div className="rounded-full bg-slate-700  h-7 w-14" />
        <div className="rounded-full bg-slate-700    h-7 w-14" />
      </div>
    </div>
  );
};
