"use client";
import { BaseResponseModel } from "@/models/base_response";
import { Reaction, ReactionResponse } from "@/models/reactions/reaction";
import { postApi } from "@/untils/configs/api_client/post_api";
import React, { useEffect, useState } from "react";
import { ReactionButton } from "./reaction_button";
import { ReactionAction, addReaction, removeReaction } from "./reaction_seed";
import { add } from "lodash";

type Props = {
  postsUUID: string;
};

export const ReactionPosts = ({ postsUUID }: Props) => {
  const [reactions, setReactions] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [handlingReaction, setHandlingReaction] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    const getReaction = async () => {
      const res: any = await postApi.getPostsReactions(postsUUID);
      const data: BaseResponseModel<ReactionResponse> = res;
      setLoading(false);
      setReactions(data.data);
    };
    getReaction();
  }, [postsUUID]);

  async function onClickReaction(value: Reaction) {
    setHandlingReaction(true);
    const res: any = await postApi.addReactionForPosts(postsUUID, value);
    const data: any = await res;
    const reactionAction: ReactionAction = {
      reactionsResponse: reactions!,
      statusResponseName: data?.data.name,
    };
    if (data.data.status == "destroy") {
      const newRes: any = removeReaction(reactionAction);
      console.log(newRes);
      setReactions(newRes);
    }
    if (data.data.status == "create") {
      const newRes: any = addReaction(reactionAction);
      console.log(newRes);
      setReactions(newRes);
    }
    setHandlingReaction(false);
  }
  return (
    <ReactionButton
      handlingReaction={handlingReaction}
      reactions={reactions?.reactions}
      myReactions={reactions?.myReactions}
      onLoading={loading}
      totalReaction={reactions?.totalReaction}
      onClickReaction={(value: Reaction) => onClickReaction(value)}
    />
  );
};
