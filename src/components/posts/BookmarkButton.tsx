import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import supabase from "@/api/feature/sessionProvider";
import { toast } from "sonner";

interface BookmarkButtonProps {
  postId?: string;
  count?: number;
}

export default function BookmarkButton({ postId, count }: BookmarkButtonProps) {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    }
    getUserData();
  }, []);

  const rePost = async () => {
    try {
      const { data, error } = await supabase.from("repostead").insert([
        {
          post: postId,
          repostead_by: user.id,
        },
      ]);
      if (error) throw error;
      toast.success("Repostead");
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <button onClick={()=>rePost()} className="flex items-center gap-2">
      {count && count >= 1 ? count : ''}
      <Share2 className={cn("size-5")} />
    </button>
  );
}
