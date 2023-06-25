"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { MultiSelect } from "react-multi-select-component";
import { useTags } from "@/hooks/use_tags";
import { TagModel } from "@/models/tags/tag";
import _ from "lodash";
import { useAuth } from "@/hooks/use_auth";
import classNames from "classnames";

export const NavFilterPost = () => {
  const { get } = useSearchParams();
  const { push } = useRouter();
  const pathName = usePathname();
  const { tags, isLoading } = useTags();
  const { isLogin, isLoading: profileLoading } = useAuth();
  const [selected, setSelected] = useState<any[]>([]);
  const keyword = get("q");
  const tagParam = get("tags");
  const [value, setValue] = useState("");
  const tagsToOption = _.map(tags?.data, (tag: TagModel) => {
    return { label: tag.name, value: tag.slug };
  });
  useEffect(() => {
    if (!keyword || value.trim().length == 0) {
      setValue("");
      push(`${pathName}`);
    } else {
      setValue(keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  useEffect(() => {
    if (!tagParam || selected.length == 0) {
      setSelected([]);
      if (!keyword) {
        push(`${pathName}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagParam]);
  function handleSearch(value: string) {
    setValue(value);
    if (value.trim().length == 0) {
      push(`${pathName}`);
    } else {
      push(`${pathName}?q=${value}`);
    }
  }

  function handleSelectChange(selected: any[]) {
    setSelected(selected);
    if (selected.length == 0) {
      push(`${pathName}`);
    } else {
      push(`${pathName}?tags=${covertToTagsParam(selected)}`);
    }
  }

  const covertToTagsParam = (tagsSelect: any) => {
    let params = "";
    tagsSelect.forEach((element: any) => {
      params = params + element.value + ",";
    });
    return (params = params.substring(0, params.length - 1));
  };
  if (profileLoading) {
    return (
      <div className="flex w-full mb-5 space-x-3 justify-between animate-pulse ">
        <div className="flex items-center w-8/12 bg-gray-400 h-12 rounded-md" />
        <div className="flex items-center w-2/12 bg-gray-400 h-12 rounded-md" />
        <div className="flex items-center w-2/12 bg-gray-400 h-12 rounded-md" />
      </div>
    );
  }
  return (
    <>
      <div className="text-center mb-3">
        <span className=" text-orange-700">
          Dữ liệu ở trang web được tạo tự động nhằm mục đích kiểm thử, không có
          giá trị về mặt kiến thức
        </span>
      </div>

      <div className="flex w-full mb-5 space-x-3 justify-between">
        <div
          className={classNames(
            "flex items-center  md:px-0 px-1 ",
            isLogin ? "md:w-7/12 w-full" : "md:w-9/12 w-full"
          )}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={(value) => handleSearch(value.target.value)}
              value={value}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 z-10 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 h-[42px] "
              placeholder="Tìm kiếm..."
            />
            {value.length > 0 && (
              <div className="absolute inset-y-0 right-2 z-20  flex items-center pl-3 ">
                <button
                  onClick={() => {
                    setValue("");
                    push(`${pathName}`);
                  }}
                  className="p-1 border cursor-pointer  bg-gray-200 rounded-full"
                >
                  <XMarkIcon className="h-3 w-3 " />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-3/12 md:block hidden">
          <MultiSelect
            overrideStrings={{
              selectSomeItems: "Chọn thẻ",
              allItemsAreSelected: "Tất cả",
              selectAll: "Tất cả",
              search: "Tìm kiếm",
            }}
            isLoading={isLoading}
            className="bg-gray-100"
            options={tagsToOption}
            value={selected}
            onChange={(value: any[]) => {
              handleSelectChange(value);
            }}
            hasSelectAll={false}
            labelledBy="Select"
          />
        </div>
        {isLogin && (
          <Link
            href={"/posts/new"}
            type="button"
            className="text-white md:flex hidden text-center w-2/12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 h-[42px] justify-center items-center "
          >
            Tạo bài viết
          </Link>
        )}
      </div>
    </>
  );
};
