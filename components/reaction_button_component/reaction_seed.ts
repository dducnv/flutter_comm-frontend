import { ReactionResponse } from "@/models/reactions/reaction";
import { NullLiteral } from "typescript";

export const reactionsSeed = [
  {
    id: 1,
    name: "like",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png",
    emoji: "👍",
  },
  {
    id: 2,
    name: "dislike",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png",
    emoji: "👎",
  },
  {
    id: 3,
    name: "love",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/2764.png",
    emoji: "❤️",
  },
  {
    id: 4,
    name: "congratulations",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f389.png",
    emoji: "🎉",
  },
  {
    id: 5,
    name: "haha",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f604.png",
    emoji: "😄",
  },
  {
    id: 6,
    name: "eyes",
    iconUrl:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f440.png",
    emoji: "👀",
  },
];
export interface StatusResponse {
  name: string;
  status: string;
}
export interface ReactionAction {
  reactionsResponse: ReactionResponse;
  statusResponseName: string;
}

export function addReaction({
  reactionsResponse,
  statusResponseName,
}: ReactionAction) {
  const reaction = reactionsSeed.find((r) => r.name === statusResponseName);

  if (!reaction) {
    return reactionsResponse;
  }

  const findExistMyReaction = reactionsResponse?.myReactions.find(
    (r) => r.name === reaction.name
  );

  const existingReaction = reactionsResponse?.reactions?.find(
    (r) => r.name === reaction.name
  );

  if (reactionsResponse === null) {
  }
  if (!findExistMyReaction) {
    const newMyReaction = {
      ...reaction,
      count: 1,
    };

    if (existingReaction) {
      const newReactions = reactionsResponse.reactions.map((r) =>
        r.name === existingReaction.name
          ? { ...existingReaction, count: existingReaction.count + 1 }
          : r
      );

      return {
        ...reactionsResponse,
        myReactions: [...reactionsResponse.myReactions, newMyReaction],
        reactions: newReactions,
        totalReaction: reactionsResponse.totalReaction + 1,
      };
    } else {
      return {
        ...reactionsResponse,
        myReactions: [...reactionsResponse.myReactions, newMyReaction],
        reactions: [...reactionsResponse.reactions, newMyReaction],
        totalReaction: reactionsResponse.totalReaction + 1,
      };
    }
  }

  return reactionsResponse;
}

export function removeReaction({
  reactionsResponse,
  statusResponseName,
}: ReactionAction) {
  const reaction = reactionsSeed.find((r) => r.name === statusResponseName);

  if (!reaction) {
    return reactionsResponse;
  }

  const existingMyReaction = reactionsResponse.myReactions.find(
    (r) => r.name === reaction.name
  );

  const existingReaction = reactionsResponse.reactions.find(
    (r) => r.name === reaction.name
  );

  if (existingMyReaction) {
    const newMyReactions = reactionsResponse.myReactions.filter(
      (r) => r.name !== reaction.name
    );

    if (existingReaction) {
      const newReaction = {
        ...existingReaction,
        count: existingReaction.count - 1,
      };

      if (newReaction.count === 0) {
        const newReactions = reactionsResponse.reactions.filter(
          (r) => r.name !== reaction.name
        );

        return {
          ...reactionsResponse,
          myReactions: newMyReactions,
          reactions: newReactions,
          totalReaction: reactionsResponse.totalReaction - 1,
        };
      } else {
        const newReactions = reactionsResponse.reactions.map((r) =>
          r.name === reaction.name ? newReaction : r
        );

        return {
          ...reactionsResponse,
          myReactions: newMyReactions,
          reactions: newReactions,
          totalReaction: reactionsResponse.totalReaction - 1,
        };
      }
    }
  }

  return reactionsResponse;
}
