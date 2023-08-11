"use client";
import Link from "next/link";
import React from "react";
import { sidebarMenuList } from "./sidebar_menu_list";
import { usePathname, useSearchParams } from "next/navigation";
import classNames from "classnames";
export const SidebarMenu = () => {
  const router = usePathname();
  const { get } = useSearchParams();
  const tags = get("tags");
  const keyword = get("q");
  return (
    <div className=" w-[350px] bg-slate-50 border  rounded-md max-h-[250px] sticky top-3 p-3">
      <h2 className="mb-2 text-[16px] font-semibold text-gray-700 ">
        Danh mục
      </h2>
      <ul className="mb-2">
        {sidebarMenuList.map((item: any) => (
          <li key={item.path}>
            <Link
              href={`${item.path}${
                tags ? `?tags=${tags}` : keyword ? `?q=${keyword}` : ""
              }`}
              className="flex items-center"
            >
              <div
                className={classNames(
                  "w-[5px] h-[30px] rounded-full mr-1 ",
                  router == item.path && "bg-blue-500"
                )}
              />
              <div
                className={classNames(
                  "px-3 py-2  rounded-md hover:bg-gray-200 w-full text-sm text-gray-700  ",
                  router == item.path && "bg-gray-200 "
                )}
              >
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
