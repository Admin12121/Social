import { cn } from "@/lib/utils";

import { Heart } from "lucide-react";
interface LikeButtonProps {
  postId?: string;
  initialState?: any;
}

export default function LikeButton({  initialState }: LikeButtonProps) {

  return (
    <button  className="flex items-center gap-2">
      <Heart
        className={cn(
          "size-5",
          // data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {initialState} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
}
