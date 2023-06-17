export interface ReactionResponse {
  totalReaction: number;
  myReactions: Reaction[];
  reactions: Reaction[];
}

export interface Reaction {
  id: number;
  name: string;
  iconUrl: string;
  emoji: string;
  count: number;
}
