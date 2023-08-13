"use client";
import { MultiselectCustom } from "@/components/multiselect_component/multiselect";
import { useTags } from "@/hooks/use_tags";
import { PostSaveModel } from "@/models/posts/post_save";
import { TagModel } from "@/models/tags/tag";
import { postApi } from "@/untils/configs/api_client/post_api";
import { routerPathChange } from "@/untils/route/route_config";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

type Props = {};

const NewFastFood = (props: Props) => {
  const { push } = useRouter();
  const { tags, isLoading } = useTags();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [blackWord, setBlackWord] = useState<string>("");

  ///form data
  const [title, setTitle] = useState<string>("");
  const [idDartPad, setIdDartPad] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<TagModel[]>([]);

  let isButtonActive =
    title.length > 0 && idDartPad.length > 0 && selectedTag.length > 0;
  let dataSend: PostSaveModel = {
    title: title || "",
    category: {
      id: 5,
    },
    description: description || "",
    content: idDartPad || "",
    tags: selectedTag || [],
  };

  async function onCreate() {
    setBlackWord("");
    let validate = validateForm(dataSend);
    if (validate) {
      setCreateLoading(true);
      let result: any = await postApi.createNewPost(dataSend);
      if (result.data?.hadBlackWord === true) {
        setBlackWord(result.data?.blackWords);
        setCreateLoading(false);
        toast.error("Tạo thất bại");
        return;
      }
      if (result.data?.slug) {
        toast.success("Tạo thành công");

        setCreateLoading(false);
        resetForm();
        push(`/details/fast-food/${result.data?.slug}`);
        return;
      }
      setCreateLoading(false);
      toast.error("Tạo thất bại");
    }
  }
  function resetForm() {
    setTitle("");
    setIdDartPad("");
    setSelectedTag([]);
    setBlackWord("");
  }

  function validateForm(dataSend: any) {
    if (dataSend.title == "") {
      toast.error("Tiêu đề không được để trống");
      return false;
    }
    if (dataSend.title.length < 10) {
      toast.error("Tiêu đề phải lớn hơn 10 ký tự");
      return false;
    }
    if (dataSend.tags.length == 0 || dataSend.tags.length < 2) {
      toast.error("Vui lòng chọn ít nhất 2 tag");
      return false;
    }
    if (dataSend.content == "") {
      toast.error("Nội dung không được để trống");
      return false;
    }
    return true;
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className=" max-w-5xl m-auto p-3">
        <h1 className="text-lg mb-3">
          Thêm <span className="font-bold">&quot;Fast-food&quot;</span>
        </h1>
        <div className="p-3 border rounded-lg bg-white mb-3">
          {blackWord != "" && (
            <div className="border bg-red-100 w-full py-3 px-2 rounded-lg mb-3">
              <p className="text-red-500 text-sm">
                <span>
                  Nội dung có chứa từ cấm:{" "}
                  <span className="text-red-600 font-semibold">
                    {blackWord}
                  </span>
                </span>
              </p>
            </div>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            className="w-full py-2 px-2 text-lg rounded-lg border border-gray-300 mb-3"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả (Không bắt buộc)"
            className="w-full fast-food-desc py-3 px-2 text-lg rounded-lg border border-gray-300 mb-3"
          />
          <div className="flex   space-x-3">
            <div className="1/2">
              <MultiselectCustom
                selectedValues={selectedTag}
                onSelect={(selectedList: any) => {
                  setSelectedTag(selectedList);
                }}
                onRemove={(removeItem: any) => {
                  setSelectedTag(removeItem);
                }}
                customCloseIcon={
                  <XMarkIcon className="h-4 w-4 cursor-pointer ml-2 hover:text-red-400  text-gray-800" />
                }
                selectionLimit={4}
                placeholder="Min 2 and max 4..."
                loading={isLoading}
                options={tags?.data}
                displayValue="name"
              />
            </div>
            <input
              onChange={(e) => setIdDartPad(e.target.value)}
              placeholder="ID Dart pad"
              className=" py-2 px-2 text-lg rounded-lg border border-gray-300  w-1/2"
            />
            <button
              onClick={
                createLoading || isLoading || !isButtonActive
                  ? undefined
                  : () => {
                      onCreate();
                    }
              }
              className={classNames(
                "bg-blue-500 text-white px-3 py-1 rounded-md",
                {
                  "opacity-50 cursor-not-allowed":
                    createLoading || isLoading || !isButtonActive,
                }
              )}
            >
              Đăng tải
            </button>
          </div>
        </div>
        {idDartPad.trim().length > 0 && (
          <>
            <iframe
              className="border"
              style={{ width: "100%", height: "600px" }}
              src={`https://dartpad.dev/embed-flutter.html?id=${idDartPad}&split=60&run=true&theme=light`}
            ></iframe>
          </>
        )}
      </div>
    </>
  );
};

export default NewFastFood;
