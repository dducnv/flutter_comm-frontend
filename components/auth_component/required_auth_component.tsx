import { useAuth } from "@/hooks/use_auth";
import React, { useState } from "react";
import { AuthPopup } from "./auth_popup";

export const RequiredAuthcomponent = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useAuth();
  return isLogin ? (
    children
  ) : (
    <>
      <AuthPopup openModel={isOpen} handleOpen={setIsOpen} />
      <div className=" relative ">
        <div
          onClick={() => setIsOpen(true)}
          className="absolute top-0 left-0 w-full h-full bg-opacity-50 z-10 cursor-pointer"
        />
        {children}
      </div>
    </>
  );
};
