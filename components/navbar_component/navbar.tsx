"use client";
import React from "react";
import { useAuth } from "@/hooks/use_auth";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { GOOGLE_AUTH_URL } from "@/untils/constant/social_login_route";
import { useRouter } from "next/navigation";
import Link from "next/link";
export const Navbar = () => {
  const { profile, logout, isLoading, isLogin } = useAuth();
  const { push } = useRouter();
  function handleLoginGoogle() {
    return push(GOOGLE_AUTH_URL);
  }
  return (
    <nav className="py-3 navbar bg-gray-200  shadow-lg mb-5">
      <div className="max-w-6xl m-auto flex md:justify-between justify-center items-center">
        <div>
          <Link href={"/"}>
            <h1 className="text-gray-700 font-bold font-mono">
              FLUTTER COMMUNITY
            </h1>
          </Link>
        </div>
        <div className="md:block hidden">
          {isLoading ? (
            <>
              <div className="animate-pulse flex space-x-4 justify-center items-center">
                <div className="rounded-md bg-gray-400 w-32 h-11" />
              </div>
            </>
          ) : (
            <>
              {isLogin ? (
                <div className="flex justify-center items-center">
                  <div className="flex space-x-2 items-center p-2 rounded-md cursor-pointer">
                    <img
                      src={profile?.avatar}
                      className="w-8 h-8 rounded-full"
                      alt={profile?.name}
                    />
                    <span className="mr-3 text-gray-700 ">{profile?.name}</span>
                  </div>

                  <button
                    onClick={() => logout()}
                    className="text-sm flex p-3 hover:bg-gray-50 rounded-full "
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600 " />
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleLoginGoogle()}
                    className="text-sm flex p-3 rounded-md hover:bg-slate-100 "
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 48 48"
                        className="w-6 h-6"
                      >
                        <defs>
                          <path
                            id="a"
                            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                          />
                        </defs>
                        <clipPath id="b">
                          <use xlinkHref="#a" overflow="visible" />
                        </clipPath>
                        <path
                          clipPath="url(#b)"
                          fill="#FBBC05"
                          d="M0 37V11l17 13z"
                        />
                        <path
                          clipPath="url(#b)"
                          fill="#EA4335"
                          d="M0 11l17 13 7-6.1L48 14V0H0z"
                        />
                        <path
                          clipPath="url(#b)"
                          fill="#34A853"
                          d="M0 37l30-23 7.9 1L48 0v48H0z"
                        />
                        <path
                          clipPath="url(#b)"
                          fill="#4285F4"
                          d="M48 48L17 24l-4-3 35-10z"
                        />
                      </svg>
                      <span className="w-20 sm:w-full overflow-hidden text-ellipsis whitespace-nowrap  text-gray-700">
                        Đăng nhập với Google
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
