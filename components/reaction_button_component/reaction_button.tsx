"use client";
import React, { useState, useEffect, Fragment } from "react";
import { SmileEmoji } from "../icon_custom";
import { postApi } from "@/untils/configs/api_client/post_api";
import { BaseResponseModel } from "@/models/base_response";
import { Reaction, ReactionResponse } from "@/models/reactions/reaction";
import { Menu, Transition } from "@headlessui/react";
import { reactionsSeed } from "./reaction_seed";
import _ from "lodash";

type Props = {
  reactions?: Reaction[];
  myReactions?: Reaction[];
  onClickReaction?: (reaction: Reaction) => void;
  onLoading?: boolean;
  totalReaction?: number;
  handlingReaction?: boolean;
};

export const ReactionButton = ({
  reactions,
  myReactions,
  onClickReaction,
  onLoading,
  totalReaction,
  handlingReaction,
}: Props) => {
  if (onLoading)
    return (
      <div className="flex space-x-2 animate-pulse">
        <div className=" h-7 w-14  bg-slate-700  rounded-full  col-span-2" />
      </div>
    );
  return (
    <div className="flex space-x-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <button className="border px-2 py-1  flex justify-center items-center rounded-full">
              <SmileEmoji className=" h-5 w-5 text-gray-700" />
              <span className="text-gray-700  text-xs ml-1">
                {totalReaction}
              </span>
            </button>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-14 bottom-0 shadow flex space-x-2 p-1 bg-white rounded-md border border-gray-300">
            {_.map(reactionsSeed, (reaction: Reaction) => (
              <Menu.Item key={reaction.name} disabled={handlingReaction}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => onClickReaction?.(reaction)}
                    title={reaction.name}
                    className={`h-7 w-7 flex justify-center items-center hover:bg-gray-100 rounded-md
                    ${
                      myReactions?.find(
                        (myReaction) => myReaction.name === reaction.name
                      )
                        ? "border-blue-500 bg-blue-100 border" // Thêm lớp CSS cho phản ứng trùng lặp
                        : ""
                    }
                    `}
                  >
                    {reaction.emoji}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      {_.map(reactions, (reaction: Reaction) => {
        const reactionSeed: any = reactionsSeed.find(
          (reactionSeed) => reactionSeed.name === reaction.name
        );
        return (
          <button
            disabled={handlingReaction}
            onClick={() => onClickReaction?.(reactionSeed)}
            type="button"
            key={reaction.name}
            title={reaction.name}
            className={`border px-2 py-1 flex justify-center items-center rounded-full ${
              myReactions?.find(
                (myReaction) => myReaction.name === reaction.name
              )
                ? "border-blue-500 bg-blue-100" // Thêm lớp CSS cho phản ứng trùng lặp
                : ""
            }
            ${handlingReaction ? " cursor-wait" : ""}
            `}
          >
            <span className="h-5 w-5 flex justify-center items-center">
              {reaction?.emoji}
            </span>
            <span className="text-gray-700  text-xs ml-1">
              {reaction.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
