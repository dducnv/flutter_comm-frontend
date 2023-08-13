"use client";
import { Fragment, useState } from "react";
import _, { set } from "lodash";
import { toast, Toaster } from "sonner";
import { Dialog, Transition } from "@headlessui/react";
import { useTags } from "@/hooks/use_tags";
import { TagModel } from "@/models/tags/tag";
import { MultiselectCustom } from "@/components/multiselect_component/multiselect";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { CommentEditor } from "@/components/markdown_component/comment_editor";
import { PostSaveModel } from "@/models/posts/post_save";
import { postApi } from "@/untils/configs/api_client/post_api";
import { useRouter } from "next/navigation";
import { routerPathChange } from "@/untils/route/route_config";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const FormAddNewQuestion = ({ isOpen, setIsOpen }: Props) => {
  const { push } = useRouter();
  const { tags, isLoading } = useTags();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [blackWord, setBlackWord] = useState<string>("");

  ///form data
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("0");
  const [content, setContent] = useState<string>("");
  const [selected, setSelected] = useState<TagModel[]>([]);

  let dataSend: PostSaveModel = {
    title: title,
    category: {
      id: categoryChangeToId(category),
    },
    content: content,
    tags: selected,
  };

  function categoryChangeToId(categorySlug: string) {
    switch (categorySlug) {
      case "cau-hoi":
        return 1;
      case "thao-luan":
        return 3;
      default:
        return 0;
    }
  }

  function categoryChangeToSlug(categorySlug: string) {
    switch (categorySlug) {
      case "cau-hoi":
        return "question";
      case "thao-luan":
        return "discussion";
      default:
        return "";
    }
  }

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
        setIsOpen(false);
        setCreateLoading(false);
        resetForm();

        push(`/details/${categoryChangeToSlug(category)}/${result.data?.slug}`);
        return;
      }
      setCreateLoading(false);
      toast.error("Tạo thất bại");
    }
  }
  function resetForm() {
    setTitle("");
    setCategory("0");
    setContent("");
    setSelected([]);
    setBlackWord("");
  }

  function validateForm(dataSend: any) {
    if (dataSend.title == "" || dataSend.title == undefined) {
      toast.error("Tiêu đề không được để trống");
      return false;
    }
    if (dataSend.title.length < 10) {
      toast.error("Tiêu đề phải lớn hơn 10 ký tự");
      return false;
    }
    if (category == "0") {
      toast.error("Vui lòng chọn danh mục");
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
    if (dataSend.content.length < 30) {
      toast.error("Nội dung phải lớn hơn 30 ký tự");
      return false;
    }
    return true;
  }
  return (
    <>
      <Toaster position="top-center" />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex  items-top justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Thêm nội dung
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-300"
                    >
                      <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
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
                  <div className="mb-3 ">
                    <input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                      placeholder="Tiêu đề"
                      className="w-full py-3 px-2 text-lg rounded-lg border border-gray-300 mb-3"
                    />
                    <div className="flex space-x-2">
                      <div className="w-4/12">
                        <select
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 "
                        >
                          <option selected disabled value="0">
                            Chọn danh mục
                          </option>
                          <option value="cau-hoi">Câu hỏi</option>
                          <option value="thao-luan">Thảo luận</option>
                        </select>
                      </div>
                      <div className="w-8/12">
                        <MultiselectCustom
                          selectedValues={selected}
                          onSelect={(selectedList: any) => {
                            setSelected(selectedList);
                          }}
                          onRemove={(removeItem: any) => {
                            setSelected(removeItem);
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
                    </div>
                  </div>
                  <CommentEditor
                    onChange={setContent}
                    onClick={() => {
                      onCreate();
                    }}
                    blackWord=""
                    isBlackWord={false}
                    isDisablePreview={false}
                    value={content}
                    loading={createLoading}
                    isButtonClose={false}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
