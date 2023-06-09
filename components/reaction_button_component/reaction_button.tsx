"use client";
import React, { useState, useEffect, Fragment } from "react";
import { SmileEmoji } from "../icon_custom";
import { Reaction } from "@/models/reactions/reaction";
import { Menu, Transition } from "@headlessui/react";
import { reactionsSeed } from "./reaction_seed";
import _ from "lodash";
import { RequiredAuthcomponent } from "../auth_component/required_auth_component";
import { useAuth } from "@/hooks/use_auth";
import classNames from "classnames";

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
  const { isLogin } = useAuth();
  if (onLoading)
    return (
      <div className="flex space-x-2 animate-pulse">
        <div className=" h-7 w-14  bg-slate-700  rounded-full  col-span-2" />
      </div>
    );
  return (
    <RequiredAuthcomponent>
      <div className="flex space-x-2">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            as="button"
            className="border px-2 py-1 flex justify-center items-center rounded-full"
          >
            <SmileEmoji className=" h-5 w-5 text-gray-700" />
            <span className="text-gray-700 text-xs ml-1">{totalReaction}</span>
          </Menu.Button>
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
                      onClick={() => isLogin && onClickReaction?.(reaction)}
                      title={reaction.name}
                      className={classNames(
                        "h-7 w-7 flex justify-center items-center hover:bg-gray-100 rounded-md",
                        myReactions?.find(
                          (myReaction) => myReaction.name === reaction.name
                        ) && "border-blue-500 bg-blue-100 border"
                      )}
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
              onClick={() => isLogin && onClickReaction?.(reactionSeed)}
              type="button"
              key={reaction.name}
              title={reaction.name}
              className={classNames(
                "border px-2 py-1 flex justify-center items-center rounded-full",
                myReactions?.find(
                  (myReaction) => myReaction.name === reaction.name
                ) && "border-blue-500 bg-blue-100",
                handlingReaction && " cursor-wait"
              )}
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
    </RequiredAuthcomponent>
  );
};
