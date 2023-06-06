"use client";
import { PostItemSkeletonLoaders } from "@/components/post_components/post_item_skeleton_loaders";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return Array.from(Array(5), (e, i) => <PostItemSkeletonLoaders key={i} />);
}
