"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use_auth";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { GOOGLE_AUTH_URL } from "@/untils/constant/social_login_route";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthPopup } from "../auth_component/auth_popup";
export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { profile, logout, isLoading, isLogin } = useAuth();
  useEffect(() => {
    if (!isLoading && !isLogin) {
      setIsOpen(true);
    }
  }, [isLoading, isLogin]);
  useEffect(() => {
    if (!profile && !isLoading) {
      setTimeout(() => {
        setIsOpen(true);
      }, 60 * 15);
    }
  }, [profile, isLoading]);
  return (
    <>
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
                      <span className="mr-3 text-gray-700 ">
                        {profile?.name}
                      </span>
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
                      onClick={() => setIsOpen(true)}
                      className="text-sm flex text-gray-50 p-3 rounded-md hover:bg-slate-100 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Đăng nhập
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      <AuthPopup
        openModel={isOpen}
        handleOpen={(value: boolean) => {
          setIsOpen(value);
        }}
      />
    </>
  );
};
