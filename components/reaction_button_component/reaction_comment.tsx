"use client";
import { Reaction, ReactionResponse } from "@/models/reactions/reaction";
import React, { useEffect, useState } from "react";
import { ReactionButton } from "./reaction_button";
import { ReactionAction, addReaction, removeReaction } from "./reaction_seed";
import { commentApi } from "@/untils/configs/api_client/comment_api";

type Props = {
  commentUUID: string;
  reactionsOfComment: ReactionResponse;
};

export const ReactionComment = ({ commentUUID, reactionsOfComment }: Props) => {
  const [reactions, setReactions] = useState<any>(reactionsOfComment);
  const [loading, setLoading] = useState<boolean>(false);
  const [handlingReaction, setHandlingReaction] = useState<boolean>();

  async function onClickReaction(value: Reaction) {
    setHandlingReaction(true);
    const res: any = await commentApi.addReactionForComment(commentUUID, value);
    const data: any = await res;
    const reactionAction: ReactionAction = {
      reactionsResponse: reactions!,
      statusResponseName: data?.data.name,
    };
    if (data.data.status == "destroy") {
      const newRes: any = removeReaction(reactionAction);

      setReactions(newRes);
    }
    if (data.data.status == "create") {
      const newRes: any = addReaction(reactionAction);

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
