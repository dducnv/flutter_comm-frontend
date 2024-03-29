"use client";
import { SidebarMenu } from "@/components/sidebar_component/sidebar_menu_component";
import { BottonAppbar } from "@/components/navbar_component/botton_appbar";
import { NavFilterPost } from "@/components/navbar_component/nav_filter_post";
import { usePathname, useSearchParams } from "next/navigation";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  const { get } = useSearchParams();
  const keyword = get("q");
  function filterTitle(path: string) {
    switch (path) {
      case "/home/posts":
        return "Bài viết & Chia sẻ";
      case "/home/questions":
        return "Hỏi đáp & Giúp đỡ";
      case "/home/discussions":
        return "Thảo luận";
      default:
        return "";
    }
  }
  return (
    <>
      <main className=" min-h-screen md:pb-0 pb-[115px]">
        <div className=" max-w-6xl m-auto">
          <NavFilterPost />
          <div className="md:flex md:flex-row flex-col w-full md:space-x-3 md:px-0 px-1">
            <div className="md:block hidden">
              <SidebarMenu />
            </div>
            <div className="w-full">
              <h2 className="text-[16px] text-gray-600 mb-2 font-semibold">
                {keyword ? `Tìm kiếm: ${keyword}` : <> {filterTitle(router)}</>}
              </h2>

              <div className="flex flex-col h-full w-full space-y-2 ">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <BottonAppbar />
        </div>
      </main>
    </>
  );
}
